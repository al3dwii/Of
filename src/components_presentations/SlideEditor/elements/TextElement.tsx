'use client';

import { useRef, useState, useEffect } from 'react';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
import type { TextElement } from '@/lib/editor/types';
import { useEditorStore } from '@/stores/editorStore';

interface TextElementComponentProps {
  element: TextElement;
  isSelected: boolean;
  onSelect: () => void;
}

export function TextElementComponent({
  element,
  isSelected,
  onSelect,
}: TextElementComponentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(element.content);
  const contentRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const updateElement = useEditorStore((state) => state.updateElement);
  
  // Track resize
  const [isResizing, setIsResizing] = useState(false);
  const resizeStartSize = useRef(element.size);
  const resizeStartPos = useRef(element.position);
  const resizeHandle = useRef<'se' | 'sw' | 'ne' | 'nw' | 'e' | 'w' | 'n' | 's' | null>(null);

  useEffect(() => {
    setContent(element.content);
  }, [element.content]);

  const handleStart = (e: DraggableEvent, data: DraggableData) => {
    // Select on drag start
    if (!isEditing) {
      onSelect();
    }
  };

  const handleStop = (e: DraggableEvent, data: DraggableData) => {
    // Update position after drag
    updateElement(element.id, {
      position: { ...element.position, x: data.x, y: data.y },
    });
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      contentRef.current?.focus();
      // Select all text
      const range = document.createRange();
      const sel = window.getSelection();
      if (contentRef.current && sel) {
        range.selectNodeContents(contentRef.current);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }, 0);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (content !== element.content) {
      updateElement(element.id, { content });
    }
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    setContent(e.currentTarget.textContent || '');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      contentRef.current?.blur();
    }
    // Prevent drag when editing
    e.stopPropagation();
  };

  // Resize handlers
  const handleResizeStart = (handle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    resizeHandle.current = handle as any;
    resizeStartSize.current = element.size;
    resizeStartPos.current = element.position;
  };

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!resizeHandle.current || !nodeRef.current) return;

      const handle = resizeHandle.current;
      const rect = nodeRef.current.getBoundingClientRect();
      const newSize = { ...resizeStartSize.current };
      const newPos = { ...resizeStartPos.current };

      if (handle.includes('e')) {
        newSize.width = e.clientX - rect.left;
      }
      if (handle.includes('w')) {
        const delta = rect.left - e.clientX;
        newSize.width = resizeStartSize.current.width + delta;
        newPos.x = resizeStartPos.current.x - delta;
      }
      if (handle.includes('s')) {
        newSize.height = e.clientY - rect.top;
      }
      if (handle.includes('n')) {
        const delta = rect.top - e.clientY;
        newSize.height = resizeStartSize.current.height + delta;
        newPos.y = resizeStartPos.current.y - delta;
      }

      // Update element
      updateElement(element.id, {
        size: { width: Math.max(50, newSize.width), height: Math.max(30, newSize.height) },
        position: newPos,
      });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      resizeHandle.current = null;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, element, updateElement]);

  const textStyle: React.CSSProperties = {
    fontFamily: element.style.fontFamily,
    fontSize: `${element.style.fontSize}px`,
    fontWeight: element.style.fontWeight,
    fontStyle: element.style.fontStyle,
    color: element.style.color,
    textAlign: element.style.textAlign,
    lineHeight: element.style.lineHeight,
    letterSpacing: `${element.style.letterSpacing}px`,
    textDecoration: element.style.textDecoration,
    textShadow: element.style.textShadow,
    padding: `${element.padding.top}px ${element.padding.right}px ${element.padding.bottom}px ${element.padding.left}px`,
    width: '100%',
    height: '100%',
    outline: isEditing ? '2px solid #3b82f6' : 'none',
    cursor: isEditing ? 'text' : 'move',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    whiteSpace: 'pre-wrap',
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      position={{ x: element.position.x, y: element.position.y }}
      onStart={handleStart}
      onStop={handleStop}
      disabled={isEditing || element.locked}
      bounds="parent"
    >
      <div
        ref={nodeRef}
        style={{
          position: 'absolute',
          width: `${element.size.width}px`,
          height: `${element.size.height}px`,
          zIndex: element.position.z,
          opacity: element.opacity,
          border: isSelected ? '2px solid #3b82f6' : '2px solid transparent',
          boxSizing: 'border-box',
          cursor: isEditing ? 'text' : 'move',
        }}
        onDoubleClick={handleDoubleClick}
      >
        <div
          ref={contentRef}
          contentEditable={isEditing}
          suppressContentEditableWarning
          onInput={handleInput}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          style={textStyle}
        >
          {element.content}
        </div>

        {/* Resize Handles */}
        {isSelected && !isEditing && (
          <>
            {/* Corner handles */}
            <div
              style={{
                position: 'absolute',
                width: '8px',
                height: '8px',
                background: '#3b82f6',
                border: '1px solid white',
                borderRadius: '50%',
                top: '-4px',
                left: '-4px',
                cursor: 'nw-resize',
              }}
              onMouseDown={(e) => handleResizeStart('nw', e)}
            />
            <div
              style={{
                position: 'absolute',
                width: '8px',
                height: '8px',
                background: '#3b82f6',
                border: '1px solid white',
                borderRadius: '50%',
                top: '-4px',
                right: '-4px',
                cursor: 'ne-resize',
              }}
              onMouseDown={(e) => handleResizeStart('ne', e)}
            />
            <div
              style={{
                position: 'absolute',
                width: '8px',
                height: '8px',
                background: '#3b82f6',
                border: '1px solid white',
                borderRadius: '50%',
                bottom: '-4px',
                left: '-4px',
                cursor: 'sw-resize',
              }}
              onMouseDown={(e) => handleResizeStart('sw', e)}
            />
            <div
              style={{
                position: 'absolute',
                width: '8px',
                height: '8px',
                background: '#3b82f6',
                border: '1px solid white',
                borderRadius: '50%',
                bottom: '-4px',
                right: '-4px',
                cursor: 'se-resize',
              }}
              onMouseDown={(e) => handleResizeStart('se', e)}
            />

            {/* Edge handles */}
            <div
              style={{
                position: 'absolute',
                width: '8px',
                height: '8px',
                background: '#3b82f6',
                border: '1px solid white',
                borderRadius: '50%',
                top: '50%',
                left: '-4px',
                transform: 'translateY(-50%)',
                cursor: 'w-resize',
              }}
              onMouseDown={(e) => handleResizeStart('w', e)}
            />
            <div
              style={{
                position: 'absolute',
                width: '8px',
                height: '8px',
                background: '#3b82f6',
                border: '1px solid white',
                borderRadius: '50%',
                top: '50%',
                right: '-4px',
                transform: 'translateY(-50%)',
                cursor: 'e-resize',
              }}
              onMouseDown={(e) => handleResizeStart('e', e)}
            />
            <div
              style={{
                position: 'absolute',
                width: '8px',
                height: '8px',
                background: '#3b82f6',
                border: '1px solid white',
                borderRadius: '50%',
                top: '-4px',
                left: '50%',
                transform: 'translateX(-50%)',
                cursor: 'n-resize',
              }}
              onMouseDown={(e) => handleResizeStart('n', e)}
            />
            <div
              style={{
                position: 'absolute',
                width: '8px',
                height: '8px',
                background: '#3b82f6',
                border: '1px solid white',
                borderRadius: '50%',
                bottom: '-4px',
                left: '50%',
                transform: 'translateX(-50%)',
                cursor: 's-resize',
              }}
              onMouseDown={(e) => handleResizeStart('s', e)}
            />
          </>
        )}
      </div>
    </Draggable>
  );
}
