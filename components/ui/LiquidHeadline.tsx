"use client";

import { useCallback, useEffect, useMemo, useRef, type MouseEvent } from "react";
import {
  motion,
  motionValue,
  useReducedMotion,
  useSpring,
  type MotionValue
} from "framer-motion";

type LiquidHeadlineProps = {
  children: string;
  className?: string;
};

type WordCenter = {
  x: number;
  y: number;
};

type WordMotionTargets = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
};

type LiquidWordProps = {
  word: string;
  index: number;
  isLast: boolean;
  registerRef: (index: number, element: HTMLSpanElement | null) => void;
  target: WordMotionTargets;
};

const springConfig = {
  stiffness: 180,
  damping: 22,
  mass: 0.5
};

const INFLUENCE_RADIUS = 220;
const MAX_TRANSLATE = 5.4;
const MAX_ROTATE = 2.2;
const MAX_SCALE_BOOST = 0.03;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function smoothStep(value: number) {
  const t = clamp(value, 0, 1);
  return t * t * (3 - 2 * t);
}

function LiquidWord({ word, index, isLast, registerRef, target }: LiquidWordProps) {
  const x = useSpring(target.x, springConfig);
  const y = useSpring(target.y, springConfig);
  const rotate = useSpring(target.rotate, springConfig);
  const scale = useSpring(target.scale, springConfig);

  return (
    <motion.span
      ref={(node) => {
        registerRef(index, node);
      }}
      style={{ x, y, rotate, scale, transformOrigin: "center center" }}
      className={`inline-block cursor-default select-none will-change-transform${isLast ? "" : " mr-[0.32em]"}`}
    >
      {word}
    </motion.span>
  );
}

export default function LiquidHeadline({ children, className = "" }: LiquidHeadlineProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const words = useMemo(() => children.trim().split(/\s+/).filter(Boolean), [children]);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const centersRef = useRef<WordCenter[]>([]);

  const motionTargets = useMemo<WordMotionTargets[]>(
    () =>
      words.map(() => ({
        x: motionValue(0),
        y: motionValue(0),
        rotate: motionValue(0),
        scale: motionValue(1)
      })),
    [words]
  );

  const registerRef = useCallback((index: number, element: HTMLSpanElement | null) => {
    wordRefs.current[index] = element;
  }, []);

  const measureCenters = useCallback(() => {
    centersRef.current = wordRefs.current.map((element) => {
      if (!element) {
        return { x: 0, y: 0 };
      }

      const rect = element.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    });
  }, []);

  const resetTransforms = useCallback(() => {
    motionTargets.forEach((target) => {
      target.x.set(0);
      target.y.set(0);
      target.rotate.set(0);
      target.scale.set(1);
    });
  }, [motionTargets]);

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLSpanElement>) => {
      if (prefersReducedMotion) {
        return;
      }

      if (centersRef.current.length !== words.length) {
        measureCenters();
      }

      const pointerX = event.clientX;
      const pointerY = event.clientY;

      motionTargets.forEach((target, index) => {
        const center = centersRef.current[index];
        if (!center) {
          return;
        }

        const deltaX = pointerX - center.x;
        const deltaY = pointerY - center.y;
        const distance = Math.hypot(deltaX, deltaY);
        const proximity = smoothStep(1 - distance / INFLUENCE_RADIUS);

        if (proximity <= 0) {
          target.x.set(0);
          target.y.set(0);
          target.rotate.set(0);
          target.scale.set(1);
          return;
        }

        const safeDistance = distance || 1;
        const directionX = deltaX / safeDistance;
        const directionY = deltaY / safeDistance;

        const x = directionX * MAX_TRANSLATE * proximity;
        const y = directionY * (MAX_TRANSLATE * 0.72) * proximity;
        const rotate = clamp((deltaX * 0.016 - deltaY * 0.011) * proximity, -MAX_ROTATE, MAX_ROTATE);
        const scale = 1 + MAX_SCALE_BOOST * proximity;

        target.x.set(x);
        target.y.set(y);
        target.rotate.set(rotate);
        target.scale.set(scale);
      });
    },
    [measureCenters, motionTargets, prefersReducedMotion, words.length]
  );

  useEffect(() => {
    measureCenters();

    const handleViewportChange = () => {
      measureCenters();
    };

    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", handleViewportChange, { passive: true });

    return () => {
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange);
    };
  }, [measureCenters]);

  if (!words.length) {
    return null;
  }

  return (
    <span
      className={`relative inline-block ${className}`.trim()}
      onMouseEnter={measureCenters}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTransforms}
    >
      {words.map((word, index) => (
        <LiquidWord
          key={`${word}-${index}`}
          word={word}
          index={index}
          isLast={index === words.length - 1}
          registerRef={registerRef}
          target={motionTargets[index]}
        />
      ))}
    </span>
  );
}
