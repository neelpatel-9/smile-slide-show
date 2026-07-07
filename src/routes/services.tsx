import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageShell } from "@/components/SiteChrome";
import { SlideToConfirm } from "@/components/SlideToConfirm";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Dental Den, Hennur Bengaluru" },
      { name: "description", content: "Smile design, implants, root canal, orthodontics, laser and pediatric dentistry. Organised by what you're actually here for." },
      { property: "og:title", content: "Dental services — Dental Den" },
      { property: "og:description", content: "Six focused services, delivered under one warm roof in Hennur." },
    ],
  }),
  component: Services,
});

const SERVICES = [
  { name: "Smile Design", tag: "Signature", desc: "Veneers, whitening, contouring and gum sculpting — planned digitally, delivered by hand.", price: "From ₹18,000/tooth", to: "/services/smile-design" },
  { name: "Dental Implants", tag: "Osstem · Nobel", desc: "Single-tooth to full-arch. Fellowship-trained, guided by 3D CT.", price: "From ₹35,000", to: "/services/dental-implants" },
  { name: "Root Canal Treatment", tag: "Microscopic", desc: "Painless endodontics under a surgical microscope. One or two visits.", price: "From ₹6,500", to: "/services/root-canal" },
  { name: "Orthodontics", tag: "Aligners & Braces", desc: "Clear aligners for adults, ceramic and metal braces for teens.", price: "From ₹80,000", to: "/services" },
  { name: "Laser Dentistry", tag: "Precision", desc: "Soft-tissue procedures with less bleeding, less pain, faster healing.", price: "From ₹3,500", to: "/services" },
  { name: "Pediatric Care", tag: "Gentle", desc: "First visits designed as an experience, not a procedure.", price: "From ₹1,500", to: "/services" },
];

function Services() {
  return (
    <PageShell>
      <section className="px-6 lg:px-10 pt-16 pb-24">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">— By patient intent, not clinical category</p>
          <h1 className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.95] max-w-5xl">
            Six services.<br />
            One <em className="text-primary not-italic">unhurried</em> chair.
          </h1>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-24">
        <div className="mx-auto max-w-[1400px] divide-y divide-ink/10 border-t border-b border-ink/10">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 3) * 0.06 }}
            >
              <Link
                to={s.to}
                className="group grid grid-cols-12 gap-6 py-10 items-center hover:bg-cream/50 transition-colors px-4 rounded-2xl"
              >
                <div className="col-span-1 font-display text-4xl text-primary/70">0{i + 1}</div>
                <div className="col-span-11 md:col-span-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-primary">{s.tag}</span>
                  <h3 className="font-display text-4xl lg:text-5xl mt-2">{s.name}</h3>
                </div>
                <div className="col-span-12 md:col-span-4 text-ink/70">{s.desc}</div>
                <div className="col-span-8 md:col-span-2 text-sm text-ink/50">{s.price}</div>
                <div className="col-span-4 md:col-span-1 flex justify-end">
                  <span className="h-12 w-12 rounded-full border border-ink/20 grid place-items-center group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-10 py-24 bg-cream">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-5xl lg:text-6xl">Not sure which one you need?</h2>
          <p className="mt-6 text-ink/70">That's what the consultation is for. Slide to book — we'll figure it out together.</p>
          <div className="mt-10 max-w-md mx-auto">
            <SlideToConfirm label="Book a consultation" onConfirm={() => (window.location.href = "/contact")} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}