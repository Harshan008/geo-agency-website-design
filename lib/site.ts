export const site = {
  name: "[AGENCY NAME]",
  shortName: "[AGENCY NAME]",
  domain: "https://example.com",
  tagline: "Generative Engine Optimization",
  description:
    "A founder-led Generative Engine Optimization (GEO) agency. We audit and improve how AI search and answer systems discover, understand, mention, summarize and cite your business.",
  email: "[EMAIL]",
  founder: "[FOUNDER NAME]",
  founderRole: "Founder & Principal GEO Strategist",
}

export const primaryCta = { label: "Book a Strategy Call", href: "/contact" }
export const secondaryCta = { label: "View Services", href: "/services" }

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Methodology", href: "/methodology" },
  { label: "Results", href: "/results" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
]

export type Service = {
  slug: string
  name: string
  summary: string
  whoNeedsIt: string
  problem: string
  whatWeDo: string[]
  deliverable: string
}

export const services: Service[] = [
  {
    slug: "geo-audit",
    name: "GEO Audit",
    summary:
      "A structured assessment of how AI engines currently discover, interpret and cite your business.",
    whoNeedsIt: "Teams that don't yet know how they appear in AI answers.",
    problem:
      "You have no visibility into whether ChatGPT, Gemini or Perplexity can find, understand and cite you.",
    whatWeDo: [
      "Crawl and evaluate public content for machine readability",
      "Map current entity coverage and knowledge-graph presence",
      "Test retrieval and citation across generative engines",
      "Score readiness across signals and prioritize gaps",
    ],
    deliverable: "A scored audit report with a prioritized remediation roadmap.",
  },
  {
    slug: "ai-visibility-optimization",
    name: "AI Visibility Optimization",
    summary:
      "Ongoing work to increase how often and how accurately AI systems surface your brand.",
    whoNeedsIt: "Brands losing answer-slot share to competitors.",
    problem:
      "Competitors are being cited in AI answers for queries you should own.",
    whatWeDo: [
      "Prioritize high-intent generative queries",
      "Close content and structure gaps that block citation",
      "Strengthen the signals engines use to attribute answers",
      "Track share of citation over time",
    ],
    deliverable: "A measurable increase in accurate brand citations, tracked over time.",
  },
  {
    slug: "answer-content-optimization",
    name: "Answer & Content Optimization",
    summary:
      "Restructuring content so it can be quoted directly and correctly by generative engines.",
    whoNeedsIt: "Teams with content that ranks but is never quoted.",
    problem:
      "Your pages are indexed but your passages are not pulled into AI overviews.",
    whatWeDo: [
      "Rewrite passages into directly quotable, self-contained answers",
      "Add explicit definitions, entities and relationships",
      "Align headings with the questions buyers actually ask",
      "Instrument which passages get retrieved",
    ],
    deliverable: "Answer-ready content pages mapped to target questions.",
  },
  {
    slug: "entity-optimization",
    name: "Entity Optimization",
    summary:
      "Making your company, people and offerings unambiguous to knowledge graphs.",
    whoNeedsIt: "Companies confused with competitors or misdescribed by AI.",
    problem:
      "AI systems conflate your brand with others or describe it incorrectly.",
    whatWeDo: [
      "Define canonical entity descriptions for company, founder and products",
      "Reconcile conflicting information across the web",
      "Implement accurate structured data",
      "Reinforce relationships between entities",
    ],
    deliverable: "A consistent, machine-verifiable entity profile across the web.",
  },
  {
    slug: "technical-geo",
    name: "Technical GEO",
    summary:
      "The crawlability, rendering and structure work that lets engines access your content.",
    whoNeedsIt: "Teams whose content is not fully accessible to AI crawlers.",
    problem:
      "Rendering, structure or access issues prevent engines from reading your content.",
    whatWeDo: [
      "Audit crawlability and render-blocking issues",
      "Implement clean semantic HTML and structured data",
      "Fix canonical, sitemap and access configuration",
      "Validate that key content is machine-readable",
    ],
    deliverable: "A technically accessible, well-structured site engines can parse.",
  },
  {
    slug: "ai-visibility-monitoring",
    name: "AI Visibility Monitoring",
    summary:
      "Continuous tracking of how AI engines mention and cite you over time.",
    whoNeedsIt: "Teams that need to defend and prove AI visibility.",
    problem:
      "AI answers change constantly and you have no ongoing signal.",
    whatWeDo: [
      "Track citations and mentions across generative engines",
      "Alert on shifts in answer-slot ownership",
      "Report share of citation against competitors",
      "Feed findings back into the optimization roadmap",
    ],
    deliverable: "A recurring visibility report with trends and alerts.",
  },
]

