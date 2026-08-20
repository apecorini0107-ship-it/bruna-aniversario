"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import SmartImage from "./SmartImage";

type LightboxProps = {
  images: string[];
  startIndex: number;
  title: string;
  onClose: () => void;
};

export default function Lightbox({ images, startIndex, title, onClose }: LightboxProps) {
  const [index, setIndex] = useState(startIndex);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, []);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) next();
    else if (info.offset.x > 60) prev();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-bordeaux-dark/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex items-center justify-between px-5 py-4 text-cream"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-cream/60">
            {index + 1} / {images.length}
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="rounded-full p-2 text-cream/80 transition-colors hover:bg-white/10 hover:text-cream"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-[70dvh] w-full max-w-lg">
          <AnimatePresence initial={false}>
            <motion.div
              key={images[index]}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center touch-pan-y"
            >
              <SmartImage
                src={images[index]}
                alt={`${title} — foto ${index + 1}`}
                className="max-h-full min-h-[240px] w-full rounded-2xl object-contain shadow-2xl"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Foto anterior"
              className="absolute left-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-cream backdrop-blur-sm transition-colors hover:bg-white/20 sm:left-5"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Próxima foto"
              className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-cream backdrop-blur-sm transition-colors hover:bg-white/20 sm:right-5"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div
          className="flex justify-center gap-2 pb-6"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Ir para foto ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-gold" : "w-1.5 bg-cream/40"
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
