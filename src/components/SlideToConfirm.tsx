import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

type Tone = "primary" | "ink" | "ivory" | "ghost" | "cinematic";

interface Props {
  label: string;
  confirmedLabel?: string;
  onConfirm: () => void;
  tone?: Tone;
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  fullWidth?: boolean;
  resetAfter?: number;
}

const toneStyles: Record<Tone, { track: string; thumb: string; text: string; done: string }> = {
  cinematic: {
    track: "bg-ink border border-ivory/10",
    thumb: "bg-primary text-primary-foreground",
    text: "text-ivory",
    done: "bg-primary text-primary-foreground",
  },
  primary: {
    track: "bg-primary/10 border border-primary/30",
    thumb: "bg-primary text-primary-foreground shadow-[0_10px_30px_-8px_oklch(0.52_0.19_27/0.6)]",
    text: "text-primary",
    done: "bg-primary text-primary-foreground",
  },
  ink: {
    track: "bg-ink/5 border border-ink/15",
    thumb: "bg-ink text-ivory",
    text: "text-ink",
    done: "bg-ink text-ivory",
  },
  ivory: {
    track: "bg-ivory/10 border border-ivory/25 backdrop-blur",
    thumb: "bg-ivory text-ink",
    text: "text-ivory",
    done: "bg-ivory text-ink",
  },
  ghost: {
    track: "bg-cream border border-ink/10",
    thumb: "bg-ink text-ivory",
    text: "text-ink/70",
    done: "bg-ink text-ivory",
  },
};

const sizeStyles = {
  sm: { h: "h-11", pad: "pl-12 pr-4", thumb: "w-10 h-9", text: "text-xs tracking-[0.2em]" },
  md: { h: "h-14", pad: "pl-16 pr-5", thumb: "w-14 h-12", text: "text-[11px] tracking-[0.25em]" },
  lg: { h: "h-16", pad: "pl-20 pr-6", thumb: "w-16 h-14", text: "text-xs tracking-[0.28em]" },
};

export function SlideToConfirm({
  label,
  confirmedLabel = "Confirmed",
  onConfirm,
  tone = "primary",
  size = "md",
  icon,
  fullWidth = true,
  resetAfter = 1800,
}: Props) {
  const t = toneStyles[tone];
  const s = sizeStyles[size];
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [max, setMax] = useState(0);
  const [done, setDone] = useState(false);
  const progress = useTransform(x, [0, Math.max(max, 1)], [0, 1]);
  const fillWidth = useTransform(progress, (p) => `${p * 100}%`);
  const labelOpacity = useTransform(progress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const update = () => {
      if (!trackRef.current) return;
      const w = trackRef.current.offsetWidth;
      const thumbW = size === "lg" ? 64 : size === "sm" ? 40 : 56;
      setMax(w - thumbW - 8);
    };
    update();
    const ro = new ResizeObserver(update);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [size]);

  return (
    <div
      ref={trackRef}
      className={`relative ${s.h} ${fullWidth ? "w-full" : "w-72"} rounded-full ${t.track} overflow-hidden select-none ${done ? t.done : ""} transition-colors`}
      role="button"
      aria-label={label}
    >
      <motion.div
        className="absolute inset-y-0 left-0 bg-primary/15"
        style={{ width: fillWidth }}
      />
      <motion.span
        style={{ opacity: done ? 1 : labelOpacity }}
        className={`absolute inset-0 flex items-center justify-center ${s.pad} font-medium uppercase ${s.text} ${done ? (tone === "ivory" ? "text-ink" : "text-primary-foreground") : t.text}`}
      >
        {done ? (
          <span className="flex items-center gap-2">
            <Check className="h-4 w-4" /> {confirmedLabel}
          </span>
        ) : (
          <span className="flex items-center gap-2">
            {icon}
            {label}
          </span>
        )}
      </motion.span>
      <motion.button
        drag={done ? false : "x"}
        dragConstraints={{ left: 0, right: max }}
        dragElastic={0.02}
        dragMomentum={false}
        style={{ x }}
        onDragEnd={() => {
          if (x.get() > max * 0.85) {
            animate(x, max, { duration: 0.15 });
            setDone(true);
            onConfirm();
            if (resetAfter > 0) {
              setTimeout(() => {
                setDone(false);
                animate(x, 0, { duration: 0.4 });
              }, resetAfter);
            }
          } else {
            animate(x, 0, { type: "spring", stiffness: 400, damping: 30 });
          }
        }}
        whileTap={{ scale: 0.97 }}
        className={`absolute top-1 left-1 ${s.thumb} rounded-full grid place-items-center cursor-grab active:cursor-grabbing ${t.thumb}`}
        aria-label="Slide to confirm"
      >
        {done ? <Check className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
      </motion.button>
    </div>
  );
}