import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import clinic from "@/assets/clinic-interior.jpg";

export const Route = createFileRoute("/services/dental-implants")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Dental Implants — Osstem & Nobel Biocare · Dental Den" },
      { name: "description", content: "Fellowship-trained implantology in Hennur, Bengaluru. Single-tooth to full-arch, guided by 3D CT and delivered by Dr. Lakshmi." },
      { property: "og:title", content: "Dental Implants — Dental Den" },
      { property: "og:description", content: "Implants that look, feel and last like your own teeth." },
    ],
  }),
  component: () => (
    <ServicePage
      content={{
        tag: "Osstem · Nobel Biocare Fellow",
        title: "Implants that",
        emphasis: "feel like yours.",
        intro: "Dr. Lakshmi holds fellowships from both Osstem and Nobel Biocare — trained by the engineers who designed the systems. Every case is planned in 3D before you sit down, and delivered under guided precision.",
        image: clinic,
        price: "₹35,000",
        benefits: [
          { k: "3D CT planning", v: "Every implant simulated in your jaw before the day of surgery." },
          { k: "Guided placement", v: "Surgical guides mean sub-millimetre accuracy — less trauma, faster healing." },
          { k: "Two premium systems", v: "Osstem for value, Nobel Biocare for the most demanding cases. Both fellowship-backed." },
        ],
        journey: [
          "Consultation with 3D CT scan. We assess bone, sinuses and adjacent teeth.",
          "Digital plan shared with you. We agree on system, timeline and quote.",
          "Placement in a single unhurried visit — most patients drive themselves home.",
          "Healing period of 3 to 4 months. Regular check-ins, zero surprises.",
          "Final crown or bridge, colour-matched and bite-tested. Then routine maintenance for life.",
        ],
        faq: [
          { q: "Is it painful?", a: "The procedure is done under local anaesthesia — most patients report less discomfort than an extraction. Post-op we use guided technique to minimise swelling." },
          { q: "How long does it take?", a: "From placement to final crown, allow 4 to 6 months. For full-arch, immediate-load protocols can restore function within 72 hours." },
          { q: "Osstem or Nobel?", a: "Both are excellent. Osstem is the cost-effective choice for standard cases. Nobel Biocare (branemark protocol) is our recommendation for aesthetic zones, immediate loading and complex reconstructions." },
          { q: "What is the success rate?", a: "Our case series over 16 years shows a >98% survival rate at 10 years, in line with international benchmarks." },
          { q: "What if I've lost bone?", a: "We routinely handle bone grafting, sinus lifts and ridge augmentation as part of the plan. Nothing gets outsourced." },
        ],
      }}
    />
  ),
});