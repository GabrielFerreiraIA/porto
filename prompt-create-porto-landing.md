# Create HTML Design System + Landing Page — Porto Seguro Saúde Style

You are a **Landing Page & Design System Builder** specializing in health insurance lead capture.

---

## CONTEXT

Build a **lead capture landing page** for a health insurance brokerage (corretora de planos de saúde) that visually mirrors Porto Seguro Saúde's identity. The page should rank for search queries like "Porto Seguro Saúde cotação", "plano de saúde empresarial Porto Seguro", and similar, converting visitors into leads via a quote request form.

Reference visual identity: **Porto Seguro Saúde** (portoseguro.com.br/porto-seguro-saude)

---

## IDENTITY — DESIGN TOKENS (USE EXACTLY AS DEFINED)

```css
:root {
  /* Brand Colors */
  --color-primary:        #0046c0;
  --color-primary-dark:   #002a7a;
  --color-primary-hover:  #003399;
  --color-accent-light:   #e6f0ff;
  --color-gradient:       linear-gradient(135deg, #0046c0 0%, #002a7a 100%);

  /* Neutrals */
  --color-text:           #1a1a1a;
  --color-text-muted:     #666666;
  --color-bg:             #ffffff;
  --color-bg-section:     #f7f9fc;
  --color-border:         #e0e0e0;
  --color-overlay:        rgba(0, 0, 0, 0.6);

  /* Shadows */
  --shadow-sm:            rgba(0, 0, 0, 0.08);
  --shadow-md:            rgba(0, 0, 0, 0.12);
  --shadow-hover:         rgba(0, 0, 0, 0.18);

  /* Typography */
  --font-primary: 'Raleway', 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-weight-regular:   400;
  --font-weight-medium:    500;
  --font-weight-semibold:  600;
  --font-weight-bold:      700;

  /* Spacing Scale */
  --space-xs:   4px;
  --space-sm:   8px;
  --space-md:   16px;
  --space-lg:   24px;
  --space-xl:   48px;
  --space-2xl:  80px;

  /* Borders */
  --radius-sm:  4px;
  --radius-md:  8px;
  --radius-lg:  12px;
  --radius-xl:  20px;
  --radius-full: 9999px;

  /* Transitions */
  --transition-fast:   0.15s ease;
  --transition-base:   0.2s ease;
  --transition-slow:   0.3s ease;
}
```

---

## GOAL

Generate **one single file** called `index.html` placed in a folder `porto-landing/`.

This file is simultaneously:
1. A **living design system** — each section documents a layer of the visual identity
2. A **fully functional landing page** — the Hero section is the real page visitors see first

The file must be:
- Completely self-contained (no external build tools)
- Load Raleway from Google Fonts CDN
- Load Font Awesome 6 Free from CDN (icons)
- All CSS written in a `<style>` block inside `<head>`
- All JS written in a `<script>` block before `</body>`
- Mobile-first responsive (breakpoints at 520px and 900px)

---

## HARD RULES (NON-NEGOTIABLE)

1. **Create from scratch** — do not copy or reference any external HTML source
2. **Use only the design tokens defined above** — no arbitrary color or spacing values
3. **Font**: Raleway from Google Fonts (closest substitute for Porto Roobert)
4. **All 7 sections (0–6) must be present and complete**
5. **Include a sticky top navigation bar** with anchor links to each section
6. **The Hero (Section 0) must be the actual landing page hero** — not a demo section
7. **Lead capture form must use HTML5 validation** — required, pattern, type attributes
8. **No frameworks** (no Bootstrap, Tailwind, Vue, React) — vanilla HTML/CSS/JS only
9. **Animate responsibly** — respect `prefers-reduced-motion`
10. **All text in Brazilian Portuguese (pt-BR)**

---

## STRUCTURE — STICKY TOP NAV

