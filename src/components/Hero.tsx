import { motion } from "framer-motion";
import LaserFlow from "@/components/LaserFlow";

const GREEN_GLOW = "0 0 40px #45d9a3, 0 0 80px #45d9a3, 0 0 120px rgba(69,217,163,0.6), 0 0 160px rgba(69,217,163,0.4)";
const DARK_SHADOW = "0 6px 24px rgba(0,0,0,0.9), 0 12px 48px rgba(0,0,0,0.8), 0 24px 80px rgba(0,0,0,0.6), 0 40px 120px rgba(0,0,0,0.5), 0 56px 160px rgba(0,0,0,0.35)";

const wordAnimation = (delay: number) => ({
    initial: {
        opacity: 0,
        color: "#45d9a3",
        textShadow: GREEN_GLOW,
    },
    animate: {
        opacity: [0, 1, 1],
        color: ["#45d9a3", "#45d9a3", "#ffffff"],
        textShadow: [GREEN_GLOW, GREEN_GLOW, DARK_SHADOW],
        transition: {
            duration: 2.2,
            times: [0, 0.35, 1],
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
});

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center pb-0 overflow-hidden bg-black">
            {/* LaserFlow background - 8s reveal top to bottom with soft black blur at the edge */}
            <motion.div
                className="absolute inset-0 z-0 w-full h-full"
                style={{
                    maskImage:
                        "linear-gradient(to bottom, black 0%, black var(--mask-top), transparent var(--mask-bottom))",
                    WebkitMaskImage:
                        "linear-gradient(to bottom, black 0%, black var(--mask-top), transparent var(--mask-bottom))",
                    maskSize: "100% 100%",
                    maskRepeat: "no-repeat",
                }}
                initial={{
                    "--mask-top": "0%",
                    "--mask-bottom": "4%",
                    opacity: 0.85,
                }}
                animate={{
                    "--mask-top": "100%",
                    "--mask-bottom": "118%",
                    opacity: 1,
                }}
                transition={{
                    duration: 8,
                    ease: [0.25, 0.1, 0.25, 1],
                }}
            >
                <LaserFlow
                    dpr={1}
                    instantFade
                    horizontalBeamOffset={0}
                    verticalBeamOffset={-0.5}
                    color="#45d9a3"
                    horizontalSizing={0.5}
                    verticalSizing={3.4}
                    wispDensity={1}
                    wispSpeed={15}
                    wispIntensity={5}
                    flowSpeed={0.35}
                    flowStrength={0.25}
                    fogIntensity={0.45}
                    fogScale={0.3}
                    fogFallSpeed={0.6}
                    decay={1.1}
                    falloffStart={1.2}
                />
            </motion.div>

            <div className="container mx-auto px-6 max-w-[1400px] z-10 relative">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display leading-none tracking-normal mb-8 whitespace-nowrap">
                        <motion.span
                            className="inline-block mr-[0.15em] md:mr-[0.2em]"
                            {...wordAnimation(0.5)}
                        >
                            Build.
                        </motion.span>
                        <motion.span
                            className="inline-block mr-[0.15em] md:mr-[0.2em]"
                            {...wordAnimation(1.4)}
                        >
                            Automate.
                        </motion.span>
                        <motion.span className="inline-block" {...wordAnimation(2.3)}>
                            Grow.
                        </motion.span>
                    </h1>
                </div>
            </div>
        </section>
    );
}
