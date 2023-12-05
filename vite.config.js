import { resolve } from 'node:path';

export default {
  root: resolve(__dirname, 'src'),
  base: '/hrtzc/',
  server: {
    port: 8001
  },
  build: {
    outDir: '../dist'
  },
  preview: {
    port: 8002
  },
  esbuild: {
    legalComments: 'none'
  }
};
