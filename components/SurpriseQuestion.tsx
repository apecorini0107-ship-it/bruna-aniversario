"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { lineVariant } from "@/lib/motion";

const LINES = [
  "Mas...",
  "A sua surpresa não termina aqui.",
  "Ainda tenho uma coisinha para você...",
];

const JOKES = [
  "Tenta de novo, amor.",
  "Quase... mas não foi essa 😅",
  "Essa opção nem existe de verdade, sabia?",
  "O coraçãozinho ali do lado é bem mais bonito ❤️",
];

export default function SurpriseQuestion({ onYes }: { onYes: () => void }) {
  const [visible, setVisible] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [noClicks, setNoClicks] = useState(0);
  const [showJoke, setShowJoke] = useState(false);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (visible < LINES.length) {
      const t = setTimeout(() => setVisible((v) => v + 1), 1300);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setShowQuestion(true), 900);
      return () => clearTimeout(t);
    }
  }, [visible]);

  useEffect(() => {
    if (showJoke) {
      const t = setTimeout(() => setShowJoke(false), 2200);
      return () => clearTimeout(t);
    }
  }, [showJoke]);

  const handleNo = () => {
    setNoClicks((c) => c + 1);
    setShowJoke(true);
    const range = 46;
    setNoOffset({
      x: Math.round((Math.random() - 0.5) * range * 2),
      y: Math.round((Math.random() - 0.5) * (range * 0.6)),
    });
  };

  const noScale = Math.max(0.72, 1 - noClicks * 0.045);
  const joke = JOKES[Math.min(noClicks - 1, JOKES.length - 1)] ?? JOKES[0];

  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex max-w-sm flex-col gap-5">
        {LINES.map((line, i) => (
          <motion.p
            key={line}
            variants={lineVariant}
            initial="hidden"
            animate={visible > i ? "visible" : "hidden"}
            className="font-serif text-2xl italic text-bordeaux-dark"
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={showQuestion ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 flex flex-col items-center gap-8"
        style={{ pointerEvents: showQuestion ? "auto" : "none" }}
      >
        <p className="max-w-xs font-serif text-2xl text-deepred">
          Você quer descobrir a sua surpresa?
        </p>

        <div className="relative flex h-24 w-full items-center justify-center gap-5">
          <motion.button
            suppressHydrationWarning
            onClick={onYes}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ scale: { duration: 2.2, repeat: Infinity, ease: "easeInOut" } }}
            className="z-10 flex items-center gap-2 rounded-full bg-bordeaux px-7 py-3 text-sm font-semibold text-cream shadow-glow"
          >
            SIM <Heart className="h-4 w-4" fill="currentColor" strokeWidth={0} />
          </motion.button>

          <motion.button
            onClick={handleNo}
            animate={{
              x: noOffset.x,
              y: noOffset.y,
              scale: noScale,
              rotate: noClicks % 2 === 0 ? 0 : -3,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 12 }}
            className="rounded-full border border-bordeaux/25 bg-white/40 px-6 py-3 text-sm font-medium text-bordeaux-dark/80 backdrop-blur-sm"
          >
            Não
          </motion.button>

          <AnimatePresence>
            {showJoke && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                className="glass absolute top-full mt-4 w-[260px] rounded-2xl px-5 py-3 text-sm text-bordeaux-dark shadow-soft"
              >
                <p className="font-medium">Ops... resposta errada 😂❤️</p>
                <p className="mt-1 text-bordeaux-dark/80">{joke}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
