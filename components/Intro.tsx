"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";
import { lineVariant } from "@/lib/motion";

const LINES = [
  "Feliz aniversário, meu amor ❤️",
  "Hoje é o seu dia...",
  "Obrigado por ser a melhor namorada que alguém poderia desejar.",
  "Por deixar meus dias mais felizes, por todos os nossos momentos juntos e simplesmente por ser você.",
  "Eu te amo ❤️",
];

export default function Intro({ onContinue }: { onContinue: () => void }) {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (visible <= LINES.length) {
      const delay = visible === 0 ? 900 : 1500;
      const t = setTimeout(() => setVisible((v) => v + 1), delay);
      return () => clearTimeout(t);
    }
  }, [visible]);

  useEffect(() => {
    if (visible >= LINES.length) {
      const t = setTimeout(() => setShowButton(true), 700);
      return () => clearTimeout(t);
    }
  }, [visible]);

  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center px-6 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8 flex h-20 w-20 items-center justify-center rounded-full glass shadow-glow"
      >
        <motion.div
          suppressHydrationWarning
          animate={prefersReduced ? {} : { scale: [1, 1.15, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="h-9 w-9 text-bordeaux" fill="currentColor" strokeWidth={0} />
        </motion.div>
      </motion.div>

      <div className="flex max-w-sm flex-col gap-5">
        {LINES.map((line, i) => (
          <motion.p
            key={line}
            variants={lineVariant}
            initial="hidden"
            animate={visible > i ? "visible" : "hidden"}
            className={
              i === 0
                ? "font-serif text-3xl italic text-bordeaux-dark"
                : i === LINES.length - 1
                ? "font-serif text-2xl italic text-deepred"
                : "font-sans text-base leading-relaxed text-bordeaux-dark/90"
            }
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={showButton ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onClick={onContinue}
        whileTap={{ scale: 0.96 }}
        className="mt-12 rounded-full bg-bordeaux px-9 py-3.5 text-sm font-medium tracking-wide text-cream shadow-soft transition-colors hover:bg-bordeaux-dark disabled:pointer-events-none"
        style={{ pointerEvents: showButton ? "auto" : "none" }}
      >
        Continuar
      </motion.button>
    </div>
  );
}
