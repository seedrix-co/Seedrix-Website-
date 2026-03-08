"use client";

import { useRef, useEffect } from "react";

/** Logos from public/portfolio/logos; size 'small' for Alfabiha, default for rest */
const LOGOS: { src: string; alt: string; size?: "small" | "default" }[] = [
    { src: "/portfolio/logos/wishholdings.png", alt: "Wish Holdings" },
    { src: "/portfolio/logos/uaemart.png", alt: "UAE Mart" },
    { src: "/portfolio/logos/curveclear.png", alt: "Curve Clear" },
    { src: "/portfolio/logos/wwc.png", alt: "WWC" },
    { src: "/portfolio/logos/excellentshine.png", alt: "Excellent Shine" },
    { src: "/portfolio/logos/logo.avif", alt: "Alfabiha", size: "small" },
    { src: "/portfolio/logos/vvlogo.png", alt: "VV" },
    { src: "/portfolio/logos/wishgroup.png", alt: "Wish Group" },
    { src: "/portfolio/logos/Trackjunction.png", alt: "Track Junction" },
];

export default function LogoLoop() {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const wrapper = el.querySelector("[data-loop-wrapper]") as HTMLElement;
        if (!wrapper) return;

        const width = wrapper.scrollWidth / 2;
        let position = 0;
        let raf: number;

        function tick() {
            position -= 0.5;
            if (Math.abs(position) >= width) position = 0;
            wrapper.style.transform = `translateX(${position}px)`;
            raf = requestAnimationFrame(tick);
        }
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, []);

    return (
        <section className="relative z-20 py-[var(--spacing-section)] overflow-hidden bg-card border-y border-border/50">
            <div className="flex flex-col md:flex-row md:items-center gap-0 overflow-hidden">
                <h2 className="shrink-0 text-5xl md:text-7xl lg:text-8xl font-display uppercase tracking-tight leading-none pr-0 pb-6 md:pb-0 md:pr-8">
                    <span className="font-light text-[#CACACA]">OUR </span>
                    <span className="font-bold text-[#36f2b0]">CLIENTS</span>
                </h2>
                <div
                    ref={scrollRef}
                    className="flex-1 min-w-0 overflow-hidden -mx-4 md:mx-0"
                    style={{
                        maskImage: "linear-gradient(to right, transparent 0%, black 120px)",
                        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 120px)",
                    }}
                >
                    <div
                        data-loop-wrapper
                        className="flex w-max gap-16 items-center will-change-transform"
                        style={{ width: "max-content" }}
                    >
                        {[...LOGOS, ...LOGOS].map((logo, i) => {
                            const isSmall = logo.size === "small";
                            return (
                                <div
                                    key={i}
                                    className={`flex shrink-0 items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 ${
                                        isSmall
                                            ? "h-14 w-20 md:h-16 md:w-24"
                                            : "h-24 w-32 md:h-28 md:w-40"
                                    }`}
                                >
                                    <img
                                        src={logo.src}
                                        alt={logo.alt}
                                        className="max-h-full max-w-full object-contain"
                                        loading="lazy"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
