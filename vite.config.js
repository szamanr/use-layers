import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      fileName: (format) => {
        switch (format) {
          case "cjs":
            return "index.cjs";
          case "es":
          default:
            return "index.js";
        }
      },
      formats: ["es", "cjs"],
      name: "use-layers",
    },
    rollupOptions: {
      // externalize deps that shouldn't be bundled
      // into your library
      external: ["react", "react-dom"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: "React",
        },
      },
    },
  },
  plugins: [
    dts({
      include: ["./index.ts", "./src"],
      outputDir: "./dist/",
    }),
    react(),
  ],
});
