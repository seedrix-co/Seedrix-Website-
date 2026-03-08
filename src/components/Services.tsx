import { useRef } from "react";
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { viewportReveal } from "@/lib/motion";

const services = [
    {
        num: "01",
        title: "STRATEGY & CONSULTATION",
        desc: "Guiding your vision with clarity and direction.",
        tags: ["Responsive Design", "Interaction Design", "CMS Integration", "SEO Optimization"],
        image: "/services/strategy and consultation.jpeg",
    },
    {
        num: "02",
        title: "TECHNOLOGY & ENGINEERING",
        desc: "Building robust, scalable solutions.",
        tags: ["Logo Design", "Color System", "Typography", "Brand Direction"],
        image: "/services/TECHNOLOGY & ENGINEERING.png",
    },
    {
        num: "03",
        title: "AI & AUTOMATION",
        desc: "Streamlining workflows with intelligent systems.",
        tags: ["Instagram Design", "Story Kits", "Content Templates", "Visual Consistency"],
        image: "/services/AI & AUTOMATION.jpg",
    },
    {
        num: "04",
        title: "MEDIA, BRAND & GROWTH",
        desc: "Amplifying your reach and impact.",
        tags: ["Micro-interactions", "Scroll Effects", "Hover States", "Framer Motion"],
        image: "/services/BRAND GROWTH.jpg",
    },
];

const smoothEase = [0.25, 0.1, 0.25, 1] as const;

function ServiceRow({
    svc,
    index,
    isActive,
    onActivate,
}: {
    svc: (typeof services)[0];
    index: number;
    isActive: boolean;
    onActivate: () => void;
}) {
    const rowRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: rowRef,
        offset: ["start end", "end start"],
    });
    const imageY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [32, 0, 0, -32]);

    return (
        <motion.div
            ref={rowRef}
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ ...viewportReveal, margin: "60px" }}
            transition={{ duration: 0.8, ease: smoothEase, delay: index * 0.08 }}
            className="w-full relative group cursor-pointer border-b border-border-light transition-colors duration-700"
            onMouseEnter={onActivate}
            onClick={onActivate}
        >
            {/* Background that appears on active */}
            <motion.div
                className="absolute inset-x-0 inset-y-0 rounded-2xl bg-card hidden lg:block"
                style={{ backgroundColor: "var(--color-border-light)" }}
                initial={false}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.7, ease: smoothEase }}
            />

            <div className="relative z-10 flex flex-col lg:flex-row w-full p-6 lg:p-8 lg:px-12 items-start py-8 lg:py-10">
                <div className="flex text-3xl md:text-5xl font-sans w-20 lg:w-32 shrink-0 transition-colors duration-500 items-start line-clamp-1 ease-out">
                    <span className={isActive ? "text-foreground" : "text-muted"}>{svc.num}</span>
                    <span className="text-primary">.</span>
                </div>

                <div className="flex-1 relative w-full mt-4 lg:mt-0 lg:pt-0">
                    <motion.div
                        initial={false}
                        animate={{
                            height: isActive ? "auto" : 0,
                            opacity: isActive ? 1 : 0,
                        }}
                        transition={{ duration: 1, ease: smoothEase }}
                        className="overflow-hidden"
                    >
                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 w-full h-full pb-2">
                            <div className="w-full lg:w-[400px] xl:w-[450px] aspect-[4/3] lg:aspect-auto lg:h-[380px] relative rounded-2xl overflow-hidden shrink-0 bg-border-light">
                                <motion.img
                                    src={encodeURI(svc.image)}
                                    alt={svc.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    style={{ y: imageY }}
                                />
                            </div>

                            <div className="flex flex-col justify-between py-2 lg:py-4 w-full h-full lg:min-h-[380px]">
                                <div className="flex flex-col gap-4 lg:gap-6">
                                    <h4 className="text-3xl md:text-4xl lg:text-[40px] leading-tight text-foreground font-sans">{svc.title}</h4>
                                    <p className="text-muted text-lg md:text-xl lg:text-2xl leading-relaxed lg:max-w-xl font-light">
                                        {svc.desc}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 lg:gap-3 mt-8 lg:mt-auto">
                                    {svc.tags.map((tag, j) => (
                                        <div
                                            key={j}
                                            className="px-5 py-2.5 rounded-[40px] border border-border-light text-muted text-sm lg:text-base whitespace-nowrap bg-transparent"
                                        >
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="absolute top-0 left-0 text-3xl md:text-4xl lg:text-[44px] text-foreground font-sans pointer-events-none origin-left"
                        initial={false}
                        animate={{
                            opacity: isActive ? 0 : 1,
                            y: isActive ? 10 : 0,
                        }}
                        transition={{ duration: 0.5, ease: smoothEase }}
                        style={{
                            visibility: isActive ? "hidden" : "visible",
                            transition: isActive ? "visibility 0s ease 0.5s" : "visibility 0s",
                        }}
                    >
                        {svc.title}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

export default function Services() {
    const [hoveredIndex, setHoveredIndex] = useState<number>(0);

    return (
        <section className="py-[var(--spacing-section)] bg-background relative" id="services">
            <div className="container mx-auto px-6 max-w-[1400px]">
                {/* Header Container */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 lg:mb-24 gap-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewportReveal}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl lg:text-[7vw] leading-[1.1] font-sans uppercase tracking-tight flex flex-wrap gap-x-4 lg:gap-x-6 max-w-[75%]"
                    >
                        <span>HOW</span> <span>WE</span> <span>CAN</span> <span>HELP</span>
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={viewportReveal}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-muted text-sm md:text-base tracking-widest uppercase font-semibold pb-4"
                    >
                        (SERVICES)
                    </motion.div>
                </div>

                {/* Services List */}
                <div className="flex flex-col w-full border-t border-border-light">
                    {services.map((svc, i) => (
                        <ServiceRow
                            key={i}
                            svc={svc}
                            index={i}
                            isActive={hoveredIndex === i}
                            onActivate={() => setHoveredIndex(i)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
