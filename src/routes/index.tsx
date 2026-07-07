import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Star, Sparkles, Award, Users, ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/SiteChrome";
import { SlideToConfirm } from "@/components/SlideToConfirm";
import drLakshmi from "@/assets/dr-lakshmi.jpg";
import smileMacro from "@/assets/smile-macro.jpg";
import clinic from "@/assets/clinic-interior.jpg";

export const Route = createFileRoute("/")({ component: Index });

const SERVICES = [
  { name: "Smile Design", tag: "Signature", desc: "Veneers, whitening, contouring — designed around your face.", to: "/services/smile-design" },
  { name: "Dental Implants", tag: "Osstem · Nobel", desc: "Fellowship-trained implants that look and feel like your own.", to: "/services/dental-implants" },
  { name: "Root Canal", tag: "Microscopic", desc: "Painless endodontics under a surgical microscope.", to: "/services/root-canal" },
  { name: "Orthodontics", tag: "Aligners & Braces", desc: "Discreet clear aligners for adults and teens.", to: "/services" },
  { name: "Laser Dentistry", tag: "Precision", desc: "Faster healing, less bleeding, no drills where possible.", to: "/services" },
  { name: "Pediatric Care", tag: "Gentle", desc: "First visits that feel like play, not a procedure.", to: "/services" },
];

const REVIEWS = [
  { name: "Ananya S.", city: "Indiranagar", text: "Didn't feel like a dental clinic. Dr. Lakshmi and her team made my smile design journey feel curated, not clinical.", rating: 5 },
  { name: "Rahul M.", city: "HBR Layout", text: "Two implants, zero pain. The microscope work is on another level — you can feel the precision.", rating: 5 },
  { name: "Joanna K.", city: "Warsaw", text: "Flew from Poland for veneers. Worth every kilometre. Warm, honest, world-class.", rating: 5 },
];

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  return (
    <motion.span
      ref={ref}
      onViewportEnter={() => {
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / 1400);
          setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }}
      viewport={{ once: true }}
    >
      {n.toLocaleString()}{suffix}
    </motion.span>
  );
}

