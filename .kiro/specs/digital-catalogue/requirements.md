# Requirements Document

## Introduction

A premium one-page digital catalogue website for the Southern Community Orthopedic Triage Service (SCOTS). The website presents SCOTS healthcare service information in an elegant, catalogue-style format — showcasing services, locations, preparation guides, and patient journey information. Built with Astro, Tailwind CSS, and Alpine.js, targeting Cloudflare Pages deployment with perfect Lighthouse scores. This is a static informational site — no ecommerce, no user accounts, no dynamic server-side logic.

## Glossary

- **Catalogue_Site**: The static one-page Astro website presenting SCOTS service information in a premium visual format
- **Navigation_Bar**: The sticky top navigation component that transitions from transparent to solid on scroll and provides smooth scrolling to page sections
- **Hero_Section**: The full-width opening section with headline, supporting text, calls-to-action, and background imagery
- **Product_Card**: A reusable card component displaying a service or program with image, title, description, category badge, and action button
- **Category_Card**: A card component displaying a service category with icon, title, description, and hover interaction
- **Testimonial_Card**: A card displaying patient feedback with avatar, name, review text, and star rating
- **FAQ_Accordion**: An expandable/collapsible content section powered by Alpine.js for frequently asked questions
- **Section_Title**: A reusable heading component with title, optional subtitle, and consistent spacing
- **Design_System**: The set of spacing scales, colour variables, typography, and border radius tokens used across the site
- **Data_Layer**: The JSON file (src/data/products.json) containing structured service data that drives card rendering
- **Alpine_Island**: A minimal Alpine.js interactive component hydrated only where JavaScript is required (FAQ, mobile menu)
- **Lighthouse_Score**: Google's automated audit score for Performance, Accessibility, Best Practices, and SEO (target: 100 across all four)

## Requirements

### Requirement 1: Project Foundation and Build Configuration

**User Story:** As a developer, I want a properly configured Astro project with TypeScript, Tailwind CSS, and Alpine.js, so that I can build and deploy the site to Cloudflare Pages.

#### Acceptance Criteria

1. THE Catalogue_Site SHALL use Astro as the static site generator with TypeScript enabled in strict mode
2. THE Catalogue_Site SHALL use Tailwind CSS for all styling with no inline style attributes or style tags in component templates
3. THE Catalogue_Site SHALL use Alpine.js as the only client-side JavaScript framework, with no other runtime JS frameworks included as dependencies
4. THE Catalogue_Site SHALL be configured with Astro's static output mode and produce a build output in the dist directory deployable to Cloudflare Pages without server-side rendering
5. THE Catalogue_Site SHALL use npm as the package manager with a package.json containing build, dev, and preview scripts and a specified engines field declaring the minimum supported Node.js version
6. THE Catalogue_Site SHALL include a tsconfig.json extending Astro's recommended strict TypeScript base configuration
7. THE Catalogue_Site SHALL include an astro.config.mjs with output set to static and the Tailwind CSS and Alpine.js integrations registered
8. WHEN a developer runs npm run build, THE Catalogue_Site SHALL complete the build process with a zero exit code and produce static HTML, CSS, and JavaScript assets in the dist directory

### Requirement 2: Design System and CSS Variables

**User Story:** As a developer, I want a consistent design system with defined tokens, so that the site maintains visual consistency across all sections.

#### Acceptance Criteria

