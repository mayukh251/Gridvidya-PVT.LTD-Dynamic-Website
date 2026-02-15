"use client";

import { motion, useReducedMotion } from "framer-motion";

type CorporateDividerProps = {
  className?: string;
};

export function CorporateDivider({ className = "" }: CorporateDividerProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());

  return (
    <div className={`relative w-full h-16 flex items-center justify-center overflow-hidden ${className}`.trim()} aria-hidden>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 200"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="dividerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <filter id="dividerGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.g
          filter="url(#dividerGlow)"
          animate={
            prefersReducedMotion
              ? { opacity: 0.75 }
              : { opacity: [0.6, 1, 0.6] }
          }
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut"
          }}
        >
          <motion.path
            d="M0 100 Q 150 90 300 100 T 600 100 T 1000 100"
            fill="none"
            stroke="url(#dividerGradient)"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeDasharray="5 6"
            opacity="0.75"
            animate={prefersReducedMotion ? undefined : { strokeDashoffset: [0, -40] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.2, ease: "linear" }}
          />
          <motion.path
            d="M0 100 Q 150 111 300 100 T 600 100 T 1000 100"
            fill="none"
            stroke="url(#dividerGradient)"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeDasharray="5 6"
            opacity="0.68"
            animate={prefersReducedMotion ? undefined : { strokeDashoffset: [0, -40] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.6, ease: "linear" }}
          />
          <motion.path
            d="M0 100 Q 130 94 260 106 T 520 94 T 780 106 T 1000 100"
            fill="none"
            stroke="url(#dividerGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="5 6"
            opacity="0.62"
            animate={prefersReducedMotion ? undefined : { strokeDashoffset: [0, -40] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "linear" }}
          />
        </motion.g>
      </svg>
    </div>
  );
}

export default CorporateDivider;
