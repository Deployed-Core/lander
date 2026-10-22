export type ReportContentBlock =
  | { type: "paragraph"; text: string; lead?: boolean }
  | { type: "heading"; text: string; id: string }
  | { type: "subheading"; text: string; id: string }
  | { type: "at-a-glance"; items: string[] }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "pull-quote"; text: string }
  | {
      type: "dual-outcomes";
      outcomes: {
        eyebrow: string;
        headline: string;
        detail: string;
      }[];
    }
  | {
      type: "technology-evolution";
      cards: { title: string; description: string }[];
    }
  | {
      type: "narrative-grid";
      columns: { heading: string; paragraphs: string[] }[];
    }
  | {
      type: "key-stats";
      stats: {
        tag: string;
        value: string;
        description: string;
        footnote: string;
      }[];
    }
  | {
      type: "journey-stage";
      index: string;
      phase: string;
      name: string;
      useCaseCount: number;
      friction: string[];
      useCases: {
        text: string;
        role: "patient" | "clinical" | "operations" | "payer";
      }[];
      orgOutcome: string;
      patientOutcome: string;
      evidenceNote: string;
    }
  | {
      type: "enterprise-backend";
      areas: {
        title: string;
        items: {
          name: string;
          description: string;
          measure: string;
        }[];
      }[];
      caption?: string;
    }
  | {
      type: "framework-cards";
      cards: { title: string; description: string }[];
    }
  | {
      type: "assessment-table";
      label: string;
      qualifier: string;
      headers: string[];
      rows: {
        touchpoint: string;
        cells: {
          rating: "low" | "medium" | "high" | "very-high";
          text: string;
        }[];
      }[];
      caption?: string;
      source?: string;
    }
  | {
      type: "adoption-waves";
      label: string;
      qualifier: string;
      waves: {
        number: string;
        phase: string;
        title: string;
        items: string[];
        caption: string;
      }[];
      source?: string;
    }
  | {
      type: "case-grid";
      cases: {
        tag: string;
        title: string;
        metric: string;
        description: string;
        orgLens: string;
        patientLens: string;
        caption: string;
      }[];
    }
  | {
      type: "horizontal-bar-charts";
      charts: {
        source: string;
        title: string;
        bars: { label: string; value: number }[];
        caption: string;
      }[];
    }
  | {
      type: "imperative-list";
      items: { title: string; description: string }[];
    }
  | {
      type: "closing-thesis";
      eyebrow: string;
      text: string;
    }
  | {
      type: "source-grid";
      sources: {
        id: string;
        title: string;
        detail: string;
        links: { label: string; url: string }[];
      }[];
      provenance?: string[];
    }
  | {
      type: "delivery-options";
      options: { eyebrow: string; title: string; description: string }[];
    }
  | {
      type: "figure-timeline";
      label: string;
      title: string;
      eras: {
        period: string;
        name: string;
        description: string;
        impact: string;
      }[];
      notes?: string;
      sources?: string;
    }
  | {
      type: "figure-bar-chart";
      label: string;
      title: string;
      yAxisLabel?: string;
      benchmark?: { label: string; value: number };
      bars: {
        label: string;
        value: number;
        shade?: "light" | "medium" | "dark" | "darkest";
      }[];
      sources?: string;
    }
  | {
      type: "figure-table";
      label: string;
      title: string;
      headers: string[];
      rows: string[][];
      notes?: string;
      sources?: string;
    }
  | {
      type: "figure-process";
      label: string;
      title: string;
      steps: { number: string; title: string; description: string }[];
      sources?: string;
    }
  | {
      type: "figure-comparison";
      label: string;
      title: string;
      columns: {
        heading: string;
        items: string[];
      }[];
      sources?: string;
    }
  | {
      type: "figure-matrix";
      label: string;
      title: string;
      axes: { x: string; y: string };
      quadrants: { label: string; items: string[] }[];
      sources?: string;
    }
  | {
      type: "collaboration";
      partnerName: string;
      partnerLogo?: string;
    }
  | {
      type: "about-partner";
      name: string;
      logo?: string;
      description: string;
    }
  | {
      type: "download-cta";
      label: string;
      url?: string;
    }
  | { type: "divider" }
  | { type: "example-note"; text: string };

export interface ReportAuthor {
  name: string;
  role: string;
  organization: string;
  avatarImage?: string;
  linkedIn?: string;
}

export interface Report {
  slug: string;
  date: string;
  isoDate: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  readingTime: number;
  authors: ReportAuthor[];
  relatedIndustries: { label: string; href: string }[];
  coverImage?: string;
  pdfUrl?: string;
  keywords: string[];
  gradient: string;
  collaborationPartner?: {
    name: string;
    logo?: string;
    description: string;
  };
  content: ReportContentBlock[];
}

