"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Particle = {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  kind: "heart" | "dot";
  opacity: number;
};

function seededParticles(count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const seed = i * 137.5;
    particles.push({
      id: i,
      left: `${(seed % 100).toFixed(2)}%`,
      size: 8 + ((seed * 3) % 14),
      duration: 10 + ((seed * 1.7) % 10),
      delay: (seed % 8) * 0.6,
      kind: i % 4 === 0 ? "heart" : "dot",
      opacity: 0.08 + ((seed % 10) / 100),
    });
  }
  return particles;
}

export default function Background() {
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();
  const particles = useMemo(() => seededParticles(prefersReduced ? 6 : 16), [prefersReduced]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-cream">
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-blush/70 to-cream-dark" />

      <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-bordeaux-light/20 blur-3xl" />
      <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-blush-dark/30 blur-3xl" />

      {mounted &&
        !prefersReduced &&
        particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute bottom-0"
            style={{
              left: p.left,
              opacity: p.opacity,
            }}
            animate={{
              y: ["0vh", "-110vh"],
              x: [0, p.kind === "heart" ? 12 : -8, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {p.kind === "heart" ? (
              <svg
                width={p.size}
                height={p.size}
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-bordeaux"
              >
                <path d="M12 21s-6.716-4.35-9.428-8.06C.6 10.02 1.1 6.3 4.2 4.68c2.1-1.1 4.4-.5 5.8 1.24C11 4.18 13.3 3.58 15.4 4.68c3.1 1.62 3.6 5.34 1.63 8.26C18.72 16.65 12 21 12 21z" />
              </svg>
            ) : (
              <span
                className="block rounded-full bg-gold"
                style={{ width: p.size * 0.35, height: p.size * 0.35 }}
              />
            )}
          </motion.span>
        ))}
    </div>
  );
}
