# Copy IA Text

**Copy IA Text** is a browser extension that allows you to copy text from ChatGPT and other AI tools while automatically removing hidden or invisible characters. Many AI platforms insert special characters to trace the origin of text or preserve formatting. This extension ensures you get clean, plain, readable text every time.

---

## Features

- Copy text from AI tools like ChatGPT without hidden or invisible tracking characters.
- Automatically removes unwanted Unicode characters inserted by AI platforms.
- Works entirely locally in your browser — **no data is collected, stored, or transmitted**.
- Supports context menu and clipboard copy.
- Cross-browser: Chrome and Firefox compatible.

---

## Installation

### Chrome

1. Go to `chrome://extensions/` in your browser.
2. Enable **Developer mode** (top-right corner).
3. Click **Load unpacked** and select the project folder.
4. The extension should now appear in your toolbar.

### Firefox

1. Go to `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on**.
3. Select `manifest.json` in the project folder.
4. The extension will appear in your toolbar.

> For permanent installation, submit the extension to the [Firefox Add-ons Store](https://addons.mozilla.org/).

---

## Usage

1. Navigate to any AI platform (ChatGPT, etc.).
2. Select the text you want to copy.
3. Right-click and choose **Copy Clean Text** (or use the provided keyboard shortcut).
4. Paste anywhere — the text will be clean, without hidden characters.

---

## Development

### Requirements

- Node.js >= 18
- npm or yarn
- Vite

### Install dependencies

```bash
npm install
```
