# WasteMatch: Frontend Prototype Build Plan (for Antigravity)

> Paste this whole file into Antigravity as the project brief (or save it as `AGENTS.md` / `docs/BUILD_PLAN.md` in the repo). Work phase by phase. After each phase, run the app and check the acceptance criteria before moving on.

---

## 0. What we are building

**WasteMatch** is an AI-powered industrial symbiosis engine. Manufacturing SMEs upload messy waste data. The system fingerprints it, finds the best multi-party matches with a constraint solver, and settles the deal through escrow plus delivery verification.

This is a **frontend-only, demo-grade prototype**. There is **no real backend, AI, solver, or blockchain**. Everything is simulated with realistic dummy data, fake loading states, and scripted animations. The goal is a polished 3 to 5 minute live demo that makes judges understand the full pipeline.

**Hard rules**
- No real API calls. All "backend" behaviour lives in a `src/mock/` layer behind async functions that return after a short delay, so a real backend can replace them later without touching the UI.
- Every screen must work with no network (no remote images, no external fonts required at runtime. Bundle fonts locally or use system fonts).
- Show a small, unobtrusive **"Simulated data"** badge in the footer or header. Do not present dummy numbers as real measurements.
- Desktop-first (1440x900 and 1920x1080 projector), but must not break at 1280 width.
- The app must never crash during the demo. Wrap screens in error boundaries and make every button do something visible.

---

## 1. Tech stack

- Vite + React 18 + TypeScript
- Tailwind CSS (utility styling) and shadcn/ui components where helpful
- React Router (3 main routes plus a landing page)
- Framer Motion (transitions, step animations)
- Recharts (impact and cost charts)
- lucide-react (icons)
- Zustand (small global store for the demo state: current deal, current step)
- No map tiles. Draw the network/map as custom SVG so it works offline

Project layout:

```
src/
  main.tsx, App.tsx, routes.tsx
  components/        # shared UI (Card, Badge, Stat, Stepper, SimulatedBadge...)
  features/
    landing/
    generator/       # Screen 1
    matching/        # Screen 2
    settlement/      # Screen 3
  mock/
    data.ts          # all dummy entities
    api.ts           # fake async functions (ingestFile, runOptimizer, verifyDelivery...)
    types.ts         # TypeScript types matching the real future API
  store/demoStore.ts
  styles/
```

---

## 2. Design direction

- Match the pitch deck: **red and white** brand. Primary red `#D1343A`, deep red `#A81818`, plus neutral slate greys and a soft off-white background `#F8F6F5`. Use green only for "pass / verified / savings", amber for "warning", never as a brand colour.
- Feel: clean industrial-fintech dashboard. Rounded-2xl cards, subtle shadows, generous spacing, big readable numbers (it will be shown on a projector).
- Typography: one bold display font for headings plus a clean sans for body. Bundle locally (e.g. `@fontsource/inter` and `@fontsource/poppins`).
- Top bar on every screen: WasteMatch logo (text wordmark), 3-step progress (1 Fingerprint, 2 Match, 3 Settle), and a **"Run guided demo"** button.
- Micro-interactions: skeleton loaders, number count-up, progress bars for "AI processing", confetti or checkmark pulse on successful verification.

---

## 3. Data model (src/mock/types.ts)

```ts
type HazardClass = 'Non-hazardous' | 'Corrosive' | 'Flammable' | 'Toxic' | 'Mixed';

interface WasteFingerprint {
  id: string;
  generatorId: string;
  material: string;            // "Spent pickle liquor (HCl)"
  quantityTonnes: number;
  physicalState: 'Solid' | 'Liquid' | 'Sludge' | 'Powder';
  hazardClass: HazardClass;
  confidence: number;          // 0-1 overall extraction confidence
  params: Record<string, { value: number | string; unit?: string; confidence: number; source: 'photo' | 'lab_pdf' | 'nir_scan' | 'voice_note' }>;
  // 50 parameters total in the concept. Show ~12 key ones in UI, rest behind "View all 50".
}

interface Party { id: string; name: string; type: 'generator' | 'receiver'; city: string; state: string; lat: number; lng: number; industry: string; }

interface MatchOption {
  id: string; receiverId: string; wasteIds: string[];
  compatibilityScore: number;       // 0-100
  rulesPassed: number; rulesTotal: number;
  rulesChecked: { rule: string; source: 'EU BREF' | 'EPA' | 'CPCB'; status: 'pass' | 'warn' | 'fail'; note: string }[];
  distanceKm: number; truckFillPct: number;
  revenuePerTonne: number;          // INR, can be negative (disposal fee avoided)
  disposalCostAvoided: number; netBenefit: number; co2SavedTonnes: number;
  recommended: boolean;
}

type EscrowStage = 'Locked' | 'In transit' | 'Delivered' | 'Verifying' | 'Verified' | 'Released';

interface Deal {
  id: string; matchId: string; amountInr: number; stage: EscrowStage;
  telemetry: { t: string; lat: number; lng: number; tempC: number; sealIntact: boolean }[];
  verification?: { result: 'PASS' | 'FAIL'; checks: { name: string; expected: string; measured: string; pass: boolean }[] };
  certificate?: { id: string; type: 'Carbon' | 'Plastic'; tonnes: number; standard: string; issuedAt: string; txHash: string };
}
```

