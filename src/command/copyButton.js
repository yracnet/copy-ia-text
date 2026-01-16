import { cleanText } from "./util.js";

const browserAPI = window.chrome ?? window.browser;

browserAPI.runtime.onInstalled.addListener(() => {
  browserAPI.contextMenus.create({
    id: "copy-clean-unicode",
    title: "Copy Clean Text",
    contexts: ["selection"],
  });
});

browserAPI.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== "copy-clean-unicode") return;
  const cleaned = cleanText(info.selectionText);
  browserAPI.tabs.sendMessage(tab.id, {
    action: "cct-copy",
    text: cleaned,
    raw: info.selectionText,
  });
});

// browserAPI.contextMenus.onClicked.addListener(async (info, tab) => {
//   console.log(">>>>", info);
//   const text = info.selectionText;
//   if (!text) return;

//   if (info.menuItemId === "copy-clean-unicode") {
//     try {
//       const cleaned = cleanText(text);
//       await navigator.clipboard.writeText(cleaned);
//     } catch (err) {
//       console.log("No se pudo copiar el texto:", err);
//     }
//   }
// });
