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
