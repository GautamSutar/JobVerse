import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173, // Set your preferred port here
    strictPort: true, // Ensures Vite doesn't switch ports if 5173 is busy
  },
});
