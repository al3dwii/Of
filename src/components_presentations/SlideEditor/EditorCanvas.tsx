'use client';

import { useEffect, useCallback } from 'react';
import { useEditorStore } from '@/stores/editorStore';
import { TextElementComponent } from './elements/TextElement';
import { ImageElementComponent } from './elements/ImageElement';
import type { SlideElement } from '@/lib/editor/types';

export function EditorCanvas() {
  const selectedSlide = useEditorStore((state) =>
    state.slides.find((s) => s.id === state.selectedSlideId)
  );
  const selectedElementIds = useEditorStore((state) => state.selectedElementIds);
  const selectElement = useEditorStore((state) => state.selectElement);
  const clearSelection = useEditorStore((state) => state.clearSelection);
  const deleteElement = useEditorStore((state) => state.deleteElement);
  const copyElements = useEditorStore((state) => state.copyElements);
  const cutElements = useEditorStore((state) => state.cutElements);
  const pasteElements = useEditorStore((state) => state.pasteElements);
  const undo = useEditorStore((state) => state.undo);
  const redo = useEditorStore((state) => state.redo);

  // Keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Check if we're typing in an input/textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true'
      ) {
        return;
      }

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // Delete
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        selectedElementIds.forEach((id) => deleteElement(id));
      }

      // Copy
      if (cmdOrCtrl && e.key === 'c') {
        e.preventDefault();
        copyElements();
      }

      // Cut
      if (cmdOrCtrl && e.key === 'x') {
        e.preventDefault();
        cutElements();
      }

      // Paste
      if (cmdOrCtrl && e.key === 'v') {
        e.preventDefault();
        pasteElements();
      }

      // Undo
      if (cmdOrCtrl && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }

      // Redo
      if (cmdOrCtrl && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
      }

      // Deselect
      if (e.key === 'Escape') {
        e.preventDefault();
        clearSelection();
      }
    },
    [
      selectedElementIds,
      deleteElement,
      copyElements,
      cutElements,
      pasteElements,
      undo,
      redo,
      clearSelection,
    ]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!selectedSlide) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">No slide selected</p>
      </div>
    );
  }

  const renderElement = (element: SlideElement) => {
    const isSelected = selectedElementIds.includes(element.id);
    const onSelect = () => {
      // Check if shift/cmd/ctrl is pressed for multi-select
      const event = (window.event || {}) as any;
      const multiSelect = event?.shiftKey || event?.metaKey || event?.ctrlKey;
      selectElement(element.id, multiSelect);
    };

    switch (element.type) {
      case 'text':
        return (
          <TextElementComponent
            key={element.id}
            element={element}
            isSelected={isSelected}
            onSelect={onSelect}
          />
        );
      case 'image':
        return (
          <ImageElementComponent
            key={element.id}
            element={element}
            isSelected={isSelected}
            onSelect={onSelect}
          />
        );
      default:
        return null;
    }
  };

  const backgroundStyle: React.CSSProperties = {};
  if (selectedSlide.background.type === 'color') {
    backgroundStyle.backgroundColor = selectedSlide.background.color;
  } else if (selectedSlide.background.type === 'gradient' && selectedSlide.background.gradient) {
    const { gradient } = selectedSlide.background;
    if (gradient.type === 'linear') {
      backgroundStyle.background = `linear-gradient(${gradient.angle || 0}deg, ${gradient.colors.join(', ')})`;
    } else {
      backgroundStyle.background = `radial-gradient(circle, ${gradient.colors.join(', ')})`;
    }
  } else if (selectedSlide.background.type === 'image' && selectedSlide.background.image) {
    backgroundStyle.backgroundImage = `url(${selectedSlide.background.image.src})`;
    backgroundStyle.backgroundSize = selectedSlide.background.image.size;
    backgroundStyle.backgroundPosition = selectedSlide.background.image.position;
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 p-8">
      <div
        className="relative bg-white shadow-lg"
        style={{
          width: '1920px',
          height: '1080px',
          transform: 'scale(0.5)',
          transformOrigin: 'center',
          ...backgroundStyle,
        }}
        onClick={(e) => {
          // Only clear selection if clicking on the canvas itself
          if (e.target === e.currentTarget) {
            clearSelection();
          }
        }}
      >
        {selectedSlide.elements.map(renderElement)}
      </div>
    </div>
  );
}
