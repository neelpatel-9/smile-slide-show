import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageShell } from "@/components/SiteChrome";
import { SlideToConfirm } from "@/components/SlideToConfirm";
import { MagneticFloat } from "@/components/MagneticFloat";
import drLakshmiAsset from "@/assets/dr-lakshmi.png.asset.json";
const drLakshmi = drLakshmiAsset.url;
import clinic from "@/assets/clinic-interior.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Dr. Lakshmi — Dental Den, Hennur" },
      { name: "description", content: "Founder-led practice in Hennur, Bengaluru. Dr. Lakshmi Roopesh — BDS, NYU aesthetic dentistry, Osstem & Nobel Biocare fellowships, mentored by Dr. Sandesh Mayekar." },
      { property: "og:title", content: "About Dr. Lakshmi — Dental Den" },
      { property: "og:description", content: "Conservative, personalised care since 2010. Meet the founder behind Dental Den." },
    ],
  }),
  component: AboutPage,
});

const TIMELINE = [
  { yr: "2005", t: "BDS", note: "Started her journey in clinical dentistry." },
  { yr: "2008", t: "Mentorship under Dr. Sandesh Mayekar", note: "Learned the philosophy of conservative, personalised care." },
  { yr: "2010", t: "Dental Den founded, Hennur", note: "One clinic. One promise: never over-treat." },
  { yr: "2014", t: "NYU Aesthetic Dentistry", note: "Advanced training in smile design." },
  { yr: "2018", t: "Osstem & Nobel Biocare fellowships", note: "Implantology, at the level of the systems' original engineers." },
  { yr: "2022", t: "Microscopic Endodontics", note: "Trained under Dr. Vivek Hegde. Root canals, redefined." },
  { yr: "2026", t: "Den Care launches", note: "Membership that turns care from reactive to routine." },
];

const VALUES = [
  ["Listening", "The first visit is a conversation, not a procedure."],
  ["Conservative", "The right treatment is often the smallest one."],
  ["Warmth", "Premium doesn't have to feel cold."],
  ["Honesty", "You'll always know the why behind the what."],
  ["Precision", "Microscopes, digital planning, no shortcuts."],
  ["Continuity", "Same team, same chair, every visit."],
  ["Discretion", "Your smile is yours. So is your story."],
  ["Autonomy", "You always keep the right to choose."],
];

function AboutPage() {
  return (
    <PageShell>
      <section className="px-6 lg:px-10 pt-16 pb-24">
        <div className="mx-auto max-w-[1400px] grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">— The founder</p>
            <h1 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95]">
              A quiet<br />
              conviction:<br />
              <em className="text-primary not-italic">less is more.</em>
            </h1>
          </div>
          <div className="lg:col-span-5 space-y-6">
            <p className="text-lg text-ink/70 leading-relaxed">
              Dr. Lakshmi Roopesh founded Dental Den in 2010 with a single, stubborn belief: that the best dentistry is often the least of it. Sixteen years later, that belief is why 70% of her patients came from someone else's recommendation.
            </p>
            <div className="max-w-sm">
              <SlideToConfirm label="Book a consultation" onConfirm={() => (window.location.href = "/contact")} />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-24">
        <div className="mx-auto max-w-[1400px]">
          <MagneticFloat strength={24}>
            <img src={drLakshmi} alt="Dr. Lakshmi Roopesh, Founder of Dental Den, Hennur Bengaluru" className="w-full aspect-[16/9] object-cover rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.35)]" loading="lazy" />
          </MagneticFloat>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-24 bg-cream grain">
        <div className="mx-auto max-w-[1400px] grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">— The path</p>
            <h2 className="font-display text-5xl">Sixteen years,<br />on the record.</h2>
          </div>
          <div className="lg:col-span-8">
            <div className="relative border-l border-ink/15 pl-8 space-y-10">
              {TIMELINE.map((e, i) => (
                <motion.div
                  key={e.yr}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="relative"
                >
                  <span className="absolute -left-[41px] top-2 h-3 w-3 rounded-full bg-primary ring-4 ring-cream" />
                  <div className="flex flex-wrap items-baseline gap-4">
                    <span className="font-display text-4xl text-primary">{e.yr}</span>
                    <h3 className="font-display text-2xl">{e.t}</h3>
                  </div>
                  <p className="mt-2 text-ink/70">{e.note}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-24">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">— Eight core values</p>
          <h2 className="font-display text-5xl lg:text-7xl max-w-3xl leading-[1]">What we won't compromise on.</h2>
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map(([k, v], i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.08 }}
                className="rounded-3xl p-8 bg-ivory border border-ink/8 hover:border-primary/40 transition group h-full"
              >
                <span className="text-primary font-display text-3xl">0{i + 1}</span>
                <h3 className="mt-6 font-display text-2xl">{k}</h3>
                <p className="mt-2 text-sm text-ink/60">{v}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-24 bg-ink text-ivory">
        <div className="mx-auto max-w-3xl text-center">
          <img src={clinic} alt="Dental Den clinic space" className="rounded-3xl mb-12" loading="lazy" />
          <h2 className="font-display text-5xl lg:text-6xl">Come see the space that grew up around the philosophy.</h2>
          <div className="mt-10 max-w-md mx-auto">
            <SlideToConfirm label="Visit the clinic" tone="ivory" onConfirm={() => (window.location.href = "/contact")} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}