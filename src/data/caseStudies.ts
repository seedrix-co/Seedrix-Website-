export type CaseStudyVideoSource = { src: string; type: "video/webm" | "video/mp4" };

export type CaseStudyGalleryItem = {
  src: string;
  alt: string;
  caption?: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  website?: { label: string; href: string };
  regionNote?: string;
  heroImage: string;
  overview: string;
  approachLead: string;
  approachPoints: string[];
  features: string[];
  result: string;
  review: { quote: string; attribution: string };
  gallery: CaseStudyGalleryItem[];
  video?: { sources: CaseStudyVideoSource[]; poster?: string };
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "sj-shoes",
    title: "SJ Shoes",
    tagline: "Full e‑commerce ecosystem from scratch",
    website: { label: "sjshoes.com", href: "https://www.sjshoes.com" },
    heroImage: "/portfolio/sjshoe/sj1.png",
    overview:
      "SJ Shoes approached us with a vision to launch a modern footwear brand with a strong digital presence. Starting from zero, we built everything, from brand identity to a complete e‑commerce infrastructure.",
    approachLead: "We didn’t just build a website. We built a brand experience.",
    approachPoints: [
      "Crafted a modern, memorable logo",
      "Designed animated brand visuals",
      "Developed a high-performance e‑commerce platform",
      "Built a fully controllable admin dashboard for the client",
    ],
    features: [
      "Custom-built e‑commerce system (not template-based)",
      "Advanced product & inventory management",
      "Smooth UX for mobile & desktop",
      "Secure payment integration",
      "Real-time order tracking system",
    ],
    result:
      "A scalable online store with strong brand identity and seamless user experience.",
    review: {
      quote:
        "Seedrix transformed my idea into a real business. From branding to the full system, everything was handled perfectly. The dashboard is so easy to manage. I feel fully in control.",
      attribution: "Yomini P, CEO, SJ Shoes",
    },
    gallery: [
      { src: "/portfolio/sjshoe/sj2.png", alt: "SJ Shoes digital experience" },
      { src: "/portfolio/sjshoe/sj3.png", alt: "SJ Shoes product presentation" },
      { src: "/portfolio/sjshoe/sj4.png", alt: "SJ Shoes storefront" },
      { src: "/portfolio/sjshoe/sjlogo.png", alt: "SJ Shoes logo mark" },
    ],
    video: {
      poster: "/portfolio/sjshoe/sj1.png",
      sources: [
        {
          src: `/videos/${encodeURIComponent("Final_Comp (Full_HD)_3_1.mp4")}`,
          type: "video/mp4",
        },
      ],
    },
  },
  {
    slug: "vacation-vibez",
    title: "Vacation Vibez",
    tagline: "From startup to corporate travel brand",
    website: { label: "vacationvibez.com", href: "https://www.vacationvibez.com" },
    heroImage: "/portfolio/vv/vv1.png",
    overview:
      "Vacation Vibez needed a complete transformation from a small travel concept into a corporate-level travel brand.",
    approachLead: "We rebuilt the brand from the ground up:",
    approachPoints: [
      "Complete rebranding (logo, identity, tone)",
      "Designed a travel-focused digital experience",
      "Developed an AI-powered travel platform",
    ],
    features: [
      "AI-integrated “Build Your Trip” engine",
      "Interactive destination browsing",
      "Conversion-focused landing pages",
      "Mobile-first design",
      "Booking-ready architecture",
    ],
    result: "A professional travel brand positioned for scale and international reach.",
    review: {
      quote:
        "Seedrix didn’t just design a website. They upgraded my entire business mindset. The AI trip builder is a game changer for my customers.",
      attribution: "Dilru Yositha, Founder",
    },
    gallery: [
      { src: "/portfolio/vv/vv2.png", alt: "Vacation Vibez experience" },
      { src: "/portfolio/vv/vv3.png", alt: "Vacation Vibez destinations" },
      { src: "/portfolio/vv/vv4.png", alt: "Vacation Vibez UI" },
      { src: "/portfolio/vv/vvlogo.png", alt: "Vacation Vibez identity" },
    ],
    video: {
      poster: "/portfolio/vv/vv1.png",
      sources: [
        {
          src: `/videos/${encodeURIComponent("Launching Video.webm")}`,
          type: "video/webm",
        },
        {
          src: `/videos/${encodeURIComponent("Final_Comp (Full_HD)_3_1.mp4")}`,
          type: "video/mp4",
        },
      ],
    },
  },
  {
    slug: "wish-waves-club",
    title: "Wish Waves Club",
    tagline: "NFC-based membership platform",
    website: { label: "wishwavesclub.com", href: "https://www.wishwavesclub.com" },
    heroImage: "/portfolio/wwc/wwc1.png",
    overview:
      "A futuristic membership platform powered by NFC technology, designed for premium user experiences.",
    approachLead: "We engineered a full ecosystem:",
    approachPoints: [
      "Brand identity & premium positioning",
      "High-end corporate video for hero section",
      "Secure, scalable subscription platform",
    ],
    features: [
      "NFC-enabled member access system",
      "POS system integration",
      "Encrypted user data handling",
      "Subscription management system",
      "Content strategy (free + premium tiers)",
    ],
    result: "A tech-driven membership platform with strong monetization strategy.",
    review: {
      quote:
        "The level of innovation Seedrix brought is unmatched. This platform is exactly what I envisioned: secure, premium, and future-ready.",
      attribution: "Abdi Kareen, CEO",
    },
    gallery: [
      { src: "/portfolio/wwc/wwc2.png", alt: "Wish Waves Club platform" },
      { src: "/portfolio/wwc/wwc3.png", alt: "Wish Waves Club experience" },
      { src: "/portfolio/wwc/wwc4.png", alt: "Wish Waves Club interface" },
      { src: "/portfolio/wwc/wwclogo.png", alt: "Wish Waves Club logo" },
    ],
  },
  {
    slug: "wish-holdings",
    title: "Wish Holdings",
    tagline: "Investor-focused corporate platform",
    website: { label: "wishholdings.co", href: "https://www.wishholdings.co" },
    heroImage: "/portfolio/wh/wh1.png",
    overview:
      "Wish Holdings required a high-conversion corporate website aimed at attracting investors for their Maldives-based tuna business.",
    approachLead: "Corporate storytelling with performance at the core.",
    approachPoints: [
      "Full brand refinement & repositioning",
      "Built a clean, corporate-level website",
      "Created custom video content from raw footage",
    ],
    features: [
      "Ultra-fast loading performance",
      "Investor-focused UX/UI",
      "SEO-optimized structure",
      "Professional storytelling through visuals",
      "Corporate branding kit",
    ],
    result: "A powerful digital presence designed to support funding and business growth.",
    review: {
      quote:
        "This is our second project with Seedrix, and they exceeded expectations again. The website truly represents our business at an international level.",
      attribution: "Abdi Kareen, CEO",
    },
    gallery: [
      { src: "/portfolio/wh/wh2.png", alt: "Wish Holdings corporate site" },
      { src: "/portfolio/wh/wh3.png", alt: "Wish Holdings narrative" },
      { src: "/portfolio/wh/wh4.png", alt: "Wish Holdings visuals" },
      { src: "/portfolio/wh/whlogo.png", alt: "Wish Holdings logo" },
    ],
    video: {
      poster: "/portfolio/wh/wh1.png",
      sources: [
        {
          src: `/videos/${encodeURIComponent("Final_Comp (Full_HD)_3_1.mp4")}`,
          type: "video/mp4",
        },
      ],
    },
  },
  {
    slug: "track-junction",
    title: "TrackJunction",
    tagline: "UK cycling retail brand",
    regionNote: "UK-based brand",
    heroImage: "/portfolio/Trackjunction/Trackjunction.png",
    overview:
      "TrackJunction needed a bold identity to enter the competitive UK cycling market.",
    approachLead: "Retail-ready identity with instant recognition.",
    approachPoints: [
      "Designed a high-impact logo",
      "Created a clean and modern brand kit",
      "Focused on retail-ready brand positioning",
    ],
    features: [
      "Strong typography-based logo",
      "Retail-focused branding system",
      "Scalable identity for future expansion",
    ],
    result: "A distinctive brand ready for the UK retail environment.",
    review: {
      quote:
        "Seedrix delivered exactly what we needed: a brand that stands out instantly in a competitive market.",
      attribution: "Client review",
    },
    gallery: [
      {
        src: "/portfolio/logos/Trackjunction.png",
        alt: "TrackJunction logo system",
        caption: "Logo & mark",
      },
      {
        src: "/portfolio/Trackjunction/Trackjunction.png",
        alt: "TrackJunction brand application",
        caption: "Brand application",
      },
    ],
  },
  {
    slug: "alfabiha-markets",
    title: "Alfabiha Markets",
    tagline: "Smart e‑commerce + AI CRM",
    website: { label: "afabiha.com", href: "https://www.afabiha.com" },
    heroImage: "/portfolio/alfabiha/alf1.png",
    overview:
      "A UAE-based foodstuff trading company requiring a powerful digital commerce system.",
    approachLead: "Commerce, operations, and intelligence in one stack.",
    approachPoints: [
      "Developed a fully functional e‑commerce platform",
      "Built a custom CRM & order management system",
      "Integrated AI monitoring tools",
    ],
    features: [
      "API-integrated system",
      "Payment integrations (including Tamara)",
      "AI-powered CRM for business insights",
      "Order tracking & automation",
      "Full branding for Alfabiha",
    ],
    result: "A smart, automated business system that improves efficiency and scalability.",
    review: {
      quote:
        "Seedrix gave us more than a website. They gave us a system that runs the business efficiently. The AI CRM is incredibly useful.",
      attribution: "Khoka, Founder",
    },
    gallery: [
      { src: "/portfolio/alfabiha/alf2.png", alt: "Alfabiha commerce" },
      { src: "/portfolio/alfabiha/alf3.png", alt: "Alfabiha platform" },
      { src: "/portfolio/alfabiha/alf4.png", alt: "Alfabiha experience" },
      { src: "/portfolio/alfabiha/logo.avif", alt: "Alfabiha logo" },
    ],
  },
];

const bySlug = new Map(CASE_STUDIES.map((c) => [c.slug, c]));

export function getCaseStudyBySlug(slug: string | undefined): CaseStudy | undefined {
  if (!slug) return undefined;
  return bySlug.get(slug);
}