1. THE Design_System SHALL define all colour values as CSS custom properties on the document root: Background (#FFFFFF), Surface (#F8FAFC), Primary (#2563EB), Primary Hover (#1D4ED8), Text Primary (#111827), Text Secondary (#6B7280), Border (#E5E7EB), Accent (#10B981), Error (#EF4444), Warning (#F59E0B), Success (#22C55E)
2. THE Design_System SHALL use Inter font family with weights 400, 500, 600, 700, and 800, with system sans-serif as the fallback font stack
3. THE Design_System SHALL define a spacing scale using values 4, 8, 12, 16, 24, 32, 48, 64, 96, and 128 pixels
4. THE Design_System SHALL define border radius tokens: Small (4px), Medium (8px), Large (12px), and Extra Large (16px)
5. THE Design_System SHALL integrate all tokens into the Tailwind CSS configuration file for utility class usage

### Requirement 3: Responsive Layout System

**User Story:** As a user, I want the website to display correctly on all devices, so that I can browse SCOTS information from any screen size.

#### Acceptance Criteria

1. THE Catalogue_Site SHALL render without horizontal overflow at viewport widths 320px, 375px, 390px, 768px, 1024px, 1280px, 1440px, and 1920px, and SHALL produce a Cumulative Layout Shift score of no more than 0.1 as measured during initial page load
2. THE Catalogue_Site SHALL use a responsive container component with horizontal padding of no less than 16px on viewports below 768px and no less than 32px on viewports 768px and above
3. WHEN the viewport width is below 768px, THE Catalogue_Site SHALL stack content vertically in a single-column layout and SHALL render all interactive elements with a minimum touch-target size of 44×44 CSS pixels
4. WHEN the viewport width is between 768px and 1023px, THE Catalogue_Site SHALL display grid layouts with 2 columns for card-based sections
5. WHEN the viewport width is 1024px or above, THE Catalogue_Site SHALL display grid layouts with 3 or more columns for card-based sections

### Requirement 4: Navigation Bar

**User Story:** As a user, I want a sticky navigation bar, so that I can quickly jump to any section of the page.

#### Acceptance Criteria

1. THE Navigation_Bar SHALL remain fixed at the top of the viewport during scrolling
2. WHEN the page scroll position is at the top (scroll offset is 0), THE Navigation_Bar SHALL display with a transparent background
3. WHEN the page is scrolled past the Hero_Section, THE Navigation_Bar SHALL display with a solid white background and a visible drop shadow
4. WHEN a navigation link is clicked, THE Catalogue_Site SHALL smooth-scroll to the corresponding section within 1000 milliseconds
5. WHILE a section occupies the largest visible portion of the viewport, THE Navigation_Bar SHALL highlight the corresponding navigation link with a visually distinct style differentiated from inactive links by color, underline, or font weight
6. WHILE the viewport width is below 768px, THE Navigation_Bar SHALL display a hamburger menu button that toggles a mobile navigation menu
7. WHEN a navigation link within the mobile menu is clicked, THE Navigation_Bar SHALL close the mobile menu and smooth-scroll to the corresponding section
8. THE Navigation_Bar SHALL be fully operable using keyboard navigation with focus indicators of at least 2px outline visible on each interactive element
9. THE Navigation_Bar SHALL include ARIA labels that identify the purpose of the mobile menu toggle and a navigation landmark role for the navigation region

### Requirement 5: Hero Section

**User Story:** As a visitor, I want to immediately understand what SCOTS offers, so that I can decide whether this service is relevant to me.

#### Acceptance Criteria

1. THE Hero_Section SHALL display a headline as the most prominent text element, containing no more than 80 characters, communicating the SCOTS value proposition
2. THE Hero_Section SHALL display supporting text of no more than 200 characters explaining the service purpose below the headline
3. THE Hero_Section SHALL display a primary call-to-action button linking to the catalogue browsing section and a secondary call-to-action button linking to the contact or sign-up section
4. THE Hero_Section SHALL display a hero image or illustration with a minimum resolution of 1280×720 pixels
5. WHEN the Hero_Section loads, THE Catalogue_Site SHALL apply a fade-in animation to the content with a duration of 600 milliseconds
6. THE Hero_Section SHALL occupy the full viewport height (100vh) on initial load
7. WHEN the user has enabled prefers-reduced-motion, THE Hero_Section SHALL disable all animations and display content immediately without transition effects
8. IF the hero image fails to load, THEN THE Hero_Section SHALL display a solid background colour as a fallback and remain fully readable

### Requirement 6: Featured Collection Section

**User Story:** As a visitor, I want to see highlighted SCOTS services, so that I can quickly understand the main offerings.

#### Acceptance Criteria

1. THE Catalogue_Site SHALL display a Featured Collection section with a Section_Title containing a heading and subtitle
2. THE Catalogue_Site SHALL render up to 6 Product_Card components from the Data_Layer for items marked as featured, ordered as defined in the Data_Layer
3. WHEN a user hovers over a Product_Card, THE Product_Card SHALL translate upward by 2–4px and increase its box-shadow spread within 200ms
4. THE Product_Card SHALL display a service image (with a consistent aspect ratio across cards), name (maximum 60 characters), description (maximum 120 characters, truncated with an ellipsis if exceeded), category badge, and a "Learn More" button
5. THE Catalogue_Site SHALL display featured items in a responsive grid: single column below 768px, two columns at 768px, three columns at 1024px and above
6. IF no items are marked as featured in the Data_Layer, THEN THE Catalogue_Site SHALL hide the Featured Collection section entirely

### Requirement 7: Product Categories Section

**User Story:** As a visitor, I want to browse SCOTS services by category, so that I can find the type of care relevant to my needs.

#### Acceptance Criteria

1. THE Catalogue_Site SHALL display a Product Categories section with a Section_Title containing a heading and subtitle, followed by categories: Assessment, Rehabilitation, Education, and Consultation
2. THE Category_Card SHALL display a category icon, title, and description with a maximum of 120 characters
3. WHEN a user hovers over a Category_Card, THE Category_Card SHALL apply a hover effect consisting of a visible elevation change (shadow increase) and a scale transform between 1.02 and 1.05
4. THE Catalogue_Site SHALL display Category_Card components in a responsive grid: single column below 768px, two columns at 768px, and four columns at 1024px and above

### Requirement 8: Featured Products Section

**User Story:** As a visitor, I want to see detailed SCOTS programs and services, so that I can learn about specific offerings.

#### Acceptance Criteria

1. THE Catalogue_Site SHALL display a Featured Products section with a grid layout showing at most 6 featured items, rendered in 3 columns on viewports 1024px and above, 2 columns on viewports 768px–1023px, and 1 column on viewports below 768px
2. THE Product_Card SHALL display a prominent image occupying at least 50% of the card area, service name, description truncated to a maximum of 120 characters with an ellipsis, a category badge indicating the product's service category, and a call-to-action button
3. THE Catalogue_Site SHALL render Featured Products from the Data_Layer filtering for items marked as featured, limited to the 6 most recently featured entries
4. THE Catalogue_Site SHALL use responsive image loading with lazy loading for images below the fold
5. IF the Data_Layer contains zero featured items, THEN THE Catalogue_Site SHALL hide the Featured Products section

### Requirement 9: About Section

**User Story:** As a visitor, I want to learn about SCOTS as an organisation, so that I can trust and understand the service.

#### Acceptance Criteria

1. THE Catalogue_Site SHALL display an About section containing the SCOTS brand story, mission statement, and a list of core values
2. THE Catalogue_Site SHALL display at least 3 key statistics about the service (e.g., patients helped, number of locations, programs offered), each presented with a numeric value and descriptive label
3. THE Catalogue_Site SHALL display an image alongside the About content with a minimum resolution of 800×600 pixels
4. THE About section SHALL communicate SCOTS purpose: helping patients with musculoskeletal conditions access the right care, at the right time, in the right place
5. WHEN the viewport is below 768px, THE About section SHALL stack the image below the text content in a single-column layout

### Requirement 10: Why Choose Us Section

**User Story:** As a visitor, I want to see the benefits of SCOTS, so that I understand why the service is valuable.

#### Acceptance Criteria

1. THE Catalogue_Site SHALL display a "Why Choose Us" section with six benefit cards in a grid layout that renders 1 column on viewports narrower than 768px, 2 columns on viewports from 768px to 1023px, and 3 columns on viewports 1024px or wider
2. THE Catalogue_Site SHALL present the following benefits: Premium Quality Care, Sustainable Approach, Fast Service Access, Trusted Professionals, Expert Assessment, Evidence-Based Programs
3. Each benefit card SHALL display an icon with accessible alternative text describing the benefit, a title matching one of the six benefit names, and a description between 20 and 150 characters in length
4. Each benefit card icon SHALL have a non-empty accessible label so that screen readers convey the benefit's meaning to assistive technology users

### Requirement 11: Testimonials Section

**User Story:** As a visitor, I want to read patient testimonials, so that I can gain confidence in the SCOTS service.

#### Acceptance Criteria

1. THE Catalogue_Site SHALL display a Testimonials section with at least 3 Testimonial_Card components
2. THE Testimonial_Card SHALL display a patient avatar placeholder, patient name (maximum 50 characters), review text (maximum 200 characters visible), and a star rating displayed as filled and unfilled star icons on a scale of 1 to 5
3. THE Catalogue_Site SHALL display testimonial cards in a responsive grid layout with 1 column on viewports below 768px, 2 columns on viewports between 768px and 1023px, and 3 columns on viewports 1024px and above
4. IF the review text exceeds 200 characters, THEN THE Testimonial_Card SHALL truncate the text and display an indicator that additional text exists

### Requirement 12: FAQ Section

**User Story:** As a visitor, I want to read answers to common questions about SCOTS, so that I can understand the referral and appointment process.

#### Acceptance Criteria

1. THE Catalogue_Site SHALL display a FAQ section with expandable accordion items, with all items in a collapsed state on initial page load
2. THE FAQ_Accordion SHALL use Alpine.js for expand/collapse functionality
3. WHEN a user clicks a FAQ question, THE FAQ_Accordion SHALL toggle the visibility of the corresponding answer with a transition duration between 200ms and 300ms
4. THE FAQ_Accordion SHALL include questions sourced from the SCOTS pamphlet: Why was I referred, What happens at the appointment, Will I see a surgeon, Why not go straight to a surgeon, What if I think I need surgery, What if I have already trialed physiotherapy, What happens after the assessment, How to prepare for the appointment
5. THE FAQ_Accordion SHALL support keyboard activation of items via Enter and Space keys, and each item SHALL include aria-expanded (true/false) and aria-controls attributes linking the trigger to its associated answer panel
6. IF the user has enabled prefers-reduced-motion, THEN THE FAQ_Accordion SHALL disable transition animations and toggle answer visibility immediately
7. WHEN a user expands a FAQ item, THE FAQ_Accordion SHALL collapse any previously expanded item so that only one answer is visible at a time

### Requirement 13: Contact Section

**User Story:** As a visitor, I want to find SCOTS contact information, so that I can reach the service when needed.

#### Acceptance Criteria

1. THE Catalogue_Site SHALL display a Contact section containing an email address, a phone number, and a physical address as visible text
2. THE Catalogue_Site SHALL display at least 2 social media icon links in the Contact section, where each icon is a clickable link that navigates to the corresponding social media platform
3. THE Catalogue_Site SHALL display a primary call-to-action button in the Contact section that initiates contact with SCOTS (e.g., opens a mail client or navigates to a booking/enquiry destination) and is labelled with action-oriented text indicating its purpose
4. THE Contact section SHALL display the following SCOTS locations as a visible list: Te Kaika Wellbeing Hub, Zingari Richmond Football Club, Nutrition Clinic Otago University, and Chatsford Retirement Village Events Centre
5. WHEN a visitor activates a social media icon link in the Contact section, THE Catalogue_Site SHALL open the linked social media page in a new browser tab

### Requirement 14: Footer

**User Story:** As a visitor, I want a footer with navigation and legal links, so that I can access secondary information and navigate the site.

#### Acceptance Criteria

1. THE Catalogue_Site SHALL display a Footer containing section navigation links that match the main Navigation_Bar links, a copyright notice including the current year, at least 2 social media icon links, and links to Privacy Policy and Terms of Service pages
2. THE Footer SHALL use consistent typography, colour, and spacing from the Design_System
3. THE Footer navigation links SHALL smooth-scroll to corresponding page sections when clicked
4. THE Footer SHALL display in a multi-column layout on viewports 768px and above, and stack vertically on viewports below 768px

### Requirement 15: Data-Driven Content Rendering

**User Story:** As a developer, I want service data stored in a JSON file, so that content can be updated without modifying component code.

#### Acceptance Criteria

1. THE Data_Layer SHALL store all service/product data in src/data/products.json as a JSON array of objects
2. Each entry in the Data_Layer SHALL include the fields: id (unique string), name (string, max 100 characters), description (string, max 500 characters), category (string), image (string representing a relative path or URL), badge (string), and featured (boolean)
3. THE Catalogue_Site SHALL render one Product_Card component for each entry in the Data_Layer by reading from the JSON file at build time
4. THE Catalogue_Site SHALL display entries where the featured field is true in the Featured Collection and Featured Products sections
5. IF an entry in the Data_Layer is missing any required field (id, name, description, category, image, badge, or featured), THEN THE Catalogue_Site SHALL exclude that entry from rendering and proceed with remaining valid entries
6. THE Catalogue_Site SHALL render entries where the featured field is false in the general catalogue listing only, excluding them from featured sections

### Requirement 16: Image Optimization

**User Story:** As a user, I want images to load quickly without layout shift, so that the page feels fast and stable.

#### Acceptance Criteria

1. THE Catalogue_Site SHALL lazy-load all images positioned below the initial viewport (the visible area on page load without scrolling)
2. THE Catalogue_Site SHALL define explicit width and height attributes on all image elements such that Cumulative Layout Shift (CLS) attributed to images does not exceed 0.1
3. THE Catalogue_Site SHALL display responsive image placeholders that match the intrinsic aspect ratio of the final loaded image, reserving the exact space required before the image finishes loading
4. WHERE the build pipeline supports WebP or AVIF output, THE Catalogue_Site SHALL serve images in those formats and SHALL provide a fallback source in JPEG or PNG for browsers that do not support them
5. IF an image fails to load, THEN THE Catalogue_Site SHALL display a fallback placeholder that preserves the reserved dimensions and provides an accessible alt text indication that the image is unavailable

### Requirement 17: Animations and Motion

**User Story:** As a visitor, I want subtle animations that enhance the browsing experience, so that the site feels polished and modern.

#### Acceptance Criteria

1. WHEN a section scrolls into the viewport by at least 20% of its height, THE Catalogue_Site SHALL apply an entrance animation (fade, slide, or scale) with a duration between 200ms and 500ms
2. WHEN the user hovers over an interactive card component, THE Catalogue_Site SHALL apply a vertical lift effect of 2–8px with a transition duration between 150ms and 300ms
3. IF the user's system has prefers-reduced-motion enabled, THEN THE Catalogue_Site SHALL disable all animations and transitions except immediate state changes (such as color and opacity changes with 0ms duration)
4. THE Catalogue_Site SHALL use CSS transitions and animations exclusively, avoiding JavaScript animation libraries
5. THE Catalogue_Site SHALL ensure that entrance animations do not cause visible layout shifts to surrounding content

### Requirement 18: Accessibility Compliance

**User Story:** As a user with assistive technology, I want the site to be fully accessible, so that I can navigate and understand all content.

#### Acceptance Criteria

1. THE Catalogue_Site SHALL use semantic HTML5 elements (header, nav, main, section, article, footer) throughout the page structure, with exactly one main element per page and no content placed outside of semantic landmark elements
2. THE Catalogue_Site SHALL maintain a proper heading hierarchy (h1 through h6) without skipping levels, with exactly one h1 per page that describes the page purpose
3. THE Catalogue_Site SHALL provide alt text for all informative images with a maximum length of 150 characters describing the image content, and decorative images SHALL use an empty alt attribute (alt="")
4. THE Catalogue_Site SHALL maintain colour contrast ratios meeting WCAG 2.1 AA standards (minimum 4.5:1 for normal text below 18pt, minimum 3:1 for large text at or above 18pt or bold text at or above 14pt)
5. THE Catalogue_Site SHALL display visible focus indicators on all interactive elements during keyboard navigation, with focus indicators having a minimum contrast ratio of 3:1 against adjacent colours and a minimum outline width of 2px
6. THE Catalogue_Site SHALL include ARIA landmark roles and labels for major page regions, with each landmark region having a unique accessible name when multiple landmarks of the same type exist on a page
7. THE Catalogue_Site SHALL support full keyboard navigation of all interactive elements in a logical reading order using Tab, Shift+Tab, Enter, Space, and Arrow keys without creating keyboard traps
8. IF an interactive element lacks a visible text label, THEN THE Catalogue_Site SHALL provide an accessible name via aria-label or aria-labelledby that describes the element's purpose in 80 characters or fewer
9. WHEN page content updates dynamically without a full page reload, THE Catalogue_Site SHALL announce the change to assistive technologies using an ARIA live region with appropriate politeness level (polite for non-urgent updates, assertive for error messages)

### Requirement 19: SEO and Metadata

**User Story:** As the SCOTS service, I want the website to be search-engine optimised, so that patients can find the service online.

#### Acceptance Criteria

1. THE Catalogue_Site SHALL include a meta title of no more than 60 characters and a meta description of no more than 160 characters in the HTML head
2. THE Catalogue_Site SHALL include Open Graph meta tags (og:title, og:description, og:image, og:url, og:type) and Twitter Card meta tags (twitter:card, twitter:title, twitter:description, twitter:image) for social sharing
3. THE Catalogue_Site SHALL include a canonical URL meta tag pointing to the production domain
4. THE Catalogue_Site SHALL generate a robots.txt file permitting all crawlers with a reference to the sitemap location
5. THE Catalogue_Site SHALL generate a sitemap.xml file listing all page URLs with lastmod dates
6. THE Catalogue_Site SHALL include JSON-LD structured data for the SCOTS organisation using the MedicalOrganization schema type with name, url, address, and service area fields

### Requirement 20: Performance Optimisation

**User Story:** As a user, I want the site to load instantly, so that I can access SCOTS information without waiting.

#### Acceptance Criteria

1. WHEN tested with Lighthouse in mobile emulation mode, THE Catalogue_Site SHALL achieve a Performance score of 100 on every page of a production build
2. WHEN tested with Lighthouse in mobile emulation mode, THE Catalogue_Site SHALL achieve an Accessibility score of 100 on every page of a production build
3. WHEN tested with Lighthouse in mobile emulation mode, THE Catalogue_Site SHALL achieve a Best Practices score of 100 on every page of a production build
4. WHEN tested with Lighthouse in mobile emulation mode, THE Catalogue_Site SHALL achieve an SEO score of 100 on every page of a production build
5. THE Catalogue_Site SHALL load no more than 50 KB of total JavaScript (compressed) on any page by using Astro Islands architecture, loading Alpine.js only on components that require interactive behaviour
6. THE Catalogue_Site SHALL apply tree shaking and minification during the build process
7. THE Catalogue_Site SHALL preload the Inter font family so that no flash of unstyled text is visible for longer than 100 milliseconds after first contentful paint
8. IF the preloaded Inter font fails to load within 3 seconds, THEN THE Catalogue_Site SHALL render text using the system sans-serif fallback font without blocking page display

### Requirement 21: Project File Structure

**User Story:** As a developer, I want a clean, maintainable project structure, so that the codebase is easy to navigate and extend.

#### Acceptance Criteria

1. THE Catalogue_Site SHALL organise source code in the following directory structure: src/components/, src/layouts/, src/pages/, src/styles/, src/assets/, src/data/, src/content/
2. THE Catalogue_Site SHALL include configuration files at the root: astro.config.mjs, tailwind.config.js, tsconfig.json, package.json
3. THE Catalogue_Site SHALL include a public/ directory for static assets containing at minimum: robots.txt, favicon.ico, and at least one Open Graph social image
4. THE Catalogue_Site SHALL use consistent PascalCase naming for component files (e.g., ProductCard.astro) and kebab-case for utility and data files (e.g., products.json)
5. THE Catalogue_Site SHALL include a README.md at the root with installation, development, build, and deployment instructions
