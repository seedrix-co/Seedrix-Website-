import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CASE_STUDIES_OVERVIEW } from "@/data/caseStudiesOverview";
import { defaultEasing, viewportRevealEarly } from "@/lib/motion";

const sectionEase = [0.25, 0.1, 0.25, 1] as const;

const headerVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: sectionEase },
  },
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: defaultEasing },
  },
};

function TestimonialAvatar({
  seed,
  name,
  avatarUrl,
}: {
  seed: string;
  name: string;
  avatarUrl?: string;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const src =
    avatarUrl ?? `https://i.pravatar.cc/128?u=${encodeURIComponent(seed)}`;
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-white/[0.12] bg-zinc-900 ring-2 ring-black">
      {imgFailed ? (
        <div className="case-studies-font flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-600 to-zinc-900 text-sm font-semibold tracking-tight text-white/90">
          {initials || "?"}
        </div>
      ) : (
        <img
          src={src}
          alt={avatarUrl ? name : ""}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          onError={() => setImgFailed(true)}
        />
      )}
    </div>
  );
}

type CaseStudiesSectionProps = {
  /** When true, renders a div wrapper instead of a full section (for Work showcase tabs). */
  embedded?: boolean;
  showHeader?: boolean;
};

export default function CaseStudiesSection({
  embedded = false,
  showHeader = true,
}: CaseStudiesSectionProps = {}) {
  const inner = (
    <>
      {showHeader ? (
        <motion.div
          className="mx-auto mb-20 max-w-3xl text-center md:mb-24 lg:mb-28"
          initial="hidden"
          whileInView="visible"
          viewport={viewportRevealEarly}
          variants={headerVariants}
        >
          <p
            id="case-studies-heading"
            className="case-studies-font mb-5 text-[13px] font-medium uppercase tracking-[0.22em] text-white/45"
          >
            Case studies
          </p>
          <h2 className="case-studies-font mb-6 text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
            Our work speaks in results
          </h2>
          <p className="case-studies-font text-lg font-light leading-relaxed text-white/55 md:text-xl md:leading-relaxed">
            We design systems.{" "}
            <span className="text-white/80">Not just websites.</span>
          </p>
        </motion.div>
      ) : null}

      <motion.div
          className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-9 xl:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ ...viewportRevealEarly, margin: "-40px" }}
          variants={gridVariants}
        >
          {CASE_STUDIES_OVERVIEW.map((study) => (
            <motion.article key={study.slug} variants={cardVariants}>
              <Link
                to={study.href}
                className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#1a1a1a] bg-[#050505]/80 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-[20px] transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1 hover:scale-[1.02] hover:border-white/[0.12] hover:shadow-[0_0_0_1px_rgba(69,217,163,0.12),0_32px_80px_-24px_rgba(0,0,0,0.85),0_0_60px_-20px_rgba(69,217,163,0.08)]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0a0a0a]">
                  <img
                    src={study.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-[480ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.06]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10"
                    aria-hidden
                  />
                </div>

                <div className="flex flex-1 flex-col gap-6 p-7 md:p-8 lg:p-9">
                  <div>
                    <h3 className="case-studies-font mb-2 text-2xl font-semibold tracking-tight text-white md:text-[1.65rem] md:leading-snug">
                      {study.title}
                    </h3>
                    <p className="case-studies-font text-[15px] font-medium leading-snug text-[#45d9a3]/90">
                      {study.tagline}
                    </p>
                  </div>

                  <p className="case-studies-font text-[15px] font-light leading-[1.65] text-white/50">
                    {study.narrative}
                  </p>

                  <div>
                    <p className="case-studies-font mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">
                      What we did
                    </p>
                    <ul className="case-studies-font space-y-2.5 text-[14px] leading-snug text-white/65">
                      {study.whatWeDid.map((item) => (
                        <li key={item} className="flex gap-2.5">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#45d9a3]/70" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="case-studies-font border-t border-white/[0.06] pt-5 text-[14px] font-normal leading-relaxed text-white/45">
                    {study.experience}
                  </p>

                  <div className="mt-auto border-t border-white/[0.08] pt-6">
                    <div className="mb-4 flex items-center gap-4">
                      <TestimonialAvatar
                        seed={study.testimonial.avatarSeed}
                        name={study.testimonial.name}
                        avatarUrl={study.testimonial.avatarUrl}
                      />
                      <div className="min-w-0">
                        <p className="case-studies-font truncate text-[15px] font-semibold text-white">
                          {study.testimonial.name}
                        </p>
                        <p className="case-studies-font text-[13px] text-white/40">
                          {study.testimonial.role}
                        </p>
                      </div>
                    </div>
                    <blockquote className="case-studies-font text-[15px] font-light italic leading-relaxed text-white/55">
                      “{study.testimonial.quote}”
                    </blockquote>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
    </>
  );

  if (embedded) {
    return (
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-10">{inner}</div>
    );
  }

  return (
    <section
      className="border-t border-[#1a1a1a] bg-black py-24 md:py-32 lg:py-40"
      aria-labelledby="case-studies-heading"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">{inner}</div>
    </section>
  );
}
