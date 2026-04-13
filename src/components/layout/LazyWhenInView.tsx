"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

interface LazyWhenInViewProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
}

export function LazyWhenInView({ children, fallback = null, rootMargin = "200px" }: LazyWhenInViewProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin, threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref}>
      {inView ? children : fallback}
    </div>
  );
}
