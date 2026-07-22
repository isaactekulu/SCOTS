# Implementation Plan: SCOTS Digital Catalogue

## Overview

This plan implements a premium one-page digital catalogue website for the Southern Community Orthopedic Triage Service (SCOTS) using Astro, Tailwind CSS, Alpine.js, and TypeScript. The implementation progresses from project foundation and design system setup, through data layer and reusable components, to section-by-section page assembly, and finally SEO/performance optimization.

## Tasks

- [ ] 1. Project foundation and build configuration
  - [ ] 1.1 Initialize Astro project with TypeScript, Tailwind CSS, and Alpine.js
    - Create `package.json` with build, dev, and preview scripts and an engines field declaring minimum Node.js version
    - Create `astro.config.mjs` with output set to `static`, Tailwind CSS integration, and Alpine.js integration registered
    - Create `tsconfig.json` extending Astro's recommended strict TypeScript base configuration
    - Create `tailwind.config.js` with design system tokens (colours, spacing, border radius, fonts)
    - Install dependencies: astro, @astrojs/tailwind, @astrojs/alpinejs, alpinejs, typescript
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8_

  - [ ] 1.2 Set up project directory structure and global styles
    - Create directories: `src/components/`, `src/layouts/`, `src/pages/`, `src/styles/`, `src/assets/`, `src/data/`, `src/content/`, `src/utils/`, `public/`, `tests/unit/`, `tests/property/`, `tests/e2e/`
    - Create `src/styles/global.css` with CSS custom properties for all Design_System colour tokens on `:root`, Inter font import, and `font-display: swap`
    - Create `public/robots.txt` permitting all crawlers with sitemap reference
    - Add placeholder `public/favicon.ico` and `public/og-image.png`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 21.1, 21.2, 21.3, 21.4_

- [ ] 2. Data layer and utility functions
  - [ ] 2.1 Create data files and TypeScript interfaces
    - Create `src/data/products.json` with at least 6 service entries (mix of featured and non-featured) covering Assessment, Rehabilitation, Education, and Consultation categories
    - Create `src/data/faq.json` with all 8 FAQ questions from the SCOTS pamphlet and corresponding answers
    - Create `src/data/testimonials.json` with at least 3 testimonial entries including name, reviewText, rating, and optional avatarUrl
    - Create `src/data/site-config.ts` exporting site configuration: site name, URLs, contact info, locations, social links, and navigation items
    - _Requirements: 15.1, 15.2, 12.4, 11.1, 13.1, 13.4_

  - [ ] 2.2 Implement data validation utility
    - Create `src/utils/validateProducts.ts` implementing `validateProducts()` function that validates each product entry has all required fields (id, name, description, category, image, badge, featured) with correct types and length constraints (name ≤ 100, description ≤ 500)
    - Return `{ valid: Product[], invalid: { entry: unknown; reason: string }[] }`
    - Exclude invalid entries from the valid array silently
    - _Requirements: 15.2, 15.5_

  - [ ] 2.3 Implement text truncation utility
    - Create `src/utils/truncateText.ts` with a `truncateText(text: string, maxLength: number): string` function
    - If text exceeds maxLength, return prefix of exactly maxLength characters followed by ellipsis ("...")
    - If text is at or below maxLength, return unchanged
    - _Requirements: 6.4, 8.2, 11.4_

  - [ ]* 2.4 Write property tests for data validation (Property 1 & 2)
    - **Property 1: Data validation round-trip integrity** — Generate random valid Product objects, verify they pass through validation unchanged
    - **Property 2: Invalid entry exclusion** — Generate random objects with missing/invalid fields, verify they are excluded from valid array
    - **Validates: Requirements 15.2, 15.5**
    - Use fast-check with Vitest, minimum 100 iterations per property

  - [ ]* 2.5 Write property tests for filtering and truncation (Property 3 & 4)
    - **Property 3: Featured filtering correctness** — Generate random product arrays, verify featured filtering returns only featured=true items, union equals original set, max 6 for rendering
    - **Property 4: Text truncation preserves prefix** — Generate random strings and thresholds, verify truncation preserves prefix and appends ellipsis only when needed
    - **Validates: Requirements 6.2, 8.3, 15.4, 15.6, 6.4, 8.2, 11.4**
    - Use fast-check with Vitest, minimum 100 iterations per property

