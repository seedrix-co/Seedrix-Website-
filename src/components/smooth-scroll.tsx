import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.075,
                duration: 1.85,
                smoothWheel: true,
                wheelMultiplier: 0.82,
                touchMultiplier: 0.82,
            }}
        >
            {children}
        </ReactLenis>
    );
}
