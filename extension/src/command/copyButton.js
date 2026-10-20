import { cleanText } from "./util.js";

const browserAPI = window.chrome ?? window.browser;

browserAPI.runtime.onInstalled.addListener(() => {
  browserAPI.contextMenus.create({
    id: "copy-ia-text",
    title: "Copy IA Text",
    contexts: ["selection"],
  });
});

browserAPI.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== "copy-ia-text") return;
  const cleaned = cleanText(info.selectionText);
  browserAPI.tabs.sendMessage(tab.id, {
    action: "copy-ia-text",
    text: cleaned,
    raw: info.selectionText,
  });
});
