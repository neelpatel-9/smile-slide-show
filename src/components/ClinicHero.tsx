import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { SlideToConfirm } from "@/components/SlideToConfirm";
import operatory from "@/assets/treatment-2.jpg";

export function ClinicHero() {
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const reveal = (delay: number) => ({
    initial: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : delay },
  });

  return (
    <section className="clinic-hero" aria-label="Welcome to Dental Den">
      <img className="clinic-hero-photo" src={operatory} alt="Dental treatment room with a dental chair, warm wood cabinetry and natural light" fetchPriority="high" />
      <div className="clinic-hero-shade" />
      <div className="clinic-hero-inner">
        <motion.div {...reveal(0.1)} className="clinic-hero-top">
          <p className="flex items-center gap-2.5"><span className="clinic-hero-dot" />Inside Dental Den</p>
          <p className="text-right"><span className="block text-ivory/60 mb-1.5">Hennur · Bengaluru</span><span className="font-display text-base italic normal-case">A quieter kind of care.</span></p>
        </motion.div>
        <div className="clinic-hero-content">
          <motion.p {...reveal(0.2)} className="clinic-hero-eyebrow"><span className="clinic-hero-dot" />Premium esthetic dentistry · Hennur, Bengaluru</motion.p>
          <motion.h1 {...reveal(0.35)} className="clinic-hero-title">We design<br />your <em>smile,</em> not just teeth.</motion.h1>
          <motion.div {...reveal(0.5)} className="clinic-hero-actions">
            <p className="clinic-hero-copy">Sixteen years. Twenty-five thousand smiles. One quiet clinic in Hennur where every treatment starts with listening.</p>
            <div className="clinic-hero-book"><SlideToConfirm label="Slide to book" confirmedLabel="Opening booking" tone="cinematic" onConfirm={() => navigate({ to: "/contact" })} /></div>
          </motion.div>
        </div>
        <motion.div {...reveal(0.65)} className="clinic-hero-bottom">
          <p>Est. 2010 <span className="mx-4 text-ivory/40">·</span> Dr. Lakshmi Roopesh</p>
          <span className="clinic-hero-scroll">Scroll<span className="clinic-hero-scroll-line" /></span>
        </motion.div>
      </div>
    </section>
  );
}