---

## 4. Dummy data (src/mock/data.ts)

Use realistic Indian SME context (Delhi NCR plus neighbouring states). Label every number as sample data.

**Generators (use 4 to 5)**
1. *Shree Ganesh Galvanizers*, Ghaziabad, UP: spent pickle liquor (HCl-based, acidic, ~12 t/month)
2. *Bharat Paper & Board Mills*, Muzaffarnagar, UP: alkaline caustic sludge (~9 t/month)
3. *Rana Plastics*, Faridabad, HR: mixed polyolefin plastic scrap (~15 t/month)
4. *Krishna Textile Processing*, Panipat, HR: dye-house sludge (~7 t/month)
5. *Singh Foundry Works*, Ludhiana, PB: spent foundry sand (~20 t/month)

**Receivers (use 3 to 4)**
1. *Aravali Cement Works (co-processing kiln)*, Rajasthan: accepts alkaline and acidic wastes with calorific and chloride limits
2. *GreenBrick Industries*, UP: foundry sand and sludge as brick filler
3. *EcoPoly Recyclers*, Haryana: clean plastic scrap
4. *NeutraChem Solutions*, Gujarat: acid recovery

**Hero scenario (the demo story)**: Shree Ganesh's acidic pickle liquor and Bharat Paper's alkaline sludge are individually "unprofitable" half-truck loads. The solver **bundles both into one full truck** to Aravali Cement Works for shared hazmat transit. This is exactly the example in the deck. The UI should make that moment a highlight.

Provide 3 to 4 `MatchOption`s for the hero waste, with the bundled option marked `recommended`, for example: 94 compatibility, 487 of 500+ rules passed (never show a fake "500 of 500". Include 2 or 3 warnings with notes), truck fill 92%, net benefit positive vs. the baseline disposal cost.

Fingerprint sample (show these ~12 in the UI): pH, chloride (ppm), calorific value (MJ/kg), moisture %, Fe, Zn, Pb, Cr (ppm), viscosity, flash point, density, hazard class. Each with a confidence value and a source icon (photo / lab PDF / NIR / voice).

---

## 5. Screens

### Screen 0: Landing (`/`)
- Hero: "Turn waste disposal costs into resource revenue."
- Problem stat cards (from the deck, animated count-up): **₹252 lakh crore/year** of valuable material landfilled; **70%** of industrial waste has a viable secondary use.
- 3 pipeline cards (Fingerprint, Optimize, Settle) with icons.
- Two CTAs: **Start demo** (goes to Screen 1) and **Run guided demo** (auto-play).
- SDG chips: 9.4, 12.5, 8.4.

### Screen 1: Generator Portal (`/generator`)  *Engine 1: Ingestion & Fingerprinting*
Left: upload panel with 4 input tiles (Photo, Lab report PDF, NIR scan, Voice note). Include a **"Load sample data"** button per tile so the demo never depends on real files. Accept real file drops too, but ignore content and just show the simulated result.

Interaction flow:
1. User clicks "Load sample" or drops a file. The file appears as a card with a thumbnail or icon.
2. Click **Analyze**. Show a 3 to 4 second multi-step progress ("Reading lab PDF", "Analyzing pile photo", "Parsing NIR spectrum", "Transcribing voice note", "Building fingerprint").
3. Right panel reveals the **WasteFingerprint**: key parameter grid with confidence bars and source icons, hazard class badge, quantity, physical state, and a radar chart or spectrum-style chart.
4. A "View all 50 parameters" drawer with a searchable table.
5. Low-confidence items get an amber "Verify" flag the user can click to edit (shows a human-in-the-loop story).
6. Primary CTA: **Find matches** (goes to Screen 2).

### Screen 2: Match Engine and Receiver Dashboard (`/matching`)  *Engine 2: Optimization*
Two modes in tabs: **Generator view** and **Receiver view**.

