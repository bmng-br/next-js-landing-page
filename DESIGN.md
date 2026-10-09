---
name: Boomerang Soluções
description: Calm graphite-and-paper landing page where a single pink mark shows where the work lands.
colors:
  paper: "#f5f5f3"
  mist-100: "#ecece9"
  mist-200: "#e4e4e1"
  mist-300: "#dcdcd9"
  mist-400: "#d0d0cc"
  mist-500: "#c9c9c5"
  graphite-200: "#d5d6d8"
  graphite-300: "#b8babd"
  graphite-400: "#a7a9ad"
  graphite-500: "#8a8d92"
  graphite-600: "#6b7075"
  graphite-700: "#45494d"
  graphite-800: "#3a3f44"
  graphite-850: "#2e3236"
  graphite-900: "#262a2e"
  graphite-950: "#15181a"
  teal: "#197a75"
  aqua: "#27bcb4"
  pink: "#ee367e"
  pink-soft: "#f25891"
  pink-deep: "#b3124f"
typography:
  display:
    fontFamily: "Montserrat, Arial, sans-serif"
    fontSize: "clamp(44px, min(6.6vw, 9svh), 96px)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Montserrat, Arial, sans-serif"
    fontSize: "clamp(34px, min(4.6vw, 6svh), 64px)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Montserrat, Arial, sans-serif"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: "32px"
    letterSpacing: "-0.03em"
  numeral:
    fontFamily: "Montserrat, Arial, sans-serif"
    fontSize: "40px"
    fontWeight: 700
    lineHeight: "44px"
    letterSpacing: "-0.03em"
  lead-sm:
    fontFamily: "Montserrat, Arial, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: "30px"
  body-md:
    fontFamily: "Montserrat, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: "28px"
  body:
    fontFamily: "Montserrat, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "26px"
  body-sm:
    fontFamily: "Montserrat, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: "22px"
  label-sm:
    fontFamily: "Montserrat, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: "20px"
  lead:
    fontFamily: "Montserrat, Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: "29px"
  label:
    fontFamily: "Montserrat, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: "16px"
    letterSpacing: "0.14em"
rounded:
  sm: "8px"
  md: "10px"
  lg: "16px"
spacing:
  section: "clamp(3.5rem, 8svh, 8rem)"
  section-gap: "clamp(2rem, 5svh, 3.5rem)"
  nav: "4.5rem"
components:
  button-primary:
    backgroundColor: "{colors.pink}"
    textColor: "{colors.graphite-950}"
    rounded: "{rounded.md}"
    padding: "0 26px"
    height: "54px"
  button-primary-hover:
    backgroundColor: "{colors.pink-soft}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "44px"
  button-ghost-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.graphite-950}"
  button-ink:
    backgroundColor: "{colors.graphite-950}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
  card:
    backgroundColor: "#ffffff"
    textColor: "{colors.graphite-950}"
    rounded: "{rounded.lg}"
    padding: "36px 32px"
---

# Design System: Boomerang Soluções

## Overview

**Creative North Star: "The Steady Partner"**

The system behaves like the company it sells: calm, plain-spoken and dependable. Surfaces alternate between warm paper and deep graphite, type is one bold sans, and nothing decorates for its own sake. The visitor should feel that someone sensible is already on their side.

Color is held back so that one gesture can carry meaning: the pink point where a boomerang returns, where a button asks for contact, where a diagram resolves. Density is generous but not airy; vertical rhythm scales with viewport height so each section fits a short screen. Motion explains (a path being drawn, a problem bouncing between suppliers) and always has a static end state for reduced-motion users.

**Key Characteristics:**
- Paper and graphite bands, white cards, no gradients.
- One bold sans (Montserrat) at tight negative tracking for headings.
- Pink is the single action and arrival color; teal and aqua carry structure.
- Flat, tonal depth; instructive motion only.
- Dark sections are scoped with the `dark` class so tokens flip locally.

## Colors

A cool-neutral field with teal and aqua for structure and one hot pink for arrival and action.

