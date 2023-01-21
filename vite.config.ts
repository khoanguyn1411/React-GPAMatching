import react from "@vitejs/plugin-react-swc";
import viteTsconfigPaths from "vite-tsconfig-paths";
import checker from "vite-plugin-checker";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite";

const viteEnv = {}
Object.keys(process.env).forEach((key) => {
  if (key.startsWith(`VITE_`)) {
    viteEnv[`import.meta.env.${key}`] = process.env[key]
  }
})

// https://vitejs.dev/config/
export default defineConfig({
  define: viteEnv,
  plugins: [react(), viteTsconfigPaths(), checker({ typescript: true }), svgr()],
  server: { port: 5000, host: true },
  build: {
    outDir: "./build",
  },
});
