"use client";

import { useRef, useEffect, useState } from "react";
import "./Testimonial.css";

const LOGO_SRC = "/Logo.png";

type Mode = "magnet" | "freeze";

class Particle {
    x: number;
    y: number;
    originX: number;
    originY: number;
    r: number;
    g: number;
    b: number;
    size: number;
    baseSize: number;
    vx: number;
    vy: number;
    friction: number;
    springStrength: number;
    wanderAngle: number;
    wanderSpeed: number;
    opacity: number;
    targetOpacity: number;

    constructor(
        x: number,
        y: number,
        originX: number,
        originY: number,
        r: number,
        g: number,
        b: number,
        size: number
    ) {
        this.x = x;
        this.y = y;
        this.originX = originX;
        this.originY = originY;
        this.r = r;
        this.g = g;
        this.b = b;
        this.size = size;
        this.baseSize = size;
        this.vx = 0;
        this.vy = 0;
        this.friction = 0.92 + Math.random() * 0.04;
        this.springStrength = 0.008 + Math.random() * 0.008;
        this.wanderAngle = Math.random() * Math.PI * 2;
        this.wanderSpeed = 0.02 + Math.random() * 0.02;
        this.opacity = 0;
        this.targetOpacity = 1;
    }

    update(
        mode: Mode,
        mx: number,
        my: number,
        isPointerDown: boolean,
        evaporateAmount: number
    ) {
        this.opacity += (this.targetOpacity - this.opacity) * 0.05;

        if (evaporateAmount > 0) {
            this.targetOpacity = 1 - evaporateAmount;
            this.vy -= 1.2 * evaporateAmount;
            this.vx += (Math.random() - 0.5) * 0.8 * evaporateAmount;
        } else {
            this.targetOpacity = 1;
        }

        if (mode === "freeze") {
            this.vx *= 0.95;
            this.vy *= 0.95;
            this.x += this.vx;
            this.y += this.vy;
            return;
        }

        const dx = this.originX - this.x;
        const dy = this.originY - this.y;
        this.vx += dx * this.springStrength;
        this.vy += dy * this.springStrength;

        this.wanderAngle += this.wanderSpeed;
        this.vx += Math.cos(this.wanderAngle) * 0.05;
        this.vy += Math.sin(this.wanderAngle) * 0.05;

        if (mode === "magnet") {
            const mdx = this.x - mx;
            const mdy = this.y - my;
            const dist = Math.sqrt(mdx * mdx + mdy * mdy);
            const radius = 200;

            if (dist < radius && dist > 0) {
                const force = (radius - dist) / radius;
                const angle = Math.atan2(mdy, mdx);
                const power = force * 2;
                this.vx -= Math.cos(angle) * power;
                this.vy -= Math.sin(angle) * power;
                this.size = this.baseSize * (1 - force * 0.3);
            } else {
                this.size += (this.baseSize - this.size) * 0.1;
            }
        } else {
            this.size += (this.baseSize - this.size) * 0.1;
        }

        this.vx *= this.friction;
        this.vy *= this.friction;
        this.x += this.vx;
        this.y += this.vy;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = `rgb(${this.r},${this.g},${this.b})`;
        const s = Math.max(1, this.size);
        const half = s / 2;
        const rad = s > 4 ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(this.x - half + rad, this.y - half);
        ctx.lineTo(this.x + half - rad, this.y - half);
        ctx.quadraticCurveTo(this.x + half, this.y - half, this.x + half, this.y - half + rad);
        ctx.lineTo(this.x + half, this.y + half - rad);
        ctx.quadraticCurveTo(this.x + half, this.y + half, this.x + half - rad, this.y + half);
        ctx.lineTo(this.x - half + rad, this.y + half);
        ctx.quadraticCurveTo(this.x - half, this.y + half, this.x - half, this.y + half - rad);
        ctx.lineTo(this.x - half, this.y - half + rad);
        ctx.quadraticCurveTo(this.x - half, this.y - half, this.x - half + rad, this.y - half);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

export default function Testimonial() {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const modeRef = useRef<Mode>("magnet");
    const mxRef = useRef(0);
    const myRef = useRef(0);
    const isPointerDownRef = useRef(false);
    const rafRef = useRef<number>(0);
    const shakeRef = useRef({ vx: 0, vy: 0 });
    const evaporateRef = useRef(0);
    const motionPermissionAskedRef = useRef(false);
    const removeMotionRef = useRef<(() => void) | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const WRef = useRef(0);
    const HRef = useRef(0);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const section = sectionRef.current;
        const canvas = canvasRef.current;
        if (!section || !canvas) return;

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;
        ctxRef.current = ctx;

        function resize() {
            const rect = section.getBoundingClientRect();
            const w = Math.floor(rect.width);
            const h = Math.floor(rect.height);
            WRef.current = w;
            HRef.current = h;
            canvas.width = w;
            canvas.height = h;
        }

        function getMousePos(e: { clientX: number; clientY: number }) {
            const rect = section.getBoundingClientRect();
            return {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        }

        function shatterImage(img: HTMLImageElement) {
            particlesRef.current = [];
            const W = WRef.current;
            const H = HRef.current;

            const scale = Math.min((W * 0.7) / img.width, (H * 0.65) / img.height, 1);
            const iw = Math.floor(img.width * scale);
            const ih = Math.floor(img.height * scale);
            const ox = Math.floor((W - iw) / 2);
            const oy = Math.floor((H - ih) / 2);

            const oc = document.createElement("canvas");
            oc.width = iw;
            oc.height = ih;
            const octx = oc.getContext("2d")!;
            octx.drawImage(img, 0, 0, iw, ih);
            const imgData = octx.getImageData(0, 0, iw, ih).data;

            const targetParticles = Math.min(8000, Math.max(2000, (iw * ih) / 20));
            const gap = Math.max(2, Math.floor(Math.sqrt((iw * ih) / targetParticles)));
            const pSize = gap * 0.95;

            for (let y = 0; y < ih; y += gap) {
                for (let x = 0; x < iw; x += gap) {
                    const i = (y * iw + x) * 4;
                    const a = imgData[i + 3];
                    if (a < 128) continue;

                    const r = imgData[i];
                    const g = imgData[i + 1];
                    const b = imgData[i + 2];
                    const px = ox + x;
                    const py = oy + y;

                    const edge = Math.random();
                    let sx: number, sy: number;
                    if (edge < 0.25) {
                        sx = Math.random() * W;
                        sy = -50;
                    } else if (edge < 0.5) {
                        sx = Math.random() * W;
                        sy = H + 50;
                    } else if (edge < 0.75) {
                        sx = -50;
                        sy = Math.random() * H;
                    } else {
                        sx = W + 50;
                        sy = Math.random() * H;
                    }

                    const p = new Particle(sx, sy, px, py, r, g, b, pSize);
                    p.vx = (px - sx) * 0.01 + (Math.random() - 0.5) * 2;
                    p.vy = (py - sy) * 0.01 + (Math.random() - 0.5) * 2;
                    particlesRef.current.push(p);
                }
            }

            setLoading(false);
        }

        const img = new Image();
        img.onload = () => {
            resize();
            shatterImage(img);
        };
        img.src = LOGO_SRC;

        resize();
        window.addEventListener("resize", () => {
            resize();
            if (img.complete && img.naturalWidth) shatterImage(img);
        });

        const onPointerMove = (e: PointerEvent) => {
            const { x, y } = getMousePos(e);
            mxRef.current = x;
            myRef.current = y;
        };

        const onPointerDown = (e: PointerEvent) => {
            isPointerDownRef.current = true;
            const { x, y } = getMousePos(e);
            mxRef.current = x;
            myRef.current = y;
        };

        const onPointerUp = () => {
            isPointerDownRef.current = false;
        };

        canvas.addEventListener("pointermove", onPointerMove);
        canvas.addEventListener("pointerdown", onPointerDown);
        canvas.addEventListener("pointerup", onPointerUp);
        canvas.addEventListener("pointerleave", onPointerUp);

        // Device motion (shake) for mobile
        const SHAKE_THRESHOLD = 12;
        const SHAKE_SCALE = 0.4;
        const SHAKE_DECAY = 0.92;

        function setupDeviceMotion(): () => void {
            const onMotion = (e: DeviceMotionEvent) => {
                const a = e.acceleration ?? e.accelerationIncludingGravity;
                if (a == null) return;
                const ax = a.x ?? 0;
                const ay = a.y ?? 0;
                const az = a.z ?? 0;
                const magnitude = Math.sqrt(ax * ax + ay * ay + az * az);
                if (magnitude > SHAKE_THRESHOLD) {
                    shakeRef.current.vx += ax * SHAKE_SCALE;
                    shakeRef.current.vy += ay * SHAKE_SCALE;
                }
            };
            window.addEventListener("devicemotion", onMotion);
            return () => window.removeEventListener("devicemotion", onMotion);
        }

        function requestMotionPermission() {
            if (motionPermissionAskedRef.current) return;
            motionPermissionAskedRef.current = true;
            if (typeof (DeviceMotionEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === "function") {
                (DeviceMotionEvent as unknown as { requestPermission: () => Promise<string> })
                    .requestPermission()
                    .then((status) => {
                        if (status === "granted") {
                            removeMotionRef.current = setupDeviceMotion();
                        }
                    })
                    .catch(() => {});
            } else {
                removeMotionRef.current = setupDeviceMotion();
            }
        }

        if (typeof DeviceMotionEvent !== "undefined") {
            if ((DeviceMotionEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission) {
                section.addEventListener("click", requestMotionPermission, { once: true });
                section.addEventListener("touchstart", requestMotionPermission, { once: true });
            } else {
                removeMotionRef.current = setupDeviceMotion();
            }
        }

        function render() {
            const W = WRef.current;
            const H = HRef.current;
            const particles = particlesRef.current;
            const currentMode = modeRef.current;
            const mx = mxRef.current;
            const my = myRef.current;
            const isPointerDown = isPointerDownRef.current;
            const shake = shakeRef.current;

            const rect = section.getBoundingClientRect();
            const viewportH = window.innerHeight;
            if (rect.bottom < viewportH * 0.5) {
                const t = (viewportH * 0.5 - rect.bottom) / Math.max(200, viewportH * 0.4);
                evaporateRef.current = Math.min(1, evaporateRef.current + t * 0.03);
            } else {
                evaporateRef.current = Math.max(0, evaporateRef.current - 0.015);
            }
            const evaporateAmount = evaporateRef.current;

            ctx.clearRect(0, 0, W, H);

            particles.forEach((p) => {
                p.update(currentMode, mx, my, isPointerDown, evaporateAmount);
                p.vx += shake.vx;
                p.vy += shake.vy;
                p.draw(ctx);
            });

            shakeRef.current.vx *= SHAKE_DECAY;
            shakeRef.current.vy *= SHAKE_DECAY;

            rafRef.current = requestAnimationFrame(render);
        }
        rafRef.current = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("resize", resize);
            section.removeEventListener("click", requestMotionPermission);
            section.removeEventListener("touchstart", requestMotionPermission);
            canvas.removeEventListener("pointermove", onPointerMove);
            canvas.removeEventListener("pointerdown", onPointerDown);
            canvas.removeEventListener("pointerup", onPointerUp);
            canvas.removeEventListener("pointerleave", onPointerUp);
            removeMotionRef.current?.();
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="particle-section"
            id="testimonial"
            style={{ minHeight: "100vh" }}
        >
            <canvas ref={canvasRef} className="particle-canvas" />

            <div className={`particle-loading ${loading ? "" : "hidden"}`} id="loading">
                <div className="particle-loading-spinner" />
                <p>Shattering into particles...</p>
            </div>
        </section>
    );
}
