import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  viewportReveal,
  fadeUpVariant,
  staggerContainer,
} from "@/lib/motion";
const VALUES = [
  { num: "01", label: "Discipline" },
  { num: "02", label: "Documentation" },
  { num: "03", label: "Predictable delivery" },
  { num: "04", label: "Long-term value" },
];

const TEAM = [
  { image: "/Team/23.webp", name: "Team Member", role: "Strategy & Leadership" },
  { image: "/Team/24.webp", name: "Team Member", role: "Technology & Engineering" },
  { image: "/Team/25.webp", name: "Team Member", role: "Design & Growth" },
];

const processReveal = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const valuesStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

export default function About() {
  const processRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: processRef,
    offset: ["start end", "end start"],
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero — dark background, no LaserFlow (home only) */}
      <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-[var(--spacing-section)] overflow-hidden bg-black">
        <div className="container mx-auto px-6 max-w-[1400px] z-10 relative">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col max-w-4xl"
          >
            <motion.div
              variants={fadeUpVariant}
              className="mb-6 flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm w-fit"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-muted">
                Who We Are
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUpVariant}
              className="text-6xl md:text-8xl lg:text-[120px] xl:text-[140px] font-display uppercase leading-none tracking-normal mb-6 text-white"
            >
              Built to <br className="hidden md:block" />
              <span className="text-primary">Deliver</span>
            </motion.h1>

            <motion.p
              variants={fadeUpVariant}
              className="text-2xl md:text-3xl lg:text-4xl font-sans font-light text-foreground tracking-tight mb-8"
            >
              Clarity, Structure, and Scale
            </motion.p>

            <motion.p
              variants={fadeUpVariant}
              className="text-muted text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl font-light"
            >
              We operate as a systems-led partner. Governance, documentation,
              and predictable delivery are at the core of how we work.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Our Story — Services-style header + body */}
      <section className="py-[var(--spacing-section)] bg-background">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 lg:mb-20 gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportReveal}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-[7vw] leading-[1.1] font-sans uppercase tracking-tight flex flex-wrap gap-x-4 lg:gap-x-6 max-w-[85%]"
            >
              <span>OUR</span> <span className="text-primary">STORY</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportReveal}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted text-sm md:text-base tracking-widest uppercase font-semibold pb-4"
            >
              (ABOUT)
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportReveal}
            variants={staggerContainer}
            className="max-w-3xl border-t border-border-light pt-12"
          >
            <motion.p
              variants={fadeUpVariant}
              className="text-muted text-lg md:text-xl lg:text-2xl leading-relaxed mb-6 font-light"
            >
              SEEDRIX was founded on the belief that sustainable digital
              transformation requires systems, not shortcuts. We focus on
              strategy-led engagements, documented execution, and long-term
              partnerships.
            </motion.p>
            <motion.p
              variants={fadeUpVariant}
              className="text-muted text-lg md:text-xl lg:text-2xl leading-relaxed font-light"
            >
              We work with organizations that value structure: clear scope,
              transparent pricing, and outcomes tied to business goals. Our
              clients span real estate, healthcare, retail, professional
              services, logistics, and funded startups.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission — Process/FAQ-style big title + cards */}
      <section className="py-[var(--spacing-section)] bg-card border-y border-border/50">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "80px" }}
            variants={processReveal}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-8xl font-display uppercase tracking-tight leading-none">
              Vision & <br />
              <span className="text-primary">Mission</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportReveal}
              variants={fadeUpVariant}
              transition={{ duration: 0.8 }}
              className="group relative border border-border-light rounded-2xl bg-background/50 p-8 lg:p-10 hover:border-primary/30 transition-colors duration-500"
            >
              <span className="text-4xl font-display text-border-light group-hover:text-primary transition-colors duration-300">
                01
              </span>
              <div className="h-px bg-border-light w-full mt-4 mb-6 group-hover:bg-primary/50 transition-colors duration-300" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
                Vision
              </h3>
              <p className="text-foreground text-base md:text-lg lg:text-xl leading-relaxed font-light">
                To be the partner of choice for organizations that want digital
                systems built for governance, scale, and long-term value.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportReveal}
              variants={fadeUpVariant}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="group relative border border-border-light rounded-2xl bg-background/50 p-8 lg:p-10 hover:border-primary/30 transition-colors duration-500"
            >
              <span className="text-4xl font-display text-border-light group-hover:text-primary transition-colors duration-300">
                02
              </span>
              <div className="h-px bg-border-light w-full mt-4 mb-6 group-hover:bg-primary/50 transition-colors duration-300" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
                Mission
              </h3>
              <p className="text-foreground text-base md:text-lg lg:text-xl leading-relaxed font-light">
                To deliver strategy-led digital transformation through
                disciplined execution, documentation, and retainer-based
                partnerships.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values — Process-style steps with parallax */}
      <section
        ref={processRef}
        className="py-[var(--spacing-section)] bg-background"
      >
        <div className="container mx-auto px-6 max-w-[1400px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "80px" }}
            variants={processReveal}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-8xl font-display uppercase tracking-tight leading-none">
              Our <br />
              <span className="text-primary">Values</span>
            </h2>
          </motion.div>

          <motion.div
            variants={valuesStagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportReveal}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
          >
            {VALUES.map((item, i) => (
              <ValueCard
                key={item.label}
                item={item}
                index={i}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-[var(--spacing-section)] bg-card border-y border-border/50">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportReveal}
              className="text-4xl md:text-5xl lg:text-[7vw] leading-[1.1] font-sans uppercase tracking-tight"
            >
              <span className="text-primary">Team</span>
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={viewportReveal}
              variants={fadeUpVariant}
              className="text-muted text-lg md:text-xl max-w-xl font-light leading-relaxed"
            >
              Strategy, technology, and execution — built for structure and
              scale.
            </motion.p>
          </div>

          <motion.div
            variants={valuesStagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportReveal}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
          >
            {TEAM.map((member, i) => (
              <motion.article
                key={member.image}
                variants={fadeUpVariant}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border-light bg-background/50 hover:border-primary/30 transition-colors duration-500"
              >
                <div className="aspect-[3/4] relative overflow-hidden bg-border-light">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 lg:p-8 flex flex-col gap-2">
                  <span className="text-foreground text-xl font-display uppercase tracking-wider group-hover:text-primary transition-colors duration-300">
                    {member.name}
                  </span>
                  <span className="text-muted text-sm font-medium uppercase tracking-widest">
                    {member.role}
                  </span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Location — CTA-style strip */}
      <section className="relative py-[var(--spacing-section)] overflow-hidden bg-black text-white">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background to-black/90" />
        <div className="container mx-auto px-6 max-w-[1400px] relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportReveal}
            className="text-xs font-bold uppercase tracking-widest text-muted"
          >
            Location
          </motion.span>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportReveal}
            className="text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-tight text-white"
          >
            Dubai, <span className="text-primary">UAE</span>
          </motion.p>
        </div>
      </section>
    </main>
  );
}

function ValueCard({
  item,
  index,
  scrollYProgress,
}: {
  item: (typeof VALUES)[0];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const y = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [(index - 2) * 24, 0, 0, (index - 2) * -24]
  );

  return (
    <motion.div
      variants={processReveal}
      style={{ y }}
      className="group flex flex-col space-y-4 cursor-default border border-border-light rounded-2xl p-6 lg:p-8 hover:border-primary/30 transition-colors duration-500"
    >
      <div className="text-4xl font-display text-border-light group-hover:text-primary transition-colors duration-300">
        {item.num}
      </div>
      <div className="h-px bg-border-light w-full group-hover:bg-primary/50 transition-colors duration-300" />
      <p className="text-foreground text-xl font-display uppercase tracking-wider font-normal group-hover:text-primary transition-colors duration-300">
        {item.label}
      </p>
    </motion.div>
  );
}
