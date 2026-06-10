# Typography

Two surfaces, two scales. The Geist type scale (defined in `index.css` `@theme inline`) is the shared foundation. This guide says which sizes to use where.

---

## Type scale (Geist)

Constant across all style packs and surfaces. Sizes `3xl`+ carry negative letter-spacing (heading territory). `xs`–`2xl` have none (body/label territory).

| Class | Size | Line-height | Letter-spacing |
|-------|------|-------------|----------------|
| `text-xs` | 12px | 16px | — |
| `text-sm` | 13px | 18px | — |
| `text-base` | 14px | 20px | — |
| `text-lg` | 16px | 24px | — |
| `text-xl` | 18px | 28px | — |
| `text-2xl` | 20px | 36px | — |
| `text-3xl` | 24px | 32px | -0.96px |
| `text-4xl` | 32px | 40px | -1.28px |
| `text-5xl` | 40px | 48px | -2.4px |
| `text-6xl` | 48px | 56px | -2.88px |
| `text-7xl` | 56px | 56px | -3.36px |
| `text-8xl` | 64px | 64px | -3.84px |
| `text-9xl` | 72px | 72px | -4.32px |

---

## Landing / marketing pages

Large, expressive type. Use `base/typography/` components — they apply `font-heading` (the StylePack's heading font) and appropriate tracking/leading.

| Element | Component | Resolves to |
|---------|-----------|-------------|
| Hero headline | `TypographyH1` | `text-4xl` → `lg:text-6xl`, bold, tracking-tighter |
| Section heading | `TypographyH2` | `text-3xl` → `lg:text-4xl`, semibold, tracking-tight |
| Card / feature heading | `TypographyH3` | `text-2xl`, semibold, tracking-tight |
| Sub-heading | `TypographyH4` | `text-xl`, semibold, tracking-tight |
| Body / descriptions | `text-base` → `lg:text-lg` | 14px → 16px, generous line-height |
| Fine print, labels | `text-sm` | 13px |

All typography components use `font-heading` to pick up the active StylePack's heading font. Body text inherits `font-sans` (→ `--font-body`) from the `<body>` element.

---

## App / workspace pages

Compact, information-dense type. Do NOT use `TypographyH1`–`TypographyH4` here — those are marketing components with large responsive sizing that doesn't fit dense UI.

Use plain elements with utility classes:

| Element | Class | Size |
|---------|-------|------|
| Page title | `text-3xl font-semibold tracking-tight` | 24px |
| Section / card title | `text-lg font-semibold` | 16px |
| Body text, nav, table cells, form fields | `text-sm` | 13px (default) |
| Metadata, timestamps, helper text | `text-sm text-muted-foreground` | 13px |
| Modal / full-width body | `text-base` | 14px |
| Small labels, badges | `text-xs` | 12px |

`text-sm` (13px) is the default for all app UI. Reach for `text-base` only in generous-space contexts (modals, full-width content areas).

---

## Font slots

Two CSS variables, swapped per style pack:

| Variable | Role | Default |
|----------|------|---------|
| `--font-heading` | Headings, display type | Figtree |
| `--font-body` | Body, UI text | Figtree |
| `--font-heading-weight` | Heading font weight | 600 |
| `--font-body-weight` | Body font weight | 400 |

- `font-heading` class → applies `--font-heading` family
- `font-sans` class → applies `--font-body` family (default on `<body>`)
- Weights are set on `h1`–`h6` and `body` in `style-pack.css`, overridable at runtime via TDP postMessage

---

## Rules

- `font-semibold` for headings, `font-medium` for labels/emphasis, `font-normal` for body
- `tabular-nums` on any column of numbers (prices, counts, percentages)
- `text-balance` on headings — distributes text evenly across lines
- `text-pretty` on paragraphs — prevents orphaned words on last line
- Never hardcode font-family — always use `font-heading` or `font-sans` so style packs work
