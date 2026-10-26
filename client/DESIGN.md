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
  chip-fill: "#ece8e0"
  empty-border: "#b9b2a5"
  fresh: "#f5ecda"
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
  scrim: "rgba(55, 53, 47, 0.4)"
  status-applied: "#625950"
  status-applied-tint: "#f0ece8"
  status-interviewing: "#735426"
  status-interviewing-tint: "#f8ebda"
  status-rejected: "#7e4b45"
  status-rejected-tint: "#fde7e4"
  status-offer: "#496343"
  status-offer-tint: "#e6f1e3"
  status-applied-dot: "#9a5b8c"
  status-interviewing-dot: "#b07a1f"
  status-rejected-dot: "#b5524a"
  status-offer-dot: "#4f8a45"
  outcome-pending-dot: "#9a5b8c"
  outcome-passed-dot: "#4f8a45"
  outcome-failed-dot: "#b5524a"
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
  chip-fill-dark: "#33312d"
  empty-border-dark: "#5c574f"
  fresh-dark: "#332c21"
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
  scrim-dark: "rgba(10, 9, 8, 0.6)"
  status-applied-dark: "#c4bcb3"
  status-applied-tint-dark: "#35322f"
  status-interviewing-dark: "#d6b890"
  status-interviewing-tint-dark: "#3c3122"
  status-rejected-dark: "#e2b0a9"
  status-rejected-tint-dark: "#402e2b"
  status-offer-dark: "#adc6a7"
  status-offer-tint-dark: "#2c362a"
  status-applied-dot-dark: "#d394c6"
  status-interviewing-dot-dark: "#e2b45e"
  status-rejected-dot-dark: "#ea8d82"
  status-offer-dot-dark: "#8ccb82"
  outcome-pending-dot-dark: "#d394c6"
  outcome-passed-dot-dark: "#8ccb82"
  outcome-failed-dot-dark: "#ea8d82"
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
  title:
    fontFamily: "'Geist Variable', system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: "-0.01em"
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
  wordmark:
    backgroundColor: "{colors.action}"
    textColor: "{colors.on-action}"
    typography: "{typography.display}"
    rounded: "{rounded.lg}"
    height: "48px"
    padding: "0 20px"
  wordmark-sm:
    backgroundColor: "{colors.action}"
    textColor: "{colors.on-action}"
    rounded: "{rounded.lg}"
    height: "36px"
    padding: "0 12px"
  button-outline:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
    height: "{spacing.control-height}"
  button-outline-hover:
    backgroundColor: "{colors.board}"
  button-destructive:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.danger}"
    typography: "{typography.button}"
    rounded: "{rounded.lg}"
    height: "{spacing.control-height}"
  dialog:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.xl}"
    padding: "24px"
    width: "408px"
  select-popup:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "4px"
  theme-toggle:
    backgroundColor: "{colors.board}"
    rounded: "{rounded.lg}"
    height: "36px"
  theme-toggle-active:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
---

# Design System: Applyd

Extracted from `client/src/pages/prototype/LoginVariantA.tsx` ("Paper"), the chosen direction. Light and dark are both designed, and the app follows the OS until the user picks one (see Theme toggle). Dark is a designed counterpart, not an inversion. Every colour below exists as a token in both themes (`-dark` suffix for dark), and each token is used once with one role.

