export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; id: string }
  | { type: "subheading"; text: string; id: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; items: string[] };

export interface BlogPost {
  slug: string;
  date: string;
  isoDate: string;
  title: string;
  tag: string;
  description: string;
  readingTime: number;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  gradient: string;
  content: ContentBlock[];
}

const dibyo = {
  name: "Dibyo Majumdar",
  role: "Founder, Deployed",
  avatar: "DM",
};

const priya = {
  name: "Priya Sharma",
  role: "AI Strategy Lead",
  avatar: "PS",
};

export const posts: BlogPost[] = [
  {
    slug: "healthcare-manpower-optimisation",
    date: "4 Sept 2026",
    isoDate: "2026-09-04",
    title: "Healthcare manpower optimisation",
    tag: "Industry",
    description:
      "How a regional hospital network used AI-driven scheduling to cut agency spend by 34% while improving nurse satisfaction scores.",
    readingTime: 8,
    author: dibyo,
    gradient:
      "linear-gradient(135deg, #012a79 0%, #3f7ae0 50%, #7aa5ef 100%)",
    content: [
      {
        type: "paragraph",
        text: "Healthcare staffing is one of the most complex scheduling problems in any industry. A single 500-bed hospital manages thousands of shift assignments per week, each constrained by credentials, patient acuity, union rules, fatigue regulations, and individual preferences. Most systems treat this as a static optimisation problem. We approached it differently.",
      },
      {
        type: "heading",
        text: "The problem: agency spend was a symptom, not the disease",
        id: "the-problem",
      },
      {
        type: "paragraph",
        text: "When MedVista Health — a regional network of four hospitals and twelve outpatient centres — approached us, their immediate pain was agency staffing costs. They were spending $14.2M annually on temporary nurses, up 68% in three years. But agency spend was a downstream symptom of a deeper problem: their scheduling system couldn't adapt to the reality of how healthcare operates.",
      },
      {
        type: "paragraph",
        text: "Shift schedules were built six weeks in advance using a rules-based system from 2014. By the time a schedule went live, an average of 23% of shifts had already been modified. Each modification cascaded — one swap created two or three downstream conflicts. The scheduling team spent more time firefighting than planning.",
      },
      {
        type: "quote",
        text: "We weren't managing schedules. We were managing exceptions to schedules.",
        attribution: "Director of Nursing Operations, MedVista Health",
      },
      {
        type: "heading",
        text: "What we built: adaptive scheduling with preference learning",
        id: "what-we-built",
      },
      {
        type: "paragraph",
        text: "Our system operates on three layers, each feeding into the next. The base layer is a constraint solver that handles the hard requirements — credentials, mandated rest periods, contractual obligations. This replaces the legacy rules engine but isn't where the real value lives.",
      },
      {
        type: "paragraph",
        text: "The second layer is a demand forecaster that predicts staffing needs at the unit level, 72 hours ahead, using admission patterns, seasonal trends, and real-time census data. This moves scheduling from a fixed-horizon exercise to a rolling, adaptive process.",
      },
      {
        type: "paragraph",
        text: "The third layer — and the one that had the most impact on nurse satisfaction — is a preference learning system. It observes shift swap patterns, time-off requests, and voluntary overtime behaviour to build individual preference profiles. When the system generates schedules, it optimises for constraint satisfaction first, then maximises aggregate preference alignment.",
      },
      {
        type: "heading",
        text: "Deployment: embedded with the scheduling team",
        id: "deployment",
      },
      {
        type: "paragraph",
        text: "We embedded two engineers with MedVista's scheduling team for the first eight weeks. This wasn't a handoff — it was a co-build. The scheduling coordinators understood edge cases that no requirements document could capture: which units had informal buddy systems, which shifts were hardest to fill on holiday weekends, which nurses were one bad schedule away from quitting.",
      },
      {
        type: "list",
        items: [
          "Week 1-2: Process mapping and constraint cataloguing across all four hospitals",
          "Week 3-4: Demand forecasting model training on 18 months of historical census data",
          "Week 5-6: Preference learning calibration with voluntary participation from 340 nurses",
          "Week 7-8: Shadow mode — system generates schedules in parallel, coordinators compare and flag gaps",
        ],
      },
      {
        type: "paragraph",
        text: "Shadow mode was critical. It built trust with the scheduling team and surfaced twelve edge cases our constraint model hadn't captured. By the time we went live, the coordinators were already choosing the AI-generated schedule over their own in 78% of comparisons.",
      },
      {
        type: "heading",
        text: "Results: beyond the cost savings",
        id: "results",
      },
      {
        type: "paragraph",
        text: "Six months after full deployment, the numbers told a clear story. Agency spend dropped 34%, from $14.2M to $9.4M annualised. But the second-order effects were more significant.",
      },
      {
        type: "list",
        items: [
          "Agency spend reduced by 34% ($4.8M annualised savings)",
          "Nurse satisfaction scores increased 18 points (measured via quarterly pulse survey)",
          "Schedule modification rate dropped from 23% to 7%",
          "Voluntary overtime uptake increased 41% — nurses chose extra shifts when the system respected their preferences",
          "Coordinator time spent on schedule adjustments reduced by 62%",
        ],
      },
      {
        type: "paragraph",
        text: "The voluntary overtime number is the one that surprised the executive team. When you give nurses schedules that respect their lives, they're willing to give more. The system didn't just reduce costs — it changed the relationship between the organisation and its workforce.",
      },
      {
        type: "heading",
        text: "What we'd do differently",
        id: "what-wed-do-differently",
      },
      {
        type: "paragraph",
        text: "If we were starting this engagement today, we'd bring the union representatives into the process earlier. We engaged them in week three; it should have been week one. Their input on fatigue rules and preference transparency would have saved us a full iteration cycle on the constraint model.",
      },
      {
        type: "paragraph",
        text: "We'd also start the preference learning in shadow mode from day one, even before the constraint solver was complete. Preference data takes time to accumulate, and the earlier you start collecting it, the better your initial schedules will be.",
      },
      {
        type: "heading",
        text: "The hand-off",
        id: "the-hand-off",
      },
      {
        type: "paragraph",
        text: "MedVista's internal team now owns the system entirely. We trained two of their engineers on the model architecture and retraining pipeline. The preference learning system is self-improving — it gets better with every scheduling cycle. Our engagement ended at week fourteen. The system has been running independently for four months with no degradation in performance.",
      },
      {
        type: "paragraph",
        text: "This is what we mean by deployment, not dependency. The value compounds after we leave.",
      },
    ],
  },
  {
    slug: "building-trust-loops-into-agentic-workflows",
    date: "28 Jun 2026",
    isoDate: "2026-06-28",
    title: "Building trust loops into agentic workflows",
    tag: "Technology",
    description:
      "How we design human-in-the-loop checkpoints that maintain velocity without sacrificing oversight or compliance.",
    readingTime: 6,
    author: priya,
    gradient:
      "linear-gradient(135deg, #012057 0%, #3f7ae0 50%, #dfe9fb 100%)",
    content: [],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, count = 3): BlogPost[] {
  const post = getPostBySlug(slug);
  if (!post) return [];
  return posts
    .filter((p) => p.slug !== slug && p.tag === post.tag)
    .slice(0, count);
}

export function getAdjacentPosts(slug: string) {
  const idx = posts.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? posts[idx - 1] : null,
    next: idx < posts.length - 1 ? posts[idx + 1] : null,
  };
}
