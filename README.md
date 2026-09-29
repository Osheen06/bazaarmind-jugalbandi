# BAZAARMIND

> **"Don't just know the market. Know where your harvest belongs."**  
> *AI Demand-to-Sale Network for Indian Agriculture*  
> Built for Google's **"Fund My Crazy 2.0 with Google Gemini"** Competition — *Our Markets* Theme.

---

## 🌟 What is BazaarMind?

**BazaarMind** is an AI-powered demand-to-sale network that transforms fragmented agricultural market signals into an actionable selling decision for the Indian farmer:
- **WHAT** to sell?
- **WHERE** to sell?
- **WHEN** to sell?
- **WHO** actually needs it?
- **WHAT** will the farmer **ACTUALLY EARN** after transport, handling, commission, and spoilage wastage?
- And can BazaarMind help **EXECUTE** the transaction safely?

### The Core Loop
$$\text{SENSE} \longrightarrow \text{DECIDE} \longrightarrow \text{MATCH} \longrightarrow \text{EXECUTE} \longrightarrow \text{LEARN}$$

---

## ⚖️ Competition Judging Alignment

1. **VISION (30%):** Moves beyond passive price publication boards into an active, intelligent demand matching network. The market doesn't wait for supply to reach the yard; it knows where supply is needed before physical transport begins.
2. **REAL-LIFE RELEVANCE (20%):** Voice-first in Hindi/Hinglish designed for low-literacy smallholders. No confusing jargon or overwhelming data tables.
3. **BUILT WITH GEMINI (20%):** Gemini powers conversational intent extraction, structured crop schema parsing, multi-signal reasoning across buyers and mandis, and transparent agent execution plans.
4. **FUTURE FOCUSED (15%):** **Pre-Harvest Demand Discovery** allows farmers to discover buyer demand 20 days *before* harvest.
5. **EXECUTION (15%):** Responsible AI design with mandatory human approval before binding sales, deterministic simulation fallback, and zero exposed keys.

---

## 💡 The Signature Innovation: Net Realization vs Mandi Price

Traditional apps tell farmers: *"Tomato is ₹23/kg at Ghazipur Mandi."*  
BazaarMind reveals the hidden truth:
$$\text{Net Realization} = \text{Selling Price} - \text{Transport} - \text{Handling} - \text{Commission} - \text{Wastage} - \text{Storage}$$

### The Concrete Example (Ramesh Kumar • 3 Tonnes Tomato):
| Metric | Ghazipur APMC Mandi | FreshKart Wholesale (Direct) | Advantage with BazaarMind |
| :--- | :--- | :--- | :--- |
| **Headline Quoted Price** | ₹23.00 / kg | ₹22.50 / kg | Traditional app favors Mandi |
| **Route Distance** | 46 km | 28 km | Shorter transit |
| **Transport Cost** | -₹1.60 / kg | -₹0.90 / kg | Saves ₹0.70 / kg |
| **APMC Arhatiya Commission** | -₹1.15 / kg (5.0%) | **₹0.00 / kg (0%)** | **Saves ₹1.15 / kg!** |
| **Congestion Spoilage Loss** | -₹1.20 / kg (5.2%) | -₹0.40 / kg (1.8%) | Saves ₹0.80 / kg |
| **Handling & Unloading** | -₹0.55 / kg | -₹0.35 / kg | Saves ₹0.20 / kg |
| **True In-Hand Net Realization** | **₹19.70 / kg** | **₹20.85 / kg** | **+₹1.15 / kg EXTRA CASH** |
| **Single-Harvest Total Earning** | ₹59,100 | **₹62,550** | **+₹3,450 More In Bank** |

Combined with **Pooled Transport** (saving another ₹900), Ramesh earns **+₹4,350 (+21.4% net income lift)** on this single harvest.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js 14 (App Router) + React 18 + TypeScript
- **Styling:** Tailwind CSS + PostCSS + Autoprefixer
- **Visuals & Charts:** Recharts + Lucide Icons + Custom SVG Spatial Radar
- **AI Layer:** Google Gemini 1.5 Flash via server-side `/api/gemini` route with deterministic fallback engine
- **Voice Layer:** Web Speech API + SpeechSynthesis (Hindi/English) with one-click interactive fallbacks
- **State Management:** React Context (`AppContext.tsx`) with localStorage persistence

---

## 🚀 Quick Start Guide

### 1. Clone & Install Dependencies
```bash
cd /Users/osheen/bazaarmindJugalbandi
npm install
```

### 2. Environment Setup (Optional for Live Gemini)
Create a `.env.local` file:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
> *Note:* If no key is provided, BazaarMind runs in **Demo Mode**, utilizing its built-in deterministic agricultural reasoning engine without breaking any user flows.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🎯 90-Second Judge Tour Script

To demonstrate the full power of BazaarMind during a live competition pitch:

1. Click **"Judge Mode (90s Tour)"** in the top navigation bar.
2. **Scene 1 (The Problem):** Observe the market fragmentation where farmers see prices but lack decision clarity.
3. **Scene 2 (Voice Agent):** Click *"Simulate Ramesh's Voice Query"* to see natural spoken Hindi processed into structured data.
4. **Scene 3 (Gemini Reasoning):** View the extraction of Crop (Tomato), Quantity (3T), and Harvest Window (3 days).
5. **Scene 4 (Demand Radar):** Inspect the 3 ranked opportunities with transparent matching weights.
6. **Scene 5 (Net Realization):** Move the interactive sliders to prove why ₹22.50/kg direct beats ₹23.00/kg mandi.
7. **Scene 6 (Quote Negotiation):** Click *"Request FreshKart Quote"* to trigger autonomous RFQ dispatch.
8. **Scene 7 (Human Approval):** Highlight the **Responsible AI** principle: click *"Approve Sale"* to finalize contract.
9. **Scene 8 (Move My Harvest):** Click *"Book Pooled Transport"* to save ₹900 with nearby Tigipur farmers.
10. **Scene 9 & 10 (Digital Passport & Future Demand):** View Digital Passport `TM-2026-00482` and pre-harvest forward demand.

---

## 🔒 Trust, Safety & Ethics

- **No False Guarantees:** All forward forecasts are presented as probabilistic scenarios.
- **Human in the Loop:** Binding financial contracts require human confirmation.
- **Simulation Transparency:** All synthetic demo records are visibly watermarked with **SIMULATION DATA**.
- **Server-Side Security:** `GEMINI_API_KEY` is strictly held server-side and never leaked to browser bundles.

---

## 🗺️ Next 3 Production Steps

1. **Pilot Integration with e-NAM & ONDC:** Connect to official e-NAM API gateway for digital mandi trade certificates.
2. **FPO ERP Connectors:** Sync with tally/excel systems of farmer producer organisations for automated supply pooling.
3. **Local Transporter Network:** Onboard regional tempo and truck aggregators into the pooled routing engine.

---
*Created for Google's Fund My Crazy 2.0 Hackathon • Empowering Indian Smallholders with Agentic AI.*
