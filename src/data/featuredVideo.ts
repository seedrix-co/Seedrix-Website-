/** Home stripe, `public/videos/...` */
const SHOWREEL_FILENAME = "Final_Comp (Full_HD)_3_1.mp4";

export const SHOWREEL_VIDEO_SRC = `/videos/${encodeURIComponent(SHOWREEL_FILENAME)}`;

/** Work page “recent project”, primary WebM */
const LATEST_PROJECT_FILENAME = "Launching Video.webm";

export const LATEST_PROJECT_VIDEO_SRC = `/videos/${encodeURIComponent(LATEST_PROJECT_FILENAME)}`;

/** Copy for Work page “latest project” block */
export const LATEST_PROJECT = {
  eyebrow: "Latest project",
  title: "Recent delivery",
  description:
    "A look at our most recent build, from concept to launch. Tap play for sound.",
} as const;
