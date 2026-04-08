# ChiroVision — Marketing & Trial Signup Site

A focused, single-page SaaS landing site for **ChiroVision**, Dr. Eric Feintuch's diagnostic imaging software for chiropractors. Built with Vite + React + TypeScript + Tailwind + shadcn/ui.

This is project #2 of two. The companion project, **Picture Perfect Health** (the parent corporate-wellness business), lives in `../pph`.

---

## 1. Tech Stack

- **Vite 5** + **React 18** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui** (CSS variables)
- **react-helmet-async** — per-page meta + JSON-LD (SoftwareApplication schema)
- **react-hook-form** + **zod** — trial signup form validation
- **next-themes** — dark mode toggle
- **sonner** — toast notifications
- **lucide-react** — icons
- **Single-page anchor navigation** (no React Router needed)

---

## 2. Quick Start

```bash
npm install
npm run dev
# → http://localhost:5174
```

ChiroVision runs on port **5174** so it doesn't conflict with PPH (port 5173).

```bash
npm run build       # production build
npm run preview     # serve the production build locally
```

---

## 3. Project Structure

```
chirovision/
├── public/                 # Static assets, favicon, robots.txt, sitemap.xml
├── src/
│   ├── main.tsx            # React root with HelmetProvider + ThemeProvider
│   ├── App.tsx             # Header + LandingPage + Footer
│   ├── index.css           # Tailwind + cyan/teal/emerald CSS variables
│   ├── pages/
│   │   ├── LandingPage.tsx # Composes all 10 sections in order
│   │   └── NotFoundPage.tsx
│   ├── components/
│   │   ├── ui/             # shadcn primitives (button, card, input, accordion, sheet, etc.)
│   │   ├── layout/         # Header (anchor nav), Footer, ThemeProvider, ThemeToggle
│   │   ├── sections/       # Hero, TrustBadgeRow, FeatureGrid, ScreenshotShowcase,
│   │   │                   #   HowItWorks, TestimonialStrip, PricingTrial,
│   │   │                   #   TrialSignupForm, FAQ, FinalCTA
│   │   └── shared/         # Seo, JsonLd, SectionHeading, UnsplashImage
│   ├── data/               # features, faq, howItWorks, testimonials
│   ├── lib/                # site-config, seo, schema, utils, validators
│   └── types/
└── ...config files
```

---

## 4. Editing Content

### Site-wide info
**File:** `src/lib/site-config.ts`

The single source of truth for the product name, parent company, support email, phone, navigation, and **pricing tiers**. Every section reads from here.

### Pricing tiers
Inside `siteConfig.plans` you'll find `annual` and `monthly` plan objects. **Update the `monthlyEquivalent`, `annualTotal`, and `savings` strings before launch with real ChiroVision rates.**

```ts
plans: {
  annual: {
    monthlyEquivalent: "$79",   // ← change me
    annualTotal: "$948",         // ← change me
    savings: "Save 20%",
    ...
  },
  monthly: {
    monthlyEquivalent: "$99",   // ← change me
    ...
  },
}
```

### Features
**File:** `src/data/features.ts`

The 10 feature cards plus the local-processing spotlight. Each has an icon, title, and description.

### FAQ
**File:** `src/data/faq.ts`

Six trial-focused questions and answers.

### Testimonials
**File:** `src/data/testimonials.ts`

Three placeholder chiropractor quotes — clearly labeled `isPlaceholder: true`. Replace before launch.

### Swapping Unsplash images
All images are hotlinked from Unsplash. Search for `// TODO: replace with real ChiroVision screenshot` to find every placeholder image. Replace the URL with a real product screenshot before launch.

---

## 5. Brand System

