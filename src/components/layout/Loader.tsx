"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SCAN_DURATION_MS = 500;
const FADE_OUT_MS = 200;

export function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setVisible(false);
    };
    window.addEventListener("pageshow", onPageShow);
    const t = setTimeout(() => setVisible(false), SCAN_DURATION_MS + FADE_OUT_MS);
    return () => {
      window.removeEventListener("pageshow", onPageShow);
      clearTimeout(t);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_OUT_MS / 1000, ease: "easeInOut" }}
          style={{ willChange: "opacity" }}
          aria-hidden
        >
          {/* Scanning line — transform-only to avoid CLS */}
          <motion.div
            className="absolute left-0 right-0 h-[3px] w-full bg-accent"
            style={{ willChange: "transform", boxShadow: "0 0 20px rgba(var(--color-bg-primary-rgb),0.3)" }}
            initial={{ y: 0 }}
            animate={{ y: "100vh" }}
            transition={{
              duration: SCAN_DURATION_MS / 1000,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
