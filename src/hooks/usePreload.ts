import { useCallback } from 'react';
import { preloadComponent } from '../utils/preloader';

interface PreloadConfig {
  name: string;
  importFn: () => Promise<any>;
}

export const usePreload = (config: PreloadConfig) => {
  const preload = useCallback(() => {
    preloadComponent(config.name, config.importFn);
  }, [config.name, config.importFn]);

  const preloadHandlers = {
    onMouseEnter: preload,
    onFocus: preload,
  };

  return {
    preload,
    preloadHandlers,
  };
};

// Predefined preload configurations for common pages
export const preloadConfigs = {
  home: {
    name: 'Home',
    importFn: () => import('../pages/Home'),
  },
  login: {
    name: 'Login',
    importFn: () => import('../pages/Login'),
  },
  signup: {
    name: 'SignUp',
    importFn: () => import('../pages/Signup'),
  },
  dashboard: {
    name: 'UserDashboardPage',
    importFn: () => import('../pages/UserDashboardPage'),
  },
  wallet: {
    name: 'WalletPage',
    importFn: () => import('../pages/WalletPage'),
  },
  transactions: {
    name: 'TransactionsPage',
    importFn: () => import('../pages/TransactionsPage'),
  },
  cards: {
    name: 'CardsPage',
    importFn: () => import('../pages/CardsPage'),
  },
  blog: {
    name: 'Blog',
    importFn: () => import('../pages/Blog'),
  },
  customerCare: {
    name: 'CustomerCare',
    importFn: () => import('../pages/CustomerCare'),
  },
  adminDashboard: {
    name: 'AdminDashboardPage',
    importFn: () => import('../AdminPages/AdminDashboardPage'),
  },
  users: {
    name: 'UsersPage',
    importFn: () => import('../AdminPages/UsersPage'),
  },
  analytics: {
    name: 'AnalyticsPage',
    importFn: () => import('../AdminPages/AnalyticsVisitsLogsPage'),
  },
} as const;

// Helper function to create preload handlers for navigation links
export const createNavPreloadHandlers = (pageKey: keyof typeof preloadConfigs) => {
  const config = preloadConfigs[pageKey];
  if (!config) {
    console.warn(`Preload config not found for: ${pageKey}`);
    return {};
  }
  
  const { preloadHandlers } = usePreload(config);
  return preloadHandlers;
}; 