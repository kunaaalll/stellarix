# Stellarix – Luxury Eyewear

## Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **3D**: Three.js + React Three Fiber
- **3D helpers**: @react-three/drei
- **Animations**: Framer Motion
- **Scroll effects**: GSAP + ScrollTrigger (@gsap/react)

## Coding rules
- Modular components
- No large files above 200 lines
- Reusable UI components
- Functional React components only
- No inline CSS
- Optimize performance

## 3D rules
- Use React Three Fiber
- Lazy load 3D scenes (dynamic import, ssr: false)
- Avoid heavy polygon models
- Use Suspense fallback for 3D

## Animation rules
- Framer Motion for UI/entrance animations
- GSAP + ScrollTrigger for scroll-driven effects (parallax, reveal, pin)
- Keep animations smooth and minimal
- Respect prefers-reduced-motion where applicable
