"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout";
import { Glass } from "@/components/ui";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const formspreeEndpoint =
    process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "https://formspree.io/f/mnjlnjng";
  const [toast, setToast] = useState<{ open: boolean; type: "success" | "error"; message: string }>(
    { open: false, type: "success", message: "" }
  );
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    };
  }, []);

  function showToast(next: { type: "success" | "error"; message: string }) {
    setToast({ open: true, ...next });
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => {
      setToast((t) => (t.open ? { ...t, open: false } : t));
    }, 4500);
  }

  return (
    <section
      id="contact"
      className="bg-background py-24 md:py-32"
      aria-label="Contact"
    >
      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="font-display font-light text-foreground tracking-tight md:text-4xl"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
            }}
          >
            Contact
          </h2>
          <p className="mt-6 font-body text-[0.95rem] text-foreground-secondary leading-relaxed">
            Reach out for partnerships, bespoke fittings, or to learn more about Elaris precision optics.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Glass className="rounded-[12px] p-6 text-center">
            <p className="font-body text-[0.7rem] tracking-[0.4em] text-foreground-muted">Headquarters</p>
            <p className="mt-2 font-body text-foreground-muted">Stellarix Optics</p>
          </Glass>
          <Glass className="rounded-[12px] p-6 text-center">
            <p className="font-body text-[0.7rem] tracking-[0.4em] text-foreground-muted">Email</p>
            <a
              href="mailto:hello@stellarix.com"
              className="mt-2 block font-body text-foreground-secondary transition-colors duration-300 hover:text-foreground"
            >
              hello@stellarix.com
            </a>
          </Glass>
          <Glass className="rounded-[12px] p-6 text-center sm:col-span-2 lg:col-span-1">
            <p className="font-body text-[0.7rem] tracking-[0.4em] text-foreground-muted">Brand</p>
            <p className="mt-2 font-body text-foreground-secondary">Elaris by Stellarix</p>
          </Glass>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (status === "sending") return;
            setStatus("sending");

            const form = e.currentTarget;
            const data = new FormData(form);

            try {
              if (!formspreeEndpoint) {
                const name = String(data.get("name") ?? "");
                const email = String(data.get("email") ?? "");
                const message = String(data.get("message") ?? "");
                const subject = encodeURIComponent("Stellarix contact form");
                const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
                window.location.href = `mailto:hello@stellarix.com?subject=${subject}&body=${body}`;
                setStatus("success");
                showToast({ type: "success", message: "Opening your email client…" });
                return;
              }

              const res = await fetch(formspreeEndpoint, {
                method: "POST",
                headers: { Accept: "application/json" },
                body: data,
              });

              if (!res.ok) throw new Error("Failed to send");
              form.reset();
              setStatus("success");
              showToast({ type: "success", message: "Message sent. We’ll get back to you shortly." });
            } catch {
              setStatus("error");
              showToast({
                type: "error",
                message: "Something went wrong. Please try again or email hello@stellarix.com.",
              });
            }
          }}
          className="mx-auto mt-12 grid max-w-lg gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
            aria-label="Your name"
            className="w-full rounded-[6px] border border-border bg-background-elevated px-4 py-3 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            aria-label="Your email"
            className="w-full rounded-[6px] border border-border bg-background-elevated px-4 py-3 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <textarea
            name="message"
            placeholder="Your message"
            rows={4}
            required
            aria-label="Your message"
            className="w-full resize-none rounded-[6px] border border-border bg-background-elevated px-4 py-3 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input type="hidden" name="_subject" value="Stellarix — Contact form submission" />
          <button
            type="submit"
            disabled={status === "sending"}
            className="min-h-11 w-full rounded-[6px] bg-accent px-6 py-3.5 text-sm font-medium tracking-[0.18em] text-[var(--color-text-on-accent)] transition-colors hover:bg-accent-hover disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send Message"}
          </button>
        </form>

        <div
          className={[
            "pointer-events-none fixed bottom-5 left-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2",
            "sm:left-auto sm:right-5 sm:translate-x-0",
          ].join(" ")}
          aria-live="polite"
          aria-atomic="true"
        >
          {toast.open && (
            <div
              className={[
                "pointer-events-auto rounded-[12px] border px-4 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.35)]",
                "backdrop-blur-md",
                toast.type === "success"
                  ? "border-border bg-background-elevated text-foreground"
                  : "border-border bg-background-elevated text-foreground",
              ].join(" ")}
              role="status"
            >
              <div className="flex items-start gap-3">
                <div
                  className={[
                    "mt-1 h-2.5 w-2.5 rounded-full",
                    toast.type === "success" ? "bg-[var(--color-accent)]" : "bg-[var(--color-accent)]",
                  ].join(" ")}
                  aria-hidden="true"
                />
                <p className="flex-1 text-sm text-foreground-secondary">{toast.message}</p>
                <button
                  type="button"
                  onClick={() => setToast((t) => ({ ...t, open: false }))}
                  className="rounded-md px-2 py-1 text-xs text-foreground-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  aria-label="Dismiss notification"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
