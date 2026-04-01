import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import WorkShowcaseSection from "@/components/WorkShowcaseSection";
import { Button } from "@/components/ui/button";
import { fadeUpVariant, staggerContainer, viewportRevealEarly } from "@/lib/motion";

export default function Works() {
  return (
    <main className="min-h-screen bg-black text-foreground">
      {/* Hero */}
      <section className="relative flex min-h-[70vh] flex-col justify-end overflow-hidden bg-black pb-16 pt-32 md:min-h-[75vh] md:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(54,242,176,0.12),transparent_55%)]" />
        <div className="container relative z-10 mx-auto max-w-[1400px] px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex max-w-4xl flex-col"
          >
            <motion.div
              variants={fadeUpVariant}
              className="mb-6 flex w-fit items-center space-x-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-muted">
                Portfolio
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUpVariant}
              className="mb-6 font-display text-5xl uppercase leading-[1.05] tracking-normal text-white md:text-7xl lg:text-8xl xl:text-[120px]"
            >
              Our <br className="md:hidden" />
              <span className="text-primary">Work</span>
            </motion.h1>

            <motion.p
              variants={fadeUpVariant}
              className="max-w-2xl font-sans text-xl font-light tracking-tight text-[#CACACA] md:text-2xl"
            >
              Selected builds across commerce, travel, platforms, and brand, engineering and
              creative delivery in one flow.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <WorkShowcaseSection />

      <section className="border-t border-[#1a1a1a] bg-[#030303] py-16 md:py-20">
        <div className="container mx-auto max-w-[1400px] px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportRevealEarly}
            variants={fadeUpVariant}
            className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between"
          >
            <p className="max-w-md text-muted">
              Want something similar? Tell us about your product, timeline, and stack, and we’ll map a
              path.
            </p>
            <Link to="/contact" className="inline-flex">
              <Button variant="primary" size="lg" className="uppercase tracking-wide">
                Start a project
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
