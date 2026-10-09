import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import clinic from "@/assets/clinic-interior.jpg";

export const Route = createFileRoute("/services/root-canal")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Painless Root Canal — Microscopic Endodontics · Dental Den" },
      { name: "description", content: "Microscopic root canal treatment in Hennur, Bengaluru. Trained under Dr. Vivek Hegde. Save your tooth, painlessly." },
      { property: "og:title", content: "Root Canal Treatment — Dental Den" },
      { property: "og:description", content: "Microscopic endodontics. Usually one visit, almost always painless." },
    ],
  }),
  component: () => (
    <ServicePage
      content={{
        tag: "Microscopic Endodontics",
        title: "The gentlest way to",
        emphasis: "keep your tooth.",
        intro: "The old story about root canals being painful ended when surgical microscopes arrived. Dr. Lakshmi trained under Dr. Vivek Hegde — the country's foremost microscopic endodontist — and delivers most cases in a single unhurried visit.",
        image: clinic,
        price: "₹6,500",
        benefits: [
          { k: "Under the microscope", v: "Every canal is seen, measured and cleaned at 25x magnification." },
          { k: "Usually one visit", v: "Two to three hours in the chair, then you're done. No weeks of return appointments." },
          { k: "Genuinely painless", v: "Modern anaesthesia and gentle instrumentation. Most patients say it felt like a filling." },
        ],
        journey: [
          "A quick digital X-ray and 5-minute assessment tells us if you need a root canal or something simpler.",
          "On treatment day, we numb the area — completely. You watch a show or listen to music. We work.",
          "Cleaning, shaping and sealing under the microscope. Every canal, seen, not felt.",
          "A temporary filling. You go home, eat what you like within 24 hours.",
          "Follow-up in a week to fit the permanent crown. Tooth saved. Story over.",
        ],
        faq: [
          { q: "Does it hurt?", a: "No. This is the single biggest myth in dentistry. Modern root canals are done under complete anaesthesia — patients often describe it as similar to a routine filling." },
          { q: "Why do I need a crown after?", a: "The tooth becomes brittle without its nerve. A crown protects the remaining tooth structure and restores full biting function. We usually recommend it within 3 to 4 weeks of the RCT." },
          { q: "One visit or many?", a: "Around 80% of our RCTs are single-visit. Complex cases — infected molars, retreatments, curved canals — sometimes need a second visit. We tell you which at the start." },
          { q: "How long will the tooth last?", a: "A well-done microscopic RCT with a full-coverage crown has a >95% survival rate at 10 years. Many of our earliest cases from 2010 are still going." },
          { q: "What's the alternative?", a: "Extraction and either a bridge or an implant. Both are more expensive, more invasive and take longer than saving your own tooth. We recommend RCT wherever it's possible." },
        ],
      }}
    />
  ),
});