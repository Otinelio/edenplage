import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite"; // <-- Ajout de l'import Nitro

export default defineConfig({
  vite: { // <-- Ajout de la clé vite pour passer des plugins supplémentaires
    plugins: [
      nitro({ preset: "vercel" }) // <-- Force le formatage pour Vercel
    ]
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});