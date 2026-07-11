import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config for the portfolio client.
// The .js files in this project contain JSX, so esbuild is told to treat
// them as JSX (CRA allowed this implicitly; Vite needs it spelled out).
export default defineConfig({
  // Tell the React plugin to run its JSX transform on .js files too.
  plugins: [react({ include: /\.(js|jsx)$/ })],
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { ".js": "jsx" },
    },
  },
});
