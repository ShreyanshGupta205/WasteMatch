# WasteMatch MVP — Industrial Symbiosis & Co-Processing Platform

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FShreyanshGupta205%2FWasteMatch)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)](https://github.com/ShreyanshGupta205/WasteMatch)
[![Framework: Vite + React](https://img.shields.io/badge/Framework-Vite%20%2B%20React-blue.svg)](https://vitejs.dev/)
[![Compliance: Hazardous Waste Rules 2016](https://img.shields.io/badge/Compliance-CPCB%20%2F%20SPCB%202016-emerald.svg)](https://cpcb.nic.in/)

> **AI-Powered Industrial Waste Matching Engine connecting waste generators with verified co-processors under Indian Environmental Regulations (Hazardous Waste Rules 2016).**

WasteMatch enables small and mid-sized manufacturing facilities to convert hazardous waste disposal costs into secondary raw material revenue through AI chemical fingerprinting, match optimization, tripartite escrow, digital Form 10 manifests, and statutory diversion certificates.

---

## 🔒 HARD CONSTRAINT: EXACTLY 3 DASHBOARDS ONLY

WasteMatch enforces a strict 3-role access model. **Transporters and testing laboratories are reference directory entities, NOT dashboard roles.**

| Dashboard Role | Base Route | Key Responsibilities |
| :--- | :--- | :--- |
| **1. Seller / Waste Generator** | `/seller` | Stream onboarding, AI fingerprinting, **"Find Labs Near Me"** NABL referral, Form 10 manifest creation, TREM cards, transporter selection, manual transit status updates, and SPCB Form 3 audit pack export. |
| **2. Buyer / Receiver** | `/buyer` | SPCB co-processing permit verification, material acceptance envelopes, incoming match negotiation, Gate QC chemical inspection, Form 10 Copy 4 receipt upload, escrow disbursement trigger, and Diversion Certificate issuance. |
| **3. Admin Dashboard** | `/admin` | Global KYC scrutiny, SPCB authorization verification, platform escrow monitoring, dispute arbitration queue, NABL lab directory maintenance, and transporter fleet directory management. |

---

## 🚫 Anti-Features (Strictly Honored)

- **NO Transporter Dashboard**: Transporters do not have logins or platform dashboards. They are registered in an admin-curated reference directory. Form 10 manifests are issued by generators with transporter contact details displayed.
- **NO Lab Dashboard**: Laboratories do not have platform logins or booking flows. Waste generators contact labs independently using the directory and upload the resulting assay PDF.
- **NO Real Payment Gateway**: Settlement utilizes a simulated tripartite escrow service (ICICI Bank Custodial Trust) with fund holding, release on Gate QC Pass, and dispute freezes.
- **NO Physical GPS Hardware Integration**: Transit status is manually updated by generators and buyers ("Picked Up", "In Transit", "Delivered").

---

## 🧪 "Find Labs Near Me" Referral Flow

When an industrial waste stream has **no lab report uploaded** or has **low AI confidence**:
1. A prominent **"Find Labs Near Me"** button is displayed on the waste stream card in `/seller/streams`.
2. Clicking the button opens the **Partner NABL-Accredited Labs Referral Modal** (or redirects to `/seller/labs`).
3. The generator inspects nearby accredited facilities (e.g. Shriram Institute, SGS India), viewing distance, test scopes (TCLP, ICP-OES, Calorimetry), indicative pricing, and phone contacts.
4. The generator commissions the test offline.
5. Once obtained, the seller uploads the PDF via the stream's **"Upload Lab Report"** field, which automatically reprocesses the AI fingerprint to **High Confidence** across all parameters.

---

## 📜 Indian Statutory & Regulatory Compliance

- **Hazardous and Other Wastes (M&THM) Rules, 2016**:
  - **Form 10 Manifest System (Rule 19)**: Manifest Copy 1–7 pre-filled by generator; Copy 4 signed by receiver upon delivery.
  - **Form 3 Annual Returns**: Automated 1-click audit pack export containing all manifests, certificates, and transit records.
  - **Central Motor Vehicles Rules (CMVR) Rule 129**: Pre-generated Transport Emergency (TREM) cards detailing UN numbers, PPE requirements, and HazChem spill protocols.
  - **Diversion Certificates**: Issued by the authorized co-processor (e.g. cement kiln clinkering), certifying landfill avoidance and fossil fuel substitution.

---

## 🔑 Demo Personas & Credentials

You can switch between all 3 personas instantly using the **Quick Role Switcher** at the top of every dashboard or via `/login`:

| Persona | Role | Email | Password | Facility / Details |
| :--- | :--- | :--- | :--- | :--- |
| **Rajesh Kumar** | `seller` | `seller@shreeganesh.com` | `demo123` | Shree Ganesh Galvanizers Plant #2 (Ghaziabad, UP) • SPCB: `UPPCB/HW/GZB/2024/7741` |
| **Vikramaditya Rathore** | `buyer` | `buyer@aravalicement.com` | `demo123` | Aravali Cement Works AFR Kiln (Nimbahera, RJ) • 450 MT/mo quota • SPCB: `RSPCB/HW/AFR/2023/11` |
| **Operations Admin** | `admin` | `admin@wastematch.com` | `demo123` | Central Platform Compliance Administration & Escrow Custody |

---

## 🏗️ Architecture & Tech Stack

```
WasteMatch-main/
├── src/
│   ├── components/
│   │   └── dashboard/
│   │       ├── DashboardHeader.tsx       # 1-click role switcher bar
│   │       ├── DashboardLayout.tsx       # Shared shell switching sidebars dynamically
│   │       ├── SellerSidebar.tsx         # Dashboard 1 navigation
│   │       ├── BuyerSidebar.tsx          # Dashboard 2 navigation
│   │       └── AdminSidebar.tsx          # Dashboard 3 navigation
│   ├── features/
│   │   ├── auth/
│   │   │   └── LoginPage.tsx             # 3-persona login screen
│   │   ├── seller/                       # Dashboard 1: Seller / Generator
│   │   │   ├── SellerOverview.tsx
│   │   │   ├── SellerKyc.tsx
│   │   │   ├── SellerStreams.tsx         # Stream creation + "Find Labs Near Me" button
│   │   │   ├── SellerLabReferralModal.tsx# NABL lab directory popup & PDF assay reprocessor
│   │   │   ├── SellerLabsPage.tsx        # Dedicated lab directory page
│   │   │   ├── SellerMarketplace.tsx     # Match offers & price negotiation
│   │   │   ├── SellerShipments.tsx       # Form 10, TREM card, manual status updates
│   │   │   └── SellerSettlement.tsx      # Escrow tracking, tax invoices, Form 3 audit pack
│   │   ├── buyer/                        # Dashboard 2: Buyer / Receiver
│   │   │   ├── BuyerOverview.tsx
│   │   │   ├── BuyerKyc.tsx              # SPCB co-processing authorizations
│   │   │   ├── BuyerProfile.tsx          # Material acceptance envelopes & monthly quota
│   │   │   ├── BuyerMatches.tsx          # Incoming compatibility feed
│   │   │   ├── BuyerDeliveries.tsx       # Inbound deliveries, Form 10 Copy 4, Gate QC, Escrow release
│   │   │   └── BuyerPayments.tsx         # Escrow pre-funding & transaction ledger
│   │   └── admin/                        # Dashboard 3: Admin
│   │       ├── AdminOverview.tsx         # Impact KPIs (MT diverted, CO2e, GMV)
│   │       ├── AdminUsers.tsx            # KYC verification queue (Approve/Reject with reason)
│   │       ├── AdminTransactions.tsx     # Escrow monitor & dispute arbitration queue
│   │       ├── AdminLabDirectory.tsx     # NABL partner lab management (Reference only)
│   │       ├── AdminTransporterDirectory.tsx # Hazardous fleet directory (Reference only)
│   │       └── AdminCompliance.tsx       # Interstate transit alerts, permit tracking, audit exports
│   ├── store/
│   │   └── dashboardStore.ts             # Complete reactive state powering all 3 dashboards
│   └── routes.tsx                        # Master routing table enforcing dashboard isolation
└── server/
    ├── db/
    │   ├── schema.sql                    # SQL DDL for 10 core entities
    │   └── seed.sql                      # Seed data for sellers, buyers, streams, labs, transporters
    └── src/
        ├── middleware/auth.ts            # RBAC middleware enforcing dashboard isolation
        ├── controllers/                  # Modular controllers (seller, buyer, admin, auth)
        ├── routes/api.ts                 # Express REST API routes
        └── server.ts                     # Express server entrypoint
```

---

## 🏃 Quick Start Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm

### 1. Run the Frontend (Vite)
```bash
# In the project root directory:
npm install
npm run dev
```
Open **`http://localhost:5180`** in your browser.


### 2. Build for Production Validation
```bash
npm run build
```
Builds cleanly with **0 TypeScript errors** using `tsc && vite build`.

### 3. Deploy to Vercel
This repository includes a pre-configured `vercel.json` with SPA routing rewrites.

**Option A: 1-Click via GitHub (Recommended)**
1. Navigate to [vercel.com/new](https://vercel.com/new).
2. Connect your GitHub account and select `ShreyanshGupta205/WasteMatch`.
3. Keep default settings (`Framework Preset: Vite`, `Build Command: npm run build`, `Output Directory: dist`).
4. Click **Deploy**.

**Option B: Via Vercel CLI**
```bash
npx vercel login
npx vercel --prod
```

### 4. Run Backend REST API (Optional)
```bash
cd server
npm install
npm run dev
```
The REST API server runs on port 4000.

---

## 📊 Database Entities (PostgreSQL / SQLite Schema)

The database schema defined in `server/db/schema.sql` models:
1. `users`: System users with `role: seller | buyer | admin`.
2. `business_profiles`: KYC records, GSTIN, PAN, SPCB permit numbers, verification statuses.
3. `receiver_profiles`: Co-processing envelope tolerances (pH, Cl, metals, moisture) and monthly quotas.
4. `waste_streams`: Waste physical forms, chemical fingerprints, AI confidence scores, lab report links.
5. `listings`: Live marketplace listings with asking prices.
6. `matches_offers`: Commercial offers, distance, transport economics, counter-terms.
7. `shipments`: Form 10 manifests, TREM cards, vehicle registration, transit milestones, Gate QC assay results.
8. `escrow_transactions`: Held, released, and disputed fund balances.
9. `labs_directory`: Reference directory of NABL labs with pricing and turnaround times.
10. `transporters_directory`: Reference directory of licensed hazardous waste haulers.

---

## ⚖️ License
Proprietary industrial software designed for circular economy co-processing compliance under CPCB / SPCB guidelines.
