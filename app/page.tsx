"use client";

import type { CSSProperties, FocusEvent, ReactNode } from "react";
import { useRef } from "react";
import {
  Activity,
  BrainCircuit,
  Building2,
  Cable,
  Factory,
  Landmark,
  LucideIcon,
  Waves,
  Zap
} from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { HeroSection } from "@/components/hero/HeroSection";
import { MissionVision } from "@/components/MissionVision";
import { ServicesSection } from "@/components/services/ServicesSection";
import LiquidText from "@/components/ui/LiquidText";
import { CorporateDivider } from "@/components/ui/CorporateDivider";

type CardItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const technologies: CardItem[] = [
  {
    title: "Machine Learning Analytics",
    description:
      "Pattern-driven risk scoring, uncertainty quantification, and predictive diagnostics for network operations.",
    icon: BrainCircuit
  },
  {
    title: "Deep Learning Control",
    description:
      "Neural control policies for voltage-frequency stabilization in fast-changing operating conditions.",
    icon: Activity
  },
  {
    title: "Digital Twin Simulation",
    description:
      "Physics-informed digital twins for planning, stress testing, and scenario validation before field execution.",
    icon: Waves
  },
  {
    title: "Real-Time Monitoring",
    description:
      "Streaming telemetry pipelines and operator dashboards for immediate visibility of critical grid states.",
    icon: Cable
  }
];

const industries: CardItem[] = [
  {
    title: "Utility Operators",
    description: "Transmission and distribution operators scaling reliability under renewable integration pressure.",
    icon: Building2
  },
  {
    title: "Renewable Farms",
    description: "Solar, wind, and hybrid asset portfolios requiring advanced inverter and dispatch coordination.",
    icon: Zap
  },
  {
    title: "Government Infrastructure",
    description: "Public-critical power systems needing security, resilience, and auditable technical governance.",
    icon: Landmark
  },
  {
    title: "Energy Developers",
    description: "Developers and EPC teams accelerating project bankability with data-backed stability confidence.",
    icon: Factory
  }
];

const transitionEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.8, delay, ease: transitionEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  label,
  title,
  copy
}: {
  label: string;
  title: ReactNode;
  copy: string;
}) {
  return (
    <FadeIn>
      <span className="eyebrow">{label}</span>
      <h2 className="section-title mt-6">{typeof title === "string" ? <LiquidText>{title}</LiquidText> : title}</h2>
      <p className="section-copy">
        <LiquidText className="block w-full">{copy}</LiquidText>
      </p>
    </FadeIn>
  );
}

