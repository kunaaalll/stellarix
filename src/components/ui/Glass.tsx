"use client";

import { type ReactNode } from "react";

interface GlassProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
}

export function Glass({ children, className = "", as: Tag = "div" }: GlassProps) {
  return (
    <Tag
      className={className}
      style={{
        background: "var(--color-bg-elevated)",
        border: "0.5px solid var(--color-border-light)",
      }}
    >
      {children}
    </Tag>
  );
}
