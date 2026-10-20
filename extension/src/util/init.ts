import { addChar } from "./unicodeDetector";

/* ===============================
   Hidden / Control characters
================================ */
[
    ["\u00AD", "", "HIDDEN_CONTROL", "Soft hyphen"],
    ["\u180E", "", "HIDDEN_CONTROL", "Mongolian vowel separator"],
    ["\u200B", "", "HIDDEN_CONTROL", "Zero width space"],
    ["\u200C", "", "HIDDEN_CONTROL", "Zero width non-joiner"],
    ["\u200D", "", "HIDDEN_CONTROL", "Zero width joiner"],
    ["\u200E", "", "HIDDEN_CONTROL", "Left-to-right mark"],
    ["\u200F", "", "HIDDEN_CONTROL", "Right-to-left mark"],
    ["\u202A", "", "HIDDEN_CONTROL", "Left-to-right embedding"],
    ["\u202B", "", "HIDDEN_CONTROL", "Right-to-left embedding"],
    ["\u202C", "", "HIDDEN_CONTROL", "Pop directional formatting"],
    ["\u202D", "", "HIDDEN_CONTROL", "Left-to-right override"],
    ["\u202E", "", "HIDDEN_CONTROL", "Right-to-left override"],
    ["\u2060", "", "HIDDEN_CONTROL", "Word joiner"],
    ["\u2061", "", "HIDDEN_CONTROL", "Function application"],
    ["\u2062", "", "HIDDEN_CONTROL", "Invisible times"],
    ["\u2063", "", "HIDDEN_CONTROL", "Invisible separator"],
    ["\u2064", "", "HIDDEN_CONTROL", "Invisible plus"],
    ["\u206A", "", "HIDDEN_CONTROL", "Inhibit symmetric swapping"],
    ["\u206B", "", "HIDDEN_CONTROL", "Activate symmetric swapping"],
    ["\u206C", "", "HIDDEN_CONTROL", "Inhibit Arabic form shaping"],
    ["\u206D", "", "HIDDEN_CONTROL", "Activate Arabic form shaping"],
    ["\u206E", "", "HIDDEN_CONTROL", "National digit shapes"],
    ["\u206F", "", "HIDDEN_CONTROL", "Nominal digit shapes"],
    ["\uFEFF", "", "HIDDEN_CONTROL", "Zero width no-break space (BOM)"]
].forEach(([c, r, cat, desc]) =>
    addChar(c, r, cat as any, desc)
);

/* ===============================
   Variation selectors
================================ */
Array.from({ length: 16 }, (_, i) => i + 0xfe00).forEach(code =>
    addChar(
        String.fromCharCode(code),
        "",
        "VARIATION",
        "Variation selector"
    )
);

/* ===============================
   Space characters
================================ */
[
    ["\u00A0", " ", "SPACE", "Non-breaking space"],
    ["\u1680", " ", "SPACE", "Ogham space mark"],
    ["\u2000", " ", "SPACE", "En quad"],
    ["\u2001", " ", "SPACE", "Em quad"],
    ["\u2002", " ", "SPACE", "En space"],
    ["\u2003", " ", "SPACE", "Em space"],
    ["\u2004", " ", "SPACE", "Three-per-em space"],
    ["\u2005", " ", "SPACE", "Four-per-em space"],
    ["\u2006", " ", "SPACE", "Six-per-em space"],
    ["\u2007", " ", "SPACE", "Figure space"],
    ["\u2008", " ", "SPACE", "Punctuation space"],
    ["\u2009", " ", "SPACE", "Thin space"],
    ["\u200A", " ", "SPACE", "Hair space"],
    ["\u202F", " ", "SPACE", "Narrow no-break space"],
    ["\u205F", " ", "SPACE", "Medium mathematical space"],
    ["\u3000", " ", "SPACE", "Ideographic space"]
].forEach(([c, r, cat, desc]) =>
    addChar(c, r, cat as any, desc)
);

/* ===============================
   Dashes
================================ */
[
    ["\u2012", "-", "DASHES", "Figure dash"],
    ["\u2013", "-", "DASHES", "En dash"],
    ["\u2014", "-", "DASHES", "Em dash"],
    ["\u2015", "-", "DASHES", "Horizontal bar"],
    ["\u2212", "-", "DASHES", "Minus sign"]
].forEach(([c, r, cat, desc]) =>
    addChar(c, r, cat as any, desc)
);

/* ===============================
   Quotes & apostrophes
================================ */
[
    ["\u2018", "'", "QUOTES", "Left single quotation mark"],
    ["\u2019", "'", "QUOTES", "Right single quotation mark"],
    ["\u201A", "'", "QUOTES", "Single low-9 quotation mark"],
    ["\u201B", "'", "QUOTES", "Single high-reversed-9 quotation mark"],
    ["\u201C", `"`, "QUOTES", "Left double quotation mark"],
    ["\u201D", `"`, "QUOTES", "Right double quotation mark"],
    ["\u201E", `"`, "QUOTES", "Double low-9 quotation mark"],
    ["\u201F", `"`, "QUOTES", "Double high-reversed-9 quotation mark"],
    ["\u2032", "'", "QUOTES", "Prime"],
    ["\u2033", `"`, "QUOTES", "Double prime"],
    ["\u2034", "'''", "QUOTES", "Triple prime"],
    ["\u2035", "'", "QUOTES", "Reversed prime"],
    ["\u2036", `"`, "QUOTES", "Reversed double prime"],
    ["\u00AB", `"`, "QUOTES", "Left-pointing double angle quotation mark"],
    ["\u00BB", `"`, "QUOTES", "Right-pointing double angle quotation mark"]
].forEach(([c, r, cat, desc]) =>
    addChar(c, r, cat as any, desc)
);

/* ===============================
   Punctuation
================================ */
[
    ["\u2026", "...", "PUNCTUATION", "Horizontal ellipsis"],
    ["\u2022", "*", "PUNCTUATION", "Bullet"],
    ["\u00B7", "*", "PUNCTUATION", "Middle dot"]
].forEach(([c, r, cat, desc]) =>
    addChar(c, r, cat as any, desc)
);

/* ===============================
   Full-width ASCII
================================ */
Array.from({ length: 0x5e }, (_, i) => {
    const fullWidth = String.fromCharCode(0xff01 + i);
    const ascii = String.fromCharCode(0x21 + i);
    addChar(
        fullWidth,
        ascii,
        "FULL_WIDTH",
        `Full-width ${ascii}`
    );
});
