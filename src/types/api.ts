/**
 * Type definitions for the Presentation API
 */

export interface CreatePresentationRequest {
  prompt: string;
}

export interface CreatePresentationResponse {
  job_id: string;
  stream_url: string;
}

export enum Stage {
  PLAN = 'plan',
  OUTLINE = 'outline',
  CONTENT = 'content',
  LAYOUT = 'layout',
  THEME = 'theme',
  HTML = 'html',
  ASSETS = 'assets',
  FINALIZE = 'finalize',
}

export enum JobStatus {
  QUEUED = 'queued',
  RUNNING = 'running',
  DONE = 'done',
  ERROR = 'error',
}

export interface StatusEvent {
  job_id: string;
  stage: string;
  status: JobStatus;
  pct: number;
  message: string;
}

export interface TokenEvent {
  job_id: string;
  stage: string;
  delta: string;
}

export interface ArtifactEvent {
  job_id: string;
  kind: 'html' | 'css' | 'image' | 'json' | 'zip' | 'pptx';
  path: string;
  bytes: number;
}

export interface PreviewEvent {
  job_id: string;
  url: string;
}

export interface ErrorEvent {
  job_id: string;
  stage: string;
  error: string;
  trace_id?: string;
}

export interface DoneEvent {
  job_id: string;
  duration_ms: number;
  files: string[];
}

export interface ThinkingChunkEvent {
  job_id: string;
  content: string;
}

export interface ThinkingCompleteEvent {
  job_id: string;
}

export interface SlideStartEvent {
  job_id: string;
  slide_number: number;
  total_slides: number;
}

export interface SlideContentEvent {
  job_id: string;
  slide_number: number;
  delta: string;
}

export interface SlideCompleteEvent {
  job_id: string;
  slide_number: number;
  html: string;
}

export type SSEEvent =
  | { type: 'status'; data: StatusEvent }
  | { type: 'token'; data: TokenEvent }
  | { type: 'artifact'; data: ArtifactEvent }
  | { type: 'preview'; data: PreviewEvent }
  | { type: 'error'; data: ErrorEvent }
  | { type: 'done'; data: DoneEvent }
  | { type: 'thinking_chunk'; data: ThinkingChunkEvent }
  | { type: 'thinking_complete'; data: ThinkingCompleteEvent }
  | { type: 'slide_start'; data: SlideStartEvent }
  | { type: 'slide_content'; data: SlideContentEvent }
  | { type: 'slide_complete'; data: SlideCompleteEvent };

export interface StageInfo {
  stage: Stage;
  label: string;
  description: string;
  icon: string;
}

export const STAGE_INFO: Record<Stage, StageInfo> = {
  [Stage.PLAN]: {
    stage: Stage.PLAN,
    label: 'Planning',
    description: 'Analyzing requirements and planning presentation structure',
    icon: '🎯',
  },
  [Stage.OUTLINE]: {
    stage: Stage.OUTLINE,
    label: 'Outlining',
    description: 'Creating presentation outline and slide structure',
    icon: '📝',
  },
  [Stage.CONTENT]: {
    stage: Stage.CONTENT,
    label: 'Content',
    description: 'Generating slide content and narratives',
    icon: '✍️',
  },
  [Stage.LAYOUT]: {
    stage: Stage.LAYOUT,
    label: 'Layout',
    description: 'Designing slide layouts and templates',
    icon: '🎨',
  },
  [Stage.THEME]: {
    stage: Stage.THEME,
    label: 'Theme',
    description: 'Applying visual theme and styling',
    icon: '🌈',
  },
  [Stage.HTML]: {
    stage: Stage.HTML,
    label: 'Generation',
    description: 'Generating HTML presentation',
    icon: '⚡',
  },
  [Stage.ASSETS]: {
    stage: Stage.ASSETS,
    label: 'Assets',
    description: 'Processing images and resources',
    icon: '🖼️',
  },
  [Stage.FINALIZE]: {
    stage: Stage.FINALIZE,
    label: 'Finalize',
    description: 'Packaging and finalizing artifacts',
    icon: '📦',
  },
};
