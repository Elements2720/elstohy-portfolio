---
name: Mohammed El-Stohy portfolio
description: Porto-pinned public Experience and a distinct private Operate dashboard.
colors:
  ink: "#f9f9f9"
  muted: "#a2a2a2"
  line: "#242424"
  ground: "#080808"
  checker-ground: "#050505"
  checker-tile: "#0d0d0d"
  rail: "#202020"
  white: "white"
  focus: "#c2ff72"
  selection: "#d8ff80"
  engineering-icon: "#42eb00"
  role-icon: "#00b5ff"
  artwork-ground: "#c2d8a4"
  hero-artwork: "#e56339"
  admin-ground: "#f3f4f2"
  admin-ink: "#202822"
  admin-line: "#d8ddd7"
  admin-muted: "#626d65"
  admin-accent: "#234738"
  admin-accent-hover: "#163829"
  admin-secondary-ink: "#344439"
  admin-secondary-line: "#ccd5cc"
  admin-secondary-hover: "#edf2ea"
  admin-nav-ink: "#59625b"
  admin-nav-active: "#eaf0e8"
  admin-nav-active-ink: "#244333"
  admin-nav-hover: "#f0f3ee"
  admin-field-line: "#b9c4ba"
  admin-field-ink: "#253027"
  admin-focus: "#2a6445"
  admin-badge: "#f0f2ed"
  admin-badge-ink: "#596252"
  admin-published: "#e3efe0"
  admin-published-ink: "#35602c"
  admin-success: "#e7f1e5"
  admin-success-line: "#c2d5bc"
  admin-success-ink: "#2a4d2e"
  admin-error: "#fff1ed"
  admin-error-line: "#e6c3b7"
  admin-error-ink: "#823526"
  admin-danger-ink: "#8c382b"
  admin-danger-line: "#dac4bd"
  admin-danger-hover: "#f9ede9"
typography:
  display:
    fontFamily: "PortoDisplay, Arial, sans-serif"
    fontWeight: 600
    lineHeight: 0.8
    letterSpacing: "-3px"
  headline:
    fontFamily: "PortoDisplay, Arial, sans-serif"
    fontSize: "clamp(60px,8.34vw,144px)"
    fontWeight: 600
    lineHeight: 0.76
    letterSpacing: "-1.6px"
  title:
    fontFamily: "PortoDisplay, Arial, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    letterSpacing: "-.01em"
  body:
    fontFamily: "PortoText, Arial, Helvetica, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.4
  label:
    fontFamily: "PortoDisplay, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: ".04em"
  admin-headline:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "32px"
    lineHeight: 1.1
    letterSpacing: "-.035em"
  admin-body:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.4
  admin-label:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "13px"
    fontWeight: 600
rounded:
  pill: "999px"
  artwork: "12px"
  portrait: "24px"
  admin-field: "5px"
  admin-button: "6px"
  admin-navigation: "7px"
  admin-card: "8px"
  admin-panel: "9px"
  admin-badge: "4px"
spacing:
  public-gutter: "30px"
  public-mobile-gutter: "20px"
  public-section: "170px"
  public-column-gap: "50px"
  admin-control-gap: "8px"
  admin-action-gap: "10px"
  admin-grid-gap: "25px"
  admin-panel: "30px"
components:
  public-pill:
    backgroundColor: "{colors.white}"
    textColor: "{colors.checker-ground}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  public-pill-hover:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.white}"
  public-pill-outline:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  public-pill-outline-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.checker-ground}"
  public-artwork:
    backgroundColor: "{colors.artwork-ground}"
    rounded: "{rounded.artwork}"
  admin-button:
    backgroundColor: "{colors.admin-accent}"
    textColor: "{colors.white}"
    rounded: "{rounded.admin-button}"
    padding: "11px 16px"
  admin-button-hover:
    backgroundColor: "{colors.admin-accent-hover}"
  admin-button-secondary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.admin-secondary-ink}"
    rounded: "{rounded.admin-button}"
    padding: "11px 16px"
  admin-button-secondary-hover:
    backgroundColor: "{colors.admin-secondary-hover}"
  admin-button-danger:
    backgroundColor: "transparent"
    textColor: "{colors.admin-danger-ink}"
    rounded: "{rounded.admin-button}"
    padding: "11px 16px"
  admin-button-danger-hover:
    backgroundColor: "{colors.admin-danger-hover}"
  admin-field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.admin-field-ink}"
    rounded: "{rounded.admin-field}"
    padding: "11px 12px"
  admin-panel:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.admin-panel}"
    padding: "{spacing.admin-panel}"
  admin-badge:
    backgroundColor: "{colors.admin-badge}"
    textColor: "{colors.admin-badge-ink}"
    rounded: "{rounded.admin-badge}"
    padding: "4px 8px"
  admin-badge-published:
    backgroundColor: "{colors.admin-published}"
    textColor: "{colors.admin-published-ink}"
    rounded: "{rounded.admin-badge}"
    padding: "4px 8px"
