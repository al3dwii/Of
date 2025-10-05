import Link from 'next/link';
import { Home, Search, FileText, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for could not be found. Return to homepage or explore our tools.',
  robots: {
    index: false,
    follow: true, // Still follow links to help discover other pages
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            404
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full" />
        </div>

        {/* Error Message */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/en"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          <Link
            href="/en/dashboard"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 font-medium rounded-lg border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go to Dashboard
          </Link>
        </div>

        {/* Popular Tools */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center justify-center">
            <FileText className="w-5 h-5 mr-2" />
            Popular Tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: 'AI Presentations', href: '/en/slides', icon: '🎨' },
              { name: 'Video Dubbing', href: '/en/video', icon: '🎥' },
              { name: 'PDF Converter', href: '/en/pdf', icon: '📄' },
              { name: 'Documents', href: '/en/documents', icon: '📝' },
              { name: 'Translate', href: '/en/translate', icon: '🌐' },
              { name: 'Web Tools', href: '/en/web', icon: '🔧' },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 border-2 border-transparent transition-all"
              >
                <span className="text-2xl mr-3">{tool.icon}</span>
                <span className="text-sm font-medium text-gray-700 hover:text-blue-600">
                  {tool.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Search Suggestion */}
        <p className="mt-8 text-gray-500 text-sm">
          Can't find what you're looking for?{' '}
          <Link href="/en/faq" className="text-blue-600 hover:underline">
            Check our FAQ
          </Link>
          {' '}or{' '}
          <Link href="/en/pricing" className="text-blue-600 hover:underline">
            view pricing
          </Link>
        </p>
      </div>

      {/* Structured Data for 404 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: '404 Not Found',
            description: 'This page could not be found.',
          }),
        }}
      />
    </div>
  );
}
