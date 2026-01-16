import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react-swc'
import webExtension from '@samrum/vite-plugin-web-extension';
//@ts-ignore
import autoZip from 'vite-plugin-auto-zip';

// https://vite.dev/config/
export default defineConfig({
  appType: 'mpa',
  server: {
    cors: true,
  },
  build: {
    minify: false
  },
  plugins: [
    react(),
    autoZip('cct-chrome.zip', './dist', './release'),
    autoZip('cct-firefox.zip', './dist', './release'),
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
          content_scripts: [
            {
              "matches": ["<all_urls>"],
              "js": ["src/page/content-script.js"]
            }
          ],
          icons: {
            "16": "icons/favicon-16x16.png",
            "32": "icons/favicon-32x32.png",
            "48": "icons/favicon-48x48.png",
            "128": "icons/favicon-128x128.png"
          }
        }
      }) as PluginOption
  ],
})
