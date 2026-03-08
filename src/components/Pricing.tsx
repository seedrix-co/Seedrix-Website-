import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer, viewportReveal, viewportRevealEarly } from "@/lib/motion";
import { Button } from "@/components/ui/button";

export default function Pricing() {
    const [isAnnual, setIsAnnual] = useState(false);

    const packages = [
        {
            name: "Starter",
            monthly: "$2,900",
            annual: "$29,000",
            features: ["Up to 5 Pages", "Basic SEO Setup", "1 Round of Revisions", "Standard Support"],
        },
        {
            name: "Growth",
            popular: true,
            monthly: "$5,500",
            annual: "$55,000",
            features: ["Up to 10 Pages", "Advanced Animations", "CMS Integration", "2 Rounds of Revisions", "Priority Support"],
        },
        {
            name: "Bespoke",
            monthly: "Custom",
            annual: "Custom",
            features: ["Unlimited Pages", "Custom Web App", "Database Architecture", "Ongoing Maintenance", "Dedicated Team"],
        }
    ];

    return (
        <section className="py-[var(--spacing-section)]" id="pricing">
            <div className="container mx-auto px-6 max-w-[1400px]">
                {/* Header */}
                <motion.div
                    initial="hidden" whileInView="visible" viewport={viewportReveal} variants={fadeUpVariant}
                    className="flex flex-col items-center text-center mb-16"
                >
                    <h2 className="text-6xl md:text-8xl font-display uppercase tracking-tight leading-none mb-8">
                        Clear <span className="text-primary">Pricing</span>
                    </h2>

                    {/* Toggle */}
                    <div className="relative inline-flex flex-row items-center p-1 bg-card rounded-full border border-border">
                        <button
                            onClick={() => setIsAnnual(false)}
                            className={`relative z-10 px-6 py-3 text-sm font-medium uppercase tracking-widest rounded-full transition-colors ${!isAnnual ? "text-white" : "text-muted"}`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setIsAnnual(true)}
                            className={`relative z-10 px-6 py-3 text-sm font-medium uppercase tracking-widest rounded-full transition-colors ${isAnnual ? "text-white" : "text-muted"}`}
                        >
                            Annual <span className="text-primary ml-1">-20%</span>
                        </button>

                        {/* Sliding Pill */}
                        <motion.div
                            layoutId="pricing-pill"
                            className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#222] rounded-full z-0"
                            initial={false}
                            animate={{ left: isAnnual ? "calc(50% + 2px)" : "4px" }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                    </div>
                </motion.div>

                {/* Pricing Cards */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportRevealEarly}
                    className="flex justify-center"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
                        {packages.map((pkg, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUpVariant}
                                className={`relative flex flex-col p-8 md:p-10 rounded-3xl bg-card border ${pkg.popular ? "border-primary shadow-2xl shadow-primary/10" : "border-border"}`}
                            >
                                {pkg.popular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full">
                                        Most Popular
                                    </div>
                                )}
                                <h3 className="text-2xl font-display uppercase tracking-wider mb-2">{pkg.name}</h3>

                                <div className="my-8 relative h-16">
                                    <motion.div
                                        initial={false}
                                        animate={{ opacity: isAnnual ? 0 : 1, y: isAnnual ? -10 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0"
                                    >
                                        <span className="text-5xl font-medium tracking-tight">{pkg.monthly}</span>
                                        {pkg.monthly !== "Custom" && <span className="text-muted text-sm ml-2">/mo</span>}
                                    </motion.div>
                                    <motion.div
                                        initial={false}
                                        animate={{ opacity: isAnnual ? 1 : 0, y: isAnnual ? 0 : 10 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0"
                                    >
                                        <span className="text-5xl font-medium tracking-tight">{pkg.annual}</span>
                                        {pkg.annual !== "Custom" && <span className="text-muted text-sm ml-2">/yr</span>}
                                    </motion.div>
                                </div>

                                <div className="flex-grow space-y-4 mb-10">
                                    {pkg.features.map((feat, j) => (
                                        <div key={j} className="flex items-center text-muted text-sm">
                                            <svg className="w-5 h-5 text-primary mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feat}
                                        </div>
                                    ))}
                                </div>

                                <Button variant={pkg.popular ? "primary" : "outline"} className="w-full">
                                    {pkg.monthly === "Custom" ? "Contact Us" : "Get Started"}
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
