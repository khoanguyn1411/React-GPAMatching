import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import svgr from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), checker({ typescript: true }), svgr()],
  server: { port: 5001, host: true },
  preview: { port: 5000, host: true },
  build: {
    outDir: "./build",
    // Setup rollupOptions to avoid issue: https://programmerah.com/solved-vite-packing-error-some-chunks-are-larger-than-500kb-after-minification-33922/
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        },
      },
    },
  },
});
