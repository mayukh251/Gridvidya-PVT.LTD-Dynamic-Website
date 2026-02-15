"use client";

import { motion } from "framer-motion";

export type ServiceIconKind =
  | "gridNetwork"
  | "microgridLayout"
  | "aiForecasting"
  | "gridOptimization"
  | "faultMitigation";

type IconProps = {
  className?: string;
  reducedMotion: boolean;
};

const loopTransition = {
  duration: 5.8,
  ease: "easeInOut",
  repeat: Number.POSITIVE_INFINITY
} as const;

function GridNetworkIcon({ className, reducedMotion }: IconProps) {
  return (
    <motion.svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <motion.path
        d="M12 18L32 10L52 18L52 44L32 54L12 44Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={
          reducedMotion ? undefined : { pathLength: [0.35, 1, 0.35], opacity: [0.62, 1, 0.62] }
        }
        transition={loopTransition}
      />
      <motion.path
        d="M12 18L32 32L52 18M12 44L32 32L52 44M32 32V54"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        animate={
          reducedMotion ? undefined : { pathLength: [0.45, 1, 0.45], opacity: [0.48, 0.9, 0.48] }
        }
        transition={{ ...loopTransition, duration: 6.4, delay: 0.3 }}
      />
      {[12, 32, 52, 12, 52, 32].map((coord, index) => {
        const positions = [
          { x: 12, y: 18 },
          { x: 32, y: 10 },
          { x: 52, y: 18 },
          { x: 12, y: 44 },
          { x: 52, y: 44 },
          { x: 32, y: 54 }
        ] as const;
        const node = positions[index];

        return (
          <motion.circle
            key={`${coord}-${index}`}
            cx={node.x}
            cy={node.y}
            r="2.4"
            fill="currentColor"
            animate={reducedMotion ? undefined : { scale: [1, 1.16, 1], opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 2.6, repeat: Number.POSITIVE_INFINITY, delay: index * 0.18 }}
          />
        );
      })}
    </motion.svg>
  );
}

