'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Check,
  Clock,
  Loader2,
  AlertCircle,
  Download,
  Search,
  Globe,
  ArrowDown,
  Image as ImageIcon,
  FileText,
  Plus,
  Eye,
  Lightbulb,
  Archive,
  Bot,
} from 'lucide-react';
import {
  SSEEvent,
  StatusEvent,
  TokenEvent,
  ArtifactEvent,
  ErrorEvent,
  DoneEvent,
  JobStatus,
  STAGE_INFO,
  Stage,
} from '@/types/api';
import { SSEClient } from '@/lib/sse';
import { getStreamUrl, getPreviewUrl, getArtifactUrl, downloadArtifact } from '@/lib/api';
import { cn, formatBytes, formatDuration } from '@/lib/utils';

interface StreamConsoleProps {
  jobId: string;
  onComplete?: () => void;
  onError?: (error: string) => void;
  onPreviewReady?: (url: string) => void;
  onHtmlToken?: (token: string) => void;
  onSlideStart?: (slideNumber: number, total: number) => void;
  onSlideContent?: (slideNumber: number, delta: string) => void;
  onSlideComplete?: (slideNumber: number, html: string) => void;
}

interface ThinkingStep {
  id: string;
  type: 'thinking' | 'search' | 'visit' | 'pagedown' | 'imagesearch' | 'initialize' | 'addpage' | 'complete';
  title: string;
  content: string;
  status: 'active' | 'complete' | 'pending';
  timestamp: Date;
  icon: React.ReactNode;
}

interface StageProgress {
  status: JobStatus;
  pct: number;
  message: string;
  tokens: string[];
}

