# BazaarMind — AI Demand-to-Sale Network for Indian Agriculture

> *"Don't just know the market. Know where your harvest belongs."*

Built for **Google Fund My Crazy 2.0** under the **Our Markets** theme.

---

## 🎯 The Core Product Insight

A higher quoted price does **not** always mean higher farmer realization:
- **Ghazipur Wholesale (46 km)** quotes **₹23.00/kg** (Highest nominal quote)
- After transport (−₹1.80), handling (−₹0.55), and wastage (−₹0.70) &rarr; **Net Realization: ₹19.95/kg**
- **FreshKart Procurement (28 km)** quotes **₹22.50/kg**
- After transport (−₹0.90), handling (−₹0.40), and wastage (−₹0.35) &rarr; **Net Realization: ₹20.85/kg**

**Counterintuitive result:** The farmer earns **+₹0.90/kg more** with FreshKart despite the lower initial quote.

---

## 🔁 The Demo Flow

```
Farmer speaks naturally (Hindi / Web Speech)
                   ↓
Gemini 2.0 Flash extracts structured harvest intent
                   ↓
BazaarMind surfaces Demand Radar (3 buyer quotes)
                   ↓
Financial Engine computes net realization
                   ↓
Hero Recommendation + Delayed Support Opportunities (PMFBY, KCC)
                   ↓
Farmer explicitly approves and sends Quote Request
```

### The Three-Line Sign-off:
> **Gemini understands.**  
> **BazaarMind orchestrates.**  
> **The farmer approves.**

---

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Ivory `#FAFAF7`, Forest Green `#1D5C3A`, Charcoal `#1C1C1C`)
- **AI Engine:** Google Gemini 2.0 Flash (`@google/generative-ai` & `@google/genai`)
- **Voice:** Web Speech API (`hi-IN`) with editable fallback
- **Architecture:** Zero-DB single-page state machine optimized for hackathon judging

---

## 🚀 Getting Started

1. Clone repository:
   ```bash
   git clone https://github.com/Osheen06/bazaarmind-jugalbandi.git
   cd bazaarmind-jugalbandi
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add Gemini API key in `.env.local`:
   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Run locally:
   ```bash
   npm run dev
   # Open http://localhost:3000
   ```