export type Phase = {
  step: string
  name: string
  question: string
  description: string
  outputs: string[]
}

export const methodology: Phase[] = [
  {
    step: "01",
    name: "Discover",
    question: "What does the web currently say about you?",
    description:
      "We gather your public content, entity presence and the queries that matter to your buyers.",
    outputs: ["Content inventory", "Entity map", "Priority query set"],
  },
  {
    step: "02",
    name: "Diagnose",
    question: "How do AI engines currently understand you?",
    description:
      "We test retrieval and citation across generative engines and score readiness by signal.",
    outputs: ["Readiness score", "Citation baseline", "Signal-level findings"],
  },
  {
    step: "03",
    name: "Identify Gaps",
    question: "What is blocking accurate citation?",
    description:
      "We isolate the content, structure and entity gaps that keep you out of AI answers.",
    outputs: ["Prioritized gap list", "Competitor answer-slot analysis"],
  },
  {
    step: "04",
    name: "Optimize",
    question: "What changes make you citable?",
    description:
      "We implement content, entity and technical changes engines can read and attribute.",
    outputs: ["Answer-ready content", "Structured data", "Entity corrections"],
  },
  {
    step: "05",
    name: "Measure",
    question: "Did visibility actually improve?",
    description:
      "We track citations, mentions and share of answer against a baseline over time.",
    outputs: ["Citation trend", "Share-of-answer report"],
  },
  {
    step: "06",
    name: "Iterate",
    question: "What compounds the result?",
    description:
      "We feed measurement back into the roadmap and repeat where the return is highest.",
    outputs: ["Updated roadmap", "Next-cycle priorities"],
  },
]

export const auditSignals = [
  {
    name: "Crawlability",
    description: "Whether AI crawlers can access and render your key content.",
  },
  {
    name: "Semantic Structure",
    description: "Whether headings, HTML and passages express clear meaning.",
  },
  {
    name: "Entity Clarity",
    description: "Whether your company, people and products are unambiguous.",
  },
  {
    name: "Structured Data",
    description: "Whether machine-readable markup matches visible content.",
  },
  {
    name: "Answer Readiness",
    description: "Whether passages can be quoted directly and correctly.",
  },
  {
    name: "Citation Presence",
    description: "Whether engines currently mention and attribute you.",
  },
]

export type GlossaryTerm = {
  term: string
  slug: string
  definition: string
  whyItMatters: string
  example: string
  misunderstanding: string
  related: string[]
}

