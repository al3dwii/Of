'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Sparkles } from 'lucide-react';

// API URL from environment variable, fallback to localhost for development
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function PublicViewPresentationPage() {
  const params = useParams();
  const jobId = params.jobId as string;
  
  const [slides, setSlides] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [preloadedSlides, setPreloadedSlides] = useState<Set<number>>(new Set([0]));

  const fetchSlides = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/presentations/${jobId}/slides`);
      
      if (!response.ok) {
        throw new Error('Failed to load presentation');
      }

      const data = await response.json();
      console.log('Fetched presentation data:', data);
      
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
  }, [jobId]);

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

  return (
    <div className="relative w-screen h-screen bg-gray-100 overflow-hidden">
      {/* Top Bar - Simple, no action buttons */}
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

          {/* Right: Only Fullscreen Button */}
          <div className="flex items-center gap-2">
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
    </div>
  );
}