Before Section 0, render a sticky `<nav>` bar containing:
- Logo left: "Porto Saúde +" (or similar brokerage name) in `--color-primary` bold
- Anchor links right: `#hero`, `#typography`, `#colors`, `#components`, `#layout`, `#motion`, `#icons`
- On mobile: collapse to hamburger (toggle with JS)
- Background: white with `box-shadow: 0 2px 8px var(--shadow-sm)`
- Height: 64px desktop / 56px mobile

---

## SECTION 0 — HERO (The Real Landing Page)

This is the page visitors land on. It must be production-ready, not a demo.

**Layout (desktop):** Two-column flex row. Left: text + CTA. Right: illustration/image placeholder.
**Layout (mobile):** Single column, image below text.

**Left column must include:**
- Trust badge pill at the top: `✓ Mais de 10 mil empresas atendidas` — white pill, subtle border, small text
- `<h1>`: "Plano de Saúde Empresarial Porto Seguro: Cotação Rápida e Gratuita"
  - Font: 48px/56px Bold on desktop; 32px/40px on mobile
  - Color: white
- `<p>` subtitle: "Compare coberturas, preços e benefícios. Receba propostas de Porto Seguro Saúde em até 24 horas, sem compromisso."
  - Font: 18px/28px Regular; Color: rgba(255,255,255,0.88)
- Benefit list (3 items, checkmark icon, white): "Rede credenciada nacional", "Atendimento 24h de urgência e emergência", "Gestão de saúde para colaboradores"
- **CTA Primary button**: "Solicitar Cotação Grátis →" — white background, `--color-primary` text, bold, 16px, 52px height, border-radius var(--radius-lg), hover: slight scale + shadow
- **CTA Secondary button**: "Ver Planos" — outline white border, white text, same height, hover: white bg + primary text

**Right column:**
- A styled placeholder box (aspect-ratio 4/3, border-radius var(--radius-xl))
- Background: rgba(255,255,255,0.1) with border rgba(255,255,255,0.2)
- Centered icon: large `fa-heartbeat` (Font Awesome) in white at 80px
- Caption below: "Ilustração do produto" in small white muted text
- On desktop: max-width 480px

**Section background:** `var(--color-gradient)` (diagonal blue)
**Section padding:** 120px top (accounting for nav) / 80px bottom on desktop; 100px/64px mobile
**Anchor id:** `hero`

---

## SECTION 1 — TYPOGRAPHY

**Section title:** "1. Typography"
**Background:** `--color-bg-section`

Render as a **vertical spec table**. Each row contains 3 columns:
1. **Style name** — e.g. "Heading 1" (12px uppercase label, muted color)
2. **Live preview** — the actual HTML element with real classes, real content
3. **Spec label** — right-aligned `font-size / line-height · weight` (12px monospace, muted)

Include these styles **in this exact order**, using real elements (not styled `<div>`):

| Style Name | Element | Font Size / Line Height | Weight |
|---|---|---|---|
| Heading 1 | `<h1>` | 48px / 56px | 700 |
| Heading 2 | `<h2>` | 36px / 44px | 600 |
| Heading 3 | `<h3>` | 28px / 36px | 600 |
| Heading 4 | `<h4>` | 22px / 30px | 500 |
| Body Large | `<p class="body-lg">` | 18px / 28px | 400 |
| Body Medium | `<p class="body-md">` | 16px / 24px | 400 |
| Body Small | `<p class="body-sm">` | 14px / 20px | 400 |
| Label / Caption | `<span class="label">` | 12px / 16px | 700 uppercase |

Rules:
- No inline styles — use CSS classes only
- The H1 and H2 previews must show a **gradient text effect** using `-webkit-background-clip: text` with `--color-gradient`
- Every preview must have sample text relevant to health insurance (e.g. "Plano de Saúde para sua Empresa", "Ampla rede credenciada em todo o Brasil")
- Each row separated by a subtle bottom border (`--color-border`)

**Anchor id:** `typography`

---

## SECTION 2 — COLORS & SURFACES

