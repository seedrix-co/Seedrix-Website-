import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// Client-side protections are best-effort; screenshots and dev tools cannot be fully prevented in the browser.

const DEVTOOLS_THRESHOLD = 160;

export interface PdfModalViewerProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string | null;
}

export default function PdfModalViewer({ isOpen, onClose, pdfUrl }: PdfModalViewerProps) {
  const [devToolsOpen, setDevToolsOpen] = useState(false);
  const [pdfAvailable, setPdfAvailable] = useState<boolean | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const ctrl = e.ctrlKey || e.metaKey;
      if (e.key === "Escape") {
        onClose();
        e.preventDefault();
        return;
      }
      if (ctrl && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        return;
      }
      if (ctrl && (e.key === "p" || e.key === "P")) {
        e.preventDefault();
        return;
      }
      if (ctrl && e.shiftKey && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        return;
      }
      if (isMac && e.shiftKey && (e.key === "3" || e.key === "4" || e.key === "5")) {
        e.preventDefault();
        return;
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const check = () => {
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;
      setDevToolsOpen(widthDiff > DEVTOOLS_THRESHOLD || heightDiff > DEVTOOLS_THRESHOLD);
    };
    check();
    const t = setInterval(check, 1000);
    return () => clearInterval(t);
  }, [isOpen]);

  // Check if PDF exists before loading iframe; show friendly message on 404
  useEffect(() => {
    if (!isOpen || !pdfUrl) {
      setPdfAvailable(null);
      return;
    }
    setPdfAvailable(null);
    fetch(pdfUrl, { method: "HEAD" })
      .then((res) => setPdfAvailable(res.ok))
      .catch(() => setPdfAvailable(false));
  }, [isOpen, pdfUrl]);

  return (
    <AnimatePresence>
      {isOpen && (
      <motion.div
        key="pdf-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
        onClick={onClose}
        onContextMenu={(e) => e.preventDefault()}
        style={{ userSelect: "none" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex h-[90vh] w-full max-w-4xl flex-col rounded-xl border border-border-light bg-card overflow-hidden select-none"
          onClick={(e) => e.stopPropagation()}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-border-light px-4 py-3">
            <span className="text-sm font-medium text-muted">PDF Preview</span>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-foreground hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative flex-1 min-h-0 flex flex-col items-center justify-center min-h-[200px]">
            {pdfUrl && pdfAvailable === true && (
              <>
                <iframe
                  title="PDF document"
                  src={`${pdfUrl}#toolbar=0`}
                  className="absolute inset-0 h-full w-full border-0"
                  draggable={false}
                />
                <div
                  className="pointer-events-none absolute inset-0 z-10"
                  aria-hidden
                />
              </>
            )}
            {pdfUrl && pdfAvailable === false && (
              <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
                <p className="text-2xl font-display font-semibold text-foreground">Document not available</p>
                <p className="text-muted text-sm max-w-sm">
                  The requested PDF could not be found. It may not have been uploaded yet.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-black hover:bg-primary/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                >
                  Close
                </button>
              </div>
            )}
            {pdfUrl && pdfAvailable === null && (
              <p className="text-muted text-sm">Loading…</p>
            )}

            {devToolsOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 backdrop-blur-xl"
              >
                <p className="text-center text-muted text-sm px-4">
                  Please close developer tools to view the document.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
