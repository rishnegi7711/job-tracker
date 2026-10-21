---
name: Applyd
description: Warm paper for a job search. Quiet, serif-headed, light by default with a warm (never black) dark mode.
colors:
  paper: "#f9f8f6"
  board: "#f6f3ee"
  surface: "#ffffff"
  ink: "#37352f"
  ink-muted: "#65625c"
  ink-subtle: "#6b675f"
  placeholder: "#77736b"
  line: "#ece8e0"
  field-border: "#8e8a81"
  link-underline: "#d3cfc6"
  action: "#37352f"
  action-hover: "#2b2a26"
  on-action: "#ffffff"
  accent-focus: "#2383e2"
  focus-ring: "rgba(35, 131, 226, 0.18)"
  danger: "#c53030"
  success: "#2f7d6e"
  card-shadow: "rgba(55, 53, 47, 0.08)"
  status-applied: "#625950"
  status-applied-tint: "#f0ece8"
  status-interviewing: "#735426"
  status-interviewing-tint: "#f8ebda"
  status-rejected: "#7e4b45"
  status-rejected-tint: "#fde7e4"
  status-offer: "#496343"
  status-offer-tint: "#e6f1e3"
  outcome-pending: "#625950"
  outcome-pending-tint: "#f0ece8"
  outcome-passed: "#496343"
  outcome-passed-tint: "#e6f1e3"
  outcome-failed: "#7e4b45"
  outcome-failed-tint: "#fde7e4"
  paper-dark: "#1c1b19"
  board-dark: "#242320"
  surface-dark: "#2d2b27"
  ink-dark: "#ece9e3"
  ink-muted-dark: "#a8a39a"
  ink-subtle-dark: "#9a958c"
  placeholder-dark: "#a09b92"
  line-dark: "#3a3733"
  field-border-dark: "#807b72"
  link-underline-dark: "#4a4640"
  action-dark: "#ece9e3"
  action-hover-dark: "#f7f5f0"
  on-action-dark: "#1c1b19"
  accent-focus-dark: "#5aa5ee"
  focus-ring-dark: "rgba(90, 165, 238, 0.28)"
  danger-dark: "#f28b82"
  success-dark: "#5cc0ad"
  card-shadow-dark: "rgba(0, 0, 0, 0.4)"
  status-applied-dark: "#c4bcb3"
  status-applied-tint-dark: "#35322f"
  status-interviewing-dark: "#d6b890"
  status-interviewing-tint-dark: "#3c3122"
  status-rejected-dark: "#e2b0a9"
  status-rejected-tint-dark: "#402e2b"
  status-offer-dark: "#adc6a7"
  status-offer-tint-dark: "#2c362a"
  outcome-pending-dark: "#c4bcb3"
  outcome-pending-tint-dark: "#35322f"
  outcome-passed-dark: "#adc6a7"
  outcome-passed-tint-dark: "#2c362a"
  outcome-failed-dark: "#e2b0a9"
  outcome-failed-tint-dark: "#402e2b"
typography:
  display:
    fontFamily: "ui-serif, 'New York', Georgia, serif"
    fontSize: "30px"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  body:
    fontFamily: "'Geist Variable', system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  button:
    fontFamily: "'Geist Variable', system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.5
  label:
    fontFamily: "'Geist Variable', system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.43
  caption:
    fontFamily: "'Geist Variable', system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.33
  overline:
    fontFamily: "'Geist Variable', system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "0.025em"
rounded:
  md: "6.4px"
  lg: "8px"
  xl: "11.2px"
spacing:
  label-gap: "6px"
  field-gap: "16px"
  section-gap: "28px"
  control-height: "40px"
  column: "360px"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.on-action}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
    height: "{spacing.control-height}"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
  button-primary-dark:
    backgroundColor: "{colors.action-dark}"
    textColor: "{colors.on-action-dark}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
    height: "{spacing.control-height}"
  button-primary-dark-hover:
    backgroundColor: "{colors.action-hover-dark}"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    height: "{spacing.control-height}"
    padding: "0 12px"
  field-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.ink-dark}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    height: "{spacing.control-height}"
    padding: "0 12px"
  board:
    backgroundColor: "{colors.board}"
    rounded: "{rounded.xl}"
  board-dark:
    backgroundColor: "{colors.board-dark}"
    rounded: "{rounded.xl}"
  board-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.caption}"
    rounded: "{rounded.md}"
    padding: "6px 8px"
  board-card-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.ink-dark}"
    typography: "{typography.caption}"
    rounded: "{rounded.md}"
    padding: "6px 8px"
