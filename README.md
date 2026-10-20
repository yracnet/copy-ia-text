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

Build the extension first (see [Development](#development)), then:

### Chrome

1. Go to `chrome://extensions/` in your browser.
2. Enable **Developer mode** (top-right corner).
3. Click **Load unpacked** and select `extension/dist`.
4. The extension should now appear in your toolbar.

### Firefox

1. Go to `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on**.
3. Select `extension/dist/manifest.json`.
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

This repository is a Yarn workspaces monorepo:

- `extension/` — the browser extension (Vite build, Chrome/Firefox manifest).
- `example/` — a React demo page used to test the extension.

### Requirements

- Node.js >= 18
- Yarn 1.x

### Install dependencies

```bash
yarn install
```

### Extension

```bash
yarn dev        # dev server for extension/src
yarn build      # type-check and build into extension/dist (also creates the zips)
yarn lint
yarn preview
```

### Example page

```bash
yarn dev:example
yarn build:example
yarn lint:example
yarn preview:example
```

