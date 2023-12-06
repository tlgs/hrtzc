import path from 'path';
import purgecss from '@fullhuman/postcss-purgecss';

export default {
  root: path.resolve(__dirname, 'src'),
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
  },
  css: {
    postcss: {
      plugins: [
        purgecss({
          content: ['./**/*.html']
        })
      ]
    }
  }
};
