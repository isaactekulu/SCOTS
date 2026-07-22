# SCOTS Digital Catalogue

A premium one-page digital catalogue website for the **Southern Community Orthopedic Triage Service (SCOTS)**. Built with Astro, Tailwind CSS, and Alpine.js — targeting perfect Lighthouse scores and Cloudflare Pages deployment.

## Prerequisites

- Node.js 18.14.1 or higher
- npm 9+

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build static site to `dist/` |
| `npm run preview` | Preview the production build locally |

## Project Structure

```
scots-digital-catalogue/
├── public/
│   ├── robots.txt
│   ├── favicon.ico
│   └── og-image.png
├── src/
│   ├── components/        # Astro components
│   │   ├── NavigationBar.astro
│   │   ├── HeroSection.astro
│   │   ├── FeaturedCollection.astro
│   │   ├── ProductCategories.astro
│   │   ├── FeaturedProducts.astro
│   │   ├── AboutSection.astro
│   │   ├── WhyChooseUs.astro
│   │   ├── TestimonialsSection.astro
│   │   ├── FAQSection.astro
│   │   ├── ContactSection.astro
│   │   ├── Footer.astro
│   │   ├── ProductCard.astro
│   │   ├── CategoryCard.astro
│   │   ├── TestimonialCard.astro
│   │   ├── SectionTitle.astro
│   │   └── Button.astro
│   ├── data/              # JSON data files
│   │   ├── products.json
│   │   ├── faq.json
│   │   ├── testimonials.json
│   │   └── site-config.ts
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── styles/
│   │   └── global.css
│   ├── types/
│   │   └── index.ts
│   └── utils/
│       ├── validateProducts.ts
│       └── truncateText.ts
├── astro.config.mjs
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Deployment to Cloudflare Pages

### Via Cloudflare Dashboard

1. Push your code to a Git repository (GitHub/GitLab)
2. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com)
3. Go to **Pages** > **Create a project** > **Connect to Git**
4. Select your repository
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js version:** `18` (set in Environment Variables as `NODE_VERSION=18`)
6. Click **Save and Deploy**

### Via Wrangler CLI

```bash
npm install -g wrangler
wrangler pages deploy dist
```

## Customisation

### Adding/Editing Products

Edit `src/data/products.json`. Each entry requires:

```json
{
  "id": "unique-id",
  "name": "Service Name",
  "description": "Description text (max 500 chars)",
  "category": "Assessment | Rehabilitation | Education | Consultation",
  "image": "image URL or path",
  "badge": "Badge Text",
  "featured": true
}
```

Set `featured: true` to display in the Featured sections (max 6 shown).

### Changing Colours

Edit CSS custom properties in `src/styles/global.css`:

```css
:root {
  --color-primary: #2563EB;
  --color-primary-hover: #1D4ED8;
  --color-accent: #10B981;
  /* ... other colours */
}
```

### Changing Typography

Edit the font family in `tailwind.config.js` under `theme.extend.fontFamily.sans`.

Update the Google Fonts link in `src/layouts/Layout.astro`.

### Replacing Images

- Hero image: Edit `src/components/HeroSection.astro`
- Product images: Update URLs in `src/data/products.json`
- About image: Edit `src/components/AboutSection.astro`
- OG image: Replace `public/og-image.png`

### Editing FAQ Content

Edit `src/data/faq.json` — each item has a `question` and `answer` field.

### Updating Contact Info

Edit `src/data/site-config.ts` to update email, phone, address, locations, and social links.

## Technology Stack

- **Framework:** [Astro](https://astro.build) (static output)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Interactivity:** [Alpine.js](https://alpinejs.dev) (FAQ accordion, mobile menu only)
- **Language:** TypeScript
- **Deployment:** Cloudflare Pages

## Performance

- Zero JavaScript by default (Astro Islands architecture)
- Alpine.js loaded only for interactive components
- Lazy-loaded images with explicit dimensions
- CSS-only animations with `prefers-reduced-motion` support
- Preloaded Inter font with system fallback

## Accessibility

- Semantic HTML5 landmarks
- WCAG 2.1 AA colour contrast
- Keyboard navigable with visible focus indicators
- ARIA labels and roles throughout
- Screen reader friendly

## License

All rights reserved. Southern Community Orthopedic Triage Service (SCOTS).