---

# Design System: Applyd

Extracted from `client/src/pages/prototype/LoginVariantA.tsx` ("Paper"), the chosen direction. Light is the default theme. Dark is a designed counterpart, not an inversion. Every colour below exists as a token in both themes (`-dark` suffix for dark), and each token is used once with one role.

**Scope.** This system was extracted from one screen, the login page. It is complete for that screen only. Each new surface (Board, Detail, dialogs, badges, TopBar) must extend this file when it is redesigned: add its components here, reusing these tokens and adding new tokens only in light/dark pairs. Components already in the app but not yet designed are listed under Components, "To be designed".

## Overview

**Creative North Star: "The Working Paper"**

Applyd looks like a good sheet of warm paper on a desk: a job search kept in a notebook you trust. The ground is warm off-white, the type is dark warm grey rather than black, and structure comes from hairlines and a single soft shadow instead of boxes and fills. A serif heading gives the one human moment; everything else is quiet Geist.

The product is a record of a person's search, so the interface stays calm while the data does the talking. Motion is limited to things that go where they belong: cards settle into their columns, and a successful sign-in moves a card to Offer. Nothing loops and nothing decorates.

**Key Characteristics:**
- Warm neutrals, plus four muted warm hues reserved for status. Pure white appears solely on fields and cards that sit on the paper; pure black appears nowhere.
- One serif voice (the page heading), one sans for everything else.
- Flat at rest. Depth is a hairline in light mode and a lighter surface in dark mode.
- One accent, blue, used only to show focus.
- Motion has a meaning (placement), and ends in a static state under `prefers-reduced-motion`.

## Colors

A warm paper palette with a single cool accent. Ratios are measured on the ground each token actually sits on.

