'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Share2, Sparkles, Edit3, X, Download } from 'lucide-react';
// import EditPanel from '@/components/EditPanel';

// API URL from environment variable, fallback to localhost for development
const API_URL = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

export default function ViewPresentationPage() {
  const params = useParams();
  const jobId = params.jobId as string;
  
  const [slides, setSlides] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [preloadedSlides, setPreloadedSlides] = useState<Set<number>>(new Set([0]));
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [shareUrl, setShareUrl] = useState<string>('');
  
  // Export modal state
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'pptx' | 'slides'>('pdf');
  const [exportRange, setExportRange] = useState<'all' | 'custom'>('all');

  const fetchSlides = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/presentations/${jobId}/slides`);
      
      if (!response.ok) {
        throw new Error('Failed to load presentation');
      }

      const data = await response.json();
      console.log('Fetched presentation data:', data);
      
      // Construct public viewer URL for sharing
      // Use production domain if available, otherwise use current origin
      const productionDomain = process.env.NEXT_PUBLIC_PRODUCTION_URL || window.location.origin;
      const publicViewUrl = `${productionDomain}/public-view/${jobId}`;
      console.log('Setting share URL to:', publicViewUrl);
      setShareUrl(publicViewUrl);
      
      // Extract slide HTML from the response and force visibility
      if (data.slides && Array.isArray(data.slides)) {
        const slideContents = data.slides
          .sort((a: any, b: any) => a.number - b.number)
          .map((slide: any) => {
            // Inject CSS to force slide visibility AND add rounded corners + shadow
            const enhancedCSS = `
              <style>
                .slide, .slide.active, section.slide, section {
                  opacity: 1 !important;
                  visibility: visible !important;
                  z-index: 10 !important;
                  border-radius: 24px !important;
                  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 10px 20px -5px rgba(0, 0, 0, 0.2) !important;
                }
                body {
                  background: #E5E7EB !important;
                }
              </style>
            `;
            
            // Insert the CSS before closing </head> tag
            if (slide.html.includes('</head>')) {
              return slide.html.replace('</head>', `${enhancedCSS}</head>`);
            }
            
            // If no </head> tag, insert at the beginning of <body>
            if (slide.html.includes('<body>')) {
              return slide.html.replace('<body>', `<body>${enhancedCSS}`);
            }
            
            // Fallback: prepend to the entire HTML
            return enhancedCSS + slide.html;
          });
        
        setSlides(slideContents);
        console.log(`Loaded ${slideContents.length} slides with visibility fix + styling`);
      }
      
      setLoading(false);
    } catch (err: any) {
      console.error('Error fetching slides:', err);
      setError(err.message || 'Failed to load presentation');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) {
      fetchSlides();
    }
  }, [jobId, refreshKey]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      const nextIndex = currentSlide + 1;
      setCurrentSlide(nextIndex);
      // Preload next slide
      if (nextIndex + 1 < slides.length) {
        setPreloadedSlides(prev => new Set([...prev, nextIndex + 1]));
      }
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      const prevIndex = currentSlide - 1;
      setCurrentSlide(prevIndex);
      // Preload previous slide
      if (prevIndex - 1 >= 0) {
        setPreloadedSlides(prev => new Set([...prev, prevIndex - 1]));
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          break;
        case 'Escape':
          if (isFullscreen) {
            document.exitFullscreen();
            setIsFullscreen(false);
          }
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, slides.length, isFullscreen]);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
            <p className="text-lg font-semibold mb-2">Error Loading Presentation</p>
            <p className="text-sm">{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-lg">No slides found in this presentation.</p>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    // Share the public viewer URL (without edit/download buttons)
    const urlToShare = shareUrl || window.location.href;
    console.log('Sharing URL:', urlToShare);
    console.log('Share URL state:', shareUrl);
    navigator.clipboard.writeText(urlToShare);
    alert(`Public view link copied to clipboard!\n${urlToShare}`);
  };

  const handleEditSuccess = () => {
    // Refresh slides by incrementing refresh key
    setRefreshKey(prev => prev + 1);
    setCurrentSlide(0); // Reset to first slide
  };

  return (
    <div className="relative w-screen h-screen bg-gray-100 overflow-hidden">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Left: Title/Logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-gray-800 font-semibold text-base">
              Presentation Viewer
            </span>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                // Save jobId to localStorage for editor
                localStorage.setItem('editorJobId', jobId);
                // Navigate to editor
                window.location.href = '/editor';
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 text-white hover:shadow-lg transition-all"
              title="Edit Presentation"
            >
              <Edit3 className="w-4 h-4" />
              <span className="hidden md:inline">Edit</span>
            </button>

            <button
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-all"
              title="Download Presentation"
            >
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">Download</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all"
              title="Share"
            >
              <Share2 className="w-4 h-4 text-gray-700" />
            </button>

            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4 text-gray-700" />
              ) : (
                <Maximize2 className="w-4 h-4 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Slide Display - Full screen like z.ai with smooth transitions */}
      <div className="absolute inset-0 pt-16 pb-20 px-4 flex items-center justify-center overflow-hidden">
        {slides.map((slide, index) => (
          <iframe
            key={`slide-${index}`}
            srcDoc={slide}
            className="border-0 absolute transition-opacity duration-500 ease-in-out"
            sandbox="allow-scripts allow-same-origin"
            title={`Slide ${index + 1}`}
            style={{
              width: '100vw',
              height: 'calc(100vh - 10rem)',
              transform: 'scale(1.30)',
              transformOrigin: 'center center',
              opacity: currentSlide === index ? 1 : 0,
              pointerEvents: currentSlide === index ? 'auto' : 'none',
              zIndex: currentSlide === index ? 10 : 1,
            }}
          />
        ))}
      </div>

      {/* Left Navigation Arrow - Enlarged 10% with black background */}
      <button
        onClick={prevSlide}
        disabled={currentSlide === 0}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-black hover:bg-gray-900 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-xl"
        style={{ width: '52.8px', height: '52.8px' }}
        title="Previous"
      >
        <ChevronLeft className="w-7 h-7 text-white" />
      </button>

      {/* Right Navigation Arrow - Enlarged 10% with black background */}
      <button
        onClick={nextSlide}
        disabled={currentSlide === slides.length - 1}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-black hover:bg-gray-900 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-xl"
        style={{ width: '52.8px', height: '52.8px' }}
        title="Next"
      >
        <ChevronRight className="w-7 h-7 text-white" />
      </button>

      {/* Bottom Progress Counter */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-white px-6 py-2 rounded-full shadow-lg">
          <span className="text-gray-800 font-medium text-sm">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>
      </div>

      {/* Edit Panel Modal */}
      {showEditPanel && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm">
          <div className="absolute inset-0 overflow-auto">
            <div className="min-h-screen flex items-center justify-center p-4">
              <div className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto">
                {/* Close Button */}
                <button
                  onClick={() => setShowEditPanel(false)}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all z-10"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>

                {/* Edit Panel Content */}
                {/* <div className="p-6">
                  <EditPanel
                    jobId={jobId}
                    onEditSuccess={() => {
                      handleEditSuccess();
                      setShowEditPanel(false);
                    }}
                    totalSlides={slides.length}
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}

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
                // Download as ZIP
                window.location.href = `${API_URL}/api/presentations/${jobId}/export.zip`;
                setShowExportModal(false);
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
