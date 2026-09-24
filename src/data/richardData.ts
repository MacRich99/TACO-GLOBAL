export interface ProjectCaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: 'brand-identity' | 'digital-flagship' | 'editorial-print' | 'strategic-advisory';
  categoryLabel: string;
  year: string;
  location: string;
  role: string;
  image: string;
  deliverables: string[];
  headline: string;
  summary: string;
  challenge: string;
  solution: string;
  craftDetails: string[];
  outcomes: {
    metric: string;
    label: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    title: string;
    organization: string;
  };
}

export interface Essay {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
}

export interface CareerMilestone {
  period: string;
  title: string;
  organization: string;
  location: string;
  description: string;
}

export const RichardProfile = {
  name: "Richard Awudey",
  displayName: "RICHARD AWUDEY",
  title: "Founder & Executive Creative Director",
  entity: "TAC GLOBAL & TAC STUDIOS",
  creed: "Excellence with Divinity",
  shortBio: "Richard Awudey is an executive creative director, brand architect, and founder shaping enduring visual identities, bespoke digital flagships, and sovereign communications for pioneering institutions across West Africa and the global diaspora.",
  extendedBio: [
    "Rooted in Accra and operating with an international perspective bridging London and global cultural capitals, Richard Awudey founded TAC GLOBAL and TAC STUDIOS to establish a new benchmark for creative authority. Believing that creative craft is both an intellectual discipline and a spiritual commitment, Richard guides high-growth ventures, cultural institutions, and sovereign entities in translating their vision into indelible physical and digital artifacts.",
    "His work rejects synthetic, formulaic shortcuts in favor of deep research, bespoke typographic geometry, and architectural digital engineering. Over the past decade, Richard has directed visual transformations that have collectively mobilized millions in diaspora investment and repositioned heritage brands on the international stage."
  ],
  locations: [
    { city: "Accra", country: "Ghana", role: "Executive Studio & Atelier", timezone: "GMT" },
    { city: "London", country: "United Kingdom", role: "Diaspora & Global Affairs", timezone: "BST" },
    { city: "Worldwide", country: "International", role: "Direct Executive Commissions", timezone: "24/7" }
  ],
  contact: {
    email: "awudeyrichard@gmail.com",
    studioEmail: "inquiries@tacglobal.org",
    phone: "+233 55 123 4567",
    whatsapp: "+233551234567",
    linkedin: "https://linkedin.com",
    availability: "Currently accepting select commissions for Q3 / Q4"
  },
  disciplines: [
    {
      code: "01",
      name: "Brand Architecture & Corporate Identity",
      focus: "Comprehensive visual systems, custom typographic heraldry, vector mastercraft, and corporate design standards engineered for multi-decade longevity."
    },
    {
      code: "02",
      name: "Bespoke Digital Flagships & Web Craft",
      focus: "High-performance digital experiences and editorial web spaces built with surgical front-end precision, zero template slop, and immaculate typography."
    },
    {
      code: "03",
      name: "Executive & Sovereign Communications",
      focus: "High-stakes investor monographs, annual broadsheets, sovereign wealth presentations, and confidential board communications."
    },
    {
      code: "04",
      name: "Creative Direction & Retained Advisory",
      focus: "Long-range strategic counsel for founders, diaspora family offices, and creative institutions navigating pivotal brand repositioning."
    }
  ],
  manifestoTenets: [
    {
      number: "I",
      title: "The Rejection of Synthetic Mediocrity",
      body: "We refuse generic, homogenized digital slop. True design requires genuine human taste, historical understanding, and structural precision."
    },
    {
      number: "II",
      title: "Excellence as a Moral Mandate",
      body: "Our motto, 'Excellence with Divinity', is not a slogan—it is an operating doctrine. The caliber of our work reflects our reverence for the craft and the creators who trust us."
    },
    {
      number: "III",
      title: "Pan-African Modernist Authority",
      body: "African design is neither primitive nor derivative. We architect contemporary systems rooted in profound heritage that command unquestioned prestige globally."
    },
    {
      number: "IV",
      title: "Absolute Discretion & Rigor",
      body: "High-impact leaders require confidentiality and unyielding follow-through. We treat our clients' strategic trajectories with executive gravity."
    }
  ]
};

