"use client";

import { motion } from "framer-motion";
import { Check, ExternalLink, Images } from "lucide-react";
import type { Destination } from "@/lib/destinations";
import SmartImage from "./SmartImage";

type OptionCardProps = {
  destination: Destination;
  selected: boolean;
  onSelect: () => void;
  onOpenGallery: () => void;
};

export default function OptionCard({
  destination,
  selected,
  onSelect,
  onOpenGallery,
}: OptionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-xl3 glass shadow-soft transition-shadow ${
        selected ? "shadow-glow ring-2 ring-gold" : ""
      }`}
    >
      {destination.badge && (
        <span className="absolute left-4 top-4 z-10 rounded-full bg-bordeaux-dark/80 px-3 py-1 text-[11px] font-medium text-cream backdrop-blur-sm">
          {destination.badge}
        </span>
      )}

      <button
        onClick={onOpenGallery}
        className="group relative block h-56 w-full overflow-hidden sm:h-64"
        aria-label={`Ver fotos de ${destination.title}`}
      >
        <SmartImage
          src={destination.images[0]}
          alt={destination.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bordeaux-dark/50 via-transparent to-transparent" />
        {destination.images.length > 1 && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/35 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
            <Images className="h-3.5 w-3.5" /> Ver mais fotos
          </span>
        )}
      </button>

      <div className="flex flex-col gap-3 p-5 sm:p-6">
        <div>
          <h3 className="font-serif text-xl text-bordeaux-dark">
            {destination.title} <span>{destination.emoji}</span>
          </h3>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-bordeaux/70">
            {destination.subtitle}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-bordeaux-dark/85">
          {destination.description}
        </p>

        <ul className="flex flex-col gap-1.5">
          {destination.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-xs text-bordeaux-dark/75">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-2 flex items-center justify-between gap-3">
          {destination.link ? (
            <a
              href={destination.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-medium text-bordeaux/70 underline-offset-2 hover:text-bordeaux hover:underline"
            >
              {destination.link.label} <ExternalLink className="h-3 w-3" />
            </a>
          ) : (
            <span />
          )}

          <motion.button
            onClick={onSelect}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              selected
                ? "bg-bordeaux text-cream"
                : "bg-white/60 text-bordeaux-dark hover:bg-white/80"
            }`}
          >
            {selected ? (
              <>
                <Check className="h-3.5 w-3.5" /> Escolhido
              </>
            ) : (
              "Escolher"
            )}
          </motion.button>
        </div>

        {selected && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-sm font-medium text-deepred"
          >
            Boa escolha ❤️
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
