import react from "@vitejs/plugin-react-swc";
import viteTsconfigPaths from "vite-tsconfig-paths";
import checker from "vite-plugin-checker";
import svgr from "vite-plugin-svgr";
import { defineConfig,loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), checker({ typescript: true }), svgr()],
  server: { port: 5001, host: true },
  preview: { port: 5000, host: true },
  build: {
    outDir: "./build",
  },
  
});