export const glossary: GlossaryTerm[] = [
  {
    term: "Generative Engine Optimization (GEO)",
    slug: "geo",
    definition:
      "The practice of improving how AI-powered search and answer systems discover, understand, mention, summarize and cite a business.",
    whyItMatters:
      "AI answers increasingly replace lists of blue links, so citation inside answers drives discovery.",
    example:
      "Restructuring a pricing page so an assistant can quote your model correctly.",
    misunderstanding:
      "GEO is not a replacement for SEO — it addresses a different retrieval and citation layer.",
    related: ["AI Search", "Answer Slot", "Entity"],
  },
  {
    term: "Answer Slot",
    slug: "answer-slot",
    definition:
      "The position within an AI-generated answer where a source is quoted or cited.",
    whyItMatters:
      "Owning the answer slot for a query is the generative equivalent of ranking first.",
    example:
      "An assistant quoting your definition of a term instead of a competitor's.",
    misunderstanding:
      "Answer slots are not fixed rankings; they change per query and per engine.",
    related: ["Citation", "Retrieval", "GEO"],
  },
  {
    term: "Entity",
    slug: "entity",
    definition:
      "A distinct, identifiable thing — such as a company, person or product — that engines track and relate.",
    whyItMatters:
      "Engines cite entities they can identify unambiguously and describe consistently.",
    example:
      "Your company represented as one canonical entity rather than several conflicting profiles.",
    misunderstanding:
      "An entity is not a keyword; it is an identifiable thing with relationships.",
    related: ["Knowledge Graph", "Entity Optimization", "GEO"],
  },
  {
    term: "Retrieval",
    slug: "retrieval",
    definition:
      "The step where an engine pulls candidate passages to build an answer.",
    whyItMatters:
      "If your content is never retrieved, it can never be cited.",
    example:
      "A self-contained passage being selected to answer a comparison question.",
    misunderstanding:
      "Being indexed is not the same as being retrieved for a given query.",
    related: ["Answer Slot", "Answer Readiness", "GEO"],
  },
  {
    term: "Citation",
    slug: "citation",
    definition:
      "An engine's attribution of part of a generated answer to a specific source.",
    whyItMatters:
      "Citation is the measurable unit of AI visibility — it is what sends recognition and traffic back to you.",
    example:
      "An assistant linking your documentation as the source for a technical claim it made.",
    misunderstanding:
      "A mention is not a citation; being named in prose without attribution carries no source credit.",
    related: ["Answer Slot", "Share of Answer", "Retrieval"],
  },
  {
    term: "Answer Readiness",
    slug: "answer-readiness",
    definition:
      "The degree to which a passage can be quoted directly and correctly without its surrounding page.",
    whyItMatters:
      "Engines lift passages out of context, so a passage that depends on context cannot be used.",
    example:
      "A definition that names its subject explicitly instead of opening with \"this approach\".",
    misunderstanding:
      "Answer readiness is about self-containment and clarity, not about writing shorter content.",
    related: ["Retrieval", "Passage", "GEO"],
  },
  {
    term: "Knowledge Graph",
    slug: "knowledge-graph",
    definition:
      "A structured representation of entities and the relationships between them, used by search and answer systems.",
    whyItMatters:
      "Your position in the graph determines whether engines can identify you and relate you to a category.",
    example:
      "A company linked to its founder, its industry and its products as distinct connected entities.",
    misunderstanding:
      "A knowledge graph is not a single public database; each engine builds and maintains its own.",
    related: ["Entity", "Entity Optimization", "Structured Data"],
  },
  {
    term: "Structured Data",
    slug: "structured-data",
    definition:
      "Machine-readable markup, commonly JSON-LD, that states what a page and its subject are.",
    whyItMatters:
      "It removes ambiguity about entities and relationships that prose alone leaves open to interpretation.",
    example:
      "Organization markup naming a company, its founder and its contact address.",
    misunderstanding:
      "Structured data does not override visible content; markup that contradicts the page weakens the signal.",
    related: ["Entity", "Knowledge Graph", "Technical GEO"],
  },
  {
    term: "Share of Answer",
    slug: "share-of-answer",
    definition:
      "The proportion of answers to a defined set of queries in which a given brand is cited.",
    whyItMatters:
      "It converts AI visibility from an anecdote into a trackable metric with a competitive baseline.",
    example:
      "Measuring how often you versus three competitors are cited across a fixed query set.",
    misunderstanding:
      "Share of answer is specific to a query set and an engine; it is not one universal score.",
    related: ["Citation", "AI Visibility Monitoring", "Answer Slot"],
  },
  {
    term: "Passage",
    slug: "passage",
    definition:
      "A contiguous block of text an engine can retrieve and quote independently of its page.",
    whyItMatters:
      "Generative retrieval competes at passage level, so the passage — not the page — is the unit of optimization.",
    example:
      "A single paragraph under a question-shaped heading that fully answers that question.",
    misunderstanding:
      "Page authority does not make its passages quotable; a strong page can contain no usable passage.",
    related: ["Retrieval", "Answer Readiness", "Answer Slot"],
  },
  {
    term: "AI Search",
    slug: "ai-search",
    definition:
      "Search experiences that return a generated answer rather than, or alongside, a list of links.",
    whyItMatters:
      "When the answer replaces the result list, visibility depends on being in the answer rather than on it.",
    example:
      "Asking an assistant to compare vendors and receiving a synthesized recommendation with sources.",
    misunderstanding:
      "AI search has not replaced classical search; both run, and they reward different things.",
    related: ["GEO", "Answer Slot", "Retrieval"],
  },
]

export const insightCategories = [
  "GEO",
  "AI Search",
  "AI Visibility",
  "Entity Optimization",
  "Content",
  "Technical",
  "Experiments",
  "Case Studies",
] as const

export type Source = {
  title: string
  publisher: string
  url: string
}

export type Insight = {
  slug: string
  title: string
  thesis: string
  category: string
  author: string
  published: string
  updated: string
  readingTime: string
  sections: { heading: string; body: string[] }[]
  keyFindings: string[]
  evidence: string
  sources: Source[]
  implications: string[]
  conclusion: string
}

