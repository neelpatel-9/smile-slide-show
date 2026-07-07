import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import smile from "@/assets/smile-macro.jpg";

export const Route = createFileRoute("/services/smile-design")({
  head: () => ({
    meta: [
      { title: "Smile Design — Dental Den, Hennur" },
      { name: "description", content: "Digitally planned veneers, whitening and gum sculpting in Hennur, Bengaluru. See your new smile before we start." },
      { property: "og:title", content: "Smile Design — Dental Den" },
      { property: "og:description", content: "Veneers, whitening and contouring, designed around your face." },
      { property: "og:image", content: "https://www.dentalden.in/og-smile.jpg" },
    ],
  }),
  component: () => (
    <ServicePage
      content={{
        tag: "Signature service",
        title: "Smile Design,",
        emphasis: "not tooth repair.",
        intro: "We start with your face — the way you laugh, the way light falls on your teeth — then design the smile that already belongs there. Every plan is previewed digitally before a single tooth is touched.",
        image: smile,
        price: "₹18,000/tooth",
        benefits: [
          { k: "Digital preview", v: "See your outcome as a mock-up before any treatment begins." },
          { k: "Conservative", v: "Minimal-prep veneers wherever possible. We keep what's yours." },
          { k: "Face-first design", v: "Planned around your lip line, face shape and personality — not a template." },
        ],
        journey: [
          "A one-hour consultation. Photos, scans and a conversation about what you actually want.",
          "Digital Smile Design mock-up delivered within a week. You approve every angle.",
          "Wax-up trial. You wear a preview of your new smile home before we commit.",
          "Two to three visits for delivery. Every veneer hand-finished by Dr. Lakshmi.",
          "A follow-up two weeks later. A polish visit at three months. Lifetime aftercare.",
        ],
        faq: [
          { q: "Will my teeth be shaved down?", a: "In most cases we use minimal-prep veneers — 0.3 to 0.5 mm of enamel, sometimes none at all. Anything more and we tell you why, before we begin." },
          { q: "How long do veneers last?", a: "Well-made porcelain veneers last 12 to 20 years with routine care. Ours come with a defined warranty and a Den Care aftercare pathway." },
          { q: "Will it look fake?", a: "This is where face-first design matters. We design translucency, character and micro-imperfections into every unit so the result reads as your teeth — cleaner, brighter, in scale." },
          { q: "How much does it cost?", a: "A full smile ranges from ₹1.8L to ₹6L depending on units and material. You get a fully itemised quote at your consultation — no upsells." },
          { q: "Can I see it first?", a: "Yes. The mock-up and wax-up trial let you preview your smile before we bond a single veneer." },
        ],
      }}
    />
  ),
});