# Current Antigravity Checkpoint

## Date / Time
2026-10-03 01:22:00 +03:00

## Current Git branch
`main`

## Current commit
`ab948a34fe8309eb4f814136f597ca61149c07bb`

## Git status
```
On branch main
Changes to be committed:
  modified:   ar/index.html
  modified:   assets/perclean.css
  modified:   assets/perclean.js
  modified:   index.html
  [+ product cutouts and brand assets staged]

Changes not staged for commit:
  modified:   ar/index.html
  modified:   assets/perclean.css
  modified:   assets/perclean.js
  modified:   index.html

Untracked files:
  assets/three.min.js
  assets/kitchen_360_dirty.jpg
  assets/kitchen_360_clean.jpg
  assets/dirty_towel.png
  assets/dirty_skillet.png
  assets/kitchen_sponge.png
  assets/foam_texture.jpg
  serve.js
  [test scripts and diagnostic frame captures]
```

## Local URL
http://localhost:4500/

## Arabic URL
http://localhost:4500/ar/

---

## What has been COMPLETED

1. **Local Server Infrastructure**:
   - `serve.js` running on `http://localhost:4500/` and `http://localhost:4500/ar/` with proper MIME routing and no-cache headers.
2. **WebGL Engine Bootstrap**:
   - `assets/three.min.js` installed and verified functioning in browser and headless Chrome with WebGL2/ANGLE acceleration.
   - `<canvas id="cinema-canvas" class="cinema-canvas"></canvas>` integrated into `.hero.opening` on both `index.html` and `ar/index.html`.
3. **Photorealistic 360° Kitchen Environments Generated & Loaded**:
   - `assets/kitchen_360_dirty.jpg`: Authentic Egyptian/Middle Eastern kitchen equirectangular panorama with greasy cutting board, dishes, warm wooden cabinetry, and lived-in cooking stove.
   - `assets/kitchen_360_clean.jpg`: Matching equirectangular panorama of the exact same space, pristine white, sparkling clean with radiant lighting.
4. **Radial Wavefront Shader Transition**:
   - Custom GLSL vertex & fragment shader mapping the equirectangular sphere from inside (`scale(-1, 1, 1)`).
   - Radial clean wave sweeps outward from the countertop impact UV coordinates (`uImpactUv`) with soft edge dispersion (`uRadius`) and shimmering specular edge highlight (`uSheen`).
   - Verified in `shader_wipe.png` and `shader_clean.png`.
5. **Camera Focal Orientation Identified**:
   - Discovered ideal sphere rotation (`sphere.rotation.y = 1.65`) that positions the greasy cutting board and cooking area right in front of the viewer and aligns with the bottle's left-facing trigger nozzle.
6. **5KG Jug Actor Completely Removed**:
   - Deleted `.cinema-jug-stage` (giant red jug) from `index.html`, `ar/index.html`, and `assets/perclean.css`.
   - Replaced climax with the official **Per Clean brand logo** (`assets/logo.png`) and tagline ("A cleaner home. A brighter everyday." / "بيت أنظف. ليوم أفضل.").
7. **E-Commerce & Core Functionality Intact**:
   - 46 products catalog loaded via `assets/products.json`.
   - Shopping bag cart drawer opens, adds items, updates subtotal, and closes without errors.
   - Search box, category filtering, WhatsApp direct contact links, and bilingual Arabic RTL parity (`/ar/`) fully verified with zero console errors.

---

## What is PARTIALLY COMPLETED

1. **Three.js WebGL Integration into `perclean.js`**:
   - **What exists**: Standalone Three.js 360° sphere, custom shader, camera choreography, and particle logic tested and verified in test scripts (`test_render_360.js`, `test_shader_wipe.js`, `test_rot_align.js`, `test_full_choreography.js`).
   - **What is missing**: The Three.js controller function is not yet permanently wired inside `assets/perclean.js`'s main GSAP ScrollTrigger timeline. Currently, `perclean.js` still contains the legacy 2D timeline fallback.
   - **What still needs work**: Move the verified Three.js engine and its `update(progress)` hook into `initCinematicMotion()` in `assets/perclean.js`.

2. **Nozzle Spray Particle System**:
   - **What exists**: 350-point particle geometry with conical dispersion, downward gravity curve, soft radial gradient texture, and additive blending designed.
   - **What is missing**: Need to connect the particle system ray origin using `camera.updateMatrixWorld(true)` with `Raycaster` to ensure particles visibly project from the bottle's 2D nozzle tip to the 3D cutting board surface.
   - **What still needs work**: Fine-tune particle scale and life cycles during Shot 04 (progress 0.48 – 0.62).

3. **Countertop Plane Actors (Towel Slide & Foam Bloom)**:
   - **What exists**: `dirty_towel.png` and `foam_texture.jpg` cutouts in `assets/`.
   - **What is missing**: Final placement of towel slide vector and foam expansion plane on the countertop plane synchronized with the 360 sphere wipe.

---

## What is NOT COMPLETED

1. **Permanent Hookup of 3D Scene into `assets/perclean.js` ScrollTrigger**:
   - Binding `cinemaWorld.update(self.progress)` to the active page scroll event on desktop and mobile.
2. **Mobile Viewport Tuning**:
   - Camera FOV and bottle scale adjustments specifically for 390px mobile screens.
