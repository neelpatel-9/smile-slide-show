import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { PageShell } from "@/components/SiteChrome";
import { SlideToConfirm } from "@/components/SlideToConfirm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Book an Appointment — Dental Den, Hennur Bengaluru" },
      { name: "description", content: "Visit Dental Den in Hennur, Bengaluru. Call, WhatsApp or book online. Single location. Warm, unhurried consultations." },
      { property: "og:title", content: "Contact & Book — Dental Den" },
      { property: "og:description", content: "One clinic in Hennur, Bengaluru. Slide to book your consultation." },
    ],
  }),
  component: Contact,
});

const SERVICES = ["Consultation", "Smile Design", "Dental Implants", "Root Canal", "Orthodontics", "Pediatric", "Other"];

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "Consultation", message: "" });
  const [sent, setSent] = useState(false);
  return (
    <PageShell>
      <section className="px-6 lg:px-10 pt-16 pb-16">
        <div className="mx-auto max-w-[1400px] grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">— One clinic. Hennur only.</p>
            <h1 className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.95]">
              Let's put you<br />
              on the <em className="text-primary not-italic">calendar.</em>
            </h1>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-24">
        <div className="mx-auto max-w-[1400px] grid lg:grid-cols-12 gap-8">
          {/* Info */}
          <div className="lg:col-span-4 space-y-4">
            {[
              { i: MapPin, k: "Visit", v: "Hennur Main Road,\nBengaluru 560043" },
              { i: Phone, k: "Call", v: "+91 99000 87667" },
              { i: Mail, k: "Email", v: "dentalden@gmail.com" },
              { i: Clock, k: "Hours", v: "Mon–Sat · 9:30–19:30\nSun · By appointment" },
            ].map(({ i: Icon, k, v }) => (
              <div key={k} className="rounded-2xl border border-ink/10 bg-ivory p-6 flex gap-4">
                <Icon className="h-5 w-5 text-primary mt-1 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-ink/50">{k}</p>
                  <p className="mt-1 whitespace-pre-line text-sm">{v}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 rounded-[2rem] bg-ink text-ivory p-8 lg:p-12 grain relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">— Request an appointment</p>
              <h2 className="font-display text-4xl mb-8">Tell us a little<br />and we'll take it from there.</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                <Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-ivory/50 mb-2">Interested in</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full bg-ivory/5 border border-ivory/15 rounded-xl px-4 h-12 text-ivory outline-none focus:border-primary"
                  >
                    {SERVICES.map((s) => <option key={s} className="text-ink">{s}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-ivory/50 mb-2">Anything we should know?</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="w-full bg-ivory/5 border border-ivory/15 rounded-xl px-4 py-3 text-ivory outline-none focus:border-primary resize-none"
                    placeholder="Preferred day, any dental history, anxieties..."
                  />
                </div>
              </div>
              <div className="mt-8">
                <SlideToConfirm
                  label={sent ? "Sent — we'll call within 4 hours" : "Slide to request booking"}
                  size="lg"
                  tone="ivory"
                  confirmedLabel="Received — talk soon"
                  onConfirm={() => setSent(true)}
                />
                <p className="mt-4 text-xs text-ivory/50">Or WhatsApp us directly — we usually reply within 15 minutes during clinic hours.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 lg:px-10 pb-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="rounded-[2rem] overflow-hidden border border-ink/10 aspect-[16/7] bg-cream">
            <iframe
              title="Dental Den location"
              src="https://www.google.com/maps?q=Hennur,Bengaluru&output=embed"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.3em] text-ivory/50 mb-2">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-ivory/5 border border-ivory/15 rounded-xl px-4 h-12 text-ivory outline-none focus:border-primary"
      />
    </div>
  );
}