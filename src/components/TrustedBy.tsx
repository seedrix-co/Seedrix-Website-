import { motion } from "framer-motion";
import { fadeUpVariant, viewportReveal } from "@/lib/motion";

export default function TrustedBy() {
    // Placeholder logos logic
    const logos = Array.from({ length: 6 }).map((_, i) => `Logo ${i + 1}`);

    return (
        <section className="py-16 border-y border-border/50 bg-background/50">
            <div className="container mx-auto px-6 max-w-[1400px]">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportReveal}
                    variants={fadeUpVariant}
                    className="flex flex-col items-center space-y-8"
                >
                    <p className="text-sm font-medium uppercase tracking-widest text-muted text-center">
                        Trusted by forward-thinking companies
                    </p>

                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {logos.map((logo, index) => (
                            <div key={index} className="text-2xl font-display uppercase tracking-widest text-[#4A4A4A] hover:text-white transition-colors duration-300">
                                {logo}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
