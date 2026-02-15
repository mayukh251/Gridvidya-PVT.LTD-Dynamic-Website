"use client";

import type { ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

const springConfig = {
  stiffness: 260,
  damping: 20,
  mass: 0.2
};

export function MagneticButton({
  href,
  children,
  variant = "primary",
  className = ""
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const buttonClass = variant === "primary" ? "btn-primary" : "btn-secondary";

  return (
    <motion.a
      href={href}
      className={`${buttonClass} ${className}`.trim()}
      style={{ x: smoothX, y: smoothY }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const offsetX = event.clientX - rect.left - rect.width / 2;
        const offsetY = event.clientY - rect.top - rect.height / 2;
        x.set(offsetX * 0.2);
        y.set(offsetY * 0.2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.a>
  );
}
