// Admin State Management with Zustand
import { create } from 'zustand';
import type { AdminState } from '@/types/admin';

export const useAdminStore = create<AdminState>((set) => ({
  isAuthenticated: false,
  adminEmail: null,
  metrics: null,
  analytics: null,
  settings: null,
  activityLogs: [],

  setAuth: (email: string) => {
    set({ isAuthenticated: true, adminEmail: email });
  },

  logout: () => {
    set({
      isAuthenticated: false,
      adminEmail: null,
      metrics: null,
      analytics: null,
      settings: null,
      activityLogs: [],
    });
  },

  setMetrics: (metrics) => set({ metrics }),
  setAnalytics: (analytics) => set({ analytics }),
  setSettings: (settings) => set({ settings }),
  setActivityLogs: (logs) => set({ activityLogs: logs }),
}));
