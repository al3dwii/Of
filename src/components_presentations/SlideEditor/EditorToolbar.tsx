'use client';

import { useEditorStore } from '@/stores/editorStore';
import { v4 as uuidv4 } from 'uuid';

export function EditorToolbar() {
  const undo = useEditorStore((state) => state.undo);
  const redo = useEditorStore((state) => state.redo);
  const historyIndex = useEditorStore((state) => state.historyIndex);
  const history = useEditorStore((state) => state.history);
  const addElement = useEditorStore((state) => state.addElement);
  const selectedElementIds = useEditorStore((state) => state.selectedElementIds);
  const deleteElement = useEditorStore((state) => state.deleteElement);
  const copyElements = useEditorStore((state) => state.copyElements);
  const pasteElements = useEditorStore((state) => state.pasteElements);
  const addSlide = useEditorStore((state) => state.addSlide);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const handleAddText = () => {
    addElement({
      type: 'text',
      content: 'Double click to edit',
      position: { x: 100, y: 100, z: 1 },
      size: { width: 400, height: 100 },
      rotation: 0,
      opacity: 1,
      locked: false,
      hidden: false,
      style: {
        fontFamily: 'Arial, sans-serif',
        fontSize: 32,
        fontWeight: 'normal',
        fontStyle: 'normal',
        color: '#000000',
        textAlign: 'left',
        lineHeight: 1.4,
        letterSpacing: 0,
        textDecoration: 'none',
      },
      padding: { top: 0, right: 0, bottom: 0, left: 0 },
    } as any);
  };

  const handleAddImage = () => {
    // For now, use a placeholder image
    // In production, this would open a file picker
    addElement({
      type: 'image',
      src: 'https://via.placeholder.com/400x300',
      alt: 'Placeholder image',
      position: { x: 200, y: 200, z: 1 },
      size: { width: 400, height: 300 },
      rotation: 0,
      opacity: 1,
      locked: false,
      hidden: false,
      borderRadius: 0,
    } as any);
  };

  const handleDelete = () => {
    selectedElementIds.forEach((id) => deleteElement(id));
  };

  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-white border-b border-gray-200">
      {/* History Controls */}
      <div className="flex items-center gap-1 mr-4 border-r border-gray-300 pr-4">
        <button
          onClick={undo}
          disabled={!canUndo}
          className="p-2 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
          title="Undo (Cmd+Z)"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
            />
          </svg>
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          className="p-2 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
          title="Redo (Cmd+Y)"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 10H11a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6"
            />
          </svg>
        </button>
      </div>

      {/* Add Elements */}
      <div className="flex items-center gap-1 mr-4 border-r border-gray-300 pr-4">
        <button
          onClick={handleAddText}
          className="px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-2"
          title="Add Text"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
          <span className="text-sm font-medium">Text</span>
        </button>
        <button
          onClick={handleAddImage}
          className="px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-2"
          title="Add Image"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-sm font-medium">Image</span>
        </button>
      </div>

      {/* Edit Controls */}
      <div className="flex items-center gap-1 mr-4 border-r border-gray-300 pr-4">
        <button
          onClick={copyElements}
          disabled={selectedElementIds.length === 0}
          className="p-2 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
          title="Copy (Cmd+C)"
        >
          <svg
            className="w-5 h-5"
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
          onClick={pasteElements}
          className="p-2 hover:bg-gray-100 rounded"
          title="Paste (Cmd+V)"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </button>
        <button
          onClick={handleDelete}
          disabled={selectedElementIds.length === 0}
          className="p-2 hover:bg-red-50 text-red-600 rounded disabled:opacity-30 disabled:cursor-not-allowed"
          title="Delete (Del)"
        >
          <svg
            className="w-5 h-5"
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

      {/* Slide Controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => addSlide()}
          className="px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded flex items-center gap-2"
          title="Add Slide"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="text-sm font-medium">New Slide</span>
        </button>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Info */}
      <div className="text-sm text-gray-500">
        {selectedElementIds.length > 0 && (
          <span>{selectedElementIds.length} element(s) selected</span>
        )}
      </div>
    </div>
  );
}