export const reports: Report[] = [
  {
    slug: "state-of-ai-in-healthcare-2026",
    date: "23 Oct 2026",
    isoDate: "2026-10-23",
    title: "State of AI in Healthcare.",
    subtitle:
      "How AI is improving operational efficiency and enhancing patient experience across healthcare organisations.",
    tag: "Healthcare Research / 2026",
    description:
      "Evidence-led report on how AI is improving operational efficiency and enhancing patient experience across healthcare organisations. Covers readiness, adoption across 8 patient-journey stages, prioritisation frameworks, delivery choices, case evidence, and institutional actions.",
    readingTime: 24,
    authors: [
      {
        name: "Deployed Research",
        role: "Applied AI Research",
        organization: "Deployed",
      },
    ],
    relatedIndustries: [
      { label: "Healthcare", href: "/healthcare" },
    ],
    coverImage: "/assets/report-state-of-ai-in-healthcare-2026-preview.png",
    keywords: [
      "AI in healthcare",
      "healthcare AI",
      "operational efficiency",
      "patient experience",
      "healthcare automation",
      "ambient scribe",
      "clinical AI",
      "healthcare delivery",
      "India healthcare",
      "digital health",
      "agentic AI healthcare",
      "revenue cycle management",
      "clinical decision support",
      "healthcare readiness",
    ],
    gradient:
      "linear-gradient(135deg, #14283d 0%, #1a4a6e 50%, #245fe6 100%)",
    content: [
      {
        type: "at-a-glance",
        items: [
          "<strong>Operational efficiency:</strong> AI can reduce administrative work, improve coordination and release staff capacity. Gains should be measured in time, throughput, rework and fully loaded cost.",
          "<strong>Enhanced patient experience:</strong> simpler navigation, clearer communication and better continuity connect internal process improvements to the experience of receiving care.",
          "<strong>Adoption is advancing, but scale is uneven:</strong> Deloitte reports around 30% of surveyed health systems scaling gen AI in selected areas, versus 2% across the enterprise.",
          "<strong>Readiness varies by workflow:</strong> value, deployability and trust provide a useful way to distinguish applications to scale now, build toward or approach over a longer horizon.",
          "<strong>Workflow outcomes and financial returns are different:</strong> measured staff-experience improvements do not automatically translate into hospital-wide savings. Models, executive expectations and observed results require distinct treatment.",
          "<strong>The setting matters:</strong> hospitals, diagnostics providers and smaller clinics need different integration choices, baselines and patient measures.",
        ],
      },
      {
        type: "dual-outcomes",
        outcomes: [
          {
            eyebrow: "Organisational lens",
            headline: "Less work to deliver appropriate care.",
            detail:
              "Staff capacity · process reliability · financial performance",
          },
          {
            eyebrow: "Patient lens",
            headline: "Less effort to receive and continue care.",
            detail: "Access · clarity · attention · continuity",
          },
        ],
      },
      {
        type: "heading",
        text: "Capability is broadening. Readiness remains local.",
        id: "readiness",
      },
      {
        type: "paragraph",
        text: "Healthcare applications span structured rules, prediction, imaging, language and coordinated workflows. The operational question is which capability fits the work, the available data and the required level of review.",
        lead: true,
      },
      {
        type: "technology-evolution",
        cards: [
          {
            title: "Rules & automation",
            description:
              "Repeatable checks, routing and transaction handling.",
          },
          {
            title: "Machine learning & vision",
            description:
              "Risk prediction, forecasting and image-based support.",
          },
          {
            title: "Generative & agentic AI",
            description:
              "Drafting, summarisation and coordination across tasks.",
          },
        ],
      },
      {
        type: "narrative-grid",
        columns: [
          {
            heading: "The global picture",
            paragraphs: [
              "McKinsey's US survey found 50% reporting gen-AI implementation and 19% reporting agentic-AI implementation. These cover providers, payers and technology firms, rather than hospitals alone.",
              "Selected applications can therefore be in production while an organisation still lacks the shared information and operating practices needed for broader deployment.",
            ],
          },
          {
            heading: "The India context",
            paragraphs: [
              "Bain reports hospital EMR use rising from 18% in 2018 to about 35%, concentrated in larger urban chains. Data completeness, interoperability and workflow fit therefore remain material local constraints.",
              "For smaller providers, assess the actual record, staffing and integration environment before transferring a large-system result to the clinic.",
            ],
          },
        ],
      },
      {
        type: "key-stats",
        stats: [
          {
            tag: "Reported deployment · S02",
            value: "30% / 2%",
            description:
              "Gen AI at scale in selected areas / deployed across the enterprise.",
            footnote:
              "Deloitte: 180 executives from large health systems in six countries. These describe distinct deployment scopes.",
          },
          {
            tag: "Modelled opportunity · S05",
            value: "240–400 h",
            description:
              "Potential annual nursing time released per nurse.",
            footnote:
              "Deloitte model, using a combination of digital tools, automation and AI. An opportunity estimate, not measured AI-only savings.",
          },
          {
            tag: "Modelled opportunity · S06",
            value: "30–60%",
            description:
              "Potential reduction in the cost to collect healthcare revenue.",
            footnote:
              "McKinsey analysis of revenue-cycle operations. This does not represent a reduction in total hospital costs.",
          },
        ],
      },
      {
        type: "heading",
        text: "Where operations and patient experience meet.",
        id: "journey",
      },
      {
        type: "paragraph",
        text: "Eight stages show how the work of delivering care shapes patient access, attention and continuity. Each stage pairs the application landscape with organisational and patient measures.",
        lead: true,
      },
      {
        type: "journey-stage",
        index: "01",
        phase: "Pre-visit",
        name: "Outreach & acquisition",
        useCaseCount: 5,
        friction: [
          "Difficulty identifying the right specialist",
          "Limited awareness of care options",
        ],
        useCases: [
          { text: "Targeted wellness and screening", role: "patient" },
          { text: "Patient leakage tracker", role: "patient" },
          { text: "24/7 chatbot for Q&A", role: "clinical" },
          {
            text: "Catchment and demand forecasting",
            role: "operations",
          },
          {
            text: "Social media / website content curation",
            role: "operations",
          },
        ],
        orgOutcome:
          "Enquiry-to-appropriate-booking completion; staff minutes per enquiry; unmet demand by service.",
        patientOutcome:
          "Ease of finding the right specialist; understandable information about care options.",
        evidenceNote:
          "Outreach should support appropriate care. Content generation alone does not establish better access.",
      },
      {
        type: "journey-stage",
        index: "02",
        phase: "Pre-visit",
        name: "Triage & appointment",
        useCaseCount: 5,
        friction: [
          "Long appointment wait times",
          "Lack of guided care navigation",
        ],
        useCases: [
          { text: "Digital triage", role: "patient" },
          { text: "AI teleconsultation", role: "patient" },
          {
            text: "AI appointment scheduling, reminders and preparation instructions",
            role: "patient",
          },
          { text: "Risk profile assessment", role: "clinical" },
          {
            text: "Language support for patient interaction",
            role: "patient",
          },
        ],
        orgOutcome:
          "Booking completion; time to suitable appointment; no-show rate; triage exceptions.",
        patientOutcome:
          "Clear preparation; appropriate routing; language accessibility; timely escalation.",
        evidenceNote:
          "Clinical triage and risk tools require validation. Teleconsultation may be a digital service rather than an AI capability.",
      },
      {
        type: "journey-stage",
        index: "03",
        phase: "Arrival & treatment",
        name: "Registration & front desk",
        useCaseCount: 4,
        friction: [
          "Repetitive paperwork",
          "Delays in insurance and eligibility verification",
        ],
        useCases: [
          { text: "Patient query resolution", role: "patient" },
          {
            text: "Early check-in and patient documentation",
            role: "patient",
          },
          { text: "Real-time hospital wayfinding", role: "patient" },
          {
            text: "Billing estimator and financial counselling",
            role: "clinical",
          },
        ],
        orgOutcome:
          "Registration time; duplicate entry; eligibility turnaround; estimate corrections.",
        patientOutcome:
          "Fewer repeated questions; simpler check-in; clearer directions and expected costs.",
        evidenceNote:
          "Estimates must show assumptions and uncertainty. Role colours preserve the supplied map's classifications.",
      },
      {
        type: "journey-stage",
        index: "04",
        phase: "Arrival & treatment",
        name: "OPD / clinical consultation",
        useCaseCount: 4,
        friction: [
          "Incomplete patient history",
          "Inconsistent communication of diagnosis and treatment",
        ],
        useCases: [
          { text: "Clinical decision support", role: "clinical" },
          { text: "E-prescription generator", role: "clinical" },
          { text: "Care plan designer", role: "clinical" },
          {
            text: "Ambient listening and medical notes",
            role: "operations",
          },
        ],
        orgOutcome:
          "Documentation time; after-hours work; missing-history rate; note correction rate.",
        patientOutcome:
          "Attention during the visit; understandable instructions; clarity of next steps.",
        evidenceNote:
          "Clinical decisions, prescriptions and care plans remain subject to authorised clinician review. Ambient-scribe evidence is more developed than many other use cases here.",
      },
      {
        type: "journey-stage",
        index: "05",
        phase: "Clinical & diagnostics",
        name: "Diagnostics: pathology & imaging",
        useCaseCount: 4,
        friction: [
          "Delays in scheduling and result turnaround",
          "Limited visibility into diagnostic status",
        ],
        useCases: [
          { text: "Report delivery and explanation", role: "patient" },
          {
            text: "Radiology AI diagnostics and triage",
            role: "clinical",
          },
          {
            text: "End-to-end automated radiology diagnosis",
            role: "clinical",
          },
          { text: "Automated pathology analysis", role: "clinical" },
        ],
        orgOutcome:
          "Order-to-result turnaround; backlog; critical-result acknowledgement; rework.",
        patientOutcome:
          "Clear status updates; understandable reports; timely contact for significant findings.",
        evidenceNote:
          "Autonomous diagnostic workflows are included as landscape items from the supplied map, not as a statement of validated readiness or regulatory permission.",
      },
      {
        type: "journey-stage",
        index: "06",
        phase: "Clinical & diagnostics",
        name: "Inpatient & surgical care",
        useCaseCount: 4,
        friction: [
          "Care-coordination gaps across departments",
          "Delays in admissions, procedures and discharge",
        ],
        useCases: [
          { text: "Remote patient monitoring", role: "clinical" },
          {
            text: "Pre-operative / post-operative risk assessment",
            role: "clinical",
          },
          {
            text: "Surgical intelligence and intra-operative guidance",
            role: "clinical",
          },
          {
            text: "ICU and operating theatre utilisation",
            role: "operations",
          },
        ],
        orgOutcome:
          "Bed and theatre utilisation; cancelled procedures; transfer and discharge delays; overtime.",
        patientOutcome:
          "Predictable care transitions; fewer coordination failures; responsive monitoring.",
        evidenceNote:
          "Prediction accuracy and actual capacity improvement must be measured separately. Clinical interventions need appropriate oversight.",
      },
      {
        type: "journey-stage",
        index: "07",
        phase: "Billing & aftercare",
        name: "Claims & billing",
        useCaseCount: 3,
        friction: [
          "Slow claims processing",
          "Limited transparency into claim status",
        ],
        useCases: [
          { text: "Claims query resolution", role: "patient" },
          { text: "Automated claims management", role: "operations" },
          {
            text: "Fraud detection and underwriting",
            role: "operations",
          },
        ],
        orgOutcome:
          "Cost to collect; first-pass acceptance; denial and appeal rates; accounts-receivable days.",
        patientOutcome:
          "Claim-status visibility; fewer repeated queries; clearer financial responsibility.",
        evidenceNote:
          "Underwriting is principally a payer function. Provider and payer incentives may differ; preserve patient access when assessing financial benefits.",
      },
      {
        type: "journey-stage",
        index: "08",
        phase: "Billing & aftercare",
        name: "Post-discharge & monitoring",
        useCaseCount: 5,
        friction: [
          "Poor follow-up adherence",
          "Limited continuity of care after discharge",
        ],
        useCases: [
          {
            text: "At-home monitoring and wearables",
            role: "patient",
          },
          {
            text: "Post-discharge care plan and health coach",
            role: "patient",
          },
          {
            text: "Repeat-test and annual health-package reminders",
            role: "patient",
          },
          { text: "Medication reminders", role: "clinical" },
          {
            text: "Longitudinal health-trend tracking",
            role: "payer",
          },
        ],
        orgOutcome:
          "Clinician-prescribed follow-up completion; coordinator time; unresolved care gaps; escalation timeliness.",
        patientOutcome:
          "Understanding of the care plan; support between visits; confidence about when to seek help.",
        evidenceNote:
          "Monitor appropriate care and health outcomes. Additional reminders or visits alone do not demonstrate better care; readmission effects need clinical evidence.",
      },
      {
        type: "heading",
        text: "The operating layer behind the patient journey.",
        id: "enterprise",
      },
      {
        type: "paragraph",
        text: "Patient-facing improvements depend on staffing, finance, equipment and information flowing reliably behind the scenes. These 11 capabilities broaden the view beyond individual clinical tools.",
        lead: true,
      },
      {
        type: "enterprise-backend",
        areas: [
          {
            title: "Clinical operations",
            items: [
              {
                name: "Real-time hospital operations command centre",
                description:
                  "Coordinate bed, flow and exception information",
                measure:
                  "Transfer delay; discharge delay; unresolved exceptions",
              },
              {
                name: "Workforce scheduling optimisation",
                description:
                  "Match capacity to demand and skill mix",
                measure:
                  "Overtime; coverage gaps; schedule stability",
              },
              {
                name: "Medical-equipment predictive maintenance",
                description:
                  "Flag servicing needs and potential failures",
                measure:
                  "Unplanned downtime; cancelled procedures",
              },
              {
                name: "Clinical regulatory compliance / SOP chatbot",
                description:
                  "Retrieve controlled procedures and escalate uncertainty",
                measure:
                  "Policy retrieval accuracy; audit findings",
              },
            ],
          },
          {
            title: "Finance, HR & procurement",
            items: [
              {
                name: "Financial planning and control tower",
                description:
                  "Consolidate forecasts and operating signals",
                measure:
                  "Forecast error; reporting cycle time",
              },
              {
                name: "Finance automation and reconciliation",
                description:
                  "Match transactions and route exceptions",
                measure:
                  "Close time; reconciliation backlog; correction rate",
              },
              {
                name: "Procurement spend cube and optimisation",
                description:
                  "Analyse purchasing patterns and exceptions",
                measure:
                  "Price variance; contract compliance",
              },
              {
                name: "Supply-chain and demand forecasting",
                description:
                  "Support stock planning and replenishment",
                measure:
                  "Stockouts; expiry; emergency purchases",
              },
              {
                name: "Talent-acquisition copilot and AR/VR nurse training",
                description:
                  "Support staffing and skills development",
                measure:
                  "Time to fill; training competency; retention",
              },
            ],
          },
          {
            title: "IT & data",
            items: [
              {
                name: "Clinical research-ready data infrastructure",
                description:
                  "Create governed, traceable and usable data",
                measure:
                  "Completeness; provenance; retrieval accuracy",
              },
              {
                name: "Cybersecurity",
                description:
                  "Protect systems, identities and sensitive information",
                measure:
                  "Access-control failures; response time; recovery readiness",
              },
            ],
          },
        ],
        caption:
          "Capability landscape adapted from the supplied Bain–HealthQuad Figure 5 material. Process implications and measures are editorial synthesis. Digital infrastructure and AR/VR are not necessarily AI applications in themselves.",
      },
      {
        type: "heading",
        text: "A useful application is not always a ready application.",
        id: "prioritisation",
      },
      {
        type: "paragraph",
        text: "The supplied assessment distinguishes the value a use case offers, the ease of putting it into practice and the confidence needed to rely on it. Higher trust means greater confidence in the application, rather than higher clinical risk.",
        lead: true,
      },
      {
        type: "framework-cards",
        cards: [
          {
            title: "Value",
            description:
              "Effects on appropriate access, capacity, quality and economics.",
          },
          {
            title: "Deployability",
            description:
              "Fit with records, systems, workflows and staff capability.",
          },
          {
            title: "Trust",
            description:
              "Validation, accountability, governance and user confidence.",
          },
        ],
      },
      {
        type: "assessment-table",
        label: "Exhibit 1 · Assessment across 11 touchpoints",
        qualifier: "Qualitative bands · India provider interviews",
        headers: ["Touchpoint", "Value", "Deployability", "Trust"],
        rows: [
          {
            touchpoint: "Outreach & acquisition",
            cells: [
              {
                rating: "low",
                text: "Chatbots offer limited incremental economic value.",
              },
              {
                rating: "high",
                text: "Digital infrastructure is already available.",
              },
              {
                rating: "high",
                text: "Limited clinical exposure.",
              },
            ],
          },
          {
            touchpoint: "Appointment & preclinical triage",
            cells: [
              {
                rating: "high",
                text: "Routing offers value; clinical triage has seen abandonment.",
              },
              {
                rating: "very-high",
                text: "Scheduling systems are live at many providers.",
              },
              {
                rating: "medium",
                text: "Clinical triage encounters resistance.",
              },
            ],
          },
          {
            touchpoint: "Registration & front desk",
            cells: [
              {
                rating: "low",
                text: "Mostly rules-based, with limited AI use.",
              },
              {
                rating: "medium",
                text: "Outpatient EMRs are more established; inpatient coverage is thin.",
              },
              {
                rating: "high",
                text: "Low clinical exposure, with privacy concerns.",
              },
            ],
          },
          {
            touchpoint: "OPD / clinical consult",
            cells: [
              {
                rating: "high",
                text: "Ambient scribes are live and scaling.",
              },
              {
                rating: "medium",
                text: "Multilingual and medication-master gaps remain.",
              },
              {
                rating: "medium",
                text: "Clinician review is essential; prescription entry remains manual.",
              },
            ],
          },
          {
            touchpoint: "Diagnostics: pathology & imaging",
            cells: [
              {
                rating: "high",
                text: "Population-level value; per-patient ROI remains unproven.",
              },
              {
                rating: "low",
                text: "PACS readiness and GPU cost can constrain deployment.",
              },
              {
                rating: "medium",
                text: "Western-trained data and doctor-certification requirements.",
              },
            ],
          },
          {
            touchpoint: "Inpatient & surgical care",
            cells: [
              {
                rating: "medium",
                text: "Monitoring shows value; surgical AI remains early.",
              },
              {
                rating: "low",
                text: "Inpatient EMR coverage is limited.",
              },
              {
                rating: "low",
                text: "High clinical risk and long validation cycles.",
              },
            ],
          },
          {
            touchpoint: "Claims & billing",
            cells: [
              {
                rating: "high",
                text: "AI-assisted ICD coding can shorten discharge delays.",
              },
              {
                rating: "high",
                text: "Rules-based systems operate already; AI adds a layer.",
              },
              {
                rating: "medium",
                text: "Payer adjudication AI can introduce new risks.",
              },
            ],
          },
          {
            touchpoint: "Post-discharge monitoring",
            cells: [
              {
                rating: "low",
                text: "Substantial unfilled opportunity; no established product AI in this assessment.",
              },
              {
                rating: "medium",
                text: "EMRs are early for longitudinal models.",
              },
              {
                rating: "medium",
                text: "Reimbursement and operating-model gaps.",
              },
            ],
          },
          {
            touchpoint: "Clinical operations",
            cells: [
              {
                rating: "medium",
                text: "Integration complexity limits value capture.",
              },
              {
                rating: "medium",
                text: "Real-time links are hard; handoffs remain partly manual.",
              },
              {
                rating: "high",
                text: "Mainly operational risk.",
              },
            ],
          },
          {
            touchpoint: "Finance, HR & procurement",
            cells: [
              {
                rating: "very-high",
                text: "Finance AI is operating; HR results are mixed.",
              },
              {
                rating: "very-high",
                text: "ERP and finance systems are already digitised.",
              },
              {
                rating: "high",
                text: "Limited clinical exposure and auditable outputs.",
              },
            ],
          },
          {
            touchpoint: "IT & data",
            cells: [
              {
                rating: "high",
                text: "Cybersecurity AI is in production.",
              },
              {
                rating: "high",
                text: "Leaders are cloud-first; inpatient data remains incomplete.",
              },
              {
                rating: "high",
                text: "Cyber-AI is accepted; no direct patient-facing exposure in this assessment.",
              },
            ],
          },
        ],
        caption:
          'Bands are transcribed from the supplied Figure 6: Low, Medium, High and Very high. They are ordinal assessments, not numerical scores or measured returns. Trust statements refer to the application scope evaluated; they do not imply that cybersecurity, privacy or patient risk is absent.',
        source:
          'Adapted from Bain & HealthQuad, AI in Indian Healthcare Delivery, Figure 6, September 2026. Based on interviews with CIOs of more than 20 leading hospitals and diagnostic labs in India.',
      },
      {
        type: "heading",
        text: "Three adoption horizons.",
        id: "adoption-waves",
      },
      {
        type: "paragraph",
        text: "The second supplied exhibit groups touchpoints by relative value and deployability, with trust influencing readiness. The lanes below preserve those groupings without inventing coordinates or bubble sizes.",
        lead: true,
      },
      {
        type: "adoption-waves",
        label: "Exhibit 2 · Adoption horizons",
        qualifier: "Reframed from the supplied opportunity map",
        waves: [
          {
            number: "01",
            phase: "Where value and readiness align",
            title: "Scale now",
            items: [
              "Appointment scheduling & preclinical routing",
              "OPD / clinical consultation — mainly ambient scribing",
              "Claims & billing",
              "Finance, HR & procurement",
            ],
            caption:
              "Validate each application separately. Scheduling readiness does not establish readiness for autonomous clinical triage.",
          },
          {
            number: "02",
            phase: "Where foundations need investment",
            title: "Build toward",
            items: [
              "Diagnostics: pathology & imaging",
              "Clinical operations",
              "IT & data",
            ],
            caption:
              "Prioritise integration, local evidence and reliable information flows.",
          },
          {
            number: "03",
            phase: "Where dependencies remain substantial",
            title: "Future horizon",
            items: [
              "Outreach & acquisition",
              "Registration & front desk",
              "Post-discharge & monitoring",
              "Inpatient & surgical care",
            ],
            caption:
              "The horizon concerns additional AI value at the touchpoint; basic registration, reminders and other digital services may already be routine.",
          },
        ],
        source:
          'Adapted from Bain & HealthQuad, AI in Indian Healthcare Delivery, Figure 7, September 2026. Based on interviews with CIOs of more than 20 leading hospitals and diagnostic labs in India. “Scale now” is a relative readiness assessment, not a blanket recommendation for every organisation or application.',
      },
      {
        type: "heading",
        text: "Fit the method to the process.",
        id: "delivery",
      },
      {
        type: "paragraph",
        text: "The implementation should reflect the workflow’s information needs, exception patterns and required clinical review. The following is an analytical application of the research, rather than a vendor prescription.",
        lead: true,
      },
      {
        type: "figure-table",
        label: "",
        title: "",
        headers: [
          "Process need",
          "Potential technology fit",
          "What to establish first",
        ],
        rows: [
          [
            "Eligibility, routing and repeatable checks",
            "Rules, workflow software and automation",
            "Authoritative rules, exception ownership and auditability",
          ],
          [
            "Demand, capacity and risk patterns",
            "Statistical models and machine learning",
            "Reliable historical data and validation against actual decisions",
          ],
          [
            "Image interpretation and prioritisation",
            "Computer vision and specialist diagnostic tools",
            "Local validation, clinical review and PACS integration",
          ],
          [
            "Notes, summaries and patient queries",
            "Generative AI with approved information and review",
            "Accuracy, consent, language fit and correction workload",
          ],
          [
            "Coordination across systems",
            "Agentic workflows within defined action permissions",
            "System access, handoff rules, exception handling and monitoring",
          ],
        ],
      },
      {
        type: "delivery-options",
        options: [
          {
            eyebrow: "Buy",
            title: "Established capability",
            description:
              "Consider a validated product when the workflow is common and integration is supportable.",
          },
          {
            eyebrow: "Build",
            title: "Institution-specific advantage",
            description:
              "Consider internal development when unique data or workflow needs justify ongoing ownership.",
          },
          {
            eyebrow: "Co-develop",
            title: "Workflow and clinical fit",
            description:
              "Combine technical delivery with care-team input, local evaluation and shared accountability.",
          },
        ],
      },
      {
        type: "heading",
        text: "What implementation evidence shows.",
        id: "cases",
      },
      {
        type: "paragraph",
        text: "Case results help explain the mechanism of improvement. Each still depends on the institution, baseline and measurement method.",
        lead: true,
      },
      {
        type: "case-grid",
        cases: [
          {
            tag: "India · provider-reported case · S11",
            title: "Claims coordination and discharge",
            metric: "6–7 hours",
            description:
              "Bain describes a specialised gastroenterology group reporting shorter discharge turnaround after claims-query automation.",
            orgLens: "fewer administrative delays.",
            patientLens:
              "less time waiting to leave after care.",
            caption:
              "Anonymous provider case; study design and attribution were not independently verified.",
          },
          {
            tag: "India · provider-reported case · S11",
            title: "Nursing information handover",
            metric: "~30 → <5 min",
            description:
              "A cardiac-care group reported shorter nurse handovers.",
            orgLens: "less time transferring information.",
            patientLens:
              "continuity is an outcome to test, not a demonstrated effect in the case.",
            caption:
              "Anonymous provider case; this is not a sector-wide effect size.",
          },
          {
            tag: "US · observational study · S16",
            title: "Documentation and capacity",
            metric: "+0.80",
            description:
              "Additional encounters per physician per week associated with ambient-scribe adoption in a UCSF analysis.",
            orgLens: "capacity and documentation.",
            patientLens:
              "access effects require separate measurement.",
            caption:
              "One health system; nonrandomised. Not a net-profit or clinic-wide ROI estimate.",
          },
        ],
      },
      {
        type: "heading",
        text: "Keep the denominator in view.",
        id: "evidence",
      },
      {
        type: "paragraph",
        text: "An adoption barrier, a consumer preference and an implementation outcome answer different questions. Each chart retains its own population, denominator and evidence type.",
        lead: true,
      },
      {
        type: "horizontal-bar-charts",
        charts: [
          {
            source: "S03 · Bain / Bessemer / AWS",
            title: "What blocks provider adoption",
            bars: [
              { label: "Security concerns", value: 50 },
              { label: "In-house expertise", value: 48 },
              { label: "Integration costs", value: 43 },
              { label: "AI-ready data", value: 41 },
            ],
            caption:
              "Provider responses, 2025. Categories overlap. This chart describes barriers, not the share of implementations that failed.",
          },
          {
            source: "S08 · PwC consumer survey",
            title: "Patients want help navigating care",
            bars: [
              { label: "All consumers", value: 53 },
              { label: "Sandwich-generation segment", value: 73 },
            ],
            caption:
              "US consumers, 2025. Current use OR interest in AI care navigation. The subgroup is part of the overall sample, not a separate population to add.",
          },
          {
            source: "S15 · JAMA Network Open",
            title: "A measured staff-experience signal",
            bars: [
              { label: "Before ambient scribe", value: 51.9 },
              { label: "After 30 days", value: 38.8 },
            ],
            caption:
              "Adjusted burnout prevalence estimates; 186 participants in the model. Observational and self-reported. Change: 13.1 percentage points; no randomised control.",
          },
        ],
      },
      {
        type: "heading",
        text: "Turn applications into accountable processes.",
        id: "imperatives",
      },
      {
        type: "paragraph",
        text: "For hospitals, clinics and smaller providers, adoption decisions should connect operational improvement to a measurable patient benefit.",
        lead: true,
      },
      {
        type: "imperative-list",
        items: [
          {
            title:
              "Choose a recurring problem with an accountable owner.",
            description:
              "Define the process, the people doing the work and the desired service outcome.",
          },
          {
            title:
              "Establish both operational and patient baselines.",
            description:
              "Pair staff minutes, throughput or cost with access, clarity, attention or continuity.",
          },
          {
            title:
              "Assess value, deployability and trust locally.",
            description:
              "Use the exhibits as a discussion framework; check the organisation’s actual systems and constraints.",
          },
          {
            title:
              "Integrate into the work people already perform.",
            description:
              "Track additional steps, correction effort, exceptions and who resolves them.",
          },
          {
            title: "Evaluate the full economics.",
            description:
              "Include integration, training, oversight and ongoing operating costs. Avoid counting released hours twice.",
          },
          {
            title:
              "Assign decision and review responsibilities.",
            description:
              "Make it clear when clinicians review outputs, when staff intervene and how failures are reported.",
          },
          {
            title: "Scale on sustained evidence.",
            description:
              "Check outcomes over time, including patient complaints and quality measures, before extending the workflow.",
          },
        ],
      },
      {
        type: "heading",
        text: "Translate the workflow to the setting.",
        id: "settings",
      },
      {
        type: "figure-table",
        label: "",
        title: "",
        headers: [
          "Setting",
          "Likely process focus",
          "What to measure locally",
        ],
        rows: [
          [
            "Hospital / institution",
            "Cross-department flow, workforce, clinical documentation and revenue cycle",
            "Capacity with quality maintained; transfer delays; total operating cost",
          ],
          [
            "Specialty clinic / SMB",
            "Booking, intake, notes and clinician-approved follow-up",
            "Staff time per completed visit; missed appointments; patient effort",
          ],
          [
            "Rehabilitation / chronic care",
            "Prescribed-plan completion, progress tracking and escalation",
            "Appropriate adherence and functional progress; support between visits",
          ],
          [
            "Diagnostics",
            "Requisitions, scheduling, report routing and communication",
            "Turnaround, recollections, exceptions and patient understanding",
          ],
        ],
      },
      {
        type: "heading",
        text: "From isolated tasks to continuity of care.",
        id: "outlook",
      },
      {
        type: "paragraph",
        text: "A longer-term opportunity is to connect the stages: information captured at intake can support the visit, the visit can produce clearer instructions, and follow-up can identify unresolved needs. That requires interoperability and operational ownership as well as model capability.",
        lead: true,
      },
      {
        type: "narrative-grid",
        columns: [
          {
            heading: "What institutions can influence",
            paragraphs: [
              "Record quality, system integration, staff responsibilities, patient communication and the way results are measured determine whether an application improves the actual service.",
            ],
          },
          {
            heading: "What the wider ecosystem must support",
            paragraphs: [
              "Shared data standards, consent practices, accessible digital infrastructure and dependable evaluation can make deployment easier across different provider sizes. These are enabling conditions, rather than claims about current legal requirements.",
            ],
          },
        ],
      },
      {
        type: "closing-thesis",
        eyebrow: "The report’s two-outcome test",
        text: "Does the process help the organisation deliver care more efficiently—and make that care easier for the patient to access, understand and continue?",
      },
      {
        type: "heading",
        text: "Research, scope and attribution.",
        id: "sources",
      },
      {
        type: "paragraph",
        text: "This report combines the existing global evidence base with the Bain–HealthQuad report’s analytical sequence and the supplied exhibit insights. The original quantitative research cut-off is 18 October 2026; the Bain report and supplied exhibits were incorporated on 23 October 2026.",
        lead: true,
      },
      {
        type: "source-grid",
        sources: [
          {
            id: "S01",
            title:
              "McKinsey: Generative AI in healthcare: Adoption matures as agentic AI emerges",
            detail:
              "Published: 16 April 2026. Method: online US survey, September–October 2025; 150 leaders, equally divided among payers, clinical-care organisations and healthcare services/technology firms. Directional, not a representative census.",
            links: [
              {
                label: "Original publication",
                url: "https://www.mckinsey.com/industries/healthcare/our-insights/generative-ai-in-healthcare-current-trends-and-future-outlook",
              },
            ],
          },
          {
            id: "S02",
            title:
              "Deloitte: 2026 Global Health Care Outlook",
            detail:
              "Published: 11 December 2025. Method: 180 large-health-system C-suite executives across Australia, Canada, Germany, the Netherlands, UK and US; August–September 2025.",
            links: [
              {
                label: "Original publication",
                url: "https://www.deloitte.com/global/en/insights/industry/health-care/life-sciences-and-health-care-industry-outlooks/2026-global-health-care-outlook.html",
              },
            ],
          },
          {
            id: "S03",
            title:
              "Bain, Bessemer Venture Partners and AWS: The Healthcare AI Adoption Index",
            detail:
              "Published: April 2025. Method: more than 400 leaders across provider, payer and pharmaceutical segments.",
            links: [
              {
                label: "Bain publication",
                url: "https://www.bain.com/insights/the-healthcare-ai-adoption-index/",
              },
              {
                label: "Co-author’s detailed findings",
                url: "https://www.bvp.com/atlas/the-healthcare-ai-adoption-index",
              },
            ],
          },
          {
            id: "S04",
            title:
              "Deloitte: Health care leans into agentic AI",
            detail:
              "Published: 11 February 2026. Method: September 2025 survey of 100 US technology executives: 50 health systems and 50 health plans, organisations with revenue above US$500 million; focus groups with 35 participants.",
            links: [
              {
                label: "Original publication",
                url: "https://www.deloitte.com/us/en/insights/industry/health-care/agentic-ai-health-care-operating-model-change.html",
              },
            ],
          },
          {
            id: "S05",
            title:
              "Deloitte: Restoring purpose in health care work through technology and workforce innovation",
            detail:
              "Published: 21 May 2024. Method: task-based estimation model using available technologies and work redesign, including automation, AI, gen AI and telehealth.",
            links: [
              {
                label: "Original publication",
                url: "https://www.deloitte.com/us/en/insights/industry/health-care/technology-making-health-care-work-more-meaningful.html",
              },
            ],
          },
          {
            id: "S06",
            title:
              "McKinsey: Agentic AI and the race to a touchless revenue cycle",
            detail:
              "Published: 9 January 2026. Method: consultancy analysis of provider revenue-cycle workflows.",
            links: [
              {
                label: "Original publication",
                url: "https://www.mckinsey.com/industries/healthcare/our-insights/agentic-ai-and-the-race-to-a-touchless-revenue-cycle",
              },
            ],
          },
          {
            id: "S07",
            title:
              "McKinsey: Healthcare revenue cycle management at a strategic turning point",
            detail:
              "Published: 30 April 2026. Method: 215 US care-delivery leaders surveyed in September 2025; preceding 2024 survey had 293 respondents.",
            links: [
              {
                label: "Original publication",
                url: "https://www.mckinsey.com/industries/healthcare/our-insights/healthcare-revenue-cycle-management-at-a-strategic-turning-point-survey-insights",
              },
            ],
          },
          {
            id: "S08",
            title:
              "PwC: 2025 US Healthcare Consumer Insights Survey",
            detail:
              "Published: 20 October 2025. Method: 4,030 US adults; online survey, June–July 2025, demographically weighted.",
            links: [
              {
                label: "Survey publication",
                url: "https://www.pwc.com/us/en/industries/health-industries/library/healthcare-consumer-insights-survey.html",
              },
            ],
          },
          {
            id: "S09",
            title:
              "EY: Global Consumer Health Survey 2026",
            detail:
              "Published: 10 June 2026. Method: multinational consumer survey; methodology lists 7,697 adults and seven market groupings, while the summary says approximately 7,500 across 10 markets. Preserve this discrepancy until reconciled.",
            links: [
              {
                label: "Original publication",
                url: "https://www.ey.com/en_gl/newsroom/2026/06/ey-global-consumer-health-survey-2026-health-organizations-must-rethink-care-delivery-as-ai-and-digital-channels-reshape-how-people-seek-and-access-care",
              },
            ],
          },
          {
            id: "S10",
            title:
              "EY–CII: Unleashing digital momentum to shape the future of healthcare",
            detail:
              "Published: September 2025. Method: Indian hospital technology survey and sector analysis. Sample size/selection were not established in the reviewed methodology text; treat as directional.",
            links: [
              {
                label: "Official release",
                url: "https://www.ey.com/en_in/newsroom/2025/09/indian-hospitals-to-hike-it-innovation",
              },
            ],
          },
          {
            id: "S11",
            title:
              "Bain–HealthQuad: AI in Indian Healthcare Delivery",
            detail:
              "Published 17 September 2026. Bain–HealthQuad report; provider interviews and analysis. Figures 6–7 cite CIOs from more than 20 leading Indian hospitals and diagnostic labs. Case studies are anonymous and provider-reported. Qualitative findings should not be generalised as national adoption rates.",
            links: [
              {
                label: "Original report and exhibits",
                url: "https://www.bain.com/insights/ai-in-indian-healthcare-delivery/",
              },
            ],
          },
          {
            id: "S12",
            title:
              "KPMG: 2025 Healthcare CEO Outlook",
            detail:
              "Edition: 2025; reviewed PDF carries a 2026 copyright. Sector CEO survey; verify healthcare subsample details before final publication.",
            links: [
              {
                label: "Full report, page 8",
                url: "https://assets.kpmg.com/content/dam/kpmgsites/xx/pdf/2026/02/ceo-outlook-healthcare-report.pdf.coredownload.inline.pdf",
              },
            ],
          },
          {
            id: "S13",
            title:
              "BCG: What GenAI Means for Health Care Investors",
            detail:
              "Published: 2024. Method: analytical framework and market examples.",
            links: [
              {
                label: "Original publication",
                url: "https://www.bcg.com/publications/2024/what-genai-means-for-health-care-investors",
              },
            ],
          },
          {
            id: "S14",
            title:
              "Accenture: Reinventing health experience for the caregiver and the patient",
            detail:
              "Type: current thematic/industry page; underlying study methodology was not established from this page.",
            links: [
              {
                label: "Original publication",
                url: "https://www.accenture.com/en/industries/health/reinvent-workforce-patient-experience",
              },
            ],
          },
          {
            id: "S15",
            title:
              "JAMA Network Open: Use of Ambient AI Scribes to Reduce Administrative Burden and Professional Burnout",
            detail:
              "Published: 2025. Method: voluntary pre/post quality-improvement study across six US systems, 30-day follow-up; 263 ambulatory clinicians analysed. Burnout modelling included 186 participants.",
            links: [
              {
                label: "Primary research",
                url: "https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2839542",
              },
            ],
          },
          {
            id: "S16",
            title:
              "JAMA Network Open: Ambient Artificial Intelligence Scribes and Physician Financial Productivity",
            detail:
              "Published: 9 January 2026. Method: UCSF observational difference-in-differences analysis; 1,202,734 included encounters, 1,565 physicians, including 698 adopters.",
            links: [
              {
                label: "Primary research",
                url: "https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2843524",
              },
            ],
          },
          {
            id: "S17",
            title:
              "Peterson Health Technology Institute: Adoption of AI in Healthcare Delivery Systems",
            detail:
              "Published: 25 March 2025. Method: interviews and convenings with health-system leaders, AI companies and experts.",
            links: [
              {
                label: "Original findings",
                url: "https://www.phti.org/announcement/ai-scribes-reduce-clinician-burnout/",
              },
            ],
          },
        ],
        provenance: [
          "<strong>Structure and exhibits:</strong> the narrative follows readiness, adoption, prioritisation, delivery choices, case evidence, institutional actions and outlook. The patient-journey landscape draws on Bain–HealthQuad Figure 5. The two new supplied screenshots correspond to Figures 6 and 7; the ordinal table and adoption lanes are redrawn adaptations. They are not numerical scoring models.",
          "<strong>Evidence boundaries:</strong> global surveys, India interview findings, modelled opportunities and implementation studies retain their own populations and methods. Outcome measures and institutional actions are editorial synthesis. “Future horizon” refers to incremental AI opportunity, rather than the availability of basic digital services.",
          "<strong>Reading the figures:</strong> Value denotes expected or observed usefulness; deployability denotes implementation readiness; trust denotes confidence within the evaluated application scope. No bubble coordinates, bubble sizes or percentage scores have been inferred.",
          "<strong>Scope:</strong> 8 patient-journey stages, 34 mapped journey use cases, 11 enterprise capabilities and 17 research source records. Catalogue counts describe this report, not market adoption.",
          "<strong>Abbreviations:</strong> EMR: electronic medical record; ERP: enterprise resource planning; GPU: graphics processing unit; ICD: International Classification of Diseases; IPD: inpatient department; OPD: outpatient department; PACS: picture archiving and communication system.",
        ],
      },
    ],
  },
];

export function getReportBySlug(slug: string): Report | undefined {
  return reports.find((r) => r.slug === slug);
}
