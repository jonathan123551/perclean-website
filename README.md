# Per Clean - E-Commerce Storefront

This repository contains the completely redesigned frontend experience for the **Per Clean** e-commerce platform. It features a highly cinematic scroll-driven hero sequence, native mobile-first execution, full Arabic (RTL) support, and a complete catalog integrated with basic WhatsApp ordering.

## Project Structure
- `/index.html` - English homepage and cinematic scroll experience
- `/ar/index.html` - Arabic (RTL) homepage and cinematic scroll experience
- `/assets/perclean.css` - Custom styling including cinematic gradient backgrounds and mobile-first responsive design
- `/assets/perclean.js` - GSAP ScrollTrigger animations and basic cart/WhatsApp integration
- `/assets/logo.png` - Official Per Clean brand logo

## Tech Stack
- HTML5 / CSS3 / JavaScript (ES6)
- **GSAP (GreenSock)** + **ScrollTrigger** for high-performance cinematic scroll animations
- No heavy frameworks (React/Vue/etc.) keeping the site extremely lightweight and fast.

## Features
- **Cinematic Transformation:** A scroll-driven "MESS → CLEAN" storytelling hero where the official brand logo acts as the catalyst for the visual transition.
- **Interactive Solutions Stage:** Replaces standard product grids with an engaging, single-stage interaction that highlights flagship products.
- **Complete Real Catalog:** Uses ground-truth product data (titles, variants, prices, and images) restored from the original Shopify `all_products.json`.
- **Cart & WhatsApp Integration:** Fully functional client-side cart logic that outputs a formatted WhatsApp order to the business number.
- **True Mobile-First UX:** Layouts, fonts, menus, and grid behaviors natively built for 320px-430px screens first, scaling gracefully to desktop.

## Data Source
All products, pricing, and images in this build were sourced from `all_products.json` derived directly from the client's current Shopify infrastructure. No fabricated claims or fake data exist on the UI.

## How to Run Locally
Since this is purely static HTML/CSS/JS, simply open `index.html` in any modern web browser or run a simple local web server:
```bash
npx serve .
```

## How to Build
No build step is required (e.g. no Webpack or Vite compilation). The files in this repository are production-ready.

## How to Deploy
The project is currently deployed automatically using Surge.sh.
To push updates:
```bash
npx surge . perclean-official.surge.sh
```

## Current Public URL
**https://perclean-official.surge.sh/**
