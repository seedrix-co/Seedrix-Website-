import { useState, useEffect } from "react";

export default function PixelCheck() {
    const [showGrid, setShowGrid] = useState(false);
    const [showSpacing, setShowSpacing] = useState(false);

    useEffect(() => {
        // Only run in development
        if (process.env.NODE_ENV !== "development") return;

        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore if user is typing in an input
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

            if (e.key.toLowerCase() === "g") {
                setShowGrid((prev) => !prev);
            }
            if (e.key.toLowerCase() === "s") {
                setShowSpacing((prev) => !prev);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    if (process.env.NODE_ENV !== "development") return null;

    return (
        <>
            {/* Grid Overlay */}
            {showGrid && (
                <div className="fixed inset-0 z-[9999] pointer-events-none flex justify-center">
                    <div className="w-full max-w-[1400px] h-full flex px-6">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div
                                key={i}
                                className="flex-1 h-full border-x border-red-500/20 bg-red-500/5 mx-2"
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Spacing Visualizer Overlay */}
            {showSpacing && (
                <style dangerouslySetInnerHTML={{
                    __html: `
          section {
            outline: 2px dashed rgba(0, 255, 0, 0.5) !important;
            outline-offset: -2px;
          }
          .container {
            outline: 1px solid rgba(0, 0, 255, 0.3) !important;
          }
          h1, h2, h3, p {
            background-color: rgba(255, 255, 0, 0.1);
          }
        `}} />
            )}

            {/* Helper Toast */}
            <div className="fixed bottom-4 left-4 z-[10000] bg-black/80 text-white text-xs p-3 rounded shadow-lg backdrop-blur-md font-mono border border-white/10 flex flex-col space-y-1">
                <span className="font-bold text-primary mb-1 uppercase tracking-widest">Dev Tools</span>
                <span>Press <kbd className="bg-white/20 px-1 rounded">G</kbd> to toggle Grid</span>
                <span>Press <kbd className="bg-white/20 px-1 rounded">S</kbd> to toggle Spacing Outline</span>
            </div>
        </>
    );
}