---

# Design System: Mohammed El-Stohy portfolio

## Overview

**Creative North Star: "Experience / Operate"**

Experience reconstructs the user-pinned Porto source: oversized fitted identity, a near-black checker ground, fine vertical rails, restrained metadata and asymmetric media rhythm. Real app screenshot compositions take the place of source photography; this is source-site reconstruction, not a generated comp.

Operate is a separate light, dense editorial workspace for the single owner. White bordered panels, green actions and conventional form typography prioritize editing and publishing. Public display typography, checker texture and custom cursor do not define dashboard controls.

**Key Characteristics:**
- Fitted public identity with an explicit full-name caption.
- Real product imagery inside rounded, unframed editorial work compositions.
- Separate light dashboard with green actions and visible field boundaries.
- Source-extracted tokens; surface-specific responsive and motion behavior.

Evidence: `PRODUCT.md`, the direction contract in `audit/DESIGN-AUDIT.md`, `src/app/globals.css`, `src/app/dashboard/dashboard.css`, sampled public and dashboard components, and `audit/build/home-1440.png`, `audit/build/home-390.png`, `audit/dashboard/project-editor-desktop.png`. This is a source-and-saved-render snapshot, not a fresh browser certification. The selected-tab ResizeObserver change in `src/components/dashboard/projects.tsx` changes visibility behavior only; it adds no design tokens.

## Colors

### Primary
- Experience uses `ink` on the checker ground, with white pills as contrast inversions rather than a pervasive brand accent.
- Operate uses `admin-accent` for primary actions, selected-tab underlines and checkbox accents; its hover is `admin-accent-hover`.

### Secondary
- Engineering and role icon colors are limited to the public metadata icons. `focus` and `selection` are interaction treatments, not general button colors.
- Artwork grounds belong to media compositions. The orange hero ground is not a system-wide CTA accent. Other project and profile colors are local compositions, not a reusable brand palette.

### Neutral
- Experience uses `muted` for secondary text, `line` for section boundaries, and `rail` for the vertical guides. Checker ground and tile remain separate from the root ground.
- Operate uses `admin-ground`, white panels, `admin-ink`, `admin-muted` and `admin-line`. Field strokes and secondary-button strokes have their own source values.
- Published badges, success messages and errors use the dedicated state colors above; danger controls are distinct from error feedback.

### Named Rules
**The Separate Surfaces Rule.** Keep Experience's dark editorial palette and Operate's light functional palette scoped to their own surfaces.

## Typography

**Display Font:** Clash Display, registered locally as `PortoDisplay`, with Arial/sans-serif fallback. The source supplies separate semibold (600) and medium (500) WOFF2 faces.

**Body Font:** Inter Display, registered locally as `PortoText`, with Arial/Helvetica/sans-serif fallback. The bundled medium face is declared for weights 400–500; the public body inherits 400 unless overridden. Do not describe the public build as Inter-only.

Operate explicitly uses Arial/Helvetica/sans-serif. This is the current built surface, not a missing public-font token to repair.

### Hierarchy
- **Display:** public identity uses the frontmatter display role, but its size is measured after fonts load and on ResizeObserver updates: start measuring at 300px, fit to heading width minus 12px, cap at 420px. The CSS fallback is 17.8vw. Mobile tracking becomes -1px. Long identity stays on one line; the full name remains in the accessible label and caption.
- **Headline:** public section headings use the frontmatter clamp, with 9vw at ≤1024px, 10vw at ≤768px, and 15vw / .8 line-height at ≤600px. Contact has its own intermediate 11vw rule. Approach instead uses clamp(38px,6.25vw,100px), .8 line-height and zero tracking; mobile becomes 10vw / .88.
- **Title:** service/profile/contact statements use the 24px Clash role. Approach titles use 23px, then 20px at ≤1024px and 22px at ≤600px. Work captions are Inter, 18px / 500 in the final cascade.
- **Body:** public paragraph default is the frontmatter body role; several mobile descriptions reduce to 16px. Intro and profile widths are component-specific (470px and 920px), not a universal character-count rule.
- **Label:** hero metadata uses Clash 500 and uppercase styling; mobile uses 11px. Section rails use .06em tracking and 9px on mobile. Clock, identity caption and footer have their own sizes while sharing the metadata family.
- **Operate:** page headings use the admin headline role, becoming 28px at ≤850px and 27px at ≤650px. Body descriptions and fields use 14px; field labels and action labels use 13px / 600. Selected tabs and sidebar items use 700.

