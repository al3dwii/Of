'use client';

import { useState, useRef } from 'react';
import { Sparkles, Loader2, Paperclip, Mic, MoreVertical, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PromptFormProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
  compact?: boolean;
}

export default function PromptForm({ onSubmit, isLoading, compact = false }: PromptFormProps) {
  const [prompt, setPrompt] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
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
      onSubmit(prompt);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachedFiles(prev => [...prev, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
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
                    className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1.5 text-xs"
                  >
                    <Paperclip className="w-3 h-3 text-gray-600" />
                    <span className="text-gray-700 max-w-[150px] truncate">
                      {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="text-gray-500 hover:text-red-600 transition-colors"
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
                accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
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
              <button
                type="submit"
                disabled={!isValid || isLoading}
                className={cn(
                  'p-2 rounded-lg font-medium transition-all',
                  'flex items-center justify-center',
                  isValid && !isLoading
                    ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm'
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
              'w-full px-3 py-2 rounded-lg border resize-none text-sm',
              'focus:outline-none focus:ring-2 transition-colors',
              'placeholder:text-gray-400',
              isLoading && 'bg-gray-50 cursor-not-allowed',
              showError
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : showWarning
                ? 'border-yellow-300 focus:border-yellow-500 focus:ring-yellow-200'
                : 'border-gray-300 focus:border-primary-500 focus:ring-primary-200'
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
        <div>
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
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className={cn(
              'w-full py-2.5 px-4 rounded-lg font-medium transition-all text-sm',
              'flex items-center justify-center gap-2',
              isValid && !isLoading
                ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
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
                <span>Generate</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
