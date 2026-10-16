import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Play, X, Star, Quote } from "lucide-react";

export interface VideoReview {
  name: string;
  city?: string;
  poster: string;
  videoSrc?: string;
  quote?: string;
  treatment: string;
  rating?: number;
}

export function VideoReviewsMarquee({ items }: { items: VideoReview[] }) {
  const [active, setActive] = useState<number | null>(null);
  // duplicate list to loop seamlessly
  const loop = [...items, ...items];

  return (
    <div className="relative">
      {/* soft edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-cream to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-cream to-transparent z-10" />

      <div
        className="group/track overflow-hidden"
        // pause the marquee on hover so the user can aim a card
        style={{ ["--play-state" as string]: "running" }}
      >
        <div className="flex gap-6 marquee-slow w-max py-6 group-hover/track:[animation-play-state:paused]">
          {loop.map((r, i) => (
            <button
              key={i}
              onClick={() => setActive(i % items.length)}
              className="relative shrink-0 w-[220px] md:w-[260px] aspect-[9/16] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-25px_rgba(0,0,0,0.35)] group/card focus:outline-none focus:ring-2 focus:ring-primary transition-transform hover:-translate-y-2"
              aria-label={`Play video review from ${r.name}`}
            >
              <img
                src={r.poster}
                alt={`${r.name} video review`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />

              {/* Play badge */}
              <div className="absolute inset-0 grid place-items-center">
                <span className="h-16 w-16 rounded-full bg-ivory/90 backdrop-blur grid place-items-center shadow-2xl transition-transform group-hover/card:scale-110">
                  <Play className="h-6 w-6 text-primary fill-primary translate-x-[2px]" />
                </span>
              </div>

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="rounded-full bg-ivory/90 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-ink">
                  {r.treatment}
                </span>
                {r.rating && (
                  <span className="flex items-center gap-0.5 rounded-full bg-ink/50 backdrop-blur px-2 py-1 text-[10px] text-ivory">
                    {r.rating.toFixed(1)}
                    <Star className="h-3 w-3 fill-current text-primary" />
                  </span>
                )}
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-ivory text-left">
                <p className="font-display text-xl leading-tight">{r.name}</p>
                <p className="text-[11px] tracking-[0.2em] uppercase opacity-80 mt-0.5">{r.city}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 grid place-items-center p-4 sm:p-8 bg-ink/50 backdrop-blur-xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 240, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[420px] md:max-w-[460px] rounded-[2.2rem] overflow-hidden bg-ivory shadow-2xl"
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute top-4 right-4 z-20 h-10 w-10 rounded-full bg-ivory/90 grid place-items-center shadow-lg hover:bg-ivory"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative aspect-[9/16] bg-ink">
                {items[active].videoSrc ? (
                  <video
                    src={items[active].videoSrc}
                    poster={items[active].poster}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <img
                      src={items[active].poster}
                      alt={items[active].name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="text-center px-8">
                        <span className="mx-auto h-20 w-20 rounded-full bg-ivory/95 grid place-items-center shadow-2xl">
                          <Play className="h-8 w-8 text-primary fill-primary translate-x-[2px]" />
                        </span>
                        <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-ivory/80">
                          Video story
                        </p>
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 text-ivory">
                      <Quote className="h-6 w-6 text-primary mb-3" />
                      <p className="font-display text-lg leading-snug">
                        &ldquo;{items[active].quote}&rdquo;
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-2xl leading-tight">{items[active].name}</p>
                    {items[active].city && (
                      <p className="text-xs tracking-[0.2em] uppercase text-ink/50 mt-1">
                        {items[active].city}
                      </p>
                    )}
                  </div>
                  <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-[10px] uppercase tracking-[0.25em]">
                    {items[active].treatment}
                  </span>
                </div>
                {items[active].videoSrc && items[active].quote && (
                  <p className="mt-4 text-sm text-ink/70 leading-relaxed">
                    &ldquo;{items[active].quote}&rdquo;
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}