import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import compression from "vite-plugin-compression";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    tailwindcss(), 
    reactRouter(), 
    tsconfigPaths(),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
  server: {
    headers: {
      'Cache-Control': 'no-store',
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router', 'gsap', 'gsap/ScrollTrigger', 'lucide-react', 'i18next', 'react-i18next'],
  },
  build: {
    outDir: "build",
    target: 'esnext',
    cssMinify: true,
    sourcemap: false,
    rollupOptions: {
      output: isSsrBuild ? {} : {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router'],
          'vendor-utils': ['gsap', 'i18next', 'react-i18next', 'lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}));