- [ ] 3. Layout and reusable components
  - [ ] 3.1 Create Layout component with SEO metadata
    - Create `src/layouts/Layout.astro` accepting title, description, ogImage, canonicalUrl props
    - Include HTML document shell with `<html lang="en">`, proper `<head>` with meta charset, viewport
    - Add meta title (max 60 chars), meta description (max 160 chars), canonical URL tag
    - Add Open Graph tags (og:title, og:description, og:image, og:url, og:type) and Twitter Card tags
    - Preload Inter font family (weights 400, 500, 600, 700, 800) with `font-display: swap`
    - Import global.css, inject JSON-LD structured data for MedicalOrganization schema
    - Include `<slot />` for page content
    - _Requirements: 19.1, 19.2, 19.3, 19.6, 20.7, 20.8, 18.1_

  - [ ] 3.2 Create reusable SectionTitle, Button, ProductCard, CategoryCard, and TestimonialCard components
    - Create `src/components/SectionTitle.astro` with title, subtitle, alignment, and headingLevel props
    - Create `src/components/Button.astro` with variant (primary/secondary/outline), href, size, fullWidth, ariaLabel props
    - Create `src/components/ProductCard.astro` with id, name, description, category, image, badge, featured props; lazy-load images with explicit width/height; truncate description at 120 chars; hover lift animation via CSS
    - Create `src/components/CategoryCard.astro` with icon, title, description, iconLabel props; hover elevation and scale transform effect
    - Create `src/components/TestimonialCard.astro` with name, reviewText, rating, avatarUrl props; star rating display; truncate review at 200 chars with indicator
    - _Requirements: 6.3, 6.4, 7.2, 7.3, 8.2, 11.2, 11.4, 16.1, 16.2, 17.2, 18.3, 18.5_

- [ ] 4. Checkpoint - Foundation verification
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Navigation and Hero sections
  - [ ] 5.1 Implement NavigationBar component
    - Create `src/components/NavigationBar.astro` with sticky positioning, transparent-to-solid background transition on scroll
    - Implement desktop horizontal link list from site-config navigation data
    - Implement mobile hamburger menu using Alpine.js `x-data` for toggle state with `aria-expanded` and `aria-controls`
    - Add smooth-scroll behaviour to section links (CSS `scroll-behavior: smooth` on html element, duration target ~1000ms)
    - Implement active section highlighting via Intersection Observer in an inline `<script>` tag
    - Ensure keyboard navigation with visible 2px focus indicators, ARIA nav landmark, and ARIA label on mobile menu toggle
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9_

  - [ ] 5.2 Implement HeroSection component
    - Create `src/components/HeroSection.astro` with full viewport height (100vh), headline (max 80 chars), supporting text (max 200 chars)
    - Add primary CTA button linking to catalogue section, secondary CTA linking to contact section
    - Include hero image with min 1280×720 resolution, explicit width/height, and solid background-colour fallback on load failure
    - Implement fade-in entrance animation (600ms duration) with `prefers-reduced-motion` media query disabling all transitions
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8_

- [ ] 6. Service sections (Featured, Categories, Featured Products)
  - [ ] 6.1 Implement FeaturedCollection section
    - Create `src/components/FeaturedCollection.astro` importing products.json, validating with `validateProducts()`, filtering for `featured === true`, rendering up to 6 ProductCard components
    - Include SectionTitle with heading and subtitle
    - Responsive grid: 1 column < 768px, 2 columns at 768px, 3 columns at 1024px+
    - Conditionally hide entire section if no featured items exist
    - _Requirements: 6.1, 6.2, 6.5, 6.6, 15.3, 15.4_

  - [ ] 6.2 Implement ProductCategories section
    - Create `src/components/ProductCategories.astro` with SectionTitle and 4 CategoryCard components for: Assessment, Rehabilitation, Education, Consultation
    - Each card has an icon (with accessible alt text), title, and description (max 120 chars)
    - Responsive grid: 1 column < 768px, 2 columns at 768px, 4 columns at 1024px+
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 10.4_

  - [ ] 6.3 Implement FeaturedProducts section
    - Create `src/components/FeaturedProducts.astro` importing and validating products, filtering for featured=true, limiting to 6 most recently featured
    - ProductCard with prominent image (≥50% card area), description truncated at 120 chars, category badge, CTA button
    - Responsive grid: 1 column < 768px, 2 columns 768–1023px, 3 columns 1024px+
    - Lazy-load images below the fold; hide section if zero featured items
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 16.1_