export const SelectedWorks: ProjectCaseStudy[] = [
  {
    id: "kofi-botanicals",
    slug: "kofi-botanicals",
    title: "Kofi & Co. Heritage Botanicals",
    client: "Kofi Spirits International",
    category: "brand-identity",
    categoryLabel: "Brand Architecture & Packaging",
    year: "2025",
    location: "Accra & London",
    role: "Lead Creative Director",
    image: "/src/assets/images/editorial_brand_archive_1790253245109.jpg",
    deliverables: ["Visual Identity System", "Physical Bottle Packaging & Embossing", "E-Commerce Flagship", "Brand Bible"],
    headline: "Translating century-old West African distillation botanicals into an ultra-luxury spirits presence in Mayfair and Accra.",
    summary: "Kofi & Co. required a brand identity capable of commanding shelf presence in luxury London department stores alongside established Scottish and Japanese labels, while celebrating indigenous Ghanaian botanicals.",
    challenge: "Existing craft spirit branding often defaulted to nostalgic colonial tropes or generic minimalist pastels. The client needed a commanding identity that communicated sovereign luxury, geological terroir, and uncompromising botanical science.",
    solution: "Richard Awudey directed a comprehensive identity system centered on a bespoke serif display face, gold foil relief embossing on textured cotton stock, and a digital flagship engineered for intimate connoisseur storytelling.",
    craftDetails: [
      "Custom ligature pairing developed for the 'K&C' monogram mark",
      "Matte obsidian and deep copper metallic color system calibrated for tactile unboxing",
      "Digital cellar journal interface with zero layout latency and smooth micro-interactions",
      "Archival print specs prepared for hot-stamping in Florence and bottle production in Cognac"
    ],
    outcomes: [
      { metric: "+240%", label: "First-quarter retail allocation sell-through in London & Accra" },
      { metric: "100%", label: "Exclusive presence secured in top 12 premium private clubs" },
      { metric: "Zero", label: "Zero compromise on Ghanaian artisanal botanical sourcing" }
    ],
    testimonial: {
      quote: "Richard's vision gave our legacy the grandeur it genuinely deserved. He doesn't just design—he establishes an empire of taste.",
      author: "Kwame Osei-Mensah",
      title: "Co-Founder & Chief Master Blender",
      organization: "Kofi Spirits International"
    }
  },
  {
    id: "sovereign-monograph",
    slug: "sovereign-monograph",
    title: "The Sovereign Monograph",
    client: "Diaspora Capital Alliance",
    category: "editorial-print",
    categoryLabel: "Editorial Design & Typography",
    year: "2025",
    location: "London & Zurich",
    role: "Executive Art Director",
    image: "/src/assets/images/editorial_brand_archive_1790253245109.jpg",
    deliverables: ["Hardcover Monograph Design", "Custom Typography Grid", "Executive Presentation Suite", "Slipcase Fabrication"],
    headline: "An institutional publication codifying a $250M diaspora infrastructure syndication for private family offices.",
    summary: "Commissioned by the Diaspora Capital Alliance, this limited-edition 320-page hardcover publication presented the economic case for West African high-speed rail and energy transition to private sovereign wealth funds.",
    challenge: "Standard investor pitch decks and PDF reports are routinely skimmed and forgotten. The leadership needed a physical artifact of such gravitas that no trustee or fund manager could simply set it aside.",
    solution: "Awudey conceived a museum-grade archival volume bound in dark charcoal linen with brass spine rivets, Swiss typographic grid architecture, custom duotone cartography, and heavy French fold inserts.",
    craftDetails: [
      "Bespoke data tables utilizing tabular numerals and hairline architectural rules",
      "Sourced 170gsm Fedrigoni Tintoretto paper stock for optimal tactile weight and opacity",
      "Hand-bound limited run of 150 individually numbered copies delivered in velvet slipcases",
      "Accompanied by a private, token-gated digital folio for secure real-time term sheet viewing"
    ],
    outcomes: [
      { metric: "$250M", label: "Syndication fully committed within 90 days of distribution" },
      { metric: "150", label: "Individually signed archival editions placed with global trustees" },
      { metric: "100%", label: "Unanimous approval of investment governance charter" }
    ],
    testimonial: {
      quote: "The monograph was the single most persuasive physical asset our partners had ever held. It changed the entire tenor of our negotiations.",
      author: "Dr. Evelyn Addo-Quaye",
      title: "Managing Partner",
      organization: "Diaspora Capital Alliance"
    }
  },
  {
    id: "sankofa-pavilion",
    slug: "sankofa-pavilion",
    title: "Sankofa Spatial Pavilion",
    client: "Pan-African Design Biennial",
    category: "brand-identity",
    categoryLabel: "Spatial & Environmental Identity",
    year: "2024",
    location: "Accra, Ghana",
    role: "Identity Architect & Environmental Designer",
    image: "/src/assets/images/accra_london_monolith_1790253254752.jpg",
    deliverables: ["Pavilion Identity & Signage", "Wayfinding System", "Exhibition Catalog", "Interactive Spatial Archive"],
    headline: "Harmonizing vernacular earth architecture with crisp modernist typography for a landmark cultural pavilion.",
    summary: "A temporary civic pavilion erected on the Atlantic shoreline of Accra, honoring centuries of coastal migration and modern African architectural discourse.",
    challenge: "Integrating bilingual signage (English and Twi) and large-scale architectural environmental graphics without competing with the raw compressed-earth rammed walls and maritime landscape.",
    solution: "A subtle laser-cut brass and patinated steel wayfinding system, paired with a custom geometric sans-serif type specimen that captured the mathematical proportions of traditional Adinkra geometry.",
    craftDetails: [
      "Physical brass placards engineered to gracefully weather with coastal Atlantic sea spray",
      "Modular grid system applied across 4,000 sq. meters of open pavilion space",
      "Mobile-optimized progressive digital audio companion for self-guided spatial tours",
      "Comprehensive 180-page exhibition catalog published in hardback"
    ],
    outcomes: [
      { metric: "48,000+", label: "International and domestic visitors across 6-week run" },
      { metric: "Award", label: "Jury Special Commendation for Excellence in Environmental Graphics" },
      { metric: "Archive", label: "Permanent accession into the National Museum Architectural Archives" }
    ]
  },
  {
    id: "tac-studios-flagship",
    slug: "tac-studios-flagship",
    title: "TAC STUDIOS Atelier & Digital Flagship",
    client: "TAC Global Ecosystem",
    category: "digital-flagship",
    categoryLabel: "Digital Flagship Engineering",
    year: "2026",
    location: "Accra, London & Global",
    role: "Founder & Creative Lead",
    image: "/src/assets/images/studio_atelier_space_1790253234805.jpg",
    deliverables: ["Editorial Web System", "Interactive Portfolio Engine", "Brand Identity Language", "Executive Client Hub"],
    headline: "The definitive digital home and portfolio archive for Richard Awudey's multi-disciplinary creative practice.",
    summary: "Architecting a web presence that communicates extreme artistic integrity, executive authority, and cultural prestige without falling into generic SaaS templates or AI cliches.",
    challenge: "Most contemporary design studio websites look identical: pastel cards, floating generic badges, and cookie-cutter grids. The goal was to build a site that reads like a curated architectural monograph.",
    solution: "A bespoke dark-mode canvas grounded in obsidian, hairline gold rules, deliberate typography pairings (Cinzel, Cormorant Garamond, Plus Jakarta Sans), and zero-friction client engagement paths.",
    craftDetails: [
      "Custom layout math with hairline dividers and generous editorial margins",
      "High-fidelity image assets generated and curated with extreme art direction",
      "Direct commission pathways tailored for founders, family offices, and executives",
      "Sub-200ms interaction latency with GPU-accelerated motion choreography"
    ],
    outcomes: [
      { metric: "100%", label: "Custom design architecture with zero third-party UI framework bloat" },
      { metric: "Global", label: "Unified presence connecting West Africa and European capital markets" },
      { metric: "High Craft", label: "Full WCAG AA legibility with refined dark mode optical balance" }
    ]
  },
  {
    id: "apex-strategic-capital",
    slug: "apex-strategic-capital",
    title: "Apex Strategic Capital",
    client: "Apex Partners Africa",
    category: "strategic-advisory",
    categoryLabel: "Strategic Identity & Brand Architecture",
    year: "2024",
    location: "Accra & Nairobi",
    role: "Strategic Brand Advisor",
    image: "/src/assets/images/business_strategy_meeting.jpg",
    deliverables: ["Sovereign Visual System", "Investor Due Diligence Suite", "Annual Stakeholder Review", "Digital Governance Portal"],
    headline: "Repositioning a Pan-African private equity firm managing over $180M in agricultural and logistics assets.",
    summary: "Apex Partners required an identity overhaul ahead of their third institutional fund close, seeking to project unassailable governance to institutional European LPs while retaining their authentic African operational grit.",
    challenge: "The existing brand looked like an early-2000s accounting firm. Institutional investors from Frankfurt and London demanded modern transparency and institutional-grade communication assets.",
    solution: "Richard Awudey re-architected the entire corporate presence, replacing dated clip-art marks with a timeless heraldic insignia and a mathematically balanced typographic hierarchy.",
    craftDetails: [
      "Heraldic seal combining classic Greco-Roman balance with West African leadership symbols",
      "Dual-language governance documentation system formatted for international audit compliance",
      "Custom investor presentation system engineered for high-resolution boardroom displays",
      "Comprehensive brand standards manual distributed across offices in 3 countries"
    ],
    outcomes: [
      { metric: "$180M+", label: "Fund III oversubscribed by 22% at final close" },
      { metric: "14", label: "New institutional European and American LPs onboarded" },
      { metric: "3 Offices", label: "Unified brand language implemented seamlessly across Accra, Lagos, and Nairobi" }
    ],
    testimonial: {
      quote: "Richard brought an unprecedented level of intellectual rigor to our firm's identity. He made our partners look like the heavyweight investors we actually are.",
      author: "Nana Yaw Boateng",
      title: "Senior Partner & Chief Investment Officer",
      organization: "Apex Partners Africa"
    }
  },
  {
    id: "afro-modernist-living",
    slug: "afro-modernist-living",
    title: "Afro-Modernist Living",
    client: "AML Curated Ateliers",
    category: "digital-flagship",
    categoryLabel: "E-Commerce & Digital Experience",
    year: "2025",
    location: "London, Accra & Paris",
    role: "Digital Creative Director",
    image: "/src/assets/images/editorial_brand_archive_1790253245109.jpg",
    deliverables: ["Digital Flagship Storefront", "Curatorial Editorial Layouts", "Physical Certificate of Authenticity", "Packaging Guidelines"],
    headline: "An editorial e-commerce sanctuary showcasing contemporary African furniture, ceramics, and textiles.",
    summary: "AML curates museum-quality furnishings handcrafted by master woodworkers in Kumasi and ceramicists in Abidjan for high-net-worth collectors in London, Paris, and New York.",
    challenge: "Conveying the tactile soul, smell of aged timber, and sculptural weight of handmade items through a digital screen without feeling cold or clinical.",
    solution: "A slow-commerce digital flagship that prioritizes full-bleed editorial imagery, artisan profiles, video vignettes of carving techniques, and warm typographic serenity.",
    craftDetails: [
      "Custom narrative layout alternating between intimate close-up photography and wide atelier shots",
      "Tactile unboxing documentation with numbered brass-embossed certificates of provenance",
      "Seamless multi-currency checkout calibrated for global freight logistics",
      "Editorial journal publishing bi-monthly longform interviews with master artisans"
    ],
    outcomes: [
      { metric: "£1.8M", label: "Gross merchandise volume processed in initial 8 months" },
      { metric: "68%", label: "Repeat collector order rate across UK and North America" },
      { metric: "45 Artisans", label: "Full-time craft master workshops supported across 3 West African nations" }
    ]
  }
];