### Named Rules
**The Measured Identity Rule.** Fit the actual identity after font loading and on resize; never copy Porto's five-letter display size onto a longer name.

## Layout

Experience has a three-cell header (118px high), desktop gutters from `public-gutter`, and vertical rails at 22.22% and 77.78%. At ≤600px the header keeps its height, gutters become `public-mobile-gutter`, and a single vertical rail moves to 50%. The identity band is 398px by default, 450px at ≥1728px, 320px at ≤1024px, 240px at ≤768px and 160px at ≤600px. The hero metadata starts as three columns with a 144px minimum height; mobile stacks it with 25px padding/gaps and a 287px minimum. Hero media padding is 60px above on desktop and 50px above on mobile. Saved captures show its top at roughly 720px desktop and 619px mobile; the latter is render evidence, not a new spacing token.

Public work uses twelve columns, 100px row / 30px column gaps, and staggered placements. At ≥1025px the second item sits in columns 7–12 at 74.5% width, right-aligned and 180px lower. At ≤600px work becomes a column with 55px gaps; alternating items retain 86% and 92% widths. Work items are media plus captions, not panel cards. Editorial splits use two equal columns and the shared column gap, with sticky asides at top:100px; ≤768px removes the stickiness and stacks them. The profile heading uses a 750px sticky band, replaced by a 280px relative band on mobile.

Operate uses a fixed 240px sidebar, main offset of 240px, 56px 48px main padding and 1550px maximum main width. At ≤1200px main padding becomes 40px 30px; ≤850px narrows the sidebar to 210px and stacks form columns; ≤650px replaces it with a sticky mobile toggle and open full-width navigation, with 30px 18px main padding. Forms use two minmax(0,1fr) columns and 8px 25px gaps. Panels reduce from 30px padding to 24px and then 20px 16px. Dashboard statistics change from four to two columns at ≤1200px.

Spacing entries are observed reusable dimensions, not a newly imposed numerical scale. All media-query values, including public 601px fine-pointer gating and 1025px work placement, are carried in the sidecar.

## Elevation & Depth

Both surfaces are flat at the container level. Experience gets depth from checker texture, hairlines, overlapping screenshot compositions, scrolling transforms and hover darkening. Operate gets hierarchy from white panels on a light ground and thin borders; its panels and controls have no box shadows.

### Shadow Vocabulary
- **App-screen depth:** `drop-shadow(0 12px 18px #0003)` on composed artwork images.
- **Gallery-screen depth:** `drop-shadow(0 12px 20px #0003)` on project gallery images.
- Landscape cover mode removes the image filter; do not add a card shadow to restore it.

Public reveals use .9s and cubic-bezier(.22,1,.36,1); identity uses 1s with .035s letter stagger. Artwork hover uses .65s and that same curve; scroll maps hero y from 60 to -60 and scale from 1.04 to 1.13, ordinary artwork y from 35 to -35 and scale from 1.02 to 1.08. Work darkening uses .35s to opacity .22. The pointer uses a spring (stiffness 350, damping 30), expands from 7×7 to a 98×48 VIEW pill, and is restricted by fine-pointer/mobile/reduced-motion rules. Reduced motion removes CSS animation/transitions, smooth scrolling and public transform/cursor effects. These are implemented values, not claims about inaccessible Framer timelines.

## Shapes

Experience combines hairline geometry with pill CTAs, rounded artwork and a larger portrait/typographic identity radius. Its checker pattern repeats every 6px with 3px offsets. Small circles mark progress; these do not imply a general rounded-card system.

Operate uses modest differentiated corners: fields and icon buttons, action buttons, navigation/media pickers, record/stat cards, and form panels use their own frontmatter radii. Native inputs retain a visible one-pixel border. Tabs are flat with a two-pixel selected underline.

