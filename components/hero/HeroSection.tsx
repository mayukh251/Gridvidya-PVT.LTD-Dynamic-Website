"use client";

import { memo, useEffect, useId, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import LiquidText from "@/components/ui/LiquidText";
import { primaryBlue, secondaryBlue } from "@/styles/brandTheme";

const transitionEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const glowSpring = {
  stiffness: 110,
  damping: 24,
  mass: 0.6
};

function HeroSectionBase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const electricId = useId().replace(/:/g, "");
  const gradientId = `${electricId}-electric-gradient`;
  const glowId = `${electricId}-strong-glow`;

  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const glowOpacity = useMotionValue(0.55);
  const smoothGlowX = useSpring(glowX, glowSpring);
  const smoothGlowY = useSpring(glowY, glowSpring);
  const smoothGlowOpacity = useSpring(glowOpacity, { stiffness: 120, damping: 28, mass: 0.6 });

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) {
      return;
    }

    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) {
      return;
    }

    const centerGlow = () => {
      const rect = element.getBoundingClientRect();
      glowX.set(rect.width * 0.5);
      glowY.set(rect.height * 0.45);
    };

    centerGlow();
    window.addEventListener("resize", centerGlow);

    return () => {
      window.removeEventListener("resize", centerGlow);
    };
  }, [glowX, glowY]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[85vh] md:min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        glowX.set(event.clientX - rect.left);
        glowY.set(event.clientY - rect.top);
        glowOpacity.set(0.8);
      }}
      onMouseLeave={() => {
        glowOpacity.set(0.45);
      }}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source src="/videos/grid1.mp4" type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-white/80 via-white/70 to-white/60" />
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `linear-gradient(160deg, rgba(255, 255, 255, 0.58), rgba(248, 250, 252, 0.62)),
            radial-gradient(circle at 26% 28%, ${secondaryBlue}26, transparent 48%),
            radial-gradient(circle at 78% 68%, ${primaryBlue}22, transparent 54%)`
        }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[78px] md:blur-[90px]"
        style={
          prefersReducedMotion
            ? {
                left: "50%",
                top: "45%",
                willChange: "opacity",
                transform: "translateZ(0)",
                background:
                  "radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, rgba(79, 70, 229, 0.14) 34%, rgba(255, 255, 255, 0) 72%)"
              }
            : {
                x: smoothGlowX,
                y: smoothGlowY,
                opacity: smoothGlowOpacity,
                willChange: "transform, opacity",
                transform: "translateZ(0)",
                background:
                  "radial-gradient(circle, rgba(99, 102, 241, 0.24) 0%, rgba(79, 70, 229, 0.16) 36%, rgba(255, 255, 255, 0) 74%)"
              }
        }
      />

      <div className="relative z-30 text-center">
        <div className="w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, filter: "blur(20px)", y: 40 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="w-full"
          >
            <div className="flex flex-col items-center gap-6">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.12, ease: transitionEase }}
                className="text-6xl font-extrabold tracking-tight md:text-7xl"
              >
                <span className="text-indigo-600 font-black">Grid</span>
                <span className="text-slate-800 font-semibold ml-1">vidya</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.88, delay: 0.18, ease: transitionEase }}
                className="relative isolate inline-flex w-fit overflow-hidden"
              >
                <div className="relative inline-block">
                  <h1 className="relative z-20 text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900">
                    Powering the Future
                  </h1>

                  <motion.h1
                    aria-hidden
                    style={{ backgroundPosition: "0% 50%" }}
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="absolute inset-0 z-30 pointer-events-none text-5xl md:text-6xl lg:text-7xl font-semibold bg-gradient-to-r from-cyan-400 via-violet-500 to-cyan-400 bg-[length:200%_100%] bg-clip-text text-transparent"
                  >
                    Powering the Future
                  </motion.h1>

                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{
                      zIndex: 30,
                      filter: "drop-shadow(0 0 4px rgba(0, 234, 255, 0.2))",
                      willChange: "transform",
                      transform: "translateZ(0)"
                    }}
                    viewBox="0 0 1000 200"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <defs>
                      <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00eaff" />
                        <stop offset="50%" stopColor="#7c3aed" />
                        <stop offset="100%" stopColor="#00eaff" />
                      </linearGradient>
                      <filter id={glowId}>
                        <feGaussianBlur stdDeviation="2.4" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    <g filter={`url(#${glowId})`} style={{ willChange: "opacity, transform", transform: "translateZ(0)" }}>
                      <motion.path
                        d="M0 100 Q 150 56 300 100 T 600 100 T 850 100 T 1000 100"
                        stroke={`url(#${gradientId})`}
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray="8 6"
                        animate={prefersReducedMotion ? undefined : { strokeDashoffset: [0, -44] }}
                        transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                        opacity={0.92}
                      />
                      <motion.path
                        d="M0 100 Q 150 144 300 100 T 600 100 T 850 100 T 1000 100"
                        stroke={`url(#${gradientId})`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray="8 6"
                        animate={prefersReducedMotion ? undefined : { strokeDashoffset: [0, -44] }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                        opacity={0.8}
                      />
                      <motion.path
                        d="M0 100 Q 120 76 240 100 T 480 100 T 720 100 T 1000 100"
                        stroke={`url(#${gradientId})`}
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray="8 6"
                        animate={prefersReducedMotion ? undefined : { strokeDashoffset: [0, -44] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        opacity={0.74}
                      />
                    </g>
                  </svg>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.86, delay: 0.25, ease: transitionEase }}
                className="leading-relaxed"
              >
                <LiquidText className="text-xl md:text-2xl font-bold mt-4 text-slate-800 whitespace-nowrap">
                  Empowering your energy future with expertise, innovation, and knowledge.
                </LiquidText>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.0, ease: "easeOut" }}
              className="mt-14 flex flex-wrap justify-center gap-6"
            >
              <motion.button
                type="button"
                className="btn-primary relative overflow-hidden px-8 py-4 shadow-lg transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(99,102,241,0.6)]"
                onClick={() => {
                  scrollToSection("contact");
                }}
                whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.04 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                style={{ willChange: "transform, box-shadow", transform: "translateZ(0)" }}
              >
                <span className="relative z-10">Start Consultation</span>
                <span className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                  <motion.span
                    className="absolute top-0 left-[-100%] h-full w-[200%] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-45"
                    animate={prefersReducedMotion ? undefined : { x: ["-100%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                  />
                </span>
              </motion.button>

              <motion.button
                type="button"
                className="btn-primary relative overflow-hidden px-8 py-4 shadow-lg transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(99,102,241,0.6)]"
                onClick={() => {
                  scrollToSection("services");
                }}
                whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.04 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                style={{ willChange: "transform, box-shadow", transform: "translateZ(0)" }}
              >
                <span className="relative z-10">Explore Services</span>
                <span className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                  <motion.span
                    className="absolute top-0 left-[-100%] h-full w-[200%] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-45"
                    animate={prefersReducedMotion ? undefined : { x: ["-100%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                  />
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export const HeroSection = memo(HeroSectionBase);
HeroSection.displayName = "HeroSection";
