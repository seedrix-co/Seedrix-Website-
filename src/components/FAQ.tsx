import { motion } from "framer-motion";
import { fadeUpVariant, viewportReveal } from "@/lib/motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
    const faqs = [
        {
            q: "What is your typical project timeline?",
            a: "Our typical timeline ranges from 4 to 8 weeks depending on the complexity of the project, number of pages, and specific functionality requirements.",
        },
        {
            q: "Do you offer post-launch support?",
            a: "Yes, we offer ongoing maintenance and support packages to ensure your website remains secure, fast, and up-to-date.",
        },
        {
            q: "What technologies do you use?",
            a: "We specialize in modern web technologies including Next.js, Framer Motion for animations, Tailwind CSS for styling, and headless CMS solutions.",
        },
        {
            q: "Can you help with branding and logo design?",
            a: "Absolutely. Our design team can create a cohesive brand identity from scratch or evolve your existing visual language.",
        }
    ];

    return (
        <section className="py-[var(--spacing-section)] bg-background">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial="hidden" whileInView="visible" viewport={viewportReveal} variants={fadeUpVariant}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tight">
                        Frequently Asked <br /><span className="text-primary">Questions</span>
                    </h2>
                </motion.div>

                <motion.div
                    initial="hidden" whileInView="visible" viewport={viewportReveal} variants={fadeUpVariant}
                >
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`item-${i}`}>
                                <AccordionTrigger className="text-xl md:text-2xl font-display tracking-wider text-left">
                                    {faq.q}
                                </AccordionTrigger>
                                <AccordionContent className="text-base md:text-lg leading-relaxed max-w-2xl">
                                    {faq.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
}