### Neutral (grounds and surfaces)
- **Paper** (`paper` #f9f8f6 / `paper-dark` #1c1b19): the page ground. Warm off-white in light; deep warm charcoal in dark, deliberately not pure black.
- **Board** (`board` #f6f3ee / `board-dark` #242320): a tinted inset that groups cards, one step off the ground.
- **Surface** (`surface` #ffffff / `surface-dark` #2d2b27): fields and cards. The lightest thing in light mode and the lifted thing in dark mode.

### Neutral (text)
- **Ink** (`ink` #37352f / `ink-dark` #ece9e3): headings, body, field text. 11.6:1 on paper in light, 14.2:1 on paper in dark.
- **Ink muted** (`ink-muted` #65625c / `ink-muted-dark` #a8a39a): subtitles and secondary copy. 5.7:1 / 6.9:1.
- **Ink subtle** (`ink-subtle` #6b675f / `ink-subtle-dark` #9a958c): column headings and overlines on the board. 5.1:1 on board / 5.3:1 on board-dark.
- **Placeholder** (`placeholder` #77736b / `placeholder-dark` #a09b92): hint text inside fields. 4.7:1 on surface / 5.1:1 on surface-dark.

### Neutral (lines)
- **Line** (`line` #ece8e0 / `line-dark` #3a3733): decorative hairlines around the board and its cards. Never the only signal for an interactive edge.
- **Field border** (`field-border` #8e8a81 / `field-border-dark` #807b72): the edge of every input. 3.4:1 on surface / 3.4:1 on surface-dark, above the 3:1 minimum for UI boundaries.
- **Link underline** (`link-underline` #d3cfc6 / `link-underline-dark` #4a4640): resting underline on inline links. Decorative, because the link text itself carries the contrast. It darkens to ink on hover.

### Action
- **Action** (`action` #37352f / `action-dark` #ece9e3), with **Action hover** (`action-hover` #2b2a26 / `action-hover-dark` #f7f5f0) and **On action** (`on-action` #ffffff / `on-action-dark` #1c1b19): the one primary button per screen. It is ink on paper in light and paper on ink in dark. Text on it is 12.3:1 / 14.2:1.

### Accent and status
- **Focus blue** (`accent-focus` #2383e2 / `accent-focus-dark` #5aa5ee) and **Focus ring** (`focus-ring` rgba(35, 131, 226, 0.18) / `focus-ring-dark` rgba(90, 165, 238, 0.28)): the focused field's border and its 3px halo. 3.9:1 on surface / 5.4:1 on surface-dark.
- **Danger** (`danger` #c53030 / `danger-dark` #f28b82): field errors and the failed-sign-in message. 5.2:1 on paper / 7.2:1 on paper-dark.
- **Success** (`success` #2f7d6e / `success-dark` #5cc0ad): the border of a card that reached Offer. 4.9:1 on surface / 6.5:1 on surface-dark. It always comes with a position change, so it never carries meaning alone.
- **Card shadow** (`card-shadow` rgba(55, 53, 47, 0.08) / `card-shadow-dark` rgba(0, 0, 0, 0.4)): the single resting shadow, under board cards.

### Status and outcome
Muted, warm hues for application status and interview-round outcome. Each is a text colour (`status-*`, `outcome-*`) on a pale tint (`*-tint`), in both themes. The text colour reads at ≥4.5:1 on its tint and on every ground (paper, surface, board), so it also works without the tint.

| Meaning | Hue | Light text / tint | Dark text / tint |
|---|---|---|---|
| Applied (`status-applied`) | stone | #625950 / #f0ece8 | #c4bcb3 / #35322f |
| Interviewing (`status-interviewing`) | ochre | #735426 / #f8ebda | #d6b890 / #3c3122 |
| Rejected (`status-rejected`) | rosewood | #7e4b45 / #fde7e4 | #e2b0a9 / #402e2b |
| Offer (`status-offer`) | sage | #496343 / #e6f1e3 | #adc6a7 / #2c362a |
| Pending (`outcome-pending`) | stone | same values as Applied | same values as Applied |
| Passed (`outcome-passed`) | sage | same values as Offer | same values as Offer |
| Failed (`outcome-failed`) | rosewood | same values as Rejected | same values as Rejected |

Outcomes share values with statuses on purpose: waiting, good and bad read the same on the board and in a round's history. They stay separate tokens so either set can move without the other.

### Named Rules
**The Warm Ground Rule.** No pure black or pure white as a page ground. Light paper is #f9f8f6 and dark paper is #1c1b19. Pure white is for fields and cards only.

**The One Blue Rule.** Blue means "you are here" (focus). It never fills a button, colours a link, or marks status.

**The Muted Status Rule.** Status is a quiet tint with dark text, never a saturated fill. Status hues are warm (stone, ochre, rosewood, sage), and none is blue. The status word is always shown, so colour never carries meaning alone. Rosewood (rejected) is not `danger`: a rejection is an outcome, not an error.

**The Contrast Floor Rule.** Every text token is at least 4.5:1 on the ground it sits on, and every input edge is at least 3:1. Decorative hairlines (`line`, `link-underline`) may fall below that, and must never be the only cue for something interactive.

**The Paired Token Rule.** Colours are only ever used through tokens, and each token has a light and a dark value. A hex literal in a component is a bug.

### shadcn mapping
How the Paper tokens fill the shadcn variables in `client/src/index.css`. Today that file has one dark `:root` and no `.dark`. Adopting Paper means `:root` becomes the light column and a `.dark` block holds the dark column.

| Variable | `:root` (light) | `.dark` |
|---|---|---|
| `color-scheme` | `light` | `dark` |
| `--background` | `paper` | `paper-dark` |
| `--foreground` | `ink` | `ink-dark` |
| `--card` | `surface` | `surface-dark` |
| `--card-foreground` | `ink` | `ink-dark` |
| `--popover` | `surface` | `surface-dark` |
| `--popover-foreground` | `ink` | `ink-dark` |
| `--primary` | `action` | `action-dark` |
| `--primary-foreground` | `on-action` | `on-action-dark` |
| `--secondary` | `board` (provisional) | `board-dark` (provisional) |
| `--secondary-foreground` | `ink` | `ink-dark` |
| `--muted` | `board` | `board-dark` |
| `--muted-foreground` | `ink-muted` | `ink-muted-dark` |
| `--accent` | `board` | `board-dark` |
| `--accent-foreground` | `ink` | `ink-dark` |
| `--destructive` | `danger` | `danger-dark` |
| `--border` | `line` | `line-dark` |
| `--input` | `field-border` | `field-border-dark` |
| `--ring` | `accent-focus` | `accent-focus-dark` |
| `--radius` | `0.5rem` | `0.5rem` |

Notes:
- `--accent` is shadcn's hover and highlight surface (menu items, ghost hover), so it maps to `board`, not blue. The incumbent indigo accent goes away under The One Blue Rule.
- `--secondary` stays provisional until the secondary button is designed. `board` on `paper` has almost no edge.
- `--sidebar-*` and `--chart-*` are defined but unused, so they are not mapped.
- Known gaps for the redesign, not fixed here:
  - shadcn fields are `bg-transparent` (paper shows through, not `surface`) and use `dark:bg-input/30`, which tints dark fields with `field-border-dark` instead of `surface-dark`.
  - The focus halo is `ring-ring/50` where Paper's `focus-ring` is 18% / 28%.
  - The destructive button's `bg-destructive/10` tint puts `danger` text at 4.44:1, under the Contrast Floor. Use a lighter tint or a solid fill when it is designed.
  - No dark variant is wired up yet: there is no `.dark` block or `@custom-variant dark`, so `dark:` follows the OS setting.

## Typography

**Display Font:** the system serif stack, `ui-serif, 'New York', Georgia, serif`
**Body Font:** Geist Variable (with `system-ui, sans-serif` fallback), already installed as `@fontsource-variable/geist`

**Character:** a bookish heading over a clean, neutral sans. The serif is the only place the page raises its voice; the sans keeps forms and data plain.

### Hierarchy
- **Display** (600, 30px, 1.1, -0.025em): the screen title ("Welcome back"). One per screen.
- **Body** (400, 15px, 1.5): field text, subtitles, and support copy.
- **Button** (500, 15px, 1.5): primary button text.
- **Label** (500, 14px, 1.43): field labels above inputs.
- **Caption** (400, 12px, 1.33): card names on the board and inline error messages.
- **Overline** (500, 11px, +0.025em, uppercase): board column headings only. 11px is the floor; nothing is smaller.

### Named Rules
**The One Serif Rule.** Serif is for the single screen title. Labels, buttons, data, and card text never use it.

**The 11px Floor Rule.** No text under 11px, including decorative labels.

## Layout

A single centred column, `360px` wide, vertically centred in the viewport with 80px of padding above and below and a 16px side gutter. There is no grid and no second column on this screen. This layout is the same at every width, so mobile needs no separate treatment.

Rhythm inside the column: label to field `6px`, field to field `16px`, major blocks (header, board, form, footer link) `28px` apart, the logo mark to the heading `32px`. Controls are `40px` tall.

Applyd's main screens (Board, Detail) are desktop-first and denser than this login column. They should reuse the same tokens and rhythm and widen the container, not introduce a new layout vocabulary.

## Elevation & Depth

Flat by default. In light mode, structure is a 1px `line` hairline plus one soft shadow under board cards (`0 1px 2px` in `card-shadow`). In dark mode, depth comes from tone instead: `paper-dark` is the lowest layer, `board-dark` sits one step up, and `surface-dark` one step above that. Shadows in dark mode are close to invisible, so do not rely on them.

### Shadow Vocabulary
- **Card rest** (`box-shadow: 0 1px 2px {card-shadow}`): board cards only.
- **Focus halo** (`box-shadow: 0 0 0 3px {focus-ring}`): the focused field, together with the border changing to `accent-focus`.

### Named Rules
**The Lift-by-Lightness Rule.** In dark mode, raise a surface by making it lighter, never by adding a shadow.

**The Flat-By-Default Rule.** Nothing floats at rest. Shadows exist only on board cards and as the focus halo.

## Shapes

Soft but not round. Fields, buttons, and the logo mark use `lg` (8px); board cards use `md` (6.4px); the board container uses `xl` (11.2px). These come from the project's `--radius: 0.5rem` scale, so they stay in step with shadcn components. Edges are always 1px hairlines; there are no thick borders and no pills.

## Components

### Buttons
- **Shape:** 8px radius, 40px tall, full width of the column.
- **Primary:** `action` fill with `on-action` text, 15px/500. Dark mode swaps to `action-dark` with `on-action-dark`.
- **Hover:** fill moves to `action-hover` (`action-hover-dark`), 150ms.
- **Press:** scales to 0.98. **Disabled/pending:** 70% opacity, with a spinner in front of the label.
- **Success state:** a check icon in front of "Signed in".
- There is no secondary button yet. A secondary action is an inline link.

### Links
- Ink text with a 1px `link-underline` at 4px offset. Hover darkens the underline to `ink`. No colour change to blue (see The One Blue Rule).

### Inputs / Fields
- **Style:** `surface` fill, 1px `field-border`, 8px radius, 40px tall, 12px side padding, 15px text, `placeholder` hint.
- **Focus:** border to `accent-focus` plus a 3px `focus-ring` halo, with no outline jump. Transition on box-shadow.
- **Error:** message in `danger` at 12px directly under the field. The field edge stays `field-border`, and the text carries the error.
- **Label:** above the field, 14px/500, 6px gap.

### Mini board (signature component)
A tiny three-column board (Applied, Interview, Offer) that previews the product. Inset `board` fill, `line` hairline, 11.2px radius, `overline` column headings in `ink-subtle`, and cards in `surface` with a `line` border and `card-shadow`.
- **Load:** cards drop in from 16px above with a fade, staggered 90ms apart, over 600ms on `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- **Meaning:** on a successful sign-in, one card slides from Interview to Offer over 700ms on the same easing, and its border becomes `success`.
- **Reduced motion:** the board renders in its end state with no animation.

### Page entrance
Header and form rise 10px with a fade over 700ms on the same easing, the form delayed by 150ms. This runs once on load and never loops.

### To be designed
These exist in the app today but are not part of this system yet. Until each one is designed, it renders through the shadcn mapping above. Do not invent specs for them; design each one when its surface is redesigned, and record it here.
- **Secondary button**: Log out in the TopBar (`variant="secondary"`).
- **Destructive button**: Delete, on the board card and detail page (`variant="destructive"`). See the contrast gap in the shadcn notes.
- **Confirm dialog**: the delete confirmation, with an outline Cancel and a destructive confirm.
- **Select**: status, round type and outcome pickers.
- **Date input**: date applied and round date (native `type="date"`).
- **Status and outcome badges**: colours are defined (Status and outcome, above); shape and size are not.
- **TopBar, Board, Detail**: whole surfaces.

## Do's and Don'ts

### Do:
- **Do** use only tokens, in both themes. Look up the `-dark` twin whenever you add a colour.
- **Do** keep the dark ground warm: `paper-dark` #1c1b19, not #000000.
- **Do** keep one primary button per screen, and use ink-on-paper for it.
- **Do** keep text at 11px or larger and at 4.5:1 or better on its ground.
- **Do** make motion mean placement (a thing arriving where it belongs), and end in a static state when `prefers-reduced-motion` is set.
- **Do** build dark-mode depth from tone (paper-dark → board-dark → surface-dark).

### Don't:
- **Don't** use pure black or pure white as a page ground.
- **Don't** use blue for anything except focus.
- **Don't** use bright or saturated status colours, or blue for any status. Status uses only the `status-*` and `outcome-*` tokens on their tints, and always shows its word.
- **Don't** use a faint border on an input. `line` is for decoration; inputs use `field-border`.
- **Don't** put a card inside a card, or add shadows beyond the card rest and the focus halo.
- **Don't** invert the light theme to make dark. The dark palette is its own warm set.
- **Don't** hard-code a hex value in a component.