export const insights: Insight[] = [
  {
    slug: "how-ai-engines-choose-what-to-cite",
    title: "How AI Engines Choose What to Cite",
    thesis:
      "Generative engines cite sources that are retrievable, self-contained and unambiguous — not simply the highest-ranking pages.",
    category: "AI Search",
    author: site.founder,
    published: "2026-01-14",
    updated: "2026-02-02",
    readingTime: "8 min",
    sections: [
      {
        heading: "Citation happens after retrieval, not after ranking",
        body: [
          "A generative engine answers a question in stages. It interprets the question, retrieves a set of candidate passages, composes an answer from them, and attributes that answer to the sources it used. Ranking influences which documents are available to the retrieval step. It does not decide which passage gets quoted.",
          "This is why a page can hold a strong classical search position and still never appear in an AI answer. The page was reachable. The passage inside it was not usable.",
        ],
      },
      {
        heading: "Three properties make a passage usable",
        body: [
          "A passage is retrievable when a crawler can reach it, render it and read it as text. Content locked behind client-side rendering, interaction or access controls fails at this step regardless of quality.",
          "A passage is self-contained when it answers the question without requiring the surrounding page. A definition that begins with \"this\" or \"our approach\" carries a dependency the engine cannot resolve once the passage is lifted out of context.",
          "A passage is unambiguous when the things it refers to are named explicitly. \"The platform integrates with major providers\" names nothing. \"[Company] integrates with [named systems]\" gives the engine entities it can match, verify and attribute.",
        ],
      },
      {
        heading: "Why ranking and citation diverge",
        body: [
          "Classical search rewards a page as a whole — its authority, its links, its overall topical fit. Generative retrieval operates at passage level. The unit of competition is smaller, and the qualities that win are different.",
          "A long page that covers a topic comprehensively can rank well precisely because it is comprehensive, and be quoted rarely because no single part of it stands alone. A shorter page with one clean, direct, well-named answer can lose the ranking and win the citation.",
        ],
      },
      {
        heading: "What this changes about content work",
        body: [
          "The practical shift is from optimizing pages to optimizing passages. Every question a buyer might ask should have a passage somewhere on your site that answers it in full, in its own words, with its entities named.",
          "That passage should appear near a heading that states the question, because headings are one of the strongest structural signals available to a retrieval system reading your HTML.",
        ],
      },
    ],
    keyFindings: [
      "Citation is decided at the passage level, not the page level.",
      "Retrievability, self-containment and entity clarity are the properties that make a passage quotable.",
      "A page can rank well and still be structurally unquotable.",
      "Headings that state the question improve the odds that the passage beneath them is selected.",
    ],
    evidence:
      "The positions above are drawn from repeated retrieval and citation tests we run against public pages across generative engines, and from the structural patterns shared by the passages those engines return. Test protocol and captured results: [EVIDENCE].",
    sources: [
      { title: "[SOURCE TITLE]", publisher: "[PUBLISHER]", url: "[URL]" },
      { title: "[SOURCE TITLE]", publisher: "[PUBLISHER]", url: "[URL]" },
    ],
    implications: [
      "Audit content by question, not by page — find questions with no self-contained answer anywhere on the site.",
      "Rewrite the highest-value definitions first; they are the passages engines reach for most.",
      "Measure citation separately from ranking, because the two can move in opposite directions.",
    ],
    conclusion:
      "Being findable and being quotable are different problems. Ranking work makes you available to the retrieval step. Passage-level work decides whether you are what gets used.",
  },
  {
    slug: "entity-clarity-and-brand-confusion",
    title: "Entity Clarity and Why AI Confuses Your Brand",
    thesis:
      "When your company exists as several conflicting profiles, engines describe you inconsistently and cite you less.",
    category: "Entity Optimization",
    author: site.founder,
    published: "2026-02-10",
    updated: "2026-02-10",
    readingTime: "6 min",
    sections: [
      {
        heading: "An engine cites things it can identify",
        body: [
          "Generative systems do not reason about brands as strings of text. They resolve them to entities — distinct, identifiable things with attributes and relationships. Before an engine can attribute a claim to your company, it has to decide which company your name refers to.",
          "When that resolution is uncertain, the safest behavior for the model is to hedge, generalize, or cite a source it can identify more confidently. Ambiguity is not neutral. It costs you the citation.",
        ],
      },
      {
        heading: "How conflicting profiles are created",
        body: [
          "Most entity confusion is self-inflicted and accumulates quietly. A company describes itself one way on its homepage, another in its directory listings, another in its founder's public profiles, and another again in old press coverage that was never corrected.",
          "Add a similarly named company in an adjacent market and the engine now has two candidate entities and several inconsistent descriptions of each. It will merge attributes across them, and the merged description will be wrong about both.",
        ],
      },
      {
        heading: "What a resolved entity looks like",
        body: [
          "A resolved entity has one canonical description that appears consistently wherever the company is represented, names its category explicitly, and states its relationships — who founded it, what it offers, where it operates, what it is not.",
          "Structured data supports this, but it does not replace it. Markup that contradicts the visible text weakens the signal rather than strengthening it, because the engine can read both.",
        ],
      },
      {
        heading: "Consistency outperforms volume",
        body: [
          "The common instinct when AI describes a company incorrectly is to publish more content. This rarely helps. Additional inconsistent descriptions add noise to exactly the signal that was already unclear.",
          "Reconciling the descriptions that already exist — aligning them on one canonical wording and one set of stated relationships — addresses the actual cause.",
        ],
      },
    ],
    keyFindings: [
      "Entity resolution happens before citation; an unresolved entity is rarely attributed.",
      "Conflicting self-descriptions across sources are the most common cause of AI misdescription.",
      "Structured data that contradicts visible content weakens rather than strengthens the signal.",
      "Reconciling existing descriptions outperforms publishing additional ones.",
    ],
    evidence:
      "Based on entity reconciliation work and before-and-after description capture across generative engines. See the related experiment for one documented instance. Full protocol and captures: [EVIDENCE].",
    sources: [
      { title: "[SOURCE TITLE]", publisher: "[PUBLISHER]", url: "[URL]" },
    ],
    implications: [
      "Inventory every public description of your company before writing a new one.",
      "Define one canonical description and propagate it to every source you control.",
      "Keep structured data synchronized with visible text at all times.",
    ],
    conclusion:
      "Engines describe confidently what they can identify confidently. Entity work is less about adding information than about removing the contradictions that make identification uncertain.",
  },
  {
    slug: "answer-ready-content-structure",
    title: "What Makes Content Answer-Ready",
    thesis:
      "Answer-ready content states the answer first, stands alone without context, and names its entities explicitly.",
    category: "Content",
    author: site.founder,
    published: "2026-03-03",
    updated: "2026-03-03",
    readingTime: "7 min",
    sections: [
      {
        heading: "Answer first, then explain",
        body: [
          "Marketing content is usually built to hold attention: set the scene, build tension, arrive at the point. Retrieval systems read in the opposite direction. They look for the point, and a passage that buries it looks like a passage with no answer in it.",
          "Stating the direct answer in the first sentence under a heading costs nothing for human readers, who skim for the same thing, and makes the passage legible to a system that will only take one piece of it.",
        ],
      },
      {
        heading: "Every passage must survive being lifted out",
        body: [
          "Write each answer as though it will be read with no page around it, because that is how it will be used. Avoid opening with pronouns that point backwards, references to \"the above\", or product names the surrounding page introduced but this paragraph does not.",
          "A useful test: copy a single paragraph into a blank document. If a reader with no other context could not tell what it is about, an engine cannot either.",
        ],
      },
      {
        heading: "Name the things you are talking about",
        body: [
          "Vague subjects are the most common failure in otherwise well-written B2B content. \"Our solution\", \"the platform\", \"leading companies\" and \"modern teams\" give a retrieval system nothing to anchor to.",
          "Replacing them with explicit names — the company, the product, the category, the integration, the standard — converts prose into something an engine can match against a query and attribute to a source.",
        ],
      },
      {
        heading: "Headings are structure, not decoration",
        body: [
          "Headings tell a parser how the document is organized and what each part claims to address. A heading that states the question a section answers is a direct signal; a heading that is a slogan is noise.",
          "The same applies to the rest of the HTML. Lists that are lists, tables that are tables, and definitions marked as definitions all express meaning that styled divs do not.",
        ],
      },
    ],
    keyFindings: [
      "The direct answer belongs in the first sentence under its heading.",
      "Passages must be comprehensible in isolation, because they are consumed in isolation.",
      "Explicit entity names outperform generic subjects such as \"our solution\" or \"the platform\".",
      "Descriptive headings and semantic HTML carry structural meaning that visual styling does not.",
    ],
    evidence:
      "Derived from passage rewrites tested through retrieval before and after the change. One documented instance is published as a public teardown. Full protocol and captures: [EVIDENCE].",
    sources: [
      { title: "[SOURCE TITLE]", publisher: "[PUBLISHER]", url: "[URL]" },
    ],
    implications: [
      "Restructure existing high-value pages before commissioning new content.",
      "Give each target question its own heading and its own self-contained answer.",
      "Treat semantic HTML as part of the content brief, not as an engineering detail.",
    ],
    conclusion:
      "Answer-ready content is not shorter content or simpler content. It is content organized so that any single part of it can be removed, read and understood on its own.",
  },
]

