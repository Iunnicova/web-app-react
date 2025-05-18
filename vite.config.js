import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // Или просто '@vitejs/plugin-react', если вы не используете swc
import svgr from "@svgr/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        // svgr options
      },
    }),
  ],
});
