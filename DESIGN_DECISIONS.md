# Design Decisions

## 🎨 Visual Identity
- **Colors**:
  - `Terra Charcoal` (#0f0f0f): Used as the primary background to create a dim, intimate evening atmosphere.
  - `Terra Gold` (#d4af37): Used sparingly for high-value accents (CTAs, dividers) to signify premium quality without looking gaudy.
  - `Wine Red`: implied in photography and "Mood" sections.
- **Typography**:
  - **Headings**: `Playfair Display` (Serif). Chosen for its elegance and high contrast, evoking a classic, upscale dining feel.
  - **Body**: `Inter` (Sans-serif). Chosen for readability on mobile screens and modern minimalism.

## ⚡ User Experience (UX)
- **Mobile First**: All components (Nav, Cards, Modals) were designed for touch first. The "Vibe Cards" on Home use horizontal scrolling which feels native on mobile swiping.
- **Cinematic Motion**:
  - **Ken Burns Effect**: The Hero section slowly zooms into the image to create a feeling of liveliness without heavy video bandwidth.
  - **Staggered Reveal**: Content fades in and slides up as you scroll (GSAP) to guide the eye and create a sense of pacing, mimicking a "curated night".
- **Smooth Scroll**: implemented via `Lenis` to give a "heavy", premium feel to the scroll physics, differentiating it from standard web pages.

## 🔧 Technical Choices
- **Next.js App Router**: Future-proof architecture with excellent SEO capabilities (Server Components).
- **Tailwind CSS v4**: Utilized the latest alpha/beta for cleaner CSS variable variable-based theming (`@theme`).
- **Google Model Viewer**: The industry standard for web-based 3D. It handles the complexity of different AR modes (Quick Look vs Scene Viewer) automatically.
- **Lazy Loading**: 3D models are only loaded when the Modal opens (`loading="eager"` inside the modal, but the modal itself is conditional) to preserve initial page load speed (Lighthouse FCP).

## ⚠️ Trade-offs
- **No Backend**: The reservation form is a cosmetic demo. In a real app, this would connect to an API route or WhatsApp web intent.
- **Asset Size**: High-quality images for a "premium" feel can hurt LCP on slow networks. We use Next.js `<Image>` for automatic WebP optimization.
