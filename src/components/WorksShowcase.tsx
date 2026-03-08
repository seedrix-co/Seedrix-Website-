"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** First image per portfolio folder (public/portfolio); order = carousel order */
const PORTFOLIOS = [
    { title: "SJ Shoe", img: "/portfolio/sjshoe/sj1.png", link: "#" },
    { title: "Vacation Vibez", img: "/portfolio/vv/vv1.png", link: "#" },
    { title: "WWC", img: "/portfolio/wwc/wwc1.png", link: "#" },
    { title: "WH", img: "/portfolio/wh/wh1.png", link: "#" },
    { title: "Track Junction", img: "/portfolio/Trackjunction/Trackjunction.png", link: "#" },
    { title: "Al Fabiha", img: "/portfolio/alfabiha/alf1.png", link: "#" },
];

export default function WorksShowcase() {
    const targetRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [scrollDistance, setScrollDistance] = useState("0px");

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    useEffect(() => {
        const calculateScrollDistance = () => {
            if (carouselRef.current && window.innerWidth) {
                const offsetvw = window.innerWidth >= 1280 ? 0.4 : 0.3;
                const distance =
                    carouselRef.current.scrollWidth -
                    window.innerWidth +
                    window.innerWidth * offsetvw;
                setScrollDistance(`-${distance + 40}px`);
            }
        };

        calculateScrollDistance();
        window.addEventListener("resize", calculateScrollDistance);
        return () => window.removeEventListener("resize", calculateScrollDistance);
    }, []);

    const x = useTransform(scrollYProgress, [0, 1], ["0px", scrollDistance]);

    return (
        <>
            {/* Desktop: sticky horizontal scroll — Our projects + portfolio cards */}
            <section
                ref={targetRef}
                className="relative w-full h-[300vh] bg-[#0a0a0a] hidden md:block"
                id="works"
            >
                <div className="sticky top-0 left-0 w-full flex h-screen items-center overflow-hidden">
                    <div className="w-[30vw] xl:w-[40vw] flex-shrink-0 px-6 lg:px-24">
                        <h2 className="text-5xl md:text-6xl lg:text-[7vw] leading-[1.1] font-sans uppercase tracking-tight flex flex-col text-left">
                            <span className="font-light text-[#CACACA]">OUR</span>
                            <span className="font-bold text-[#36f2b0]">PROJECTS</span>
                        </h2>
                        <div className="text-muted text-sm md:text-base tracking-widest uppercase font-semibold mt-6">
                            (PORTFOLIO)
                        </div>
                    </div>

                    <div className="flex-1 overflow-hidden relative">
                        {/* Left fade: carousel fades into the letters (PROJECTS) */}
                        <div
                            className="absolute left-0 top-0 bottom-0 w-24 xl:w-32 z-10 pointer-events-none"
                            style={{
                                background: "linear-gradient(to right, #0a0a0a 0%, #0a0a0a 20%, transparent 100%)",
                            }}
                            aria-hidden
                        />
                        {/* Right fade: carousel fades out at the end */}
                        <div
                            className="absolute right-0 top-0 bottom-0 w-24 xl:w-40 z-10 pointer-events-none"
                            style={{
                                background: "linear-gradient(to left, #0a0a0a 0%, #0a0a0a 25%, transparent 100%)",
                            }}
                            aria-hidden
                        />
                        <motion.div
                            style={{ x }}
                            className="flex gap-5 md:gap-6 pr-6 lg:pr-12 w-max relative"
                        >
                            <div ref={carouselRef} className="flex gap-5 md:gap-6">
                                {PORTFOLIOS.map((item) => (
                                    <a
                                        key={item.img}
                                        href={item.link}
                                        className="relative flex flex-col w-[480px] lg:w-[640px] h-[270px] lg:h-[360px] shrink-0 overflow-hidden rounded-xl lg:rounded-2xl border border-[#222] bg-[#0a0a0a] shadow-[0_0_0_1px_rgba(255,255,255,0.03)] hover:border-[#36f2b0]/30 hover:shadow-[0_0_40px_-8px_rgba(54,242,176,0.15)] transition-all duration-300 ease-out group"
                                    >
                                        <div className="relative flex-1 min-h-0">
                                            <img
                                                src={item.img}
                                                alt={item.title}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                                            />
                                            {/* Green tint + grain overlay to break colors */}
                                            <div className="absolute inset-0 pointer-events-none mix-blend-soft-light bg-[#36f2b0]/25" aria-hidden />
                                            <div className="absolute inset-0 pointer-events-none opacity-[0.35] works-grain" aria-hidden />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 flex items-center justify-between">
                                            <span className="font-display text-lg lg:text-xl font-semibold text-white drop-shadow-sm group-hover:text-[#36f2b0] transition-colors duration-300">
                                                {item.title}
                                            </span>
                                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#36f2b0]/20 text-[#36f2b0] text-lg opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                                →
                                            </span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mobile: vertical list */}
            <section
                className="md:hidden py-24 px-6 bg-[#0a0a0a]"
                id="works-mobile"
            >
                <div className="mb-12">
                    <h2 className="text-4xl leading-[1.1] font-sans uppercase tracking-tight flex flex-col text-left">
                        <span className="font-light text-[#CACACA]">OUR</span>
                        <span className="font-bold text-[#36f2b0]">PROJECTS</span>
                    </h2>
                    <div className="text-muted text-sm tracking-widest uppercase font-semibold mt-4">
                        (PORTFOLIO)
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    {PORTFOLIOS.map((item) => (
                        <a
                            key={item.img}
                            href={item.link}
                            className="block w-full rounded-xl overflow-hidden border border-[#222] bg-[#0a0a0a] active:border-[#36f2b0]/30"
                        >
                            <div className="aspect-[16/9] relative">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 pointer-events-none mix-blend-soft-light bg-[#36f2b0]/25" aria-hidden />
                                <div className="absolute inset-0 pointer-events-none opacity-[0.35] works-grain" aria-hidden />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                                    <span className="font-display text-base font-semibold text-white">
                                        {item.title}
                                    </span>
                                    <span className="text-[#36f2b0] text-lg">→</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </section>
        </>
    );
}
