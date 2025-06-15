import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  // root: "./src",
  plugins: [react()],
  server: {
    host: "0.0.0.0", // 👈 This is the key line
    port: 5173,
    strictPort: true,
  },
});
