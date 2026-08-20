"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";

type SmartImageProps = {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
};

export default function SmartImage({ src, alt, className, onClick }: SmartImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        onClick={onClick}
        className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-blush to-bordeaux-light/40 text-bordeaux-dark/70 ${className ?? ""}`}
      >
        <ImageOff className="h-6 w-6" />
        <span className="text-xs font-medium">Foto em breve</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onClick={onClick}
      onError={() => setErrored(true)}
      className={className}
      loading="lazy"
    />
  );
}
