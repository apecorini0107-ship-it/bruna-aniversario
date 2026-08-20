"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Trash2 } from "lucide-react";
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

const TRASH_RIGHT = 28;
const TRASH_BOTTOM = 112;
const FLIGHT_DURATION = 1.5;
const TOSS_TOTAL_MS = 1900;

type FlightPath = {
  left: number;
  top: number;
  width: number;
  height: number;
  dx: number;
  dy: number;
};

export default function SurpriseQuestion({ onYes }: { onYes: () => void }) {
  const [visible, setVisible] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [noClicks, setNoClicks] = useState(0);
  const [showJoke, setShowJoke] = useState(false);
  const [tossing, setTossing] = useState(false);
  const [flight, setFlight] = useState<FlightPath | null>(null);
  const naoRef = useRef<HTMLButtonElement>(null);

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
      const t = setTimeout(() => setShowJoke(false), 2600);
      return () => clearTimeout(t);
    }
  }, [showJoke]);

  const handleNo = () => {
    setNoClicks((c) => c + 1);
    setShowJoke(true);

    const rect = naoRef.current?.getBoundingClientRect();
    if (rect) {
      const startCenterX = rect.left + rect.width / 2;
      const startCenterY = rect.top + rect.height / 2;
      const trashX = window.innerWidth - TRASH_RIGHT - 14;
      const trashY = window.innerHeight - TRASH_BOTTOM - 14;
      setFlight({
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        dx: trashX - startCenterX,
        dy: trashY - startCenterY,
      });
    }

    setTossing(true);
    setTimeout(() => setTossing(false), TOSS_TOTAL_MS);
  };

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

          <div className="relative h-[46px] w-[92px]">
            <AnimatePresence>
              {!tossing && (
                <motion.button
                  key="nao-btn"
                  ref={naoRef}
                  onClick={handleNo}
                  initial={{ opacity: 0, scale: 0.5, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.12 } }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center justify-center rounded-full border border-bordeaux/25 bg-white/40 text-sm font-medium text-bordeaux-dark/80 backdrop-blur-sm"
                >
                  Não
                </motion.button>
              )}
            </AnimatePresence>
          </div>

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

      {/* Bin fixed in the screen corner, only visible during the toss */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-40 text-bordeaux-dark/50"
        style={{ right: TRASH_RIGHT, bottom: TRASH_BOTTOM }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={
          tossing
            ? { opacity: [0, 1, 1, 1, 0], scale: [0.5, 1, 1, 1.3, 0.7] }
            : { opacity: 0, scale: 0.5 }
        }
        transition={{
          duration: FLIGHT_DURATION + 0.4,
          times: tossing ? [0, 0.12, 0.75, 0.85, 1] : undefined,
          ease: "easeOut",
        }}
      >
        <Trash2 className="h-9 w-9" />
      </motion.div>

      {/* Flying "Não" clone: travels in a real arc across the screen to the bin */}
      <AnimatePresence>
        {tossing && flight && (
          <motion.div
            aria-hidden
            className="pointer-events-none fixed z-50 flex items-center justify-center rounded-full border border-bordeaux/25 bg-white/70 text-sm font-medium text-bordeaux-dark/80 backdrop-blur-sm"
            style={{
              left: flight.left,
              top: flight.top,
              width: flight.width,
              height: flight.height,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
            animate={{
              x: [0, flight.dx * 0.35, flight.dx],
              y: [0, flight.dy * 0.45 - 160, flight.dy],
              scale: [1, 1.1, 0.15],
              rotate: [0, -16, 380],
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: FLIGHT_DURATION,
              times: [0, 0.55, 1],
              ease: "easeInOut",
            }}
          >
            Não
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
