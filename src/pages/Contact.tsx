import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeUpVariant } from "@/lib/motion";

const SERVICES = [
  "STRATEGY & CONSULTING",
  "TECHNOLOGY & SOFTWARE ENGINEERING",
  "AUTOMATION, AI & DATA",
  "MEDIA, BRAND & DIGITAL GROWTH",
] as const;

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: (formData.get("company") as string) || "",
      service: formData.get("service") as string,
      message: formData.get("message") as string,
    };
    try {
      const res = await fetch("/api/send-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
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
    <main className="min-h-screen bg-background text-foreground flex flex-col pt-32">
      <div className="flex-grow container mx-auto px-4 max-w-2xl pb-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="space-y-10"
        >
          <div>
            <h1 className="text-display text-4xl md:text-5xl mb-4">Contact</h1>
            <p className="text-muted text-lg">
              Ready to build systems that scale? Send an inquiry and we’ll get back to you.
            </p>
          </div>

          <p className="text-muted text-sm">
            Prefer email?{" "}
            <a
              href="mailto:info@seedrix.co"
              className="text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              info@seedrix.co
            </a>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="block text-sm font-medium text-foreground mb-2 uppercase tracking-wide">
                  Name <span className="text-primary">*</span>
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  className="contact-input w-full bg-transparent px-0 py-3 text-foreground uppercase tracking-wide placeholder:text-muted/40 focus:outline-none focus:ring-0 transition-colors"
                  placeholder="YOUR NAME"
                />
              </label>
              <label className="block">
                <span className="block text-sm font-medium text-foreground mb-2 uppercase tracking-wide">
                  Email <span className="text-primary">*</span>
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  className="contact-input w-full bg-transparent px-0 py-3 text-foreground uppercase tracking-wide placeholder:text-muted/40 focus:outline-none focus:ring-0 transition-colors"
                  placeholder="YOU@COMPANY.COM"
                />
              </label>
            </div>

            <label className="block">
              <span className="block text-sm font-medium text-foreground mb-2 uppercase tracking-wide">Company</span>
              <input
                type="text"
                name="company"
                className="contact-input w-full bg-transparent px-0 py-3 text-foreground uppercase tracking-wide placeholder:text-muted/40 focus:outline-none focus:ring-0 transition-colors"
                placeholder="YOUR COMPANY"
              />
            </label>

            <label className="block">
              <span className="block text-sm font-medium text-foreground mb-2 uppercase tracking-wide">
                Service of interest <span className="text-primary">*</span>
              </span>
              <select
                name="service"
                required
                className="contact-input w-full bg-transparent px-0 py-3 text-foreground uppercase tracking-wide focus:outline-none focus:ring-0 transition-colors appearance-none cursor-pointer bg-no-repeat bg-[length:1rem] bg-[right_0_center] pr-8"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                }}
              >
                <option value="">SELECT A SERVICE</option>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="block text-sm font-medium text-foreground mb-2 uppercase tracking-wide">
                Message <span className="text-primary">*</span>
              </span>
              <textarea
                name="message"
                required
                rows={5}
                className="contact-input w-full bg-transparent px-0 py-3 text-foreground uppercase tracking-wide placeholder:text-muted/40 focus:outline-none focus:ring-0 transition-colors resize-y min-h-[120px]"
                placeholder="TELL US ABOUT YOUR PROJECT..."
              />
            </label>

            {status === "sent" && (
              <p className="text-primary text-sm font-medium uppercase tracking-wide">
                Thanks! Your inquiry has been sent. We’ll be in touch soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-500 text-sm uppercase tracking-wide">
                Something went wrong. Please try again or email info@seedrix.co.
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={status === "sending"}
              className="w-full sm:w-auto uppercase tracking-wide"
            >
              {status === "sending" ? "SENDING…" : "SEND INQUIRY"}
            </Button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
