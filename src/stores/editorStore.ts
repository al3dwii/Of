import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { Slide, SlideElement, Presentation, SlideBackground, TextElement } from '@/lib/editor/types';

interface HistoryState {
  slides: Slide[];
  selectedSlideId: string | null;
}

interface EditorState {
  // Presentation data
  presentation: Presentation | null;
  slides: Slide[];
  
  // Selection state
  selectedSlideId: string | null;
  selectedElementIds: string[];
  
  // History for undo/redo
  history: HistoryState[];
  historyIndex: number;
  
  // Clipboard
  clipboard: SlideElement[];
  
  // UI state
  isEditing: boolean;
  zoom: number;
  
  // Actions
  setPresentation: (presentation: Presentation) => void;
  
  // Slide actions
  addSlide: (index?: number) => void;
  deleteSlide: (slideId: string) => void;
  duplicateSlide: (slideId: string) => void;
  reorderSlides: (oldIndex: number, newIndex: number) => void;
  selectSlide: (slideId: string) => void;
  updateSlideBackground: (slideId: string, background: SlideBackground) => void;
  
  // Element actions
  addElement: (element: Omit<SlideElement, 'id'>) => void;
  updateElement: (elementId: string, updates: Partial<SlideElement>) => void;
  deleteElement: (elementId: string) => void;
  duplicateElement: (elementId: string) => void;
  selectElement: (elementId: string, multiSelect?: boolean) => void;
  clearSelection: () => void;
  
  // Clipboard actions
  copyElements: () => void;
  cutElements: () => void;
  pasteElements: () => void;
  
  // History actions
  undo: () => void;
  redo: () => void;
  addToHistory: () => void;
  
  // Utility
  getElementById: (elementId: string) => SlideElement | undefined;
  getSelectedSlide: () => Slide | undefined;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  presentation: null,
  slides: [],
  selectedSlideId: null,
  selectedElementIds: [],
  history: [],
  historyIndex: -1,
  clipboard: [],
  isEditing: false,
  zoom: 1,

  setPresentation: (presentation: Presentation) => {
    set({
      presentation,
      slides: presentation.slides,
      selectedSlideId: presentation.slides[0]?.id || null,
      history: [],
      historyIndex: -1,
    });
    get().addToHistory();
  },

  // Slide actions
  addSlide: (index?: number) => {
    const state = get();
    const newSlide: Slide = {
      id: uuidv4(),
      elements: [],
      background: {
        type: 'color',
        color: state.presentation?.theme.backgroundColor || '#ffffff',
      },
    };

    const slides = [...state.slides];
    const insertIndex = index !== undefined ? index : slides.length;
    slides.splice(insertIndex, 0, newSlide);

    set({ slides, selectedSlideId: newSlide.id });
    get().addToHistory();
  },

  deleteSlide: (slideId: string) => {
    const state = get();
    const slides = state.slides.filter((s) => s.id !== slideId);
    
    let newSelectedId = state.selectedSlideId;
    if (slideId === state.selectedSlideId) {
      const deletedIndex = state.slides.findIndex((s) => s.id === slideId);
      const nextSlide = slides[deletedIndex] || slides[deletedIndex - 1] || slides[0];
      newSelectedId = nextSlide?.id || null;
    }

    set({ slides, selectedSlideId: newSelectedId });
    get().addToHistory();
  },

  duplicateSlide: (slideId: string) => {
    const state = get();
    const slideIndex = state.slides.findIndex((s) => s.id === slideId);
    if (slideIndex === -1) return;

    const originalSlide = state.slides[slideIndex];
    const newSlide: Slide = {
      ...originalSlide,
      id: uuidv4(),
      elements: originalSlide.elements.map((el) => ({
        ...el,
        id: uuidv4(),
      })),
    };

    const slides = [...state.slides];
    slides.splice(slideIndex + 1, 0, newSlide);

    set({ slides, selectedSlideId: newSlide.id });
    get().addToHistory();
  },

  reorderSlides: (oldIndex: number, newIndex: number) => {
    const state = get();
    const slides = [...state.slides];
    const [removed] = slides.splice(oldIndex, 1);
    slides.splice(newIndex, 0, removed);

    set({ slides });
    get().addToHistory();
  },

  selectSlide: (slideId: string) => {
    set({ selectedSlideId: slideId, selectedElementIds: [] });
  },

  updateSlideBackground: (slideId: string, background: SlideBackground) => {
    const state = get();
    const slides = state.slides.map((slide) =>
      slide.id === slideId ? { ...slide, background } : slide
    );

    set({ slides });
    get().addToHistory();
  },

  // Element actions
  addElement: (element: Omit<SlideElement, 'id'>) => {
    const state = get();
    if (!state.selectedSlideId) return;

    const newElement = {
      ...element,
      id: uuidv4(),
    } as SlideElement;

    const slides = state.slides.map((slide) =>
      slide.id === state.selectedSlideId
        ? { ...slide, elements: [...slide.elements, newElement] }
        : slide
    );

    set({ slides, selectedElementIds: [newElement.id] });
    get().addToHistory();
  },