**Section title:** "2. Colors & Surfaces"
**Background:** `--color-bg`

Divide into 3 sub-groups:

### 2a. Brand Palette
Render a horizontal flex row of color swatches. Each swatch:
- Box: 80px × 80px (desktop) / 64px × 64px (mobile), border-radius var(--radius-md)
- Color hex label below, bold 14px
- Color name below hex, 12px muted
- Include: Primary Blue `#0046c0`, Primary Dark `#002a7a`, Primary Hover `#003399`, Accent Light `#e6f0ff`

### 2b. Neutral Palette
Same swatch format:
- Text `#1a1a1a`, Text Muted `#666666`, Background `#ffffff`, Section BG `#f7f9fc`, Border `#e0e0e0`
- For white swatch: add 1px border using `--color-border`

### 2c. Surfaces & Gradients
Show 3 sample surface cards side by side (each 240px wide, 120px tall):
1. **Page Surface** — white with subtle shadow
2. **Card Surface** — white with `border: 1px solid --color-border` and border-radius lg
3. **Gradient Surface** — `var(--color-gradient)` background, white label text
- Below each: name label + usage description (e.g. "Usado em hero sections e CTAs de destaque")

**Anchor id:** `colors`

---

## SECTION 3 — UI COMPONENTS

**Section title:** "3. UI Components"
**Background:** `--color-bg-section`

### 3a. Buttons
Show all 4 button variants **side by side** in a flex row (wrap on mobile):
1. **Primary** — `background: --color-primary`, white text, hover: `--color-primary-hover` + scale(1.02)
2. **Secondary** — `border: 2px solid --color-primary`, `--color-primary` text, transparent bg, hover: `--color-accent-light` bg
3. **Ghost** — no border, `--color-primary` text, hover: `--color-accent-light` bg
4. **Disabled** — Primary style but `opacity: 0.4`, `cursor: not-allowed`

Button specs: `height: 48px`, `padding: 0 24px`, `border-radius: var(--radius-lg)`, `font-weight: 600`, `font-size: 15px`

Under each button, a small label: "Primary", "Secondary", etc. in 12px muted uppercase

### 3b. Form Inputs
Show 3 input states side by side:
1. **Default** — border `--color-border`, placeholder text visible
2. **Focus** — border `--color-primary`, `box-shadow: 0 0 0 3px var(--color-accent-light)`
3. **Error** — border `#dc2626`, error message below in red 12px

Input specs: `height: 48px`, `border-radius: var(--radius-md)`, `padding: 0 16px`, `font-size: 15px`, full-width label above

### 3c. Lead Capture Form (Production-Ready)
A complete, styled quote request form inside a white card (max-width 560px, centered):
- Card: white bg, border-radius var(--radius-xl), box-shadow medium, padding 40px desktop / 24px mobile
- Form title: "Solicite sua Cotação Grátis" — H3 style
- Subtitle: "Preencha o formulário e receba propostas em até 24 horas"
- Fields (2-column grid on desktop, 1-column mobile):
  - Nome completo (required, text)
  - Empresa / Razão Social (required, text)
  - CNPJ (pattern: `\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}`, placeholder: "00.000.000/0000-00")
  - Email corporativo (required, email)
  - Telefone / WhatsApp (required, tel, placeholder: "(00) 00000-0000")
  - Nº de funcionários (required, select: 1-9, 10-49, 50-99, 100-499, 500+)
- Submit button: full-width Primary style, text "Solicitar Cotação Grátis →"
- Below submit: "🔒 Seus dados estão seguros. Não enviamos spam." in 12px muted centered
- On submit: prevent default, show a success message replacing the form fields ("✓ Recebemos sua solicitação! Entraremos em contato em até 24 horas.")

### 3d. Plan Cards
Show 3 plan cards in a grid (3 col desktop / 1 col mobile). Each card:
- White bg, border-radius var(--radius-lg), border `--color-border`, padding 24px
- Top: category badge (e.g. "Essencial", "Mais Popular", "Completo")
  - "Mais Popular" card: `background: --color-primary`, white text, and card gets a `border: 2px solid --color-primary`
