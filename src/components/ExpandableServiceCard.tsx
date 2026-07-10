import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { SlideToConfirm } from "./SlideToConfirm";

export interface ServiceMedia {
  type: "image" | "video";
  src: string;
  poster?: string;
  caption?: string;
}

export interface TreatmentCase {
  title: string;
  note: string;
  gallery: ServiceMedia[];
  before: string;
  after: string;
}

export interface ServiceCardData {
  name: string;
  tag: string;
  desc: string;
  long: string;
  price: string;
  color: string; // tailwind bg class for the pill
  image?: string;
  cases: TreatmentCase[];
}

function Gallery({ items }: { items: ServiceMedia[] }) {
  const [i, setI] = useState(0);
  const next = () => setI((i + 1) % items.length);
  const prev = () => setI((i - 1 + items.length) % items.length);
  const item = items[i];
  return (
    <div className="relative aspect-[4/3] md:aspect-[16/11] w-full overflow-hidden rounded-2xl bg-ink/5">
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0"
        >
          {item.type === "image" ? (
            <img src={item.src} alt={item.caption ?? ""} className="w-full h-full object-cover" />
          ) : (
            <video src={item.src} poster={item.poster} controls className="w-full h-full object-cover" />
          )}
        </motion.div>
      </AnimatePresence>
      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-ivory/90 grid place-items-center shadow-lg hover:bg-ivory">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-ivory/90 grid place-items-center shadow-lg hover:bg-ivory">
        <ChevronRight className="h-5 w-5" />
      </button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {items.map((_, j) => (
          <button
            key={j}
            onClick={() => setI(j)}
            className={`h-1.5 rounded-full transition-all ${j === i ? "w-8 bg-primary" : "w-1.5 bg-ivory/70"}`}
            aria-label={`Slide ${j + 1}`}
          />
        ))}
      </div>
      {item.caption && (
        <div className="absolute top-3 left-3 rounded-full bg-ink/70 text-ivory px-3 py-1 text-[10px] tracking-[0.25em] uppercase">
          {item.caption}
        </div>
      )}
    </div>
  );
}

