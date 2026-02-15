"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type MouseEvent
} from "react";
import {
  motion,
  motionValue,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue
} from "framer-motion";

type LiquidTextProps = {
  children: string;
  className?: string;
  wordClassName?: string;
};

type WordCenter = {
  x: number;
  y: number;
};

type WordTarget = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
};

type LiquidWordProps = {
  word: string;
  index: number;
  isLast: boolean;
  target: WordTarget;
  wordClassName: string;
  registerRef: (index: number, element: HTMLSpanElement | null) => void;
};

const DEFAULT_CLASS =
  "inline-block cursor-default select-none will-change-transform";

const SPRING_CONFIG = {
  stiffness: 170,
  damping: 24,
  mass: 0.52
};

const INFLUENCE_RADIUS = 200;
const MAX_TRANSLATE_X = 4.6;
const MAX_TRANSLATE_Y = 3.8;
const MAX_ROTATE = 1.8;
const MAX_SCALE_BOOST = 0.022;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function smoothStep(value: number) {
  const t = clamp(value, 0, 1);
  return t * t * (3 - 2 * t);
}

function toWordList(value: string) {
  return value.trim().split(/\s+/).filter(Boolean);
}

function LiquidWord({
  word,
  index,
  isLast,
  target,
  wordClassName,
  registerRef
}: LiquidWordProps) {
  const x = useSpring(target.x, SPRING_CONFIG);
  const y = useSpring(target.y, SPRING_CONFIG);
  const rotate = useSpring(target.rotate, SPRING_CONFIG);
  const scale = useSpring(target.scale, SPRING_CONFIG);

  return (
    <motion.span
      ref={(node) => {
        registerRef(index, node);
      }}
      style={{ x, y, rotate, scale, transformOrigin: "center center" }}
      className={`inline-block will-change-transform${isLast ? "" : " mr-[0.32em]"} ${wordClassName}`.trim()}
    >
      {word}
    </motion.span>
  );
}

export default function LiquidText({
  children,
  className = "",
  wordClassName = ""
}: LiquidTextProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const words = useMemo(() => toWordList(children), [children]);

  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const centersRef = useRef<WordCenter[]>([]);
  const rafRef = useRef<number | null>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);

  const targets = useMemo<WordTarget[]>(
    () =>
      words.map(() => ({
        x: motionValue(0),
        y: motionValue(0),
        rotate: motionValue(0),
        scale: motionValue(1)
      })),
    [words]
  );

  const resetTransforms = useCallback(() => {
    targets.forEach((target) => {
      target.x.set(0);
      target.y.set(0);
      target.rotate.set(0);
      target.scale.set(1);
    });
  }, [targets]);

  const registerRef = useCallback((index: number, element: HTMLSpanElement | null) => {
    wordRefs.current[index] = element;
  }, []);

  const measureWordCenters = useCallback(() => {
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

  const applyTransforms = useCallback(
    (x: number, y: number) => {
      pointerX.set(x);
      pointerY.set(y);

      targets.forEach((target, index) => {
        const center = centersRef.current[index];
        if (!center) {
          return;
        }

        const deltaX = x - center.x;
        const deltaY = y - center.y;
        const distance = Math.hypot(deltaX, deltaY);
        const influence = smoothStep(1 - distance / INFLUENCE_RADIUS);

        if (influence <= 0) {
          target.x.set(0);
          target.y.set(0);
          target.rotate.set(0);
          target.scale.set(1);
          return;
        }

        const safeDistance = distance || 1;
        const directionX = deltaX / safeDistance;
        const directionY = deltaY / safeDistance;
        const rotationJitter = Math.sin((x + y + index * 17) * 0.018) * 0.35 * influence;

        target.x.set(directionX * MAX_TRANSLATE_X * influence);
        target.y.set(directionY * MAX_TRANSLATE_Y * influence);
        target.rotate.set(
          clamp((directionX * 1.2 - directionY * 1.1) * influence + rotationJitter, -MAX_ROTATE, MAX_ROTATE)
        );
        target.scale.set(1 + MAX_SCALE_BOOST * influence);
      });
    },
    [pointerX, pointerY, targets]
  );

  const runFrame = useCallback(() => {
    rafRef.current = null;

    const pointer = pointerRef.current;
    if (!pointer) {
      return;
    }

    applyTransforms(pointer.x, pointer.y);
  }, [applyTransforms]);

  const requestFrame = useCallback(() => {
    if (rafRef.current !== null) {
      return;
    }

    rafRef.current = window.requestAnimationFrame(runFrame);
  }, [runFrame]);

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLSpanElement>) => {
      if (prefersReducedMotion) {
        return;
      }

      if (centersRef.current.length !== words.length) {
        measureWordCenters();
      }

      pointerRef.current = { x: event.clientX, y: event.clientY };
      requestFrame();
    },
    [measureWordCenters, prefersReducedMotion, requestFrame, words.length]
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    measureWordCenters();

    const onViewportChange = () => {
      measureWordCenters();
    };

    window.addEventListener("resize", onViewportChange);
    window.addEventListener("scroll", onViewportChange, { passive: true });

    return () => {
      window.removeEventListener("resize", onViewportChange);
      window.removeEventListener("scroll", onViewportChange);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [measureWordCenters]);

  useEffect(() => {
    measureWordCenters();
    resetTransforms();
  }, [children, measureWordCenters, resetTransforms]);

  if (!words.length) {
    return null;
  }

  if (prefersReducedMotion) {
    return <span className={`${DEFAULT_CLASS} ${className}`.trim()}>{children}</span>;
  }

  return (
    <span
      className={`${DEFAULT_CLASS} ${className}`.trim()}
      onMouseEnter={measureWordCenters}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        pointerRef.current = null;
        resetTransforms();
      }}
    >
      {words.map((word, index) => (
        <LiquidWord
          key={`${word}-${index}`}
          word={word}
          index={index}
          isLast={index === words.length - 1}
          target={targets[index]}
          wordClassName={wordClassName}
          registerRef={registerRef}
        />
      ))}
    </span>
  );
}
