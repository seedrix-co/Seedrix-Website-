import { useState } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { fadeUpVariant, viewportReveal, staggerContainer } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import PdfModalViewer from "@/components/PdfModalViewer";

export interface PortfolioWorkItem {
  title: string;
  description: string;
  file: string;
  thumbnail?: string;
}

const portfolioWorks: PortfolioWorkItem[] = [
  {
    title: "Seedrix Branding Strategy",
    description: "Complete digital transformation and branding work.",
    file: "/images/pdf/project1.pdf",
  },
  {
    title: "AI Automation Case Study",
    description: "Implementation of AI workflows for a startup.",
    file: "/images/pdf/project2.pdf",
  },
  {
    title: "Technology & Engineering Report",
    description: "Technical architecture and delivery documentation.",
    file: "/images/pdf/project3.pdf",
  },
  {
    title: "EVA Regular 20s",
    description: "Brand and creative project deliverables.",
    file: "/images/pdf/EVA%20Regular%2020s%20converted%20copy%202.pdf",
  },
  {
    title: "McDonald's",
    description: "Strategy and execution case study.",
    file: "/images/pdf/Mcdonalds.pdf",
  },
  {
    title: "IMORICH Brand Guidelines",
    description: "Brand guidelines summary and visual identity.",
    file: "/images/pdf/IMORICH%20Brand%20Guidelines%20Summary%202.pdf",
  },
];

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function PreviousWork() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);

  const openPreview = (file: string) => {
    setSelectedPdfUrl(file);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPdfUrl(null);
  };

  return (
    <>
      <section
        id="previous-work"
        className="py-[var(--spacing-section)] bg-card border-y border-border/50 scroll-mt-20"
      >
        <div className="container mx-auto px-6 max-w-[1400px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportReveal}
            variants={fadeUpVariant}
            className="text-center mb-16"
          >
            <h2 className="text-6xl md:text-8xl font-display uppercase tracking-tight leading-none">
              Previous <br />
              <span className="text-primary">Work</span>
            </h2>
            <p className="text-muted text-sm tracking-widest uppercase font-semibold mt-4">
              Portfolio & case studies
            </p>
          </motion.div>

          <motion.div
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportReveal}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {portfolioWorks.map((item, index) => (
              <motion.article
                key={item.file}
                variants={cardVariants}
                className="group flex flex-col rounded-xl border border-border-light bg-background/50 overflow-hidden hover:border-primary/30 transition-colors duration-300"
              >
                <div
                  className="relative aspect-[4/3] overflow-hidden bg-card border-b border-border-light"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-border-light to-card">
                      <FileText className="h-16 w-16 text-muted/60 mb-2" strokeWidth={1.2} />
                      <span className="text-xs font-medium text-muted/80 uppercase tracking-wider">
                        PDF
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-semibold uppercase tracking-tight text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed flex-1 mb-4">
                    {item.description}
                  </p>
                  <Button
                    variant="outline"
                    size="default"
                    className="w-fit rounded-full"
                    onClick={() => openPreview(item.file)}
                  >
                    Preview
                  </Button>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <PdfModalViewer
        isOpen={modalOpen}
        onClose={closeModal}
        pdfUrl={selectedPdfUrl}
      />
    </>
  );
}
