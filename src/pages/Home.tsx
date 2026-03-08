import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import WorksShowcase from "@/components/WorksShowcase";
import LogoLoop from "@/components/LogoLoop";
import Testimonial from "@/components/Testimonial";
import Services from "@/components/Services";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

export default function Home() {
  const location = useLocation();

  // When nav "Works" is clicked (/#work), scroll to Our projects section. Run after paint so layout is ready.
  useEffect(() => {
    if (location.hash !== "#work") return;
    const el = document.getElementById("work");
    if (!el) return;
    const timeoutId = window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    return () => window.clearTimeout(timeoutId);
  }, [location.pathname, location.hash]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <Introduction />
      <section id="work" className="scroll-mt-20">
        <WorksShowcase />
      </section>
      <Testimonial />
      <Services />
      <LogoLoop />
      <Process />
      <FAQ />
      <CTA />
    </main>
  );
}