- [ ] 7. Content sections (About, Why Choose Us, Testimonials)
  - [ ] 7.1 Implement AboutSection component
    - Create `src/components/AboutSection.astro` with brand story, mission statement, and core values list
    - Display at least 3 key statistics with numeric value and descriptive label
    - Include image (min 800×600px) alongside content; stack image below text on viewports < 768px
    - Communicate SCOTS purpose: helping patients with musculoskeletal conditions access the right care
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

  - [ ] 7.2 Implement WhyChooseUs section
    - Create `src/components/WhyChooseUs.astro` with SectionTitle and 6 benefit cards
    - Benefits: Premium Quality Care, Sustainable Approach, Fast Service Access, Trusted Professionals, Expert Assessment, Evidence-Based Programs
    - Each card: icon with non-empty accessible alt text, title, description (20–150 chars)
    - Responsive grid: 1 column < 768px, 2 columns 768–1023px, 3 columns 1024px+
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

  - [ ] 7.3 Implement TestimonialsSection component
    - Create `src/components/TestimonialsSection.astro` importing testimonials.json, rendering at least 3 TestimonialCard components
    - Responsive grid: 1 column < 768px, 2 columns 768–1023px, 3 columns 1024px+
    - _Requirements: 11.1, 11.2, 11.3, 11.4_

- [ ] 8. Interactive sections (FAQ, Contact, Footer)
  - [ ] 8.1 Implement FAQSection with Alpine.js accordion
    - Create `src/components/FAQSection.astro` importing faq.json, rendering accordion items using Alpine.js `x-data` with single-open constraint (`activeIndex`)
    - All items collapsed on initial load; clicking expands answer with 200–300ms transition
    - Support keyboard activation via Enter and Space keys; include `aria-expanded` and `aria-controls` attributes
    - Disable transitions when `prefers-reduced-motion` is enabled
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7_

  - [ ] 8.2 Implement ContactSection component
    - Create `src/components/ContactSection.astro` with email, phone, physical address as visible text
    - Display at least 2 social media icon links opening in new tabs (`target="_blank"` with `rel="noopener noreferrer"`)
    - Primary CTA button initiating contact (e.g., mailto link or booking link)
    - Display SCOTS locations list: Te Kaika Wellbeing Hub, Zingari Richmond Football Club, Nutrition Clinic Otago University, Chatsford Retirement Village Events Centre
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

  - [ ] 8.3 Implement Footer component
    - Create `src/components/Footer.astro` with section navigation links matching NavigationBar, copyright notice with current year, social media icon links, Privacy Policy and Terms of Service links
    - Smooth-scroll navigation links; multi-column layout on 768px+, stacked vertically below 768px
    - Use Design_System typography, colour, and spacing
    - _Requirements: 14.1, 14.2, 14.3, 14.4_

- [ ] 9. Page assembly and animations
  - [ ] 9.1 Assemble index page with all sections
    - Create `src/pages/index.astro` importing Layout and all section components
    - Arrange sections in order: NavigationBar, HeroSection, FeaturedCollection, ProductCategories, FeaturedProducts, AboutSection, WhyChooseUs, TestimonialsSection, FAQSection, ContactSection, Footer
    - Add section `id` attributes matching navigation href targets for smooth scrolling
    - Ensure single `<main>` element wrapping content, proper heading hierarchy (single h1), semantic HTML5 landmark elements
    - _Requirements: 18.1, 18.2, 18.6, 18.7, 3.1_

  - [ ] 9.2 Implement scroll-triggered entrance animations
    - Add CSS-only scroll-triggered entrance animations (fade/slide) using Intersection Observer in a minimal inline script
    - Animation duration 200–500ms, triggered when section is 20% visible
    - Respect `prefers-reduced-motion`: disable all animations, show content immediately
    - Ensure animations do not cause layout shifts to surrounding content
    - _Requirements: 17.1, 17.3, 17.4, 17.5_

