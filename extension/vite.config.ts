import { defineConfig, type PluginOption } from 'vite'
import webExtension from '@samrum/vite-plugin-web-extension';
import zipPlugin from './vite-plugin-zip';
import pkg from './package.json' with { type: 'json' };

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
    zipPlugin({ fileName: 'copy-ia-text.zip', outDir: 'dist-zip' }),
    webExtension(
      {
        manifest: {
          manifest_version: 3,
          name: "Copy IA Text",
          description: "Copies text from ChatGPT and other AI tools while removing hidden characters inserted for source tracing, ensuring clean and plain text output.",
          version: pkg.version,
          browser_specific_settings: {
            gecko: {
              id: "copy-ia-text@yracnet.dev",
              data_collection_permissions: {
                required: ["none"],
                optional: []
              }
            }
          },
          permissions: [
            "contextMenus",
            "clipboardWrite"
          ],
          background: {
            service_worker: "src/command/copyButton.js"
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
