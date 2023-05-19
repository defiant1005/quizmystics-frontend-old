import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
import path, { resolve } from "path";

export default defineConfig({
  plugins: [vue(), eslintPlugin()],

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
