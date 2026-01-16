import { cleanText } from "./util.js";

const browserAPI = window.browser || window.chrome;

browserAPI.runtime.onInstalled.addListener(() => {
  browserAPI.contextMenus.create({
    id: "copy-clean-unicode",
    title: "Copy Clean Text",
    contexts: ["selection"],
  });
});

browserAPI.contextMenus.onClicked.addListener(async (info, tab) => {
  const text = info.selectionText;
  if (!text) return;
  if (info.menuItemId === "copy-clean-unicode") {
    const cleaned = cleanText(text);
    try {
      await navigator.clipboard.writeText(cleaned);
      console.log("Texto limpio copiado:", cleaned);
    } catch (err) {
      console.error("No se pudo copiar el texto:", err);
    }
  }
});
