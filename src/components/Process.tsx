import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUpVariant, viewportReveal } from "@/lib/motion";

const processEasing = [0.25, 0.46, 0.45, 0.94] as const;
const processReveal: typeof fadeUpVariant = {
    hidden: { opacity: 0, y: 48 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1.2, ease: processEasing },
    },
};
const processStagger = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.22,
            delayChildren: 0.15,
        },
    },
};

export default function Process() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const steps = [
        { num: "01", title: "Discovery", desc: "Understanding your goals, audience, and market landscape." },
        { num: "02", title: "Strategy", desc: "Crafting a detailed roadmap and technical architecture." },
        { num: "03", title: "Design", desc: "Iterative wireframing and pixel-perfect visual design." },
        { num: "04", title: "Development", desc: "Rigorous engineering with a focus on performance and motion." },
        { num: "05", title: "Launch", desc: "Seamless deployment and post-launch support." },
    ];

    return (
        <section ref={sectionRef} className="py-[var(--spacing-section)] bg-card border-y border-border/50" id="process">
            <div className="container mx-auto px-6 max-w-[1400px]">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "80px" }}
                    variants={processReveal}
                    transition={{ duration: 1.2, ease: processEasing }}
                    className="text-center mb-20"
                >
                    <h2 className="text-6xl md:text-8xl font-display uppercase tracking-tight leading-none">
                        How We <br />
                        <span className="text-primary">Work</span>
                    </h2>
                </motion.div>

                <motion.div
                    variants={processStagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportReveal}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4"
                >
                    {steps.map((step, i) => (
                        <ProcessStep key={i} step={step} index={i} scrollYProgress={scrollYProgress} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function ProcessStep({
    step,
    index,
    scrollYProgress,
}: {
    step: { num: string; title: string; desc: string };
    index: number;
    scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
    const parallaxOffset = useTransform(scrollYProgress, [0, 0.5, 1], [(index - 2) * 48, 0, (index - 2) * -48]);
    return (
        <motion.div
            variants={processReveal}
            style={{ y: parallaxOffset }}
            className="group flex flex-col space-y-6 cursor-default"
        >
            <div className="text-4xl font-display text-border-light group-hover:text-primary transition-colors duration-300">
                {step.num}
            </div>
            <div className="h-px bg-border-light w-full group-hover:bg-primary/50 transition-colors duration-300" />
            <h3 className="text-2xl font-display uppercase tracking-wider font-normal group-hover:text-primary group-hover:font-bold transition-all duration-300">
                {step.title}
            </h3>
            <p className="text-muted text-sm leading-relaxed font-normal group-hover:text-primary group-hover:font-semibold transition-all duration-300">
                {step.desc}
            </p>
        </motion.div>
    );
}
