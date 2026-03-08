"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

const COLS = 8;
const ROWS = 6;
const TILE_COUNT = COLS * ROWS;

/** Scatter range in px for out/in animation */
const SCATTER_OFFSET = 80;
const SCATTER_SCALE = 0.3;
const DURATION_OUT = 0.6;
const DURATION_IN = 0.7;
const STAGGER = 0.012;
const EASE = "power2.inOut";

type ScatterTileRef = HTMLDivElement | null;

interface ScatterImageTransitionProps {
    /** Current image URL to show */
    src: string;
    /** Previous index (for transition direction) */
    prevIndex: number;
    /** Current index */
    activeIndex: number;
    /** Alt text */
    alt?: string;
    className?: string;
}

/**
 * Scatter transition inspired by 3D slide effect: image is split into tiles
 * that animate out (scatter) and the next image's tiles animate in.
 */
export default function ScatterImageTransition({
    src,
    prevIndex,
    activeIndex,
    alt = "",
    className = "",
}: ScatterImageTransitionProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const tilesRef = useRef<ScatterTileRef[]>([]);
    const didInitialRef = useRef(false);

    const getScatterIn = useCallback((i: number) => {
        const row = Math.floor(i / COLS);
        const col = i % COLS;
        const seed = (row * 7 + col * 13) % 100 / 100;
        const angle = seed * Math.PI * 2;
        const dist = SCATTER_OFFSET * (0.6 + seed * 0.8);
        return {
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist,
            scale: SCATTER_SCALE,
            opacity: 0,
        };
    }, []);

    // Initial "in" animation for first image
    useEffect(() => {
        if (didInitialRef.current) return;
        const wrapper = wrapperRef.current;
        const tiles = tilesRef.current;
        if (!wrapper || tiles.length === 0) return;

        didInitialRef.current = true;
        tiles.forEach((el, i) => {
            if (!el) return;
            const s = getScatterIn(i);
            gsap.set(el, {
                x: s.x,
                y: s.y,
                scale: s.scale,
                opacity: 0,
            });
        });
        gsap.to(tiles.filter(Boolean), {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            duration: DURATION_IN,
            stagger: STAGGER,
            ease: EASE,
        });
    }, [getScatterIn]);

    // When activeIndex changes: run scatter out on current, then parent will switch src and run scatter in
    const runTransitionOut = useCallback(() => {
        const tiles = tilesRef.current;
        tiles.forEach((el, i) => {
            if (!el) return;
            const row = Math.floor(i / COLS);
            const col = i % COLS;
            const seed = (row * 11 + col * 17) % 100 / 100;
            const angle = seed * Math.PI * 2;
            const dist = SCATTER_OFFSET * (0.7 + seed * 0.6);
            gsap.to(el, {
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                scale: SCATTER_SCALE,
                opacity: 0,
                duration: DURATION_OUT,
                delay: i * STAGGER,
                ease: EASE,
            });
        });
    }, []);

    const runTransitionIn = useCallback(() => {
        const tiles = tilesRef.current;
        tiles.forEach((el, i) => {
            if (!el) return;
            const s = getScatterIn(i);
            gsap.set(el, { x: s.x, y: s.y, scale: s.scale, opacity: 0 });
        });
        gsap.to(tiles.filter(Boolean), {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            duration: DURATION_IN,
            stagger: STAGGER,
            ease: EASE,
        });
    }, [getScatterIn]);

    useEffect(() => {
        if (prevIndex === activeIndex) return;
        runTransitionOut();
    }, [activeIndex, prevIndex, runTransitionOut]);

    return (
        <div
            ref={wrapperRef}
            className={`absolute inset-0 overflow-hidden ${className}`}
        >
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                    gridTemplateRows: `repeat(${ROWS}, 1fr)`,
                }}
            >
                {Array.from({ length: TILE_COUNT }, (_, i) => {
                    const row = Math.floor(i / COLS);
                    const col = i % COLS;
                    return (
                        <div
                            key={i}
                            ref={(el) => {
                                tilesRef.current[i] = el;
                            }}
                            className="absolute bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(${src})`,
                                backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
                                backgroundPosition: `${(-col * 100) / (COLS - 1) || 0}% ${(-row * 100) / (ROWS - 1) || 0}%`,
                                left: `${(col / COLS) * 100}%`,
                                top: `${(row / ROWS) * 100}%`,
                                width: `${100 / COLS}%`,
                                height: `${100 / ROWS}%`,
                                transformOrigin: "center center",
                            }}
                        />
                    );
                })}
            </div>
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    zIndex: 2,
                    display: "grid",
                    gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                    gridTemplateRows: `repeat(${ROWS}, 1fr)`,
                }}
            >
                {renderTiles(1, outLayer === 1 ? (images[outImageIndex] ?? images[0]) : (images[inImageIndex] ?? images[0]))}
            </div>
            <div className="absolute inset-0" style={{ zIndex: 2 }}>
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
                    }}
                >
                    {Array.from({ length: TILE_COUNT }, (_, i) => {
                        const row = Math.floor(i / COLS);
                        const col = i % COLS;
                        return (
                            <div
                                key={`1-${i}`}
                                ref={(el) => {
                                    tiles1Ref.current[i] = el;
                                }}
                                className="bg-cover bg-center bg-no-repeat"
                                style={{
                                    backgroundImage: `url(${images[visibleLayerRef.current === 1 ? activeIndex : prevIndexRef.current] ?? images[0]})`,
                                    backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
                                    backgroundPosition: `${(-col * 100) / (COLS - 1) || 0}% ${(-row * 100) / (ROWS - 1) || 0}%`,
                                    transformOrigin: "center center",
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export { runTransitionIn, runTransitionOut };