export default function StreamConsole({ jobId, onComplete, onError, onPreviewReady, onHtmlToken, onSlideStart, onSlideContent, onSlideComplete }: StreamConsoleProps) {
  const [thinkingSteps, setThinkingSteps] = useState<ThinkingStep[]>([]);
  const [currentThinking, setCurrentThinking] = useState<string>('');
  const [stages, setStages] = useState<Record<string, StageProgress>>({});
  const [artifacts, setArtifacts] = useState<ArtifactEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isThinkingPhase, setIsThinkingPhase] = useState(true);
  const [generationSteps, setGenerationSteps] = useState<ThinkingStep[]>([]);
  const [currentHtmlTokens, setCurrentHtmlTokens] = useState<string[]>([]);

  const sseClientRef = useRef<SSEClient | null>(null);
  const thinkingChunks = useRef<string[]>([]);
  const currentStepRef = useRef<string>('');
  const thinkingCompletedRef = useRef(false);
  const generationStartedRef = useRef(false);
  const htmlTokensRef = useRef<string[]>([]);
  const thinkingContainerRef = useRef<HTMLDivElement>(null);
  const generationContainerRef = useRef<HTMLDivElement>(null);
  const processingStepsRef = useRef(false);
  const lastProcessedStepCountRef = useRef(0);
  const isThinkingPhaseRef = useRef(true); // Ref for immediate updates

  useEffect(() => {
    console.log('[USEEFFECT] Starting for jobId:', jobId);
    
    const streamUrl = getStreamUrl(jobId);

    const client = new SSEClient(streamUrl, {
      onEvent: handleEvent,
      onError: handleError,
      onClose: () => {
        console.log('SSE stream closed');
      },
    });

    console.log('[SSE] Connecting to:', streamUrl);
    client.connect();
    sseClientRef.current = client;

    // Start with initial analysis step (but only if this is a fresh start)
    // In development, React StrictMode will mount twice - we check thinkingSteps to avoid duplicates
    setThinkingSteps(prev => {
      if (prev.length === 0) {
        const stepId = `thinking-${Date.now()}`;
        currentStepRef.current = stepId;
        console.log('[INIT] Created initial step with ID:', stepId);
        return [{
          id: stepId,
          type: 'thinking' as const,
          title: 'Analysis',
          content: 'Analyzing your request and planning the presentation...',
          status: 'active' as const,
          timestamp: new Date(),
          icon: <Bot className="w-4 h-4" />
        }];
      }
      // Steps already exist from first mount - sync currentStepRef to match the existing step
      console.log('[INIT] Steps already exist, syncing currentStepRef to:', prev[0].id);
      currentStepRef.current = prev[0].id;
      return prev;
    });

    // Cleanup function - only runs on unmount or when jobId changes
    return () => {
      console.log('[CLEANUP] Closing SSE client');
      client.disconnect();
    };
  }, [jobId]);

  // Auto-scroll to latest thinking step
  useEffect(() => {
    if (thinkingContainerRef.current && thinkingSteps.length > 0) {
      const container = thinkingContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [thinkingSteps]);

  // Auto-scroll to latest generation step
  useEffect(() => {
    if (generationContainerRef.current && generationSteps.length > 0) {
      const container = generationContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [generationSteps]);

  const addThinkingStep = (type: ThinkingStep['type'], title: string, content: string, icon: React.ReactNode) => {
    const stepId = `${type}-${Date.now()}`;
    setThinkingSteps(prev => {
      // Mark previous step as complete
      const updated = prev.map(step => ({ ...step, status: 'complete' as const }));
      // Add new step
      return [...updated, {
        id: stepId,
        type,
        title,
        content,
        status: 'active' as const,
        timestamp: new Date(),
        icon
      }];
    });
    currentStepRef.current = stepId;
    return stepId;
  };

    const updateCurrentStep = (content: string) => {
    console.log('[UPDATE STEP] Starting update...');
    console.log('[UPDATE STEP] currentStepRef:', currentStepRef.current);
    console.log('[UPDATE STEP] content length:', content.length);
    console.log('[UPDATE STEP] content preview:', content.substring(0, 100));
    
    if (!currentStepRef.current) {
      console.warn('[UPDATE STEP] No current step to update!');
      return;
    }
    
    setThinkingSteps(prev => {
      console.log('[UPDATE STEP] Previous steps:', prev.length);
      const updated = prev.map(step => {
        if (step.id === currentStepRef.current) {
          console.log('[UPDATE STEP] Found matching step, updating content');
          return { ...step, content };
        }
        return step;
      });
      console.log('[UPDATE STEP] Updated steps:', updated.length, 'steps');
      console.log('[UPDATE STEP] First step after update:', updated[0]);
      return updated;
    });
  };

  const completeCurrentStep = () => {
    if (currentStepRef.current) {
      setThinkingSteps(prev => prev.map(step => 
        step.id === currentStepRef.current 
          ? { ...step, status: 'complete' as const } 
          : step
      ));
      currentStepRef.current = '';
    }
  };

  const addGenerationStep = (title: string, icon: React.ReactNode) => {
    const stepId = `gen-${Date.now()}`;
    const newStep: ThinkingStep = {
      id: stepId,
      type: 'addpage',
      title,
      content: '',
      status: 'active',
      timestamp: new Date(),
      icon,
    };
    setGenerationSteps(prev => [...prev, newStep]);
    return stepId;
  };

  const updateGenerationStep = (stepId: string, content: string) => {
    setGenerationSteps(prev =>
      prev.map(step =>
        step.id === stepId
          ? { ...step, content }
          : step
      )
    );
  };

  const completeGenerationStep = (stepId: string) => {
    setGenerationSteps(prev =>
      prev.map(step =>
        step.id === stepId
          ? { ...step, status: 'complete' }
          : step
      )
    );
  };

  const parseThinkingIntoSteps = (content: string) => {
    // Parse thinking content into separate steps
    // Look for numbered sections like "1. AUDIENCE ANALYSIS", "2. TOPIC CATEGORIZATION", etc.
    const lines = content.split('\n');
    const steps: Array<{ number: string; title: string; content: string }> = [];
    let currentStep: { number: string; title: string; content: string[] } | null = null;
    
    for (const line of lines) {
      // Match numbered headers: "1. **Title**:" or "1. Title:"
      const headerMatch = line.match(/^(\d+)\.\s*\*?\*?([^*:\n]+)\*?\*?:?\s*$/);
      if (headerMatch) {
        // Save previous step if exists
        if (currentStep) {
          steps.push({
            number: currentStep.number,
            title: currentStep.title,
            content: currentStep.content.join('\n').trim()
          });
        }
        // Start new step
        currentStep = {
          number: headerMatch[1],
          title: headerMatch[2].trim(),
          content: []
        };
      } else if (currentStep && line.trim()) {
        // Add content to current step
        currentStep.content.push(line);
      }
    }
    
    // Add last step
    if (currentStep) {
      steps.push({
        number: currentStep.number,
        title: currentStep.title,
        content: currentStep.content.join('\n').trim()
      });
    }
    
    return steps;
  };

  const processThinkingContent = (content: string) => {
    console.log('[THINKING DEBUG] Content length:', content.length, 'chars');
    
    // Parse content into steps
    const parsedSteps = parseThinkingIntoSteps(content);
    console.log('[THINKING DEBUG] Parsed into', parsedSteps.length, 'steps');
    
    if (parsedSteps.length > 0) {
      // Check if we need to add new steps or just update existing ones
      const currentStepCount = parsedSteps.length;
      
      // Only process if we have new steps or updates
      if (currentStepCount > lastProcessedStepCountRef.current) {
        console.log('[THINKING DEBUG] New steps detected:', currentStepCount, 'vs', lastProcessedStepCountRef.current);
        lastProcessedStepCountRef.current = currentStepCount;
        
        // Update state with all parsed steps at once
        setThinkingSteps(prev => {
          const initialStep = prev[0];
          const newSteps = parsedSteps.map((step, index) => {
            const stepId = `thinking-step-${step.number}`;
            const existingStep = prev.find(s => s.id === stepId);
            
            return {
              id: stepId,
              type: 'thinking' as const,
              title: `${step.number}. ${step.title}`,
              content: step.content,
              status: index === parsedSteps.length - 1 ? 'active' as const : 'complete' as const,
              timestamp: existingStep?.timestamp || new Date(),
              icon: <Lightbulb className="w-4 h-4" />
            };
          });
          
          // Mark initial step as complete and add new steps
          return [
            { ...initialStep, status: 'complete' as const },
            ...newSteps
          ];
        });
        
        // Update current step ref to the last one
        currentStepRef.current = `thinking-step-${parsedSteps[parsedSteps.length - 1].number}`;
      }
    } else {
      // Fallback: Update the initial Analysis step with all content
      const formattedContent = content
        .replace(/^###\s+/gm, '')
        .replace(/^##\s+/gm, '')
        .replace(/^#\s+/gm, '')
        .replace(/\n{4,}/g, '\n\n\n')
        .trim();
      
      if (formattedContent.length > 0) {
        updateCurrentStep(formattedContent);
      }
    }
  };

  const handleEvent = (event: SSEEvent) => {
    console.log('[SSE EVENT]', event.type, '- isThinkingPhase:', isThinkingPhase);
    console.log('[SSE DEBUG] Received event:', event.type, event.data);
    
    switch (event.type) {
      case 'thinking_chunk':
        console.log('[THINKING CHUNK] Received:', event.data.content.length, 'chars');
        console.log('[THINKING CHUNK] Content:', event.data.content);
        if (isThinkingPhase) {
          const content = event.data.content;
          thinkingChunks.current.push(content);
          const fullContent = thinkingChunks.current.join('');
          console.log('[THINKING ACCUMULATED] Total so far:', fullContent.length, 'chars');
          
          // Process thinking content to update the Analysis step
          processThinkingContent(fullContent);
        }
        break;
      case 'thinking_complete':
        console.log('[THINKING COMPLETE] Received');
        if (isThinkingPhaseRef.current && !thinkingCompletedRef.current) {
          thinkingCompletedRef.current = true;
          isThinkingPhaseRef.current = false;
          completeCurrentStep();
          const completeStepId = addThinkingStep('complete', 'Ready to Generate', 'Analysis complete. Beginning presentation generation...', <Check className="w-4 h-4" />);
          currentStepRef.current = completeStepId; // Update to new step
          setIsThinkingPhase(false);
          setTimeout(completeCurrentStep, 1000);
        }
        break;
      case 'status':
        handleStatusEvent(event.data);
        break;
      case 'token':
        // Token events are for HTML generation, not thinking
        // Thinking is handled by thinking_chunk events
        // If we receive token events but still in thinking phase, force end it
        if (isThinkingPhaseRef.current) {
          console.log('[TOKEN] Received token while still in thinking phase - forcing end of thinking');
          isThinkingPhaseRef.current = false;
          setIsThinkingPhase(false);
          if (!thinkingCompletedRef.current) {
            thinkingCompletedRef.current = true;
            completeCurrentStep();
          }
        }
        handleTokenEvent(event.data);
        break;
      case 'artifact':
        handleArtifactEvent(event.data);
        break;
      case 'preview':
        setPreviewUrl(getPreviewUrl(jobId));
        break;
      case 'error':
        handleErrorEvent(event.data);
        break;
      case 'done':
        handleDoneEvent(event.data);
        break;
      case 'slide_start':
        console.log('%c[STREAM CONSOLE] SLIDE_START EVENT', 'background: #0000ff; color: #fff; font-weight: bold; padding: 2px 5px;', event.data);
        console.log('[STREAM CONSOLE] onSlideStart callback exists?', !!onSlideStart);
        if (onSlideStart) {
          console.log('[STREAM CONSOLE] Calling onSlideStart with:', event.data.slide_number, event.data.total_slides);
          onSlideStart(event.data.slide_number, event.data.total_slides);
          console.log('[STREAM CONSOLE] onSlideStart called successfully');
        } else {
          console.error('[STREAM CONSOLE] onSlideStart callback is MISSING!');
        }
        break;
      case 'slide_content':
        if (onSlideContent) {
          console.log('[STREAM CONSOLE] slide_content:', event.data.slide_number, 'delta length:', event.data.delta?.length);
          onSlideContent(event.data.slide_number, event.data.delta);
        }
        break;
      case 'slide_complete':
        console.log('%c[STREAM CONSOLE] SLIDE_COMPLETE EVENT', 'background: #00ff00; color: #000; font-weight: bold; padding: 2px 5px;', event.data.slide_number);
        if (onSlideComplete) {
          onSlideComplete(event.data.slide_number, event.data.html);
        }
        break;
    }
  };

  const handleStatusEvent = (data: StatusEvent) => {
    setStages((prev) => ({
      ...prev,
      [data.stage]: {
        status: data.status,
        pct: data.pct,
        message: data.message,
        tokens: prev[data.stage]?.tokens || [],
      },
    }));
  };

  const handleTokenEvent = (data: TokenEvent) => {
    // Only show tokens if we're past thinking phase (check ref for immediate updates)
    if (!isThinkingPhaseRef.current) {
      // Initialize generation tracking
      if (!generationStartedRef.current) {
        generationStartedRef.current = true;
        currentStepRef.current = addGenerationStep('Generating HTML', <FileText className="w-4 h-4" />);
        console.log('[GENERATION] Started HTML generation step');
      }

      // Accumulate HTML tokens
      htmlTokensRef.current.push(data.delta);
      const htmlContent = htmlTokensRef.current.join('');
      
      // Call the HTML token callback if provided
      if (onHtmlToken) {
        console.log('[HTML TOKEN] Sending to parent:', data.delta.substring(0, 50));
        onHtmlToken(data.delta);
      }
      
      // Show a preview of the HTML being generated
      const preview = htmlContent.length > 500 
        ? htmlContent.substring(0, 500) + '...' 
        : htmlContent;
      
      updateGenerationStep(currentStepRef.current, preview);
      
      setStages((prev) => ({
        ...prev,
        [data.stage]: {
          ...prev[data.stage],
          tokens: [...(prev[data.stage]?.tokens || []), data.delta],
        },
      }));
    }
  };

  const handleArtifactEvent = (data: ArtifactEvent) => {
    setArtifacts((prev) => [...prev, data]);
    
    if (data.kind === 'html') {
      // Complete the HTML generation step
      if (currentStepRef.current && generationStartedRef.current) {
        const finalHtml = htmlTokensRef.current.join('');
        const preview = finalHtml.length > 500 
          ? finalHtml.substring(0, 500) + `... (${finalHtml.length} total characters)` 
          : finalHtml;
        updateGenerationStep(currentStepRef.current, preview);
        completeGenerationStep(currentStepRef.current);
        console.log('[GENERATION] Completed HTML generation step');
      }
      
      const url = getPreviewUrl(jobId);
      setPreviewUrl(url);
      if (onPreviewReady) {
        onPreviewReady(url);
      }
    }
  };

  const handleErrorEvent = (data: ErrorEvent) => {
    setError(data.error);
    if (onError) {
      onError(data.error);
    }
  };

  const handleDoneEvent = (data: DoneEvent) => {
    setIsDone(true);
    setDuration(data.duration_ms);
    if (onComplete) {
      onComplete();
    }
  };

  const handleError = (err: Error) => {
    setError(err.message);
    if (onError) {
      onError(err.message);
    }
  };

  const handleDownload = (filename: string) => {
    downloadArtifact(jobId, filename);
  };

  const getStepBadgeColor = (type: ThinkingStep['type']) => {
    switch (type) {
      case 'thinking': return 'bg-blue-100 text-blue-700';
      case 'search': return 'bg-purple-100 text-purple-700';
      case 'visit': return 'bg-green-100 text-green-700';
      case 'imagesearch': return 'bg-orange-100 text-orange-700';
      case 'initialize': return 'bg-yellow-100 text-yellow-700';
      case 'addpage': return 'bg-indigo-100 text-indigo-700';
      case 'complete': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderThinkingIndicator = (index: number) => {
    return (
      <div
        key={`thinking-indicator-${index}`}
        className="flex items-center gap-2 py-2 opacity-0"
        style={{
          animationDelay: `${(index * 1500) + 800}ms`,
          animation: 'fadeIn 0.4s ease-out forwards'
        }}
      >
        <div className="flex items-center gap-2 text-gray-500 italic text-sm">
          <Bot className="w-3 h-3 text-blue-500" />
          <span>Thinking</span>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '450ms' }}></div>
            <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
          </div>
        </div>
      </div>
    );
  };

  const renderThinkingStep = (step: ThinkingStep, index: number) => {
    console.log('[RENDER STEP]', step.id, '- content length:', step.content?.length || 0, 'status:', step.status);
    return (
      <div
        key={step.id}
        className={cn(
          'border rounded-lg p-4 transition-all duration-700 opacity-0',
          step.status === 'active' && 'border-blue-300 bg-blue-50 shadow-sm animate-pulse',
          step.status === 'complete' && 'border-green-200 bg-green-50',
          step.status === 'pending' && 'border-gray-200 bg-gray-50'
        )}
        style={{
          animationDelay: `${index * 1500}ms`,
          animation: 'fadeInUp 0.8s ease-out forwards'
        }}
      >
        <div className="flex items-start gap-3">
          <div className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
            step.status === 'active' && 'bg-blue-100',
            step.status === 'complete' && 'bg-green-100',
            step.status === 'pending' && 'bg-gray-100'
          )}>
            {step.status === 'complete' ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : step.status === 'active' ? (
              <div className="relative">
                {step.icon}
                <div className="absolute -top-1 -right-1 w-3 h-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                  <div className="absolute top-0 w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            ) : (
              step.icon
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className={cn(
                'px-2 py-1 rounded-full text-xs font-medium',
                getStepBadgeColor(step.type)
              )}>
                {step.title}
              </span>
              {step.status === 'active' && (
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              )}
            </div>
            
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {step.content}
            </div>
            
            {step.status === 'complete' && (
              <div className="mt-2 text-xs text-green-600 font-medium">
                ✓ Completed
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderStageCard = (stage: Stage) => {
    const stageProgress = stages[stage];
    const stageInfo = STAGE_INFO[stage];

    if (!stageProgress || isThinkingPhase) {
      return null;
    }

    const isRunning = stageProgress.status === JobStatus.RUNNING;
    const isDone = stageProgress.status === JobStatus.DONE;

    return (
      <div
        key={stage}
        className={cn(
          'rounded-lg border p-3 transition-all',
          isRunning && 'border-primary-300 bg-primary-50',
          isDone && 'border-green-300 bg-green-50'
        )}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className={cn(
            'w-6 h-6 rounded flex items-center justify-center text-sm',
            isRunning && 'bg-primary-100',
            isDone && 'bg-green-100'
          )}>
            {stageInfo.icon}
          </div>
          <h3 className="font-medium text-gray-900 text-sm">{stageInfo.label}</h3>
          {isRunning && <Loader2 className="w-4 h-4 text-primary-600 animate-spin" />}
          {isDone && <Check className="w-4 h-4 text-green-600" />}
        </div>

        <p className="text-sm text-gray-600 mb-2">{stageProgress.message}</p>

        {isRunning && stageProgress.pct > 0 && (
          <div className="mb-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${stageProgress.pct}%` }}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  console.log('[RENDER] Component rendering...');
  console.log('[RENDER] isThinkingPhase:', isThinkingPhase);
  console.log('[RENDER] thinkingSteps.length:', thinkingSteps.length);
  console.log('[RENDER] thinkingSteps:', JSON.stringify(thinkingSteps.map(s => ({
    id: s.id,
    title: s.title,
    contentLength: s.content?.length || 0,
    contentPreview: s.content?.substring(0, 50) || '',
    status: s.status
  })), null, 2));
  console.log('[RENDER] currentStepRef.current:', currentStepRef.current);

  return (
    <div className="space-y-4">
      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-medium text-red-900 text-sm mb-1">Error</h3>
            <p className="text-xs text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Thinking Process - Z.ai Style */}
      {(isThinkingPhase || thinkingSteps.length > 0) && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
            <Bot className="w-4 h-4 text-blue-600" />
            AI Planning Process
          </div>
          
          <div 
            ref={thinkingContainerRef}
            className="space-y-3 pr-2"
          >
            {thinkingSteps.map((step, index) => (
              <div key={`step-group-${step.id}`}>
                {renderThinkingStep(step, index)}
                {/* Show thinking indicator after each step except the last one */}
                {index < thinkingSteps.length - 1 && step.status === 'complete' && renderThinkingIndicator(index)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HTML Generation Steps - Z.ai Style */}
      {generationSteps.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
            <FileText className="w-4 h-4 text-green-600" />
            HTML Generation
          </div>
          
          <div 
            ref={generationContainerRef}
            className="space-y-3 pr-2"
          >
            {generationSteps.map((step, index) => renderThinkingStep(step, index))}
          </div>
        </div>
      )}

      {/* Artifacts & Download */}
      {artifacts.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Archive className="w-4 h-4 text-primary-600" />
            Generated Files
          </h3>
          <div className="space-y-2">
            {artifacts.map((artifact, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 text-sm truncate">
                      {artifact.path.split('/').pop()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatBytes(artifact.bytes)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(artifact.path.split('/').pop()!)}
                  className="px-3 py-1 bg-primary-600 text-white rounded text-xs font-medium hover:bg-primary-700 transition-colors flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completion Summary */}
      {isDone && duration && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-green-900">
                Presentation Complete!
              </h3>
              <p className="text-sm text-green-700">
                Generated in {formatDuration(duration)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
