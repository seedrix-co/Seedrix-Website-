import type { Variants } from "framer-motion";

export const defaultEasing: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Viewport options for scroll-triggered reveal: section is well in view before animating */
export const viewportReveal = { once: true, margin: "80px" } as const;
/** Slightly earlier trigger for staggered children (e.g. cards grid) */
export const viewportRevealEarly = { once: true, margin: "40px" } as const;

export const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: defaultEasing }
    },
};

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

/** Scroll-triggered word-by-word reveal for headlines */
export const scrollRevealContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.1,
        },
    },
};

export const scrollRevealWord: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: defaultEasing },
    },
};
