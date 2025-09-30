import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": resolve("./src"),
      "@/shared": resolve("./src/shared"),
      "@/features": resolve("./src/features"),
      "@/ApplicationLayer": resolve("./src/ApplicationLayer"),
    },
  },
});
