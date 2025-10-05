'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Languages, Upload, Download, Loader2, CheckCircle } from 'lucide-react';
import PromptForm from '@/components/PromptForm';

export default function TranslateWorkbench() {
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Auto-start translation if prompt is in URL
  useEffect(() => {
    const prompt = searchParams?.get('prompt');
    const autoStart = searchParams?.get('autoStart');
    const tool = searchParams?.get('tool');
    
    if (prompt && autoStart === 'true' && !isProcessing) {
      console.log('[TRANSLATE TOOL] Auto-starting with prompt:', prompt, 'tool:', tool);
      handleSubmit(decodeURIComponent(prompt));
    }
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (prompt: string) => {
    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      // TODO: Implement actual translation API call
      console.log('[TRANSLATE TOOL] Processing:', prompt);
      
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setResult('Translation completed successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to translate');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Languages className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Translation Tool</h1>
              <p className="text-gray-600 text-sm">Translate presentations and documents with AI</p>
            </div>
          </div>

          {/* Prompt Form */}
          <div className="mt-6">
            <PromptForm 
              onSubmit={handleSubmit} 
              isLoading={isProcessing}
            />
          </div>
        </div>

        {/* Processing Status */}
        {isProcessing && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
            <div className="flex items-center gap-4">
              <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
              <div>
                <h3 className="font-semibold text-gray-900">Translating your content...</h3>
                <p className="text-sm text-gray-600">This may take a few moments</p>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Result State */}
        {result && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-4 mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Translation Complete!</h3>
                <p className="text-sm text-gray-600">{result}</p>
              </div>
            </div>
            <button className="mt-4 flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Download className="w-4 h-4" />
              Download Translated File
            </button>
          </div>
        )}

        {/* Features */}
        {!isProcessing && !result && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🌍',
                title: 'Multi-Language',
                description: 'Translate to Arabic, English, Spanish, and more',
              },
              {
                icon: '📊',
                title: 'Preserve Formatting',
                description: 'Maintains original layout and design',
              },
              {
                icon: '🎯',
                title: 'Context-Aware',
                description: 'AI understands context for better translations',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
