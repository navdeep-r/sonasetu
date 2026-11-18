# SonaSetu (सोनासेतु) 🪙
### *The Agentic Gold Job-Work, Custody & Financial Trust Ecosystem*

[![React 19](https://img.shields.io/badge/React-19.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-amber)](LICENSE)

---

## 📌 Executive Summary

India’s **\$85B+ jewellery manufacturing industry** relies on over **5 million skilled goldsmiths (*karigars*)**, clustered in decentralized artisan hubs like Zaveri Bazaar (Mumbai), Rajkot, Surat, Thrissur, and Kolkata. 

Traditionally, gold issuance and job-work rely on informal trust, uncalibrated scale photos over WhatsApp, and handwritten paper slips (*parchas*). This leads to recurring disputes over:
1. **Physical Scale Discrepancies:** Milligram-level drifts between jeweller and artisan scales.
2. **Process Loss vs. Scrap Confusion:** Arguments over unavoidable manufacturing loss (*Ghat*) vs. recoverable scrap (*Chhol, Tukda, Rada*).
3. **Inflexible Wedding Deadlines:** Delayed deliveries for auspicious *Muhurat* dates.
4. **Artisan Financial Insecurity:** Delayed labour payments, arbitrary deductions, and lack of a portable credit/reputation profile.

**SonaSetu** bridges this trust gap. It transforms raw gold tracking into a verifiable, evidence-backed digital ledger connecting jewellers and karigars through agentic AI, computer vision scale OCR, fine-gold reconciliation math, and portable trust passports.

---

## 🏛️ System Architecture

```mermaid
flowchart TD
    subgraph UI [Mobile Application Shell]
        JM[Jeweller Persona View]
        KM[Karigar Persona View]
        OCR_CAM[Photo-Verified Scale Camera]
        VOICE_REC[WhatsApp Voice Note Studio]
        PASSPORT[Portable Karigar Trust Passport]
    end

    subgraph AI_Core [Agentic Intelligence Layer]
        OCR_ENG[Digital Scale Optical OCR]
        WHISPER_ENG[Multilingual Voice Parser (Gujarati/Hindi/English)]
        ANOMALY_RADAR[Personalized Wastage Anomaly Detector]
        DEADLINE_RADAR[Muhurat Date Risk Predictor]
        DISPUTE_AGENT[Neutral Mediation Assistant]
    end

    subgraph Trust_Ledger [Fine-Gold Ledger & Settlement]
        FGE[24K Fine Gold Conversion Matrix]
        SCRAP_ENG[Separate Scrap Lifecycle (Tukda/Chhol/Rada)]
        DUAL_SIG[Dual-Party OTP State Machine]
        ESCROW[Conditional Payout Release Gateway]
        GST_TAX[Form GST ITC-04 Job-Work Challan]
        OFFLINE[Offline-First IndexedDB Sync Engine]
    end

    UI --> AI_Core
    AI_Core --> Trust_Ledger
```

---

## ⚡ The 6 Core Modules & 18 Capabilities

### Module 1: Smart Job & Gold Custody Management
- **1. Digital Job Cards:** Track orders, purity, gross weights, making charges, advance deductions, and *Muhurat* delivery dates.
- **2. Photo-Verified Gold Weighing:** In-app digital scale camera scanner with crosshairs, tare verification, and automated 7-segment green LED OCR extraction.
- **3. Dual-Party Mutual Verification:** Cryptographic OTP/tap approval for issuance, returns, and settlements—neither party can unilaterally alter weights.
- **4. Complete Gold Custody Tracking:** Real-time visibility across Jeweller Vault, Master Goldsmith, Sub-Karigar Setter, and Showroom.

### Module 2: Intelligent Gold Reconciliation & Wastage Analytics
- **5. Automatic Fine-Gold Reconciliation:** Purity-adjusted math converting 22K/18K alloy weights into **24K Fine Gold Equivalents (FGE)**:
  $$\text{Fine Gold} = \text{Gross Weight} \times \left( \frac{\text{Karats}}{24} \right)$$
- **6. Separate Scrap Lifecycle Tracking:** Segregates Solid Cut-offs (*Tukda* ~91.6%), Bench Filings (*Chhol* ~88.5%), and Buffing Silt (*Rada* ~78.0%)—never automatically treating scrap as lost gold.
- **7. Personalized Wastage Anomaly Detection:** Learns Ramesh Soni's historical craft baseline ($0.80\% - 1.25\%$ for Temple Haram). When a job logs $2.10\%$, it flags a non-accusatory variance alert.
- **8. Evidence-Based Discrepancy Investigation:** Side-by-side photographic evidence audit comparing issuance vs. return scales with neutral mediation proposals (e.g., suction filter silt recovery vs. labour deduction).

### Module 3: Agentic AI & Conversational Automation
- **9. Voice & WhatsApp Job Updates:** Realistic voice memo player with animated waveforms and Whisper AI transcription in **Gujarati**, **Hindi**, and **English**.
- **10. Intelligent Evidence Extraction:** Automatically parses speech and handwritten slips into structured drafts: Finished Weight ($18.900\text{ g}$), Unused Gold ($0.400\text{ g}$), and Recovered Scrap ($0.300\text{ g}$).
- **11. AI Deadline Risk Detection:** Proactively flags tight wedding and festive orders to prevent missed occasions.
- **12. AI Dispute Resolution Assistant:** Neutral, fact-based settlement recommendations referencing historical baselines and assay results.

### Module 4: Transparent Settlement & Financial Management
- **13. Itemized Settlement Proposals:** Auto-calculates gross labour charges, gold debit/credit adjustments at reference rates, and advance deductions.
- **14. Conditional Payment Release:** Smart escrow release button with confetti animation and audio chimes upon joint sign-off.
- **15. GST & Tax-Ready Documentation:** Audit-ready Job-Work Delivery Challan and voucher generator (Form GST ITC-04 under HSN 7113) with print/export view.

### Module 5: Karigar Empowerment & Trust Passport
- **16. Portable Karigar Trust Passport:** Explainable profile showcasing **98/100 Trust Score**, **126 completed jobs**, **96.8% on-time delivery**, **99.2% joint reconciliation rate**, and **4.89 kg fine gold handled with zero default**.
- **17. Shareable QR Verification Token:** Allows prospective jewellers to verify artisan credibility without exposing past client rates.
- **18. Consolidated Multi-Jeweller Dashboard:** Consolidates active jobs across Zaveri & Sons, Tanishq, and Kalyan Jewellers in one view.

### Module 6: Accessibility, Offline & Reliability
- **Offline-First Operation:** LocalStorage and IndexedDB caching for workshops with intermittent connectivity.
- **Conflict-Resilient Sync:** Auto-syncs pending return drafts and scale logs upon reconnection.

---

## 💎 Our 6 Core USPs

| USP | What Makes It Different |
| :--- | :--- |
| **1. Evidence-Backed Gold Ledger** | Photographic evidence and independent dual confirmation for every material handoff. |
| **2. AI-Powered Gold Intelligence** | Fine-weight 24K reconciliation, scrap accounting, and personalized wastage anomaly detection. |
| **3. Agentic Conversational Workflow** | Converts vernacular WhatsApp messages and voice notes into validated transactions. |
| **4. Predictive Order Management** | Detects delivery risks before wedding and auspicious *Muhurat* deadlines are missed. |
| **5. Fair Settlement Infrastructure** | Transparent calculations, evidence-backed disputes, and jointly approved escrow payment workflows. |
| **6. Portable Artisan Identity** | Enables karigars to carry their verified craftsmanship and reliability across multiple jewellers. |

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 with luxury metallic accents (`#D4AF37`, `#F59E0B`, `#0B0F19`)
- **Icons & UI:** Lucide React, Canvas Confetti
- **Audio Synthesizer:** Custom Web Audio API synthesizer for digital scale tare beeps, camera shutter clicks, and gold coin escrow chimes
- **Persistence:** LocalStorage + Offline mutation sync queue

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/sonasetu.git
cd sonasetu

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Building for Production
```bash
npm run build
npm run preview
```

---

## 📱 Interactive Demo Walkthrough

1. **Switch Personas:** Use the top bar pill to toggle between **Jeweller Mode** *(Rajesh Zaveri)* and **Karigar Mode** *(Ramesh Soni)*.
2. **Camera Scale OCR:** Tap **Quick Scale OCR** in the header or inside any job to trigger the calibrated scale camera simulator with 7-segment digital OCR.
3. **Vernacular WhatsApp Audio Parser:** Navigate to the **AI Agent** tab $\rightarrow$ click **Play** on the Gujarati voice note $\rightarrow$ review live Whisper transcription and auto-drafted material quantities.
4. **Wastage Anomaly Investigation:** Navigate to **Recon** $\rightarrow$ select `JOB-2026-079` $\rightarrow$ inspect the $2.10\%$ anomaly alert $\rightarrow$ launch the **AI Discrepancy Investigation** to resolve via polish silt recovery.
5. **Conditional Escrow Release:** Navigate to **Settlement** $\rightarrow$ click **Release Payment** to trigger the escrow payout with celebration confetti.
6. **Form GST ITC-04 Delivery Challan:** Click **View GST ITC-04** on any settled job to review the printable tax voucher.
7. **Artisan Trust Passport:** Navigate to **Passport** $\rightarrow$ click **Show QR** to inspect the verifiable decentralized artisan credential.

---

## 👥 Personas Modeled

- **Jeweller:** Rajesh Zaveri (*Zaveri & Sons Jewellers, Zaveri Bazaar, Mumbai*)
- **Karigar:** Ramesh Babubhai Soni (*Master Goldsmith, Shreeji Fine Art Goldsmiths, Rajkot, Gujarat*)

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