function MicrogridLayoutIcon({ className, reducedMotion }: IconProps) {
  return (
    <motion.svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <motion.circle
        cx="32"
        cy="32"
        r="18"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="3 4"
        opacity="0.45"
        animate={reducedMotion ? undefined : { rotate: [0, 360] }}
        transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        style={{ transformOrigin: "32px 32px" }}
      />
      <motion.rect
        x="24.5"
        y="24.5"
        width="15"
        height="15"
        rx="3.2"
        stroke="currentColor"
        strokeWidth="1.6"
        animate={reducedMotion ? undefined : { scale: [1, 1.04, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.path
        d="M16 16H22V22H16V16ZM42 16H48V22H42V16ZM16 42H22V48H16V42ZM42 42H48V48H42V42Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={reducedMotion ? undefined : { opacity: [0.55, 0.95, 0.55] }}
        transition={{ duration: 4.1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.path
        d="M22 19H24.5M39.5 19H42M19 22V24.5M45 22V24.5M22 45H24.5M39.5 45H42M19 39.5V42M45 39.5V42"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={reducedMotion ? undefined : { pathLength: [0.4, 1, 0.4], opacity: [0.4, 0.9, 0.4] }}
        transition={{ ...loopTransition, duration: 5.2, delay: 0.2 }}
      />
      <motion.g
        animate={reducedMotion ? undefined : { rotate: [0, 360] }}
        transition={{ duration: 8.2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        style={{ transformOrigin: "32px 32px" }}
      >
        <circle cx="32" cy="14" r="2.1" fill="currentColor" />
        <circle cx="50" cy="32" r="2.1" fill="currentColor" />
        <circle cx="32" cy="50" r="2.1" fill="currentColor" />
        <circle cx="14" cy="32" r="2.1" fill="currentColor" />
      </motion.g>
      <motion.circle
        cx="32"
        cy="32"
        r="2.8"
        fill="currentColor"
        animate={reducedMotion ? undefined : { scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

function AIForecastingIcon({ className, reducedMotion }: IconProps) {
  return (
    <motion.svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path
        d="M10 50H54M10 50V14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.7"
      />
      <motion.path
        d="M14 43L24 35L33 38L44 25L54 18"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={reducedMotion ? undefined : { pathLength: [0.2, 1, 0.2], opacity: [0.62, 1, 0.62] }}
        transition={{ ...loopTransition, duration: 4.9 }}
      />
      <motion.path
        d="M14 43L24 35L33 38L44 25L54 18"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.18"
        animate={reducedMotion ? undefined : { opacity: [0.06, 0.24, 0.06] }}
        transition={{ duration: 3.7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.circle
        r="2.5"
        fill="currentColor"
        cx="14"
        cy="43"
        animate={
          reducedMotion
            ? undefined
            : {
                cx: [14, 24, 33, 44, 54],
                cy: [43, 35, 38, 25, 18]
              }
        }
        transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
    </motion.svg>
  );
}

function GridOptimizationIcon({ className, reducedMotion }: IconProps) {
  return (
    <motion.svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <motion.circle
        cx="32"
        cy="32"
        r="20"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeDasharray="4 4"
        animate={reducedMotion ? undefined : { rotate: [0, 360] }}
        transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        style={{ transformOrigin: "32px 32px" }}
      />
      <motion.path
        d="M16 34C20 23 44 23 48 34C44 45 20 45 16 34Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={reducedMotion ? undefined : { pathLength: [0.35, 1, 0.35], opacity: [0.55, 1, 0.55] }}
        transition={{ ...loopTransition, duration: 5.2 }}
      />
      <motion.g
        animate={reducedMotion ? undefined : { rotate: [0, 360] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        style={{ transformOrigin: "32px 32px" }}
      >
        <line x1="32" y1="32" x2="52" y2="32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="52" cy="32" r="2.4" fill="currentColor" />
      </motion.g>
      <circle cx="32" cy="32" r="2.8" fill="currentColor" />
    </motion.svg>
  );
}

function FaultMitigationIcon({ className, reducedMotion }: IconProps) {
  return (
    <motion.svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      {[9, 17, 25].map((radius, index) => (
        <motion.circle
          key={`fault-ring-${radius}`}
          cx="32"
          cy="32"
          r={radius}
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="5 6"
          opacity="0.54"
          animate={
            reducedMotion
              ? undefined
              : {
                  strokeDashoffset: [0, -22 - index * 6],
                  opacity: [0.34, 0.78, 0.34]
                }
          }
          transition={{ duration: 4.4 + index * 0.3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      ))}
      <motion.g
        animate={reducedMotion ? undefined : { rotate: [0, 360] }}
        transition={{ duration: 6.2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        style={{ transformOrigin: "32px 32px" }}
      >
        <line x1="32" y1="32" x2="52" y2="28" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="52" cy="28" r="2.2" fill="currentColor" />
      </motion.g>
      <motion.circle
        cx="43"
        cy="38"
        r="2.4"
        fill="currentColor"
        animate={reducedMotion ? undefined : { scale: [1, 1.22, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <circle cx="32" cy="32" r="2.6" fill="currentColor" />
    </motion.svg>
  );
}

type AnimatedServiceIconProps = {
  kind: ServiceIconKind;
  reducedMotion: boolean;
  className?: string;
};

export function AnimatedServiceIcon({
  kind,
  reducedMotion,
  className = "h-7 w-7 text-indigo-700"
}: AnimatedServiceIconProps) {
  if (kind === "gridNetwork") {
    return <GridNetworkIcon className={className} reducedMotion={reducedMotion} />;
  }

  if (kind === "microgridLayout") {
    return <MicrogridLayoutIcon className={className} reducedMotion={reducedMotion} />;
  }

  if (kind === "aiForecasting") {
    return <AIForecastingIcon className={className} reducedMotion={reducedMotion} />;
  }

  if (kind === "gridOptimization") {
    return <GridOptimizationIcon className={className} reducedMotion={reducedMotion} />;
  }

  return <FaultMitigationIcon className={className} reducedMotion={reducedMotion} />;
}