### Primary
- **Arrival Pink** (#ee367e): primary buttons, the boomerang's landing dot, the full stop in the hero title, form accents. Hover lightens to **Soft Pink** (#f25891). **Deep Pink** (#b3124f) is for small text on light surfaces such as field errors, where plain pink would fail contrast.

### Secondary
- **Harbor Teal** (#197a75): eyebrows, numerals, links and the focus ring on paper.
- **Signal Aqua** (#27bcb4): the same roles on graphite (eyebrows, marquee separators, hover links, focus ring under `.dark`).

### Neutral
- **Paper** (#f5f5f3): page background and light text on graphite.
- **Mist** (#ecece9 to #c9c9c5): hairlines and quiet fills on paper (cards use `mist-200` borders).
- **Graphite ramp** (#d5d6d8 to #15181a): `950` is the dark band and primary text; `700` is body copy on paper; `300` to `400` is body copy on graphite; `850` and `800` are borders on graphite.
- **White** (#ffffff): card and form surfaces.

### Named Rules
**The One Landing Rule.** Pink marks action or arrival, and appears a few times per screen at most. If everything is pink, nothing has landed.

**The Paired Accent Rule.** Teal on paper, aqua on graphite. Never swap them: each is tuned for its own background.

## Typography

**Display Font:** Montserrat (Arial, sans-serif fallback)
**Body Font:** Montserrat
**Label Font:** Montserrat, uppercase and wide-tracked

**Character:** One family, weight 700 for headings and 400 to 600 for reading. Hierarchy comes from size and tight tracking, not from a second typeface.

### Hierarchy
- **Display** (700, clamp 44px to 96px, 0.98, -0.045em): the hero title and the DNA statement.
- **Headline** (700, clamp 34px to 64px, 1.02, -0.04em): section titles via the section intro.
- **Title** (700, 28px, 32px, -0.03em): service and confirmation titles. Card names at 20px (28px line).
- **Body** (400, 16px, 26px): card and form copy; keep lines to about 65 to 75ch. Lead paragraphs are 18px/29px, the hero's is 19px/30px.
- **Label** (700, 12px, 0.14em, uppercase): eyebrows over section titles.
- **Intermediate steps** (13px label-sm, 15px body-sm, 17px body-md, 19px lead-sm, 40px numeral): small form and footer text, button and stage text, picker and diagram copy, the hero lead, and the stage counter.

### Named Rules
**The Tight Heading Rule.** Large headings take negative letter-spacing (-0.03em to -0.045em) and a line height near 1. Body text never does.

## Layout

A single container of max 1320px with 24px side padding. Sections use `py-section`, and gaps between a section's parts use `gap-section-gap`; both scale with `svh`, so sizing is tied to viewport height as well as width. Section intros pair a large headline with a lead paragraph in a two-column split (1.4fr / 1fr) that collapses to one column. Card grids use auto-fit columns with a minimum width, and the services grid is a 6-column grid on large screens. The sticky nav is 72px tall and anchors use `scroll-padding-top` to match. Touch targets are at least 44px.

## Elevation & Depth

Flat by default. Depth comes from alternating surface tones (graphite band, paper field, white card) and 1px hairlines in mist or graphite-850. A single token, `shadow-lift` (`0 1px 2px rgb(21 24 26 / 0.12), 0 2px 8px rgb(21 24 26 / 0.08)`), exists for rare small lifts. The nav sits over content with a translucent graphite background and a backdrop blur.

### Named Rules
**The Tonal Depth Rule.** Layer by changing surface color, not by adding shadow. A card on paper is white; a card on graphite is a border.

## Shapes

Quiet geometry: 10px on buttons and fields, 16px on cards and form containers, 8px on small tags. The decorative circle appears as the pink landing dot, and the monogram is cropped oversized behind the hero. Hairline rules (1px) and short accent dashes (2px by 28px) punctuate eyebrows.

## Components

### Buttons
- **Shape:** 10px radius, bold label, no shadow.
- **Primary:** pink fill with graphite-950 text, 54px high (large) or 44px (small).
- **Ghost:** 1.5px graphite-600 border, paper text; fills with paper on hover. Used in the nav on graphite.
- **Ink / Outline:** graphite fill, or 1.5px graphite border, for use on paper.
- **Transition:** color only, 200ms.

### Cards / Containers
- **Corner Style:** 16px.
- **Background:** white on paper; on graphite, a border instead of a fill.
- **Padding:** 36px 32px, with the large number or title leading.
- **Shadow:** none.

### Inputs / Fields
- **Style:** white form container (16px radius, 36px by 40px padding); fields have a graphite-500 border and 10px radius.
- **Focus:** the global 2px outline (teal on paper, aqua under `.dark`) offset 3px.
- **Error:** deep-pink 13px text and a pink-bordered notice; the success state replaces the form with a pink dot, a 28px title and a confirmation.

### Navigation
Sticky, dark, translucent graphite with a blur. Logo left, anchor links center (visible from 961px), locale toggle and a ghost contact button right. Below 961px the links move into a mobile menu.

### Boomerang Journey (signature)
The hero's SVG trajectory: the client's square ("VOCÊ DECIDE") is where the project leaves from, stays tied to by the drawn line, and returns to. The dot pauses at each of four stations for a "you decide" hold, with a ring pulse, and the station fills pink once it is approved; the dot turns pink on return. It plays once (about 24 seconds), rests on its end frame, and can be paused or replayed. Stage text pairs what "nós" do with what "você" decides, and the client's line is always the brighter one. The "without / with Boomerang" diagrams use the same grammar. Under reduced motion they show a static end state.

## Do's and Don'ts

### Do:
- **Do** use pink only for the primary action and for arrival moments.
- **Do** use teal on paper and aqua on graphite for eyebrows, links and focus.
- **Do** write headings at 700 with tight negative tracking and a line height near 1.
- **Do** build depth with surface tone and hairlines.
- **Do** give every animation a static end state under `prefers-reduced-motion`.
- **Do** keep tap targets at least 44px high.

### Don't:
- **Don't** add gradients, glows or colored shadows.
- **Don't** introduce a second typeface or a decorative serif.
- **Don't** use client logos, testimonials or metrics as visual filler; none exist (see PRODUCT.md).
- **Don't** fill cards with pink or aqua; accents are for marks, numerals and actions.
- **Don't** use pink at small sizes on paper for text; use deep pink.