3. **Arabic Viewport Alignment in 3D**:
   - Setting the initial 360 camera pan angle on `/ar/` so the bottle (positioned on the right/left in RTL) has appropriate focal balance.

---

## Known Problems

1. **Current Page Hero Animation Is Still Falling Back to Legacy 2D**:
   - Because `assets/perclean.js` has not had its `init3DCinematicWorld()` hooked up to `ScrollTrigger`, scrolling on `http://localhost:4500/` currently still scrubs the legacy 2D DOM elements rather than the 3D Three.js canvas.
2. **Spray Particles Ray Origin Matrix Update**:
   - When placing 3D particles from 2D screen coordinates, `camera.updateMatrixWorld(true)` must be called before raycasting so particles aren't projected outside the camera frustum.
3. **Some Catalog Product Cutout WebP Images 404**:
   - A few newer product IDs in `products.json` reference cutouts that fall back to placeholder/default catalog images (non-breaking, but visible in console logs).

---

## Files Changed

1. `index.html`:
   - Added Three.js `<script defer src="/assets/three.min.js"></script>`.
   - Replaced old viewport with `<canvas id="cinema-canvas" class="cinema-canvas"></canvas>` inside `#cinema-3d-stage`.
   - Removed `.cinema-jug-stage`.
2. `ar/index.html`:
   - Exact parity updates matching `index.html` with Arabic typography and RTL structure.
3. `assets/perclean.css`:
   - Added styles for `.cinema-3d-stage` and `.cinema-canvas`.
   - Removed all styles related to `.cinema-jug-stage`, `.cinema-jug-img`, `.cinema-jug-shadow`, `.cinema-jug-reflection`.
   - Styled `.cinema-product-stage` with contact shadow and reflection.
4. `assets/perclean.js`:
   - Syntactically verified clean; ready for the Three.js 3D engine hookup.

---

## Assets Added

1. `assets/three.min.js` — Three.js r160 library.
2. `assets/kitchen_360_dirty.jpg` — Equirectangular 360° dirty kitchen panorama.
3. `assets/kitchen_360_clean.jpg` — Equirectangular 360° sparkling clean kitchen panorama.
4. `assets/dirty_towel.png` — Cutout of kitchen dish rag.
5. `assets/dirty_skillet.png` — Cutout of greasy skillet.
6. `assets/kitchen_sponge.png` — Cutout of kitchen sponge.
7. `assets/foam_texture.jpg` — High-contrast surfactant foam lather texture.

---

## Current Animation Architecture

- **Rendering Layer**: WebGL canvas (`#cinema-canvas`) rendered by Three.js inside an inverted equirectangular sphere (`SphereGeometry(60, 64, 44)` with `scale(-1, 1, 1)`).
- **Surface Transformation**: Custom GLSL shader with uniforms `tDirty`, `tClean`, `uRadius`, `uImpactUv`, `uSheen` performing a smooth radial wipe with a specular sheen wavefront glint.
- **Physical Countertop Layer**: Towel mesh (`dirty_towel.png`) and additive foam mesh (`foam_texture.jpg`) on the countertop plane.
- **Particle System**: Conical Points system shooting surfactant aerosol mist from nozzle coordinates to countertop impact coordinates.
- **Scroll Synchronization**: GSAP `ScrollTrigger` pinning `.hero.opening` and scrubbing `progress` from 0.00 to 1.00.
- **DOM Branding Layer**: Grounded 650g bottle (`.cinema-product-stage`) and official Per Clean brand lockup (`.opening-lockup`).

---

## IMPORTANT NEXT STEPS

When resuming:

1. **Insert `init3DCinematicWorld(hero, canvas, isArabic, mobile)` inside `assets/perclean.js`**:
   - Initialize Three.js scene with the 360° sphere and custom shader using `rotation.y = isArabic ? -1.65 : 1.65`.
   - Set up the towel slide and foam plane.
   - Set up the nozzle spray particle system with `camera.updateMatrixWorld(true)`.
2. **Hook 3D Engine to GSAP ScrollTrigger in `perclean.js`**:
   - Inside `film.scrollTrigger.onUpdate(self)`, call `cinemaWorld.update(self.progress)`.
3. **Synchronize Shot 01–06 Timings**:
   - Shot 01 (0.00–0.25): Wide lived-in kitchen, camera dollies forward.
   - Shot 02 (0.25–0.42): Physical camera approach into countertop.
   - Shot 03 (0.42–0.50): Macro low angle on grease & nozzle, callout appears, bottle tilts.
   - Shot 04 (0.50–0.64): Spray mist bursts from nozzle tip to cutting board.
   - Shot 05 (0.64–0.82): Foam blooms, towel slides away, radial clean wave sweeps across the 360° kitchen.
   - Shot 06 (0.82–1.00): Camera pulls back into wide clean kitchen reveal, specular reflection appears under bottle, official Per Clean brand logo rises.
4. **Capture and Verify Final Multi-Device Screenshots**:
   - Desktop English (1440x900)
   - Desktop Arabic (1440x900)
   - Mobile English (390x844)
   - Mobile Arabic (390x844)

---

## DO NOT RESTART FROM SCRATCH

**CONTINUE FROM CURRENT STATE.**
The assets, 360° panoramas, WebGL canvas, and shader math are verified and functional. All work in the next session should build directly upon this foundation.
