export type ContentBlock =
  | { type: "paragraph"; text: string; lead?: boolean }
  | { type: "heading"; text: string; id: string }
  | { type: "subheading"; text: string; id: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; items: string[] }
  | {
      type: "figure-transition";
      label: string;
      sublabel: string;
      caption: string;
      inputState: { label: string; items: string[] };
      functionBox: { label: string; name: string; detail: string };
      outputState: { label: string; items: string[] };
      equation: { input: string; output: string };
    }
  | {
      type: "figure-strategy";
      label: string;
      sublabel: string;
      caption: string;
      steps: { title: string; description: string }[];
    }
  | { type: "example-note"; text: string }
  | {
      type: "figure-workflow";
      label: string;
      caption: string;
      before: {
        tag: string;
        title: string;
        steps: { title: string; description: string; owner?: string; highlight?: boolean }[];
        summary: string;
      };
      after: {
        tag: string;
        title: string;
        steps: { title: string; description: string; owner?: string; highlight?: boolean }[];
        summary: string;
      };
    }
  | {
      type: "figure-journey";
      label: string;
      caption?: string;
      steps: { number: string; title: string; description: string }[];
      checkpoint?: string;
    }
  | {
      type: "figure-metrics";
      label: string;
      sublabel?: string;
      caption: string;
      headers: string[];
      rows: string[][];
      valueRule?: string;
    }
  | {
      type: "figure-ownership";
      label: string;
      caption: string;
      items: { title: string; description: string }[];
    }
  | {
      type: "closing-block";
      eyebrow: string;
      quote: string;
      outcomes: string;
      prose: string;
    }
  | { type: "invitation"; title: string; description: string }
  | { type: "pull-quote"; text: string }
  | { type: "equation"; text: string }
  | { type: "references"; items: { text: string; url: string }[] }
  | {
      type: "figure-comparison";
      label: string;
      sublabel: string;
      caption: string;
      cases: {
        title: string;
        values: { amount: string; label: string }[];
        description: string;
      }[];
    }
  | {
      type: "figure-consumption";
      label: string;
      sublabel: string;
      caption: string;
      stages: {
        index: string;
        title: string;
        value: string;
        unit: string;
        description: string;
      }[];
      scenarios: { label: string; total: string }[];
      tableHeaders: string[];
      tableRows: string[][];
    }
  | {
      type: "figure-paths";
      label: string;
      sublabel: string;
      caption: string;
      paths: {
        steps: {
          index?: string;
          title: string;
          description: string;
          isResult?: boolean;
        }[];
      }[];
      lenses: { title: string; description: string }[];
    }
  | {
      type: "figure-deployment";
      label: string;
      sublabel: string;
      caption: string;
      steps: {
        number: string;
        title: string;
        description: string;
        isBoundary?: boolean;
      }[];
      feedback: string;
    };

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
    avatarImage?: string;
    url?: string;
    linkedIn?: string;
  };
  gradient: string;
  coverImage?: string;
  keywords: string[];
  content: ContentBlock[];
}

const deployedTeam = {
  name: "The Deployed Team",
  role: "Strategy & Embedded Deployment",
  avatar: "D",
  avatarImage: "/icon.jpeg",
  url: "https://deployed.md",
};

const princeRaj = {
  name: "Prince Raj",
  role: "Partner & Tech Architect",
  avatar: "PR",
  avatarImage: "/assets/prince-raj.jpeg",
  url: "https://deployed.md",
  linkedIn: "https://www.linkedin.com/in/princexraj/",
};

