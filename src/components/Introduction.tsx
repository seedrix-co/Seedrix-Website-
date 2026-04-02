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

/**
 * Tall scroll track so each image + label gets a long, slow scrub (desktop + mobile).
 * Larger value = slower progress through the same animation keyframes.
 */
const PIN_SCROLL_CLASS = "h-[380vh] md:h-[560vh]";

export default function Introduction() {
    const pinRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: pinRef,
        offset: ["start start", "end end"],
    });

    // Each column: image first, then label; keyed to ~⅓ of scroll each (one image per “chapter”)
    const image1 = useTransform(scrollYProgress, [0.04, 0.16], [0, 1]);
    const image2 = useTransform(scrollYProgress, [0.36, 0.48], [0, 1]);
    const image3 = useTransform(scrollYProgress, [0.66, 0.8], [0, 1]);
    const imageOpacities = [image1, image2, image3];

    // Labels fade in, then stay visible (do not fade out when the image appears)
    const label1 = useTransform(scrollYProgress, [0.14, 0.3, 1], [0, 1, 1]);
    const label2 = useTransform(scrollYProgress, [0.44, 0.6, 1], [0, 1, 1]);
    const label3 = useTransform(scrollYProgress, [0.74, 0.94, 1], [0, 1, 1]);
    const labelOpacities = [label1, label2, label3];

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
                    <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-sans font-light text-foreground leading-tight md:leading-snug max-w-5xl flex flex-wrap justify-center gap-x-[0.25em] gap-y-0">
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

            {/* Pinned scroll area; tall track so scroll feels smooth and slow (same rhythm on mobile + desktop) */}
            <div ref={pinRef} className={`relative w-full ${PIN_SCROLL_CLASS}`}>
                <div className="sticky top-0 left-0 w-full pt-6 md:pt-12">
                    {/* Mobile: vertical stack, fixed heights so all 3 fit on screen; Desktop: horizontal row */}
                    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-6 md:mt-12 flex flex-col md:flex-row gap-[2px]">
                        {INTRO_IMAGES.map((img, index) => (
                            <div
                                key={img.src}
                                className="w-full h-[28vh] min-h-[160px] md:h-auto md:min-h-0 md:flex-1 md:min-w-0 relative md:aspect-[4/3] overflow-hidden bg-background"
                            >
                                <motion.div
                                    className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-4"
                                    style={{ opacity: labelOpacities[index] }}
                                >
                                    {/* Full-bleed matte: gradients cover the entire image (vertical + horizontal + radial) */}
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background: `
                                                radial-gradient(ellipse 120% 100% at 50% 50%, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.38) 52%, rgba(0,0,0,0.78) 100%),
                                                linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.06) 42%, rgba(0,0,0,0.1) 58%, rgba(0,0,0,0.58) 100%),
                                                linear-gradient(90deg, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.04) 28%, rgba(0,0,0,0.04) 72%, rgba(0,0,0,0.38) 100%)
                                            `,
                                        }}
                                        aria-hidden
                                    />
                                    <span className="relative z-[1] text-center text-xl sm:text-2xl md:text-4xl lg:text-5xl font-sans font-medium uppercase tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.9)]">
                                        {img.label}
                                    </span>
                                </motion.div>
                                <motion.div
                                    className="absolute inset-0 z-0"
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
