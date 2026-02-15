"use client";

import { motion } from "framer-motion";

type ElectricSparkProps = {
  className?: string;
};

type SparkConfig = {
  left: string;
  top: string;
  size: number;
  color: string;
  duration: number;
  delay: number;
  drift: number;
};

const sparks: SparkConfig[] = [
  { left: "8%", top: "42%", size: 3, color: "#818cf8", duration: 1.9, delay: 0.0, drift: 1.2 },
  { left: "16%", top: "28%", size: 2, color: "#a5b4fc", duration: 2.4, delay: 0.2, drift: 1.4 },
  { left: "24%", top: "64%", size: 2, color: "#bae6fd", duration: 2.1, delay: 0.5, drift: 1.1 },
  { left: "36%", top: "26%", size: 3, color: "#c7d2fe", duration: 2.7, delay: 0.3, drift: 1.6 },
  { left: "48%", top: "58%", size: 2, color: "#a5b4fc", duration: 2.0, delay: 0.8, drift: 1.2 },
  { left: "58%", top: "34%", size: 2, color: "#818cf8", duration: 2.3, delay: 0.6, drift: 1.5 },
  { left: "67%", top: "62%", size: 3, color: "#c7d2fe", duration: 2.6, delay: 0.1, drift: 1.3 },
  { left: "76%", top: "30%", size: 2, color: "#bae6fd", duration: 2.2, delay: 0.4, drift: 1.1 },
  { left: "84%", top: "56%", size: 2, color: "#a5b4fc", duration: 1.8, delay: 0.7, drift: 1.4 },
  { left: "92%", top: "40%", size: 3, color: "#818cf8", duration: 2.5, delay: 0.9, drift: 1.5 }
];

export default function ElectricSpark({ className = "" }: ElectricSparkProps) {
  return (
    <span className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()} aria-hidden>
      {sparks.map((spark, index) => (
        <motion.span
          key={`${spark.left}-${spark.top}-${index}`}
          className="absolute rounded-full"
          style={{
            left: spark.left,
            top: spark.top,
            width: spark.size,
            height: spark.size,
            backgroundColor: spark.color,
            boxShadow: `0 0 10px ${spark.color}, 0 0 18px ${spark.color}`
          }}
          animate={{
            opacity: [0.08, 0.95, 0.18, 0.75, 0.08],
            scale: [0.7, 1.4, 0.85, 1.15, 0.7],
            x: [0, spark.drift, -spark.drift * 0.9, spark.drift * 0.35, 0],
            y: [0, -spark.drift * 0.7, spark.drift * 0.6, -spark.drift * 0.35, 0]
          }}
          transition={{
            duration: spark.duration,
            delay: spark.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut"
          }}
        />
      ))}
    </span>
  );
}
