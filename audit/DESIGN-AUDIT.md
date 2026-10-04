# Porto reference audit — 2026-10-03

Captured actual browser renderings at 1728, 1440, 1280, 1024, 768, 430, 390 and 375 pixels. Files: `audit/reference/home-{width}.png`, section captures, `work-1440.png`, and computed measurements. The source site's complete homepage is about 22,700px at 1728. Several template sections (pricing, awards, fabricated testimonials) do not apply to this portfolio and will be omitted; that intentionally shortens the page.

## Layout and typography
At 1440: black checker-textured ground, fine vertical rails near 22.2% and 77.8%, 30px outer gutter. Header about 118px high, local clock left, four-dot menu centered, outline pill contact right. Hero identity 397px Clash Display semibold (600), 0.8 line height, -3px tracking, width virtually edge-to-edge. Identity band ends near y=516. Three equal centered metadata slots form a 144px band below it; hero media starts y=720 with 30px margin and rounded ~12px corners. Metadata is Clash Display medium (500), 12–14px uppercase; body is 18px Inter Display medium. Neutral secondary text is gray. These families were re-verified with computed-style probes after an initial Inter-only font inference proved incorrect.

At 390: 20px gutters; header retains clock, dots and smaller contact pill, about 118px high. Name is a single fitted line, approximately 100px for five letters. Metadata becomes three vertically stacked items, total ~287px. Hero media begins near y=613 and uses a tall portrait crop. No conventional two-CTA developer introduction. Name adaptation necessarily changes the fitted font size because Mohammed's identity is longer; full name remains explicit.

Approach: 3-column section rail (number / centered label / right description), then approximately 140px gap to centered 90px / 70px headline. Muted centered introduction, three small numbered circles joined by hairlines, then bordered 3-column treatment with repeated three-dot progress, miniature media, 24px headings and 18px descriptions. Mobile stacks the columns and reduces display typography.

Work: rail, ~80px gap, 120px / 90px two-line heading left and 260px description at lower right. Asymmetric media grid: left column about 49%, right about 36%, 180px vertical offset, with generous negative space. Large rounded media; small title/category and arrow beneath, no framed cards or background panels. Additional rows change scale and alignment. Work-page title is centered ~110px, sparse date, intro, white CTA; then full-width large rounded cover. Four metadata columns and two-column text passages alternate with enormous imagery. Employer/client slot will be replaced by role.

Profile: centered 90px + 120px title, centered image about 504px wide, large quiet margins, 24px uppercase statement, 18px muted paragraph up to ~920px, pill resume button. No real portrait is available, so use an explicitly typographic identity treatment; no generated human portrait.

Services: same rail and left 120px two-line heading; 260px right intro. Service rows sit on right half beside sticky left title/media, 1px borders, tiny numbers, 24px headings, muted descriptions. Experience uses a left sticky 34px title and right editorial rows, with dates right-aligned. Closing CTA centered, 120px / 90px two-line title, white pill, broad breathing room, sparse footer and giant cropped identity.

## Motion and interaction
Observed entrance clips/translates oversized identity into its band. Hero media and several sections use scroll-relative transforms; three `Left` containers use `position: sticky; top:100px` for Experience, Awards and Stack. The sticky `Top` is the More About heading (750px), not the hero. A further `Content` pin belongs to the template's Voice section, omitted here rather than inventing personal claims. A later direct scroll probe measured hero H1 y=168, -32, -332, -632 at scroll=0, 200, 500, 800, confirming normal hero document flow. Slow scroll preserves independent image movement and pinned editorial columns. Fast scrolling and full-page screenshots can leave lazy media or scroll reveals unsettled: comparisons must scroll and settle rather than assume full-page capture is fully revealed. Four-dot menu is minimal, contact pill reverses contrast, project imagery scales/darkens on pointer hover, with a 98×48 white VIEW pill cursor. Public implementation uses Motion springs for pointer movement, masked staggered text, `useScroll/useTransform` for continuous image parallax, a sticky/fading More About heading and CSS sticky editorial columns. Reduced motion disables transforms and custom cursor. No GSAP justified.

## Direction contract
THESIS: Reconstruct Porto's oversized identity, black textured grid and asymmetric photographic rhythm using real mobile artwork; reject conventional developer hero/card composition.
OWN-WORLD: Clash Display identity/headings and metadata, Inter Display body, near-black checker ground, white type, gray secondary copy, hairlines, small uppercase metadata and pill CTAs.
STORY: Identity first, engineering approach, shipped products, profile, services and experience, then direct email contact.
FIRST VIEWPORT: 118px editorial header; full-width fitted Mohammed identity; three neutral metadata cells; huge project-screenshot artwork with 30px desktop/20px mobile gutters.
FORM: User-pinned Porto reconstruction; no alternate visual-world selection.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Evidence limits
Chromium inspected. Desktop and mobile source screenshots are saved. Exact Framer easing curves and all internal timelines are not exposed by DOM measurements; timings are estimated, not claimed as exact. Safari/Firefox checks and final side-by-side inspection remain required.
