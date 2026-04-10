import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {fileURLToPath, URL} from "url"
import {viteStaticCopy} from "vite-plugin-static-copy";
 
// https://vitejs.dev/config/
export default defineConfig(async () => ({
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/setupTests.ts",
    },
    resolve: {
        alias: [
            {find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url))},
        ],
    },
  plugins: [
    react(),
    viteStaticCopy({
        targets: [
            // 拷贝 dist/index.html 到 dist/404.html，确保在生产环境页面跳转时能够正确加载
            {
                src: 'dist/index.html',
                dest: '.',
                rename: '404.html'
            }
        ]
    })
  ],
 
  clearScreen: false, 
  server: {
    port: 1420,
    strictPort: true,
    host: true,
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 1421,
        }, 
  },
}));
