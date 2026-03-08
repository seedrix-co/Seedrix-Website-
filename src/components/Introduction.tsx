import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { scrollRevealContainer, scrollRevealWord, viewportReveal } from "@/lib/motion";

const INTRO_IMAGES = [
    { src: "/IMG/structure.webp", alt: "Structure", label: "Structure" },
    { src: "/IMG/technology.webp", alt: "Technology", label: "Technology" },
    { src: "/IMG/brandgrowth.webp", alt: "Brand growth", label: "Brand Growth" },
];

const TAGLINE =
    "An integrated partner for business systems, technology, and brand growth.";
const TAGLINE_WORDS = TAGLINE.split(" ");

/** Scroll height for pin: enough to reveal all three images one by one */
const PIN_SCROLL_HEIGHT = "280vh";

export default function Introduction() {
    const pinRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: pinRef,
        offset: ["start start", "end end"],
    });

    // Labels appear first, then each image fades in (label fades out as image fades in)
    const label1 = useTransform(scrollYProgress, [0, 0.1, 0.28], [0, 1, 0]);
    const label2 = useTransform(scrollYProgress, [0.28, 0.38, 0.56], [0, 1, 0]);
    const label3 = useTransform(scrollYProgress, [0.56, 0.66, 0.92], [0, 1, 0]);
    const labelOpacities = [label1, label2, label3];

    const image1 = useTransform(scrollYProgress, [0.18, 0.32], [0, 1]);
    const image2 = useTransform(scrollYProgress, [0.44, 0.6], [0, 1]);
    const image3 = useTransform(scrollYProgress, [0.72, 0.92], [0, 1]);
    const imageOpacities = [image1, image2, image3];

    return (
        <section className="py-[var(--spacing-section)]">
            <div className="container mx-auto px-6 max-w-[1400px]">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportReveal}
                    variants={scrollRevealContainer}
                    className="flex flex-col items-center justify-center text-center"
                >
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-sans font-light text-foreground leading-tight md:leading-snug max-w-5xl flex flex-wrap justify-center gap-x-[0.25em] gap-y-0">
                        {TAGLINE_WORDS.map((word, i) => (
                            <motion.span
                                key={`${word}-${i}`}
                                variants={scrollRevealWord}
                                className="inline-block"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h2>
                </motion.div>
            </div>

            {/* Pinned scroll area: on mobile shorter so 3 images fit in viewport; desktop full scroll */}
            <div
                ref={pinRef}
                className="relative w-full h-[120vh] md:h-[280vh]"
            >
                <div className="sticky top-0 left-0 w-full pt-6 md:pt-12">
                    {/* Mobile: vertical stack, fixed heights so all 3 fit on screen; Desktop: horizontal row */}
                    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-6 md:mt-12 flex flex-col md:flex-row gap-[2px]">
                        {INTRO_IMAGES.map((img, index) => (
                            <div
                                key={img.src}
                                className="w-full h-[30vh] min-h-[140px] md:h-auto md:min-h-0 md:flex-1 md:min-w-0 relative md:aspect-[4/3] overflow-hidden bg-background"
                            >
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                                    style={{ opacity: labelOpacities[index] }}
                                >
                                    <span className="text-3xl md:text-4xl lg:text-5xl font-sans uppercase tracking-tight text-foreground">
                                        {img.label}
                                    </span>
                                </motion.div>
                                <motion.div
                                    className="absolute inset-0"
                                    style={{ opacity: imageOpacities[index] }}
                                >
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
