import {defineConfig} from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/dog-fight-game",
  server: {
    host: true,
    port: 8080,
  },
});
