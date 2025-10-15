'use client';

import { useEffect } from 'react';
import { useEditorStore } from '@/stores/editorStore';
import { EditorToolbar } from './EditorToolbar';
import { EditorCanvas } from './EditorCanvas';
import { PropertiesPanel } from './PropertiesPanel';
import type { Presentation } from '@/lib/editor/types';

interface SlideEditorProps {
  presentation: Presentation;
  onSave?: (presentation: Presentation) => void;
  onClose?: () => void;
}

export function SlideEditor({ presentation, onSave, onClose }: SlideEditorProps) {
  const setPresentation = useEditorStore((state) => state.setPresentation);
  const currentPresentation = useEditorStore((state) => state.presentation);
  const slides = useEditorStore((state) => state.slides);
  const selectedSlideId = useEditorStore((state) => state.selectedSlideId);
  const selectSlide = useEditorStore((state) => state.selectSlide);
  const deleteSlide = useEditorStore((state) => state.deleteSlide);
  const duplicateSlide = useEditorStore((state) => state.duplicateSlide);

  useEffect(() => {
    setPresentation(presentation);
  }, [presentation, setPresentation]);

  const handleSave = () => {
    if (currentPresentation && onSave) {
      onSave({
        ...currentPresentation,
        slides,
        metadata: {
          ...currentPresentation.metadata,
          updatedAt: new Date().toISOString(),
          version: currentPresentation.metadata.version + 1,
        },
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col z-50">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 text-white">
        <h1 className="text-lg font-semibold">Slide Editor</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium"
          >
            Save Changes
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm font-medium"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* Toolbar */}
      <EditorToolbar />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Slide Thumbnails Sidebar */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto p-4">
          <h3 className="text-sm font-semibold mb-3 text-gray-700">Slides</h3>
          <div className="space-y-2">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`relative group cursor-pointer border-2 rounded-lg overflow-hidden transition-all ${
                  slide.id === selectedSlideId
                    ? 'border-blue-600 shadow-md'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => selectSlide(slide.id)}
              >
                {/* Slide Number */}
                <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded z-10">
                  {index + 1}
                </div>

                {/* Slide Preview */}
                <div
                  className="aspect-video bg-white"
                  style={{
                    backgroundColor:
                      slide.background.type === 'color'
                        ? slide.background.color
                        : '#ffffff',
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    {slide.elements.length} element(s)
                  </div>
                </div>

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      duplicateSlide(slide.id);
                    }}
                    className="p-1 bg-white rounded hover:bg-gray-100"
                    title="Duplicate"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('Delete this slide?')) {
                        deleteSlide(slide.id);
                      }
                    }}
                    className="p-1 bg-white rounded hover:bg-red-50 text-red-600"
                    title="Delete"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto">
          <EditorCanvas />
        </div>

        {/* Properties Panel */}
        <PropertiesPanel />
      </div>
    </div>
  );
}