  updateElement: (elementId: string, updates: Partial<SlideElement>) => {
    const state = get();
    if (!state.selectedSlideId) return;

    const slides = state.slides.map((slide) =>
      slide.id === state.selectedSlideId
        ? {
            ...slide,
            elements: slide.elements.map((el) =>
              el.id === elementId ? ({ ...el, ...updates } as SlideElement) : el
            ),
          }
        : slide
    );

    set({ slides });
    get().addToHistory();
  },

  deleteElement: (elementId: string) => {
    const state = get();
    if (!state.selectedSlideId) return;

    const slides = state.slides.map((slide) =>
      slide.id === state.selectedSlideId
        ? {
            ...slide,
            elements: slide.elements.filter((el) => el.id !== elementId),
          }
        : slide
    );

    set({
      slides,
      selectedElementIds: state.selectedElementIds.filter((id) => id !== elementId),
    });
    get().addToHistory();
  },

  duplicateElement: (elementId: string) => {
    const state = get();
    const element = get().getElementById(elementId);
    if (!element || !state.selectedSlideId) return;

    const newElement = {
      ...element,
      id: uuidv4(),
      position: {
        ...element.position,
        x: element.position.x + 20,
        y: element.position.y + 20,
      },
    };

    const slides = state.slides.map((slide) =>
      slide.id === state.selectedSlideId
        ? { ...slide, elements: [...slide.elements, newElement] }
        : slide
    );

    set({ slides, selectedElementIds: [newElement.id] });
    get().addToHistory();
  },

  selectElement: (elementId: string, multiSelect = false) => {
    const state = get();
    if (multiSelect) {
      const newSelection = state.selectedElementIds.includes(elementId)
        ? state.selectedElementIds.filter((id) => id !== elementId)
        : [...state.selectedElementIds, elementId];
      set({ selectedElementIds: newSelection });
    } else {
      set({ selectedElementIds: [elementId] });
    }
  },

  clearSelection: () => {
    set({ selectedElementIds: [] });
  },

  // Clipboard actions
  copyElements: () => {
    const state = get();
    const selectedSlide = get().getSelectedSlide();
    if (!selectedSlide) return;

    const elementsToCopy = selectedSlide.elements.filter((el) =>
      state.selectedElementIds.includes(el.id)
    );

    set({ clipboard: elementsToCopy });
  },

  cutElements: () => {
    get().copyElements();
    const state = get();
    state.selectedElementIds.forEach((id) => get().deleteElement(id));
  },

  pasteElements: () => {
    const state = get();
    if (!state.selectedSlideId || state.clipboard.length === 0) return;

    const newElements = state.clipboard.map((el) => ({
      ...el,
      id: uuidv4(),
      position: {
        ...el.position,
        x: el.position.x + 20,
        y: el.position.y + 20,
      },
    }));

    const slides = state.slides.map((slide) =>
      slide.id === state.selectedSlideId
        ? { ...slide, elements: [...slide.elements, ...newElements] }
        : slide
    );

    set({
      slides,
      selectedElementIds: newElements.map((el) => el.id),
    });
    get().addToHistory();
  },

  // History actions
  addToHistory: () => {
    const state = get();
    const newHistoryState: HistoryState = {
      slides: JSON.parse(JSON.stringify(state.slides)),
      selectedSlideId: state.selectedSlideId,
    };

    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push(newHistoryState);

    // Limit history to 50 states
    if (newHistory.length > 50) {
      newHistory.shift();
    }

    set({
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },

  undo: () => {
    const state = get();
    if (state.historyIndex <= 0) return;

    const newIndex = state.historyIndex - 1;
    const historyState = state.history[newIndex];

    set({
      slides: JSON.parse(JSON.stringify(historyState.slides)),
      selectedSlideId: historyState.selectedSlideId,
      historyIndex: newIndex,
      selectedElementIds: [],
    });
  },

  redo: () => {
    const state = get();
    if (state.historyIndex >= state.history.length - 1) return;

    const newIndex = state.historyIndex + 1;
    const historyState = state.history[newIndex];

    set({
      slides: JSON.parse(JSON.stringify(historyState.slides)),
      selectedSlideId: historyState.selectedSlideId,
      historyIndex: newIndex,
      selectedElementIds: [],
    });
  },

  // Utility
  getElementById: (elementId: string): SlideElement | undefined => {
    const selectedSlide = get().getSelectedSlide();
    return selectedSlide?.elements.find((el) => el.id === elementId);
  },

  getSelectedSlide: (): Slide | undefined => {
    const state = get();
    return state.slides.find((s) => s.id === state.selectedSlideId);
  },
}));
