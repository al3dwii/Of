// Basic feature flags for the application
export const featureFlags = {
  // Products
  presentations: true,
  dubbing: true,
  
  // UI Features
  artifactViewer: true,
  sseStreaming: true,
  billing: false, // Set to true to show billing section
  
  // Development
  debugMode: process.env.NODE_ENV === 'development',
  
  // Security
  allowUploads: true,
  maxUploadMB: parseInt(process.env.NEXT_PUBLIC_MAX_UPLOAD_MB || '200'),
  allowedExtensions: (process.env.NEXT_PUBLIC_ALLOWED_FILE_EXT || 'mp4,pdf,pptx,zip').split(',')
}

export function isFeatureEnabled(feature: keyof typeof featureFlags): boolean {
  return featureFlags[feature] === true
}
