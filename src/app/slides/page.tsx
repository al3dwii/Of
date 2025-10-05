'use client';

import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Presentation, Home, Settings, HelpCircle, Plus, Sparkles, Maximize2, Download, Edit, Share2, Link, FileText, Loader2 } from 'lucide-react';
import PromptForm from '@/components/PromptForm';
import StreamConsole from '@/components/StreamConsole';
import { createPresentation } from '@/lib/api';

export default function PresentPage() {
  const searchParams = useSearchParams();
  const [jobId, setJobId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [streamingHtml, setStreamingHtml] = useState<string>('');
  const [showHtmlCode, setShowHtmlCode] = useState(true);
  const shareMenuRef = useRef<HTMLDivElement>(null);
  
  // Slide streaming state
  const [slides, setSlides] = useState<Array<{number: number, html: string, streaming: boolean}>>([]);
  const [totalSlides, setTotalSlides] = useState<number>(0);
  // Track active tab for each slide
  const [slideTabs, setSlideTabs] = useState<Record<number, 'preview' | 'html' | 'edit'>>({});
  
  // Debug: Log slides state on every render
  console.log('[PRESENT PAGE RENDER] slides.length:', slides.length, 'totalSlides:', totalSlides, 'isLoading:', isLoading);

  // Auto-start generation if prompt is in URL
  useEffect(() => {
    const prompt = searchParams?.get('prompt');
    const autoStart = searchParams?.get('autoStart');
    
    if (prompt && autoStart === 'true' && !jobId && !isLoading) {
      console.log('[AUTO-START] Automatically submitting prompt:', prompt);
      handleSubmit(decodeURIComponent(prompt));
    }
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    setPreviewUrl(null);
    setStreamingHtml(''); // Reset HTML for new generation
    setSlideTabs({}); // Reset tabs
    
    // Create placeholder cards immediately (assume 5 slides by default)
    const defaultSlideCount = 5;
    const placeholderSlides = Array.from({length: defaultSlideCount}, (_, i) => ({
      number: i + 1,
      html: '',
      streaming: false
    }));
    setSlides(placeholderSlides);
    setTotalSlides(defaultSlideCount);
    
    // Initialize all tabs to 'html' to show streaming
    const initialTabs: Record<number, 'preview' | 'html' | 'edit'> = {};
    for (let i = 1; i <= defaultSlideCount; i++) {
      initialTabs[i] = 'html';
    }
    setSlideTabs(initialTabs);

    try {
      const response = await createPresentation({ prompt });
      setJobId(response.job_id);
    } catch (err: any) {
      setError(err.message || 'Failed to create presentation');
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setJobId(null);
    setIsLoading(false);
    setSlideTabs({});
    setError(null);
    setPreviewUrl(null);
    setSlides([]);
    setTotalSlides(0);
    setStreamingHtml('');
  };

  const handleComplete = () => {
    setIsLoading(false);
  };

  const handleStreamError = (err: string) => {
    setError(err);
    setIsLoading(false);
  };

  const handlePreviewReady = (url: string) => {
    // Don't set preview URL if we're showing slide cards
    // The cards are the new preview experience
    console.log('[PAGE] Preview ready:', url, 'but using slide cards instead');
    // setPreviewUrl(url); // Disabled - we use slide cards now
  };

  const handleHtmlToken = (token: string) => {
    console.log('[PAGE] Received HTML token:', token.substring(0, 50));
    setStreamingHtml(prev => {
      const updated = prev + token;
      console.log('[PAGE] Total HTML length:', updated.length);
      return updated;
    });
  };

  const handleSlideStart = (slideNumber: number, total: number) => {
    console.log('%c[PAGE] SLIDE START CALLED', 'background: #ff00ff; color: #fff; font-weight: bold; padding: 5px 10px; font-size: 14px;');
    console.log('[PAGE] slideNumber:', slideNumber, 'total:', total);
    console.trace('[PAGE SLIDE START] Stack trace');
    
    setSlides(prev => {
      // If this is the first slide and actual total differs from placeholder count, adjust
      if (slideNumber === 1 && prev.length !== total) {
        setTotalSlides(total);
        console.log('[PAGE] Adjusting slide count from', prev.length, 'to', total);
        
        // Create correct number of slides
        const allSlides = Array.from({length: total}, (_, i) => ({
          number: i + 1,
          html: '',
          streaming: i === 0 // Only first slide is streaming
        }));
        
        // Initialize tabs for all slides
        const allTabs: Record<number, 'preview' | 'html' | 'edit'> = {};
        for (let i = 1; i <= total; i++) {
          allTabs[i] = 'html';
        }
        setSlideTabs(allTabs);
        
        return allSlides;
      }
      
      // Update existing slide to streaming
      return prev.map(slide => 
        slide.number === slideNumber 
          ? {...slide, streaming: true}
          : slide
      );
    });
    
    // Set current slide tab to html
    setSlideTabs(prev => ({...prev, [slideNumber]: 'html'}));
    
    // Force a re-render by updating isLoading
    setIsLoading(false);
    console.log('[PAGE] Set isLoading to false');
  };

  const handleSlideContent = (slideNumber: number, delta: string) => {
    console.log(`[PAGE SLIDE CONTENT] Slide ${slideNumber}, delta length: ${delta.length}`);
    setSlides(prev => prev.map(slide => 
      slide.number === slideNumber 
        ? {...slide, html: slide.html + delta}
        : slide
    ));
  };

  const handleSlideComplete = (slideNumber: number, html: string) => {
    console.log(`[PAGE SLIDE COMPLETE] Slide ${slideNumber}, ${html.length} chars`);
    setSlides(prev => {
      const updated = prev.map(slide => 
        slide.number === slideNumber 
          ? {...slide, html, streaming: false}
          : slide
      );
      console.log('[PAGE] Slides state after complete:', updated.length);
      return updated;
    });
    
    // Flip to preview tab when slide is complete
    setSlideTabs(prev => ({...prev, [slideNumber]: 'preview'}));
  };

  const handleCopyLink = () => {
    if (previewUrl) {
      const fullUrl = `${window.location.origin}${previewUrl}`;
      navigator.clipboard.writeText(fullUrl);
      alert('Link copied to clipboard!');
      setShowShareMenu(false);
    }
  };

  const handleExportPDF = () => {
    // TODO: Implement PDF export
    alert('PDF export coming soon!');
    setShowShareMenu(false);
  };

  const handleExportPPTX = () => {
    const jobIdMatch = previewUrl?.match(/\/artifacts\/([^\/]+)\//);
    if (jobIdMatch) {
      const downloadUrl = `http://localhost:8000/artifacts/${jobIdMatch[1]}/download`;
      window.open(downloadUrl, '_blank');
      setShowShareMenu(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
    };

    if (showShareMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showShareMenu]);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Left Sidebar - Small */}
      <aside className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-6">
        {/* Logo */}
        <div className="p-2 bg-primary-100 rounded-lg">
          <Presentation className="w-6 h-6 text-primary-600" />
        </div>
        
        {/* Navigation Icons */}
        <nav className="flex-1 flex flex-col items-center space-y-4">
          <button
            onClick={handleReset}
            className="p-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-primary-600"
            title="New Presentation"
          >
            <Plus className="w-5 h-5" />
          </button>
          
          <button
            className="p-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-primary-600"
            title="Home"
          >
            <Home className="w-5 h-5" />
          </button>
          
          <button
            className="p-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-primary-600"
            title="All Slides"
          >
            <Presentation className="w-5 h-5" />
          </button>
        </nav>

        {/* Bottom Icons */}
        <div className="space-y-4">
          <button
            className="p-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-primary-600"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          
          <button
            className="p-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-primary-600"
            title="Help"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Middle Section - Progress (30%) */}
      <aside className="w-[30%] bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-primary-600" />
            <h2 className="font-semibold text-gray-900">
              {jobId ? 'Generation Progress' : 'Create Presentation'}
            </h2>
          </div>
          
          {!jobId && (
            <p className="text-sm text-gray-600">
              Describe your presentation in natural language
            </p>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {jobId ? (
            <StreamConsole
              jobId={jobId}
              onComplete={handleComplete}
              onError={handleStreamError}
              onPreviewReady={handlePreviewReady}
              onHtmlToken={handleHtmlToken}
              onSlideStart={handleSlideStart}
              onSlideContent={handleSlideContent}
              onSlideComplete={handleSlideComplete}
            />
          ) : (
            <div className="space-y-4">
              {/* Examples or instructions can go here */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-700 mb-2">Quick Examples:</p>
                <div className="space-y-1">
                  {[
                    'Create 5 slides about renewable energy',
                    'AI in healthcare presentation (Arabic)',
                  ].map((example, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        const textarea = document.querySelector('textarea');
                        if (textarea) {
                          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                            window.HTMLTextAreaElement.prototype,
                            'value'
                          )?.set;
                          nativeInputValueSetter?.call(textarea, example);
                          textarea.dispatchEvent(new Event('input', { bubbles: true }));
                        }
                      }}
                      disabled={isLoading}
                      className="text-xs text-left px-2 py-1.5 rounded transition-colors hover:bg-primary-50 text-gray-600 hover:text-primary-700 disabled:opacity-50 disabled:cursor-not-allowed block w-full border border-gray-200"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Fixed Footer with Prompt Form - Always Visible */}
        <div className="border-t border-gray-200 bg-white">
          <div className="p-4">
            <PromptForm onSubmit={handleSubmit} isLoading={isLoading}  />
          </div>
          
        </div>
      </aside>

      {/* Main Preview Area - Remaining Space */}
      <main className="flex-1 bg-gray-100 overflow-hidden">
        {!jobId ? (
          /* Welcome Screen */
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center max-w-2xl">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-2xl mb-4">
                  <Presentation className="w-10 h-10 text-primary-600" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Welcome to Zapi
                </h1>
                <p className="text-lg text-gray-600">
                  AI-Powered Presentation Generator
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  {
                    icon: '🚀',
                    title: 'Lightning Fast',
                    description: 'Generate in seconds',
                  },
                  {
                    icon: '🌍',
                    title: 'Multi-Language',
                    description: 'RTL & LTR support',
                  },
                  {
                    icon: '🎨',
                    title: 'Beautiful Themes',
                    description: 'Professional designs',
                  },
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-4 shadow-sm"
                  >
                    <div className="text-3xl mb-2">{feature.icon}</div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6 border border-primary-200">
                <p className="text-sm text-gray-700">
                  👈 Enter your prompt in the left panel to get started
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Live Preview */
          <div className="h-full w-full bg-white flex flex-col">
            {/* Action Bar */}
            <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Presentation className="w-5 h-5 text-primary-600" />
                <h3 className="font-semibold text-gray-900">Presentation Preview</h3>
              </div>
              <div className="flex items-center gap-2">
                {previewUrl && (
                  <>
                    <button
                      onClick={() => {
                        // TODO: Implement edit functionality
                        alert('Edit functionality coming soon!');
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                      title="Edit presentation"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => window.open(previewUrl, '_blank')}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                      title="Open in full screen"
                    >
                      <Maximize2 className="w-4 h-4" />
                      <span>Full Screen</span>
                    </button>
                    <button
                      onClick={() => {
                        // Extract job ID from preview URL to construct download URL
                        const jobIdMatch = previewUrl.match(/\/artifacts\/([^\/]+)\//);
                        if (jobIdMatch) {
                          const downloadUrl = `http://localhost:8000/artifacts/${jobIdMatch[1]}/download`;
                          window.open(downloadUrl, '_blank');
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                      title="Download PPTX"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </>
                )}
                
                {/* Share Dropdown */}
                <div className="relative" ref={shareMenuRef}>
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium shadow-sm"
                    title="Share"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                  
                  {showShareMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      {/* Header */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">Anyone with this link can view</p>
                        <p className="text-xs text-gray-500 mt-0.5">Updates in this thread</p>
                      </div>
                      
                      {/* Menu Items */}
                      <div className="py-1">
                        <button
                          onClick={handleCopyLink}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                        >
                          <div className="w-8 h-8 flex items-center justify-center">
                            <Link className="w-5 h-5 text-gray-700" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">Copy Link</span>
                        </button>
                        
                        <button
                          onClick={handleExportPDF}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                        >
                          <div className="w-8 h-8 flex items-center justify-center bg-red-50 rounded">
                            <FileText className="w-5 h-5 text-red-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">Export as PDF</span>
                        </button>
                        
                        <button
                          onClick={handleExportPPTX}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                        >
                          <div className="w-8 h-8 flex items-center justify-center bg-orange-50 rounded">
                            <Presentation className="w-5 h-5 text-orange-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">Export as PPTX</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Preview Frame - Full-Screen Vertical Slides */}
            <div className="flex-1 overflow-auto bg-gray-100">
              {slides.length > 0 ? (
                /* Full-Screen Vertical Slides */
                <div className="flex flex-col p-8 gap-8">
                  {slides.map((slide, slideIndex) => {
                    const activeTab = slideTabs[slide.number] || 'preview';
                    const setActiveTab = (tab: 'preview' | 'html' | 'edit') => {
                      setSlideTabs(prev => ({...prev, [slide.number]: tab}));
                    };
                    
                    return (
                      <div
                        key={slide.number}
                        className="flex flex-col bg-white rounded-xl shadow-xl overflow-hidden"
                        style={{ scrollSnapAlign: 'start' }}
                      >
                        {/* Tab Navigation */}
                        <div className="flex items-center bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-lg">
                          <div className="flex p-4 gap-2 items-center">
                            <button
                              onClick={() => setActiveTab('preview')}
                              className={`px-6 py-3 text-sm font-medium transition-all relative ${
                                activeTab === 'preview'
                                  ? 'bg-white text-blue-900 rounded-t-lg -mb-px'
                                  : 'text-white/80 hover:text-white hover:bg-white/10'
                              }`}
                            >
                              Preview
                            </button>
                            <button
                              onClick={() => setActiveTab('html')}
                              className={`px-6 py-3 text-sm font-medium transition-all relative ${
                                activeTab === 'html'
                                  ? 'bg-white text-blue-900 rounded-t-lg -mb-px'
                                  : 'text-white/80 hover:text-white hover:bg-white/10'
                              }`}
                            >
                              HTML
                            </button>
                            <button
                              onClick={() => setActiveTab('edit')}
                              className={`px-6 py-3 text-sm font-medium transition-all relative flex items-center gap-2 ${
                                activeTab === 'edit'
                                  ? 'bg-white text-blue-900 rounded-t-lg -mb-px'
                                  : 'text-white/80 hover:text-white hover:bg-white/10'
                              }`}
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </button>
                          </div>
                          <div className="ml-auto px-6 py-3">
                            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                              <span className="text-white font-semibold text-lg">
                                {slide.number}/{totalSlides || slides.length}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Tab Content - Fixed to 16:9 aspect ratio (presentation standard) */}
                        <div 
                          className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex items-center justify-center"
                          style={{ 
                            height: 'calc(100vw * 9 / 16 * 0.7)', // 16:9 aspect ratio, reduced by 30%
                            maxHeight: 'calc((100vh - 60px) * 0.7)' // Account for tab bar height, reduced by 30%
                          }}
                        >
                          {activeTab === 'preview' && (
                            <div className="w-full h-full bg-black flex items-center justify-center overflow-hidden">
                              {slide.html ? (
                                <iframe
                                  srcDoc={slide.html}
                                  className="w-full h-full border-0"
                                  sandbox="allow-scripts allow-same-origin"
                                  title={`Slide ${slide.number} Preview`}
                                  scrolling="no"
                                />
                              ) : (
                                <div className="text-center">
                                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                                    <Loader2 className="w-12 h-12 text-blue-400 animate-spin" />
                                  </div>
                                  <p className="text-white text-lg font-medium">Generating slide {slide.number}...</p>
                                  <p className="text-white/60 text-sm mt-2">This may take a few moments</p>
                                </div>
                              )}
                            </div>
                          )}

                          {activeTab === 'html' && (
                            <div 
                              className="w-full h-full bg-gray-950 overflow-y-auto relative"
                              ref={(el) => {
                                // Auto-scroll to bottom when streaming
                                if (el && slide.streaming) {
                                  el.scrollTop = el.scrollHeight;
                                }
                              }}
                            >
                              {slide.html ? (
                                <div className="relative min-h-full">
                                  {/* Top bar with copy button */}
                                  <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 px-8 py-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                      </div>
                                      <span className="text-gray-400 text-sm font-mono">slide_{slide.number}.html</span>
                                    </div>
                                    <button
                                      onClick={() => {
                                        navigator.clipboard.writeText(slide.html);
                                        alert('HTML copied to clipboard!');
                                      }}
                                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors flex items-center gap-2"
                                    >
                                      <FileText className="w-4 h-4" />
                                      Copy HTML
                                    </button>
                                  </div>
                                  
                                  <pre className="p-8 text-sm text-green-400 font-mono whitespace-pre-wrap break-all leading-relaxed">
                                    {slide.html}
                                    {slide.streaming && (
                                      <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1 align-middle"></span>
                                    )}
                                  </pre>
                                  
                                  {/* Streaming indicator */}
                                  {slide.streaming && (
                                    <div className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl">
                                      <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                                        <div className="w-2 h-2 bg-white rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
                                        <div className="w-2 h-2 bg-white rounded-full animate-ping" style={{animationDelay: '0.4s'}}></div>
                                      </div>
                                      <span className="font-semibold">Streaming HTML...</span>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="h-full flex items-center justify-center bg-gray-950">
                                  <div className="text-center max-w-md px-8">
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                                      <Loader2 className="w-12 h-12 text-blue-400 animate-spin" />
                                    </div>
                                    <p className="text-gray-300 text-lg font-medium mb-3">
                                      {slide.number === 1 ? 'Generating presentation...' : 'Queued'}
                                    </p>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                      {slide.number === 1 
                                        ? 'Creating all slides with AI. This may take 1-2 minutes. HTML will stream here when ready.'
                                        : `Slide ${slide.number} will appear after slide ${slide.number - 1} completes.`
                                      }
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {activeTab === 'edit' && (
                            <div className="w-full h-full bg-gray-50 p-8 overflow-y-auto">
                              <div className="max-w-4xl mx-auto">
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                                  <p className="text-sm text-yellow-800">
                                    <strong>Edit Mode:</strong> Modify the HTML code and see live preview
                                  </p>
                                </div>
                                <textarea
                                  value={slide.html}
                                  onChange={(e) => {
                                    const newHtml = e.target.value;
                                    setSlides(prev => prev.map(s => 
                                      s.number === slide.number 
                                        ? {...s, html: newHtml}
                                        : s
                                    ));
                                  }}
                                  className="w-full h-96 p-4 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="HTML content will appear here..."
                                />
                                <div className="mt-4 flex gap-2">
                                  <button
                                    onClick={() => {
                                      const blob = new Blob([slide.html], { type: 'text/html' });
                                      const url = URL.createObjectURL(blob);
                                      window.open(url, '_blank');
                                    }}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                  >
                                    Preview in New Tab
                                  </button>
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(slide.html);
                                      alert('HTML copied to clipboard!');
                                    }}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                                  >
                                    Copy HTML
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : isLoading ? (
                /* Initial Loading State */
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-blue-600 animate-pulse" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Analyzing & Planning</p>
                      <p className="text-xs text-gray-500 mt-1">Understanding your requirements...</p>
                      {/* Debug info */}
                      <div className="mt-4 p-4 bg-red-100 border-2 border-red-500 rounded text-left max-w-md mx-auto">
                        <p className="text-xs font-mono text-red-900 space-y-1">
                          <strong className="block text-sm mb-2">🔍 Debug State:</strong>
                          slides.length = <strong>{slides.length}</strong><br/>
                          totalSlides = <strong>{totalSlides}</strong><br/>
                          isLoading = <strong>{isLoading.toString()}</strong><br/>
                          jobId = <strong>{jobId?.substring(0, 8) || 'null'}</strong><br/>
                          <br/>
                          <strong className="block text-xs text-red-700">
                            👉 Open browser console (F12) to see event logs
                          </strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* No Job Active */
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
                      <Presentation className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500">No preview available</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
