# Copy IA Text

**Copy IA Text** is a browser extension that copies text from ChatGPT and other AI tools while automatically removing hidden or invisible characters. Many AI platforms insert special characters to trace the origin of text or preserve formatting. This extension ensures you get clean, plain, readable text every time.

---

## Features

- Copy text from AI tools like ChatGPT without hidden or invisible tracking characters.
- Automatically removes unwanted Unicode characters inserted by AI platforms.
- Works entirely locally in your browser — **no data is collected, stored, or transmitted**.
- Adds a **Copy IA Text** entry to the right-click menu when text is selected.
- Manifest V3 extension for Chromium-based browsers (Chrome, Edge, Brave, ...).

---

## Requirements

- Chromium-based browser (Chrome 88+, Edge, Brave, ...).
- Node.js >= 18 and Yarn 1.x, only for development.

> **Firefox is not supported right now.** The extension uses a Manifest V3
> background service worker, which Firefox does not implement. Support would
> require switching the background to a non-persistent event page.

---

## Installation

Build the extension first (see [Development](#development)), then:

1. Go to `chrome://extensions/` in your browser.
2. Enable **Developer mode** (top-right corner).
3. Click **Load unpacked** and select the `extension/dist` directory.

The packaged extension is also produced at `extension/dist-zip/copy-ia-text.zip`.

---

## Usage

1. Navigate to any AI platform (ChatGPT, etc.).
2. Select the text you want to copy.
3. Right-click and choose **Copy IA Text**.
4. Paste anywhere — the text will be clean, without hidden characters.

The extension has no toolbar button and no keyboard shortcut; it works only
through the context menu.

---

## Development

This repository is a Yarn workspaces monorepo:

- `extension/` — the browser extension (Vite build, Manifest V3).
- `example/` — a React demo page used to test the extension.

### Install dependencies

```bash
yarn install
```

### Extension

```bash
yarn dev        # dev server for extension/src
yarn build      # type-check, build into extension/dist and create extension/dist-zip/copy-ia-text.zip
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
