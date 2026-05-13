import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { AssetImage } from "@/components/shared/AssetImage";

interface LightboxProps {
  open: boolean;
  src: string | null;
  alt?: string;
  caption?: string;
  onClose: () => void;
}

export function Lightbox({ open, src, alt, caption, onClose }: LightboxProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && src && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={onClose}
          className="fixed inset-0 z-[9000] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl sm:p-10"
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot preview"
        >
          <motion.div
            initial={{ y: 30, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-card shadow-[0_40px_120px_-20px_rgba(0,0,0,0.6)]">
              <AssetImage src={src} alt={alt ?? "Screenshot"} className="h-auto w-full" />
            </div>
            {caption && (
              <p className="mt-4 text-center font-mono text-xs uppercase tracking-[0.18em] text-white/70">
                {caption}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
