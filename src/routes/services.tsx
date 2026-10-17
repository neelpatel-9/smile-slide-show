import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/SiteChrome";
import { SlideToConfirm } from "@/components/SlideToConfirm";
import { ExpandableServiceCard, type ServiceCardData } from "@/components/ExpandableServiceCard";
import casePhoto01 from "@/assets/service-case-01.jpg.asset.json";
import casePhoto02 from "@/assets/service-case-02.jpg.asset.json";
import casePhoto03 from "@/assets/service-case-03.jpg.asset.json";
import casePhoto04 from "@/assets/service-case-04.jpg.asset.json";
import casePhoto05 from "@/assets/service-case-05.jpg.asset.json";
import casePhoto06 from "@/assets/service-case-06.jpg.asset.json";
import beforeWhitening from "@/assets/before-whitening.png.asset.json";
import afterWhitening from "@/assets/after-whitening.png.asset.json";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Services — Dental Den, Hennur Bengaluru" },
      { name: "description", content: "Smile design, implants, root canal, orthodontics, laser and pediatric dentistry. Organised by what you're actually here for." },
      { property: "og:title", content: "Dental services — Dental Den" },
      { property: "og:description", content: "Six focused services, delivered under one warm roof in Hennur." },
    ],
  }),
  component: Services,
});

const gallery = [
  { type: "image" as const, src: casePhoto01.url, caption: "Patient case · Before & After" },
  { type: "image" as const, src: casePhoto02.url, caption: "Patient case · Before & After" },
  { type: "image" as const, src: casePhoto03.url, caption: "Patient case · Before & After" },
  { type: "image" as const, src: casePhoto04.url, caption: "Patient case · Before & After" },
  { type: "image" as const, src: casePhoto05.url, caption: "Patient case · Before & After" },
  { type: "image" as const, src: casePhoto06.url, caption: "Patient case · Before & After" },
];

const makeCases = (baseGallery: typeof gallery) => [
  { title: "Case 01", note: "Patient treatment photographs", gallery: [baseGallery[0], baseGallery[1]], before: beforeWhitening.url, after: afterWhitening.url },
  { title: "Case 02", note: "Patient treatment photographs", gallery: [baseGallery[1], baseGallery[2]], before: beforeWhitening.url, after: afterWhitening.url },
  { title: "Case 03", note: "Patient treatment photographs", gallery: [baseGallery[2], baseGallery[3]], before: beforeWhitening.url, after: afterWhitening.url },
  { title: "Case 04", note: "Patient treatment photographs", gallery: [baseGallery[4], baseGallery[5]], before: beforeWhitening.url, after: afterWhitening.url },
  { title: "Case 05", note: "Patient treatment photographs", gallery: [baseGallery[5], baseGallery[0]], before: beforeWhitening.url, after: afterWhitening.url },
];

const SERVICES: ServiceCardData[] = [
  {
    name: "Smile Design",
    tag: "Signature",
    desc: "Veneers, whitening, contouring and gum sculpting — planned digitally, delivered by hand.",
    long: "Every smile is designed to your face — not a template. We start with a digital mock-up, then hand-layer veneers, whiten, and gently sculpt gum lines until the smile feels unmistakably yours.",
    price: "From ₹18,000/tooth",
    color: "bg-[oklch(0.96_0.02_50)]",
    image: casePhoto01.url,
    cases: makeCases(gallery),
  },
  {
    name: "Dental Implants",
    tag: "Osstem · Nobel",
    desc: "Single-tooth to full-arch. Fellowship-trained, guided by 3D CT.",
    long: "Fellowship-trained on both Osstem and Nobel Biocare systems and guided by 3D CT planning — implants that look, chew and feel like the tooth you were born with.",
    price: "From ₹35,000",
    color: "bg-[oklch(0.94_0.03_35)]",
    image: casePhoto02.url,
    cases: makeCases([gallery[1], gallery[2], gallery[3], gallery[4], gallery[5], gallery[0]]),
  },
  {
    name: "Root Canal",
    tag: "Microscopic",
    desc: "Painless endodontics under a surgical microscope. One or two visits.",
    long: "A surgical microscope, a single practitioner, and modern anaesthetics — root canals that finish in one or two visits with almost no post-op pain.",
    price: "From ₹6,500",
    color: "bg-[oklch(0.95_0.02_20)]",
    image: casePhoto03.url,
    cases: makeCases([gallery[2], gallery[3], gallery[4], gallery[5], gallery[0], gallery[1]]),
  },
  {
    name: "Orthodontics",
    tag: "Aligners & Braces",
    desc: "Clear aligners for adults, ceramic and metal braces for teens.",
    long: "Clear aligners for adults who don't want anyone to know, ceramic for teens who want it subtle, and classic metal when speed matters most.",
    price: "From ₹80,000",
    color: "bg-[oklch(0.96_0.02_75)]",
    image: casePhoto04.url,
    cases: makeCases([gallery[3], gallery[4], gallery[5], gallery[0], gallery[1], gallery[2]]),
  },
  {
    name: "Laser Dentistry",
    tag: "Precision",
    desc: "Soft-tissue procedures with less bleeding, less pain, faster healing.",
    long: "Where possible, we swap scalpels for lasers — less bleeding, less swelling, dramatically faster healing for gum contouring and soft-tissue work.",
    price: "From ₹3,500",
    color: "bg-[oklch(0.95_0.02_10)]",
    image: casePhoto05.url,
    cases: makeCases([gallery[4], gallery[5], gallery[0], gallery[1], gallery[2], gallery[3]]),
  },
  {
    name: "Pediatric Care",
    tag: "Gentle",
    desc: "First visits designed as an experience, not a procedure.",
    long: "First visits designed as an experience, not a procedure — so your child grows up thinking dental chairs are friendly places.",
    price: "From ₹1,500",
    color: "bg-[oklch(0.96_0.02_90)]",
    image: casePhoto06.url,
    cases: makeCases([gallery[5], gallery[0], gallery[1], gallery[2], gallery[3], gallery[4]]),
  },
];

// Alternating asymmetric layout: wide (3 cols) + compact (2 cols), then flipped.
const LAYOUT: Array<{ variant: "wide" | "compact"; span: string }> = [
  { variant: "wide", span: "md:col-span-3" },
  { variant: "compact", span: "md:col-span-2" },
  { variant: "compact", span: "md:col-span-2" },
  { variant: "wide", span: "md:col-span-3" },
  { variant: "wide", span: "md:col-span-3" },
  { variant: "compact", span: "md:col-span-2" },
];

function Services() {
  return (
    <PageShell>
      <section className="cream-texture px-6 lg:px-10 pt-16 pb-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">— By patient intent, not clinical category</p>
              <h1 className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.95] max-w-4xl">
                Six services.<br />
                One <em className="text-primary not-italic">unhurried</em> chair.
              </h1>
              <p className="mt-6 text-ink/60 max-w-lg">Tap any service to open the gallery — five real treatment cases per service, each with photos and a drag-to-reveal before &amp; after.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-5 auto-rows-fr">
            {SERVICES.map((s, i) => (
              <div key={s.name} className={LAYOUT[i].span}>
                <ExpandableServiceCard data={s} index={i} variant={LAYOUT[i].variant} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cream-texture px-6 lg:px-10 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-5xl lg:text-6xl">Not sure which one you <em className="text-primary not-italic">need?</em></h2>
          <p className="mt-6 text-ink/70">That's what the consultation is for. Slide to book — we'll figure it out together.</p>
          <div className="mt-10 max-w-md mx-auto">
            <SlideToConfirm label="Book a consultation" onConfirm={() => (window.location.href = "/contact")} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