- Plan name: H3 style
- Price area: "A partir de" label (12px muted) + price placeholder "Consulte" (24px bold primary)
- Benefit list: 4 items with `fa-check` icon in primary color
- CTA: full-width Secondary button "Ver Detalhes →"
- Hover: `transform: translateY(-4px)` + shadow increase

### 3e. Horizontal Feature Card
Show 3 horizontal feature cards stacked:
- Layout: flex row, icon left (48px×48px circle `--color-accent-light` bg, `--color-primary` icon) + content right
- Content: title (16px bold) + description (14px muted, max 2 lines)
- Border-radius var(--radius-lg), border `--color-border`, padding 16px, hover shadow

### 3f. Badges / Tags
Show a flex row of pill badges:
- Default: white bg, `--color-border` border, `#404040` text, height 28px, padding 0 12px, border-radius var(--radius-full), 12px bold uppercase
- Primary: `--color-accent-light` bg, `--color-primary` text/border
- Success: `#dcfce7` bg, `#15803d` text/border

**Anchor id:** `components`

---

## SECTION 4 — LAYOUT & SPACING

**Section title:** "4. Layout & Spacing"
**Background:** `--color-bg`

### 4a. Container & Grid System
Show a visual diagram using colored boxes:
- Container: max-width 1200px, padding 0 24px, centered
- Grid variants labeled: "3 colunas (desktop > 900px)", "2 colunas (tablet 520–900px)", "1 coluna (mobile < 520px)"
- Gap: 24px between columns, visualized
- Use `--color-accent-light` bg with `--color-primary` border for the column placeholders

### 4b. Spacing Scale
A horizontal visual scale showing each spacing token:
- A rectangle of the exact height/width + label below: "xs 4px", "sm 8px", "md 16px", "lg 24px", "xl 48px", "2xl 80px"
- Background: `--color-primary` bars on `--color-accent-light` base

### 4c. Real Layout Patterns
Show 3 real layout patterns as working mini-mockups (not diagrams):

**Pattern 1 — Hero Split:**
- Left: headline + CTA | Right: image placeholder
- Blue gradient background, white text, same proportions as Section 0 but condensed

**Pattern 2 — Cards Grid:**
- 3-column grid of simplified plan cards
- Show the responsive collapse with a label "(colapsa para 1 coluna no mobile)"

**Pattern 3 — Section with Split Content:**
- Left: large stat numbers (e.g. "+10.000 empresas", "98% satisfação") | Right: text + secondary CTA
- White background section

**Anchor id:** `layout`

---

## SECTION 5 — MOTION & INTERACTION

**Section title:** "5. Motion & Interaction"
**Background:** `--color-bg-section`

### 5a. Animation Gallery
Show each motion behavior as a **live interactive demo** labeled with its name and CSS details:

1. **Fade In on Scroll** — a card that starts `opacity: 0; transform: translateY(20px)` and transitions to visible when entering viewport (Intersection Observer). Label: `opacity + translateY · 0.4s ease-out`

2. **Card Hover Lift** — a sample card. On hover: `transform: translateY(-4px)` + shadow increase. Label: `translateY(-4px) · 0.2s ease`

3. **Button Scale** — Primary button. On hover: `transform: scale(1.02)` + darker background. Label: `scale(1.02) · 0.15s ease`

4. **Arrow CTA Animate** — an anchor link with arrow icon. On hover: arrow moves `translateX(4px)`. Label: `translateX(4px) · 0.2s ease`

5. **Input Focus Ring** — an input field. On focus: `box-shadow: 0 0 0 3px var(--color-accent-light)` + border color change. Label: `box-shadow focus · 0.15s ease`