function BeforeAfter() {
  const [pos, setPos] = useState(50);
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl cursor-ew-resize select-none bg-cream"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos(Math.max(4, Math.min(96, ((e.clientX - r.left) / r.width) * 100)));
      }}
      onTouchMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos(Math.max(4, Math.min(96, ((e.touches[0].clientX - r.left) / r.width) * 100)));
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cream to-ink/20 grid place-items-center">
        <span className="text-ink/50 text-sm tracking-[0.3em] uppercase">Before</span>
      </div>
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      >
        <img src={smileMacro} alt="After smile design" className="w-full h-full object-cover" />
        <div className="absolute top-6 right-6 rounded-full bg-ivory/90 px-4 py-1.5 text-[10px] tracking-[0.3em] uppercase">After</div>
      </div>
      <div
        className="absolute top-0 bottom-0 w-px bg-ivory shadow-[0_0_20px_rgba(0,0,0,0.4)]"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-ivory grid place-items-center shadow-xl">
          <div className="flex gap-0.5">
            <span className="w-1 h-4 bg-ink/40 rounded-full" />
            <span className="w-1 h-4 bg-ink/40 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Index() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <PageShell>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[92vh] px-6 lg:px-10 pt-10 pb-20">
        <div className="mx-auto max-w-[1400px] grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ivory/60 backdrop-blur px-4 py-1.5 text-[11px] uppercase tracking-[0.25em]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Premium esthetic dentistry · Hennur, Bengaluru
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="mt-8 font-display text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.95]"
            >
              We design<br />
              your <em className="text-primary not-italic">smile,</em><br />
              not just teeth.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.8 }}
              className="mt-8 max-w-lg text-lg text-ink/70 leading-relaxed"
            >
              Sixteen years. Twenty-five thousand smiles. One quiet clinic in Hennur where every treatment starts with listening — and every button here starts with a slide.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-10 max-w-md space-y-3"
            >
              <SlideToConfirm
                label="Slide to book an appointment"
                confirmedLabel="Taking you to booking"
                size="lg"
                onConfirm={() => (window.location.href = "/contact")}
              />
              <p className="text-xs text-ink/50 tracking-wide pl-1">
                Every action on this site is a deliberate slide. Because your smile deserves deliberate care.
              </p>
            </motion.div>
          </div>
          <div className="lg:col-span-5 relative">
            <motion.div
              style={{ y, scale }}
              className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <img src={drLakshmi} alt="Dr. Lakshmi, Founder & Dental Surgeon" className="w-full h-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent" />
              <div className="absolute bottom-6 left-6 text-ivory">
                <p className="text-[10px] uppercase tracking-[0.3em] opacity-80">Founder</p>
                <p className="font-display text-2xl mt-1">Dr. Lakshmi Roopesh</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="hidden lg:flex absolute -left-16 top-1/3 rotate-[-90deg] origin-left items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-ink/40"
            >
              <span className="h-px w-10 bg-ink/30" />
              Est. 2010 · Bengaluru
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUST MARQUEE */}
      <section className="bg-ink text-ivory overflow-hidden">
        <div className="flex marquee whitespace-nowrap py-6 gap-16 text-lg font-display">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 shrink-0">
              {["16 Years of Practice", "25,000+ Patients", "4.7★ Google Rating", "70% Referral Rate", "Zero Malpractice", "NYU · Osstem · Nobel Biocare"].map((t) => (
                <span key={t} className="flex items-center gap-16">
                  {t}
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="px-6 lg:px-10 py-24">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-4 gap-8">
          {[
            { n: 16, s: "+", label: "Years of practice" },
            { n: 25000, s: "+", label: "Registered patients" },
            { n: 47, s: "★", label: "Google rating (÷10)", note: "4.7 stars" },
            { n: 70, s: "%", label: "Word-of-mouth referrals" },
          ].map((k) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="border-t border-ink/15 pt-6"
            >
              <div className="font-display text-6xl text-primary">
                <Counter to={k.n} suffix={k.s} />
              </div>
              <p className="mt-3 text-sm text-ink/60">{k.note ?? k.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-6 lg:px-10 py-24 bg-cream grain">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">— Six ways in</p>
              <h2 className="font-display text-5xl lg:text-7xl max-w-2xl leading-[1]">
                How can we<br />help you today?
              </h2>
            </div>
            <Link to="/services" className="group flex items-center gap-2 text-sm uppercase tracking-[0.2em]">
              All services <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              >
                <Link
                  to={s.to}
                  className="group block relative bg-ivory rounded-3xl p-8 border border-ink/8 hover:border-primary/30 transition-all h-full overflow-hidden"
                >
                  <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-primary/8 blur-3xl opacity-0 group-hover:opacity-100 transition" />
                  <div className="flex items-center justify-between relative">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-primary">{s.tag}</span>
                    <ArrowUpRight className="h-5 w-5 text-ink/40 group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1 transition" />
                  </div>
                  <h3 className="font-display text-3xl mt-14 relative">{s.name}</h3>
                  <p className="mt-3 text-sm text-ink/60 relative">{s.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER SPLIT */}
      <section className="px-6 lg:px-10 py-32">
        <div className="mx-auto max-w-[1400px] grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <motion.img
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              src={clinic}
              alt="Dental Den clinic interior in Hennur"
              className="rounded-3xl w-full aspect-[4/3] object-cover"
              loading="lazy"
            />
            <div className="absolute -bottom-8 -right-4 lg:right-8 bg-ivory rounded-2xl p-6 shadow-xl border border-ink/8 max-w-[240px]">
              <div className="flex gap-0.5 text-primary">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-3 text-sm italic">"It felt like a hotel, not a hospital."</p>
              <p className="mt-2 text-xs text-ink/50">— Priya, Google review</p>
            </div>
          </div>
          <div className="lg:col-span-6">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">— The philosophy</p>
            <h2 className="font-display text-5xl lg:text-6xl leading-[1.05]">
              Conservative first.<br />
              <em className="text-primary not-italic">Never</em> over-treated.
            </h2>
            <p className="mt-8 text-lg text-ink/70 leading-relaxed max-w-lg">
              Dr. Lakshmi trained under Dr. Sandesh Mayekar and holds fellowships from NYU, Osstem and Nobel Biocare. But the credential we care about most is our eighth core value: <em>Autonomy</em> — you always keep the right to choose.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["BDS", "NYU Aesthetic Dentistry", "Osstem Implant", "Nobel Biocare", "Microscopic Endodontics"].map((c) => (
                <span key={c} className="px-4 py-2 rounded-full border border-ink/15 text-xs uppercase tracking-wider">{c}</span>
              ))}
            </div>
            <div className="mt-10 max-w-sm">
              <SlideToConfirm
                label="Meet Dr. Lakshmi"
                tone="ink"
                confirmedLabel="Opening her story"
                onConfirm={() => (window.location.href = "/about")}
              />
            </div>
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="px-6 lg:px-10 py-24 bg-cream">
        <div className="mx-auto max-w-[1400px] grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">— Drag it yourself</p>
            <h2 className="font-display text-5xl lg:text-6xl leading-[1.05]">
              Every smile,<br />designed.
            </h2>
            <p className="mt-6 text-ink/70 max-w-md">Move the handle. This is real work from our smile design suite — veneers, whitening and gentle contouring, choreographed to your face.</p>
            <div className="mt-8 max-w-sm">
              <SlideToConfirm
                label="Explore Smile Design"
                onConfirm={() => (window.location.href = "/services/smile-design")}
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <BeforeAfter />
          </div>
        </div>
      </section>

      {/* DEN CARE TEASER */}
      <section className="px-6 lg:px-10 py-24">
        <div className="mx-auto max-w-[1400px] rounded-[2rem] bg-ink text-ivory p-10 lg:p-16 grain relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
          <div className="grid lg:grid-cols-12 gap-10 items-center relative">
            <div className="lg:col-span-7">
              <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4 flex items-center gap-2">
                <Sparkles className="h-3 w-3" /> New · July 2026
              </p>
              <h2 className="font-display text-5xl lg:text-7xl leading-[1]">
                Den Care — your<br />
                smile, <em className="text-primary not-italic">covered</em><br />
                year-round.
              </h2>
              <p className="mt-8 text-ivory/70 max-w-lg">Three tiers. One flat annual fee. Cleanings, check-ups, and priority booking — treated like a product, not an afterthought.</p>
            </div>
            <div className="lg:col-span-5 space-y-3">
              {[
                { name: "Basic", price: "₹4,999", peri: "/yr" },
                { name: "Classic", price: "₹9,999", peri: "/yr", featured: true },
                { name: "Premium", price: "₹18,999", peri: "/yr" },
              ].map((p) => (
                <div key={p.name} className={`flex items-center justify-between rounded-2xl border px-6 py-4 ${p.featured ? "bg-primary text-primary-foreground border-primary" : "border-ivory/15"}`}>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] opacity-70">{p.featured ? "Most Chosen" : "Plan"}</p>
                    <p className="font-display text-2xl">{p.name}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-display text-3xl">{p.price}</span>
                    <span className="text-xs opacity-70">{p.peri}</span>
                  </div>
                </div>
              ))}
              <div className="pt-4">
                <SlideToConfirm
                  label="Explore Den Care"
                  tone="ivory"
                  onConfirm={() => (window.location.href = "/den-care")}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="px-6 lg:px-10 py-24 bg-cream">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">— 4.7★ from 183 reviews</p>
              <h2 className="font-display text-5xl lg:text-7xl leading-[1]">Trust,<br />in their words.</h2>
            </div>
            <Link to="/reviews" className="text-sm uppercase tracking-[0.2em] underline underline-offset-8">All reviews</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-ivory rounded-3xl p-8 border border-ink/8"
              >
                <div className="flex gap-0.5 text-primary mb-4">
                  {[...Array(r.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="font-display text-2xl leading-snug">"{r.text}"</p>
                <div className="mt-6 pt-6 border-t border-ink/10 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{r.name}</p>
                    <p className="text-xs text-ink/50">{r.city}</p>
                  </div>
                  <Award className="h-4 w-4 text-ink/30" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-6 lg:px-10 py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Users className="h-6 w-6 text-primary mx-auto mb-6" />
          <h2 className="font-display text-5xl lg:text-7xl leading-[1]">
            Ready when<br />you are.
          </h2>
          <p className="mt-6 text-ink/70">Slide below. We'll take it from there — a warm, unhurried consultation with Dr. Lakshmi's team.</p>
          <div className="mt-10 max-w-md mx-auto">
            <SlideToConfirm
              label="Slide to begin"
              size="lg"
              confirmedLabel="See you soon"
              onConfirm={() => (window.location.href = "/contact")}
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
