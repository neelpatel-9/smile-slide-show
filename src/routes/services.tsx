import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/SiteChrome";
import { SlideToConfirm } from "@/components/SlideToConfirm";
import { ExpandableServiceCard, type ServiceCardData } from "@/components/ExpandableServiceCard";
import smileMacro from "@/assets/smile-macro.jpg";
import clinic from "@/assets/clinic-interior.jpg";
import t1 from "@/assets/treatment-1.jpg";
import t2 from "@/assets/treatment-2.jpg";
import t3 from "@/assets/treatment-3.jpg";
import t4 from "@/assets/treatment-4.jpg";
import before1 from "@/assets/before-1.jpg";

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

const gallery = [
  { type: "image" as const, src: t1, caption: "After · Smile Design" },
  { type: "image" as const, src: t2, caption: "Our Operatory" },
  { type: "image" as const, src: t3, caption: "Precision Work" },
  { type: "image" as const, src: t4, caption: "Digital 3D Scan" },
  { type: "image" as const, src: smileMacro, caption: "Final Result" },
];

const SERVICES: ServiceCardData[] = [
  {
    name: "Smile Design",
    tag: "Signature",
    desc: "Veneers, whitening, contouring and gum sculpting — planned digitally, delivered by hand.",
    long: "Every smile is designed to your face — not a template. We start with a digital mock-up, then hand-layer veneers, whiten, and gently sculpt gum lines until the smile feels unmistakably yours.",
    price: "From ₹18,000/tooth",
    color: "bg-[oklch(0.96_0.02_50)]",
    gallery,
    before: before1,
    after: smileMacro,
  },
  {
    name: "Dental Implants",
    tag: "Osstem · Nobel",
    desc: "Single-tooth to full-arch. Fellowship-trained, guided by 3D CT.",
    long: "Fellowship-trained on both Osstem and Nobel Biocare systems and guided by 3D CT planning — implants that look, chew and feel like the tooth you were born with.",
    price: "From ₹35,000",
    color: "bg-[oklch(0.94_0.03_35)]",
    gallery: [gallery[3], gallery[1], gallery[2], gallery[0]],
    before: before1,
    after: t1,
  },
  {
    name: "Root Canal",
    tag: "Microscopic",
    desc: "Painless endodontics under a surgical microscope. One or two visits.",
    long: "A surgical microscope, a single practitioner, and modern anaesthetics — root canals that finish in one or two visits with almost no post-op pain.",
    price: "From ₹6,500",
    color: "bg-[oklch(0.95_0.02_20)]",
    gallery: [gallery[2], gallery[3], gallery[1]],
    before: before1,
    after: smileMacro,
  },
  {
    name: "Orthodontics",
    tag: "Aligners & Braces",
    desc: "Clear aligners for adults, ceramic and metal braces for teens.",
    long: "Clear aligners for adults who don't want anyone to know, ceramic for teens who want it subtle, and classic metal when speed matters most.",
    price: "From ₹80,000",
    color: "bg-[oklch(0.96_0.02_75)]",
    gallery: [gallery[3], gallery[0], gallery[4]],
    before: before1,
    after: t1,
  },
  {
    name: "Laser Dentistry",
    tag: "Precision",
    desc: "Soft-tissue procedures with less bleeding, less pain, faster healing.",
    long: "Where possible, we swap scalpels for lasers — less bleeding, less swelling, dramatically faster healing for gum contouring and soft-tissue work.",
    price: "From ₹3,500",
    color: "bg-[oklch(0.95_0.02_10)]",
    gallery: [gallery[2], gallery[1], gallery[0]],
    before: before1,
    after: smileMacro,
  },
  {
    name: "Pediatric Care",
    tag: "Gentle",
    desc: "First visits designed as an experience, not a procedure.",
    long: "First visits designed as an experience, not a procedure — so your child grows up thinking dental chairs are friendly places.",
    price: "From ₹1,500",
    color: "bg-[oklch(0.96_0.02_90)]",
    gallery: [gallery[1], gallery[0], gallery[4]],
    before: before1,
    after: t1,
  },
];

function Services() {
  return (
    <PageShell>
      <section className="px-6 lg:px-10 pt-16 pb-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">— By patient intent, not clinical category</p>
              <h1 className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.95] max-w-4xl">
                Six services.<br />
                One <em className="text-primary not-italic">unhurried</em> chair.
              </h1>
              <p className="mt-6 text-ink/60 max-w-lg">Tap any service to open the gallery — real treatment photos, video from our chair, and a drag-to-reveal before &amp; after.</p>
            </div>
            <div className="w-full lg:w-96 shrink-0">
              <SlideToConfirm
                label="Slide to book an appointment"
                confirmedLabel="Opening booking"
                onConfirm={() => (window.location.href = "/contact")}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <ExpandableServiceCard key={s.name} data={s} index={i} />
            ))}
          </div>
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