export const Essays: Essay[] = [
  {
    id: "excellence-with-divinity",
    slug: "excellence-with-divinity",
    title: "On Excellence with Divinity: The Spiritual Discipline of Form and Typography",
    subtitle: "Why meticulous craft is not an aesthetic luxury, but a moral obligation to civilization.",
    date: "February 2026",
    readTime: "7 min read",
    category: "Philosophy of Design",
    excerpt: "In an era racing toward synthetic velocity and disposable digital noise, holding oneself to an unyielding standard of craft is an act of spiritual defiance. When we honor form, proportion, and truth in materials, we mirror the divine architecture of the universe.",
    content: [
      "There is a persistent modern heresy that suggests design is merely decorative—a superficial coating applied to an underlying commercial machine to induce transaction. This view is impoverished. When you study the great cathedrals of Europe, the stone monoliths of Great Zimbabwe, or the sacred geometric cloths of the Ashanti kingdom, you discover that every chisel mark and weave was an offering. Form was theology made visible.",
      "At TAC GLOBAL and TAC STUDIOS, we codified our central creed into three words: 'Excellence with Divinity'. To many in the tech-accelerated world, pairing excellence with divinity sounds archaic or overly solemn. Yet, when you sit before an empty canvas or an unfinished brand mark at two in the morning, the standard you hold yourself to cannot be governed merely by the client's invoice.",
      "The client may not notice if the kerning between a capital 'T' and lowercase 'o' is three units too wide. The market may not immediately punish a sloppily proportioned grid or an unconsidered margin. But the craft knows. And you know.",
      "When we treat our creative output as an act of devotion, mediocrity becomes unacceptable. We measure the weight of an executive monograph not by whether it looks good on a smartphone screen, but by whether it will command respect when held in someone's hands twenty years from today.",
      "This is our commitment to every founder and partner who entrusts us with their legacy. We do not manufacture quick solutions; we build monuments of intent."
    ],
    keyTakeaways: [
      "Craft as devotion: True quality transcends market incentives and becomes a self-imposed spiritual discipline.",
      "The longevity test: Design should be evaluated by its durability across decades, not its novelty across weeks.",
      "The anti-slop imperative: In an age of infinite automated noise, intentional human discernment is the ultimate luxury."
    ]
  },
  {
    id: "pan-african-modernism",
    slug: "pan-african-modernism",
    title: "The Pan-African Modernist: Beyond the Generic Global Corporate Aesthetic",
    subtitle: "How contemporary African brand architecture is breaking free from both colonial nostalgia and Silicon Valley blandness.",
    date: "November 2025",
    readTime: "9 min read",
    category: "Cultural Strategy",
    excerpt: "For decades, African commercial identity was trapped between two false choices: folksy, folkloric tribalism or sanitized Western corporate impersonation. A new generation of brand architects is forging a third way: Pan-African Modernism.",
    content: [
      "Walk through the financial districts of Sandton, Victoria Island, or Airport City in Accra, and you will notice a curious visual silence. The logos of investment banks, telecommunication giants, and real estate empires often appear as if they were purchased from an airport lounge catalog in Zurich or Delaware in 1998.",
      "This sterile, generic corporate identity was once considered the price of admission to global credibility. To be taken seriously by international financiers, African enterprises were told to strip away all regional idiosyncrasy, color, and cultural nuance.",
      "The only alternative offered was the tourism aesthetic: safari prints, stylized silhouettes of baobab trees, and earthy browns. Both options are failures of imagination.",
      "Pan-African Modernism rejects both traps. It recognizes that West African geometric systems—such as Adinkra symbols, Kente structural math, and traditional brass-casting proportions—are fundamentally modernist. They were abstract, modular, and mathematically rigorous centuries before the Bauhaus opened its doors in Weimar.",
      "When we architect a brand at TAC STUDIOS for a diaspora capital fund or a high-end consumer label, we do not paste ethnic patterns onto a canvas. We interrogate the foundational geometry: the tension of the curve, the sovereign balance of weight, the quiet authority of proportion.",
      "The result is an aesthetic that feels entirely native to Africa yet completely effortless in Mayfair, Tokyo, or New York. It does not ask for permission; it asserts its presence."
    ],
    keyTakeaways: [
      "The false dichotomy: African enterprises need not choose between generic Western minimalism and touristic folklore.",
      "Inherent modernism: African indigenous geometric systems possess centuries of sophisticated mathematical abstraction.",
      "Global resonance: Rooted cultural specificity, executed with world-class discipline, achieves universal authority."
    ]
  },
  {
    id: "typography-as-authority",
    slug: "typography-as-authority",
    title: "Typography as Cultural Authority: Crafting Marks that Outlive Trends",
    subtitle: "A masterclass in letterforms, negative space, and executive gravitas.",
    date: "July 2025",
    readTime: "6 min read",
    category: "Design Craft",
    excerpt: "Letters are the physical architecture of human thought. A founder who understands typography understands how power, credibility, and reverence are quietly communicated before a single word is read.",
    content: [
      "Before a human being consciously processes the meaning of a headline, their nervous system has already formed an impression of its authority. This takes fewer than 150 milliseconds. It is governed entirely by typography.",
      "The spacing between characters (tracking), the vertical rhythm of lines (leading), the contrast between thick and thin strokes, and the terminus of a serif all signal trust, heritage, or cheap haste.",
      "In our work at TAC STUDIOS, we spend days agonizing over micro-typographic details. We study how classical Roman inscriptional capitals communicate permanence, how transitional British serifs like Baskerville brought scientific clarity to the Enlightenment, and how modern geometric sans-serifs can either project clinical precision or empty sterility.",
      "When designing a corporate brand mark for a sovereign institution, we refuse off-the-shelf fonts used by thousands of generic startups. We carve custom letterforms, adjust optical centers, and test balance at sizes ranging from a 16-pixel favicon to a ten-meter airport installation.",
      "If you want to build a brand that endures for half a century, invest in your letters. They are the stone upon which your reputation is carved."
    ],
    keyTakeaways: [
      "Subconscious speed: Visual authority is determined within 150ms through type balance and proportions.",
      "Avoid default faces: Enduring institutions require custom typographic consideration, not generic template fonts.",
      "Scale invariance: Masterful typography functions with equal clarity on an executive business card and a skyscraper sign."
    ]
  },
  {
    id: "the-diaspora-nexus",
    slug: "the-diaspora-nexus",
    title: "The Diaspora Nexus: Why Accra and London are Defining Tomorrow's Digital Luxury",
    subtitle: "Reflections on bridging continental ingenuity with global capital networks.",
    date: "April 2025",
    readTime: "8 min read",
    category: "Global Perspectives",
    excerpt: "The corridor connecting Accra and London is no longer merely a transit route—it has become a creative and commercial powerhouse where cultural heritage meets international capital.",
    content: [
      "For generations, the movement of talent from the African continent to European metropolises was framed as 'brain drain'. Today, what we witness is something vastly more dynamic: a dual-hub ecosystem of cross-pollination.",
      "Founders, creative directors, and investors live seamlessly between Kotoka International Airport in Accra and Heathrow in London. They maintain deep, non-negotiable roots in their ancestral soil while commanding boardrooms in the City of London.",
      "This dual perspective creates a profound commercial advantage. A brand born in this corridor understands both the vibrant, high-tempo consumer energy of West Africa and the rigorous institutional standards of global private wealth.",
      "At TAC GLOBAL, we structured our physical presence precisely to honor this nexus. Our executive studio in Accra anchors our cultural vision, operational truth, and regional talent. Our London presence ensures effortless alignment with global partners, institutional trustees, and international media.",
      "The future of luxury and high-impact enterprise does not belong to single-city monopolies. It belongs to the bridges."
    ],
    keyTakeaways: [
      "The dual-hub advantage: Operating across Accra and London merges cultural authenticity with international market access.",
      "Beyond 'brain drain': Modern diaspora leaders create continuous economic and creative value flows between hubs.",
      "Digital luxury: Tomorrow's premium brands will be defined by hybrid cultural fluency, not isolated geographic enclaves."
    ]
  }
];