export type ResultStudy = {
  slug: string
  title: string
  type: "GEO Experiment" | "Public Teardown"
  industry: string
  problem: string
  diagnosis: string
  intervention: string
  evidence: string
  observedResult: string
  limitations: string
  lessons: string
}

export const results: ResultStudy[] = [
  {
    slug: "definition-passage-teardown",
    title: "Public Teardown: Why a Category Page Is Never Quoted",
    type: "Public Teardown",
    industry: "B2B SaaS",
    problem:
      "A well-ranked category page was never quoted in AI overviews for its core term.",
    diagnosis:
      "The definition was split across marketing copy and required page context to make sense.",
    intervention:
      "We rewrote a single self-contained definition passage with explicit entities.",
    evidence:
      "Retrieval tests before and after across three generative engines.",
    observedResult:
      "The rewritten passage was retrieved for the target question in repeated tests.",
    limitations:
      "A single public page; results are illustrative, not a guaranteed outcome.",
    lessons:
      "Quotability depends on self-contained passages, not overall page authority.",
  },
  {
    slug: "entity-reconciliation-experiment",
    title: "GEO Experiment: Reconciling a Conflicting Entity Profile",
    type: "GEO Experiment",
    industry: "Professional Services",
    problem:
      "An assistant described a firm with details belonging to a similarly named company.",
    diagnosis:
      "Conflicting descriptions across public sources produced an ambiguous entity.",
    intervention:
      "We aligned canonical descriptions and structured data across controlled sources.",
    evidence:
      "Prompted descriptions captured before and after the change.",
    observedResult:
      "Descriptions became more consistent with the corrected canonical profile.",
    limitations:
      "Controlled experiment; engine behavior varies and is not fully attributable.",
    lessons:
      "Consistency across sources reduces misattribution more than volume of content.",
  },
]

