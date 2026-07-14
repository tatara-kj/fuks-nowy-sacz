"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { Brand } from "@/components/brand";

export function SiteExperience() {
  const reduced = useReducedMotion();
  const [loading, setLoading] = useState(true);
  const [finePointer, setFinePointer] = useState(false);
  const cursorX = useMotionValue(-50);
  const cursorY = useMotionValue(-50);
  const smoothX = useSpring(cursorX, { stiffness: 700, damping: 45, mass: 0.2 });
  const smoothY = useSpring(cursorY, { stiffness: 700, damping: 45, mass: 0.2 });
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    const sync = () => setFinePointer(query.matches);
    sync();
    query.addEventListener("change", sync);
    const timeout = window.setTimeout(() => setLoading(false), reduced ? 120 : 900);
    return () => {
      query.removeEventListener("change", sync);
      window.clearTimeout(timeout);
    };
  }, [reduced]);

  useEffect(() => {
    if (!finePointer || reduced) return;
    const move = (event: PointerEvent) => {
      cursorX.set(event.clientX - 6);
      cursorY.set(event.clientY - 6);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [cursorX, cursorY, finePointer, reduced]);

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: smoothProgress }} aria-hidden="true" />
      {finePointer && !reduced && (
        <motion.div className="cursor-dot" style={{ x: smoothX, y: smoothY }} aria-hidden="true" />
      )}

      <AnimatePresence>
        {loading && (
          <motion.div
            className="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduced ? 0.1 : 0.65, ease: [0.76, 0, 0.24, 1] }}
            aria-hidden="true"
          >
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Brand inverted />
            </motion.div>
            <div className="loader-road">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: reduced ? 0.05 : 0.7, ease: [0.65, 0, 0.35, 1] }}
              />
            </div>
            <small>NOWY SĄCZ · GOTOWI DO DROGI</small>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

