'use client';

import { useState, useRef, useEffect } from 'react';
import { Presentation, Home, Settings, HelpCircle, Plus, Sparkles, Maximize2, Download, Share2, Link as LinkIcon, FileText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// API URL from environment variable, fallback to localhost for development
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface StatusEvent {
  job_id: string;
  stage: string;
  status: string;
  pct: number;
  message: string;
}

interface ThinkingChunkEvent {
  job_id: string;
  content: string;
}

interface MemoryLearnEvent {
  job_id: string;
  research_cached: boolean;
  content_learned_from: number;
  designer_learned_from: number;
  reviewer_learned_from: number;
  editor_learned_from: number;
  total_presentations_used: number;
}

interface SlideStartEvent {
  job_id: string;
  slide_number: number;
  total_slides: number;
}

interface SlideCompleteEvent {
  job_id: string;
  slide_number: number;
  html: string;
}

interface ArtifactEvent {
  job_id: string;
  kind: string;
  path: string;
  bytes: number;
}

interface DoneEvent {
  job_id: string;
  duration_ms: number;
  files: string[];
}

interface ErrorEvent {
  job_id: string;
  error: string;
}

export default function TestAgenticPage() {
  const pathname = usePathname();
  const [prompt, setPrompt] = useState('AI in Healthcare: 5 slides covering applications, benefits, and challenges');
  const [isGenerating, setIsGenerating] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [slides, setSlides] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('');
  const logsEndRef = useRef<HTMLDivElement>(null);
  
  // Detect locale from pathname
  const locale = pathname?.match(/^\/(en|ar|es|fr)/)?.[1] || 'en';

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const createPlaceholderSlide = (slideNumber: number): string => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            overflow: hidden;
            position: relative;
          }
          /* Animated background circles */
          .bg-circle {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            animation: float 6s ease-in-out infinite;
          }
          .bg-circle:nth-child(1) {
            width: 300px;
            height: 300px;
            top: -100px;
            left: -100px;
            animation-delay: 0s;
          }
          .bg-circle:nth-child(2) {
            width: 200px;
            height: 200px;
            bottom: -50px;
            right: -50px;
            animation-delay: 2s;
          }
          .placeholder-container {
            text-align: center;
            color: white;
            z-index: 10;
            position: relative;
            animation: fadeIn 0.5s ease-in;
          }
          .slide-badge {
            display: inline-block;
            padding: 0.5rem 1.5rem;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            border-radius: 2rem;
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 2rem;
            letter-spacing: 0.5px;
          }
          .slide-number {
            font-size: 4rem;
            font-weight: 700;
            margin-bottom: 1rem;
            background: linear-gradient(to right, #fff, rgba(255,255,255,0.8));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .loading-text {
            font-size: 1.1rem;
            opacity: 0.85;
            margin-bottom: 2.5rem;
            font-weight: 500;
          }
          .spinner-container {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
          }
          .dot {
            width: 12px;
            height: 12px;
            background: white;
            border-radius: 50%;
            animation: bounce 1.4s ease-in-out infinite;
          }
          .dot:nth-child(1) { animation-delay: 0s; }
          .dot:nth-child(2) { animation-delay: 0.2s; }
          .dot:nth-child(3) { animation-delay: 0.4s; }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(30px, -30px) scale(1.1); }
          }
          @keyframes bounce {
            0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
            40% { transform: scale(1.2); opacity: 1; }
          }
        </style>
      </head>
      <body>
        <div class="bg-circle"></div>
        <div class="bg-circle"></div>
        <div class="placeholder-container">
          <div class="slide-badge">SLIDE ${slideNumber}</div>
          <div class="slide-number">${slideNumber}</div>
          <div class="loading-text">✨ Generating content...</div>
          <div class="spinner-container">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    // Check if we have an existing presentation - if yes, edit it; if no, create new
    if (jobId && slides.length > 0) {
      // Edit existing presentation
      await handleEdit(prompt.trim());
      return;
    }

    // Create new presentation
    setIsGenerating(true);
    setJobId(null);
    setSlides([]);
    setCurrentSlide(0);
    setLogs([]);
    setProgress(0);
    setStage('');

    try {
      addLog('🚀 Starting presentation generation...');
      
      const response = await fetch(`${API_URL}/api/presentations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim() })
      });

      if (!response.ok) {
        throw new Error('Failed to start generation');
      }

      const data = await response.json();
      setJobId(data.job_id);
      addLog(`✓ Job created: ${data.job_id}`);

      // Try to extract slide count from prompt (e.g., "5 slides" or "7 slides")
      const slideMatch = prompt.match(/(\d+)\s+slides?/i);
      if (slideMatch) {
        const slideCount = parseInt(slideMatch[1]);
        console.log(`Detected ${slideCount} slides from prompt, creating placeholders immediately`);
        const initialPlaceholders = Array(slideCount).fill(null).map((_, idx) => 
          createPlaceholderSlide(idx + 1)
        );
        setSlides(initialPlaceholders);
        addLog(`🎨 Prepared ${slideCount} slide placeholders`);
      }

      // Connect to SSE stream
      const eventSource = new EventSource(`${API_URL}/api/presentations/${data.job_id}/stream`);

      eventSource.addEventListener('status', (e) => {
        const data: StatusEvent = JSON.parse(e.data);
        setStage(data.stage);
        setProgress(data.pct);
        addLog(`📊 ${data.stage}: ${data.message} (${data.pct}%)`);
        
        // Try to extract slide count from message if available
        // e.g., "Writing 5 slides..."
        if (data.stage === 'content' && slides.length === 0) {
          const match = data.message.match(/(\d+)\s+slides?/i);
          if (match) {
            const slideCount = parseInt(match[1]);
            console.log(`Detected ${slideCount} slides, creating placeholders`);
            const placeholders = Array(slideCount).fill(null).map((_, idx) => 
              createPlaceholderSlide(idx + 1)
            );
            setSlides(placeholders);
            addLog(`🎨 Prepared ${slideCount} slide placeholders`);
          }
        }
      });

      eventSource.addEventListener('thinking_chunk', (e) => {
        const data: ThinkingChunkEvent = JSON.parse(e.data);
        addLog(`💭 ${data.content}`);
      });

      eventSource.addEventListener('memory_learn', (e) => {
        const data: MemoryLearnEvent = JSON.parse(e.data);
        addLog(`🧠 Memory: Learned from ${data.total_presentations_used} presentations`);
      });

      eventSource.addEventListener('slide_start', (e) => {
        const data: SlideStartEvent = JSON.parse(e.data);
        console.log('slide_start event received:', data);
        addLog(`📄 Starting slide ${data.slide_number}/${data.total_slides}...`);
        
        // Initialize placeholder slides if we haven't already
        if (data.slide_number === 1) {
          setSlides(prev => {
            console.log('Current slides length:', prev.length);
            if (prev.length === 0) {
              // Create placeholder slides
              console.log(`Creating ${data.total_slides} placeholders`);
              const placeholders = Array(data.total_slides).fill(null).map((_, idx) => 
                createPlaceholderSlide(idx + 1)
              );
              addLog(`🎨 Created ${placeholders.length} placeholder slides`);
              return placeholders;
            }
            return prev;
          });
        }
      });

      eventSource.addEventListener('slide_complete', (e) => {
        const data: SlideCompleteEvent = JSON.parse(e.data);
        console.log(`slide_complete event: slide ${data.slide_number}`);
        setSlides(prev => {
          console.log(`Replacing slide ${data.slide_number}, current array length: ${prev.length}`);
          const newSlides = [...prev];
          newSlides[data.slide_number - 1] = data.html;
          console.log(`Updated slides array:`, newSlides.map((s, i) => `${i+1}: ${s.substring(0, 50)}...`));
          return newSlides;
        });
        addLog(`✓ Slide ${data.slide_number} complete`);
      });

      eventSource.addEventListener('artifact', (e) => {
        const data: ArtifactEvent = JSON.parse(e.data);
        addLog(`📦 Generated: ${data.kind} (${Math.round(data.bytes / 1024)}KB)`);
      });

      eventSource.addEventListener('done', (e) => {
        const data: DoneEvent = JSON.parse(e.data);
        addLog(`🎉 Complete! (${(data.duration_ms / 1000).toFixed(1)}s)`);
        setProgress(100);
        setIsGenerating(false);
        eventSource.close();
      });

      eventSource.addEventListener('error_event', (e) => {
        const data: ErrorEvent = JSON.parse(e.data);
        addLog(`❌ Error: ${data.error}`);
        setIsGenerating(false);
        eventSource.close();
      });

      eventSource.onerror = () => {
        addLog('❌ Connection lost');
        setIsGenerating(false);
        eventSource.close();
      };

    } catch (error: any) {
      addLog(`❌ Error: ${error.message}`);
      setIsGenerating(false);
    }
  };

    const reloadSlides = async () => {
    if (!jobId) return;
    
    try {
      const response = await fetch(`${API_URL}/api/presentations/${jobId}/slides`);
      if (!response.ok) {
        throw new Error('Failed to fetch slides');
      }
      const data = await response.json();
      if (data.slides && Array.isArray(data.slides)) {
        // Extract HTML content from slide objects
        const slideHtmls = data.slides.map((slide: any) => slide.html || slide);
        setSlides(slideHtmls);
        addLog(`✓ Reloaded ${slideHtmls.length} slides`);
      }
    } catch (error) {
      console.error('Failed to reload slides:', error);
      addLog('✗ Failed to reload slides');
    }
  };

  const handleEdit = async (command: string) => {
    if (!jobId) return;
    
    setIsGenerating(true);
    addLog(`🔄 Processing edit command: "${command}"`);

    try {
      const response = await fetch(`${API_URL}/api/presentations/${jobId}/edit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Edit request failed:', response.status, errorText);
        addLog(`✗ Edit failed: Server error (${response.status})`);
        if (errorText) {
          try {
            const errorJson = JSON.parse(errorText);
            if (errorJson.detail) {
              addLog(`  ${errorJson.detail}`);
            }
          } catch {
            addLog(`  ${errorText.substring(0, 100)}`);
          }
        }
        return;
      }

      const result = await response.json();
      console.log('Edit result:', result);
      
      if (result.success) {
        addLog(`✓ Edit completed successfully`);
        if (result.operation) {
          addLog(`  Operation: ${result.operation}`);
        }
        addLog(`  Total slides: ${result.total_slides || slides.length}`);
        // Reload slides to show the changes
        await reloadSlides();
      } else {
        addLog(`✗ Edit failed: ${result.message || result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Edit error:', error);
      addLog(`✗ Edit error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, slides.length]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar - Icons */}
      <div className="w-16 bg-gradient-to-b from-purple-700 to-blue-700 flex flex-col items-center py-6 space-y-6">
        {/* <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div> */}
        
        <div className="flex-1 flex flex-col space-y-4">
          <Link href={`/${locale}`}>
            <button className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
              <Home className="w-5 h-5 text-white" />
            </button>
          </Link>
          <button className="w-10 h-10 rounded-lg bg-white/30 hover:bg-white/40 flex items-center justify-center transition-all">
            <Presentation className="w-5 h-5 text-white" />
          </button>

          
        </div>
        <Link href={`/${locale}/dashboard`}>
          <button className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
            <Settings className="w-5 h-5 text-white" />
          </button>
        </Link>

        <button className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
          <HelpCircle className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Middle Section - Prompt, Logs & Progress (1/3) */}
      <div className="w-1/4 flex flex-col border-r border-gray-200 bg-white">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
        </div>

        {/* Logs Section - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">Generation Logs</h2>
            <div className="bg-gray-900 rounded-lg p-4 h-84 overflow-y-auto font-mono text-xs">
              {logs.length === 0 ? (
                <div className="text-gray-500 text-center py-8">No logs yet...</div>
              ) : (
                logs.map((log, idx) => (
                  <div key={idx} className="text-green-400 mb-1">{log}</div>
                ))
              )}
              <div ref={logsEndRef} />
            </div>
          </div>

          {/* Progress */}
          {isGenerating && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700 font-medium">{stage || 'Processing...'}</span>
                <span className="text-gray-600">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Prompt Form - Fixed at bottom */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {jobId && slides.length > 0 ? 'Edit Command' : 'Presentation Prompt'}
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={
              jobId && slides.length > 0
                ? "E.g., 'add 5 slides about climate change' or 'delete slide 3' or 'make slide 2 more detailed'"
                : "E.g., 'Machine Learning Fundamentals: 6 slides' or 'Climate Change Solutions: 8 slides'"
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows={4}
            disabled={isGenerating}
          />
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full mt-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {jobId ? 'Processing...' : 'Generating...'}
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                {jobId && slides.length > 0 ? 'Add/Edit Slides' : 'Generate Presentation'}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Right Section - Slides Preview (2/3) */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {slides.length === 0 ? (
          /* Empty State */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-md px-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Presentation className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                No Presentation Yet
              </h2>

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

              <p className="text-gray-600 mb-6">
                Enter a prompt in the left panel and click "Generate Presentation" to create your slides.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                <p className="text-sm text-blue-900 font-medium mb-2">💡 Example Prompts:</p>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• "AI in Healthcare: 5 slides"</li>
                  <li>• "Climate Change Solutions: 7 slides"</li>
                  <li>• "Product Launch Strategy: 6 slides"</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          /* Slides View */
          <>
            {/* Top Action Bar */}
            <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-700">
                  Slide {currentSlide + 1} of {slides.length}
                </span>
                {isGenerating && (
                  <span className="text-xs text-purple-600 font-medium flex items-center gap-1">
                    <div className="w-3 h-3 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </span>
                )}
                {jobId && (
                  <span className="text-xs text-gray-500 font-mono">
                    {jobId.substring(0, 8)}...
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.open(`${API_URL}/artifacts/${jobId}/export.zip`)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all text-sm"
                  title="Download"
                >
                  <Download className="w-4 h-4 text-gray-700" />
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied!');
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all text-sm"
                  title="Share"
                >
                  <Share2 className="w-4 h-4 text-gray-700" />
                </button>

                <button
                  onClick={() => window.open(`http://localhost:3000/view/${jobId}`, '_blank')}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all text-sm"
                  title="Fullscreen"
                >
                  <Maximize2 className="w-4 h-4 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Slide Display */}
            <div className="flex-1 flex items-center justify-center p-6 overflow-hidden">
              <div className="relative w-full h-full max-w-5xl">
                {slides.map((slide, index) => (
                  <iframe
                    key={`slide-${index}-${slide?.substring(0, 100)}`}
                    srcDoc={slide}
                    className="absolute inset-0 border-0 rounded-xl shadow-2xl transition-opacity duration-300"
                    sandbox="allow-scripts allow-same-origin"
                    style={{
                      width: '100%',
                      height: '100%',
                      opacity: currentSlide === index ? 1 : 0,
                      pointerEvents: currentSlide === index ? 'auto' : 'none',
                      zIndex: currentSlide === index ? 10 : 1,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium"
              >
                ← Previous
              </button>

              <div className="flex items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentSlide === index
                        ? 'bg-purple-600 w-8'
                        : 'bg-blue-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium"
              >
                Next →
              </button>
            </div>
          </>
        )}
      </div>


    </div>
  );
}
