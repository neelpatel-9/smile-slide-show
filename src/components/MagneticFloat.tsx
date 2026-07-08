import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps children in a floating element that also drifts toward the cursor.
 * - `strength`: max px it can move toward the cursor (default 18)
 * - `delayClass`: optional float-delay-N utility for staggering
 * - `variant`: "float" (image) or "badge" (service card)
 */
export function MagneticFloat({
  children,
  strength = 18,
  delayClass = "",
  variant = "float",
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  delayClass?: string;
  variant?: "float" | "badge";
  className?: string;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = outerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      // Normalise by viewport diagonal so far-away cursor still nudges gently.
      const dx = (e.clientX - cx) / window.innerWidth;
      const dy = (e.clientY - cy) / window.innerHeight;
      target.current.x = Math.max(-1, Math.min(1, dx * 2)) * strength;
      target.current.y = Math.max(-1, Math.min(1, dy * 2)) * strength;
    };
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${current.current.x.toFixed(2)}px, ${current.current.y.toFixed(2)}px, 0)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [strength]);

  const floatClass = variant === "badge" ? "float-badge" : "float";
  return (
    <div ref={outerRef} className={className} style={{ transition: "transform 300ms ease-out" }}>
      <div ref={innerRef} style={{ willChange: "transform" }}>
        <div className={`${floatClass} ${delayClass}`}>{children}</div>
      </div>
    </div>
  );
}