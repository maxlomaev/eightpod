import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages serves the site from /eightpod/
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/eightpod/" : "/",
  plugins: [react(), tailwindcss()],
  server: { port: 5541 },
}));
