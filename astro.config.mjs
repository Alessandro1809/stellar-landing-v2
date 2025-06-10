// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    envDir: './',
    ssr: {
      noExternal: ['react-dom/client']
    }
  },

  integrations: [
    react({
      include: ['**/react/*']
    })
  ],

  output: 'server',

  adapter: cloudflare()
});