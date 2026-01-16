import { cleanText } from "./util.js";

browser.runtime.onInstalled.addListener(() => {
  browser.contextMenus.create({
    id: "copy-clean-unicode",
    title: "Copy Clean Text",
    contexts: ["selection"],
  });
});

browser.contextMenus.onClicked.addListener(async (info, tab) => {
  const text = info.selectionText;
  if (!text) return;
  if (info.menuItemId === "copy-clean-unicode") {
    const cleaned = cleanText(text);
    await navigator.clipboard.writeText(cleaned);
  }
});
