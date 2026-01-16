import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react-swc'
import webExtension from '@samrum/vite-plugin-web-extension';


// https://vite.dev/config/
export default defineConfig({
  appType: 'mpa',
  server: {
    cors: true,
  },
  resolve: {
    alias: {
      '@vite/client.js': '@vite/client'
    }
  },
  plugins: [
    react(),
    webExtension(
      {
        manifest: {
          manifest_version: 2,
          name: "Copy Clean Text",
          version: "1.0.0",
          permissions: [
            "storage",
            "contextMenus",
            "clipboardWrite",
            "activeTab"
          ],
          background: {
            scripts: ["src/command/copyButton.js"]
          },
          icons: {
            "16": "icons/favicon-16x16.png",
            "32": "icons/favicon-32x32.png"
          }
        }
      }) as PluginOption,
  ],
})
