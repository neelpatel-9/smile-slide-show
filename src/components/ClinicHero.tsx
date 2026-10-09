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
      <div className="clinic-hero-inner">
        <motion.div {...reveal(0.1)} className="clinic-hero-top">
          <p>Dental Den · Hennur, Bengaluru</p>
          <p>Est. 2010</p>
        </motion.div>
        <div className="clinic-hero-content">
          <motion.h1 {...reveal(0.25)} className="clinic-hero-title"><span>Dental Den.</span><span>Your smile.</span><em>Our craft.</em></motion.h1>
          <motion.div {...reveal(0.5)} className="clinic-hero-actions">
            <p className="clinic-hero-copy">Personal care. Thoughtful dentistry. Dr. Lakshmi Roopesh and her team design smiles around you — with a gentle touch and a little artistry.</p>
            <div className="clinic-hero-book">
              <SlideToConfirm label="Book an appointment" confirmedLabel="Opening booking" onConfirm={() => navigate({ to: "/contact" })} />
              <SlideToConfirm label="Explore our services" confirmedLabel="Opening services" tone="ink" onConfirm={() => navigate({ to: "/services" })} />
            </div>
          </motion.div>
        </div>
        <motion.figure {...reveal(0.65)} className="clinic-hero-image">
          <img className="clinic-hero-photo" src={operatory} alt="Dental Den treatment room with a dental chair, warm wood cabinetry and natural light" fetchPriority="high" />
          <figcaption className="clinic-hero-caption"><span>A quieter kind of care.</span><span>Inside Dental Den · 01</span></figcaption>
        </motion.figure>
      </div>
    </section>
  );
}