ChiroVision uses a **distinct cyan/teal/emerald palette** that matches the existing chirovision.com identity (different from PPH's medical navy).

### Colors (`src/index.css`)
- `--primary` `192 91% 36%` — cyan `#0891b2`
- `--secondary` `188 86% 30%` — teal `#0e7490`
- `--accent` `160 84% 39%` — emerald `#10b981`
- `--background` `0 0% 100%` — pure white (cleaner SaaS aesthetic)

Both light and dark modes are defined. Dark mode toggles via the icon in the header.

### Typography
- **Headings:** Fraunces (serif)
- **Body/UI:** Inter
Both loaded via Google Fonts in `index.html`.

---

## 6. Trial Signup Form (Options AI–style)

The trial signup section (`src/components/sections/TrialSignupForm.tsx`) is patterned after the Options AI signup flow:

- **Two-column layout** (form on left, marketing panel on right)
- **Step 1:** Account info (first/last name, practice, email, phone, providers)
- **Step 2:** Plan selection (Annual / Monthly cards, Annual is "Best value")
- **Single submit button:** "Start my 10-day free trial"

The form is validated with `react-hook-form` + `zod`. On submit it currently:
1. Logs the payload to the browser console
2. Shows a Sonner success toast
3. Resets the form

**Search for `// TODO: connect form backend` to find the submit handler.** To wire a real backend (Formspree / Web3Forms / Resend), see Section 7.

### Pricing tier display
There are TWO places that show pricing:
- **`<PricingTrial>`** — the "Pricing" section above the form (display-only cards)
- **`<TrialSignupForm>`** — the same tiers shown as selectable buttons inside the form

Both read from `siteConfig.plans`, so updating one place updates both.

---

## 7. Wiring a Real Form Backend

The trial signup form currently logs to console. To wire it to a real backend:

### Formspree (zero code, ~2 minutes)
1. Create a free project at [formspree.io](https://formspree.io)
2. In `src/components/sections/TrialSignupForm.tsx`, find the `onSubmit` function
3. Replace the `console.log` with:
   ```ts
   await fetch("https://formspree.io/f/YOUR_FORM_ID", {
     method: "POST",
     body: JSON.stringify(data),
     headers: { "Content-Type": "application/json" },
   });
   ```

### Web3Forms (also zero-code)
Same pattern, different endpoint and `access_key` field.

### Resend / Postmark / SendGrid
Requires a serverless function. Recommended: deploy to Vercel and add `/api/trial-signup.ts`.

---

## 8. SEO

### Per-page meta
The single landing page renders `<Seo />` with `react-helmet-async`. The helper `buildSeo()` in `src/lib/seo.ts` generates the props.

### JSON-LD
Two schemas are emitted on the landing page:
- **`SoftwareApplication`** — full feature list, MedicalApplication category, FreeTrial offer
- **`Organization`** — with PPH as the `parentOrganization`

Both generators live in `src/lib/schema.ts`.

### Validating
1. Run `npm run dev`
2. Open http://localhost:5174
3. View source, find the `<script type="application/ld+json">` blocks
4. Paste each into [Google Rich Results Test](https://search.google.com/test/rich-results)
5. Confirm zero errors

### Sitemap
Static file at `public/sitemap.xml` with one URL (the landing page). Update if you add more routes.

---

## 9. Deploying to Lovable.dev

This project is built specifically to drop into Lovable.dev for previewing.

### Step-by-step

1. **Push to a new GitHub repo:**
   ```bash
   cd chirovision
   git init
   git add .
   git commit -m "Initial ChiroVision landing"
   gh repo create chirovision-landing --private --source=. --push
   ```

2. **Sign in to Lovable.dev** at [lovable.dev](https://lovable.dev) and create a blank project

3. **Connect the new Lovable project to your GitHub repo** (Lovable will sync the code)

4. **Lovable provides a preview URL** — send this to Dr. Feintuch alongside the PPH preview link

### Troubleshooting: "git clone + push over starter" workaround
If Lovable can't import directly, see the same workaround documented in `../pph/README.md` Section 9.

---

## 10. Production Deployment Alternatives

Once Eric approves the demo:
- **Vercel** — fastest, zero config (recommended)
- **Netlify** — also zero config
- **Cloudflare Pages** — zero config, free tier

For all three: import the GitHub repo, hit deploy, point the `chirovision.com` domain at the deployment.

---

## 11. Custom Domain

After deployment, point `chirovision.com` at your hosting provider:
1. Add the domain in your hosting platform's dashboard
2. Update DNS at your registrar (CNAME or nameservers)
3. Wait for propagation

---

## 12. Known TODOs

Search the codebase for these strings:
- `// TODO: replace with real ChiroVision screenshot` — replace Unsplash placeholders with real product screenshots (4 places)
- `// TODO: replace with real testimonial` — replace placeholder chiropractor quotes
- `// TODO: connect form backend` — wire the trial signup to Formspree/Resend
- `// TODO: replace placeholder pricing with real ChiroVision rates from Eric` — update pricing in `site-config.ts`

```bash
grep -rn "TODO:" src/
```

---

## 13. License

© 2026 ChiroVision · A product of Picture Perfect Health, LLC. All rights reserved.
