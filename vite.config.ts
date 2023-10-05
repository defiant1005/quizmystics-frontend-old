import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
import path, { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [vue(), eslintPlugin(), tsconfigPaths()],

  server: {
    port: 8080,
  },

  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
    extensions: [".ts", ".js", ".vue"],
  },

  build: {
    outDir: path.join(__dirname, "dist"),
    rollupOptions: {
      input: resolve(__dirname, "index.html"),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "src/scss/_variables.scss";',
      },
    },
  },
});
