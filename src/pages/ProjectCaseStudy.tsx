import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import CaseStudyVideo from "@/components/CaseStudyVideo";
import { getCaseStudyBySlug } from "@/data/caseStudies";
import {
  defaultEasing,
  fadeUpVariant,
  viewportRevealEarly,
} from "@/lib/motion";

const listReveal = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

const listItem = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: defaultEasing },
  },
};

export default function ProjectCaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 pt-32 text-center text-foreground">
        <p className="mb-6 text-muted">This case study could not be found.</p>
        <Link
          to="/works"
          className="text-sm font-medium uppercase tracking-wider text-[#36f2b0] hover:underline"
        >
          Back to Work
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden bg-black pb-12 pt-28 md:pb-16 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-20%,rgba(54,242,176,0.1),transparent_55%)]" />
        <div className="container relative z-10 mx-auto max-w-[1400px] px-6">
          <nav className="mb-8 text-xs font-medium uppercase tracking-widest text-muted">
            <Link to="/works" className="transition-colors hover:text-[#36f2b0]">
              Work
            </Link>
            <span className="mx-2 text-white/25">/</span>
            <span className="text-white/70">{study.title}</span>
          </nav>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.05 },
              },
            }}
            className="max-w-4xl"
          >
            <motion.p
              variants={fadeUpVariant}
              className="mb-4 text-xs font-bold uppercase tracking-widest text-[#36f2b0]"
            >
              Featured project
            </motion.p>
            <motion.h1
              variants={fadeUpVariant}
              className="mb-4 font-display text-4xl uppercase leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl"
            >
              {study.title}
            </motion.h1>
            <motion.p
              variants={fadeUpVariant}
              className="mb-8 max-w-2xl font-sans text-lg font-light text-[#CACACA] md:text-xl"
            >
              {study.tagline}
            </motion.p>
            <motion.div variants={fadeUpVariant} className="flex flex-wrap gap-4">
              {study.website && (
                <a
                  href={study.website.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:border-[#36f2b0]/40 hover:bg-[#36f2b0]/10"
                >
                  <span className="text-[#36f2b0]">🌐</span>
                  {study.website.label}
                </a>
              )}
              {study.regionNote && (
                <span className="inline-flex items-center rounded-full border border-white/10 px-5 py-2.5 text-sm text-muted">
                  {study.regionNote}
                </span>
              )}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: defaultEasing, delay: 0.15 }}
          className="relative mt-12 w-full md:mt-16"
        >
          <div className="relative mx-auto max-w-[1400px] px-0 md:px-6">
            <div className="relative aspect-[21/9] min-h-[200px] w-full overflow-hidden md:rounded-2xl md:border md:border-[#222]">
              <img
                src={study.heroImage}
                alt={study.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent md:from-black/60" />
              <div
                className="works-grain pointer-events-none absolute inset-0 opacity-[0.2]"
                aria-hidden
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Body */}
      <div className="border-t border-white/5 bg-[#0a0a0a]">
        <div className="container mx-auto max-w-[900px] px-6 py-16 md:py-24">
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={viewportRevealEarly}
            variants={fadeUpVariant}
            className="mb-16 md:mb-20"
          >
            <h2 className="mb-6 font-sans text-xs font-bold uppercase tracking-widest text-muted">
              Overview
            </h2>
            <p className="text-lg leading-relaxed text-[#CACACA] md:text-xl">
              {study.overview}
            </p>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={viewportRevealEarly}
            variants={fadeUpVariant}
            className="mb-16 md:mb-20"
          >
            <h2 className="mb-4 font-sans text-xs font-bold uppercase tracking-widest text-muted">
              Our approach
            </h2>
            <p className="mb-8 text-lg font-medium text-white md:text-xl">{study.approachLead}</p>
            <motion.ul
              variants={listReveal}
              initial="hidden"
              whileInView="visible"
              viewport={viewportRevealEarly}
              className="space-y-4"
            >
              {study.approachPoints.map((point) => (
                <motion.li
                  key={point}
                  variants={listItem}
                  className="border-l-2 border-[#36f2b0]/40 pl-4 text-[#CACACA]"
                >
                  {point}
                </motion.li>
              ))}
            </motion.ul>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={viewportRevealEarly}
            variants={fadeUpVariant}
            className="mb-16 md:mb-20"
          >
            <h2 className="mb-8 font-sans text-xs font-bold uppercase tracking-widest text-muted">
              Key features
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {study.features.map((f) => (
                <li
                  key={f}
                  className="rounded-xl border border-[#222] bg-black/40 px-4 py-3 text-sm text-[#CACACA] transition-colors hover:border-[#36f2b0]/25"
                >
                  <span className="mr-2 text-[#36f2b0]">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </motion.section>

          {study.video && (
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={viewportRevealEarly}
              variants={fadeUpVariant}
              className="mb-16 md:mb-20"
            >
              <h2 className="mb-6 font-sans text-xs font-bold uppercase tracking-widest text-muted">
                Film & motion
              </h2>
              <CaseStudyVideo
                sources={study.video.sources}
                poster={study.video.poster}
                ariaLabel={`${study.title} project video`}
              />
            </motion.section>
          )}

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={viewportRevealEarly}
            variants={fadeUpVariant}
            className="mb-16 md:mb-20"
          >
            <h2 className="mb-6 font-sans text-xs font-bold uppercase tracking-widest text-muted">
              Gallery
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {study.gallery.map((item) => (
                <figure
                  key={item.src}
                  className="group overflow-hidden rounded-xl border border-[#222] bg-black/30"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 mix-blend-soft-light bg-[#36f2b0]/15"
                      aria-hidden
                    />
                    <div
                      className="works-grain pointer-events-none absolute inset-0 opacity-[0.25]"
                      aria-hidden
                    />
                  </div>
                  {(item.caption || item.alt) && (
                    <figcaption className="border-t border-white/5 px-3 py-2 text-xs text-muted">
                      {item.caption ?? item.alt}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={viewportRevealEarly}
            variants={fadeUpVariant}
            className="mb-16 md:mb-20"
          >
            <h2 className="mb-6 font-sans text-xs font-bold uppercase tracking-widest text-muted">
              Result
            </h2>
            <p className="rounded-2xl border border-[#36f2b0]/20 bg-[#36f2b0]/5 px-6 py-6 text-lg leading-relaxed text-white md:text-xl">
              {study.result}
            </p>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={viewportRevealEarly}
            variants={fadeUpVariant}
            className="border-t border-white/10 pt-16"
          >
            <h2 className="mb-6 font-sans text-xs font-bold uppercase tracking-widest text-muted">
              Client review
            </h2>
            <blockquote className="relative pl-6 md:pl-8">
              <div
                className="absolute left-0 top-0 h-full w-1 rounded-full bg-[#36f2b0]"
                aria-hidden
              />
              <p className="mb-6 font-sans text-xl font-light italic leading-relaxed text-white md:text-2xl">
                “{study.review.quote}”
              </p>
              <footer className="text-sm font-medium uppercase tracking-wide text-[#36f2b0]">
                {study.review.attribution}
              </footer>
            </blockquote>
          </motion.section>

          <div className="mt-16 flex flex-wrap justify-between gap-4 border-t border-white/10 pt-12">
            <Link
              to="/works"
              className="text-sm font-medium uppercase tracking-wider text-muted transition-colors hover:text-[#36f2b0]"
            >
              ← All work
            </Link>
            {study.website && (
              <a
                href={study.website.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium uppercase tracking-wider text-[#36f2b0] hover:underline"
              >
                Visit live site →
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
