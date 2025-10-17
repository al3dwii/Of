// Editor Types for Presentation Builder

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface SlideBackground {
  type: 'color' | 'gradient' | 'image';
  color?: string;
  gradient?: {
    type: 'linear' | 'radial';
    colors: string[];
    angle?: number;
  };
  image?: {
    url: string;
    opacity?: number;
  };
}

// Base element interface
export interface BaseElement {
  id: string;
  type: string;
  position: Position;
  size: Size;
  rotation?: number;
  opacity?: number;
  zIndex?: number;
}

// Text element
export interface TextElement extends BaseElement {
  type: 'text';
  content: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  color: string;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: number;
  letterSpacing?: number;
  textDecoration?: 'none' | 'underline' | 'line-through';
  italic?: boolean;
}

// Image element
export interface ImageElement extends BaseElement {
  type: 'image';
  url: string;
  alt?: string;
  fit: 'contain' | 'cover' | 'fill' | 'none';
  borderRadius?: number;
  filter?: string;
}

// Shape element
export interface ShapeElement extends BaseElement {
  type: 'shape';
  shapeType: 'rectangle' | 'circle' | 'triangle' | 'line' | 'arrow';
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  borderRadius?: number;
}

// Video element
export interface VideoElement extends BaseElement {
  type: 'video';
  url: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
}

// Chart element
export interface ChartElement extends BaseElement {
  type: 'chart';
  chartType: 'bar' | 'line' | 'pie' | 'doughnut' | 'scatter';
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string | string[];
    }[];
  };
  options?: Record<string, any>;
}

// Code element
export interface CodeElement extends BaseElement {
  type: 'code';
  code: string;
  language: string;
  theme: 'light' | 'dark';
  showLineNumbers?: boolean;
  fontSize?: number;
}

// Icon element
export interface IconElement extends BaseElement {
  type: 'icon';
  iconName: string;
  color: string;
  iconSize: number; // renamed to avoid conflict with BaseElement.size
}

// Union type for all slide elements
export type SlideElement =
  | TextElement
  | ImageElement
  | ShapeElement
  | VideoElement
  | ChartElement
  | CodeElement
  | IconElement;

// Slide interface
export interface Slide {
  id: string;
  elements: SlideElement[];
  background: SlideBackground;
  notes?: string;
  duration?: number; // for auto-play presentations
  transition?: {
    type: 'fade' | 'slide' | 'zoom' | 'flip' | 'none';
    duration: number;
  };
}

// Presentation theme
export interface PresentationTheme {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  fontSize: {
    h1: number;
    h2: number;
    h3: number;
    body: number;
  };
}

// Presentation metadata
export interface Presentation {
  id: string;
  title: string;
  description?: string;
  author?: string;
  slides: Slide[];
  theme: PresentationTheme;
  aspectRatio: '16:9' | '4:3' | '16:10';
  canvasSize: {
    width: number;
    height: number;
  };
  createdAt?: string;
  updatedAt?: string;
  published?: boolean;
}

// Export types
export interface ExportOptions {
  format: 'pdf' | 'pptx' | 'html' | 'images';
  quality?: 'low' | 'medium' | 'high';
  includeNotes?: boolean;
  pageNumbers?: boolean;
}

// Animation types
export interface Animation {
  type: 'fadeIn' | 'slideIn' | 'zoomIn' | 'bounceIn' | 'rotateIn';
  duration: number;
  delay?: number;
  easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
}

// Element with animation (type instead of interface for union types)
export type AnimatedElement = SlideElement & {
  animation?: Animation;
};

// Template types
export interface Template {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  slides: Slide[];
  theme: PresentationTheme;
}

// Collaboration types
export interface Comment {
  id: string;
  elementId?: string;
  slideId: string;
  author: string;
  content: string;
  timestamp: string;
  resolved?: boolean;
}

export interface Collaborator {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'editor' | 'viewer';
  avatar?: string;
  color: string; // cursor color
}