Generator view:
- Top: **"Run optimizer"** button. On click, show a solver-style animation (candidate count ticking up, constraint satisfaction bars, "Searching global optimum..."), about 3 seconds.
- Center: an SVG **network map** of India with generator nodes (left, red) and receiver nodes (right, dark), edges animating to show candidate matches. The winning bundle edge highlights and the two generators merge into one truck icon heading to the cement kiln.
- Right: ranked list of `MatchOption` cards with compatibility score ring, rules passed, distance, truck fill bar, net benefit in ₹, CO2 saved. The recommended one has a "Best bundle" badge.
- Click a card to open a **Compatibility detail drawer**: the rule-check list (EU BREF / EPA / CPCB) with pass / warn / fail icons and notes.
- A **Baseline vs Optimized** comparison (two small bars or a Recharts bar chart): "Ship alone (half-truck, disposal fee)" vs "Bundled (full-truck, revenue)".
- CTA: **Accept match and lock escrow** (goes to Screen 3).

Receiver view:
- Incoming offers table for Aravali Cement Works: material, tonnes, hazard class, compatibility, price offered, ETA. Accept / Decline buttons that update row state.
- Small capacity and acceptance-limits panel (chloride limit, calorific minimum) with the incoming waste's values shown against the limits, in green or amber.

### Screen 3: Settlement and Verification (`/settlement`)  *Engine 3: Trust*
- Top: horizontal **escrow stepper**: Locked, In transit, Delivered, Verifying, Verified, Released. Current stage is highlighted.
- Left: deal summary card (parties, amount in ₹, material, tonnes) plus an "Escrow contract" box showing a fake contract address and chain label (e.g. "Base (testnet), simulated").
- Center: **live transit panel**: simulated truck moving along an SVG route with timestamps, temperature, and "seal intact" telemetry ticking in. Add a **"Simulate delivery"** button that fast-forwards.
- On delivery: **AI test-strip verification** card. Show 3 to 4 checks (pH within range, chloride below limit, no unexpected contaminant, visual match) with expected vs measured and pass/fail ticks. Add a toggle **"Demo: force FAIL"** to show the failure path (funds stay locked, dispute flow shown).
- On PASS: payment auto-releases with a clear animation, then a **Carbon / Plastic credit certificate** appears (printable-looking card: certificate ID, tonnes, "Verra / Gold Standard aligned" label, fake tx hash, QR placeholder). Add a "Download PDF" button that triggers `window.print()` on the certificate.
- Bottom: **Impact summary** (₹ saved or earned, CO2 avoided, tonnes diverted from landfill) with count-up numbers.

---

## 6. Guided demo mode

A floating **"Run guided demo"** control that auto-plays the whole story in about 3 minutes: load sample data, analyze, run optimizer, accept the bundle, simulate delivery, PASS, certificate. Include a pause/skip control and a caption bar at the bottom narrating each step in one line. This is the safety net if live clicking goes wrong.

---

## 7. Build phases (give Antigravity one at a time)

**Phase 1: Foundation.** Scaffold Vite + React + TS + Tailwind + shadcn. Set up routes, layout, top bar with stepper, theme tokens, Zustand store, and the `mock/` folder with types and all dummy data.
*Accept:* app runs, 4 routes navigate, theme matches the red/white brand, data file type-checks.

**Phase 2: Landing + Generator Portal.** Build Screen 0 and Screen 1 with the full simulated analyze flow and fingerprint view.
*Accept:* sample data load, analysis animation, fingerprint grid with confidence bars, 50-parameter drawer, "Find matches" navigates.

**Phase 3: Matching screen.** Build the SVG network map, optimizer animation, match cards, compatibility drawer, baseline vs optimized chart, and receiver view.
*Accept:* hero bundling moment is visually clear, all cards and drawers work, tab switch works.

**Phase 4: Settlement screen.** Escrow stepper, transit simulation, verification card with PASS and forced-FAIL paths, certificate, impact summary.
*Accept:* full pass path ends with certificate, FAIL path shows locked funds and dispute message, print works.

**Phase 5: Guided demo and polish.** Auto-play mode with captions, empty and loading states, error boundaries, animation polish, responsive check at 1280 / 1440 / 1920, favicon and title, remove console errors.
*Accept:* guided demo runs end to end with no manual input, three times in a row, with no errors.

**Phase 6: Packaging.** README (what is real vs simulated, how to run, how a real backend plugs into `mock/api.ts`), `npm run build` passes, and optionally a deploy to Vercel or Netlify so there is a backup link.

