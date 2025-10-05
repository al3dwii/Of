export type JobStatus = "idle" | "running";
export type CardTab = "preview" | "code";

export type SlideLink = { no: number; title: string; url: string };

export type Artifacts = {
  project_id?: string;
  state_url?: string; // e.g. /artifacts/<prj>/state.json
  slides?: { no: number; title?: string; url: string }[];
  exports?: { pdf_url?: string; pptx_url?: string; html_zip_url?: string };
};

export type StartJobResponse = {
  job_id: string;
  project_id: string;
  watch: string; // SSE endpoint (path)
};

export type UploadInfo = {
  project_id: string;
  filename: string;
  path: string;      // server path for the file
  url: string;       // public url if any
  kind: string;
};

// Optional state.json shape (server dependent)
export type StateFile = {
  language?: "ar" | "en" | string;
  slides?: Array<{
    title?: string;
    subtitle?: string;
    bullets?: (string | number)[];
    image?: string;
  }>;
};

// lib/types.ts
export interface CsvRow {
  intro_ar?: string;
  slug_en: string;
  slug_ar: string;
  dir: string;
  label_en: string;
  label_ar: string;
  search_vol: string;
  icon: string;
  avg_time_iso: string;
  steps_id: string;
}

export interface Steps {
  ar: string[];
  en: string[];
}

export interface Converter extends CsvRow {
  steps: Steps;
}
