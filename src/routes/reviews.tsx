import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { PageShell } from "@/components/SiteChrome";
import { SlideToConfirm } from "@/components/SlideToConfirm";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Patient Reviews — 4.7★ · Dental Den" },
      { name: "description", content: "183+ Google reviews at 4.7★. Real patient stories from Hennur, Bengaluru and beyond." },
      { property: "og:title", content: "Reviews — Dental Den" },
      { property: "og:description", content: "What our patients actually say. In their words." },
    ],
  }),
  component: Reviews,
});

const REVIEWS = [
  { name: "Ananya S.", city: "Indiranagar", text: "Didn't feel like a dental clinic. Dr. Lakshmi and her team made my smile design journey feel curated, not clinical. My veneers look exactly like the mock-up promised.", tx: "Smile Design", r: 5 },
  { name: "Rahul M.", city: "HBR Layout", text: "Two implants, zero pain. The microscope work is on another level — you can literally feel the precision. Been back for cleanings since.", tx: "Implants", r: 5 },
  { name: "Joanna K.", city: "Warsaw, Poland", text: "Flew from Poland for veneers on a recommendation. Worth every kilometre. Warm, honest, world-class. Coming back for my mother.", tx: "Smile Design", r: 5 },
  { name: "Priya N.", city: "Whitefield", text: "It felt like a hotel, not a hospital. The clinic is beautiful, the team remembers your name, and the treatment plan came with actual options — not just one price.", tx: "Consultation", r: 5 },
  { name: "Kiran R.", city: "Hennur", text: "Root canal I had been dreading for a year. Done in one visit, zero pain. I ate biryani that evening. Never going anywhere else.", tx: "Root Canal", r: 5 },
  { name: "Divya S.", city: "Kalyan Nagar", text: "Took my 6-year-old for his first visit. Dr. Lakshmi's team turned it into a story he wanted to tell. He asks when we're going back.", tx: "Pediatric", r: 5 },
  { name: "Arun P.", city: "Bellandur", text: "Compared quotes from 4 places. Dental Den wasn't the cheapest — but they were the only ones who explained why each line item existed. That earned the booking.", tx: "Full Mouth", r: 5 },
  { name: "Meera G.", city: "Sarjapur", text: "Aligners journey took 14 months. Every check-in was on time, warm, and specific. My results are better than the initial projection.", tx: "Orthodontics", r: 5 },
  { name: "Vikram T.", city: "Koramangala", text: "Whitening + polish for my wedding. They didn't push anything. Simple, elegant, done in one afternoon. Photos came out perfect.", tx: "Whitening", r: 5 },
];

function Reviews() {
  return (
    <PageShell>
      <section className="px-6 lg:px-10 pt-16 pb-16">
        <div className="mx-auto max-w-[1400px] grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">— In their words</p>
            <h1 className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.95]">
              183 reviews.<br />
              4.7 stars.<br />
              One <em className="text-primary not-italic">clinic.</em>
            </h1>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-cream p-8 border border-ink/8">
              <div className="flex gap-1 text-primary mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-6 w-6 fill-current" />)}
              </div>
              <p className="font-display text-6xl flex items-center gap-2">
                4.7 <Star className="h-8 w-8 fill-current" />
              </p>
              <p className="mt-1 text-sm font-medium text-ink/60">google rating</p>
              <p className="mt-3 text-sm text-ink/60">Across 183 verified Google reviews. Zero paid, zero incentivised.</p>
              <div className="mt-6">
                <SlideToConfirm label="Read them on Google" onConfirm={() => window.open("https://www.google.com/search?q=dental+den+hennur+reviews", "_blank")} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-16 bg-cream grain">
        <div className="mx-auto max-w-[1400px] columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 6) * 0.05 }}
              className="break-inside-avoid mb-6 rounded-3xl bg-ivory border border-ink/8 p-8"
            >
              <div className="flex gap-0.5 text-primary mb-3">
                {[...Array(r.r)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
              </div>
              <p className="font-display text-xl leading-snug">"{r.text}"</p>
              <div className="mt-6 pt-4 border-t border-ink/10 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-ink/50">{r.city}</p>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-primary">{r.tx}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-10 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-5xl lg:text-6xl">Your story could be <em className="text-primary not-italic">next.</em></h2>
          <div className="mt-10 max-w-md mx-auto">
            <SlideToConfirm label="Book your first visit" onConfirm={() => (window.location.href = "/contact")} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}