export const founder = {
  name: site.founder,
  role: site.founderRole,
  location: "[LOCATION]",
  bio: [
    `${site.founder} is the founder of ${site.name} and leads every engagement directly. The work is diagnostic before it is creative: establish how generative engines currently read a business, isolate what blocks accurate citation, then fix those specific things.`,
    "The practice is deliberately narrow. It covers how AI search and answer systems discover, interpret, mention, summarize and cite a business — and nothing outside that.",
  ],
  expertise: [
    "Generative engine retrieval and citation behavior",
    "Entity definition and knowledge-graph reconciliation",
    "Answer-ready content structure",
    "Technical crawlability, rendering and structured data",
    "AI visibility measurement and reporting",
  ],
  profiles: [
    { label: "LinkedIn", url: "[LINKEDIN URL]" },
    { label: "X", url: "[X URL]" },
  ],
}

export const contactObjectives = [
  "Understand my AI visibility baseline",
  "Improve AI visibility for specific queries",
  "Fix how AI describes my company",
  "Make existing content answer-ready",
  "Technical GEO and structured data",
  "Ongoing monitoring and reporting",
  "Something else",
]

export const companyTypes = [
  "B2B SaaS",
  "Professional services",
  "E-commerce",
  "Marketplace",
  "Agency",
  "Enterprise",
  "Other",
]

export const auditPrivacy = [
  {
    title: "We analyze public pages only",
    body: "The audit reads the same publicly accessible pages an AI crawler reads. It does not access logged-in areas, private systems or analytics accounts.",
  },
  {
    title: "We do not sell or share your data",
    body: "Submitted details are used to produce your audit and to contact you about it. They are not sold, rented or passed to advertising networks.",
  },
  {
    title: "You can request deletion",
    body: `Email ${site.email} to have your submission and audit record deleted.`,
  },
]

export const auditLimitations = [
  "Generative engines vary by query, region, account and moment — results are a snapshot, not a guarantee.",
  "An audit measures readiness and current citation presence. It does not predict a specific future ranking or revenue outcome.",
  "Signals are scored against our own published criteria, not against any engine's internal ranking system.",
  "Pages that are not publicly accessible cannot be assessed.",
]
