import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#capabilities", label: "Product" },
  { href: "#gallery", label: "Showcase" },
  { href: "#customers", label: "Customers" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(v > 20);
    setHidden(v > 400 && v > prev);
  });
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4"
      >
        <nav className={cn("mx-auto flex max-w-[1320px] items-center justify-between rounded-full py-2 pl-5 pr-2 transition-all duration-500", scrolled ? "bg-white/80 shadow-soft ring-1 ring-ink/[0.06] backdrop-blur-xl" : "bg-transparent")}>
          <Logo />
          <ul className="hidden items-center lg:flex" onMouseLeave={() => setHover(null)}>
            {LINKS.map((l) => (
              <li key={l.href} className="relative">
                <a href={l.href} onMouseEnter={() => setHover(l.href)} className="relative z-10 block px-4 py-2 text-[14px] text-ink/65 transition-colors hover:text-ink">{l.label}</a>
                {hover === l.href && <motion.span layoutId="nav-hover" className="absolute inset-0 rounded-full bg-ink/[0.05]" transition={{ type: "spring", stiffness: 400, damping: 35 }} />}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1.5">
            <Link to="/login" className="hidden rounded-full px-4 py-2 text-[14px] text-ink/70 transition hover:text-ink sm:block">Log in</Link>
            <Link to="/signup" className="hidden sm:block"><Button className="h-10 px-5">Start for free</Button></Link>
            <button className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="h-4 w-4" /></button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ clipPath: "circle(0% at 100% 0%)" }} animate={{ clipPath: "circle(150% at 100% 0%)" }} exit={{ clipPath: "circle(0% at 100% 0%)" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="fixed inset-0 z-[60] flex flex-col bg-ink p-5 text-white lg:hidden">
            <div className="flex items-center justify-between">
              <Logo light />
              <button className="grid h-10 w-10 place-items-center rounded-full bg-brand text-ink" onClick={() => setOpen(false)} aria-label="Close menu"><X className="h-4 w-4" /></button>
            </div>
            <div className="mt-12 flex flex-col">
              {LINKS.map((l, i) => (
                <motion.a key={l.href} href={l.href} onClick={() => setOpen(false)} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + 0.06 * i }} className="flex items-center justify-between border-b border-white/10 py-5 text-4xl font-medium tracking-tight">
                  {l.label}<ArrowUpRight className="h-6 w-6 text-brand" />
                </motion.a>
              ))}
            </div>
            <Link to="/signup" className="mt-auto"><Button variant="brand" size="xl" className="w-full">Start for free</Button></Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const FOOTER = {
  Product: ["AI Chat", "Image Studio", "Writer", "Workflows", "API", "Changelog"],
  Company: ["About", "Careers", "Journal", "Press kit"],
  Resources: ["Docs", "Guides", "Community", "Status"],
  Legal: ["Privacy", "Terms", "Security", "DPA"],
};

export function Footer() {
  return (
    <footer className="px-3 pb-3 md:px-5 md:pb-5">
      <div className="relative overflow-hidden rounded-5xl bg-ink px-6 pt-16 text-white md:px-14 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo light />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/55">The creative AI workspace for teams who care about craft. Write, design and automate — beautifully.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-8 flex max-w-sm items-center gap-2 rounded-full bg-white/[0.07] p-1.5 pl-5 ring-1 ring-white/10 focus-within:ring-brand">
              <input placeholder="Your email for the monthly letter" className="h-9 flex-1 bg-transparent text-sm outline-none placeholder:text-white/35" />
              <Button variant="brand" size="sm" className="h-9">Subscribe</Button>
            </form>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {Object.entries(FOOTER).map(([k, v]) => (
              <div key={k}>
                <h4 className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">{k}</h4>
                <ul className="mt-5 space-y-3">
                  {v.map((x) => <li key={x}><a href="#" className="text-[14px] text-white/75 transition hover:text-brand">{x}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-white/10 py-6 font-mono text-[11px] uppercase tracking-wider text-white/40 sm:flex-row">
          <span>© 2026 Nexora Labs · Made with care in Berlin</span>
          <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" /> All systems operational</span>
        </div>
        <div className="pointer-events-none select-none">
          <p className="-mb-[0.22em] text-center text-[25vw] font-semibold leading-none tracking-[-0.07em] text-white/[0.06] md:text-[22vw]">
            nexora<span className="serif-i text-brand/20">.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
