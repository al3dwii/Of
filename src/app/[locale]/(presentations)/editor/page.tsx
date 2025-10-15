'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Save, X, Home, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Palette, Undo, Redo, Image as ImageIcon, Plus, Copy, Trash2, Menu, ChevronDown, Link, Eye, EyeOff, MessageSquarePlus, Layout, Download } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Dynamically import interactjs only in browser
let interact: any = null;

export default function EditorPage() {
  const router = useRouter();
  const [slides, setSlides] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [editMode, setEditMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const iframeRefs = useRef<{ [key: number]: HTMLIFrameElement | null }>({});
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // History tracking for undo/redo
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;
  
  // Sidebar and context menu states
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; slideIndex: number } | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Toolbar dropdown states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // Export modal state
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'pptx' | 'slides'>('pdf');
  const [exportRange, setExportRange] = useState<'all' | 'custom'>('all');

  const fetchSlides = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/presentations/${id}/slides`);
      
      if (!response.ok) throw new Error('Failed to load presentation');

      const data = await response.json();
      
      if (data.slides && Array.isArray(data.slides)) {
        const slideContents = data.slides
          .sort((a: any, b: any) => a.number - b.number)
          .map((slide: any) => slide.html);
        
        setSlides(slideContents);
      }
      
      setLoading(false);
    } catch (err: any) {
      setError(err?.message || 'Failed to load presentation');
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedJobId = localStorage.getItem('editorJobId');
    
    if (storedJobId) {
      setJobId(storedJobId);
      fetchSlides(storedJobId);
    } else {
      setError('No presentation ID found');
      setLoading(false);
    }
  }, []);

  // Initialize history when slide changes
  useEffect(() => {
    const iframe = iframeRefs.current[currentSlide];
    if (!iframe?.contentWindow || !slides[currentSlide]) return;
    
    // Wait for iframe to load
    const timer = setTimeout(() => {
      const iframeDoc = iframe.contentWindow?.document;
      if (iframeDoc) {
        const currentHTML = iframeDoc.documentElement.outerHTML;
        setHistory([currentHTML]);
        setHistoryIndex(0);
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [currentSlide, slides]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.relative')) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openDropdown]);

  // Apply edit mode to current slide with Interact.js
  useEffect(() => {
    if (!editMode) {
      setSelectedElement(null);
      return;
    }

    const iframe = iframeRefs.current[currentSlide];
    if (!iframe?.contentWindow) return;

    const iframeDoc = iframe.contentWindow.document;
    
    // Inject CSS for better editing experience
    const style = iframeDoc.createElement('style');
    style.textContent = `
      .interact-draggable {
        cursor: move !important;
        touch-action: none;
        user-select: none;
      }
      .interact-hover {
        outline: 2px dashed rgba(147, 51, 234, 0.5) !important;
        outline-offset: 2px;
      }
      .interact-selected {
        outline: 2px solid rgba(147, 51, 234, 0.8) !important;
        outline-offset: 2px;
        position: relative !important;
      }
      .interact-resizing {
        outline: 2px solid rgba(59, 130, 246, 0.8) !important;
      }
      *[contenteditable="true"]:focus {
        outline: 2px solid rgba(59, 130, 246, 0.5) !important;
        outline-offset: 2px;
        cursor: text !important;
      }
      /* Resize handles - corner bullets */
      .resize-handle {
        position: absolute;
        width: 14px;
        height: 14px;
        background: linear-gradient(135deg, #9333ea 0%, #6366f1 100%);
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        pointer-events: auto;
        transition: all 0.2s ease;
      }
      .resize-handle:hover {
        transform: scale(1.3);
        box-shadow: 0 3px 8px rgba(147, 51, 234, 0.5);
      }
      .resize-handle.nw { 
        top: -7px; 
        left: -7px; 
        cursor: nw-resize; 
      }
      .resize-handle.ne { 
        top: -7px; 
        right: -7px; 
        cursor: ne-resize; 
      }
      .resize-handle.sw { 
        bottom: -7px; 
        left: -7px; 
        cursor: sw-resize; 
      }
      .resize-handle.se { 
        bottom: -7px; 
        right: -7px; 
        cursor: se-resize; 
      }
    `;
    iframeDoc.head.appendChild(style);

    // Make all text elements and images draggable and resizable with Interact.js
    const textElements = iframeDoc.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, div, span, a, button, img, .image-container');
    
    // Add slide background as a selectable element (but not draggable)
    // Use the first child of body if available, otherwise use body itself
    const slideBackground: any = iframeDoc.body.children[0] || iframeDoc.body;
    slideBackground.classList.add('interact-background');
    slideBackground.setAttribute('data-is-background', 'true');
    
    // Make background selectable but not draggable
    slideBackground.addEventListener('mouseenter', (e: any) => {
      const target = e.target as HTMLElement;
      // Only show hover if directly hovering the background (not its children)
      if (target === slideBackground && !slideBackground.classList.contains('interact-selected')) {
        // Query all interactive elements dynamically
        const allCurrentElements = iframeDoc.querySelectorAll('.interact-draggable, .image-container');
        allCurrentElements.forEach((elem: any) => {
          elem.classList.remove('interact-hover');
        });
        slideBackground.classList.add('interact-hover');
      }
    });

    slideBackground.addEventListener('mouseleave', (e: any) => {
      slideBackground.classList.remove('interact-hover');
    });

    slideBackground.addEventListener('click', (e: any) => {
      e.stopPropagation();
      console.log('Background clicked!');
      
      // Query all interactive elements dynamically (to include newly added elements)
      const allCurrentElements = iframeDoc.querySelectorAll('.interact-draggable, .image-container');
      
      // Remove hover and selection from all other elements
      allCurrentElements.forEach((elem: any) => {
        elem.classList.remove('interact-hover', 'interact-selected');
        const handles = elem.querySelectorAll('.resize-handle');
        handles.forEach((h: any) => h.remove());
      });
      slideBackground.classList.add('interact-selected');
      slideBackground.classList.remove('interact-hover');
      console.log('Setting selected element to background:', slideBackground);
      setSelectedElement(slideBackground as HTMLElement);
    });
    
    textElements.forEach((el: any) => {
      el.classList.add('interact-draggable');
      
      // Ensure element has position for transforms
      const computedStyle = iframeDoc.defaultView?.getComputedStyle(el);
      if (computedStyle?.position === 'static') {
        el.style.position = 'relative';
      }
      
      // Store initial transform
      el.setAttribute('data-x', '0');
      el.setAttribute('data-y', '0');

      // Initialize Interact.js on this element - context will be from iframe
      const interactable = interact(el, { context: iframeDoc as any })
        .draggable({
          inertia: true,
          modifiers: [
            interact.modifiers.restrictRect({
              restriction: 'parent',
              endOnly: true
            })
          ],
          autoScroll: true,
          listeners: {
            start(event: any) {
              event.target.classList.add('interact-selected');
              setSelectedElement(event.target);
            },
            move(event: any) {
              const target = event.target;
              const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
              const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

              target.style.transform = `translate(${x}px, ${y}px)`;
              target.setAttribute('data-x', x.toString());
              target.setAttribute('data-y', y.toString());
            },
            end(event: any) {
              // Trigger auto-save after drag ends
              triggerAutoSave();
            }
          }
        })
        .resizable({
          // Enable all edges for corner detection
          edges: { 
            left: true, 
            right: true, 
            bottom: true, 
            top: true 
          },
          // Larger margin makes it easier to grab corners
          margin: 20,
          listeners: {
            start(event: any) {
              event.target.classList.add('interact-resizing');
              // Store original dimensions for scaling children
              const target = event.target;
              target.setAttribute('data-original-width', target.offsetWidth.toString());
              target.setAttribute('data-original-height', target.offsetHeight.toString());
              
              // Store original dimensions of all children
              const children = target.querySelectorAll('*');
              children.forEach((child: any) => {
                const computedStyle = window.getComputedStyle(child);
                child.setAttribute('data-original-width', child.offsetWidth.toString());
                child.setAttribute('data-original-height', child.offsetHeight.toString());
                child.setAttribute('data-original-font-size', computedStyle.fontSize);
                child.setAttribute('data-original-padding', computedStyle.padding);
                child.setAttribute('data-original-margin', computedStyle.margin);
              });
            },
            move(event: any) {
              const target = event.target;
              let x = parseFloat(target.getAttribute('data-x')) || 0;
              let y = parseFloat(target.getAttribute('data-y')) || 0;

              const originalWidth = parseFloat(target.getAttribute('data-original-width')) || target.offsetWidth;
              const originalHeight = parseFloat(target.getAttribute('data-original-height')) || target.offsetHeight;
              
              const newWidth = event.rect.width;
              const newHeight = event.rect.height;
              
              // Calculate scale factors
              const scaleX = newWidth / originalWidth;
              const scaleY = newHeight / originalHeight;

              target.style.width = newWidth + 'px';
              target.style.height = newHeight + 'px';

              x += event.deltaRect.left;
              y += event.deltaRect.top;

              target.style.transform = `translate(${x}px, ${y}px)`;
              target.setAttribute('data-x', x.toString());
              target.setAttribute('data-y', y.toString());
              
              // Scale all child elements proportionally
              const children = target.querySelectorAll('*');
              children.forEach((child: any) => {
                const origWidth = parseFloat(child.getAttribute('data-original-width'));
                const origHeight = parseFloat(child.getAttribute('data-original-height'));
                const origFontSize = child.getAttribute('data-original-font-size');
                
                if (origWidth && origHeight) {
                  // Scale dimensions
                  child.style.width = (origWidth * scaleX) + 'px';
                  child.style.height = (origHeight * scaleY) + 'px';
                  child.style.maxWidth = (origWidth * scaleX) + 'px';
                  child.style.maxHeight = (origHeight * scaleY) + 'px';
                }
                
                // Scale font size
                if (origFontSize) {
                  const fontSize = parseFloat(origFontSize);
                  const scaledFontSize = fontSize * Math.min(scaleX, scaleY);
                  child.style.fontSize = scaledFontSize + 'px';
                }
              });
            },
            end(event: any) {
              event.target.classList.remove('interact-resizing');
              // Clean up temporary attributes
              const target = event.target;
              target.removeAttribute('data-original-width');
              target.removeAttribute('data-original-height');
              
              const children = target.querySelectorAll('*');
              children.forEach((child: any) => {
                child.removeAttribute('data-original-width');
                child.removeAttribute('data-original-height');
                child.removeAttribute('data-original-font-size');
                child.removeAttribute('data-original-padding');
                child.removeAttribute('data-original-margin');
              });
              
              // Trigger auto-save after resize ends
              triggerAutoSave();
            }
          },
          modifiers: [
            interact.modifiers.restrictSize({
              min: { width: 50, height: 20 }
            })
          ]
        });

      // Create resize handles (corner bullets)
      const createResizeHandles = () => {
        // Remove existing handles
        const existingHandles = el.querySelectorAll('.resize-handle');
        existingHandles.forEach((h: any) => h.remove());

        const positions = ['nw', 'ne', 'sw', 'se'];
        positions.forEach(pos => {
          const handle = iframeDoc.createElement('div');
          handle.className = `resize-handle ${pos}`;
          handle.setAttribute('data-position', pos);
          
          // Prevent dragging when clicking on handle
          handle.addEventListener('mousedown', (e: MouseEvent) => {
            e.stopPropagation();
          });
          
          el.appendChild(handle);
        });
      };

      // Mouse enter - show hover outline only for this element
      el.addEventListener('mouseenter', (e: MouseEvent) => {
        // Only show hover if not already selected
        if (!el.classList.contains('interact-selected')) {
          // Query all interactive elements dynamically
          const allCurrentElements = iframeDoc.querySelectorAll('.interact-draggable, .image-container');
          // Remove hover from all other elements
          allCurrentElements.forEach((elem: any) => {
            elem.classList.remove('interact-hover');
          });
          el.classList.add('interact-hover');
        }
      });

      // Mouse leave - remove hover outline
      el.addEventListener('mouseleave', (e: MouseEvent) => {
        // Only remove hover if not moving to a child element
        const relatedTarget = e.relatedTarget as HTMLElement;
        if (!el.contains(relatedTarget)) {
          el.classList.remove('interact-hover');
        }
      });

      // Click to select
      el.addEventListener('click', (e: MouseEvent) => {
        e.stopPropagation();
        
        // Query all interactive elements dynamically (to include newly added elements)
        const allCurrentElements = iframeDoc.querySelectorAll('.interact-draggable, .image-container');
        
        // Remove hover from all elements
        allCurrentElements.forEach((elem: any) => {
          elem.classList.remove('interact-hover');
        });
        // Remove previous selection and handles
        allCurrentElements.forEach((elem: any) => {
          elem.classList.remove('interact-selected');
          const handles = elem.querySelectorAll('.resize-handle');
          handles.forEach((h: any) => h.remove());
        });
        el.classList.add('interact-selected');
        setSelectedElement(el as HTMLElement);
        
        // Show resize handles for selected element
        createResizeHandles();
      });

      // Double-click to edit text
      el.addEventListener('dblclick', (e: MouseEvent) => {
        e.stopPropagation();
        el.setAttribute('contenteditable', 'true');
        el.style.cursor = 'text';
        el.focus();
        
        // Disable dragging while editing
        interactable.draggable(false);
      });

      // Blur to stop editing
      el.addEventListener('blur', () => {
        el.removeAttribute('contenteditable');
        el.style.cursor = 'move';
        // Re-enable dragging
        interactable.draggable(true);
        // Trigger auto-save after text edit
        triggerAutoSave();
      });
      
      // Also trigger auto-save on input/change while editing
      el.addEventListener('input', () => {
        if (el.hasAttribute('contenteditable')) {
          triggerAutoSave();
        }
      });
    });

    // Global mousemove handler to show hover on containers when hovering empty space
    iframeDoc.addEventListener('mousemove', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if we're hovering over an interactive element or its child
      let hoveredElement: any = null;
      
      textElements.forEach((elem: any) => {
        if (elem.contains(target) || elem === target) {
          hoveredElement = elem;
        }
      });
      
      // If hovering over empty space or a child, find the closest parent container
      if (!hoveredElement && target !== iframeDoc.body) {
        let parent = target.parentElement;
        while (parent && parent !== iframeDoc.body) {
          const found = Array.from(textElements).find((elem: any) => elem === parent);
          if (found) {
            hoveredElement = found;
            break;
          }
          parent = parent.parentElement;
        }
      }
      
      // If still no element found and hovering on background, show background hover
      if (!hoveredElement && target === slideBackground && !slideBackground.classList.contains('interact-selected')) {
        hoveredElement = slideBackground;
      }
      
      // Update hover states
      if (hoveredElement && !hoveredElement.classList.contains('interact-selected')) {
        textElements.forEach((elem: any) => {
          if (elem !== hoveredElement) {
            elem.classList.remove('interact-hover');
          }
        });
        if (slideBackground !== hoveredElement) {
          slideBackground.classList.remove('interact-hover');
        }
        hoveredElement.classList.add('interact-hover');
      }
    });

    // Click anywhere to deselect if not clicking on an interactive element
    iframeDoc.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      console.log('Document clicked, target:', target.tagName, target.className);
      
      // Check if the click target is an interactive element or a resize handle
      let clickedInteractive = false;
      
      // Check if clicked on a resize handle
      if (target.classList.contains('resize-handle')) {
        console.log('Clicked on resize handle, not deselecting');
        return; // Don't deselect when clicking resize handles
      }
      
      // Check if clicked on background
      if (target === slideBackground) {
        console.log('Clicked on background');
        clickedInteractive = true;
      }
      
      // Query for all interactive elements dynamically (to include newly added images)
      const allInteractiveElements = iframeDoc.querySelectorAll('.interact-draggable, .image-container');
      console.log('Total interactive elements found:', allInteractiveElements.length);
      
      // Check if clicked on an interactive element
      allInteractiveElements.forEach((elem: any) => {
        if (elem === target || elem.contains(target)) {
          console.log('Clicked on interactive element:', elem.tagName, elem.className);
          clickedInteractive = true;
        }
      });
      
      // If clicked outside interactive elements, deselect all
      if (!clickedInteractive) {
        console.log('Clicked outside, deselecting all elements');
        allInteractiveElements.forEach((elem: any) => {
          elem.classList.remove('interact-selected', 'interact-hover');
          // Remove resize handles
          const handles = elem.querySelectorAll('.resize-handle');
          handles.forEach((h: any) => h.remove());
        });
        slideBackground.classList.remove('interact-selected', 'interact-hover');
        setSelectedElement(null);
      } else {
        console.log('Clicked on interactive element, keeping selection');
      }
    });

    return () => {
      // Clean up Interact.js instances
      textElements.forEach((el: any) => {
        const instance = interact(el, { context: iframeDoc as any });
        if (instance) instance.unset();
        el.classList.remove('interact-draggable', 'interact-selected', 'interact-hover');
        el.removeAttribute('contenteditable');
        el.removeAttribute('data-x');
        el.removeAttribute('data-y');
        // Remove resize handles
        const handles = el.querySelectorAll('.resize-handle');
        handles.forEach((h: any) => h.remove());
      });
      // Clean up background
      slideBackground.classList.remove('interact-background', 'interact-selected', 'interact-hover');
      slideBackground.removeAttribute('data-is-background');
    };
  }, [editMode, currentSlide]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setSelectedElement(null);
  };

  // Slide management functions
  const addNewSlide = () => {
    const newSlide = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { 
      margin: 0; 
      padding: 40px; 
      font-family: Arial, sans-serif; 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    h1 { color: white; font-size: 48px; text-align: center; }
  </style>
</head>
<body>
  <h1>New Slide</h1>
</body>
</html>`;
    setSlides([...slides, newSlide]);
    setCurrentSlide(slides.length);
  };

  const duplicateSlide = (index: number) => {
    const newSlides = [...slides];
    newSlides.splice(index + 1, 0, slides[index]);
    setSlides(newSlides);
    setCurrentSlide(index + 1);
  };

  const deleteSlide = (index: number) => {
    if (slides.length === 1) {
      alert('Cannot delete the only slide!');
      return;
    }
    const newSlides = slides.filter((_, i) => i !== index);
    setSlides(newSlides);
    if (currentSlide >= newSlides.length) {
      setCurrentSlide(newSlides.length - 1);
    } else if (currentSlide > index) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const moveSlide = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= slides.length) return;
    const newSlides = [...slides];
    const [movedSlide] = newSlides.splice(fromIndex, 1);
    newSlides.splice(toIndex, 0, movedSlide);
    setSlides(newSlides);
    setCurrentSlide(toIndex);
  };

  const handleContextMenu = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, slideIndex: index });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const handleSave = async (showAlert = true) => {
    if (!jobId) return;
    setSaving(true);
    setSaveStatus('saving');
    
    try {
      const iframe = iframeRefs.current[currentSlide];
      if (!iframe?.contentWindow) throw new Error('Could not access slide content');
      
      const iframeDoc = iframe.contentWindow.document;
      const updatedHTML = iframeDoc.documentElement.outerHTML;
      
      // Note: slide_number is 1-indexed, but currentSlide is 0-indexed
      const slideNumber = currentSlide + 1;
      
      const response = await fetch(`${API_URL}/api/presentations/${jobId}/slides/${slideNumber}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html: updatedHTML, number: slideNumber }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.detail || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }
      
      const result = await response.json();
      console.log('Save successful:', result);
      
      setSaveStatus('saved');
      if (showAlert) {
        alert('✅ Slide saved successfully!');
      }
    } catch (err: any) {
      console.error('Save error:', err);
      setSaveStatus('unsaved');
      
      // More helpful error messages
      let errorMessage = 'Unknown error';
      if (err.message.includes('fetch')) {
        errorMessage = 'Network error - is the backend running?';
      } else if (err.message.includes('404')) {
        errorMessage = 'Presentation not found';
      } else if (err.message.includes('500')) {
        errorMessage = 'Server error - check backend logs';
      } else {
        errorMessage = err.message;
      }
      
      if (showAlert) {
        alert(`❌ Failed to save: ${errorMessage}\n\nTip: Check that backend is running on ${API_URL}`);
      } else {
        // For auto-save failures, just log to console
        console.warn('Auto-save failed:', errorMessage);
      }
    } finally {
      setSaving(false);
    }
  };

  // Auto-save with debouncing (2 seconds after last change)
  const triggerAutoSave = () => {
    if (!editMode) return;
    
    setSaveStatus('unsaved');
    
    // Clear existing timeout
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }
    
    // Set new timeout for auto-save
    autoSaveTimeoutRef.current = setTimeout(() => {
      handleSave(false); // Don't show alert for auto-save
    }, 2000); // 2 seconds debounce
  };

  // Cleanup auto-save timeout on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, []);

  // Text styling functions
  const applyTextStyle = (style: string) => {
    if (!selectedElement) return;
    saveToHistory();
    
    switch (style) {
      case 'bold':
        selectedElement.style.fontWeight = selectedElement.style.fontWeight === 'bold' ? 'normal' : 'bold';
        break;
      case 'italic':
        selectedElement.style.fontStyle = selectedElement.style.fontStyle === 'italic' ? 'normal' : 'italic';
        break;
      case 'underline':
        selectedElement.style.textDecoration = selectedElement.style.textDecoration === 'underline' ? 'none' : 'underline';
        break;
    }
    triggerAutoSave();
  };

  const applyTextAlign = (align: string) => {
    if (!selectedElement) return;
    saveToHistory();
    selectedElement.style.textAlign = align;
    triggerAutoSave();
  };

  const applyFontSize = (change: number) => {
    if (!selectedElement) return;
    saveToHistory();
    const currentSize = parseInt(window.getComputedStyle(selectedElement).fontSize);
    selectedElement.style.fontSize = `${currentSize + change}px`;
    triggerAutoSave();
  };

  const applyColor = (color: string) => {
    if (!selectedElement) return;
    saveToHistory();
    selectedElement.style.color = color;
    triggerAutoSave();
  };

  const applyFontFamily = (fontFamily: string) => {
    if (!selectedElement) return;
    saveToHistory();
    selectedElement.style.fontFamily = fontFamily;
    triggerAutoSave();
  };

  const applyBackgroundColor = (color: string) => {
    console.log('=== applyBackgroundColor START ===');
    console.log('Color:', color);
    console.log('selectedElement:', selectedElement);
    console.log('selectedElement tagName:', selectedElement?.tagName);
    
    const iframe = iframeRefs.current[currentSlide];
    if (!iframe?.contentWindow) {
      console.log('No iframe found!');
      return;
    }
    const iframeDoc = iframe.contentWindow.document;
    
    // Save state before change
    saveToHistory();
    
    // If background is selected, apply directly to it
    if (selectedElement) {
      const hasDataAttr = selectedElement.hasAttribute('data-is-background');
      const hasClass = selectedElement.classList.contains('interact-background');
      console.log('Has data-is-background attr:', hasDataAttr);
      console.log('Has interact-background class:', hasClass);
      
      const isBackground = hasDataAttr || hasClass;
      if (isBackground) {
        console.log('Applying to selected background element!');
        // Remove any background-image that might be blocking the color
        selectedElement.style.setProperty('background-image', 'none', 'important');
        selectedElement.style.setProperty('background', color, 'important');
        selectedElement.style.setProperty('background-color', color, 'important');
        // If it's the body, also set the HTML background to prevent white showing through
        if (selectedElement === iframeDoc.body) {
          console.log('Also applying to documentElement');
          iframeDoc.documentElement.style.setProperty('background-image', 'none', 'important');
          iframeDoc.documentElement.style.setProperty('background', color, 'important');
          iframeDoc.documentElement.style.setProperty('background-color', color, 'important');
        }
        console.log('Color applied! New style:', selectedElement.style.backgroundColor);
        console.log('=== applyBackgroundColor END (applied to selected) ===');
        triggerAutoSave();
        return;
      }
    }
    
    // Otherwise, find and apply to the main slide container or body
    console.log('No background selected, applying to first child or body');
    const mainElement = iframeDoc.body.children[0] as HTMLElement;
    if (mainElement) {
      console.log('Applying to first child:', mainElement.tagName);
      mainElement.style.setProperty('background-image', 'none', 'important');
      mainElement.style.setProperty('background', color, 'important');
      mainElement.style.setProperty('background-color', color, 'important');
    } else {
      console.log('Applying to body and documentElement');
      // Apply to body and html
      iframeDoc.body.style.setProperty('background-image', 'none', 'important');
      iframeDoc.body.style.setProperty('background', color, 'important');
      iframeDoc.body.style.setProperty('background-color', color, 'important');
      iframeDoc.documentElement.style.setProperty('background-image', 'none', 'important');
      iframeDoc.documentElement.style.setProperty('background', color, 'important');
      iframeDoc.documentElement.style.setProperty('background-color', color, 'important');
    }
    console.log('=== applyBackgroundColor END ===');
    triggerAutoSave();
  };

  // History management functions
  const saveToHistory = () => {
    const iframe = iframeRefs.current[currentSlide];
    if (!iframe?.contentWindow) return;
    
    const iframeDoc = iframe.contentWindow.document;
    const currentHTML = iframeDoc.documentElement.outerHTML;
    
    // Remove any future history if we're not at the end
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(currentHTML);
    
    // Limit history to 50 states
    if (newHistory.length > 50) {
      newHistory.shift();
    } else {
      setHistoryIndex(historyIndex + 1);
    }
    
    setHistory(newHistory);
  };

  const undo = () => {
    if (!canUndo) return;
    
    const iframe = iframeRefs.current[currentSlide];
    if (!iframe?.contentWindow) return;
    
    const newIndex = historyIndex - 1;
    const previousHTML = history[newIndex];
    
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(previousHTML);
    iframe.contentWindow.document.close();
    
    setHistoryIndex(newIndex);
  };

  const redo = () => {
    if (!canRedo) return;
    
    const iframe = iframeRefs.current[currentSlide];
    if (!iframe?.contentWindow) return;
    
    const newIndex = historyIndex + 1;
    const nextHTML = history[newIndex];
    
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(nextHTML);
    iframe.contentWindow.document.close();
    
    setHistoryIndex(newIndex);
  };

  // Helper function to make an element interactive (draggable, resizable, with resize handles)
  const makeElementInteractive = (el: HTMLElement, iframeDoc: Document, allElements: NodeListOf<Element>, isImageContainer: boolean = false) => {
    el.classList.add('interact-draggable');
    
    // Ensure element has position for transforms
    const computedStyle = iframeDoc.defaultView?.getComputedStyle(el);
    if (computedStyle?.position === 'static') {
      el.style.position = 'relative';
    }
    
    // Store initial transform
    el.setAttribute('data-x', '0');
    el.setAttribute('data-y', '0');

    // Initialize Interact.js on this element
    const interactable = interact(el, { context: iframeDoc as any })
      .draggable({
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true
          })
        ],
        autoScroll: true,
        listeners: {
          start(event: any) {
            event.target.classList.add('interact-selected');
            setSelectedElement(event.target);
          },
          move(event: any) {
            const target = event.target;
            const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            target.style.transform = `translate(${x}px, ${y}px)`;
            target.setAttribute('data-x', x.toString());
            target.setAttribute('data-y', y.toString());
          },
          end(event: any) {
            // Trigger auto-save after drag ends
            triggerAutoSave();
          }
        }
      })
      .resizable({
        edges: { 
          left: true, 
          right: true, 
          bottom: true, 
          top: true 
        },
        margin: 20,
        listeners: {
          start(event: any) {
            event.target.classList.add('interact-resizing');
            const target = event.target;
            target.setAttribute('data-original-width', target.offsetWidth.toString());
            target.setAttribute('data-original-height', target.offsetHeight.toString());
            
            // For image containers, resize the img inside
            if (isImageContainer) {
              const img = target.querySelector('img');
              if (img) {
                img.setAttribute('data-original-width', img.offsetWidth.toString());
                img.setAttribute('data-original-height', img.offsetHeight.toString());
              }
            } else if (target.tagName !== 'IMG') {
              // For other elements, scale children
              const children = target.querySelectorAll('*');
              children.forEach((child: any) => {
                const computedStyle = window.getComputedStyle(child);
                child.setAttribute('data-original-width', child.offsetWidth.toString());
                child.setAttribute('data-original-height', child.offsetHeight.toString());
                child.setAttribute('data-original-font-size', computedStyle.fontSize);
                child.setAttribute('data-original-padding', computedStyle.padding);
                child.setAttribute('data-original-margin', computedStyle.margin);
              });
            }
          },
          move(event: any) {
            const target = event.target;
            let x = parseFloat(target.getAttribute('data-x')) || 0;
            let y = parseFloat(target.getAttribute('data-y')) || 0;

            const originalWidth = parseFloat(target.getAttribute('data-original-width')) || target.offsetWidth;
            const originalHeight = parseFloat(target.getAttribute('data-original-height')) || target.offsetHeight;
            
            const newWidth = event.rect.width;
            const newHeight = event.rect.height;
            
            target.style.width = newWidth + 'px';
            target.style.height = newHeight + 'px';

            x += event.deltaRect.left;
            y += event.deltaRect.top;

            target.style.transform = `translate(${x}px, ${y}px)`;
            target.setAttribute('data-x', x.toString());
            target.setAttribute('data-y', y.toString());
            
            // For image containers, resize the image inside
            if (isImageContainer) {
              const img = target.querySelector('img');
              if (img) {
                const origWidth = parseFloat(img.getAttribute('data-original-width')) || img.offsetWidth;
                const origHeight = parseFloat(img.getAttribute('data-original-height')) || img.offsetHeight;
                const scaleX = newWidth / originalWidth;
                const scaleY = newHeight / originalHeight;
                
                // Maintain aspect ratio - use the smaller scale
                const scale = Math.min(scaleX, scaleY);
                img.style.width = (origWidth * scale) + 'px';
                img.style.height = (origHeight * scale) + 'px';
              }
            } else if (target.tagName !== 'IMG') {
              // Scale children proportionally (for text elements)
              const scaleX = newWidth / originalWidth;
              const scaleY = newHeight / originalHeight;
              
              const children = target.querySelectorAll('*');
              children.forEach((child: any) => {
                const origWidth = parseFloat(child.getAttribute('data-original-width'));
                const origHeight = parseFloat(child.getAttribute('data-original-height'));
                const origFontSize = child.getAttribute('data-original-font-size');
                
                if (origWidth && origHeight) {
                  child.style.width = (origWidth * scaleX) + 'px';
                  child.style.height = (origHeight * scaleY) + 'px';
                  child.style.maxWidth = (origWidth * scaleX) + 'px';
                  child.style.maxHeight = (origHeight * scaleY) + 'px';
                }
                
                if (origFontSize) {
                  const fontSize = parseFloat(origFontSize);
                  const scaledFontSize = fontSize * Math.min(scaleX, scaleY);
                  child.style.fontSize = scaledFontSize + 'px';
                }
              });
            }
          },
          end(event: any) {
            event.target.classList.remove('interact-resizing');
            const target = event.target;
            target.removeAttribute('data-original-width');
            target.removeAttribute('data-original-height');
            
            if (isImageContainer) {
              const img = target.querySelector('img');
              if (img) {
                img.removeAttribute('data-original-width');
                img.removeAttribute('data-original-height');
              }
            } else if (target.tagName !== 'IMG') {
              const children = target.querySelectorAll('*');
              children.forEach((child: any) => {
                child.removeAttribute('data-original-width');
                child.removeAttribute('data-original-height');
                child.removeAttribute('data-original-font-size');
                child.removeAttribute('data-original-padding');
                child.removeAttribute('data-original-margin');
              });
            }
            
            // Trigger auto-save after resize ends
            triggerAutoSave();
          }
        },
        modifiers: [
          interact.modifiers.restrictSize({
            min: { width: 50, height: 20 }
          })
        ]
      });

    // Create resize handles (corner bullets)
    const createResizeHandles = () => {
      const existingHandles = el.querySelectorAll('.resize-handle');
      existingHandles.forEach((h: any) => h.remove());

      const positions = ['nw', 'ne', 'sw', 'se'];
      positions.forEach(pos => {
        const handle = iframeDoc.createElement('div');
        handle.className = `resize-handle ${pos}`;
        handle.setAttribute('data-position', pos);
        
        handle.addEventListener('mousedown', (e: MouseEvent) => {
          e.stopPropagation();
        });
        
        el.appendChild(handle);
      });
      
      console.log('Created resize handles for:', el.tagName, 'Handles count:', el.querySelectorAll('.resize-handle').length);
    };

    // Mouse enter - show hover outline
    el.addEventListener('mouseenter', (e: MouseEvent) => {
      if (!el.classList.contains('interact-selected')) {
        // Query all interactive elements dynamically
        const allCurrentElements = iframeDoc.querySelectorAll('.interact-draggable, .image-container');
        allCurrentElements.forEach((elem: any) => {
          elem.classList.remove('interact-hover');
        });
        el.classList.add('interact-hover');
      }
    });

    // Mouse leave - remove hover outline
    el.addEventListener('mouseleave', (e: MouseEvent) => {
      const relatedTarget = e.relatedTarget as HTMLElement;
      if (!el.contains(relatedTarget)) {
        el.classList.remove('interact-hover');
      }
    });

    // Click to select
    el.addEventListener('click', (e: MouseEvent) => {
      e.stopPropagation();
      console.log('Element clicked:', el.tagName, el);
      
      // Query all interactive elements dynamically (to include newly added elements)
      const allCurrentElements = iframeDoc.querySelectorAll('.interact-draggable, .image-container');
      
      allCurrentElements.forEach((elem: any) => {
        elem.classList.remove('interact-hover');
      });
      allCurrentElements.forEach((elem: any) => {
        elem.classList.remove('interact-selected');
        const handles = elem.querySelectorAll('.resize-handle');
        handles.forEach((h: any) => h.remove());
      });
      el.classList.add('interact-selected');
      console.log('Element marked as selected');
      setSelectedElement(el as HTMLElement);
      console.log('Calling createResizeHandles...');
      createResizeHandles();
    });

    // Double-click to edit text (not for images or image containers)
    if (el.tagName !== 'IMG' && !isImageContainer) {
      el.addEventListener('dblclick', (e: MouseEvent) => {
        e.stopPropagation();
        el.setAttribute('contenteditable', 'true');
        el.style.cursor = 'text';
        el.focus();
        interactable.draggable(false);
      });

      el.addEventListener('blur', () => {
        el.removeAttribute('contenteditable');
        el.style.cursor = 'move';
        interactable.draggable(true);
      });
    }
  };

  // Insert image function
  const insertImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const iframe = iframeRefs.current[currentSlide];
        if (!iframe?.contentWindow) return;
        
        const iframeDoc = iframe.contentWindow.document;
        
        // Save state before change
        saveToHistory();
        
        // Create a wrapper div for the image (since img tags can't have children for resize handles)
        const imgContainer = iframeDoc.createElement('div');
        imgContainer.className = 'image-container';
        imgContainer.style.position = 'relative';
        imgContainer.style.display = 'inline-block';
        imgContainer.style.width = '400px';
        imgContainer.style.cursor = 'move';
        imgContainer.style.margin = '20px auto';
        
        // Create image element
        const img = iframeDoc.createElement('img');
        img.src = event.target?.result as string;
        img.style.width = '100%';
        img.style.height = 'auto';
        img.style.display = 'block';
        img.style.pointerEvents = 'none'; // Let the container handle events
        
        // Add image to container
        imgContainer.appendChild(img);
        
        console.log('Inserting image container into slide...');
        
        // Add to document
        const container = iframeDoc.body.children[0] || iframeDoc.body;
        container.appendChild(imgContainer);
        
        console.log('Image container appended to:', container.tagName);
        
        // Get all interactive elements (including the new image container)
        const allElements = iframeDoc.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, div, span, a, button, .image-container');
        
        console.log('Total interactive elements:', allElements.length);
        
        // Make it interactive with the same structure as existing elements
        makeElementInteractive(imgContainer, iframeDoc, allElements, true); // Pass true for isImageContainer
        
        console.log('Made image container interactive');
        
        // Automatically select the newly inserted image container and show resize handles
        setTimeout(() => {
          console.log('Clicking image container to select it...');
          imgContainer.click();
          console.log('Image container clicked, should have handles now');
        }, 100);
        
        // Trigger auto-save after inserting image
        triggerAutoSave();
      };
      
      reader.readAsDataURL(file);
    };
    
    input.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading presentation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-red-500/20 text-red-400 p-6 rounded-lg mb-4">
            <p className="text-lg font-semibold mb-2">Error</p>
            <p className="text-sm">{error}</p>
          </div>
          <button onClick={() => router.push('/test-agentic')} className="px-6 py-3 bg-purple-600 text-white rounded-lg">
            <Home className="w-4 h-4 inline mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen bg-gray-100 overflow-hidden" onClick={closeContextMenu}>
      {/* Left Sidebar - Slide Thumbnails */}
      <div 
        className={`absolute left-0 top-0 bottom-0 bg-white border-r border-gray-300 shadow-lg transition-all duration-300 z-40 ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          {!sidebarCollapsed && <span className="font-semibold text-gray-700">Slides</span>}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Slides List */}
        <div className="overflow-y-auto h-[calc(100vh-8rem)] p-2">
          {slides.map((slide, index) => (
            <div
              key={index}
              onClick={() => setCurrentSlide(index)}
              onContextMenu={(e) => handleContextMenu(e, index)}
              className={`group relative mb-3 cursor-pointer transition-all ${
                currentSlide === index 
                  ? 'ring-2 ring-blue-500 shadow-lg' 
                  : 'hover:ring-2 hover:ring-gray-300'
              } ${sidebarCollapsed ? 'hidden' : ''}`}
            >
              {/* Slide Number */}
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-gray-700 text-white text-xs rounded-full flex items-center justify-center font-semibold z-10">
                {index + 1}
              </div>

              {/* Slide Thumbnail */}
              <div className="relative bg-white border-2 border-gray-200 rounded overflow-hidden aspect-video">
                <iframe
                  srcDoc={slide}
                  className="w-full h-full pointer-events-none"
                  sandbox="allow-same-origin"
                  style={{ transform: 'scale(0.25)', transformOrigin: '0 0', width: '400%', height: '400%' }}
                />
              </div>

              {/* Hover Actions */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity rounded" />
            </div>
          ))}
        </div>

        {/* Add New Slide Button */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-white border-t border-gray-200">
          {!sidebarCollapsed && (
            <button
              onClick={addNewSlide}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>New Slide</span>
            </button>
          )}
          {sidebarCollapsed && (
            <button
              onClick={addNewSlide}
              className="w-full flex items-center justify-center p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              title="New Slide"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 min-w-[200px]"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              duplicateSlide(contextMenu.slideIndex);
              closeContextMenu();
            }}
            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors text-left"
          >
            <Copy className="w-4 h-4 text-gray-600" />
            <span className="text-sm">Duplicate Slide</span>
            <span className="ml-auto text-xs text-gray-400">⌘+D</span>
          </button>

          <button
            onClick={() => {
              deleteSlide(contextMenu.slideIndex);
              closeContextMenu();
            }}
            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors text-left text-red-600"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm">Delete Slide</span>
          </button>

          <div className="border-t border-gray-200 my-2" />

          <button
            onClick={() => {
              addNewSlide();
              closeContextMenu();
            }}
            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors text-left"
          >
            <Plus className="w-4 h-4 text-green-600" />
            <span className="text-sm">New Slide</span>
          </button>

          {contextMenu.slideIndex > 0 && (
            <button
              onClick={() => {
                moveSlide(contextMenu.slideIndex, contextMenu.slideIndex - 1);
                closeContextMenu();
              }}
              className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors text-left"
            >
              <ChevronDown className="w-4 h-4 text-gray-600 transform rotate-180" />
              <span className="text-sm">Move Up</span>
            </button>
          )}

          {contextMenu.slideIndex < slides.length - 1 && (
            <button
              onClick={() => {
                moveSlide(contextMenu.slideIndex, contextMenu.slideIndex + 1);
                closeContextMenu();
              }}
              className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors text-left"
            >
              <ChevronDown className="w-4 h-4 text-gray-600" />
              <span className="text-sm">Move Down</span>
            </button>
          )}
        </div>
      )}

      {/* Top Toolbar */}
      <div className={`absolute top-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm transition-all ${
        sidebarCollapsed ? 'left-16' : 'left-64'
      }`}>
        <div className="flex items-center justify-between px-6 py-3 gap-4">
          {/* Left side - Home, View, Download buttons */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => router.push('/test-agentic')} 
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              title="Home"
            >
              <Home className="w-5 h-5 text-gray-700" />
            </button>
            
            <button
              onClick={() => {
                if (jobId) {
                  window.open(`/view/${jobId}`, '_blank');
                }
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              title="View Presentation"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden md:inline">View</span>
            </button>
            
            <button
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              title="Download Presentation"
            >
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">Download</span>
            </button>
          </div>

          {/* Center - Editing tools (only in edit mode) */}
          {editMode && (
            <div className="flex items-center gap-2 flex-1 justify-center">
              {/* Undo/Redo - Always visible */}
              <div className="flex items-center gap-1">
                <button
                  onClick={undo}
                  disabled={!canUndo}
                  className="p-2 rounded hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Undo (⌘+Z)"
                >
                  <Undo className="w-4 h-4" />
                </button>
                <button
                  onClick={redo}
                  disabled={!canRedo}
                  className="p-2 rounded hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Redo (⌘+Shift+Z)"
                >
                  <Redo className="w-4 h-4" />
                </button>
              </div>

              <div className="w-px h-6 bg-gray-300 mx-1" />

              {/* INSERT Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'insert' ? null : 'insert')}
                  className="flex items-center gap-1 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                  title="Insert"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Insert</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                
                {openDropdown === 'insert' && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[180px]">
                    <button
                      onClick={() => {
                        insertImage();
                        setOpenDropdown(null);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50 text-left text-sm"
                    >
                      <ImageIcon className="w-4 h-4" />
                      <span>Image</span>
                    </button>
                  </div>
                )}
              </div>

              {/* TEXT STYLE Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'textstyle' ? null : 'textstyle')}
                  disabled={!selectedElement}
                  className="flex items-center gap-1 px-3 py-2 rounded hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Text Style"
                >
                  <Bold className="w-4 h-4" />
                  <span className="text-sm font-medium">Style</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                
                {openDropdown === 'textstyle' && selectedElement && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[180px]">
                    <button
                      onClick={() => {
                        applyTextStyle('bold');
                        setOpenDropdown(null);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50 text-left text-sm"
                    >
                      <Bold className="w-4 h-4" />
                      <span className="font-bold">Bold</span>
                    </button>
                    <button
                      onClick={() => {
                        applyTextStyle('italic');
                        setOpenDropdown(null);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50 text-left text-sm"
                    >
                      <Italic className="w-4 h-4" />
                      <span className="italic">Italic</span>
                    </button>
                    <button
                      onClick={() => {
                        applyTextStyle('underline');
                        setOpenDropdown(null);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50 text-left text-sm"
                    >
                      <Underline className="w-4 h-4" />
                      <span className="underline">Underline</span>
                    </button>
                  </div>
                )}
              </div>

              {/* FORMAT Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'format' ? null : 'format')}
                  disabled={!selectedElement}
                  className="flex items-center gap-1 px-3 py-2 rounded hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Format"
                >
                  <span className="text-sm font-medium">Format</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                
                {openDropdown === 'format' && selectedElement && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[250px] max-h-[400px] overflow-y-auto">
                    <div className="px-4 py-2 border-b border-gray-200 font-medium text-xs text-gray-600">Font Size</div>
                    <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50">
                      <button
                        onClick={() => applyFontSize(-2)}
                        className="flex-1 px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
                      >
                        A−
                      </button>
                      <button
                        onClick={() => applyFontSize(2)}
                        className="flex-1 px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
                      >
                        A+
                      </button>
                    </div>
                    
                    <div className="px-4 py-2 border-t border-gray-200 font-medium text-xs text-gray-600">Text Color</div>
                    <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50">
                      <Palette className="w-4 h-4 text-gray-600" />
                      <input
                        type="color"
                        onChange={(e) => applyColor(e.target.value)}
                        className="w-full h-8 rounded cursor-pointer"
                        title="Text color"
                      />
                    </div>
                    
                    <div className="px-4 py-2 border-t border-gray-200 font-medium text-xs text-gray-600">Font Family</div>
                    <select
                      onChange={(e) => {
                        applyFontFamily(e.target.value);
                        setOpenDropdown(null);
                      }}
                      className="w-full px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 focus:outline-none"
                      defaultValue=""
                    >
                      <option value="" disabled>Select font...</option>
                      <optgroup label="Standard Fonts">
                        <option value="Arial, sans-serif">Arial</option>
                        <option value="'Times New Roman', serif">Times New Roman</option>
                        <option value="'Courier New', monospace">Courier New</option>
                        <option value="Georgia, serif">Georgia</option>
                        <option value="Verdana, sans-serif">Verdana</option>
                        <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
                        <option value="'Comic Sans MS', cursive">Comic Sans MS</option>
                        <option value="Impact, sans-serif">Impact</option>
                        <option value="'Lucida Console', monospace">Lucida Console</option>
                        <option value="Tahoma, sans-serif">Tahoma</option>
                      </optgroup>
                      <optgroup label="Arabic Fonts">
                        <option value="'Traditional Arabic', serif">Traditional Arabic</option>
                        <option value="'Simplified Arabic', sans-serif">Simplified Arabic</option>
                        <option value="'Arabic Typesetting', serif">Arabic Typesetting</option>
                        <option value="'Sakkal Majalla', serif">Sakkal Majalla</option>
                        <option value="'Geeza Pro', sans-serif">Geeza Pro</option>
                        <option value="'Baghdad', serif">Baghdad</option>
                        <option value="'DecoType Naskh', serif">DecoType Naskh</option>
                        <option value="'Nadeem', sans-serif">Nadeem</option>
                        <option value="'Amiri', serif">Amiri</option>
                        <option value="'Scheherazade', serif">Scheherazade</option>
                        <option value="'Cairo', sans-serif">Cairo</option>
                        <option value="'Tajawal', sans-serif">Tajawal</option>
                        <option value="'Almarai', sans-serif">Almarai</option>
                        <option value="'Noto Naskh Arabic', serif">Noto Naskh Arabic</option>
                        <option value="'Noto Sans Arabic', sans-serif">Noto Sans Arabic</option>
                      </optgroup>
                    </select>
                  </div>
                )}
              </div>

              {/* ALIGN Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'align' ? null : 'align')}
                  disabled={!selectedElement}
                  className="flex items-center gap-1 px-3 py-2 rounded hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Align"
                >
                  <AlignLeft className="w-4 h-4" />
                  <span className="text-sm font-medium">Align</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                
                {openDropdown === 'align' && selectedElement && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[180px]">
                    <button
                      onClick={() => {
                        applyTextAlign('left');
                        setOpenDropdown(null);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50 text-left text-sm"
                    >
                      <AlignLeft className="w-4 h-4" />
                      <span>Align Left</span>
                    </button>
                    <button
                      onClick={() => {
                        applyTextAlign('center');
                        setOpenDropdown(null);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50 text-left text-sm"
                    >
                      <AlignCenter className="w-4 h-4" />
                      <span>Align Center</span>
                    </button>
                    <button
                      onClick={() => {
                        applyTextAlign('right');
                        setOpenDropdown(null);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50 text-left text-sm"
                    >
                      <AlignRight className="w-4 h-4" />
                      <span>Align Right</span>
                    </button>
                  </div>
                )}
              </div>

              {/* SLIDE Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'slide' ? null : 'slide')}
                  className="flex items-center gap-1 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                  title="Slide"
                >
                  <Layout className="w-4 h-4" />
                  <span className="text-sm font-medium">Slide</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                
                {openDropdown === 'slide' && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[200px]">
                    <div className="px-4 py-2 border-b border-gray-200 font-medium text-xs text-gray-600">Background</div>
                    <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50">
                      <span className="text-sm">Color:</span>
                      <input
                        type="color"
                        onChange={(e) => {
                          applyBackgroundColor(e.target.value);
                        }}
                        className="w-full h-8 rounded cursor-pointer"
                        title="Slide background color"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Right side - Edit Mode and Save buttons */}
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleEditMode} 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                editMode 
                  ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {editMode ? (
                <>
                  <X className="w-4 h-4" />
                  <span>Exit Edit</span>
                </>
              ) : (
                <>
                  <span>✏️</span>
                  <span>Edit Mode</span>
                </>
              )}
            </button>
            {/* Auto-save status indicator */}
            {editMode && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 text-sm border border-gray-200">
                {saveStatus === 'saved' && (
                  <>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    <span className="text-gray-700 font-medium">Saved</span>
                  </>
                )}
                {saveStatus === 'saving' && (
                  <>
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="text-gray-700 font-medium">Saving...</span>
                  </>
                )}
                {saveStatus === 'unsaved' && (
                  <>
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-400"></div>
                    <span className="text-gray-700 font-medium">Unsaved</span>
                  </>
                )}
              </div>
            )}
            <button 
              onClick={() => handleSave(true)} 
              disabled={saving || saveStatus === 'saving' || !editMode} 
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              title={saving || saveStatus === 'saving' ? 'Saving in progress...' : 'Save current slide'}
            >
              <Save className="w-4 h-4" />
              <span>{saving || saveStatus === 'saving' ? 'Saving...' : 'Save Now'}</span>
            </button>
          </div>
        </div>
      </div>
      {/* Slide Container */}
      <div className={`absolute inset-0 pt-20 pb-20 px-4 flex items-center justify-center transition-all ${
        sidebarCollapsed ? 'left-16' : 'left-64'
      }`}>
        {slides.map((slide, index) => (
          <iframe
            key={index}
            ref={(el) => {
              if (el) iframeRefs.current[index] = el;
            }}
            srcDoc={slide}
            className="border-0 absolute"
            sandbox="allow-scripts allow-same-origin"
            style={{
              width: sidebarCollapsed ? 'calc(100vw - 4rem)' : 'calc(100vw - 16rem)',
              height: 'calc(100vh - 10rem)',
              transform: 'scale(1.30)',
              opacity: currentSlide === index ? 1 : 0,
              pointerEvents: currentSlide === index ? 'auto' : 'none',
              zIndex: currentSlide === index ? 10 : 1,
            }}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button 
        onClick={prevSlide} 
        disabled={currentSlide === 0} 
        className={`absolute top-1/2 -translate-y-1/2 z-50 rounded-full bg-black hover:bg-gray-900 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all ${
          sidebarCollapsed ? 'left-20' : 'left-72'
        }`}
        style={{ width: '52.8px', height: '52.8px' }}
      >
        <ChevronLeft className="w-7 h-7 text-white" />
      </button>

      <button 
        onClick={nextSlide} 
        disabled={currentSlide === slides.length - 1} 
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-black hover:bg-gray-900 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all" 
        style={{ width: '52.8px', height: '52.8px' }}
      >
        <ChevronRight className="w-7 h-7 text-white" />
      </button>

      {/* Slide Counter */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-white px-6 py-2 rounded-full shadow-lg">
          <span className="text-gray-800 font-medium text-sm">{currentSlide + 1} / {slides.length}</span>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowExportModal(false)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {/* Modal Header */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Export Slides</h2>

            {/* Export Format */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Export Format</label>
              <div className="grid grid-cols-3 gap-4">
                {/* PDF Option */}
                <button
                  onClick={() => setSelectedFormat('pdf')}
                  className={`relative p-6 rounded-xl border-2 transition-all ${
                    selectedFormat === 'pdf'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg className="w-10 h-10 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18.5,9L13,3.5V9H18.5Z"/>
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-900">PDF</span>
                  </div>
                </button>

                {/* PPTX Option */}
                <button
                  onClick={() => setSelectedFormat('pptx')}
                  className={`relative p-6 rounded-xl border-2 transition-all ${
                    selectedFormat === 'pptx'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg className="w-10 h-10 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M13,3.5L18.5,9H13V3.5M8,11H16V13H8V11M8,15H13V17H8V15Z"/>
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-900">PPTX</span>
                  </div>
                </button>

                {/* Google Slides Option */}
                <button
                  onClick={() => setSelectedFormat('slides')}
                  className={`relative p-6 rounded-xl border-2 transition-all ${
                    selectedFormat === 'slides'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <svg className="w-10 h-10 text-yellow-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M7,20H9V14H7V20M11,20H13V12H11V20M15,20H17V16H15V20Z"/>
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-900">Google Slides</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Page Range */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">Page Range</label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 rounded-lg border-2 border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="range"
                    checked={exportRange === 'all'}
                    onChange={() => setExportRange('all')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-900 font-medium">All Pages (1-{slides.length})</span>
                </label>
                <label className="flex items-center gap-3 p-4 rounded-lg border-2 border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="range"
                    checked={exportRange === 'custom'}
                    onChange={() => setExportRange('custom')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-900 font-medium">Custom Range</span>
                </label>
              </div>
            </div>

            {/* Export Button */}
            <button
              onClick={() => {
                if (jobId) {
                  // Download as ZIP for now (can be extended to support PDF/PPTX later)
                  window.location.href = `${API_URL}/api/presentations/${jobId}/export.zip`;
                  setShowExportModal(false);
                }
              }}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Export
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
