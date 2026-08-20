"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { lineVariant } from "@/lib/motion";

const LINES = [
  { text: "Então está pronta? ❤️", size: "text-2xl" },
  { text: "O meu presente para você é...", size: "text-xl" },
  { text: "Uma noite especial só para nós dois ✨", size: "text-3xl", accent: true },
  { text: "E o melhor de tudo: você pode escolher.", size: "text-xl" },
  {
    text: "Escolha a aventura que mais combina com a gente. O resto eu organizo. ❤️",
    size: "text-base",
    muted: true,
  },
];

export default function Reveal({ onContinue }: { onContinue: () => void }) {
  const [visible, setVisible] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (visible < LINES.length) {
      const delay = visible === 2 ? 1900 : 1400;
      const t = setTimeout(() => setVisible((v) => v + 1), delay);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setShowButton(true), 600);
      return () => clearTimeout(t);
    }
  }, [visible]);

  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center px-6 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, rotate: -8, scale: 0.7 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8 flex h-16 w-16 items-center justify-center rounded-full glass shadow-glow"
      >
        <Sparkles className="h-7 w-7 text-gold" />
      </motion.div>

      <div className="flex max-w-sm flex-col gap-6">
        {LINES.map((line, i) => (
          <motion.p
            key={line.text}
            variants={lineVariant}
            initial="hidden"
            animate={visible > i ? "visible" : "hidden"}
            className={`font-serif italic ${line.size} ${
              line.accent ? "text-gradient-gold font-semibold" : "text-bordeaux-dark"
            } ${line.muted ? "font-sans text-sm not-italic text-bordeaux-dark/75" : ""}`}
          >
            {line.text}
          </motion.p>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={showButton ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onClick={onContinue}
        whileTap={{ scale: 0.96 }}
        className="mt-12 rounded-full bg-bordeaux px-9 py-3.5 text-sm font-medium tracking-wide text-cream shadow-soft transition-colors hover:bg-bordeaux-dark"
        style={{ pointerEvents: showButton ? "auto" : "none" }}
      >
        Ver as opções
      </motion.button>
    </div>
  );
}
