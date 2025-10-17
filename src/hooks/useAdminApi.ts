'use client';

import { useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';
import { adminApi } from '@/lib/adminApi';

/**
 * Hook to initialize admin API with Clerk authentication
 * Use this in any component that needs to make admin API calls
 */
export function useAdminApi() {
  const { getToken } = useAuth();

  useEffect(() => {
    // Set the token getter function for the admin API
    adminApi.setTokenGetter(getToken);
  }, [getToken]);

  return adminApi;
}
