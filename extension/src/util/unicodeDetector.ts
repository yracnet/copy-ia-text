// unicodeDetector.ts

export type CharacterCategory =
    | "HIDDEN_CONTROL"
    | "SPACE"
    | "QUOTES"
    | "DASHES"
    | "PUNCTUATION"
    | "FULL_WIDTH"
    | "VARIATION";

export interface CharacterInfo {
    char: string;
    unicode: string;
    replacement: string;
    category: CharacterCategory;
    description: string;
}

export interface UnicodeIssue {
    startOffset: number;
    endOffset: number;
    info: CharacterInfo;
    context: string;
}

/**
 * Mapa principal de caracteres problemáticos
 */
const PROBLEMATIC_CHARS = new Map<string, CharacterInfo>();

/**
 * API pública
 */
export const addChar = (
    char: string,
    replacement: string,
    category: CharacterCategory,
    description: string
): void => {
    PROBLEMATIC_CHARS.set(char, {
        char,
        unicode: `U+${char.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0")}`,
        replacement,
        category,
        description
    });
};

const getContext = (text: string, pos: number, max = 20): string => {
    const start = Math.max(0, pos - max / 2);
    const end = Math.min(text.length, pos + max / 2);
    return text.slice(start, end);
};

export const detectIssues = (
    text: string,
    enabledCategories?: Set<CharacterCategory>
): UnicodeIssue[] => {
    const issues: UnicodeIssue[] = [];

    [...text].forEach((char, i) => {
        const info = PROBLEMATIC_CHARS.get(char);
        if (!info) return;

        if (enabledCategories && !enabledCategories.has(info.category)) return;

        issues.push({
            startOffset: i,
            endOffset: i + 1,
            info,
            context: getContext(text, i)
        });
    });

    return issues;
};

export const cleanText = (
    text: string,
    enabledCategories?: Set<CharacterCategory>
): string => {
    const issues = detectIssues(text, enabledCategories).sort(
        (a, b) => b.startOffset - a.startOffset
    );

    let result = text;

    issues.forEach(({ startOffset, endOffset, info }) => {
        result =
            result.slice(0, startOffset) +
            info.replacement +
            result.slice(endOffset);
    });

    // Normalizar espacios (sin tocar saltos de línea)
    result = result.replace(/[ \t]+/g, " ");

    // Limpiar líneas en blanco excesivas
    result = result.replace(/\n{3,}/g, "\n\n");

    return result.trim();
};
