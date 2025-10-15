import { normalizeBase } from "./urls";
import type { Artifacts, StartJobResponse, UploadInfo } from "./types";

export async function uploadDocx(base: string, file: File): Promise<UploadInfo> {
  if (!/\.docx$/i.test(file.name)) throw new Error("Only .docx is supported by this service.");

  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch(`${normalizeBase(base)}/v1/uploads`, { method: "POST", body: fd });
  if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
  return res.json();
}

export async function startSlidesJob(base: string, inputs: any): Promise<StartJobResponse> {
  const res = await fetch(`${normalizeBase(base)}/v1/services/slides.generate/jobs?validate=true`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inputs }),
  });
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(`Start failed: ${res.status} ${JSON.stringify(errBody)}`);
  }
  return res.json();
}

export async function fetchArtifacts(base: string, jobId: string): Promise<Artifacts> {
  const res = await fetch(`${normalizeBase(base)}/v1/jobs/${jobId}/artifacts`);
  if (!res.ok) throw new Error(`Artifacts error: ${res.status}`);
  return res.json();
}

export async function fetchStateJson<T = unknown>(base: string, stateUrl: string): Promise<T | null> {
  try {
    const r = await fetch(normalizeBase(base) + stateUrl);
    if (!r.ok) return null;
    return (await r.json()) as T;
  } catch {
    return null;
  }
}


import { CreatePresentationRequest, CreatePresentationResponse } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://presentation-api-production.up.railway.app';

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Create a new presentation generation job
 */
export async function createPresentation(
  request: CreatePresentationRequest
): Promise<CreatePresentationResponse> {
  const response = await fetch(`${API_BASE_URL}/api/presentations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new ApiError(
      error.error || error.detail || 'Failed to create presentation',
      response.status,
      error
    );
  }

  return response.json();
}

/**
 * Get the SSE stream URL for a job
 */
export function getStreamUrl(jobId: string): string {
  return `${API_BASE_URL}/api/presentations/${jobId}/stream`;
}

/**
 * Get the preview URL for generated HTML
 */
export function getPreviewUrl(jobId: string): string {
  return `${API_BASE_URL}/api/presentations/${jobId}/index.html`;
}

/**
 * Get artifact download URL
 */
export function getArtifactUrl(jobId: string, filename: string): string {
  return `${API_BASE_URL}/api/presentations/${jobId}/${filename}`;
}

/**
 * Download a file artifact
 */
export async function downloadArtifact(jobId: string, filename: string): Promise<void> {
  const url = getArtifactUrl(jobId, filename);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
