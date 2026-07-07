import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { SlideToConfirm } from "./SlideToConfirm";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/den-care", label: "Den Care" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
] as const;

function Wordmark({ tone = "ink" }: { tone?: "ink" | "ivory" }) {
  const t = tone === "ivory" ? "text-ivory" : "text-ink";
  return (
    <Link to="/" className={`flex items-baseline gap-1 ${t}`}>
      <span className="font-display text-2xl leading-none">Dental</span>
      <span className="font-display text-2xl leading-none text-primary italic">Den</span>
      <span className="ml-1 h-1.5 w-1.5 rounded-full bg-primary" />
    </Link>
  );
}

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${scrolled ? "bg-ivory/85 backdrop-blur-xl border-b border-ink/8" : "bg-transparent"}`}
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 h-20 flex items-center justify-between">
          <Wordmark />
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => {
              const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className="relative px-4 py-2 text-sm text-ink/80 hover:text-ink transition-colors"
                >
                  {n.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-primary"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="hidden lg:block w-56">
            <SlideToConfirm
              label="Book Appointment"
              confirmedLabel="Opening booking"
              size="sm"
              onConfirm={() => (window.location.href = "/contact")}
            />
          </div>
          <button
            className="lg:hidden h-11 w-11 grid place-items-center rounded-full border border-ink/15 bg-ivory/70 backdrop-blur"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink text-ivory p-6 flex flex-col"
          >
            <div className="flex items-center justify-between">
              <Wordmark tone="ivory" />
              <button
                onClick={() => setOpen(false)}
                className="h-11 w-11 grid place-items-center rounded-full border border-ivory/20"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-14 flex flex-col gap-2">
              {NAV.map((n, i) => (
                <motion.div
                  key={n.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    to={n.to}
                    className="block py-3 font-display text-4xl border-b border-ivory/10"
                  >
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto pt-8">
              <SlideToConfirm
                label="Book Appointment"
                confirmedLabel="Opening booking"
                tone="ivory"
                onConfirm={() => (window.location.href = "/contact")}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function WhatsAppFloater() {
  return (
    <a
      href="https://wa.me/919900087667?text=Hi%20Dental%20Den%2C%20I%27d%20like%20to%20book%20an%20appointment"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-30 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative flex items-center gap-3 rounded-full bg-ink text-ivory pl-4 pr-5 py-3 shadow-2xl">
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary">
          <MessageCircle className="h-4 w-4" />
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40" />
        </span>
        <span className="text-xs tracking-[0.2em] uppercase hidden sm:inline">Chat</span>
      </div>
    </a>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-ivory grain">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.3em] text-ivory/50">We Design</p>
            <h3 className="font-display text-6xl lg:text-7xl mt-3">
              Your <em className="text-primary not-italic">Smile.</em>
            </h3>
            <div className="mt-8 max-w-sm">
              <SlideToConfirm
                label="Book your first visit"
                tone="ivory"
                onConfirm={() => (window.location.href = "/contact")}
              />
            </div>
          </div>
          <div className="lg:col-span-3">
            <p className="text-xs uppercase tracking-[0.3em] text-ivory/50 mb-4">Explore</p>
            <ul className="space-y-2 text-sm">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-ivory/80 hover:text-primary transition-colors">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/first-visit" className="text-ivory/80 hover:text-primary transition-colors">
                  Your First Visit
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-ivory/50 mb-4">Visit</p>
            <address className="not-italic text-sm text-ivory/80 leading-relaxed">
              Dental Den · Hennur<br />
              Bengaluru, Karnataka<br />
              +91 99000 87667<br />
              dentalden@gmail.com
            </address>
            <div className="mt-6 flex gap-2 text-xs">
              {["Instagram", "Facebook", "LinkedIn"].map((s) => (
                <a key={s} href="#" className="px-3 py-1.5 rounded-full border border-ivory/20 hover:bg-ivory hover:text-ink transition">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-16 pt-6 border-t border-ivory/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-ivory/50">
          <span>© 2026 Dental Den. All rights reserved.</span>
          <span>16 Years · 25,000+ Patients · 4.7★ Google</span>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
      <WhatsAppFloater />
    </div>
  );
}