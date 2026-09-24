# TAC GLOBAL & TAC STUDIOS — Version 1.0 Architecture & Blueprint

## 1. Executive Summary

This repository contains the production-ready code and component architecture for **Version 1** of **TAC GLOBAL** and **TAC STUDIOS**, built with a **static-first, API-extensible React & Next.js App Router** design system.

- **Brand Motto:** *"Excellence with Divinity"*
- **Primary Execution Wing:** TAC STUDIOS (Creative & Digital, Writing & Comm, Business Strategy, Social Marketing, Research & Intel)
- **Umbrella Entities:** TAC GLOBAL Holdings, The Peoples Mall, N'S Radiance
- **Settlement & Checkout:** Paystack, West African Mobile Money (MTN MoMo, Telecel Cash, AirtelTigo), Direct Wire Transfer

---

## 2. Directory Structure & App Router Mapping

The modular components map directly 1:1 to Next.js App Router route segments:

```
src/
├── assets/
│   └── images/                       # High-fidelity brand assets & hero renders
├── components/
│   ├── brand/
│   │   └── TacLogo.tsx               # Official TAC GLOBAL 3D Gold Logo & Insignia
│   ├── layout/
│   │   ├── Navbar.tsx                # Strict 3-zone Top Bar Contract
│   │   └── Footer.tsx                # Corporate division matrix & legal footer
│   ├── service/
│   │   └── ServiceLayout.tsx         # Reusable standardized layout for /studios/service/[service-slug]
│   ├── forms/
│   │   └── ServiceRequestModal.tsx   # Dynamic high-converting service intake form
│   ├── assistant/
│   │   └── TacAssistantDrawer.tsx    # Lightweight AI Concierge trained on TAC rate cards
│   └── common/
│       └── FloatingActions.tsx       # WhatsApp concierge & AI drawer trigger
├── context/
│   └── RouteContext.tsx              # URL synchronizer & modal state manager
├── data/
│   └── services.json                 # Central data configuration file
├── pages/
│   ├── HomePage.tsx                  # / (Hero, dual pillars, categories, bundles, proof)
│   ├── AboutPage.tsx                 # /about (Ecosystem, leadership, phased roadmap)
│   ├── StudiosPage.tsx               # /studios & /studios/[category] (Searchable catalog)
│   ├── ServiceDetailPage.tsx         # /studios/service/[service-slug] (Dynamic resolver)
│   ├── PackagesPage.tsx              # /packages (Starter Brand, Business Launch, Digital Growth)
│   ├── OpportunitiesPage.tsx         # /opportunities (Campus Ambassadors, Referral Partners)
│   ├── PortfolioPage.tsx             # /portfolio (Documented client outcomes & metrics)
│   └── ContactPage.tsx               # /contact (Offices, inquiry form, FAQ accordion)
└── types/
    └── index.ts                      # Strict TypeScript interfaces
```

### Next.js App Router Direct Translation Guide

To run inside a native Next.js 14+ project:

| Next.js Route | Component Implementation |
| :--- | :--- |
| `app/layout.tsx` | `<Navbar />`, `<main>{children}</main>`, `<Footer />`, `<ServiceRequestModal />` |
| `app/page.tsx` | `<HomePage />` |
| `app/about/page.tsx` | `<AboutPage />` |
| `app/studios/page.tsx` | `<StudiosPage />` |
| `app/studios/[category]/page.tsx` | `<StudiosPage initialCategory={params.category} />` |
| `app/studios/service/[serviceSlug]/page.tsx` | `<ServiceDetailPage slug={params.serviceSlug} />` |
| `app/packages/page.tsx` | `<PackagesPage />` |
| `app/opportunities/page.tsx` | `<OpportunitiesPage />` |
| `app/portfolio/page.tsx` | `<PortfolioPage />` |
| `app/contact/page.tsx` | `<ContactPage />` |

---

## 3. Rate Card & Service Blueprints (`src/data/services.json`)

All prices, turnaround times, and client input checklists are centralized in `src/data/services.json`:

- **Corporate Logo & Visual Mark:** Starting at **$75** (3–5 days)
- **Brand Identity System:** Starting at **$180** (5–7 days)
- **Statement of Purpose (SOP) & Admissions Essay:** Starting at **$100** (3–5 days, 99.4% success)
- **Executive CV & LinkedIn Revamp:** Starting at **$80** (2–4 days)
- **Investor Pitch Deck Narrative:** Starting at **$150** (4–6 days)
- **Bankable Business Plan:** Starting at **$250** (7–10 days, bank approved)
- **3–5 Year Financial Model:** Starting at **$200** (5–7 days, CFO grade)
- **UI/UX Design Prototype:** Starting at **$500** (7–10 days)
- **Custom Production Web Development:** Starting at **$900** (10–14 days)
- **Growth Marketing & SMM:** Starting at **$350/mo**
- **Market Research & Industry Dossier:** Starting at **$320** (7–10 days)

### Turnkey Bundles
- **Starter Brand Suite:** **$450** (Save $120)
- **Complete Business Launch:** **$950** (Save $230)
- **Enterprise Digital Growth:** **$1,800** (Save $420)

---

## 4. Key Integrations (Version 1 Strategy)

1. **Lead Capture & Dynamic Intake Form:**
   - Pre-fills service name and starting rates.
   - Generates unique reference code (e.g., `TAC-REQ-847291`).
   - Generates a 1-click WhatsApp concierge URL routing the full brief directly to the executive director.
2. **Payment Processing:**
   - Paystack payment gateway ready for Mobile Money (MTN, Telecel, AirtelTigo) and international cards.
3. **AI Concierge:**
   - Lightweight widget trained directly on the TAC rate card, admissions stats, turnaround times, and ambassador payouts.
