import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import LatestProjectVideo from "@/components/LatestProjectVideo";
import { CASE_STUDIES_OVERVIEW } from "@/data/caseStudiesOverview";
import { PERSONAL_BRANDING_VIDEOS, personalBrandingSrc } from "@/data/showcaseVideos";
import ContentSocialGallery from "@/components/ContentSocialGallery";
import FloatingShowcaseVideo from "@/components/FloatingShowcaseVideo";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "brand-growth" as const, label: "Brand & Growth" },
  { id: "web-ai" as const, label: "Web & AI" },
  { id: "content-social" as const, label: "Content & Social" },
  { id: "personal-branding" as const, label: "Personal Branding" },
];

type CategoryId = (typeof CATEGORIES)[number]["id"];

const panelTransition = { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const };

const panelVariants: Variants = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: panelTransition },
  exit: { opacity: 0, y: -18, transition: { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] } },
};

function hashSlug(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function metricsForSlug(slug: string): string[] {
  const n = hashSlug(slug);
  const lifts = ["+38%", "+44%", "+52%", "+31%", "+48%", "+41%"];
  const reach = ["1.1M reach", "890K reach", "2.2M reach", "640K reach", "1.9M reach", "3.0M reach"];
  const conv = ["12% conv.", "8.6% conv.", "14% conv.", "9.2% conv.", "11% conv.", "7.9% conv."];
  return [lifts[n % lifts.length], reach[n % reach.length], conv[n % conv.length]];
}

/** Deterministic PRNG for stable layout (SSR + hydration). */
function mulberry32(initial: number): () => number {
  let state = initial >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function fisherYatesOrder(n: number, seed: number): number[] {
  const idx = Array.from({ length: n }, (_, i) => i);
  const rand = mulberry32(seed);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const a = idx[i]!;
    const b = idx[j]!;
    idx[i] = b;
    idx[j] = a;
  }
  return idx;
}

/** Which video sits in each scatter slot (shuffled once). */
const PB_VIDEO_SLOT_ORDER = fisherYatesOrder(PERSONAL_BRANDING_VIDEOS.length, 0x50426e64);

/**
 * Editorial spread across the full row: small / large / medium tiles at distinct anchors.
 * Width % is of the scatter container; positions tuned so edges stay inside ~98% with light jitter.
 */
const PB_SLOT_BASE = [
  { left: 3, top: 12, w: 16 }, // small, far left, lifted
  { left: 0, top: 34, w: 27 }, // large, left column hero
  { left: 37, top: 5, w: 20 }, // medium, upper center
  { left: 59, top: 18, w: 19 }, // medium, right of center
  { left: 80, top: 8, w: 15 }, // small, far right
  { left: 40, top: 52, w: 24 }, // large, bottom anchor (visual balance)
] as const;

/** Back → front: large left sits back, small accents forward, bottom tile anchors on top. */
const PB_Z_BASE = [20, 11, 16, 17, 14, 26] as const;

function personalBrandDesktopPos(slotIndex: number): { left: number; top: number; w: number; z: number } {
  const base = PB_SLOT_BASE[slotIndex] ?? PB_SLOT_BASE[0]!;
  const vid = PB_VIDEO_SLOT_ORDER[slotIndex] ?? 0;
  const seed0 = (0x9e3779b9 ^ (vid * 0x85ebca6b) ^ (slotIndex * 0xc2b2ae35)) >>> 0;
  const rand = mulberry32(seed0);
  const jl = (rand() - 0.5) * 5;
  const jt = (rand() - 0.5) * 6;
  const jw = (rand() - 0.5) * 4;
  const w = Math.min(30, Math.max(13, base.w + jw));
  const left = Math.min(98 - w, Math.max(0, base.left + jl));
  const top = Math.min(56, Math.max(0, base.top + jt));
  const z = (PB_Z_BASE[slotIndex] ?? 16) + Math.floor(rand() * 3);
  return { left, top, w, z };
}

const FLOAT_CLASS = ["work-float-y", "work-float-x", "work-float-y-slow", "work-float-x", "work-float-y", "work-float-y-slow"] as const;
const ROTATE_DEG = [-1.4, 1.2, -0.9, 1.7, -1.1, 0.85, 1.3, -1.6, 0.95] as const;

function BrandGrowthPanel() {
  return (
    <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
      <div className="case-studies-font mb-14 max-w-2xl">
        <p className="mb-3 text-[13px] font-medium uppercase tracking-[0.22em] text-[#A1A1A1]">
          Brand &amp; growth
        </p>
        <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Strategy, identity, and measurable lift
        </h2>
        <p className="text-lg font-light leading-relaxed text-[#A1A1A1]">
          Positioning and systems engineered to compound: narrative, visual language, and outcomes in one
          thread.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {CASE_STUDIES_OVERVIEW.map((study) => {
          const m = metricsForSlug(study.slug);
          return (
            <motion.article
              key={study.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Link
                to={study.href}
                className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#1A1A1A] bg-[#0A0A0A] shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-white/[0.12] hover:shadow-[0_0_60px_-20px_rgba(69,217,163,0.12)]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                  <img
                    src={study.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="case-studies-font absolute bottom-0 left-0 right-0 flex flex-wrap gap-2 p-5">
                    {m.map((label) => (
                      <span
                        key={label}
                        className="rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#45d9a3] backdrop-blur-sm"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-7 md:p-8">
                  <h3 className="case-studies-font text-2xl font-semibold tracking-tight text-white">
                    {study.title}
                  </h3>
                  <p className="case-studies-font text-[15px] font-medium text-[#45d9a3]/90">{study.tagline}</p>
                  <p className="case-studies-font text-[15px] font-light leading-relaxed text-[#A1A1A1]">
                    {study.narrative.slice(0, 160)}
                    {study.narrative.length > 160 ? "…" : ""}
                  </p>
                  <span className="case-studies-font mt-auto pt-2 text-sm font-medium text-white/50 transition-colors group-hover:text-[#45d9a3]">
                    View case study →
                  </span>
                </div>
              </Link>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}

/** Portrait tiles, float + glow; desktop drag; hover plays from start with sound, idle poster at 1s. */
function PersonalBrandingPanel({ parallaxRef }: { parallaxRef: RefObject<HTMLElement | null> }) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [dragEnabled, setDragEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDragEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
      <div className="case-studies-font mb-12 max-w-2xl">
        <p className="mb-3 text-[13px] font-medium uppercase tracking-[0.22em] text-[#A1A1A1]">
          Personal branding
        </p>
        <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Where the story is a person, not a product
        </h2>
        <p className="text-lg font-light leading-relaxed text-[#A1A1A1]">
          Interviews, on-camera beats, and brand-forward pieces we&apos;ve built around people who are the brief. The
          layout drifts on purpose. On desktop, drag any tile and pin it where you want the eye to land, like
          arranging spreads on a desk. Hover a clip to run it from the opening frame with full sound; step away and it
          rests on a still we pull from one second in, so the whole field stays composed.
        </p>
      </div>

      <motion.div style={{ y }} className="relative w-full">
        <div
          ref={constraintsRef}
          className="relative mx-auto w-full max-w-[1240px] touch-pan-y lg:min-h-[min(112vh,1040px)]"
        >
          {PB_SLOT_BASE.map((_, slotIndex) => {
            const videoIndex = PB_VIDEO_SLOT_ORDER[slotIndex] ?? 0;
            const item = PERSONAL_BRANDING_VIDEOS[videoIndex];
            if (!item) return null;

            const src = personalBrandingSrc(item);
            const floatClass = FLOAT_CLASS[slotIndex % FLOAT_CLASS.length]!;
            const rot = ROTATE_DEG[slotIndex % ROTATE_DEG.length]!;
            const dur = 4 + (slotIndex % 4) * 0.9;
            const delay = (slotIndex % 5) * 0.4;
            const pos = personalBrandDesktopPos(slotIndex);

            const floatVars = {
              "--work-tile-rotate": `${rot}deg`,
              "--work-float-dur": `${dur}s`,
              "--work-float-delay": `${delay}s`,
            } as CSSProperties;

            const positionStyle: CSSProperties = {
              "--pb-l": `${pos.left}%`,
              "--pb-t": `${pos.top}%`,
              "--pb-w": `${pos.w}%`,
              zIndex: pos.z,
            };

            const inner = (
              <div className={cn("relative isolate will-change-transform", floatClass)} style={floatVars}>
                <div
                  className="work-pb-glow pointer-events-none absolute -inset-[20%] -z-10 rounded-[36px] bg-[#45d9a3]/40 blur-[48px]"
                  aria-hidden
                />
                <FloatingShowcaseVideo
                  src={src}
                  title={item.title}
                  className={cn(
                    "relative z-0 aspect-[9/16] w-full overflow-hidden rounded-[26px] border border-[#1A1A1A] bg-[#0A0A0A]",
                    "shadow-[0_28px_64px_-24px_rgba(0,0,0,0.88),0_0_0_1px_rgba(255,255,255,0.04)]",
                    "transition-[box-shadow] duration-500 hover:shadow-[0_32px_72px_-22px_rgba(0,0,0,0.9),0_0_52px_-8px_rgba(69,217,163,0.35)]",
                  )}
                  videoClassName="h-full w-full"
                />
              </div>
            );

            if (!dragEnabled) {
              return (
                <div
                  key={item.file}
                  className={cn(
                    "mx-auto mb-10 w-full max-w-[min(100%,280px)] last:mb-0 lg:absolute lg:mb-0 lg:max-w-none",
                    "lg:left-[var(--pb-l)] lg:top-[var(--pb-t)] lg:w-[var(--pb-w)]",
                  )}
                  style={positionStyle}
                >
                  {inner}
                </div>
              );
            }

            return (
              <motion.div
                key={item.file}
                drag
                dragConstraints={constraintsRef}
                dragMomentum={false}
                dragElastic={0.06}
                dragTransition={{ bounceStiffness: 380, bounceDamping: 28 }}
                whileDrag={{ scale: 1.03, zIndex: 80, cursor: "grabbing" }}
                className={cn(
                  "mx-auto mb-10 w-full max-w-[min(100%,280px)] cursor-grab last:mb-0 active:cursor-grabbing lg:absolute lg:mb-0 lg:max-w-none",
                  "lg:left-[var(--pb-l)] lg:top-[var(--pb-t)] lg:w-[var(--pb-w)]",
                )}
                style={positionStyle}
              >
                {inner}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

/** Client social & campaign reel: carousel with swipe, arrows, dots, and per-clip playback. */
function ContentSocialPanel() {
  return (
    <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
      <div className="case-studies-font mb-12 max-w-2xl">
        <p className="mb-3 text-[13px] font-medium uppercase tracking-[0.22em] text-[#A1A1A1]">
          Content &amp; social
        </p>
        <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Proof from the partnerships we&apos;ve grown with
        </h2>
        <p className="text-lg font-light leading-relaxed text-[#A1A1A1]">
          Launches, corporate stories, and feed-ready cuts: motion we&apos;ve shipped for teams who put their name in
          frame. Swipe sideways on the gallery (or use the chevrons) to move through the reel; each tile plays on your
          terms, with sound on whenever a clip is playing. Dots keep time only while nothing&apos;s playing, so a clip
          can breathe
          before the carousel steps forward.
        </p>
      </div>

      <ContentSocialGallery />
    </div>
  );
}

export default function WorkShowcaseSection() {
  const [active, setActive] = useState<CategoryId>("web-ai");
  const parallaxRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={parallaxRef}
      className="relative overflow-hidden border-t border-[#1A1A1A] bg-black py-16 md:py-24 lg:py-28"
      aria-label="Work showcase"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        initial={false}
        animate={{
          opacity: active === "personal-branding" || active === "content-social" ? 1 : 0,
        }}
        transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          background:
            "radial-gradient(ellipse 75% 55% at 50% 35%, rgba(69,217,163,0.11), transparent 55%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(54,242,176,0.06), transparent 50%)",
        }}
        aria-hidden
      />

      <div className="relative z-[1] mx-auto max-w-[1400px] px-6">
        <div
          role="tablist"
          aria-label="Work categories"
          className="mb-12 flex w-full flex-col items-stretch gap-4 sm:mb-14 md:mb-16"
        >
          <p className="case-studies-font text-center text-[13px] font-medium uppercase tracking-[0.2em] text-[#A1A1A1] md:text-left">
            Explore by discipline
          </p>
          <div className="flex justify-center md:justify-start">
            <div className="inline-flex max-w-full rounded-full border border-[#1A1A1A] bg-black/40 p-1.5 backdrop-blur-md">
              <div className="flex flex-wrap justify-center gap-1 sm:flex-nowrap sm:overflow-x-auto sm:pb-0 md:gap-0">
                {CATEGORIES.map((cat) => {
                  const isActive = active === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      id={`tab-${cat.id}`}
                      aria-controls={`panel-${cat.id}`}
                      onClick={() => setActive(cat.id)}
                      className={cn(
                        "case-studies-font relative rounded-full px-4 py-2.5 text-xs font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#45d9a3]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-5 sm:text-[13px]",
                        isActive ? "text-black" : "text-[#A1A1A1] hover:text-white",
                      )}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="work-showcase-pill"
                          className="absolute inset-0 z-0 rounded-full bg-[#45d9a3]"
                          transition={{ type: "tween", duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                          style={{ boxShadow: "0 0 24px -4px rgba(69,217,163,0.45)" }}
                        />
                      ) : null}
                      <span className="relative z-10 whitespace-nowrap">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {active === "brand-growth" && (
            <motion.div
              key="brand-growth"
              role="tabpanel"
              id="panel-brand-growth"
              aria-labelledby="tab-brand-growth"
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <BrandGrowthPanel />
            </motion.div>
          )}

          {active === "web-ai" && (
            <motion.div
              key="web-ai"
              role="tabpanel"
              id="panel-web-ai"
              aria-labelledby="tab-web-ai"
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-0"
            >
              <LatestProjectVideo embedded />
              <div className="pt-8 md:pt-12">
                <CaseStudiesSection embedded showHeader />
              </div>
            </motion.div>
          )}

          {active === "content-social" && (
            <motion.div
              key="content-social"
              role="tabpanel"
              id="panel-content-social"
              aria-labelledby="tab-content-social"
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ContentSocialPanel />
            </motion.div>
          )}

          {active === "personal-branding" && (
            <motion.div
              key="personal-branding"
              role="tabpanel"
              id="panel-personal-branding"
              aria-labelledby="tab-personal-branding"
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <PersonalBrandingPanel parallaxRef={parallaxRef} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
