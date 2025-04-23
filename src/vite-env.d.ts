
/// <reference types="vite/client" />

import { vi } from 'vitest';

// Extend the Window interface to include vi
declare global {
  interface Window {
    vi: typeof vi;
  }
}
