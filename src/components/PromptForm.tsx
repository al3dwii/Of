'use client';

import { useState, useRef } from 'react';
import { Sparkles, Loader2, Paperclip, Mic, MoreVertical, X, FileText, Film, Music, FileCode, Upload, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PromptFormProps {
  onSubmit: (prompt: string, files?: File[]) => void;
  onCancel?: () => void;
  isLoading: boolean;
  compact?: boolean;
}

export default function PromptForm({ onSubmit, onCancel, isLoading, compact = false }: PromptFormProps) {
  const [prompt, setPrompt] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxLength = 4000;
  const minLength = 4;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setPrompt(value);
    setCharCount(value.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.length >= minLength && prompt.length <= maxLength && !isLoading) {
      onSubmit(prompt, attachedFiles.length > 0 ? attachedFiles : undefined);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    // Reset form
    setPrompt('');
    setCharCount(0);
    setAttachedFiles([]);
    setUploadProgress({});
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Filter valid files
    const validFiles = files.filter(file => {
      const maxSize = 200 * 1024 * 1024; // 200MB
      if (file.size > maxSize) {
        alert(`File ${file.name} is too large. Max size is 200MB.`);
        return false;
      }
      return true;
    });
    
    setAttachedFiles(prev => [...prev, ...validFiles]);
    
    // Reset file input
    if (e.target) {
      e.target.value = '';
    }
  };

  const handleRemoveFile = (index: number) => {
    const fileToRemove = attachedFiles[index];
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
    
    // Remove from upload progress
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileToRemove.name];
      return newProgress;
    });
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return <FileText className="w-4 h-4 text-red-500" />;
      case 'doc':
      case 'docx':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'html':
      case 'htm':
        return <FileCode className="w-4 h-4 text-orange-500" />;
      case 'mp4':
      case 'avi':
      case 'mov':
      case 'mkv':
        return <Film className="w-4 h-4 text-purple-500" />;
      case 'mp3':
      case 'wav':
      case 'ogg':
      case 'm4a':
        return <Music className="w-4 h-4 text-green-500" />;
      case 'ppt':
      case 'pptx':
        return <FileText className="w-4 h-4 text-orange-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
      case 'svg':
      case 'bmp':
      case 'ico':
        return <ImageIcon className="w-4 h-4 text-pink-500" />;
      default:
        return <Paperclip className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const isValid = prompt.length >= minLength && prompt.length <= maxLength;
  const showWarning = charCount > 0 && charCount < minLength;
  const showError = charCount > maxLength;

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="w-full">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Attached Files Display */}
          {attachedFiles.length > 0 && (
            <div className="px-4 pt-3 pb-2 border-b border-gray-100">
              <div className="flex flex-wrap gap-2">
                {attachedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg px-3 py-1.5 text-xs border border-blue-200"
                  >
                    {getFileIcon(file.name)}
                    <div className="flex flex-col">
                      <span className="text-gray-700 max-w-[150px] truncate font-medium">
                        {file.name}
                      </span>
                      <span className="text-gray-500 text-[10px]">
                        {formatFileSize(file.size)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      disabled={isLoading}
                      className="text-gray-500 hover:text-red-600 transition-colors disabled:opacity-50"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="flex items-end gap-3 p-4">
            {/* Left Actions */}
            <div className="flex items-center gap-2 pb-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Attach files"
              >
                <Paperclip className="w-5 h-5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.html,.htm,.mp4,.avi,.mov,.mkv,.mp3,.wav,.ogg,.m4a,.jpg,.jpeg,.png,.gif,.webp,.svg,.bmp,.ico,image/*"
              />
              <button
                type="button"
                disabled={isLoading}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                title="More options"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            {/* Textarea */}
            <div className="flex-1">
              <textarea
                value={prompt}
                onChange={handleChange}
                placeholder="Enter your slides request here"
                disabled={isLoading}
                rows={1}
                maxLength={maxLength}
                className={cn(
                  'w-full px-3 py-2 rounded-lg resize-none text-sm',
                  'focus:outline-none transition-colors',
                  'placeholder:text-gray-400 bg-transparent',
                  isLoading && 'cursor-not-allowed opacity-50',
                  'max-h-32 overflow-y-auto'
                )}
                style={{ minHeight: '40px' }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                }}
              />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 pb-2">
              <button
                type="button"
                disabled={isLoading}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Voice input"
              >
                <Mic className="w-5 h-5" />
              </button>
              
              {/* Cancel Button - only show when loading */}
              {isLoading && onCancel && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors text-xs font-medium"
                  title="Cancel"
                >
                  Cancel
                </button>
              )}
              
              <button
                type="submit"
                disabled={!isValid || isLoading}
                className={cn(
                  'p-2 rounded-lg font-medium transition-all',
                  'flex items-center justify-center',
                  isValid && !isLoading
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                )}
                title="Send"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Sparkles className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="space-y-3">
        {/* Attached Files Display - Full Mode */}
        {attachedFiles.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                <Upload className="w-3 h-3" />
                Attached Files ({attachedFiles.length})
              </span>
              {!isLoading && (
                <button
                  type="button"
                  onClick={() => setAttachedFiles([])}
                  className="text-xs text-red-600 hover:text-red-700 font-medium"
                >
                  Clear All
                </button>
              )}
            </div>
            <div className="space-y-2">
              {attachedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white rounded-lg px-3 py-2 border border-gray-200"
                >
                  {getFileIcon(file.name)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    disabled={isLoading}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Textarea */}
        <div>
          <textarea
            value={prompt}
            onChange={handleChange}
            placeholder="Example: Create 5 slides about renewable energy..."
            disabled={isLoading}
            rows={4}
            maxLength={maxLength}
            className={cn(
              'w-full px-4 py-3 rounded-lg border resize-none text-sm',
              'focus:outline-none focus:ring-2 transition-colors',
              'placeholder:text-gray-400',
              isLoading && 'bg-gray-50 cursor-not-allowed',
              showError
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : showWarning
                ? 'border-yellow-300 focus:border-yellow-500 focus:ring-yellow-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            )}
          />

          {/* Character Count */}
          <div className="mt-1 flex items-center justify-between">
            <div className="text-xs">
              {showWarning && (
                <span className="text-yellow-600">
                  Min {minLength} chars
                </span>
              )}
              {showError && (
                <span className="text-red-600">
                  Max {maxLength} chars
                </span>
              )}
            </div>
            <span
              className={cn(
                'text-xs',
                showError
                  ? 'text-red-600 font-medium'
                  : charCount > maxLength * 0.9
                  ? 'text-yellow-600'
                  : 'text-gray-500'
              )}
            >
              {charCount} / {maxLength}
            </span>
          </div>
        </div>

        {/* Examples */}
        {/* <div>
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
                  setPrompt(example);
                  setCharCount(example.length);
                }}
                disabled={isLoading}
                className={cn(
                  'text-xs text-left px-2 py-1.5 rounded transition-colors',
                  'hover:bg-primary-50 text-gray-600 hover:text-primary-700',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'block w-full border border-gray-200'
                )}
              >
                {example}
              </button>
            ))}
          </div>
        </div> */}

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* File Upload Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-colors text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Paperclip className="w-4 h-4" />
            <span>Attach Files</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.html,.htm,.mp4,.avi,.mov,.mkv,.mp3,.wav,.ogg,.m4a,.jpg,.jpeg,.png,.gif,.webp,.svg,.bmp,.ico,image/*"
          />

          {/* Cancel Button */}
          {isLoading && onCancel && (
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors text-sm font-medium"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className={cn(
              'flex-1 py-2.5 px-4 rounded-lg font-medium transition-all text-sm',
              'flex items-center justify-center gap-2',
              isValid && !isLoading
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            )}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate with AI</span>
              </>
            )}
          </button>
        </div>

        {/* File Type Info */}
        {!isLoading && (
          <p className="text-xs text-gray-500 text-center">
            Supported: Documents (PDF, DOC, DOCX, PPT, PPTX, HTML), Images (JPG, PNG, GIF, WEBP, SVG), Videos (MP4, AVI, MOV), Audio (MP3, WAV, OGG) • Max 200MB per file
          </p>
        )}
      </div>
    </form>
  );
}