export default function Home() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress: pageProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"]
  });

  const topOrbY = useTransform(pageProgress, [0, 1], [0, -160]);
  const bottomOrbY = useTransform(pageProgress, [0, 1], [0, 200]);

  const handleElectricFocus = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.currentTarget.classList.add("electric-focus");
  };

  const handleElectricBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.currentTarget.classList.remove("electric-focus");
  };

  return (
    <div ref={pageRef} className="relative isolate overflow-hidden">
      <div className="pointer-events-none fixed inset-0 -z-30">
        <motion.div
          style={prefersReducedMotion ? undefined : { y: topOrbY }}
          className="absolute -top-36 left-[8%] h-[28rem] w-[28rem] rounded-full bg-indigo-300/25 blur-[120px] md:blur-[150px] [will-change:transform]"
        />
        <motion.div
          style={prefersReducedMotion ? undefined : { y: bottomOrbY }}
          className="absolute bottom-[-15rem] right-[4%] h-[30rem] w-[30rem] rounded-full bg-sky-200/30 blur-[135px] md:blur-[165px] [will-change:transform]"
        />
        <div className="grid-overlay absolute inset-0 opacity-20" />
      </div>

      <HeroSection />
      <CorporateDivider />

      <MissionVision />
      <CorporateDivider />

      <ServicesSection />
      <CorporateDivider />

      <section
        id="technology"
        className="relative overflow-hidden bg-white py-28 md:py-36"
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-indigo-100/40 via-transparent to-sky-100/35"
        />
        <div className="section-shell relative z-10">
          <SectionHeading
            label="Technology"
            title={
              <LiquidText>
                AI-native grid intelligence stack built for decision-grade operations.
              </LiquidText>
            }
            copy="From telemetry ingestion to control recommendation, our technology framework is designed for transparent, auditable, and field-ready deployment in high-stakes electrical infrastructure."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {technologies.map((technology, index) => {
              const Icon = technology.icon;
              const isFeatured = index === 0;
              return (
                <motion.div
                  key={technology.title}
                  layout={false}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.72, delay: index * 0.09, ease: transitionEase }}
                  whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                  className={`${isFeatured ? "md:col-span-2" : ""}`}
                  style={{ "--x": "50%", "--y": "50%", willChange: "transform, opacity" } as CSSProperties}
                  onMouseMove={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();
                    const x = event.clientX - rect.left;
                    const y = event.clientY - rect.top;
                    event.currentTarget.style.setProperty("--x", `${x}px`);
                    event.currentTarget.style.setProperty("--y", `${y}px`);
                  }}
                >
                  <div className="group relative overflow-hidden rounded-2xl border border-white/40 bg-white/70 p-7 backdrop-blur-md shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300"
                      style={{
                        background:
                          "radial-gradient(350px circle at var(--x) var(--y), rgba(165,180,252,0.26), transparent 62%)"
                      }}
                    />
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-violet-400/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-indigo-200/50 blur-2xl" />
                    <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-200 bg-indigo-50 text-indigo-700 shadow-lg shadow-indigo-100">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="relative mt-6 text-2xl font-semibold text-slate-900">
                      <LiquidText>{technology.title}</LiquidText>
                    </h3>
                    <p className="relative mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
                      <LiquidText className="block w-full">{technology.description}</LiquidText>
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <CorporateDivider />

      <section
        id="industries"
        className="relative overflow-hidden bg-[#F8FAFC] py-28 md:py-36"
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-sky-100/40 via-transparent to-indigo-100/35"
        />
        <div className="section-shell relative z-10">
          <SectionHeading
            label="Industries Served"
            title="Strategic support for stakeholders operating mission-critical energy assets."
            copy="We align operational, regulatory, and performance requirements across public and private infrastructure programs where reliability and forecasting confidence are non-negotiable."
          />

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {industries.map((industry, index) => {
                const Icon = industry.icon;
                return (
                  <motion.div
                    key={industry.title}
                    layout={false}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.68, delay: index * 0.07, ease: transitionEase }}
                    whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                    style={{ "--x": "50%", "--y": "50%", willChange: "transform, opacity" } as CSSProperties}
                    onMouseMove={(event) => {
                      const rect = event.currentTarget.getBoundingClientRect();
                      const x = event.clientX - rect.left;
                      const y = event.clientY - rect.top;
                      event.currentTarget.style.setProperty("--x", `${x}px`);
                      event.currentTarget.style.setProperty("--y", `${y}px`);
                    }}
                  >
                    <div className="group relative overflow-hidden rounded-2xl border border-white/40 bg-white/70 p-6 backdrop-blur-md shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
                      <div
                        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300"
                        style={{
                          background:
                            "radial-gradient(350px circle at var(--x) var(--y), rgba(165,180,252,0.24), transparent 62%)"
                        }}
                      />
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-violet-400/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <Icon className="h-6 w-6 text-indigo-700" />
                      <h3 className="mt-5 text-xl font-semibold text-slate-900">
                        <LiquidText>{industry.title}</LiquidText>
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">
                        <LiquidText className="block w-full">{industry.description}</LiquidText>
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
        </div>
      </section>
      <CorporateDivider />

      <section id="contact" className="bg-white pb-24 pt-20 md:pb-28">
        <div className="section-shell">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.78, ease: transitionEase }}
              className="glass-corporate soft-border-glow relative overflow-hidden rounded-[20px] p-8 md:p-12"
              style={{ "--x": "50%", "--y": "50%", willChange: "transform, opacity" } as CSSProperties}
              onMouseMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                const x = event.clientX - rect.left;
              const y = event.clientY - rect.top;
              event.currentTarget.style.setProperty("--x", `${x}px`);
              event.currentTarget.style.setProperty("--y", `${y}px`);
            }}
          >
            <svg
              className="absolute inset-0 h-full w-full pointer-events-none"
              preserveAspectRatio="none"
              aria-hidden
            >
              <motion.rect
                x="2"
                y="2"
                width="calc(100% - 4px)"
                height="calc(100% - 4px)"
                rx="20"
                ry="20"
                fill="transparent"
                stroke="url(#electricGradient)"
                strokeWidth="2"
                initial={{ pathLength: 1, strokeOpacity: 0.22 }}
                animate={{ strokeOpacity: [0.18, 0.36, 0.18] }}
                transition={{
                  duration: 5.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  filter: "drop-shadow(0 0 6px rgba(129, 140, 248, 0.22))"
                }}
              />
              <defs>
                <linearGradient id="electricGradient">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="50%" stopColor="#A5B4FC" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
              </defs>
            </svg>

            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(400px circle at var(--x) var(--y), rgba(165,180,252,0.18), transparent 70%)"
              }}
            />

            <div className="absolute -right-16 -top-12 h-40 w-40 rounded-full bg-indigo-200/70 blur-[80px]" />
            <div className="absolute -left-12 bottom-0 h-32 w-32 rounded-full bg-sky-100/90 blur-[70px]" />

            <div className="relative grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
              <div>
                <span className="eyebrow">Start Engagement</span>
                <h2 className="mt-6 text-3xl font-semibold leading-tight text-slate-900 md:text-5xl">
                  <LiquidText>Build your next grid program with AI-grade engineering confidence.</LiquidText>
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
                  <LiquidText className="block w-full">
                    Tell us about your grid challenge and project timeline. We will respond with a focused
                    advisory path spanning diagnostics, simulation, and deployment priorities.
                  </LiquidText>
                </p>
              </div>

              <form className="space-y-4" action="#" method="post">
                <label className="sr-only" htmlFor="name">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Full name"
                  className="input-glass focus:outline-none focus:ring-0 relative transition-[box-shadow,border-color,background-color] duration-300"
                  onFocus={handleElectricFocus}
                  onBlur={handleElectricBlur}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="sr-only" htmlFor="email">
                      Business email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="Business email"
                      className="input-glass focus:outline-none focus:ring-0 relative transition-[box-shadow,border-color,background-color] duration-300"
                      onFocus={handleElectricFocus}
                      onBlur={handleElectricBlur}
                    />
                  </div>
                  <div>
                    <label className="sr-only" htmlFor="company">
                      Organization
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Organization"
                      className="input-glass focus:outline-none focus:ring-0 relative transition-[box-shadow,border-color,background-color] duration-300"
                      onFocus={handleElectricFocus}
                      onBlur={handleElectricBlur}
                    />
                  </div>
                </div>

                <label className="sr-only" htmlFor="message">
                  Project goals
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Project goals, grid scope, and timeline"
                  className="input-glass resize-none focus:outline-none focus:ring-0 relative transition-[box-shadow,border-color,background-color] duration-300"
                  onFocus={handleElectricFocus}
                  onBlur={handleElectricBlur}
                />

                <button type="submit" className="btn-primary w-full sm:w-auto">
                  Request Consultation
                </button>
              </form>
            </div>
          </motion.div>

          <p className="mt-8 text-center text-xs uppercase tracking-[0.16em] text-slate-500">
            Gridvidya PVT.LTD.{" | "}
            <a href="mailto:info@gridvidya.co.in" className="hover:text-violet-600 transition-colors duration-200">
              info@gridvidya.co.in
            </a>
            {" | "}
            <a href="mailto:info@gridvidya.com" className="hover:text-violet-600 transition-colors duration-200">
              info@gridvidya.com
            </a>
            {" | "}
            <a href="tel:+910000000000" className="hover:text-violet-600 transition-colors duration-200">
              Phone: +91 000 000 0000
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