## Components

### Buttons
Experience pills are high-contrast, fully rounded, inline-flex controls with an 8px gap, 48px minimum height, 16px / 700 text and frontmatter padding. Filled hover reverses to the root dark ground; outlined pills use a two-pixel white stroke and invert on hover. The header pill uses Clash; ordinary pills inherit Inter. At ≤600px pills use 12px text, 38px minimum height and 10px 16px padding. Focus is a two-pixel public focus outline offset 5px.

Operate buttons use a one-pixel stroke, 40px minimum height and 13px / 600 text. Secondary actions are white with a muted green-gray stroke; danger actions are transparent with red-brown text/stroke and a pale hover. Focus uses the dashboard outline offset 3px. Global disabled controls use opacity .55 and a not-allowed cursor; no separate active visual is defined.

### Chips
Operate badges are compact status labels, not filter pills: 10px text, capitalized content and 6px 6px 0 0 margin. Published uses its dedicated green state palette. The build has no interactive badge hover/selection style to invent.

### Cards / Containers
Operate form panels use white, the admin line border and panel padding/radius tokens. Record/stat cards use the admin card radius. Experience work containers remain unframed: rounded media, caption/progress dots and an arrow underneath. Landscape covers fill the artwork with object-fit:cover and no screenshot drop shadow; portrait screenshot groups preserve their composition.

### Inputs / Fields
Operate fields are vertical labels with an 8px gap and 22px bottom margin. Inputs/selects/textareas use the field primitive, a one-pixel field-line border, 42px minimum height, 14px / 400 text and full available width. Textareas resize vertically with 1.5 line-height. Hints are 11px muted text. Success and error messages have separate colors and semantic status/alert roles; the build does not define an inline invalid-field border variant.

### Navigation
Experience uses a four-dot menu (42×42 hit area, four 4px dots separated by 10px); hover changes dots to the public focus color. The expanded menu is a height-animated list of uppercase Clash links, with Escape dismissal and link-selection closure. Its glyph arrows are observed implementation, not reusable icon guidance.

Operate sidebar links have 12px 15px padding, 14px text and selected/hover tonal backgrounds. Mobile Escape closes navigation and restores toggle focus; the main area is inert while the mobile navigation is open. Project tabs scroll horizontally and use tablist/tab/tabpanel semantics. Arrow keys wrap, Home/End select endpoints, and focus follows selection. The selected tab scrolls into nearest view on selection and when ResizeObserver detects its parent resizing; no token changed for that behavior.

### Screenshot artwork and fitted identity
Hero compositions use real app screens on the orange media ground, not invented photography. Desktop presents up to four rotated screens; mobile hides screens from the third onward and crops the wider composition into a tall .78-aspect frame. Identity fitting remains runtime behavior and is deliberately not encoded as a false fixed frontmatter font size. Sidecar samples preview CSS states without claiming to reproduce React/Motion runtime behavior or load project images/fonts automatically.

## Do's and Don'ts

### Do:
- **Do** keep Experience and Operate surface rules separate.
- **Do** use Clash Display 600 for public headings, Clash Display 500 for public metadata, and Inter for public body copy.
- **Do** fit long identity text and retain the explicit full name.
- **Do** use real, sourced product screenshots and factual descriptions.
- **Do** preserve visible keyboard focus, selected-tab visibility and reduced-motion behavior.

### Don't:
- **Don't** replace Porto's public editorial media rhythm with conventional developer hero/card composition.
- **Don't** invent awards, testimonials, pricing, employer names, personal geography or phone numbers.
- **Don't** generate a human portrait or treat this reconstruction as a generated comp.
- **Don't** turn project artwork grounds into global brand colors or add dashboard panel shadows.
- **Don't** canonize existing text-glyph arrows, reorder glyph controls, the decorative asterisk or the dashboard system-font brand as reusable display/icon prescriptions; these observed craft-floor exceptions remain unrepaired within this documentation-only boundary.

Documentation limits: saved screenshots cover the first public viewport and a desktop editor state, not every screen, breakpoint or interaction. Source establishes exact token values; current browser computed styles, font-file internals, Safari/Firefox behavior and full reference motion fidelity were not newly verified. Sidecar tonal ramps are synthetic preview extensions, not shipped palette tokens. Primitive scope is intentionally reusable roles, not every one-off project background or local size.
