import type { Workstream } from '../types';

// Full pre-built workstream responses for each agent
// These are revealed progressively via streaming simulation

export const strategistWorkstream: Workstream = {
  agentId: 'strategist',
  sections: [
    {
      id: 'opp-analysis',
      title: 'Opportunity Analysis',
      type: 'analysis',
      status: 'pending',
      content: `The US healthcare AI market is valued at $14.6B in 2024, projected to reach $102.7B by 2032 (CAGR 27.4%). Three structural forces are creating a unique window of opportunity:

**1. Post-pandemic digitization pressure.** Healthcare systems accelerated digital transformation by 3–5 years during COVID. Decision-makers now have budget authority and board-level mandate.

**2. Staffing crisis driving automation demand.** 47% of health systems report critical nursing shortages. AI tools that reduce administrative burden by even 20% are seeing 8–12 week sales cycles vs. the 18-month norm.

**3. Value-based care shifting incentives.** The shift from fee-for-service to value-based contracts creates direct ROI from AI-driven outcome improvements — making the business case self-evident.`,
      citations: [
        { id: 'c1', label: 'Grand View Research', source: 'Healthcare AI Market Report 2024', url: '#' },
        { id: 'c2', label: 'AHA Survey', source: 'Hospital Workforce Report 2024', url: '#' },
      ],
    },
    {
      id: 'market-positioning',
      title: 'Market Positioning',
      type: 'plan',
      status: 'pending',
      content: `**Positioning: "The AI layer that makes your clinical team 30% more effective."**

Avoid positioning as: "AI replacing doctors" (regulatory risk + clinician resistance) or "AI diagnostics" (FDA clearance path: 12–24 months).

**Target positioning pillars:**
- **Workflow reduction** — reduce documentation and administrative overhead
- **Decision support** — surface the right information at the right moment
- **Revenue recovery** — capture missed billing codes and reduce claim denials

**Competitive differentiation:**
- Deepest EHR integrations (Epic + Cerner + Oracle Health certified)
- HIPAA-compliant by design (not bolted on)
- 14-day pilot → quantified ROI report before contract signature`,
    },
    {
      id: 'business-plan',
      title: 'Business Plan Overview',
      type: 'plan',
      status: 'pending',
      content: `**Revenue Model:** SaaS — per-bed per-month pricing
- Starter (50–150 beds): $8,000–$18,000/month
- Growth (150–350 beds): $18,000–$42,000/month  
- Enterprise (350+ beds): Custom contract

**12-Month Milestones:**
- Month 1–3: MVP, 2 pilot hospitals, HIPAA audit
- Month 4–6: First 5 paying customers, $500K ARR
- Month 7–9: Series A raise ($8M target), team scale to 15
- Month 10–12: 25 customers, $2.5M ARR, Series A deployed

**Unit Economics Target:**
- CAC: $45,000 (18-month payback)
- LTV: $380,000 (average 4.2 year retention)
- Gross Margin: 78% at scale`,
    },
  ],
};

export const researcherWorkstream: Workstream = {
  agentId: 'researcher',
  sections: [
    {
      id: 'industry-insights',
      title: 'Industry Insights',
      type: 'insight',
      status: 'pending',
      content: `**Primary Research Findings** (based on 23 healthcare CIO interviews, 2024)

The single most-cited frustration: "We have 14 different AI vendors promising transformation. We need one platform that actually integrates."

**Buyers are evaluating on 4 criteria (in order):**
1. EHR integration depth — does it work with their stack?
2. Clinical workflow fit — does it reduce or add clicks?
3. Compliance posture — can legal approve in <60 days?
4. Measurable ROI — can they show a CFO a number?

**Insight:** The winners in this market are not the most sophisticated AI — they are the best-integrated, compliance-first tools with the clearest ROI narrative.`,
      citations: [
        { id: 'c3', label: 'KLAS Research', source: 'Healthcare AI Adoption Report', url: '#' },
        { id: 'c4', label: 'Bain & Company', source: 'Digital Health Survey 2024', url: '#' },
      ],
    },
    {
      id: 'evidence',
      title: 'Evidence & Data',
      type: 'insight',
      status: 'pending',
      content: `**Market Validation Data Points:**

📊 **Adoption acceleration:** 58% of hospitals now use AI in at least one clinical workflow — up from 31% in 2021 (AHA).

💰 **Willingness to pay:** Median budget for healthcare AI tools: $180K–$450K annually per health system.

⏱️ **Time-to-value expectation:** 72% of buyers expect measurable outcomes within 6 months of deployment.

🔗 **Integration is the moat:** Tools with certified EHR integrations show 3.2× higher renewal rates than standalone tools.

📉 **The churn risk:** 38% of healthcare AI tools are abandoned within 18 months due to poor workflow integration — the #1 churn cause.`,
      citations: [
        { id: 'c5', label: 'Rock Health', source: 'Digital Health Funding Report H1 2024', url: '#' },
        { id: 'c6', label: 'Forrester Research', source: 'Healthcare Technology Adoption 2024', url: '#' },
      ],
    },
    {
      id: 'risks-research',
      title: 'Market Risks',
      type: 'risk',
      status: 'pending',
      content: `**Validated Risk Factors:**

⚠️ **Regulatory headwinds:** FDA proposed new guidance for AI/ML-enabled medical devices in May 2024. Monitor Section 521 of FDARA — may require pre-market submission for certain clinical decision support tools.

⚠️ **Big Tech competition:** Microsoft (Nuance DAX), Amazon (HealthScribe), and Google (MedLM) are all entering the clinical documentation space. Differentiate on niche workflow depth, not breadth.

⚠️ **Reimbursement uncertainty:** CPT codes for AI-assisted services remain inconsistent. Build business case on cost-reduction ROI, not revenue-generation claims.

✅ **Validated safe harbor:** Pure workflow automation tools (not diagnostic claims) have clearest regulatory path and fastest procurement approval.`,
      citations: [
        { id: 'c7', label: 'FDA Guidance', source: 'AI/ML-Based SaMD Action Plan 2024', url: '#' },
      ],
    },
    {
      id: 'sources',
      title: 'Key Sources',
      type: 'source',
      status: 'pending',
      content: `**Primary Sources Referenced:**
- KLAS Research: Healthcare AI Perception Report 2024
- Rock Health: H1 2024 Digital Health Funding Report  
- Grand View Research: Healthcare AI Market Sizing 2024–2032
- AHA Survey: Hospital Workforce Crisis Report
- Bain & Company: US Healthcare CEO Survey 2024
- Forrester: Total Economic Impact Framework for Healthcare AI
- FDA: Predetermined Change Control Plans for AI/ML Guidance

**Expert Interviews:**
- 23 CIO/CMIO interviews (anonymized) — Q3 2024
- 8 department-head clinical champions
- 4 healthcare VC partners (combined $2.1B healthcare portfolio)`,
    },
  ],
};

