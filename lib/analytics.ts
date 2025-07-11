/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Analytics {
    [key: string]: any;
    push?: (...args: any[]) => number;
    methods?: string[];
    factory?: (method: string) => (...args: unknown[]) => any;
    load?: (key: string, options?: any) => void;
    SNIPPET_VERSION?: string;
    _loadOptions?: any;
  }
  interface Window {
    analytics: Analytics;
  }
}

export function trackError(error: Error, context: string, metadata?: Record<string, unknown>) {
  try {
    
    if (typeof window !== 'undefined' && window.analytics) {
      window.analytics.track('API Error', {
        error: error.message,
        stack: error.stack,
        context,
        ...metadata,
        timestamp: new Date().toISOString()
      });
    }
    
    //  console for development
    if (process.env.NODE_ENV === 'development') {
      console.groupCollapsed(`[Error Tracking] ${context}`);
      console.error(error);
      console.log('Metadata:', metadata);
      console.groupEnd();
    }
    
    // Optional: Send to your backend
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/error-logging', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          error: error.message,
          context,
          metadata
        })
      }).catch(e => console.error('Failed to log error:', e));
    }
  } catch (e) {
    console.error('Error tracking failed:', e);
  }
}

// Initialize analytics in your app
export function initAnalytics() {
  if (typeof window !== 'undefined') {
    // Example with Segment.io
    if (!window.analytics) {
      const script = document.createElement('script');
      script.src = 'https://cdn.segment.com/analytics.js/v1/your-write-key/analytics.min.js';
      script.async = true;
      document.head.appendChild(script);
      
      window.analytics = window.analytics || [];
      window.analytics.methods = [
        'trackSubmit',
        'trackClick',
        'trackLink',
        'trackForm',
        'pageview',
        'identify',
        'reset',
        'group',
        'track',
        'ready',
        'alias',
        'debug',
        'page',
        'once',
        'off',
        'on'
      ];
      window.analytics.factory = function(method: string) {
        return function(...args: unknown[]) {
          args.unshift(method);
          if (typeof window.analytics.push === 'function') {
            window.analytics.push(args);
          }
          return window.analytics;
        };
      };
      for (let i = 0; i < window.analytics.methods.length; i++) {
        const key = window.analytics.methods[i];
        window.analytics[key] = window.analytics.factory(key);
      }
      window.analytics.load = function(key: string, options: any) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://cdn.segment.com/analytics.js/v1/'
          + key + '/analytics.min.js';
        const first = document.getElementsByTagName('script')[0];
        first.parentNode?.insertBefore(script, first);
        window.analytics._loadOptions = options;
      };
      window.analytics.SNIPPET_VERSION = '4.1.0';
      window.analytics.load('YOUR_WRITE_KEY');
    }
  }
}