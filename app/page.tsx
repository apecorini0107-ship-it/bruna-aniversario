"use client";

import { useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Background from "@/components/Background";
import Intro from "@/components/Intro";
import SurpriseQuestion from "@/components/SurpriseQuestion";
import Reveal from "@/components/Reveal";
import OptionsGrid from "@/components/OptionsGrid";
import FinalSection from "@/components/FinalSection";
import { screenVariants } from "@/lib/motion";

type Step = "intro" | "question" | "reveal" | "options" | "final";

export default function Home() {
  const [step, setStep] = useState<Step>("intro");

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative flex min-h-[100dvh] w-full flex-col">
        <Background />

        <AnimatePresence>
          {step === "intro" && (
            <motion.div
              key="intro"
              variants={screenVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Intro onContinue={() => setStep("question")} />
            </motion.div>
          )}

          {step === "question" && (
            <motion.div
              key="question"
              variants={screenVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <SurpriseQuestion onYes={() => setStep("reveal")} />
            </motion.div>
          )}

          {step === "reveal" && (
            <motion.div
              key="reveal"
              variants={screenVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Reveal onContinue={() => setStep("options")} />
            </motion.div>
          )}

          {step === "options" && (
            <motion.div
              key="options"
              variants={screenVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <OptionsGrid onContinue={() => setStep("final")} />
            </motion.div>
          )}

          {step === "final" && (
            <motion.div
              key="final"
              variants={screenVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <FinalSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </MotionConfig>
  );
}
