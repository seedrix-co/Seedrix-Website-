/** Premium case study cards, Work page grid (copy + structure) */
export type CaseStudyOverview = {
  slug: string;
  href: string;
  image: string;
  title: string;
  tagline: string;
  narrative: string;
  whatWeDid: string[];
  experience: string;
  testimonial: {
    name: string;
    role: string;
    quote: string;
    /** Deterministic placeholder portrait when `avatarUrl` is omitted */
    avatarSeed: string;
    /** Local or absolute image URL for the profile photo */
    avatarUrl?: string;
  };
};

export const CASE_STUDIES_OVERVIEW: CaseStudyOverview[] = [
  {
    slug: "sj-shoes",
    href: "/work/sj-shoes",
    image: "/portfolio/sjshoe/sj1.png",
    title: "SJ Shoes",
    tagline: "From idea to scalable e‑commerce brand",
    narrative:
      "SJ Shoes began as a concept, a vision to build a modern footwear brand in a competitive digital space. What they needed wasn’t just a website, but a complete commerce ecosystem. We engineered the brand from the ground up. From identity to infrastructure, every detail was carefully crafted to deliver both visual appeal and operational power.",
    whatWeDid: [
      "Brand identity & logo system",
      "Logo animation & digital assets",
      "Fully custom e‑commerce platform",
      "Advanced admin dashboard (full control to client)",
    ],
    experience:
      "The platform delivers a seamless buying journey while giving the client complete backend autonomy, with no technical dependency.",
    testimonial: {
      name: "Yomini P",
      role: "CEO, SJ Shoes",
      quote:
        "Seedrix built more than a website. They built my business. Everything is smooth, powerful, and easy to control.",
      avatarSeed: "yomini-p",
      avatarUrl: "/images/pdf/yomini.jpg",
    },
  },
  {
    slug: "vacation-vibez",
    href: "/work/vacation-vibez",
    image: "/portfolio/vv/vv1.png",
    title: "Vacation Vibez",
    tagline: "Reimagining travel as a digital experience",
    narrative:
      "Vacation Vibez needed transformation: from a basic travel concept into a corporate-level digital brand capable of scaling globally. We redefined the entire experience, merging design, AI, and user interaction into a single platform.",
    whatWeDid: [
      "Full brand transformation",
      "AI-powered travel engine",
      "UX-focused booking experience",
      "“Build Your Trip” intelligent feature",
    ],
    experience: "Users don’t just browse; they create personalized journeys in seconds.",
    testimonial: {
      name: "Dilru Yositha",
      role: "Founder",
      quote:
        "They didn’t just redesign my brand. They elevated my entire business. The AI features changed everything.",
      avatarSeed: "dilru-yositha",
      avatarUrl: "/images/pdf/Dilru.jpg",
    },
  },
  {
    slug: "wish-waves-club",
    href: "/work/wish-waves-club",
    image: "/portfolio/wwc/wwc1.png",
    title: "Wish Waves Club",
    tagline: "Where technology meets exclusive membership",
    narrative:
      "Wish Waves Club is not just a platform; it’s an ecosystem. Built around NFC technology and premium access, this project required deep technical execution with luxury-level design. We delivered a secure, scalable, and immersive digital product.",
    whatWeDid: [
      "Brand identity & positioning",
      "Corporate hero video production",
      "NFC-integrated platform",
      "Subscription & POS system",
      "Content strategy (free + premium tiers)",
    ],
    experience:
      "A seamless bridge between physical interaction (NFC) and digital access.",
    testimonial: {
      name: "Abdi Kareen",
      role: "CEO",
      quote:
        "This platform feels futuristic. Seedrix delivered something truly ahead of its time.",
      avatarSeed: "abdi-kareen-wh",
    },
  },
  {
    slug: "wish-holdings",
    href: "/work/wish-holdings",
    image: "/portfolio/wh/wh1.png",
    title: "Wish Holdings",
    tagline: "Designed to attract investors",
    narrative:
      "Wish Holdings required more than a corporate website: they needed a strategic digital presence that communicates trust, scale, and opportunity. We focused on clarity, performance, and storytelling.",
    whatWeDid: [
      "Corporate rebranding",
      "Investor-focused UX design",
      "High-performance website architecture",
      "Custom video production",
    ],
    experience:
      "Every section is designed to build confidence and drive investment decisions.",
    testimonial: {
      name: "Abdi Kareen",
      role: "CEO (returning client)",
      quote:
        "Seedrix understands business at a deeper level. This is our second project, and again, exceptional execution.",
      avatarSeed: "abdi-kareen-wh",
    },
  },
  {
    slug: "track-junction",
    href: "/work/track-junction",
    image: "/portfolio/Trackjunction/Trackjunction.png",
    title: "TrackJunction",
    tagline: "Built to compete in the UK market",
    narrative:
      "Entering the UK retail cycling market requires more than visuals: it demands a strong identity that cuts through competition. We built a bold, performance-driven brand system.",
    whatWeDid: ["Logo design", "Brand kit development", "Retail-ready identity"],
    experience: "Clean, aggressive, and instantly recognizable branding built for growth.",
    testimonial: {
      name: "Client team",
      role: "TrackJunction",
      quote: "Simple. Strong. Memorable. Exactly what we needed.",
      avatarSeed: "track-junction-team",
    },
  },
  {
    slug: "alfabiha-markets",
    href: "/work/alfabiha-markets",
    image: "/portfolio/alfabiha/alf1.png",
    title: "Alfabiha Markets",
    tagline: "Smart commerce powered by AI",
    narrative:
      "Alfabiha needed a system, not just a storefront. A platform that could handle operations, orders, and insights intelligently. We delivered a complete digital commerce infrastructure.",
    whatWeDid: [
      "E‑commerce platform",
      "Custom CRM & order system",
      "AI-based monitoring tools",
      "Payment integrations (Tamara, APIs)",
      "Full brand identity",
    ],
    experience:
      "A business that runs smarter, faster, and more efficiently, powered by automation.",
    testimonial: {
      name: "Khoka",
      role: "Founder",
      quote:
        "This system changed how we operate daily. It’s powerful, intelligent, and reliable.",
      avatarSeed: "khoka-founder",
    },
  },
];
