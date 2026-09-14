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
  | { type: "pull-quote"; text: string };

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
  };
  gradient: string;
  coverImage?: string;
  content: ContentBlock[];
}

const deployedTeam = {
  name: "The Deployed Team",
  role: "Strategy & Embedded Deployment",
  avatar: "D",
  avatarImage: "/icon.jpeg",
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
    content: [
      {
        type: "heading",
        text: "Deployed is the function.",
        id: "transition",
      },
      {
        type: "paragraph",
        text: "We think of an organisation as an operating state: its processes, data, business context and KPIs. Deployed is the function that transitions that state.",
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