- [ ] 10. Checkpoint - Full page verification
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. SEO, performance, and final polish
  - [ ] 11.1 Configure sitemap generation and performance optimization
    - Install and configure `@astrojs/sitemap` integration for sitemap.xml generation with lastmod dates
    - Ensure responsive image handling: WebP/AVIF format with JPEG/PNG fallback where supported, explicit width/height on all images, placeholder preserving aspect ratio
    - Verify total JS bundle ≤ 50KB compressed (Alpine.js loaded only on interactive islands)
    - Ensure build applies tree shaking and minification
    - _Requirements: 19.4, 19.5, 16.2, 16.3, 16.4, 16.5, 20.5, 20.6_

  - [ ] 11.2 Add image fallback handling and accessibility final pass
    - Implement image error fallback: placeholder div preserving dimensions with alt text indication when image fails to load
    - Verify all informative images have alt text (max 150 chars), decorative images use `alt=""`
    - Verify colour contrast meets WCAG 2.1 AA (4.5:1 normal text, 3:1 large text)
    - Verify visible focus indicators (2px minimum, 3:1 contrast) on all interactive elements
    - Ensure ARIA live regions for any dynamic content updates
    - _Requirements: 16.5, 18.3, 18.4, 18.5, 18.8, 18.9_

  - [ ] 11.3 Create README.md with project documentation
    - Create root `README.md` with installation, development, build, and deployment instructions
    - Include sections: project overview, prerequisites, getting started, available scripts, project structure, deployment to Cloudflare Pages
    - _Requirements: 21.5_

- [ ] 12. Final checkpoint - Build verification and tests
  - Ensure all tests pass, ask the user if questions arise.

- [ ]* 13. Unit and integration tests
  - [ ]* 13.1 Write unit tests for validation and utility functions
    - Create `tests/unit/validateProducts.test.ts` testing valid entries pass through, invalid entries are excluded, edge cases (empty array, all invalid, mixed)
    - Create `tests/unit/truncateText.test.ts` testing strings at/below/above threshold, empty strings, exact boundary
    - Create `tests/unit/filterProducts.test.ts` testing featured/non-featured filtering, empty arrays, all featured, none featured
    - _Requirements: 15.2, 15.5, 6.4, 8.2, 15.4, 15.6_

  - [ ]* 13.2 Write E2E tests for navigation and interactivity
    - Create `tests/e2e/navigation.spec.ts` testing smooth scroll navigation, mobile menu toggle, active section highlighting
    - Create `tests/e2e/faq.spec.ts` testing accordion expand/collapse, single-open constraint, keyboard activation, reduced motion
    - Create `tests/e2e/responsive.spec.ts` testing layout at 320px, 768px, 1024px, 1440px viewports
    - Create `tests/e2e/accessibility.spec.ts` with axe-core checks on built pages
    - _Requirements: 4.4, 4.5, 4.6, 4.7, 12.3, 12.5, 12.7, 3.1, 3.3, 3.4, 3.5, 18.1–18.9_

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The project uses TypeScript throughout, Vitest for unit/property tests, and Playwright for E2E tests
- All Alpine.js usage is confined to FAQ accordion and mobile navigation menu (zero-JS-by-default architecture)

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2"] },
    { "id": 2, "tasks": ["2.1", "3.1"] },
    { "id": 3, "tasks": ["2.2", "2.3", "3.2"] },
    { "id": 4, "tasks": ["2.4", "2.5"] },
    { "id": 5, "tasks": ["5.1", "5.2", "6.1", "6.2", "6.3"] },
    { "id": 6, "tasks": ["7.1", "7.2", "7.3", "8.1", "8.2", "8.3"] },
    { "id": 7, "tasks": ["9.1"] },
    { "id": 8, "tasks": ["9.2"] },
    { "id": 9, "tasks": ["11.1", "11.2", "11.3"] },
    { "id": 10, "tasks": ["13.1", "13.2"] }
  ]
}
```
