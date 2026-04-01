/** Static list; filenames must match `public/videos/...` (URLs are encoded when built). */
export type ShowcaseVideoItem = {
  title: string;
  file: string;
  /** Content & social: bold headline under the video (Apple-style). */
  captionLead?: string;
  /** Paragraphs separated by blank lines (\\n\\n). */
  captionBody?: string;
};

const PB_FOLDER = "Personal Branding";
const CS_FOLDER = "Content and Social";

export const PERSONAL_BRANDING_VIDEOS: ShowcaseVideoItem[] = [
  { title: "Wish Waves Interview", file: "wish waves interview.webm" },
  { title: "Personal Branding", file: "Personal branding .webm" },
  { title: "Personal Branding 0", file: "Personal branding 0.webm" },
  { title: "Personal Branding 2", file: "Personal branding 2.webm" },
  { title: "Personal Branding 3", file: "Personal Branding 3.webm" },
  { title: "Personal Branding 4", file: "Personal Branding 4.webm" },
];

export const CONTENT_SOCIAL_VIDEOS: ShowcaseVideoItem[] = [
  {
    title: "Automechanika Dubai",
    file: "Automachanic 2025.webm",
    captionLead: "Automechanika Dubai | Volkswagen Amarok × Iron Man",
    captionBody: `At Automechanika Dubai, the goal was not just to capture a vehicle but to create a moment that people would remember. We brought together the raw strength of the Volkswagen Amarok with the iconic presence of Iron Man to create a bold visual collaboration that feels larger than life.

This piece was designed as a showcase of brand energy and innovation, blending automotive power with cinematic storytelling. Every frame was built to feel impactful, modern, and visually striking in a fast-moving exhibition environment.

This project was brought to life with the creative eye of our videographer Isuru, whose work added depth and intensity to the final output.`,
  },
  {
    title: "UAE National Day",
    file: "National Day.webm",
    captionLead: "UAE National Day | Wish Group",
    captionBody: `For UAE National Day, Wish Group wanted to do more than send a greeting. They wanted to express respect, identity, and presence in a way that feels meaningful.

We developed a concept that blends national pride with elegance, supported by custom-composed music inspired by UAE cultural tones. The visuals were carefully crafted to align with the spirit of the celebration while maintaining the premium image of the brand.

The result is a piece that feels both emotional and refined, allowing the brand to connect with its audience on a deeper level during an important national moment.`,
  },
  {
    title: "Wish Waves Club",
    file: "wwc intro.webm",
    captionLead: "Wish Waves Club Launch",
    captionBody: `Launching Wish Waves Club was about introducing something entirely new. This was not just a product launch but the reveal of a complete ecosystem built around NFC-powered membership.

We focused on creating a sense of anticipation and exclusivity. The video introduces the membership cards, the technology behind them, and the experience users can expect from the platform.

Every scene was designed to build curiosity and position the brand as forward-thinking, premium, and ready for the future.`,
  },
  {
    title: "Christmas Greetings",
    file: "Wish Christmas.webm",
    captionLead: "Christmas Greetings | Wish Group",
    captionBody: `This project came from a returning client who already trusted the process and wanted to create something more meaningful for the festive season.

The idea was to bring their symbolic identity to life through the dandelion flower, representing growth, hope, and connection. We translated that into a soft and elegant visual story that carries the warmth of Christmas.

The final touch was a subtle bell sound, creating a familiar emotional connection that completes the experience. It is simple, thoughtful, and deeply aligned with the brand.`,
  },
  {
    title: "World Capital Center",
    file: "WCC.webm",
    captionLead: "World Capital Center | Dubai",
    captionBody: `World Capital Center is a vision of the future, and the video needed to reflect that ambition.

We built a narrative that positions the project as a central hub for global trade, innovation, and opportunity. The storytelling focuses on scale, connectivity, and forward movement, supported by clean visuals and a confident tone.

This piece is designed to communicate trust and potential, speaking directly to investors, partners, and businesses looking to be part of something larger.`,
  },
  {
    title: "The One Apparel",
    file: "One Apperal.webm",
    captionLead: "The One Apparel | AI Visual Transformation",
    captionBody: `This project came with a unique challenge. The factory was not yet fully developed, and only a few images of the existing space were available.

Instead of limiting the vision, we expanded it. Using AI-driven techniques, we transformed static images into a dynamic visual experience that represents the future of the brand.

Alongside that, we refined the logo and built a strong animation that gives the brand a more modern and confident identity. The result bridges the gap between what exists and what is coming.`,
  },
  {
    title: "Vacation Vibez",
    file: "Launching Video.webm",
    captionLead: "Vacation Vibez Launch",
    captionBody: `Vacation Vibez was entering a new phase, transitioning from a traditional travel agency into a technology-driven travel company.

The video was created to introduce this shift. We focused on highlighting their AI-powered features, especially the Build Your Trip assistant, which changes how users interact with travel planning.

The storytelling is built around simplicity, innovation, and user empowerment, showing that travel is no longer just booking but creating personalized experiences.`,
  },
  {
    title: "Wish Group Corporate",
    file: "wish group coporate.webm",
    captionLead: "Wish Group Corporate Video",
    captionBody: `Working with Wish Group over multiple projects has allowed us to deeply understand their vision and direction.

This corporate video was designed to bring everything together into one cohesive story. It reflects their growth, their structure, and their presence across different sectors.

The approach was clean, confident, and focused on clarity, ensuring that anyone watching immediately understands the strength and scale of the brand.`,
  },
  {
    title: "Beverly Air",
    file: "sidequity.webm",
    captionLead: "Beverly Air | Vision Film",
    captionBody: `Beverly Air is about the future of industries, and the video needed to communicate that vision clearly and powerfully.

We crafted a narrative that connects energy, technology, education, healthcare, and global investment into one flowing story. Each element represents a part of a bigger picture driven by leadership and innovation.

The goal was to position Beverly Air not just as a company, but as a forward-moving force shaping what comes next.`,
  },
];

export function showcaseVideoSrc(folder: string, file: string): string {
  return `/videos/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;
}

export function personalBrandingSrc(item: ShowcaseVideoItem): string {
  return showcaseVideoSrc(PB_FOLDER, item.file);
}

export function contentSocialSrc(item: ShowcaseVideoItem): string {
  return showcaseVideoSrc(CS_FOLDER, item.file);
}
