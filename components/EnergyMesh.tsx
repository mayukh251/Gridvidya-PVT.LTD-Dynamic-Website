"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const ENERGY_PATHS = [
  "M-120 140C80 60 220 200 420 140C640 70 760 210 980 150C1220 84 1340 192 1560 126C1780 58 1980 186 2140 134",
  "M-80 280C120 208 260 332 460 266C680 196 820 326 1040 262C1260 198 1420 320 1640 252C1860 186 2010 304 2200 246",
  "M-140 430C70 364 210 492 430 426C650 360 810 482 1030 420C1270 352 1410 476 1650 412C1890 348 2050 462 2220 404",
  "M-100 590C130 520 270 652 500 580C720 512 860 644 1080 574C1320 504 1470 636 1710 566C1950 498 2120 622 2280 560",
  "M-160 760C80 684 230 828 470 748C700 670 860 814 1090 738C1320 662 1500 806 1730 730C1970 654 2140 786 2320 722"
];

const ENERGY_LAYERS = [
  {
    color: "rgba(99, 102, 241, 0.14)",
    strokeWidth: 1,
    opacity: 0.08,
    dash: "6 14",
    driftX: 140,
    bobY: 18,
    duration: 34
  },
  {
    color: "rgba(14, 165, 233, 0.12)",
    strokeWidth: 0.9,
    opacity: 0.07,
    dash: "4 12",
    driftX: -120,
    bobY: 14,
    duration: 30
  },
  {
    color: "rgba(129, 140, 248, 0.1)",
    strokeWidth: 0.85,
    opacity: 0.06,
    dash: "5 15",
    driftX: 90,
    bobY: 12,
    duration: 38
  }
] as const;

export function EnergyMesh() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const scrollDriftUp = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const scrollDriftDown = useTransform(scrollYProgress, [0, 1], [0, 65]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-35 [mix-blend-mode:normal]">
      <motion.svg
        aria-hidden
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 2000 1200"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="energy-mesh-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="7.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {ENERGY_LAYERS.map((layer, layerIndex) => (
          <motion.g
            key={`energy-layer-${layerIndex}`}
            style={
              prefersReducedMotion
                ? undefined
                : {
                    y: layerIndex % 2 === 0 ? scrollDriftUp : scrollDriftDown
                  }
            }
          >
            <motion.g
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      x: [0, layer.driftX, 0],
                      y: [0, layer.bobY, 0]
                    }
              }
              transition={{
                duration: layer.duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              }}
            >
              {ENERGY_PATHS.map((path, pathIndex) => (
                <motion.path
                  key={`energy-path-${layerIndex}-${pathIndex}`}
                  d={path}
                  fill="none"
                  stroke={layer.color}
                  strokeWidth={layer.strokeWidth}
                  strokeDasharray={layer.dash}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#energy-mesh-glow)"
                  initial={{ opacity: layer.opacity }}
                  animate={
                    prefersReducedMotion
                      ? { opacity: layer.opacity * 0.92 }
                      : {
                          opacity: [layer.opacity * 0.74, layer.opacity, layer.opacity * 0.74],
                          strokeDashoffset: [0, -260]
                        }
                  }
                  transition={{
                    duration: layer.duration - 4 + pathIndex * 0.55,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: prefersReducedMotion ? "easeOut" : "linear",
                    delay: pathIndex * 0.35
                  }}
                />
              ))}
            </motion.g>
          </motion.g>
        ))}
      </motion.svg>
    </div>
  );
}
