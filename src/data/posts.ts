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
    slug: "enterprise-workflow-tokenomics",
    date: "15 Sept 2026",
    isoDate: "2026-09-15",
    title:
      "Enterprise Workflow Tokenomics: The Unit Economics of AI Transformation",
    tag: "Technology",
    description:
      "Tokens are the economic unit of AI consumption. Business outcomes are the return. Enterprise workflow tokenomics keeps the two in balance.",
    readingTime: 7,
    author: princeRaj,
    gradient:
      "linear-gradient(135deg, #010613 0%, #072a78 50%, #0b3d9e 100%)",
    coverImage: "/assets/blog-enterprise-workflow-tokenomics-preview.png",
    keywords: [
      "AI tokenomics",
      "enterprise workflow tokenomics",
      "token economics",
      "AI cost optimization",
      "LLM token consumption",
      "agentic AI costs",
      "AI unit economics",
      "token cost management",
      "enterprise AI deployment",
      "AI workflow cost",
      "Prince Raj",
      "Deployed",
    ],
    content: [
      {
        type: "paragraph",
        text: "Recently, in conversations with business owners and enterprise leaders, I have noticed a shift in how they evaluate AI. The question is no longer only, \"Where can we use AI?\" It is increasingly:",
        lead: true,
      },
      {
        type: "pull-quote",
        text: "What does this workflow cost every time intelligence is used, and does that cost remain justified by the business value it creates?",
      },
      {
        type: "paragraph",
        text: "This is where enterprise workflow tokenomics becomes important.",
      },
      {
        type: "paragraph",
        text: "I see AI tokenomics as the way tokens are consumed, priced, allocated and optimised across workflow functions. Tokens provide an economic unit for measuring AI consumption. Prompting, retrieved context, tool interactions, memory, reasoning and response generation can all add token consumption, which becomes operating cost. Commercial value depends on the successful outcomes that consumption produces.",
      },
      {
        type: "paragraph",
        text: "But tokenomics is not simply token accounting.",
      },
      {
        type: "paragraph",
        text: "Token accounting tells us how many tokens were consumed after the fact. Tokenomics asks a larger question:",
      },
      {
        type: "pull-quote",
        text: "How should token consumption be planned across a workflow so that the intelligence being purchased generates more business value than it costs?",
      },
      {
        type: "heading",
        text: "Tokens as an economic unit",
        id: "tokens-as-an-economic-unit",
      },
      {
        type: "paragraph",
        text: "Token consumption depends on several variables: prompt complexity, how context is handled, tool architecture and usage, the architecture of the enterprise workflow itself, and the number and behaviour of agents operating inside it.",
      },
      {
        type: "paragraph",
        text: "A small deviation in any of these can create a large change in total consumption. An agent can carry unnecessary context, choose an expensive model for a simple step, repeatedly invoke a tool, retry an action, create additional hand-offs, or enter a reasoning loop.",
      },
      {
        type: "paragraph",
        text: "The workflow may still produce the right answer while becoming economically irrational.",
      },
      {
        type: "paragraph",
        text: "This is already becoming a production concern. AWS recommends treating cost as a first-class design constraint for agentic systems, including token budgets, iteration limits and consumption ceilings. Microsoft Research found that repeated agent runs on the same coding task could vary by as much as 30× in token consumption, while higher token consumption did not necessarily translate into better accuracy. Cisco describes tokens as the “working capital” of intelligence and frames tokenomics around understanding which consumption actually contributes to successful task completion. [1][2][3]",
      },
      {
        type: "paragraph",
        text: "This leads to a simple principle:",
      },
      {
        type: "quote",
        text: "An AI workflow can be technically successful and still become a financial liability.",
      },
      {
        type: "paragraph",
        text: "The question is therefore not \"How do we minimise tokens?\"",
      },
      {
        type: "paragraph",
        text: "It is:",
      },
      {
        type: "pull-quote",
        text: "How much intelligence can this business process economically afford, and what return does that intelligence generate?",
      },
      {
        type: "heading",
        text: "Token cost versus business return",
        id: "token-cost-versus-business-return",
      },
      {
        type: "paragraph",
        text: "When enterprises ask how many tokens an operation consumes, they are really trying to understand where the hidden cost sits, whether AI creates enough value to justify that cost, and how the workflow can be optimised before usage scales.",
      },
      {
        type: "paragraph",
        text: "The economic relationship is:",
      },
      {
        type: "equation",
        text: "Token Cost → Successful Output → Business Value",
      },
      {
        type: "figure-comparison",
        label: "Same AI cost. Different economics.",
        sublabel: "Illustrative comparison",
        caption:
          "Token consumption acquires commercial meaning when connected to a successful outcome and its measurable business value. These examples do not include implementation or ongoing non-AI costs.",
        cases: [
          {
            title: "A higher-value outcome",
            values: [
              { amount: "$20", label: "AI execution cost" },
              { amount: "$200", label: "Business value" },
            ],
            description:
              "Value exceeds AI execution cost by $180, before other costs. The workflow may have excellent economics.",
          },
          {
            title: "A lower-value outcome",
            values: [
              { amount: "$20", label: "AI execution cost" },
              { amount: "$5", label: "Business value" },
            ],
            description:
              "AI execution cost exceeds value by $15. A correct output can still be economically unjustified.",
          },
        ],
      },
      {
        type: "paragraph",
        text: "Tokens are an economic unit of AI consumption, but a token count alone cannot establish the commercial value of intelligence. That requires understanding what the consumption produces.",
      },
      {
        type: "paragraph",
        text: "Enterprise workflow tokenomics should therefore consider cost per successful output at each stage of the workflow: how much intelligence was consumed, whether the stage delivered its intended result, and how that result contributes to the business outcome.",
      },
      {
        type: "paragraph",
        text: "Each stage must also be evaluated for its downstream effects. Spending more on accurate extraction may reduce reasoning costs, retries and human intervention later. The financial boundary belongs to the whole workflow; stage-level economics help us understand and control it.",
      },
      {
        type: "equation",
        text: "Cost per Successful Outputᵢ = AI Costᵢ / Successful Outputsᵢ",
      },
      {
        type: "paragraph",
        text: "AI cost should include model consumption and, where relevant, context, tools, APIs and infrastructure.",
      },
      {
        type: "paragraph",
        text: "The purpose of tokenomics is therefore not to starve a system of intelligence. It is to allocate the right amount of intelligence to the right stage of a workflow, within a financially justified boundary.",
      },
      {
        type: "paragraph",
        text: "Microsoft makes a similar distinction in its production guidance: the objective is not simply to minimize tokens, but to lower the cost of a successful outcome while maintaining quality, safety and latency. [4]",
      },
      {
        type: "heading",
        text: "Planning tokenomics at the workflow level",
        id: "planning-tokenomics-at-the-workflow-level",
      },
      {
        type: "paragraph",
        text: "Consider an enterprise workflow that turns internal sales documents into an actionable summary. The input consists of eight files, each containing 35 pages, with approximately 180 tokens per page: 8 × 35 × 180 = 50,400 tokens.",
      },
      {
        type: "paragraph",
        text: "The reasoning stage identifies trends, compares regional performance and surfaces customer risks. Its consumption depends on the complexity of the analysis. In this illustrative model, reasoning uses 80,000–220,000 tokens, while the final summary uses 800–1,200 tokens.",
      },
      {
        type: "figure-consumption",
        label: "Where the tokens go",
        sublabel: "Illustrative token consumption",
        caption:
          "Both bars use the same scale. The visible summary accounts for less than 1% of consumption in each scenario; most tokens are consumed before the answer appears. Token shares are not cost shares: model and token-type pricing can differ.",
        stages: [
          {
            index: "01 / INPUT",
            title: "Document ingestion",
            value: "50,400",
            unit: "tokens · t₁",
            description: "8 files × 35 pages × 180 tokens.",
          },
          {
            index: "02 / ANALYSIS",
            title: "Sales reasoning",
            value: "80,000–220,000",
            unit: "tokens · t₂",
            description: "Interpret trends, performance and risks.",
          },
          {
            index: "03 / OUTPUT",
            title: "Sales summary",
            value: "800–1,200",
            unit: "tokens · t₃",
            description: "The short answer the reader sees.",
          },
        ],
        scenarios: [
          { label: "Lower-consumption scenario", total: "131,200 tokens" },
          { label: "Upper-consumption scenario", total: "271,600 tokens" },
        ],
        tableHeaders: ["Stage", "Lower scenario", "Upper scenario"],
        tableRows: [
          ["Ingestion", "50,400", "50,400"],
          ["Reasoning", "80,000", "220,000"],
          ["Summary", "800", "1,200"],
          ["Total tokens", "131,200", "271,600"],
        ],
      },
      {
        type: "example-note",
        text: "Counting assumption: T = t₁ + t₂ + t₃. Each stage counts distinct token-processing events attributable to that stage. Context processed again in a later model call counts as new consumption in that stage; the same event is never counted twice. These are illustrative totals, not measured usage or a provider billing forecast.",
      },
      {
        type: "paragraph",
        text: "The visible sales summary may be short, but most of the economic consumption happens while preparing, contextualising and analysing the sales data in the background.",
      },
      {
        type: "paragraph",
        text: "That is why an enterprise should understand not merely the size of the final output, but where tokens are being consumed throughout the workflow and whether that consumption is actually improving sales decisions, identifying opportunities and reducing revenue risk.",
      },
      {
        type: "heading",
        text: "A common analytical structure",
        id: "a-common-analytical-structure",
      },
      {
        type: "paragraph",
        text: "A framework for enterprise workflow tokenomics should integrate technical, economic and operational perspectives into a common token analytical structure.",
      },
      {
        type: "paragraph",
        text: "The technical, economic and operational perspectives belong in the same analysis. Architecture determines what intelligence is consumed; output quality influences downstream work; both affect the cost of successful completion.",
      },
      {
        type: "figure-paths",
        label: "One allocation decision. Two possible paths.",
        sublabel: "Qualitative illustration",
        caption:
          "Higher spending does not guarantee higher accuracy. These paths illustrate how stage-level choices can affect total cost; the relationship must be evaluated against actual workflow results.",
        paths: [
          {
            steps: [
              {
                index: "PATH A / EXTRACTION",
                title: "Lower spend, poor accuracy",
                description: "Important context is missed or misread.",
              },
              {
                title: "More downstream work",
                description:
                  "Additional reasoning, retries and human review are needed to repair the result.",
              },
              {
                title: "Total cost can rise",
                description:
                  "The saving at extraction can be outweighed by rework, delays and risk.",
                isResult: true,
              },
            ],
          },
          {
            steps: [
              {
                index: "PATH B / EXTRACTION",
                title: "Higher spend, better accuracy",
                description: "Relevant context is captured correctly.",
              },
              {
                title: "Less downstream rework",
                description:
                  "Later stages need fewer corrections and interventions to complete the task.",
              },
              {
                title: "Total cost can fall",
                description:
                  "Additional early spending can improve the economics of the whole workflow.",
                isResult: true,
              },
            ],
          },
        ],
        lenses: [
          {
            title: "Technical",
            description:
              "How are prompts, context, models, memory, tools and agents constructed?",
          },
          {
            title: "Operational",
            description:
              "How does quality affect retries, human intervention, delays and downstream risk?",
          },
          {
            title: "Economic",
            description:
              "What does successful completion cost, what value does it create, and is it within budget?",
          },
        ],
      },
      {
        type: "paragraph",
        text: "Token allocation at one stage can influence quality, risk and generated value in every stage after it. The objective is to improve the economics of the connected workflow. Additional reasoning is wasteful when it produces no meaningful improvement in the business outcome.",
      },
      {
        type: "paragraph",
        text: "AWS similarly recommends matching model capability, context length and reasoning depth to task complexity, while enforcing consumption ceilings and attributing spend at the workflow level rather than discovering overruns after deployment. [1]",
      },
      {
        type: "paragraph",
        text: "So workflow tokenomics ultimately requires understanding both generated value per token and the downstream risk propagated by how those tokens are allocated.",
      },
      {
        type: "heading",
        text: "Tokenomics as part of forward deployment",
        id: "tokenomics-as-part-of-forward-deployment",
      },
      {
        type: "paragraph",
        text: "This is why tokenomics should be designed before an AI system is deployed, rather than treated as a cost-optimisation exercise afterwards.",
      },
      {
        type: "paragraph",
        text: "When we work as a forward-deployed team, we first understand the enterprise workflow, its process knowledge, business context and the KPIs it is expected to move. That understanding establishes the financial boundaries against which the solution is designed.",
      },
      {
        type: "figure-deployment",
        label: "From business context to viable deployment",
        sublabel: "Deployed’s approach",
        caption:
          "Business economics shape implementation before deployment. Measurement checks whether the workflow continues to deliver value within its agreed boundaries.",
        steps: [
          {
            number: "01",
            title: "Understand the workflow and KPIs",
            description:
              "Map the stages, data, process knowledge, constraints and current performance.",
          },
          {
            number: "02",
            title: "Define successful outputs",
            description:
              "Agree on acceptable quality at each stage and how outputs contribute to business value.",
          },
          {
            number: "03",
            title: "Set financial boundaries",
            description:
              "Estimate stage consumption and downstream effects. Define the cost per successful outcome the workflow can support, alongside usage and retry limits.",
            isBoundary: true,
          },
          {
            number: "04",
            title: "Design the architecture",
            description:
              "Choose models, context, tools, agents, memory and reasoning patterns within those boundaries.",
          },
          {
            number: "05",
            title: "Deploy and measure",
            description:
              "Track successful outcomes, quality, total running cost and business value as usage scales.",
          },
        ],
        feedback:
          "Feed measured results back into architecture and token allocation. Re-evaluate the financial boundary when business conditions change.",
      },
      {
        type: "paragraph",
        text: "The objective is not simply to implement an AI system.",
      },
      {
        type: "paragraph",
        text: "It is to engineer a workflow whose economics remain viable as usage scales.",
      },
      {
        type: "paragraph",
        text: "That is the core idea of enterprise workflow tokenomics:",
      },
      {
        type: "quote",
        text: "Tokens are the economic unit of AI consumption. Business outcomes are the return. Tokenomics is the discipline that keeps the two in balance.",
      },
      {
        type: "paragraph",
        text: "AI transformation should not create a new uncontrolled line item inside the organisation.",
      },
      {
        type: "paragraph",
        text: "Every workflow should have an economic boundary. Every major unit of intelligence should have a reason for being consumed. And the cost of AI should remain proportional to the business value it creates.",
      },
      {
        type: "pull-quote",
        text: "The goal is not to make AI cheaper at any cost. The goal is to make AI economically sustainable enough that it never becomes a liability.",
      },
      {
        type: "references",
        items: [
          {
            text: "AWS — Cost optimization design principles",
            url: "https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/cost-optimization-design-principles.html",
          },
          {
            text: "Microsoft Research — How Do AI Agents Spend Your Money?",
            url: "https://www.microsoft.com/en-us/research/publication/how-do-ai-agents-spend-your-money-analyzing-and-predicting-token-consumption-in-agentic-coding-tasks/",
          },
          {
            text: "Cisco — What is agent tokenomics?",
            url: "https://www.cisco.com/site/us/en/learn/topics/artificial-intelligence/agent-tokenomics.html",
          },
          {
            text: "Microsoft Azure — The economics of agent optimization",
            url: "https://azure.microsoft.com/en-us/blog/the-economics-of-agent-optimization-four-ways-to-lower-the-cost/",
          },
        ],
      },
      {
        type: "invitation",
        title: "Bring us one workflow worth improving.",
        description:
          "Let’s define its economic boundaries—and how we’ll prove its value.",
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