export const builderWorkstream: Workstream = {
  agentId: 'builder',
  sections: [
    {
      id: 'roadmap',
      title: 'Product Roadmap',
      type: 'task',
      status: 'pending',
      content: `**Phase 1 — Foundation (Months 1–3)**
- [ ] HIPAA-compliant infrastructure setup (AWS GovCloud)
- [ ] Core AI engine: clinical documentation assistant (Whisper + GPT-4o)
- [ ] Epic SMART on FHIR app — certified integration
- [ ] User authentication, RBAC, audit logging
- [ ] Pilot deployment with 2 anchor hospitals

**Phase 2 — Product-Market Fit (Months 4–6)**
- [ ] Cerner and Oracle Health integrations
- [ ] ROI dashboard (show time saved, revenue recovered)
- [ ] Mobile app for care team rounding
- [ ] Customer success playbook — 14-day onboarding
- [ ] Billing intelligence module (capture missed CPT codes)

**Phase 3 — Scale (Months 7–12)**
- [ ] Predictive analytics layer
- [ ] Multi-hospital network features
- [ ] API marketplace for partner integrations
- [ ] Enterprise SSO and identity federation
- [ ] SOC 2 Type II certification`,
    },
    {
      id: 'timeline',
      title: 'Execution Timeline',
      type: 'task',
      status: 'pending',
      content: `**Sprint 1–2 (Weeks 1–4):** Team formation, infrastructure, compliance framework
**Sprint 3–4 (Weeks 5–8):** Core product MVP, first Epic sandbox integration
**Sprint 5–6 (Weeks 9–12):** Pilot hospital 1 go-live, feedback loop
**Sprint 7–8 (Weeks 13–16):** Iteration based on pilot, hospital 2 onboarding
**Sprint 9–10 (Weeks 17–20):** First 5 paying customers, pricing validation
**Sprint 11–12 (Weeks 21–24):** Series A pitch prep, team scaling plan

**Team Required by Month 6:**
- 2 Full-stack engineers (healthcare API experience)
- 1 ML engineer (NLP/clinical language)
- 1 HIPAA compliance officer
- 1 Customer success manager (clinical background)
- 1 Sales (enterprise healthcare)`,
    },
    {
      id: 'deliverables',
      title: 'Key Deliverables',
      type: 'task',
      status: 'pending',
      content: `**Immediate Deliverables (Next 30 Days):**
✅ ICP definition document and TAM model
✅ Technical architecture decision record (ADR)
✅ HIPAA BAA template (with healthcare legal firm)
✅ Epic app submission — App Orchard program

**30–60 Days:**
📋 MVP feature specification (v1.0 scope)
📋 Pilot hospital agreements (LOIs from 3 targets)
📋 Seed funding pitch deck and data room
📋 Engineering sprint plan (12-week MVP roadmap)

**60–90 Days:**
🚀 MVP in production with pilot hospital 1
🚀 First quantified ROI case study
🚀 Series A process kickoff (target: $8M)
🚀 3 paid letters of intent signed`,
    },
  ],
};

// Simulation timing — delay between sections revealing (ms)
export const SIMULATION_CONFIG = {
  thinkingDuration: 2200,      // How long agent "thinks" before streaming
  sectionRevealDelay: 1800,    // Delay between each section being revealed
  handoffDelay: 600,           // Delay between agent completion and next agent activation
  wordStreamInterval: 22,      // ms between each word appearing
};
