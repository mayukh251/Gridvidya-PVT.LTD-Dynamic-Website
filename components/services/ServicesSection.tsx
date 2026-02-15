"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ServiceFlipCard, type ServiceFlipCardContent } from "@/components/services/ServiceFlipCard";
import type { ServiceIconKind } from "@/components/services/ServiceIcons";
import LiquidText from "@/components/ui/LiquidText";

type ServiceItem = {
  content: ServiceFlipCardContent;
  icon: ServiceIconKind;
};

const services: ServiceItem[] = [
  {
    content: {
      front: {
        title: "Power Systems Planning"
      },
      back: {
        expandedDescription:
          "Power systems planning is the strategic process of designing, analyzing, and optimizing electrical transmission and distribution networks to ensure reliable, efficient, and cost-effective delivery of electricity. It involves forecasting future demand, integrating new generation sources, especially renewables, and reinforcing infrastructure to meet regulatory, economic, and technological challenges.",
        detailPoints: []
      }
    },
    icon: "gridNetwork"
  },
  {
    content: {
      front: {
        title: "Generation and Load Interconnection"
      },
      back: {
        expandedDescription:
          "Generation and load interconnection is the process of linking new power generation sources or large electrical loads to the transmission network, ensuring safe, reliable, and compliant operation. It involves technical studies, regulatory approvals, and coordinated infrastructure upgrades to maintain grid stability and support system growth.",
        detailPoints: []
      }
    },
    icon: "microgridLayout"
  },
  {
    content: {
      front: {
        title: "Compliance Studies"
      },
      back: {
        expandedDescription:
          "Compliance studies are essential for confirming that power systems and electrical operations adhere to legal, technical, and regulatory requirements. These studies help organizations identify gaps, reduce risks, and ensure the safety and reliability of their infrastructure. By staying compliant, companies can avoid penalties, promote efficient performance, and build trust with stakeholders.",
        detailPoints: []
      }
    },
    icon: "aiForecasting"
  }
];

const backgroundParticles = [
  { left: "8%", top: "14%", size: 2, duration: 7.5 },
  { left: "22%", top: "38%", size: 2, duration: 8.3 },
  { left: "36%", top: "19%", size: 2, duration: 9.2 },
  { left: "52%", top: "35%", size: 3, duration: 8.6 },
  { left: "68%", top: "16%", size: 2, duration: 8.1 },
  { left: "82%", top: "40%", size: 2, duration: 9.4 }
];

const transitionEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cardsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.45
    }
  }
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.88,
    filter: "blur(20px)",
    y: 60
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 1.15,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export function ServicesSection() {
  const prefersReducedMotion = Boolean(useReducedMotion());

  return (
    <section
      id="services"
      className="relative -mt-[1px] overflow-hidden bg-[#F8FAFC] py-28 md:py-36"
    >
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-22 [transform:translateZ(0)]"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/videos/grid2.mp4" type="video/mp4" />
      </video>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.9),rgba(248,250,252,0.95))]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_25%_25%,rgba(165,180,252,0.18),transparent_45%),radial-gradient(circle_at_75%_75%,rgba(186,230,253,0.2),transparent_52%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-transparent via-indigo-200/25 to-sky-100/45"
      />

      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {backgroundParticles.map((particle, index) => (
          <motion.span
            key={`${particle.left}-${particle.top}`}
            className="absolute rounded-full bg-indigo-200/45"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              willChange: "transform, opacity"
            }}
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    opacity: [0.08, 0.2, 0.08],
                    y: [0, -8, 0]
                  }
            }
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: index * 0.22
            }}
          />
        ))}
      </div>

      <div className="section-shell relative z-20">
        <div>
          <span className="eyebrow">Services</span>
          <motion.h2
            className="section-title mt-6"
            initial={{ opacity: 0, filter: "blur(18px)", y: 30 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, amount: 0.24 }}
            transition={{ duration: 1.1, delay: 0.25, ease: transitionEase }}
            style={{ willChange: "transform, opacity" }}
          >
            <LiquidText>Engineering and study services for modern utility and industrial grids.</LiquidText>
          </motion.h2>
          <motion.p
            className="section-copy"
            initial={{ opacity: 0, filter: "blur(18px)", y: 30 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, amount: 0.24 }}
            transition={{ duration: 1.1, delay: 0.25, ease: transitionEase }}
            style={{ willChange: "transform, opacity" }}
          >
            <LiquidText className="block w-full">
              We deliver planning, interconnection, compliance, and performance assessments that combine
              field-ready electrical engineering depth with adaptive analytics.
            </LiquidText>
          </motion.p>
        </div>

        <motion.div
          className="relative z-20 mt-14 grid gap-8 md:grid-cols-3"
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ willChange: "transform, opacity" }}
        >
          {services.map((service) => (
            <ServiceFlipCard
              key={service.content.front.title}
              content={service.content}
              icon={service.icon}
              reducedMotion={prefersReducedMotion}
              variants={cardVariants}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
