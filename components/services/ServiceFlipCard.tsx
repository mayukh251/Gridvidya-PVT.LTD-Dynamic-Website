"use client";

import { useState, type CSSProperties } from "react";
import { motion, type Variants } from "framer-motion";
import { AnimatedServiceIcon, type ServiceIconKind } from "@/components/services/ServiceIcons";
import LiquidText from "@/components/ui/LiquidText";

export type ServiceFlipCardContent = {
  front: {
    title: string;
  };
  back: {
    expandedDescription: string;
    detailPoints: string[];
  };
};

type ServiceFlipCardProps = {
  content: ServiceFlipCardContent;
  icon: ServiceIconKind;
  reducedMotion: boolean;
  variants: Variants;
};

const transitionEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const flipTransition = {
  duration: 0.6,
  ease: "easeInOut"
} as const;

export function ServiceFlipCard({
  content,
  icon,
  reducedMotion,
  variants
}: ServiceFlipCardProps) {
  const { front, back } = content;
  const [isHovering, setIsHovering] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.article
      variants={variants}
      className="relative group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl [perspective:1400px]"
      style={
        {
          willChange: "transform, opacity, filter",
          "--x": "50%",
          "--y": "50%"
        } as CSSProperties
      }
      whileHover={reducedMotion ? undefined : { y: -4, scale: 1.02 }}
      transition={{ duration: 0.42, ease: transitionEase }}
      onClick={() => {
        setIsFlipped((previous) => !previous);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setIsFlipped((previous) => !previous);
        }
      }}
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = `${event.clientX - rect.left}px`;
        const y = `${event.clientY - rect.top}px`;
        event.currentTarget.style.setProperty("--x", x);
        event.currentTarget.style.setProperty("--y", y);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
      role="button"
      aria-pressed={isFlipped}
      tabIndex={0}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--x) var(--y), rgba(165, 180, 252, 0.26), transparent 62%)"
        }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(140deg, rgba(199, 210, 254, 0.3) 0%, rgba(255, 255, 255, 0.65) 44%, rgba(224, 242, 254, 0.4) 100%)",
          backgroundSize: "200% 200%"
        }}
        animate={
          reducedMotion
            ? { opacity: 0.55 }
            : {
                opacity: isHovering ? 0.72 : 0.55,
                backgroundPosition: isHovering ? "100% 0%" : "0% 100%"
              }
        }
        transition={{ duration: 0.85, ease: transitionEase }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl border"
        animate={
          reducedMotion
            ? {
                borderColor: "rgba(79, 70, 229, 0.15)",
                boxShadow: "inset 0 0 0 1px rgba(79, 70, 229, 0.05)"
              }
            : isHovering
              ? {
                  borderColor: "rgba(79, 70, 229, 0.3)",
                  boxShadow: "inset 0 0 0 1px rgba(79, 70, 229, 0.08), 0 10px 24px rgba(99, 102, 241, 0.14)"
                }
              : {
                  borderColor: "rgba(148, 163, 184, 0.28)",
                  boxShadow: "inset 0 0 0 1px rgba(148, 163, 184, 0.08)"
                }
        }
        transition={{ duration: 0.35, ease: transitionEase }}
      />

      <motion.div
        className="relative z-10 min-h-[340px]"
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
          transform: "translate3d(0, 0, 0)"
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={reducedMotion ? { duration: 0.01 } : flipTransition}
      >
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-7 py-9 text-center"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <motion.div
            className="relative inline-flex h-[6.4rem] w-[6.4rem] items-center justify-center rounded-[2rem] border border-indigo-200 bg-indigo-50 text-indigo-700"
            animate={
              reducedMotion
                ? undefined
                : {
                    boxShadow: isHovering
                      ? [
                          "0 0 0 rgba(79, 70, 229, 0)",
                          "0 10px 20px rgba(79, 70, 229, 0.15)",
                          "0 0 0 rgba(79, 70, 229, 0)"
                        ]
                      : [
                          "0 0 0 rgba(79, 70, 229, 0)",
                          "0 8px 16px rgba(79, 70, 229, 0.1)",
                          "0 0 0 rgba(79, 70, 229, 0)"
                        ]
                  }
            }
            transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <motion.div
              animate={{ scale: reducedMotion || isFlipped || !isHovering ? 1 : 1.08 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <AnimatedServiceIcon
                kind={icon}
                reducedMotion={reducedMotion}
                className="h-[5.7rem] w-[5.7rem] text-indigo-700"
              />
            </motion.div>
          </motion.div>

          <motion.h3
            className="mt-9 max-w-[18rem] text-center text-[1.35rem] font-medium leading-snug text-slate-900"
            animate={
              reducedMotion || isFlipped
                ? undefined
                : isHovering
                  ? { textShadow: "0 6px 14px rgba(79, 70, 229, 0.18)" }
                  : { textShadow: "0 0 0 rgba(79, 70, 229, 0)" }
            }
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <LiquidText>{front.title}</LiquidText>
          </motion.h3>
        </div>

        <div
          className="absolute inset-0 flex flex-col p-7"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden"
          }}
        >
          <p className="text-[10px] uppercase tracking-[0.18em] text-indigo-600/80">Technical Scope</p>
          <h3 className="mt-3 text-lg font-semibold text-slate-900">
            <LiquidText>{front.title}</LiquidText>
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            <LiquidText className="block w-full">{back.expandedDescription}</LiquidText>
          </p>

          <ul className="mt-5 space-y-2">
            {back.detailPoints.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm leading-relaxed text-slate-600">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-500/80" />
                <LiquidText className="block w-full">{point}</LiquidText>
              </li>
            ))}
          </ul>

          <p className="mt-auto pt-5 text-[10px] uppercase tracking-[0.18em] text-indigo-600/80">
            Click card again to return
          </p>
        </div>
      </motion.div>
    </motion.article>
  );
}
