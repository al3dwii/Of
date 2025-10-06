// lib/server/tool-content.ts

import fs from 'fs';
import path from 'path';

/* ───────────── Types ───────────── */

export interface Feature {
  title: string;
  description: string;
}

export interface Copy {
  intro: string;
  benefits: string[];
  use_cases: string[];
}

export interface FAQ {
  q: string;
  a: string;
}

export interface ToolContent {
  features_en?: Feature[];
  features_ar?: Feature[];
  copy_en?: Copy;
  copy_ar?: Copy;
  faq_en?: FAQ[];
  faq_ar?: FAQ[];
}

export type ToolContentDatabase = Record<string, ToolContent>;

/* ───────────── Load & cache JSON ───────────── */

const CONTENT_PATH = path.join(process.cwd(), 'content/tool-content.json');

let cachedContent: ToolContentDatabase | null = null;

/**
 * Load tool-specific content from JSON file.
 * Cached after first load for performance.
 */
function loadToolContent(): ToolContentDatabase {
  if (cachedContent) {
    return cachedContent;
  }

  try {
    const raw = fs.readFileSync(CONTENT_PATH, 'utf8');
    cachedContent = JSON.parse(raw);
    return cachedContent as ToolContentDatabase;
  } catch (error) {
    console.error('Failed to load tool-content.json:', error);
    return {};
  }
}

/* ───────────── Public helpers ───────────── */

/**
 * Get content for a specific tool by its slug.
 * Returns undefined if no custom content exists (will fall back to generic).
 */
export function getToolContent(slug: string): ToolContent | undefined {
  const allContent = loadToolContent();
  return allContent[slug];
}

/**
 * Check if a tool has custom content defined.
 */
export function hasToolContent(slug: string): boolean {
  const allContent = loadToolContent();
  return slug in allContent;
}

/**
 * Get all tool slugs that have custom content.
 */
export function getToolsWithContent(): string[] {
  const allContent = loadToolContent();
  return Object.keys(allContent);
}
