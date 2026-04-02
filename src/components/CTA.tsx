import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUpVariant, viewportReveal } from "@/lib/motion";
import { Button } from "@/components/ui/button";

const SERVICES = [
    "STRATEGY & CONSULTING",
    "TECHNOLOGY & SOFTWARE ENGINEERING",
    "AUTOMATION, AI & DATA",
    "MEDIA, BRAND & DIGITAL GROWTH",
] as const;

export default function CTA() {
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const backgroundY = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "8%", "0%"]);
    const buttonY = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [24, 0, -16]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("sending");
        const form = e.currentTarget;
        const formData = new FormData(form);
        try {
            const res = await fetch("/api/send-inquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.get("name"),
                    email: formData.get("email"),
                    company: formData.get("company"),
                    service: formData.get("service"),
                    message: formData.get("message"),
                }),
            });
            let data: { success?: boolean; error?: string } = {};
            try {
                data = await res.json();
            } catch {
                /* non-JSON response */
            }
            if (res.ok && data.success) {
                setStatus("sent");
                form.reset();
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    }

    return (
        <section
            ref={sectionRef}
            className="relative pt-[var(--spacing-section)] pb-12 overflow-hidden bg-black text-white"
        >
            <motion.div
                className="absolute inset-0 z-0 w-full"
                style={{
                    backgroundImage: "url(/IMG/Contactus.webp)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    y: backgroundY,
                    scale: 1.12,
                }}
            />
            <div className="container relative z-10 w-full max-w-none px-4 sm:px-6 lg:px-10 py-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportReveal}
                    variants={fadeUpVariant}
                    className="flex flex-col items-start text-left flex-shrink-0 lg:max-w-md"
                >
                    <span className="text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6">Hit us up</span>
                    <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display uppercase tracking-tighter leading-none mb-8 sm:mb-10">
                        Let's <br /> Work Together
                    </h2>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportReveal}
                    variants={fadeUpVariant}
                    className="w-full lg:max-w-md lg:flex-shrink-0 lg:mr-0 lg:ml-auto rounded-2xl bg-black/25 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.06)] md:rounded-none md:bg-transparent md:backdrop-blur-none md:shadow-none"
                >
                    <form
                        onSubmit={handleSubmit}
                        className="p-4 sm:p-6 md:p-8 space-y-5"
                    >
                        <div className="grid gap-4 sm:grid-cols-2">
                            <label className="block">
                                <span className="block text-sm font-medium text-white/90 mb-1.5">
                                    Name <span className="text-primary">*</span>
                                </span>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Your name"
                                />
                            </label>
                            <label className="block">
                                <span className="block text-sm font-medium text-white/90 mb-1.5">
                                    Email <span className="text-primary">*</span>
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="you@company.com"
                                />
                            </label>
                        </div>
                        <label className="block">
                            <span className="block text-sm font-medium text-white/90 mb-1.5">Company</span>
                            <input
                                type="text"
                                name="company"
                                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Your company"
                            />
                        </label>
                        <label className="block">
                            <span className="block text-sm font-medium text-white/90 mb-1.5">
                                Service of interest <span className="text-primary">*</span>
                            </span>
                            <select
                                name="service"
                                required
                                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none cursor-pointer bg-no-repeat bg-[length:1rem] bg-[right_0.75rem_center] pr-10"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.7)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                }}
                            >
                                <option value="">Select a service</option>
                                {SERVICES.map((s) => (
                                    <option key={s} value={s} className="bg-gray-900 text-white">
                                        {s}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="block">
                            <span className="block text-sm font-medium text-white/90 mb-1.5">
                                Message <span className="text-primary">*</span>
                            </span>
                            <textarea
                                name="message"
                                required
                                rows={4}
                                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y min-h-[100px]"
                                placeholder="Tell us about your project..."
                            />
                        </label>
                        {status === "sent" && (
                            <p className="text-primary text-sm font-medium">Thanks! We'll be in touch soon.</p>
                        )}
                        {status === "error" && (
                            <p className="text-red-300 text-sm">Something went wrong. Please try again.</p>
                        )}
                        <motion.div style={{ y: buttonY }}>
                            <Button
                                type="submit"
                                variant="default"
                                size="lg"
                                disabled={status === "sending"}
                                className="w-full sm:w-auto bg-white text-black hover:bg-white/90"
                            >
                                {status === "sending" ? "Sending…" : "Send inquiry"}
                            </Button>
                        </motion.div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
