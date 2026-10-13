import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";
import { PageShell } from "@/components/SiteChrome";
import { SlideToConfirm } from "@/components/SlideToConfirm";

export const Route = createFileRoute("/den-care")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Den Care Membership — Your Smile, Covered Year-Round" },
      { name: "description", content: "Three-tier annual dental membership from Dental Den, Hennur. Cleanings, checkups, and priority booking treated like a product, not an afterthought." },
      { property: "og:title", content: "Den Care — Dental Den" },
      { property: "og:description", content: "Preventive dental care as a subscription. From ₹4,999/year." },
    ],
  }),
  component: DenCare,
});

const PLANS = [
  {
    name: "Basic",
    price: 4999,
    tag: "Preventive",
    tagline: "Cleanings & check-ups.",
    features: ["2 professional cleanings / yr", "2 dental check-ups / yr", "10% off any treatment", "Priority booking window", "WhatsApp concierge"],
  },
  {
    name: "Classic",
    price: 9999,
    tag: "Most Chosen",
    tagline: "Everything preventive, plus.",
    features: ["All of Basic", "1 whitening session / yr", "2 emergency visits / yr", "20% off any treatment", "Free digital X-rays", "Priority booking window"],
    featured: true,
  },
  {
    name: "Premium",
    price: 18999,
    tag: "Family",
    tagline: "For the whole household.",
    features: ["All of Classic", "Coverage for 2 family members", "4 emergency visits / yr", "30% off any treatment", "Complimentary smile assessment", "Concierge follow-ups"],
  },
];

function DenCare() {
  const [chosen, setChosen] = useState("Classic");
  return (
    <PageShell>
      <section className="px-6 lg:px-10 pt-16 pb-24 bg-ink text-ivory grain relative overflow-hidden">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-primary/30 blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="mx-auto max-w-[1400px] grid lg:grid-cols-12 gap-12 items-end relative">
          <div className="lg:col-span-8">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">— Launching July 2026</p>
            <h1 className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.95]">
              Your smile,<br />
              <em className="text-primary not-italic">covered</em><br />
              year-round.
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-lg text-ivory/70 leading-relaxed">Den Care turns dentistry from something you postpone into something you already own. One flat annual fee. Predictable, transparent, and designed for how Bengaluru actually lives.</p>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-24">
        <div className="mx-auto max-w-[1400px] grid lg:grid-cols-3 gap-6">
          {PLANS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setChosen(p.name)}
              className={`rounded-[2rem] p-8 border cursor-pointer transition-all relative overflow-hidden ${
                chosen === p.name
                  ? "bg-ink text-ivory border-ink scale-[1.02] shadow-2xl"
                  : "bg-ivory border-ink/10 hover:border-primary/40"
              }`}
            >
              {p.featured && (
                <div className="absolute top-6 right-6 text-[10px] uppercase tracking-[0.3em] bg-primary text-primary-foreground rounded-full px-3 py-1">
                  {p.tag}
                </div>
              )}
              <p className={`text-xs uppercase tracking-[0.3em] ${chosen === p.name ? "text-primary" : "text-primary"}`}>{p.tag}</p>
              <h3 className="font-display text-5xl mt-6">{p.name}</h3>
              <p className={`mt-2 text-sm ${chosen === p.name ? "text-ivory/60" : "text-ink/60"}`}>{p.tagline}</p>
              <div className="mt-8 flex items-baseline gap-1">
                <span className="font-display text-6xl">₹{p.price.toLocaleString()}</span>
                <span className={chosen === p.name ? "text-ivory/60" : "text-ink/60"}>/year</span>
              </div>
              <ul className={`mt-10 space-y-3 text-sm ${chosen === p.name ? "text-ivory/80" : "text-ink/70"}`}>
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3 items-start">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <SlideToConfirm
                  label={`Choose ${p.name}`}
                  confirmedLabel="Setting you up"
                  tone={chosen === p.name ? "ivory" : "primary"}
                  onConfirm={() => (window.location.href = "/contact")}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-10 py-24 bg-cream grain">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">— The math</p>
          <h2 className="font-display text-5xl lg:text-6xl">Break-even<br />in two <em className="text-primary not-italic">visits.</em></h2>
          <p className="mt-6 text-ink/70">Two annual cleanings alone cover the Basic plan. Add a whitening and Classic pays for itself. Add a family and Premium is the obvious call.</p>
          <div className="mt-10 max-w-md mx-auto">
            <SlideToConfirm label="Talk to the team" onConfirm={() => (window.location.href = "/contact")} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}