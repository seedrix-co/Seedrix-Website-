/** Shared portfolio items, home carousel + /works page */
export type PortfolioItem = {
  title: string;
  img: string;
  link: string;
  /** Short line for the Work page grid */
  blurb: string;
  /** Case study route: /work/:slug */
  slug: string;
};

export const PORTFOLIOS: PortfolioItem[] = [
  {
    title: "SJ Shoes",
    img: "/portfolio/sjshoe/sj1.png",
    link: "/work/sj-shoes",
    blurb: "E‑commerce & brand presence for footwear retail.",
    slug: "sj-shoes",
  },
  {
    title: "Vacation Vibez",
    img: "/portfolio/vv/vv1.png",
    link: "/work/vacation-vibez",
    blurb: "Travel & lifestyle digital experience.",
    slug: "vacation-vibez",
  },
  {
    title: "Wish Waves Club",
    img: "/portfolio/wwc/wwc1.png",
    link: "/work/wish-waves-club",
    blurb: "NFC membership & premium platform.",
    slug: "wish-waves-club",
  },
  {
    title: "Wish Holdings",
    img: "/portfolio/wh/wh1.png",
    link: "/work/wish-holdings",
    blurb: "Investor-focused corporate platform.",
    slug: "wish-holdings",
  },
  {
    title: "TrackJunction",
    img: "/portfolio/Trackjunction/Trackjunction.png",
    link: "/work/track-junction",
    blurb: "UK cycling retail brand identity.",
    slug: "track-junction",
  },
  {
    title: "Alfabiha Markets",
    img: "/portfolio/alfabiha/alf1.png",
    link: "/work/alfabiha-markets",
    blurb: "Smart e‑commerce + AI CRM.",
    slug: "alfabiha-markets",
  },
];
