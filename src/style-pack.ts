/**
 * Canonical StylePack for this starter — schema-compatible with Lovable's
 * `defaultStylePacks.ts` (full color token bundle + heading/body font pair).
 *
 * v1 ships ONE pack ("Mint"), matching what's currently encoded in
 * `src/index.css` and loaded via `index.html`. The actual runtime values
 * live in those two files; this object is the typed canonical reference for:
 *
 *   - documentation (what tokens / fonts a StylePack carries)
 *   - future pack authoring (copy this shape, swap values, drop in index.css
 *     + index.html, done)
 *   - downstream consumers (Lovable platform, codegen, designer tooling)
 *
 * To swap the pack for a future template:
 *   1. Replace this file's exported `stylePack` content
 *   2. Mirror `colorTokens` into `:root` (and `.dark` if dark-mode applies)
 *      in `src/index.css`
 *   3. Update font `<link>` URLs + `--font-heading` / `--font-body` in
 *      `src/index.css` to match `font.heading.family` / `font.body.family`
 */
export type StylePack = {
  label: string;
  /** A representative hex for the pack — used as a swatch preview chip. */
  previewColor: string;
  /** 4-color preview row for the pack (used by pack-pickers in tooling). */
  colors: [string, string, string, string];
  /** Full shadcn-compatible token set. Values are complete color strings
   *  (oklch(...), hsl(...), or hex). Mapped to --color-* CSS variables
   *  via Lovable's buildStylesheet convention. */
  colorTokens: {
    primary: string;
    primaryForeground: string;
    background: string;
    foreground: string;
    secondary: string;
    secondaryForeground: string;
    accent: string;
    accentForeground: string;
    muted: string;
    mutedForeground: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    destructive: string;
    destructiveForeground: string;
    border: string;
    input: string;
    ring: string;
    sidebar?: string;
    sidebarForeground?: string;
    sidebarPrimary?: string;
    sidebarPrimaryForeground?: string;
    sidebarAccent?: string;
    sidebarAccentForeground?: string;
    sidebarBorder?: string;
    sidebarRing?: string;
  };
  /** Heading + body fonts. Loaded via index.html `<link>` tag. */
  font: {
    heading: { family: string; url: string };
    body: { family: string; url: string };
  };
};

const figtreeUrl =
  "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&display=swap";

/**
 * The Mint StylePack — starter default.
 *
 * Warm stone neutrals + mint primary (#81DE90). Both heading and body use
 * Figtree (single-family pack). Future packs can pair distinct families
 * (e.g. heading "Playfair Display" + body "Inter") with no other code
 * changes — just swap this object + mirror to index.css/index.html.
 */
export const stylePack: StylePack = {
  label: "Mint",
  previewColor: "#81DE90",
  colors: ["#81DE90", "#F5F5EF", "#F0EFEA", "#1A1714"],
  colorTokens: {
    primary: "oklch(82.34% 0.1385 148.16)",
    primaryForeground: "oklch(26.20% 0.0487 147.82)",
    background: "oklch(98.59% 0.0012 106.42)",
    foreground: "oklch(21.61% 0.0062 56.04)",
    secondary: "oklch(97.08% 0.0014 106.42)",
    secondaryForeground: "oklch(27.04% 0.0089 55.98)",
    accent: "oklch(97.08% 0.0014 106.42)",
    accentForeground: "oklch(27.04% 0.0089 55.98)",
    muted: "oklch(97.08% 0.0014 106.42)",
    mutedForeground: "oklch(55.59% 0.0111 58.09)",
    card: "oklch(100.00% 0.0000 89.88)",
    cardForeground: "oklch(21.61% 0.0062 56.04)",
    popover: "oklch(100.00% 0.0000 89.88)",
    popoverForeground: "oklch(21.61% 0.0062 56.04)",
    destructive: "oklch(57.86% 0.2137 27.17)",
    destructiveForeground: "oklch(100.00% 0.0000 89.88)",
    border: "oklch(92.42% 0.0027 67.79)",
    input: "oklch(92.42% 0.0027 67.79)",
    ring: "oklch(82.34% 0.1385 148.16)",
  },
  font: {
    heading: { family: "Figtree", url: figtreeUrl },
    body: { family: "Figtree", url: figtreeUrl },
  },
};

export default stylePack;
