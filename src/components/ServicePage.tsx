import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { PageShell } from "./SiteChrome";
import { SlideToConfirm } from "./SlideToConfirm";

export interface ServiceContent {
  tag: string;
  title: string;
  emphasis: string;
  intro: string;
  image: string;
  benefits: { k: string; v: string }[];
  journey: string[];
  faq: { q: string; a: string }[];
  price: string;
}

export function ServicePage({ content }: { content: ServiceContent }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
    <PageShell>
      <section className="px-6 lg:px-10 pt-16 pb-20">
        <div className="mx-auto max-w-[1400px] grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">— {content.tag}</p>
            <h1 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95]">
              {content.title}<br />
              {content.emphasis.split(" ").slice(0, -1).join(" ")} {" "}
              <em className="text-primary not-italic">{content.emphasis.split(" ").at(-1)}</em>
            </h1>
          </div>
          <div className="lg:col-span-5 space-y-6">
            <p className="text-lg text-ink/70 leading-relaxed">{content.intro}</p>
            <div className="max-w-sm">
              <SlideToConfirm label="Book a consultation" onConfirm={() => (window.location.href = "/contact")} />
            </div>
            <p className="text-xs text-ink/50">Investment starts at {content.price}. Every plan is quoted transparently after your consultation.</p>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-24">
        <div className="mx-auto max-w-[1400px]">
          <img src={content.image} alt={content.title} className="w-full aspect-[16/8] object-cover rounded-[2rem]" loading="lazy" />
        </div>
      </section>

      <section className="px-6 lg:px-10 py-24 bg-cream grain">
        <div className="mx-auto max-w-[1400px] grid lg:grid-cols-3 gap-6">
          {content.benefits.map((b, i) => (
            <motion.div
              key={b.k}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-ivory rounded-3xl p-8 border border-ink/8"
            >
              <span className="text-primary font-display text-3xl">0{i + 1}</span>
              <h3 className="font-display text-2xl mt-6">{b.k}</h3>
              <p className="text-sm text-ink/60 mt-2">{b.v}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-10 py-24">
        <div className="mx-auto max-w-[1400px] grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">— The journey</p>
            <h2 className="font-display text-5xl">Step by<br /><em className="text-primary not-italic">step.</em></h2>
          </div>
          <ol className="lg:col-span-8 space-y-6">
            {content.journey.map((step, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-6 border-b border-ink/10 pb-6"
              >
                <span className="font-display text-3xl text-primary shrink-0 w-16">0{i + 1}</span>
                <p className="text-lg leading-relaxed text-ink/80">{step}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 lg:px-10 py-24 bg-ink text-ivory">
        <div className="mx-auto max-w-[1400px] grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">— FAQ</p>
            <h2 className="font-display text-5xl">Answered<br /><em className="text-primary not-italic">honestly.</em></h2>
          </div>
          <div className="lg:col-span-8 divide-y divide-ivory/10 border-y border-ivory/10">
            {content.faq.map((f, i) => (
              <button
                key={i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left py-6 flex gap-6 items-start"
              >
                <span className="mt-1">{openFaq === i ? <Minus className="h-5 w-5 text-primary" /> : <Plus className="h-5 w-5 text-primary" />}</span>
                <div className="flex-1">
                  <p className="font-display text-2xl">{f.q}</p>
                  {openFaq === i && (
                    <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 text-ivory/70">
                      {f.a}
                    </motion.p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="mx-auto max-w-md mt-16">
          <SlideToConfirm label="Book this consultation" tone="ivory" onConfirm={() => (window.location.href = "/contact")} />
        </div>
      </section>
    </PageShell>
  );
}