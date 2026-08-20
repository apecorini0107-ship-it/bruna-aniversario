"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { lineVariant } from "@/lib/motion";

const LINES = [
  "Só quero viver mais uma aventura com você.",
  "Feliz aniversário, Bruna.",
  "Eu te amo. ❤️",
];

export default function FinalSection() {
  const [visible, setVisible] = useState(0);
  const [heartTaps, setHeartTaps] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [nameBurst, setNameBurst] = useState(false);

  useEffect(() => {
    if (visible < LINES.length) {
      const t = setTimeout(() => setVisible((v) => v + 1), 1400);
      return () => clearTimeout(t);
    }
  }, [visible]);

  useEffect(() => {
    if (heartTaps > 0 && heartTaps % 5 === 0) {
      setShowSecret(true);
      const t = setTimeout(() => setShowSecret(false), 2600);
      return () => clearTimeout(t);
    }
  }, [heartTaps]);

  const handleNameTap = () => {
    setNameBurst(true);
    setTimeout(() => setNameBurst(false), 900);
  };

  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex max-w-sm flex-col gap-6">
        {LINES.map((line, i) => {
          const isName = line.includes("Bruna");
          return (
            <motion.p
              key={line}
              variants={lineVariant}
              initial="hidden"
              animate={visible > i ? "visible" : "hidden"}
              onClick={isName ? handleNameTap : undefined}
              className={`relative font-serif text-2xl italic text-bordeaux-dark ${
                isName ? "cursor-pointer select-none" : ""
              } ${i === LINES.length - 1 ? "text-3xl text-deepred" : ""}`}
            >
              {line}
              <AnimatePresence>
                {isName && nameBurst && (
                  <motion.span
                    initial={{ opacity: 0, y: 0, scale: 0.5 }}
                    animate={{ opacity: 1, y: -30, scale: 1 }}
                    exit={{ opacity: 0, y: -46 }}
                    transition={{ duration: 0.7 }}
                    className="absolute -right-2 top-0 text-lg"
                  >
                    ❤️
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.p>
          );
        })}
      </div>

      <motion.button
        initial={{ opacity: 0, scale: 0.6 }}
        animate={visible >= LINES.length ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => setHeartTaps((t) => t + 1)}
        whileTap={{ scale: 0.85 }}
        aria-label="❤️"
        className="mt-10 flex h-16 w-16 items-center justify-center rounded-full glass shadow-glow"
      >
        <motion.div
          suppressHydrationWarning
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="h-7 w-7 text-bordeaux" fill="currentColor" strokeWidth={0} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {showSecret && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-5 max-w-xs font-serif text-base italic text-deepred"
          >
            Eu te amo mais do que você imagina ❤️
          </motion.p>
        )}
      </AnimatePresence>

      <motion.p
        initial={{ opacity: 0 }}
        animate={visible >= LINES.length ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-14 font-sans text-sm tracking-[0.2em] text-bordeaux-dark/60"
      >
        — ANTHONY
      </motion.p>
    </div>
  );
}