6. **Skeleton Shimmer** — a loading placeholder card with shimmer animation:
```css
@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```
Animation: 1.2s ease-in-out infinite; gradient: 90deg, `--color-bg-section` → white → `--color-bg-section`

### 5b. Reduced Motion Note
Display a notice box: "Todas as animações respeitam `prefers-reduced-motion: reduce`. Quando ativado, as transições são removidas para garantir acessibilidade."

**Anchor id:** `motion`

---

## SECTION 6 — ICONS

**Section title:** "6. Icons"
**Background:** `--color-bg`

Use **Font Awesome 6 Free** loaded via CDN:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
```

### 6a. Health & Insurance Icons
Show icons grouped in a grid (4 cols desktop / 2 cols mobile):
- Each cell: icon centered + name label below (12px muted)
- Icons to include: `fa-heart-pulse`, `fa-hospital`, `fa-user-doctor`, `fa-shield-halved`, `fa-tooth`, `fa-truck-medical`, `fa-stethoscope`, `fa-pills`, `fa-baby`, `fa-eye`, `fa-bone`, `fa-syringe`

### 6b. UI Icons
Same grid format:
- `fa-check`, `fa-arrow-right`, `fa-phone`, `fa-envelope`, `fa-building`, `fa-location-dot`, `fa-clock`, `fa-star`, `fa-lock`, `fa-circle-info`, `fa-xmark`, `fa-bars`

### 6c. Size Variants
Show 3 size demos for `fa-heart-pulse`:
- Small 16px: `font-size: 16px`
- Medium 24px: `font-size: 24px`
- Large 32px: `font-size: 32px`
- Each in a circle container `--color-accent-light` bg with `--color-primary` icon color

### 6d. Color Inheritance Demo
Show the same icon (`fa-shield-halved`) on 3 backgrounds to demonstrate color inheritance:
1. White bg → `--color-primary` icon
2. `--color-primary` bg → white icon
3. `--color-accent-light` bg → `--color-primary` icon

**Anchor id:** `icons`

---

## FOOTER

After Section 6, add a simple footer:
- Background: `#1a1a1a`
- Two-column layout (desktop): Left: logo + tagline + CNPJ placeholder | Right: links (Política de Privacidade, Sobre Nós, Contato)
- Below: full-width divider + copyright "© 2024 · Corretora de Planos de Saúde · SUSEP XXX.XXX"
- Font color: white for headings, `rgba(255,255,255,0.65)` for body text

---

## JAVASCRIPT REQUIREMENTS

Include only vanilla JS for:
1. **Intersection Observer** — add class `.visible` to elements with `.fade-in` when they enter viewport
2. **Mobile nav toggle** — hamburger opens/closes the nav links
3. **Form submit handler** — prevent default, validate, show success message
4. **Smooth scroll** — `scroll-behavior: smooth` via CSS is preferred; JS fallback for Safari

---

## OUTPUT EXPECTED

```
porto-landing/
└── index.html   ← single self-contained file, ~600-900 lines
```

The file must:
- Pass HTML5 validation (no inline `style=""` attributes, semantic elements)
- Render correctly in Chrome, Firefox, Safari (latest)
- Be fully functional without a server (open as file://)
- Have all 7 sections visible and styled correctly
- Show the lead capture form in the Hero prominently above the fold on desktop

---

## QUALITY CHECKLIST (verify before outputting)

- [ ] Sticky nav with all 6 anchor links present
- [ ] Hero gradient from `#0046c0` to `#002a7a`
- [ ] CTA "Solicitar Cotação Grátis" visible above fold
- [ ] Form has 6 fields + submit + validation
- [ ] Typography table has all 8 type styles
- [ ] Color swatches show all brand + neutral + gradient colors
- [ ] All 4 button variants shown side-by-side
- [ ] 3 plan cards with hover effect
- [ ] Skeleton shimmer animation present
- [ ] All Font Awesome icons rendering
- [ ] Responsive at 375px, 768px, 1280px
- [ ] `prefers-reduced-motion` media query present