function BeforeAfterSlider({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  const move = (clientX: number, el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    setPos(Math.max(4, Math.min(96, ((clientX - r.left) / r.width) * 100)));
  };
  return (
    <div
      className="relative aspect-[4/3] md:aspect-[16/11] w-full overflow-hidden rounded-2xl cursor-ew-resize select-none bg-cream"
      onMouseMove={(e) => move(e.clientX, e.currentTarget)}
      onTouchMove={(e) => move(e.touches[0].clientX, e.currentTarget)}
    >
      <img src={before} alt="Before" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <img src={after} alt="After" className="w-full h-full object-cover" />
      </div>
      <div className="absolute top-3 left-3 rounded-full bg-ink/70 text-ivory px-3 py-1 text-[10px] tracking-[0.25em] uppercase">Before</div>
      <div className="absolute top-3 right-3 rounded-full bg-primary text-primary-foreground px-3 py-1 text-[10px] tracking-[0.25em] uppercase">After</div>
      <div className="absolute top-0 bottom-0 w-px bg-ivory shadow-[0_0_20px_rgba(0,0,0,0.4)]" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-11 w-11 rounded-full bg-ivory grid place-items-center shadow-xl">
          <div className="flex gap-0.5">
            <span className="w-1 h-4 bg-ink/40 rounded-full" />
            <span className="w-1 h-4 bg-ink/40 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

function TreatmentCases({ cases }: { cases: TreatmentCase[] }) {
  const [active, setActive] = useState(0);
  const c = cases[active];
  return (
    <div className="relative">
      {/* Numbered tabs */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
          {cases.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`shrink-0 h-9 min-w-9 px-3 rounded-full border text-xs font-display transition-colors ${
                active === i
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-ivory border-ink/15 text-ink/60 hover:border-primary"
              }`}
            >
              0{i + 1}
            </button>
          ))}
        </div>
        <p className="text-[10px] uppercase tracking-[0.25em] text-ink/50 whitespace-nowrap hidden md:block">
          Case 0{active + 1} / 0{cases.length}
        </p>
      </div>

      {/* Single active treatment case */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="space-y-3"
        >
          <div className="flex items-start gap-3">
            <span className="font-display text-3xl text-primary leading-none">0{active + 1}</span>
            <div>
              <h4 className="font-display text-xl leading-tight">{c.title}</h4>
              <p className="mt-0.5 text-xs text-ink/60">{c.note}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Gallery items={c.gallery} />
            <BeforeAfterSlider before={c.before} after={c.after} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function ExpandableServiceCard({
  data,
  index,
  variant = "compact",
}: {
  data: ServiceCardData;
  index: number;
  variant?: "wide" | "compact";
}) {
  const [open, setOpen] = useState(false);
  const isWide = variant === "wide" && !!data.image;
  return (
    <>
      <motion.button
        layout
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
        whileHover={{ y: -10, scale: 1.03 }}
        className={`group relative text-left w-full h-full rounded-[2rem] cream-texture border border-ink/8 overflow-hidden shadow-[0_2px_10px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.18)] transition-shadow ${
          isWide ? "p-6 lg:p-8" : "p-8 lg:p-10"
        }`}
      >
        <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition" />
        {isWide ? (
          <div className="relative grid grid-cols-5 gap-6 items-center h-full">
            <div className="col-span-3 flex flex-col h-full">
              <div className="flex items-start justify-between gap-4">
                <span className="font-display text-2xl text-ink/30">0{index + 1}</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-primary bg-primary/10 px-3 py-1 rounded-full">{data.tag}</span>
              </div>
              <h3 className="font-display text-3xl lg:text-4xl mt-6 leading-[1.05] text-primary">{data.name}</h3>
              <p className="mt-3 text-sm text-ink/60">{data.desc}</p>
              <div className="mt-auto pt-6 flex items-center justify-between gap-4">
                <span className="text-xs uppercase tracking-[0.25em] text-ink/50">{data.price}</span>
                <span className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-ink text-ivory text-[11px] uppercase tracking-[0.25em] group-hover:bg-primary transition-colors">
                  Book now →
                </span>
              </div>
            </div>
            <div className="col-span-2 h-full min-h-[220px] rounded-2xl overflow-hidden">
              <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
            </div>
          </div>
        ) : (
          <div className="relative flex flex-col h-full">
            <div className="flex items-start justify-between gap-4">
              <span className="font-display text-2xl text-ink/30">0{index + 1}</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-primary bg-primary/10 px-3 py-1 rounded-full">{data.tag}</span>
            </div>
            <h3 className="font-display text-3xl lg:text-4xl mt-8 leading-[1.05] text-primary">{data.name}</h3>
            <p className="mt-3 text-sm text-ink/60">{data.desc}</p>
            <div className="mt-auto pt-8 flex items-center justify-between gap-4">
              <span className="text-xs uppercase tracking-[0.25em] text-ink/50">{data.price}</span>
              <span className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-ink text-ivory text-[11px] uppercase tracking-[0.25em] group-hover:bg-primary transition-colors">
                Book now →
              </span>
            </div>
          </div>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm p-3 sm:p-5 grid place-items-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 240, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[1300px] max-h-[94vh] rounded-[2rem] bg-ivory overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Top bar with appointment slide */}
              <div className="shrink-0 flex items-center gap-4 bg-ivory/95 backdrop-blur border-b border-ink/8 px-5 py-3">
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-primary">{data.tag}</p>
                  <h2 className="font-display text-xl lg:text-2xl leading-tight truncate">{data.name}</h2>
                </div>
                <div className="hidden sm:block w-72 shrink-0">
                  <SlideToConfirm
                    label="Book appointment"
                    confirmedLabel="Opening booking"
                    size="sm"
                    onConfirm={() => (window.location.href = "/contact")}
                  />
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="h-10 w-10 rounded-full border border-ink/15 grid place-items-center hover:bg-cream shrink-0"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 lg:px-8 py-5">
                <p className="text-ink/70 text-sm max-w-2xl">{data.long}</p>
                <div className="mt-5">
                  <TreatmentCases cases={data.cases} />
                </div>
                <div className="sm:hidden mt-6">
                  <SlideToConfirm
                    label="Book appointment"
                    onConfirm={() => (window.location.href = "/contact")}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