**Scope.** This system was extracted from one screen, the login page. It is complete for that screen only. Each new surface (Board, Detail, dialogs, badges) must extend this file when it is redesigned: add its components here, reusing these tokens and adding new tokens only in light/dark pairs. Every surface in the app is now designed.

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
- **Chip fill** (`chip-fill` #ece8e0 / `chip-fill-dark` #33312d): the one neutral fill behind every chip: a column's card count, the status badge and the outcome badge. `ink` text on it is 10.03:1 / 10.71:1, measured against the chip's own fill. Status colour never goes on the chip; the dot carries it.
- **Empty border** (`empty-border` #b9b2a5 / `empty-border-dark` #5c574f): the dashed edge of every empty state. `line` was too faint for it (1.1:1 on `board`, 1.15:1 on `paper`). This is 1.9:1 / 2.0:1 in light and 2.2:1 / 2.4:1 in dark, on `board` / `paper`. It is decorative: the message inside carries the meaning, so it stays below the 3:1 input floor.
- **Fresh** (`fresh` #f5ecda / `fresh-dark` #332c21): the brief highlight on a newly added round. `ink` is 10.45:1 / 11.38:1 on it and `ink-subtle` 4.8:1 / 4.63:1, so the card stays readable while it fades.

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
- **Card shadow** (`card-shadow` rgba(55, 53, 47, 0.08) / `card-shadow-dark` rgba(0, 0, 0, 0.4)): the resting shadow under board cards, and the base of the Dialog lift.
- **Scrim** (`scrim` rgba(55, 53, 47, 0.4) / `scrim-dark` rgba(10, 9, 8, 0.6)): the dimmed layer behind a dialog. Warm, never pure black. Fades only; it has no blur.

### Status and outcome
Muted, warm hues for application status and interview-round outcome. Each is a text colour (`status-*`, `outcome-*`) on a pale tint (`*-tint`), in both themes. The text colour reads at ≥4.5:1 on its tint and on every ground (paper, surface, board), so it also works without the tint.

| Meaning | Hue | Light text / tint | Dark text / tint | Dot (light / dark) |
|---|---|---|---|---|
| Applied (`status-applied`) | stone (dot: plum) | #625950 / #f0ece8 | #c4bcb3 / #35322f | #9a5b8c / #d394c6 |
| Interviewing (`status-interviewing`) | ochre | #735426 / #f8ebda | #d6b890 / #3c3122 | #b07a1f / #e2b45e |
| Rejected (`status-rejected`) | rosewood | #7e4b45 / #fde7e4 | #e2b0a9 / #402e2b | #b5524a / #ea8d82 |
| Offer (`status-offer`) | sage | #496343 / #e6f1e3 | #adc6a7 / #2c362a | #4f8a45 / #8ccb82 |
| Pending (`outcome-pending`) | stone | same values as Applied | same values as Applied |
| Passed (`outcome-passed`) | sage | same values as Offer | same values as Offer |
| Failed (`outcome-failed`) | rosewood | same values as Rejected | same values as Rejected |

**Dots.** The column dots, and the dots in the status and outcome badges, use the stronger `status-*-dot` tokens, because the text colours read as muted at 8px, especially in dark mode. Each dot is at least 3:1 on `board` and `surface` in both themes. Applied's dot is plum, so it is not grey and not blue; its column heading text stays `ink-subtle`. Dots are decorative: the status word is always next to them.

Outcome dots follow the same pairs as statuses (`outcome-pending-dot` = Applied's, `outcome-passed-dot` = Offer's, `outcome-failed-dot` = Rejected's), at ≥3:1 on `chip-fill` in both themes (3.0–4.0 in light, ≥5.3 in dark). Outcomes share values with statuses on purpose: waiting, good and bad read the same on the board and in a round's history. They stay separate tokens so either set can move without the other.

### Named Rules
**The Warm Ground Rule.** No pure black or pure white as a page ground. Light paper is #f9f8f6 and dark paper is #1c1b19. Pure white is for fields and cards only.

**The One Blue Rule.** Blue means "you are here" (focus). It never fills a button, colours a link, or marks status.

**The Muted Status Rule.** Status is a quiet tint with dark text, never a saturated fill. The one exception is the 8px column dot, which uses the stronger `status-*-dot` tokens. Status hues are warm (stone, ochre, rosewood, sage), and none is blue. The status word is always shown, so colour never carries meaning alone. Rosewood (rejected) is not `danger`: a rejection is an outcome, not an error.

**The Contrast Floor Rule.** Every text token is at least 4.5:1 on the ground it sits on, and every input edge is at least 3:1. Decorative hairlines (`line`, `link-underline`) may fall below that, and must never be the only cue for something interactive.

**The Paired Token Rule.** Colours are only ever used through tokens, and each token has a light and a dark value. A hex literal in a component is a bug.

### shadcn mapping
How the Paper tokens fill the shadcn variables in `client/src/index.css`. `:root` holds the light column and a `.dark` block holds the dark column. The `dark` variant is class-based (`@custom-variant dark`).

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
- `--secondary` stays provisional. The app has no secondary button now (Log out is an inline link), and `board` on `paper` has almost no edge.
- `--sidebar-*` and `--chart-*` are defined but unused, so they are not mapped.
- The first three gaps found when Paper was adopted are fixed: fields fill with `surface` (`bg-card`), the focus halo uses the `focus-ring` token, and the destructive button uses a `/5` rest and `/8` hover tint (4.57:1 or better on paper and surface in both themes). See Buttons for how the dialogs finished it.

## Typography

**Display Font:** the system serif stack, `ui-serif, 'New York', Georgia, serif`
**Body Font:** Geist Variable (with `system-ui, sans-serif` fallback), already installed as `@fontsource-variable/geist`

**Character:** a bookish heading over a clean, neutral sans. The serif is the only place the page raises its voice; the sans keeps forms and data plain.

### Hierarchy
- **Display** (600, 30px, 1.1, -0.025em): the screen title ("Welcome back"). One per screen.
- **Title** (600, 18px, 1.33, -0.01em): dialog titles. Sans on purpose, so the page's serif heading stays the only serif even with a dialog open.
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
- **Card rest** (`box-shadow: 0 1px 2px {card-shadow}`): board cards.
- **Dialog lift** (`box-shadow: 0 12px 32px -8px {card-shadow}`): the dialog panel and the Select popup, the only things that float above the page. In dark mode the shadow is nearly invisible, so the panel is `surface-dark` on the scrim.
- **Focus halo** (`box-shadow: 0 0 0 3px {focus-ring}`): the focused field, together with the border changing to `accent-focus`.

### Named Rules
**The Lift-by-Lightness Rule.** In dark mode, raise a surface by making it lighter, never by adding a shadow.

**The Flat-By-Default Rule.** Nothing floats at rest. Shadows exist only on board cards, as the focus halo, and as the Dialog lift on overlays that sit above the page.

## Shapes

Soft but not round. Fields, buttons, and the logo mark use `lg` (8px); board cards use `md` (6.4px); the board container uses `xl` (11.2px). These come from the project's `--radius: 0.5rem` scale, so they stay in step with shadcn components. Edges are always 1px hairlines; there are no thick borders and no pills.

## Components

### Buttons
- **Shape:** 8px radius, 40px tall, full width of the column.
- **Primary:** `action` fill with `on-action` text, 15px/500. Dark mode swaps to `action-dark` with `on-action-dark`.
- **Hover:** fill moves to `action-hover` (`action-hover-dark`), 150ms.
- **Press:** scales to 0.98. **Disabled/pending:** 70% opacity, with a spinner in front of the label.
- **Success state:** a check icon in front of "Signed in".
- **Outline (secondary):** `surface` fill, 1px `field-border` edge (3:1, so it reads as a control), `ink` text, 15px/500. Hover fill moves to `board`. Used for Cancel in dialogs and for the Add round trigger (36px), so the detail page keeps one primary button. Inline links still serve quiet actions such as Log out.
- **Destructive:** `danger` text on a `danger/5` tint (`danger/8` on hover) with a 1px `danger/30` edge, so it does not depend on the faint tint alone. 28px for the Delete trigger on the board card and detail header; 40px as the confirm button in a dialog. Focus is the standard blue halo, not a red one (One Blue Rule). It never fills solid.

### Links
- Ink text with a 1px `link-underline` at 4px offset. Hover darkens the underline to `ink`. No colour change to blue (see The One Blue Rule).

### Inputs / Fields
- **Style:** `surface` fill, 1px `field-border`, 8px radius, 40px tall, 12px side padding, 15px text, `placeholder` hint.
- **Focus:** border to `accent-focus` plus a 3px `focus-ring` halo, with no outline jump. Transition on box-shadow.
- **Error:** message in `danger` at 12px directly under the field. The field edge stays `field-border`, and the text carries the error.
- **Label:** above the field, 14px/500, 6px gap. An optional field adds "optional" after the label in `ink-subtle` 12px/400.
- **Date input:** the native `type="date"`, styled as a field with tabular numbers. It has no `color-scheme` override, so the browser's picker follows the theme (`color-scheme` on `:root` and `.dark`). The calendar icon is 60% opacity, 100% on hover.
- **Select:** the trigger is a full-width field with a 16px chevron in `ink-muted`; an unselected value shows `placeholder`. The popup is `surface` with a 1px `line` border, `lg` radius, 4px padding and the Dialog lift. Items are 14px with 6px × 8px padding and `md` radius; the highlighted item is `board`, and the selected item shows a check. The popup does not animate.
- **Textarea:** a field with 88px minimum height, 10px × 12px padding, growing with content up to 200px, no manual resize.
- **Server error:** one `danger` 14px line with `role="alert"`, directly above the footer, in the same place on every form.

### Mini board (signature component)
A tiny three-column board (Applied, Interview, Offer) that previews the product. Inset `board` fill, `line` hairline, 11.2px radius, `overline` column headings in `ink-subtle`, and cards in `surface` with a `line` border and `card-shadow`.
- **Load:** cards drop in from 16px above with a fade, staggered 90ms apart, over 600ms on `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- **Meaning:** on a successful sign-in, one card slides from Interview to Offer over 700ms on the same easing, and its border becomes `success`.
- **Reduced motion:** the board renders in its end state with no animation.

### Wordmark
The product name as an ink box: `action` fill, `on-action` text, `lg` (8px) radius, Geist 600 with -0.025em tracking. It is the logo: there is no separate mark. The text is "Applyd", and screen readers get the word once.
- **Large** (48px tall, 20px text, 20px side padding): the auth pages, 32px above the heading. Letters drop in like cards settling on the board: each letter uses the board's settle motion (16px above, fade, 600ms), staggered 40ms, once on load.
- **Small** (36px tall, 16px text, 12px side padding): the TopBar. Static, because the TopBar remounts on every navigation and motion means placement.
- **Reduced motion:** both render static.

### TopBar
`paper` ground with a 1px `line` hairline under it, 64px tall, content up to `max-w-7xl` with 24px side padding (16px under 640px). Left: the small Wordmark, linking to the board. Right, 12px apart (8px under 640px): Theme toggle, the primary "Add application" button at 36px tall ("Add" under 640px), and Log out as an inline link.
- **Log out:** ink text with the `link-underline` rule, darkening to `ink` on hover, as in Links.
- **Focus:** the Wordmark link and every control show the `focus-ring` halo.

### Theme toggle
A three-way segmented control in the TopBar: Light, Dark, System, shown as sun, moon and monitor icons (names are in the accessible label and tooltip). It is a native radio group, so arrow keys move the choice.
- **Style:** `board` track, 1px `line` border, 8px radius, 36px tall, 28px segments. The selected segment is `surface` with `ink` icon; the others are `ink-muted` and move to `ink` on hover. Flat, no shadow.
- **Storage:** the choice is saved in `localStorage` under `theme` (`light`, `dark`, or `system`; nothing saved means `system`). A blocked or invalid value falls back to `system`.
- **No flash:** an inline script in `index.html` reads `theme` before first paint and sets `.dark` on `<html>`, so a saved "dark" never flashes light on reload. `src/lib/theme.ts` applies the same rule when the choice changes; keep the two in step.
- **System:** follows the OS and updates live when the OS setting changes. Light and Dark ignore the OS.

### Board
The Mini board at full size. Page container `max-w-7xl`, 32px top padding, same side gutters as the TopBar. Above it, the one serif `display` heading ("Applications") with a `body` count line in `ink-muted`. The board itself is the Mini board shell: `board` fill, `line` hairline, `xl` radius, 8px padding, four columns from 1024px, two from 768px, one below. Gaps are 8px.
- **Motion:** cards use the `settle` motion from the Mini board. It plays once per page load, when the first data arrives, and not when you return from Detail, because those cards were already in place. A reload counts as a new load. Delay is `min(row, 6) × 90ms + column × 30ms`, so a long column never keeps cards hidden for more than about 0.7s. The animation only changes `transform` and `opacity`, so cost is the same however often it runs; the rule is about meaning, not performance.
- **Reduced motion:** static.

### Board column
Overline heading in `ink-subtle`: an 8px dot in the column's `status-*-dot` token, then the status word in `ink-subtle`. The card count sits on the right as a chip, `ink` 12px/500 on `chip-fill`, `md` radius. It is the same for every status, so the dot alone carries the status colour. The word is always shown. An empty column shows "No applications yet" in `ink-subtle` 12px in the shared Empty state.

### Application card
The Mini board card at reading size: `surface` fill, 1px `line` border, `md` radius, `card-shadow` at rest, 12px × 10px padding. Company in 14px/500 `ink`; role in 12px `ink-muted`; date in 12px `ink-subtle`, tabular. The whole card is one link. Hover moves the border to `field-border`; focus shows the `focus-ring` halo and the `accent-focus` border.
- **Delete:** the existing destructive button, top right. On devices with hover it appears on card hover or focus-within; on touch it is always visible. It uses the small destructive button (see Buttons).

### Status and outcome badges
A neutral chip with a coloured dot: `chip-fill`, `ink` 12px/500, 24px tall, `md` radius, 8px side padding, and an 8px dot 6px before the word. The dot is `status-*-dot` (Applied, Interviewing, Rejected, Offer) or `outcome-*-dot` (Pending, Passed, Failed); the chip never changes colour. The word is always shown. Static, no motion.

### Detail header
Sits on the `paper` ground with no card. A quiet "← Board" link above (Links), then the one serif `display` heading (the company) with the role under it in `body` `ink-muted`. Delete is top right on the heading row; deleting returns to the board. Below: the status badge and "Applied {date}" in `ink-subtle` 12px. The page is a single `max-w-3xl` column with the same gutters as the TopBar.
- **Notes:** an `overline` "Notes", then the text in `body` `ink`, line breaks kept. **Empty:** "No notes for this application." in `ink-subtle` 14px in the shared Empty state.

### Timeline
The page's centrepiece: the interview rounds, oldest at the top and newest at the bottom (by round date; same-day rounds keep the order they were added). A section heading "Interview rounds" (14px/500) with the count in `ink-subtle`, and the Add round button on the right.
- **Round:** a 10px dot (`background` fill, 2px `field-border` ring) on a 1px `line` rail, then a card in `surface` with a `line` border, `md` radius, 12px × 10px padding and no shadow. The round type is 14px/500 `ink`, the date is 12px `ink-subtle`, and the outcome badge sits on the right.
- **Open motion:** every time an application opens, the rail grows top to bottom and each round settles as the line reaches it. Total about 600ms: each round is staggered by `min(90ms, 600ms ÷ rounds)`, and each rail segment grows over one stagger. The `settle` motion and easing are the board's. Plays on every visit because the page is a new placement each time.
- **Added round:** only the new round settles in, at once, and its card fades from `fresh` to `surface` over 1.2s. Existing rounds don't move.
- **Reduced motion:** the finished timeline, static, no highlight.
- **Empty:** "No interview rounds yet." in `ink` 14px with "Add one when it's scheduled." in `ink-subtle` 12px, in the shared Empty state. No illustration.

### Empty state
One box for every empty place (board column, notes, timeline): a 1px dashed `empty-border`, `md` radius, centred text, 24px × 16px padding, no fill. It has no fill on purpose: the board column already sits on the `board` fill, so a fill would vanish there. The message is `ink-subtle` (12px in a column, 14px for notes), and the timeline adds an `ink` headline above its hint. Static, no motion.

### Page entrance
Header and form rise 10px with a fade over 700ms on the same easing, the form delayed by 150ms. This runs once on load and never loops.

### Dialog
Used for Add application, Add round and Delete confirm. The panel is `surface` with a 1px `line` border, `xl` radius, 24px padding, 408px wide (never closer than 16px to the viewport edge) and centred, on the `scrim`. It carries the Dialog lift.
- **Header:** the `title` (18px/600) with a 14px `ink-muted` description 6px under it. 28px to the form.
- **Form:** fields 16px apart, as in Inputs / Fields. The Status and Date applied fields share a row.
- **Footer:** 28px below the last field, no strip or divider. Cancel (outline) then the action (primary, or destructive for Delete), right-aligned, both 40px; under 640px they stack full width with the action on top. Submit buttons stay inside the `<form>`. While pending the action shows a spinner and its progressive label ("Adding").
- **Closing:** Cancel, Esc or a click on the scrim. There is no X button. A server error is cleared when the dialog closes.
- **Motion:** the panel fades from 0 and scales from 0.96 over 180ms on the board's easing, and leaves over 150ms ease-in. The scrim fades only. Reduced motion: no transition.
- **Focus:** trapped inside; every control shows the blue halo.

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
