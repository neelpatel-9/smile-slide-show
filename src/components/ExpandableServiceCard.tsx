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

export interface ServiceCardData {
  name: string;
  tag: string;
  desc: string;
  long: string;
  price: string;
  color: string; // tailwind bg class for the pill
  gallery: ServiceMedia[];
  before: string;
  after: string;
}

function Gallery({ items }: { items: ServiceMedia[] }) {
  const [i, setI] = useState(0);
  const next = () => setI((i + 1) % items.length);
  const prev = () => setI((i - 1 + items.length) % items.length);
  const item = items[i];
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-ink/5">
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
      className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl cursor-ew-resize select-none bg-cream"
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

export function ExpandableServiceCard({ data, index }: { data: ServiceCardData; index: number }) {
  const [open, setOpen] = useState(false);
  const delayClass = ["", "float-delay-1", "float-delay-2", "float-delay-3", "float-delay-4", "float-delay-5"][index % 6];
  return (
    <>
      <div className={`float-badge ${delayClass}`}>
      <motion.button
        layout
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
        whileHover={{ y: -6 }}
        className={`group relative text-left w-full rounded-[2.5rem] p-8 lg:p-10 border border-ink/8 overflow-hidden transition-shadow hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)] ${data.color}`}
      >
        <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition" />
        <div className="relative flex items-start justify-between gap-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-primary">{data.tag}</span>
          <span className="font-display text-2xl text-ink/30">0{index + 1}</span>
        </div>
        <h3 className="relative font-display text-4xl lg:text-5xl mt-14 leading-[1]">{data.name}</h3>
        <p className="relative mt-4 text-sm text-ink/60 max-w-xs">{data.desc}</p>
        <div className="relative mt-10 flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.25em] text-ink/50">{data.price}</span>
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary">
            Tap to open
            <span className="h-8 w-8 rounded-full bg-primary text-primary-foreground grid place-items-center group-hover:rotate-45 transition-transform">
              +
            </span>
          </span>
        </div>
      </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto grid place-items-start sm:place-items-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 240, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[1200px] my-6 rounded-[2rem] bg-ivory overflow-hidden shadow-2xl"
            >
              {/* Top bar with appointment slide */}
              <div className="sticky top-0 z-10 flex items-center gap-4 bg-ivory/95 backdrop-blur border-b border-ink/8 px-5 py-4">
                <div className="flex-1 max-w-md">
                  <SlideToConfirm
                    label="Slide to book appointment"
                    confirmedLabel="Opening booking"
                    size="sm"
                    onConfirm={() => (window.location.href = "/contact")}
                  />
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="h-11 w-11 rounded-full border border-ink/15 grid place-items-center hover:bg-cream"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 lg:p-10">
                <p className="text-[10px] uppercase tracking-[0.3em] text-primary">{data.tag}</p>
                <h2 className="font-display text-4xl lg:text-6xl mt-2 leading-[1]">{data.name}</h2>
                <p className="mt-5 text-ink/70 max-w-2xl">{data.long}</p>

                <div className="mt-10 grid lg:grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3">— Treatments · photos & video</p>
                    <Gallery items={data.gallery} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3">— Before / after · drag the handle</p>
                    <BeforeAfterSlider before={data.before} after={data.after} />
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-ink/10 pt-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-ink/50">Investment starts at</p>
                    <p className="font-display text-3xl mt-1">{data.price}</p>
                  </div>
                  <div className="w-full sm:w-80">
                    <SlideToConfirm
                      label={`Book ${data.name}`}
                      onConfirm={() => (window.location.href = "/contact")}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}