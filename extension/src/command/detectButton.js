import { detectIssues } from "./util.js";

browser.runtime.onInstalled.addListener(() => {
  browser.contextMenus.create({
    id: "detect-unicode",
    title: "🔍 Detectar Unicode sospechoso",
    contexts: ["selection"],
  });
});

browser.contextMenus.onClicked.addListener(async (info, tab) => {
  const text = info.selectionText;
  if (!text) return;
  if (info.menuItemId === "detect-unicode") {
    const issues = detectIssues(text);
    console.log("1 :::::", tab);
    console.log("2 :::::", tab.id);
    console.log("3 :::::", browser);
    console.log("4 :::::", browser.tabs);
    console.log("5 :::::", browser.tabs?.sendMessage);
    browser.tabs.sendMessage(tab.id, {
      type: "SHOW_UNICODE_ISSUES",
      issues,
    });
  }
});
