// util.js

export const CharacterCategory = {
  HIDDEN_CONTROL: "Hidden/Control Characters",
  SPACE: "Space Characters",
  QUOTES: "Quotes & Apostrophes",
  DASHES: "Dashes",
  PUNCTUATION: "Punctuation",
  FULL_WIDTH: "Full-Width Characters",
  VARIATION: "Variation Selectors",
};

function charInfo(char, replacement, category, description) {
  return {
    character: char,
    unicode: `U+${char
      .charCodeAt(0)
      .toString(16)
      .toUpperCase()
      .padStart(4, "0")}`,
    replacement,
    category,
    description,
  };
}

const PROBLEMATIC_CHARS = new Map();

/* ---------- helpers ---------- */
function addChar(char, replacement, category, description) {
  PROBLEMATIC_CHARS.set(
    char,
    charInfo(char, replacement, category, description)
  );
}

/* ---------- Hidden / Control ---------- */
[
  ["\u00AD", "Soft hyphen"],
  ["\u180E", "Mongolian vowel separator"],
  ["\u200B", "Zero width space"],
  ["\u200C", "Zero width non-joiner"],
  ["\u200D", "Zero width joiner"],
  ["\u200E", "Left-to-right mark"],
  ["\u200F", "Right-to-left mark"],
  ["\u202A", "LTR embedding"],
  ["\u202B", "RTL embedding"],
  ["\u202C", "Pop directional formatting"],
  ["\u202D", "LTR override"],
  ["\u202E", "RTL override"],
  ["\u2060", "Word joiner"],
  ["\uFEFF", "BOM"],
].forEach(([c, d]) => addChar(c, "", CharacterCategory.HIDDEN_CONTROL, d));

/* ---------- Variation selectors ---------- */
for (let i = 0xfe00; i <= 0xfe0f; i++) {
  addChar(
    String.fromCharCode(i),
    "",
    CharacterCategory.VARIATION,
    "Variation selector"
  );
}

/* ---------- Spaces ---------- */
[
  "\u00A0",
  "\u1680",
  "\u2000",
  "\u2001",
  "\u2002",
  "\u2003",
  "\u2004",
  "\u2005",
  "\u2006",
  "\u2007",
  "\u2008",
  "\u2009",
  "\u200A",
  "\u202F",
  "\u205F",
  "\u3000",
].forEach((c) => addChar(c, " ", CharacterCategory.SPACE, "Unicode space"));

/* ---------- Dashes ---------- */
[
  ["\u2012", "Figure dash"],
  ["\u2013", "En dash"],
  ["\u2014", "Em dash"],
  ["\u2212", "Minus sign"],
].forEach(([c, d]) => addChar(c, "-", CharacterCategory.DASHES, d));

/* ---------- Quotes ---------- */
[
  ["\u2018", "'"],
  ["\u2019", "'"],
  ["\u201C", '"'],
  ["\u201D", '"'],
  ["\u2032", "'"],
  ["\u2033", '"'],
].forEach(([c, r]) => addChar(c, r, CharacterCategory.QUOTES, "Quote"));

/* ---------- Punctuation ---------- */
addChar("\u2026", "...", CharacterCategory.PUNCTUATION, "Ellipsis");
addChar("\u2022", "*", CharacterCategory.PUNCTUATION, "Bullet");

/* ---------- Full-width ---------- */
for (let i = 0xff01; i <= 0xff5e; i++) {
  const fw = String.fromCharCode(i);
  const ascii = String.fromCharCode(i - 0xff01 + 0x21);
  addChar(fw, ascii, CharacterCategory.FULL_WIDTH, "Full-width character");
}

/* ===================================================== */
/* ===================== API ============================ */
/* ===================================================== */

export function detectIssues(text) {
  const issues = [];

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const info = PROBLEMATIC_CHARS.get(c);
    if (info) {
      issues.push({
        startOffset: i,
        endOffset: i + 1,
        characterInfo: info,
        context: getContext(text, i, 20),
      });
    }
  }
  return issues;
}

export function cleanText(text) {
  let result = text;

  const issues = detectIssues(text).sort(
    (a, b) => b.startOffset - a.startOffset
  );

  for (const issue of issues) {
    result =
      result.slice(0, issue.startOffset) +
      issue.characterInfo.replacement +
      result.slice(issue.endOffset);
  }

  result = result.replace(/[ \t]+/g, " ");
  result = result.replace(/\n{3,}/g, "\n\n");

  return result.trim();
}

function getContext(text, pos, max) {
  const start = Math.max(0, pos - max / 2);
  const end = Math.min(text.length, pos + max / 2);
  return text.slice(start, end);
}
