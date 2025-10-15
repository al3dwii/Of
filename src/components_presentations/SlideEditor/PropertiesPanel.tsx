'use client';

import { useState } from 'react';
import { useEditorStore } from '@/stores/editorStore';
import type { TextElement } from '@/lib/editor/types';
import { HexColorPicker } from 'react-colorful';

export function PropertiesPanel() {
  const selectedElementIds = useEditorStore((state) => state.selectedElementIds);
  const getSelectedSlide = useEditorStore((state) => state.getSelectedSlide);
  const updateElement = useEditorStore((state) => state.updateElement);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const selectedSlide = getSelectedSlide();
  const selectedElement = selectedSlide?.elements.find(
    (el) => el.id === selectedElementIds[0]
  );

  if (!selectedElement) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-4">
        <p className="text-sm text-gray-500 text-center">
          Select an element to edit properties
        </p>
      </div>
    );
  }

  if (selectedElement.type === 'text') {
    const textElement = selectedElement as TextElement;

    const handleStyleChange = (updates: Partial<TextElement['style']>) => {
      updateElement(selectedElement.id, {
        style: { ...textElement.style, ...updates },
      } as any);
    };

    const handleSizeChange = (updates: Partial<TextElement['size']>) => {
      updateElement(selectedElement.id, {
        size: { ...textElement.size, ...updates },
      });
    };

    const handleOpacityChange = (opacity: number) => {
      updateElement(selectedElement.id, { opacity });
    };

    return (
      <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Text Properties</h3>

        {/* Font Family */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Font Family</label>
          <select
            value={textElement.style.fontFamily}
            onChange={(e) => handleStyleChange({ fontFamily: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="Arial, sans-serif">Arial</option>
            <option value="'Times New Roman', serif">Times New Roman</option>
            <option value="'Courier New', monospace">Courier New</option>
            <option value="Georgia, serif">Georgia</option>
            <option value="Verdana, sans-serif">Verdana</option>
            <option value="'Helvetica Neue', sans-serif">Helvetica</option>
            <option value="'Comic Sans MS', cursive">Comic Sans</option>
          </select>
        </div>

        {/* Font Size */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Font Size: {textElement.style.fontSize}px
          </label>
          <input
            type="range"
            min="8"
            max="200"
            value={textElement.style.fontSize}
            onChange={(e) =>
              handleStyleChange({ fontSize: parseInt(e.target.value) })
            }
            className="w-full"
          />
        </div>

        {/* Font Weight */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Font Weight</label>
          <div className="flex gap-2">
            <button
              onClick={() => handleStyleChange({ fontWeight: 'normal' })}
              className={`px-3 py-2 border rounded ${
                textElement.style.fontWeight === 'normal'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white'
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => handleStyleChange({ fontWeight: 'bold' })}
              className={`px-3 py-2 border rounded ${
                textElement.style.fontWeight === 'bold'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white'
              }`}
            >
              Bold
            </button>
          </div>
        </div>

        {/* Font Style */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Font Style</label>
          <div className="flex gap-2">
            <button
              onClick={() => handleStyleChange({ fontStyle: 'normal' })}
              className={`px-3 py-2 border rounded ${
                textElement.style.fontStyle === 'normal'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white'
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => handleStyleChange({ fontStyle: 'italic' })}
              className={`px-3 py-2 border rounded ${
                textElement.style.fontStyle === 'italic'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white'
              }`}
            >
              Italic
            </button>
          </div>
        </div>

        {/* Text Align */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Text Align</label>
          <div className="grid grid-cols-4 gap-2">
            {['left', 'center', 'right', 'justify'].map((align) => (
              <button
                key={align}
                onClick={() =>
                  handleStyleChange({ textAlign: align as any })
                }
                className={`px-3 py-2 border rounded capitalize ${
                  textElement.style.textAlign === align
                    ? 'bg-blue-600 text-white'
                    : 'bg-white'
                }`}
              >
                {align}
              </button>
            ))}
          </div>
        </div>

        {/* Color Picker */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Text Color</label>
          <div className="relative">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md flex items-center gap-2"
            >
              <div
                className="w-6 h-6 rounded border border-gray-300"
                style={{ backgroundColor: textElement.style.color }}
              />
              <span>{textElement.style.color}</span>
            </button>
            {showColorPicker && (
              <div className="absolute z-10 mt-2">
                <div
                  className="fixed inset-0"
                  onClick={() => setShowColorPicker(false)}
                />
                <HexColorPicker
                  color={textElement.style.color}
                  onChange={(color) => handleStyleChange({ color })}
                />
              </div>
            )}
          </div>
        </div>

        {/* Opacity */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Opacity: {Math.round(textElement.opacity * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={textElement.opacity}
            onChange={(e) => handleOpacityChange(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Text Decoration */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Decoration</label>
          <div className="grid grid-cols-3 gap-2">
            {['none', 'underline', 'line-through'].map((decoration) => (
              <button
                key={decoration}
                onClick={() =>
                  handleStyleChange({ textDecoration: decoration as any })
                }
                className={`px-2 py-2 border rounded text-xs ${
                  textElement.style.textDecoration === decoration
                    ? 'bg-blue-600 text-white'
                    : 'bg-white'
                }`}
              >
                {decoration === 'none' ? 'None' : decoration === 'underline' ? 'U' : 'S'}
              </button>
            ))}
          </div>
        </div>

        {/* Line Height */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Line Height: {textElement.style.lineHeight}
          </label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={textElement.style.lineHeight}
            onChange={(e) =>
              handleStyleChange({ lineHeight: parseFloat(e.target.value) })
            }
            className="w-full"
          />
        </div>
      </div>
    );
  }

  if (selectedElement.type === 'image') {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-4">
        <h3 className="text-lg font-semibold mb-4">Image Properties</h3>

        {/* Opacity */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Opacity: {Math.round(selectedElement.opacity * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={selectedElement.opacity}
            onChange={(e) =>
              updateElement(selectedElement.id, {
                opacity: parseFloat(e.target.value),
              })
            }
            className="w-full"
          />
        </div>

        {/* Border Radius */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Border Radius: {selectedElement.borderRadius}px
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={selectedElement.borderRadius}
            onChange={(e) =>
              updateElement(selectedElement.id, {
                borderRadius: parseInt(e.target.value),
              } as any)
            }
            className="w-full"
          />
        </div>
      </div>
    );
  }

  return null;
}