export const posts: BlogPost[] = [
  {
    slug: "modus-operandi",
    date: "14 Sept 2026",
    isoDate: "2026-09-14",
    title: "Modus operandi for a better operating state",
    tag: "Industry",
    description:
      "Deployed is the function that transitions your organisation to a better operating state. Our approach to strategy, embedded AI deployment and measurable operating leverage.",
    readingTime: 7,
    author: deployedTeam,
    gradient:
      "linear-gradient(135deg, #012057 0%, #163be8 50%, #3f7ae0 100%)",
    coverImage: "/assets/blog-modus-operandi-preview.png",
    keywords: [
      "AI deployment",
      "enterprise AI strategy",
      "operating leverage",
      "embedded AI",
      "forward-deployed engineering",
      "AI transformation",
      "workflow automation",
    ],
    content: [
      {
        type: "heading",
        text: "Deployed is the function.",
        id: "transition",
      },
      {
        type: "paragraph",
        text: "We think of an organisation as an operating state: its processes, data, business context and KPIs. Our team engineer solutions that transitions that state.",
        lead: true,
      },
      {
        type: "paragraph",
        text: "The output is operating leverage. Our work is solution engineering for that transition, delivered through strategy and embedded deployment.",
      },
      {
        type: "figure-transition",
        label: "The transition function",
        sublabel: "State → State",
        caption: "A change in the way the organisation operates, measured through business performance.",
        inputState: {
          label: "Your operating state",
          items: ["Processes", "Data", "Business context", "KPIs"],
        },
        functionBox: {
          label: "The transition function",
          name: "Deployed( )",
          detail: "Strategy\n+ embedded deployment",
        },
        outputState: {
          label: "Operating leverage",
          items: ["Efficiency", "Enhanced workflows", "Autonomy", "Throughput"],
        },
        equation: {
          input: "Deployed(processes, data, business context, KPIs)",
          output: "→ efficiency, enhanced workflows, autonomy, throughput",
        },
      },
      {
        type: "heading",
        text: "Business first. Technology follows.",
        id: "strategy",
      },
      {
        type: "paragraph",
        text: "Our strategy starts with your KPIs and traces through your processes, data and constraints towards technology. We identify what is worth improving before deciding what to build. We bring over a decade of experience as founders and technologists; your business metrics define success.",
      },
      {
        type: "paragraph",
        text: "A slow process is a starting point for investigation. We look at where work waits, what information is missing and which decisions need human judgment. Only then can we determine whether AI can improve the result within your cost, time and operational constraints.",
      },
      {
        type: "figure-strategy",
        label: "The strategy sequence",
        sublabel: "Business → Technology",
        caption: "Each technology decision must trace back to a business outcome.",
        steps: [
          { title: "Business KPI", description: "What result needs to improve?" },
          { title: "Process", description: "How does the work happen today?" },
          { title: "Bottleneck", description: "Where does performance suffer?" },
          { title: "Data & constraints", description: "What information and boundaries matter?" },
          { title: "Intervention", description: "What is worth engineering?" },
          { title: "Measured outcome", description: "Did the change improve the KPI?" },
        ],
      },
      {
        type: "heading",
        text: "Embed with the team. Improve the connected system.",
        id: "embedded",
      },
      {
        type: "paragraph",
        text: "Isolated task automations are insufficient. We work alongside your teams, across departments, to understand how work moves and engineer improvements in the right sequence. AI should strengthen your workflows without forcing your organisation to conform to a generic application. We deliver a first version in weeks, then refine it with your team through production and adoption.",
      },
      {
        type: "paragraph",
        text: "Consider a request that crosses several teams. Preparing the request faster has limited value if it still waits for missing information or a manual handoff. The opportunity is to improve the connected workflow, with clear responsibilities at every step.",
      },
      {
        type: "example-note",
        text: "Illustrative workflow. The example below explains our approach. It is not a customer case study or a claim of measured results.",
      },
      {
        type: "figure-workflow",
        label: "One request, two operating states",
        caption: "The design objective: reduce coordination effort while keeping judgment and accountability explicit. Actual gains must be measured against the starting workflow.",
        before: {
          tag: "Before",
          title: "Manual coordination",
          steps: [
            { title: "Request arrives", description: "A team member reads and routes it." },
            { title: "Gather context", description: "Someone searches for supporting information." },
            { title: "Check with another team", description: "Missing details trigger a follow-up." },
            { title: "Review and decide", description: "The decision-maker assembles the full picture." },
            { title: "Update systems", description: "Someone records the decision and next steps." },
          ],
          summary: "Work depends on repeated manual coordination.",
        },
        after: {
          tag: "After",
          title: "Connected execution",
          steps: [
            { title: "Request arrives", description: "The team receives it in the existing workflow." },
            { title: "Prepare the context", description: "Assemble information from permitted sources.", owner: "AI assists", highlight: true },
            { title: "Surface gaps and exceptions", description: "Flag what needs attention before review.", owner: "AI assists", highlight: true },
            { title: "Review the prepared case", description: "The accountable person decides and approves.", owner: "Human judgment" },
            { title: "Execute approved actions", description: "Update connected systems; record progress and usage.", highlight: true },
          ],
          summary: "The team spends more attention on decisions and exceptions.",
        },
      },
      {
        type: "paragraph",
        text: "Deployment progresses through a feedback loop. We establish how work happens, build the first useful version, learn from the people using it and measure the change before handoff.",
      },
      {
        type: "figure-journey",
        label: "From understanding to ownership",
        steps: [
          { number: "01", title: "Understand", description: "Map the workflow, baseline and constraints." },
          { number: "02", title: "Build", description: "Deliver a first version in weeks." },
          { number: "03", title: "Refine", description: "Use team feedback to reach production." },
          { number: "04", title: "Measure", description: "Verify improvement and running costs." },
          { number: "05", title: "Hand over", description: "Equip the team to operate and adapt." },
        ],
        checkpoint: "The handoff condition: measurable improvement, adoption within the team and the ability to sustain the new operating state.",
      },
      {
        type: "heading",
        text: "Make the economics accountable.",
        id: "economics",
      },
      {
        type: "paragraph",
        text: "Before building, we agree on outcomes, measurement and cost constraints. AI usage, costs and performance remain visible. We engineer within operational and data constraints so AI creates value without becoming a liability. The improvement must be worth substantially more than the cost of making and maintaining the transition.",
      },
      {
        type: "paragraph",
        text: "Measurement starts with the current state. For the illustrative request workflow, we would agree on measures such as the following. The baseline and target come from your business; they are not assumed in advance.",
      },
      {
        type: "figure-metrics",
        label: "What we would measure",
        sublabel: "Illustrative framework",
        caption: "A decision rule, not a forecast. Faster processing alone does not establish financial value; the business benefit must be evidenced.",
        headers: ["Measure", "What it tells us"],
        rows: [
          ["Cycle time", "How long a request takes from arrival to completion."],
          ["Throughput", "How many requests the team completes over a comparable period."],
          ["Quality", "How often requests need correction, rework or escalation."],
          ["Running cost", "The cost of AI usage and ongoing system operation."],
          ["Business value", "Whether the measured benefit justifies transition and maintenance costs."],
        ],
        valueRule: "Value created > cost of transition + cost of sustaining it",
      },
      {
        type: "heading",
        text: "Hand over control. Build for change.",
        id: "ownership",
      },
      {
        type: "paragraph",
        text: "Deployment is complete when the improvement is measurable and your team can sustain it. You retain control of your data, workflows and systems, with self-service dashboards to operate and adapt them. We design for evolving AI models and technology so adopting improvements does not require rebuilding the whole workflow.",
      },
      {
        type: "paragraph",
        text: "In practice, that means making the system understandable and manageable for the people who own the process. New model capabilities should be evaluated against the same outcomes, cost limits and operating requirements before being adopted.",
      },
      {
        type: "figure-ownership",
        label: "What stays with your organisation",
        caption: "The handoff transfers day-to-day operating control to your team.",
        items: [
          { title: "Enhanced workflows", description: "A working process adopted by the team, with clear responsibilities." },
          { title: "Self-service controls", description: "Dashboards and controls to manage the system and make supported changes." },
          { title: "Visibility & ownership", description: "Control of your data and workflows, with AI usage and costs visible to the business." },
          { title: "Room to evolve", description: "A system designed to accommodate newer models, with maintenance support available when needed." },
        ],
      },
      {
        type: "closing-block",
        eyebrow: "06 / Our standard",
        quote: "A deployment succeeds when your team can sustain a measurable improvement at a cost that makes business sense.",
        outcomes: "You pay for outcomes, not the implementation of agentic infrastructure.",
        prose: "Our responsibility is to deliver a better operating state your organisation can own and sustain.",
      },
      {
        type: "invitation",
        title: "Bring us one workflow worth improving.",
        description: "Let’s define the transition—and how we’ll prove its value.",
      },
    ],
  },
  {
    slug: "ai-tokenomics",
    date: "21 Sept 2026",
    isoDate: "2026-09-21",
    title:
      "AI Tokenomics: The Enterprise Question Behind Every AI Workflow",
    tag: "Technology",
    description:
      "AI tokenomics is the way an enterprise understands, allocates, prices, and optimises token consumption across its workflows. It treats tokens not just as a technical metric, but as a unit for the commercialisation of artificial intelligence.",
    readingTime: 3,
    author: princeRaj,
    gradient:
      "linear-gradient(135deg, #010613 0%, #072a78 50%, #0b3d9e 100%)",
    coverImage: "/assets/blog-ai-tokenomics-preview.png",
    keywords: [
      "AI tokenomics",
      "enterprise AI",
      "token consumption",
      "AI workflow",
      "FinOps",
      "token economics",
      "AI cost optimization",
      "enterprise workflow",
      "AI unit economics",
      "Prince Raj",
      "Deployed",
    ],
    content: [
      {
        type: "paragraph",
        text: "Enterprise conversations around AI are changing.",
        lead: true,
      },
      {
        type: "paragraph",
        text: "Earlier, the focus was largely on whether AI could be added to a workflow. Today, the questions are more specific:",
      },
      {
        type: "list",
        items: [
          "How many tokens will this operation consume?",
          "What value will those tokens create?",
          "Where will costs increase?",
          "And can the workflow be designed to use tokens more efficiently?",
        ],
      },
      {
        type: "paragraph",
        text: "These questions point to an emerging enterprise priority: AI tokenomics.",
      },
      {
        type: "pull-quote",
        text: "AI tokenomics is the way an enterprise understands, allocates, prices, and optimises token consumption across its workflows. It treats tokens not just as a technical metric, but as a unit for the commercialisation of artificial intelligence.",
      },
      {
        type: "heading",
        text: "An emerging FinOps problem",
        id: "an-emerging-finops-problem",
      },
      {
        type: "paragraph",
        text: "This makes AI an increasingly important FinOps problem.",
      },
      {
        type: "paragraph",
        text: "Every action in an AI workflow consumes tokens: prompting, context retrieval, tool invocation, memory management, reasoning, and response generation. As AI becomes one of the fastest-growing categories of enterprise expenditure, token consumption needs to be managed with the same attention given to other business costs.",
      },
      {
        type: "paragraph",
        text: "The cost is not driven by one thing alone. Token consumption depends on:",
      },
      {
        type: "list",
        items: [
          "The complexity of the prompt",
          "How context is handled",
          "Tool architecture and its use",
          "The architecture of the enterprise workflow",
          "The agents used in internal operations",
        ],
      },
      {
        type: "paragraph",
        text: "A small change in any of these areas can create a significant difference in token consumption and cost.",
      },
      {
        type: "heading",
        text: "From accounting to economics",
        id: "from-accounting-to-economics",
      },
      {
        type: "paragraph",
        text: "But token accounting alone is not enough.",
      },
      {
        type: "pull-quote",
        text: "Token accounting tells us how many tokens have already been consumed. Tokenomics asks a more important question: how should tokens be planned and used so that they generate more value than cost?",
      },
      {
        type: "paragraph",
        text: "This is the difference between tracking AI usage and designing an AI workflow that makes economic sense.",
      },
      {
        type: "heading",
        text: "Where the tokens go",
        id: "where-the-tokens-go",
      },
      {
        type: "paragraph",
        text: "To understand this, consider a workflow for analysing internal sales documents.",
      },
      {
        type: "paragraph",
        text: "The workflow has three stages:",
      },
      {
        type: "figure-journey",
        label: "Token consumption across workflow stages",
        steps: [
          {
            number: "01",
            title: "Sales Document Ingestion",
            description: "The documents become the input context for the AI workflow.",
          },
          {
            number: "02",
            title: "Sales Reasoning and Analysis",
            description: "The system identifies sales trends, compares regional performance, and highlights customer risks.",
          },
          {
            number: "03",
            title: "Sales Summary Generation",
            description: "The output is built on the document ingestion and reasoning that happened before it.",
          },
        ],
      },
      {
        type: "paragraph",
        text: "Assume that the sales documents include eight files. Each file contains 35 pages, and each page corresponds to approximately 180 tokens.",
      },
      {
        type: "paragraph",
        text: "The first stage is document ingestion. The documents become the input context for the AI workflow.",
      },
      {
        type: "equation",
        text: "t₁ = 8 × 35 × 180 = 50,400 tokens",
      },
      {
        type: "paragraph",
        text: "This means that, before any analysis begins, the workflow has already consumed 50,400 input tokens.",
      },
      {
        type: "paragraph",
        text: "The second stage is sales reasoning and analysis. This is where the system identifies sales trends, compares regional performance, and highlights customer risks.",
      },
      {
        type: "paragraph",
        text: "This is also the most token-intensive stage. Depending on the complexity and depth of the analysis:",
      },
      {
        type: "equation",
        text: "t₂ ∈ [80,000, 220,000] tokens",
      },
      {
        type: "paragraph",
        text: "The final stage generates the sales summary. The output may be short, but it is built on the document ingestion and reasoning that happened before it.",
      },
      {
        type: "equation",
        text: "t₃ ∈ [800, 1,200] tokens",
      },
      {
        type: "paragraph",
        text: "The total token consumption for the complete workflow is:",
      },
      {
        type: "equation",
        text: "T_total = 50,400 + [80,000, 220,000] + [800, 1,200]",
      },
      {
        type: "equation",
        text: "T_total ∈ [131,200, 271,600] tokens",
      },
      {
        type: "paragraph",
        text: "The final sales summary may require only a small number of tokens. However, most token consumption happens in preparing the sales data and conducting the analysis in the background.",
      },
      {
        type: "paragraph",
        text: "This is the point enterprises need to understand.",
      },
      {
        type: "paragraph",
        text: "The important question is not only whether the final output is useful. It is whether the token consumption across every workflow stage is helping the organisation make better sales decisions, identify opportunities, and reduce revenue risk.",
      },
      {
        type: "heading",
        text: "A common analytical structure",
        id: "a-common-analytical-structure",
      },
      {
        type: "paragraph",
        text: "Token planning at each workflow stage affects more than cost. It can influence output quality, risk, and the value created in later stages of the workflow.",
      },
      {
        type: "pull-quote",
        text: "A framework for enterprise workflow tokenomics brings technical, economic, and operational perspectives into one common token-analytical structure.",
      },
      {
        type: "paragraph",
        text: "This means that each workflow stage should be evaluated through three questions:",
      },
      {
        type: "figure-ownership",
        label: "Stage evaluation framework",
        caption: "Each workflow stage should be assessed across these three dimensions.",
        items: [
          {
            title: "Consumption",
            description: "How many tokens does this stage consume?",
          },
          {
            title: "Value generation",
            description: "What value does this stage generate per token?",
          },
          {
            title: "Downstream impact",
            description: "What quality or risk impact does this stage create for the stages that follow?",
          },
        ],
      },
      {
        type: "paragraph",
        text: "In my upcoming blog on tokenomics, I will share how we worked with an enterprise as a forward-deployed team. I will explain how we understood the workflow where they wanted to add an AI system, broke that workflow into multiple stages, and designed tokenomics at each stage.",
      },
      {
        type: "paragraph",
        text: "The focus was not only on technical design. It was on balancing technical, economic, and operational perspectives—and understanding the impact that tokenomics planning had on the overall workflow.",
      },
    ],
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
