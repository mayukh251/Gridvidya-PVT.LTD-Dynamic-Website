"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

type ElectricArcProps = {
  className?: string;
};

const basePaths = [
  "M10 40 L30 20 L50 45 L70 15 L90 40",
  "M8 62 L22 34 L36 58 L52 28 L68 54 L84 30 L96 50",
  "M6 78 L20 52 L34 74 L50 46 L66 72 L82 48 L94 68",
  "M12 26 L28 12 L42 30 L58 10 L74 28 L90 14",
  "M4 54 L18 24 L32 50 L46 22 L60 48 L78 20 L94 44"
] as const;

export default function ElectricArc({ className = "" }: ElectricArcProps) {
  const arcs = useMemo(
    () =>
      basePaths.map((d) => ({
        d,
        duration: 0.54 + Math.random() * 0.18,
        repeatDelay: Math.random() * 2,
        delay: Math.random() * 1.2
      })),
    []
  );

  return (
    <span className={className} aria-hidden>
      <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" className="h-full w-full">
        {arcs.map((arc, index) => (
          <motion.path
            key={`${arc.d}-${index}`}
            d={arc.d}
            fill="transparent"
            stroke="#6366f1"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              strokeWidth: [1, 3, 1]
            }}
            transition={{
              duration: arc.duration,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: arc.repeatDelay,
              delay: arc.delay,
              ease: "easeInOut"
            }}
            style={{ filter: "drop-shadow(0 0 4px rgba(79, 70, 229, 0.35))" }}
          />
        ))}
      </svg>
    </span>
  );
}
