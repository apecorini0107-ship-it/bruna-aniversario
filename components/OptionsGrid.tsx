"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { destinations } from "@/lib/destinations";
import OptionCard from "./OptionCard";
import Lightbox from "./Lightbox";

export default function OptionsGrid({ onContinue }: { onContinue: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [gallery, setGallery] = useState<{ id: string; index: number } | null>(null);

  const activeDestination = gallery
    ? destinations.find((d) => d.id === gallery.id) ?? null
    : null;

  return (
    <div className="flex w-full flex-col items-center px-5 py-16 sm:px-8">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        {destinations.map((destination, i) => (
          <motion.div
            key={destination.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <OptionCard
              destination={destination}
              selected={selected === destination.id}
              onSelect={() => setSelected(destination.id)}
              onOpenGallery={() => setGallery({ id: destination.id, index: 0 })}
            />
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-2 flex flex-col items-center gap-1 text-center"
        >
          <p className="text-sm text-bordeaux-dark/70">Não precisa decidir agora.</p>
          <p className="font-serif text-base italic text-deepred">
            O presente é nosso. A escolha é sua. ❤️
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          onClick={onContinue}
          whileTap={{ scale: 0.96 }}
          className="mx-auto mt-4 rounded-full bg-bordeaux px-9 py-3.5 text-sm font-medium tracking-wide text-cream shadow-soft transition-colors hover:bg-bordeaux-dark"
        >
          Continuar
        </motion.button>
      </div>

      {activeDestination && gallery && (
        <Lightbox
          images={activeDestination.images}
          startIndex={gallery.index}
          title={activeDestination.title}
          onClose={() => setGallery(null)}
        />
      )}
    </div>
  );
}
