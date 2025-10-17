'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

/**
 * Old login page - now redirects to new Clerk-based sign-in
 * This ensures backward compatibility with old bookmarks/links
 */
export default function AdminLoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to new Clerk sign-in page
    router.replace('/sign-in?redirect_url=/en/admin');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="text-center">
        <div className="mx-auto h-16 w-16 bg-indigo-600 rounded-full flex items-center justify-center animate-pulse">
          <Lock className="h-8 w-8 text-white" />
        </div>
        <p className="mt-4 text-gray-400">Redirecting to secure login...</p>
      </div>
    </div>
  );
}
