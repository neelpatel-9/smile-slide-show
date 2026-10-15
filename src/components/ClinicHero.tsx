import { motion, useReducedMotion } from "framer-motion";
import operatory from "@/assets/treatment-2.jpg";

export function ClinicHero() {
  const reduceMotion = useReducedMotion();
  const reveal = (delay: number) => ({
    initial: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : delay },
  });

  return (
    <section className="clinic-hero" aria-label="Welcome to Dental Den">
      <img className="clinic-hero-photo" src={operatory} alt="Dental Den treatment room with a dental chair, warm wood cabinetry and natural light" fetchPriority="high" />
      <div className="clinic-hero-inner">
        <motion.div {...reveal(0.1)} className="clinic-hero-top">
          <p>Dental Den · Hennur, Bengaluru</p>
        </motion.div>
        <div className="clinic-hero-content">
          <motion.h1 {...reveal(0.25)} className="clinic-hero-title"><span>We design</span><span>your <em>smile</em>,</span><span>not just teeth.</span></motion.h1>
          <motion.div {...reveal(0.5)} className="clinic-hero-actions">
            <p className="clinic-hero-copy">Personal care. Thoughtful dentistry. Dr. Lakshmi Roopesh and her team design smiles around you — with a gentle touch and a little artistry.</p>
          </motion.div>
        </div>
        <motion.p {...reveal(0.65)} className="clinic-hero-caption">Est. 2010 · Dr. Lakshmi Roopesh</motion.p>
      </div>
    </section>
  );
}