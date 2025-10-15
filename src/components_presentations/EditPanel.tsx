'use client';

import { useState } from 'react';
import { 
  Wand2, 
  Plus, 
  Trash2, 
  Split, 
  Palette, 
  Type, 
  Send,
  Loader2,
  CheckCircle,
  XCircle,
  Info,
  Sparkles
} from 'lucide-react';

// API URL from environment variable, fallback to localhost for development
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface EditPanelProps {
  jobId: string;
  onEditSuccess: () => void;
  totalSlides: number;
}

interface EditResult {
  success: boolean;
  message: string;
  operation?: string;
  totalSlides?: number;
}

export default function EditPanel({ jobId, onEditSuccess, totalSlides }: EditPanelProps) {
  const [command, setCommand] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [result, setResult] = useState<EditResult | null>(null);
  const [showQuickActions, setShowQuickActions] = useState(true);

  const quickCommands = [
    {
      icon: Plus,
      label: 'Add Slides',
      command: 'add 2 slides at the end about ',
      color: 'from-green-500 to-emerald-600',
      description: 'Insert new slides'
    },
    {
      icon: Trash2,
      label: 'Delete Slide',
      command: 'delete slide ',
      color: 'from-red-500 to-pink-600',
      description: 'Remove slides'
    },
    {
      icon: Split,
      label: 'Split Slide',
      command: 'split slide 1 into 2 slides',
      color: 'from-blue-500 to-cyan-600',
      description: 'Split one into multiple'
    },
    {
      icon: Palette,
      label: 'Change Design',
      command: 'change design to modern tech style',
      color: 'from-purple-500 to-violet-600',
      description: 'Apply new theme'
    },
    {
      icon: Type,
      label: 'Adjust Font',
      command: 'make fonts bigger on slide 1',
      color: 'from-orange-500 to-amber-600',
      description: 'Change font size'
    }
  ];

  const exampleCommands = [
    'add 2 slides after slide 3 about AI ethics',
    'delete slides 5, 7, 9',
    'split slide 4 into 3 slides',
    'change design to corporate style',
    'make fonts bigger on all slides',
    'add 3 slides before slide 2 about introduction',
    'delete slide 8',
    'enlarge font on slide 3'
  ];

  const handleEdit = async () => {
    if (!command.trim()) return;

    setIsEditing(true);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/api/presentations/${jobId}/edit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          command: command.trim(),
          create_version: false
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResult({
          success: true,
          message: `✓ ${data.operation} completed successfully! Now ${data.total_slides} slides.`,
          operation: data.operation,
          totalSlides: data.total_slides
        });
        setCommand('');
        
        // Refresh slides after short delay
        setTimeout(() => {
          onEditSuccess();
          setResult(null);
        }, 2000);
      } else {
        throw new Error(data.detail || 'Edit failed');
      }
    } catch (error: any) {
      setResult({
        success: false,
        message: `✗ ${error.message || 'Failed to edit presentation'}`
      });
    } finally {
      setIsEditing(false);
    }
  };

  const handleQuickCommand = (quickCommand: string) => {
    setCommand(quickCommand);
    setShowQuickActions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleEdit();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
            <Wand2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Edit Presentation</h2>
            <p className="text-sm text-gray-600">Use natural language to modify your slides</p>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-blue-900">
              <strong>Current slides:</strong> {totalSlides} slides
            </p>
            <p className="text-xs text-blue-700 mt-1">
              Edits are fast and cost-efficient - only affected slides are regenerated!
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {showQuickActions && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {quickCommands.map((action, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickCommand(action.command)}
                className="group relative overflow-hidden rounded-xl border border-gray-200 hover:border-gray-300 bg-white hover:shadow-lg transition-all p-4"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                <div className="relative">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 mx-auto`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs font-semibold text-gray-900 text-center mb-1">
                    {action.label}
                  </p>
                  <p className="text-[10px] text-gray-600 text-center">
                    {action.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Command Input */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Edit Command
        </label>
        <div className="relative">
          <textarea
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your edit command... (e.g., 'add 2 slides about AI ethics')"
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows={3}
            disabled={isEditing}
          />
          <button
            onClick={handleEdit}
            disabled={isEditing || !command.trim()}
            className="absolute bottom-3 right-3 p-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 text-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isEditing ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        {!showQuickActions && (
          <button
            onClick={() => setShowQuickActions(true)}
            className="mt-2 text-xs text-purple-600 hover:text-purple-700 flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" />
            Show quick actions
          </button>
        )}
      </div>

      {/* Result Message */}
      {result && (
        <div
          className={`mb-4 rounded-xl p-4 flex items-start gap-3 ${
            result.success
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
          }`}
        >
          {result.success ? (
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <p
              className={`text-sm font-medium ${
                result.success ? 'text-green-900' : 'text-red-900'
              }`}
            >
              {result.message}
            </p>
            {result.success && (
              <p className="text-xs text-green-700 mt-1">
                Refreshing presentation...
              </p>
            )}
          </div>
        </div>
      )}

      {/* Example Commands */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Example Commands</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {exampleCommands.map((example, idx) => (
            <button
              key={idx}
              onClick={() => setCommand(example)}
              className="text-left px-3 py-2 text-xs text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="text-gray-500">→</span> {example}
            </button>
          ))}
        </div>
      </div>

      {/* Performance Info */}
      <div className="mt-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">⚡ Performance</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <p className="text-gray-600">Add Slides</p>
            <p className="font-semibold text-gray-900">5-8s</p>
          </div>
          <div>
            <p className="text-gray-600">Delete Slides</p>
            <p className="font-semibold text-gray-900">&lt;100ms</p>
          </div>
          <div>
            <p className="text-gray-600">Split Slide</p>
            <p className="font-semibold text-gray-900">4-6s</p>
          </div>
          <div>
            <p className="text-gray-600">Format</p>
            <p className="font-semibold text-gray-900">&lt;50ms</p>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-3">
          💰 55-80% cheaper than regenerating the entire presentation!
        </p>
      </div>
    </div>
  );
}
