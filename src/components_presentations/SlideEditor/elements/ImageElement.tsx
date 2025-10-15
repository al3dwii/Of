'use client';

import { useRef, useState, useEffect } from 'react';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
import type { ImageElement } from '@/lib/editor/types';
import { useEditorStore } from '@/stores/editorStore';
import Image from 'next/image';

interface ImageElementComponentProps {
  element: ImageElement;
  isSelected: boolean;
  onSelect: () => void;
}

export function ImageElementComponent({
  element,
  isSelected,
  onSelect,
}: ImageElementComponentProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const updateElement = useEditorStore((state) => state.updateElement);
  
  // Track resize
  const [isResizing, setIsResizing] = useState(false);
  const resizeStartSize = useRef(element.size);
  const resizeStartPos = useRef(element.position);
  const resizeHandle = useRef<'se' | 'sw' | 'ne' | 'nw' | null>(null);

  const handleStart = (e: DraggableEvent, data: DraggableData) => {
    // Select on drag start
    onSelect();
  };

  const handleStop = (e: DraggableEvent, data: DraggableData) => {
    // Update position after drag
    updateElement(element.id, {
      position: { ...element.position, x: data.x, y: data.y },
    });
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
      const aspectRatio = resizeStartSize.current.width / resizeStartSize.current.height;
      
      let newSize = { ...resizeStartSize.current };
      let newPos = { ...resizeStartPos.current };

      // Calculate new dimensions based on handle
      if (handle === 'se') {
        // Bottom-right: expand from top-left
        const newWidth = e.clientX - rect.left;
        newSize.width = Math.max(50, newWidth);
        newSize.height = Math.max(50, newSize.width / aspectRatio);
      } else if (handle === 'sw') {
        // Bottom-left: expand from top-right
        const deltaX = rect.left - e.clientX;
        newSize.width = Math.max(50, resizeStartSize.current.width + deltaX);
        newSize.height = Math.max(50, newSize.width / aspectRatio);
        newPos.x = resizeStartPos.current.x - deltaX;
      } else if (handle === 'ne') {
        // Top-right: expand from bottom-left
        const newWidth = e.clientX - rect.left;
        const deltaY = rect.top - e.clientY;
        newSize.width = Math.max(50, newWidth);
        newSize.height = Math.max(50, newSize.width / aspectRatio);
        newPos.y = resizeStartPos.current.y - (newSize.height - resizeStartSize.current.height);
      } else if (handle === 'nw') {
        // Top-left: expand from bottom-right
        const deltaX = rect.left - e.clientX;
        const deltaY = rect.top - e.clientY;
        newSize.width = Math.max(50, resizeStartSize.current.width + deltaX);
        newSize.height = Math.max(50, newSize.width / aspectRatio);
        newPos.x = resizeStartPos.current.x - deltaX;
        newPos.y = resizeStartPos.current.y - (newSize.height - resizeStartSize.current.height);
      }

      // Update element
      updateElement(element.id, {
        size: newSize,
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

  const filterStyle = element.filters
    ? `brightness(${element.filters.brightness}%) contrast(${element.filters.contrast}%) saturate(${element.filters.saturation}%) blur(${element.filters.blur}px)`
    : undefined;

  return (
    <Draggable
      nodeRef={nodeRef}
      position={{ x: element.position.x, y: element.position.y }}
      onStart={handleStart}
      onStop={handleStop}
      disabled={element.locked}
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
          cursor: 'move',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            borderRadius: `${element.borderRadius}px`,
            overflow: 'hidden',
          }}
        >
          <Image
            src={element.src}
            alt={element.alt || 'Slide image'}
            fill
            style={{
              objectFit: 'contain',
              filter: filterStyle,
            }}
            unoptimized
          />
        </div>

        {/* Resize Handles - Only corners for images to maintain aspect ratio */}
        {isSelected && (
          <>
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
          </>
        )}
      </div>
    </Draggable>
  );
}