export const Milestones: CareerMilestone[] = [
  {
    period: "2024 – Present",
    title: "Founder & Executive Creative Director",
    organization: "TAC GLOBAL & TAC STUDIOS",
    location: "Accra, London & Worldwide",
    description: "Guiding the unified ecosystem across strategic advisory, high-craft brand architecture, and sovereign communications for diaspora leaders and continental enterprises."
  },
  {
    period: "2021 – 2024",
    title: "Principal Brand Architect & Independent Creative Counsel",
    organization: "Private Practice",
    location: "London & Accra",
    description: "Advised institutional funds, boutique luxury labels, and executive founders on multi-million dollar brand repositioning, packaging architecture, and digital flagships."
  },
  {
    period: "2019 – 2021",
    title: "Senior Art Director & Digital Systems Lead",
    organization: "Diaspora Creative Collective",
    location: "London, UK",
    description: "Directed visual identities and digital web platforms for high-growth tech startups and cultural institutions across the UK and Sub-Saharan Africa."
  },
  {
    period: "2017 – 2019",
    title: "Foundational Research in Typography & African Visual Semiotics",
    organization: "Academic & Studio Residency",
    location: "Accra, Ghana",
    description: "Comprehensive research documenting the mathematical and geometric foundations of traditional West African symbols and their application to modern digital design."
  }
];

export const Testimonials = [
  {
    quote: "Richard Awudey possesses that rarest combination in creative leadership: the eye of a classical sculptor, the discipline of an architect, and the strategic instinct of an executive.",
    author: "Kwame Osei-Mensah",
    title: "Co-Founder & Chief Master Blender",
    organization: "Kofi Spirits International",
    location: "Accra & London"
  },
  {
    quote: "Working with Richard on our $250M syndication monograph fundamentally elevated how sovereign investors perceived our organization. He doesn't just design; he confers authority.",
    author: "Dr. Evelyn Addo-Quaye",
    title: "Managing Partner",
    organization: "Diaspora Capital Alliance",
    location: "London & Zurich"
  },
  {
    quote: "In a world drowning in generic AI templates and uninspired visual noise, Richard's commitment to 'Excellence with Divinity' is a breath of fresh air. A true master of his craft.",
    author: "Nana Yaw Boateng",
    title: "Senior Partner & Chief Investment Officer",
    organization: "Apex Partners Africa",
    location: "Nairobi & Accra"
  }
];
