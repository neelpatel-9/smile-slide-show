import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageShell } from "@/components/SiteChrome";
import { SlideToConfirm } from "@/components/SlideToConfirm";
import clinic from "@/assets/clinic-interior.jpg";

export const Route = createFileRoute("/first-visit")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Your First Visit — Dental Den, Hennur" },
      { name: "description", content: "What to bring, what to expect, and how a new patient visit at Dental Den actually feels." },
      { property: "og:title", content: "Your First Visit — Dental Den" },
      { property: "og:description", content: "A warm, unhurried first appointment. Here's exactly what happens." },
    ],
  }),
  component: FirstVisit,
});

const STEPS = [
  { t: "You arrive", d: "A team member greets you by name. No forms on a clipboard — everything's digital and takes 2 minutes over chai." },
  { t: "We listen", d: "Fifteen minutes of conversation before any instrument comes out. Your history, your worries, what you actually want." },
  { t: "We look", d: "A full digital scan, intraoral photos and an X-ray. All on-screen, side-by-side with you." },
  { t: "We explain", d: "Every finding is walked through with images. No jargon. You'll leave knowing exactly what's healthy, what needs attention, and what can wait." },
  { t: "You decide", d: "You get an itemised plan with two or three options — including the one where we do nothing yet. The right to choose is yours." },
];

function FirstVisit() {
  return (
    <PageShell>
      <section className="px-6 lg:px-10 pt-16 pb-16">
        <div className="mx-auto max-w-[1400px] grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">— For new patients</p>
            <h1 className="font-display text-[clamp(3rem,9vw,7rem)] leading-[0.95]">
              The first visit,<br />
              <em className="text-primary not-italic">demystified.</em>
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-lg text-ink/70 leading-relaxed">Most people haven't been to a dentist in years. That's fine. Here's exactly what happens when you walk through our door — no surprises, no upsells.</p>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-24">
        <div className="mx-auto max-w-[1400px] grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <img src={clinic} alt="Dental Den reception" className="rounded-3xl w-full sticky top-28" loading="lazy" />
          </div>
          <div className="lg:col-span-7 space-y-4">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-3xl border border-ink/10 p-8 bg-ivory hover:border-primary/30 transition"
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-display text-4xl text-primary">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-3xl">{s.t}</h3>
                    <p className="mt-2 text-ink/70">{s.d}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-24 bg-cream">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-5xl lg:text-6xl">Bring what you have,<br />we'll handle the <em className="text-primary not-italic">rest.</em></h2>
          <p className="mt-6 text-ink/70">Old X-rays, previous treatment records, insurance details — helpful but not required. Show up. We'll take care of the rest.</p>
          <div className="mt-10 max-w-md mx-auto">
            <SlideToConfirm label="Book my first visit" onConfirm={() => (window.location.href = "/contact")} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}