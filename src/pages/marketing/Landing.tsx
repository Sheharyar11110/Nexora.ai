import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import {
  ArrowUpRight, BarChart3, Check, CheckCircle2, ImageIcon, MessageSquare, PenLine, Play, Plus, Sparkles,
  Workflow, Zap, Bot, Slack, Mail, Database, Star,
} from "lucide-react";
import { Navbar, Footer } from "./Chrome";
import { CountUp, Magnetic, Marquee, MaskLine, Reveal, ScrollText, Tilt, WordRoll } from "@/components/effects";
import { ArrowButton, Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, Eyebrow, Img } from "@/components/ui/misc";
import { GALLERY, IMG, LOGOS, PEOPLE, PLANS, TESTIMONIALS } from "@/data/mock";
import { cn, unsplash } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Landing() {
  return (
    <div className="relative overflow-x-clip bg-background">
      <Navbar />
      <Hero />
      <Logos />
      <Manifesto />
      <Capabilities />
      <Impact />
      <Gallery />
      <Customers />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

/* ================================================================== */
/*  HERO                                                               */
/* ================================================================== */
function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  return (
    <section
      className="relative pt-32 md:pt-40"
      onMouseMove={(e) => {
        mx.set((e.clientX / window.innerWidth - 0.5) * 2);
        my.set((e.clientY / window.innerHeight - 0.5) * 2);
      }}
    >
      <div className="absolute inset-x-0 top-0 h-[900px] bg-grid mask-radial opacity-70" />

      <div className="container relative">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8, ease: EASE }} className="flex flex-wrap items-center justify-between gap-4">
          <a href="#capabilities" className="group inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-[13px] shadow-soft ring-1 ring-ink/[0.06]">
            <span className="rounded-full bg-brand px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider">New</span>
            Aurora 2.0 — photoreal images in under 2s
            <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:rotate-45" />
          </a>
          <p className="eyebrow hidden md:block">AI workspace · Est. 2026 · Berlin</p>
        </motion.div>

        <h1 className="mt-10 text-[clamp(3.1rem,8.6vw,8.6rem)] font-medium leading-[0.92] tracking-[-0.055em] text-ink">
          <MaskLine delay={0.15}>Your creative</MaskLine>
          <MaskLine delay={0.27}>
            <span className="inline-flex items-center gap-[0.18em]">
              <motion.span initial={{ width: 0 }} animate={{ width: "1.9em" }} transition={{ delay: 0.9, duration: 1, ease: EASE }} className="inline-block h-[0.78em] overflow-hidden rounded-full align-middle">
                <Img src={unsplash(GALLERY[1].id, 500)} alt="" className="h-full w-[1.9em]" />
              </motion.span>
              studio that
            </span>
          </MaskLine>
          <MaskLine delay={0.39}>
            <span className="inline-flex items-center gap-[0.2em]">
              <WordRoll words={["thinks", "writes", "designs", "ships"]} className="serif-i text-flame" />
              <span>with you.</span>
              <motion.span initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 1.2, type: "spring", stiffness: 160 }} className="relative hidden h-[0.85em] w-[0.85em] md:inline-block">
                <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow">
                  <defs><path id="circ" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" /></defs>
                  <circle cx="50" cy="50" r="50" fill="#D4FF3A" />
                  <text fontSize="10.5" fontFamily="Geist Mono" letterSpacing="2.6" fill="#111"><textPath href="#circ">TRY IT FREE • NO CARD • </textPath></text>
                </svg>
                <Sparkles className="absolute left-1/2 top-1/2 h-[0.28em] w-[0.28em] -translate-x-1/2 -translate-y-1/2 text-ink" />
              </motion.span>
            </span>
          </MaskLine>
        </h1>

        <div className="mt-10 grid items-end gap-8 md:grid-cols-[1fr_auto]">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }} className="max-w-xl text-lg leading-relaxed text-ink/60 md:text-xl">
            Nexora brings chat, image generation, writing and automation into one calm, crafted workspace —
            tuned to your team's <span className="marker text-ink">voice, taste and knowledge</span>.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.8 }} className="flex flex-wrap items-center gap-3">
            <Magnetic><Link to="/signup"><ArrowButton>Start creating free</ArrowButton></Link></Magnetic>
            <Link to="/app" className="group flex h-14 items-center gap-3 rounded-full px-4 text-[15px] font-medium">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-soft ring-1 ring-ink/10 transition group-hover:scale-110"><Play className="h-3.5 w-3.5 fill-ink" /></span>
              Explore the app
            </Link>
          </motion.div>
        </div>

        {/* Playground */}
        <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1.2, ease: EASE }} className="relative mt-16 md:mt-24">
          <Floater mx={sx} my={sy} depth={28} className="-left-4 -top-10 hidden lg:block" rotate={-6}>
            <div className="flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-lift ring-1 ring-ink/5">
              <Avatar src={PEOPLE.sarah} name="Sarah" className="h-9 w-9" />
              <div><p className="text-[13px] font-medium">Sarah left a comment</p><p className="text-xs text-ink/50">“This direction is 🔥 ship it”</p></div>
            </div>
          </Floater>
          <Floater mx={sx} my={sy} depth={-36} className="-right-10 top-[38%] hidden xl:block" rotate={7}>
            <div className="w-40 rounded-2xl bg-white p-2 pb-3 shadow-lift ring-1 ring-ink/5">
              <Img src={unsplash(GALLERY[0].id, 400)} alt="" className="aspect-square rounded-xl" />
              <p className="mt-2 px-1 font-mono text-[10px] uppercase tracking-wider text-ink/50">aurora · 1.8s</p>
            </div>
          </Floater>
          <Floater mx={sx} my={sy} depth={22} className="-bottom-8 -right-4 hidden lg:block" rotate={-4}>
            <div className="flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-[13px] font-medium shadow-lift"><CheckCircle2 className="h-4 w-4" /> 248 tickets triaged</div>
          </Floater>
          <Floater mx={sx} my={sy} depth={-20} className="-bottom-10 left-10 hidden lg:block" rotate={3}>
            <div className="rounded-2xl bg-ink px-4 py-3 text-white shadow-lift">
              <p className="font-mono text-[10px] uppercase tracking-wider text-white/50">Saved this week</p>
              <p className="text-2xl font-semibold tracking-tight">42<span className="serif-i text-brand"> hrs</span></p>
            </div>
          </Floater>
          <Playground />
        </motion.div>
      </div>
    </section>
  );
}

function Floater({ children, className, mx, my, depth, rotate = 0 }: { children: React.ReactNode; className?: string; mx: MotionValue<number>; my: MotionValue<number>; depth: number; rotate?: number }) {
  const x = useTransform(mx, [-1, 1], [-depth, depth]);
  const y = useTransform(my, [-1, 1], [-depth, depth]);
  return (
    <motion.div style={{ x, y, rotate }} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.6, type: "spring", stiffness: 120, damping: 14 }} className={cn("absolute z-20", className)}>
      {children}
    </motion.div>
  );
}

/* ---------- Interactive prompt playground ---------- */
const MODES = [
  { key: "write", label: "Write", icon: PenLine, prompt: "Write a launch announcement for our new AI note-taker. Warm, confident, 3 sentences.", bg: "bg-mint" },
  { key: "image", label: "Imagine", icon: ImageIcon, prompt: "Soft 3D sculpture of floating glass shapes, pastel studio light, editorial.", bg: "bg-peach" },
  { key: "automate", label: "Automate", icon: Workflow, prompt: "When a support ticket arrives, classify it, find the customer and draft a reply.", bg: "bg-mist" },
  { key: "analyze", label: "Analyze", icon: BarChart3, prompt: "Which channels drove the most qualified signups last quarter?", bg: "bg-lilac" },
] as const;
type ModeKey = (typeof MODES)[number]["key"];

const WRITE_OUT = "Meet Memo — the note-taker that actually listens. It captures every meeting, pulls out the decisions that matter, and hands you a crisp summary before you've closed the tab. Less typing, more thinking. Try it free today.";

function Playground() {
  const [mode, setMode] = useState<ModeKey>("write");
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "thinking" | "done">("typing");
  const [auto, setAuto] = useState(true);
  const m = MODES.find((x) => x.key === mode)!;

  useEffect(() => {
    setTyped("");
    setPhase("typing");
    let i = 0;
    let t2: ReturnType<typeof setTimeout>;
    const iv = setInterval(() => {
      i += 2;
      setTyped(m.prompt.slice(0, i));
      if (i >= m.prompt.length) {
        clearInterval(iv);
        setPhase("thinking");
        t2 = setTimeout(() => setPhase("done"), 900);
      }
    }, 22);
    return () => { clearInterval(iv); clearTimeout(t2); };
  }, [mode, m.prompt]);

  useEffect(() => {
    if (!auto || phase !== "done") return;
    const t = setTimeout(() => {
      const idx = MODES.findIndex((x) => x.key === mode);
      setMode(MODES[(idx + 1) % MODES.length].key);
    }, 4200);
    return () => clearTimeout(t);
  }, [phase, auto, mode]);

  return (
    <div className="relative rounded-[28px] bg-white p-2 shadow-lift ring-1 ring-ink/[0.06] md:rounded-[36px] md:p-3">
      <div className="flex flex-wrap items-center justify-between gap-3 px-3 pb-3 pt-2 md:px-4">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" /><span className="h-2.5 w-2.5 rounded-full bg-ink/15" /><span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="ml-3 font-mono text-[11px] text-ink/40">nexora.ai / playground</span>
        </div>
        <div className="flex gap-1 rounded-full bg-paper p-1">
          {MODES.map((x) => (
            <button key={x.key} onClick={() => { setAuto(false); setMode(x.key); }} className={cn("relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors md:px-4", mode === x.key ? "text-ink" : "text-ink/45 hover:text-ink")}>
              {mode === x.key && <motion.span layoutId="pg-tab" className="absolute inset-0 rounded-full bg-white shadow-soft" transition={{ type: "spring", stiffness: 500, damping: 38 }} />}
              <x.icon className="relative h-3.5 w-3.5" /><span className="relative hidden sm:inline">{x.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-2 md:grid-cols-[0.9fr_1.1fr] md:gap-3">
        <div className={cn("flex min-h-[220px] flex-col rounded-[22px] p-6 transition-colors duration-700 md:min-h-[400px] md:rounded-[28px] md:p-8", m.bg)}>
          <p className="eyebrow">Your prompt</p>
          <p className="mt-4 text-xl font-medium leading-snug tracking-tight text-ink md:text-[28px]">
            {typed}
            {phase === "typing" && <span className="ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-[0.12em] animate-blink bg-ink" />}
          </p>
          <div className="mt-auto flex items-center gap-2 pt-6">
            <span className="rounded-full bg-white/70 px-3 py-1.5 font-mono text-[11px] text-ink/60">model · nexora-ultra</span>
            <span className="rounded-full bg-white/70 px-3 py-1.5 font-mono text-[11px] text-ink/60">tone · brand voice</span>
            <span className="ml-auto grid h-11 w-11 place-items-center rounded-full bg-ink text-brand"><ArrowUpRight className="h-5 w-5" /></span>
          </div>
        </div>

        <div className="relative min-h-[300px] overflow-hidden rounded-[22px] border border-ink/[0.06] bg-paper/60 p-6 md:min-h-[400px] md:rounded-[28px] md:p-8">
          <div className="flex items-center justify-between">
            <p className="eyebrow">Output</p>
            <AnimatePresence mode="wait">
              {phase === "thinking" && <motion.span key="t" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 font-mono text-[11px] text-ink/50"><span className="h-1.5 w-1.5 animate-ping rounded-full bg-flame" /> thinking</motion.span>}
              {phase === "done" && <motion.span key="d" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5 font-mono text-[11px] text-mint-deep"><Check className="h-3 w-3" /> done in 1.4s</motion.span>}
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            {phase === "done" ? (
              <motion.div key={mode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-5">
                <Output mode={mode} />
              </motion.div>
            ) : (
              <motion.div key="skeleton" exit={{ opacity: 0 }} className="mt-6 space-y-3">
                {[90, 75, 82, 50].map((w, i) => <div key={i} className="h-3 animate-pulse rounded-full bg-ink/[0.06]" style={{ width: `${w}%` }} />)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Output({ mode }: { mode: ModeKey }) {
  if (mode === "write") {
    const words = WRITE_OUT.split(" ");
    return (
      <div>
        <p className="text-[26px] leading-tight tracking-tight"><span className="serif-i">Meet</span> Memo.</p>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
          {words.map((w, i) => (
            <motion.span key={i} initial={{ opacity: 0, filter: "blur(4px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ delay: i * 0.03 }}>{w} </motion.span>
          ))}
        </p>
        <div className="mt-5 flex gap-2"><Badge variant="success">Readability 92</Badge><Badge variant="lilac">On-brand ✓</Badge></div>
      </div>
    );
  }
  if (mode === "image") {
    return (
      <div className="grid grid-cols-2 gap-2">
        {[GALLERY[1].id, GALLERY[4].id, GALLERY[8].id, GALLERY[3].id].map((id, i) => (
          <motion.div key={id} initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }} transition={{ delay: i * 0.12, duration: 0.9, ease: EASE }}>
            <Img src={unsplash(id, 500)} alt="" className="aspect-[4/3] rounded-2xl" />
          </motion.div>
        ))}
      </div>
    );
  }
  if (mode === "automate") {
    const steps = [
      { icon: Mail, t: "Ticket received", s: "#48213 · billing question" },
      { icon: Bot, t: "Classified intent", s: "Billing / urgent · 0.94" },
      { icon: Database, t: "Customer found", s: "Acme Corp · Enterprise" },
      { icon: Slack, t: "Reply drafted", s: "Queued for review in #support" },
    ];
    return (
      <ol className="relative space-y-3 before:absolute before:bottom-5 before:left-5 before:top-5 before:w-px before:bg-ink/10">
        {steps.map((s, i) => (
          <motion.li key={s.t} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.25 }} className="relative flex items-center gap-3 rounded-2xl bg-white p-2.5 pr-4 shadow-soft">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-brand"><s.icon className="h-4 w-4" /></span>
            <div className="flex-1"><p className="text-sm font-medium">{s.t}</p><p className="text-xs text-ink/50">{s.s}</p></div>
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.25 + 0.3, type: "spring" }}><CheckCircle2 className="h-4 w-4 text-mint-deep" /></motion.span>
          </motion.li>
        ))}
      </ol>
    );
  }
  const bars = [{ l: "Organic", v: 86 }, { l: "Referral", v: 64 }, { l: "Paid social", v: 41 }, { l: "Events", v: 22 }];
  return (
    <div>
      <p className="text-[15px] leading-relaxed text-ink/70"><b className="font-medium text-ink">Organic search</b> drove 38% of qualified signups — 2.1× more than paid social.</p>
      <div className="mt-5 space-y-3">
        {bars.map((b, i) => (
          <div key={b.l} className="grid grid-cols-[90px_1fr_36px] items-center gap-3 text-sm">
            <span className="text-ink/60">{b.l}</span>
            <div className="h-7 overflow-hidden rounded-lg bg-ink/[0.05]"><motion.div initial={{ width: 0 }} animate={{ width: `${b.v}%` }} transition={{ delay: i * 0.12, duration: 1, ease: EASE }} className={cn("h-full rounded-lg", i === 0 ? "bg-ink" : "bg-ink/25")} /></div>
            <span className="text-right font-mono text-xs tabular-nums">{b.v}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
function Logos() {
  const styles = ["font-semibold tracking-tight", "serif-i text-[28px]", "font-mono uppercase tracking-widest text-[17px]", "font-bold tracking-tighter", "font-light tracking-wide"];
  return (
    <section className="pb-10 pt-28 md:pt-36">
      <p className="eyebrow mb-8 text-center">Trusted by 48,000+ teams who care about craft</p>
      <Marquee duration={38} gap="4.5rem">
        {LOGOS.map((l, i) => (
          <span key={l} className={cn("flex items-center gap-2 text-2xl text-ink/45 transition hover:text-ink", styles[i % styles.length])}>
            <span className="h-2 w-2 rounded-full bg-current" />{l}
          </span>
        ))}
      </Marquee>
    </section>
  );
}

/* ================================================================== */
function Manifesto() {
  return (
    <section className="container py-24 md:py-40">
      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <Eyebrow n="01">Manifesto</Eyebrow>
        <ScrollText
          className="text-[clamp(1.8rem,4.2vw,3.6rem)] font-medium leading-[1.12] tracking-[-0.04em]"
          highlight={["vending", "taste", "craft", "different"]}
          text="Most AI tools feel like vending machines. Prompt in, generic out. Nexora is different — a studio where your team's taste, voice and knowledge shape every output. Less noise. More craft."
        />
      </div>
    </section>
  );
}

/* ================================================================== */
const CAPS = [
  { n: "01", title: "Chat", serif: "that knows you", desc: "Ground answers in your docs, Notion and Drive. Cited, private and genuinely useful — with frontier reasoning built in.", points: ["Cited answers from your knowledge", "Code, data & web tools", "Shared team threads"], bg: "bg-lilac", icon: MessageSquare, visual: "chat" },
  { n: "02", title: "Images", serif: "with taste", desc: "Generate editorial-grade visuals in your brand style. Inpaint, upscale and remix without leaving the canvas.", points: ["Brand style presets", "4K upscale & inpaint", "Export to Figma"], bg: "bg-peach", icon: ImageIcon, visual: "image" },
  { n: "03", title: "Writing", serif: "in your voice", desc: "Train Nexora on your tone once. Every post, email and page then sounds unmistakably like your team.", points: ["Brand voice training", "40+ expert templates", "SEO & readability scores"], bg: "bg-mint", icon: PenLine, visual: "write" },
  { n: "04", title: "Automation", serif: "that runs itself", desc: "Chain models, tools and APIs into agents that triage, enrich and publish — while you focus on the work that matters.", points: ["Visual drag & drop builder", "200+ integrations", "Human-in-the-loop approvals"], bg: "bg-mist", icon: Workflow, visual: "flow" },
] as const;

function Capabilities() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section id="capabilities" className="relative">
      <div className="container">
        <div className="grid gap-6 pb-10 lg:grid-cols-[220px_1fr]">
          <Eyebrow n="02">Capabilities</Eyebrow>
          <Reveal>
            <h2 className="max-w-4xl text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.05em]">
              Four tools. One <span className="serif-i">studio.</span> Zero tab-switching.
            </h2>
          </Reveal>
        </div>
        <div ref={ref} className="relative">
          {CAPS.map((c, i) => <CapCard key={c.n} c={c} i={i} progress={scrollYProgress} />)}
        </div>
      </div>
    </section>
  );
}

function CapCard({ c, i, progress }: { c: (typeof CAPS)[number]; i: number; progress: MotionValue<number> }) {
  const target = 1 - (CAPS.length - i - 1) * 0.045;
  const scale = useTransform(progress, [i / CAPS.length, 1], [1, target]);
  return (
    <div className="py-3 md:sticky md:top-0 md:flex md:h-screen md:items-center md:py-0">
      <motion.div
        style={{ scale, top: `calc(${i * 26}px)` }}
        className={cn("relative grid w-full origin-top gap-8 overflow-hidden rounded-[32px] p-7 md:h-[min(620px,78vh)] md:grid-cols-2 md:rounded-[40px] md:p-12", c.bg)}
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-brand"><c.icon className="h-5 w-5" /></span>
            <span className="font-mono text-sm text-ink/50">{c.n} / 04</span>
          </div>
          <h3 className="mt-8 text-[clamp(2.2rem,4.4vw,4rem)] font-medium leading-[0.95] tracking-[-0.05em]">
            {c.title}<br /><span className="serif-i">{c.serif}</span>
          </h3>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-ink/65">{c.desc}</p>
          <ul className="mt-6 space-y-2.5">
            {c.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[15px]"><span className="grid h-5 w-5 place-items-center rounded-full bg-ink text-brand"><Check className="h-3 w-3" strokeWidth={3} /></span>{p}</li>
            ))}
          </ul>
          <Link to="/app" className="mt-auto hidden w-fit items-center gap-2 pt-8 text-[15px] font-medium underline-offset-4 hover:underline md:flex">Explore {c.title.toLowerCase()} <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
        <div className="relative min-h-[300px]">
          <CapVisual kind={c.visual} />
        </div>
      </motion.div>
    </div>
  );
}

function CapVisual({ kind }: { kind: string }) {
  if (kind === "chat")
    return (
      <div className="absolute inset-0 flex flex-col justify-center gap-3">
        <div className="ml-auto max-w-[80%] rounded-3xl rounded-br-lg bg-ink px-5 py-3.5 text-[15px] text-white">What drove churn last quarter?</div>
        <div className="max-w-[90%] rounded-3xl rounded-bl-lg bg-white p-5 shadow-soft">
          <p className="flex items-center gap-2 text-xs text-ink/50"><Sparkles className="h-3.5 w-3.5 text-flame" /> Nexora · 3 sources</p>
          <p className="mt-2 text-[15px] leading-relaxed">Top drivers were <span className="marker">onboarding drop-off (38%)</span>, missing SSO (22%) and pricing confusion (17%).</p>
          <div className="mt-3 flex flex-wrap gap-1.5">{["Q3 report.pdf", "Zendesk", "Mixpanel"].map((s) => <span key={s} className="rounded-full bg-paper px-2.5 py-1 font-mono text-[10px] text-ink/60">{s}</span>)}</div>
        </div>
        <div className="ml-auto max-w-[70%] rounded-3xl rounded-br-lg bg-ink px-5 py-3.5 text-[15px] text-white">Draft a fix plan for #1 ✦</div>
      </div>
    );
  if (kind === "image")
    return (
      <div className="absolute inset-0">
        {[{ id: GALLERY[1].id, c: "left-[4%] top-[8%] w-[52%] -rotate-6" }, { id: GALLERY[5].id, c: "right-[2%] top-[2%] w-[44%] rotate-6" }, { id: GALLERY[6].id, c: "bottom-[2%] left-[24%] w-[52%] rotate-2" }].map((x, i) => (
          <motion.div key={x.id} whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }} className={cn("absolute rounded-3xl bg-white p-2 shadow-lift", x.c)} style={{ zIndex: i }}>
            <Img src={unsplash(x.id, 600)} alt="" className="aspect-square rounded-2xl" />
          </motion.div>
        ))}
      </div>
    );
  if (kind === "write")
    return (
      <div className="absolute inset-0 flex items-center">
        <div className="w-full rounded-3xl bg-white p-6 shadow-lift md:p-8">
          <div className="flex items-center justify-between"><span className="font-mono text-[10px] uppercase tracking-wider text-ink/40">Draft · blog post</span><Badge variant="success">SEO 94</Badge></div>
          <p className="mt-4 text-2xl font-medium leading-tight tracking-tight">How AI is reshaping <span className="serif-i">creative</span> teams</p>
          <p className="mt-3 text-[15px] leading-relaxed text-ink/60">Creative work used to be bottlenecked by production. Today the bottleneck is <span className="marker text-ink">taste</span> — and that's great news for teams who…</p>
          <div className="mt-5 space-y-2">{[100, 92, 70].map((w) => <div key={w} className="h-2 rounded-full bg-ink/[0.06]" style={{ width: `${w}%` }} />)}</div>
          <div className="mt-5 flex items-center gap-2 rounded-2xl bg-paper p-2.5 text-xs text-ink/60"><Sparkles className="h-3.5 w-3.5 text-flame" /> Rewrite in “Friendly” tone? <span className="ml-auto rounded-full bg-ink px-2.5 py-1 text-white">Apply</span></div>
        </div>
      </div>
    );
  const nodes = [
    { x: "4%", y: "12%", icon: Mail, t: "New ticket" },
    { x: "50%", y: "34%", icon: Bot, t: "Classify" },
    { x: "8%", y: "58%", icon: Database, t: "Lookup" },
    { x: "48%", y: "78%", icon: Slack, t: "Notify team" },
  ];
  return (
    <div className="absolute inset-0">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {["M22,18 C40,18 40,40 58,40", "M58,44 C40,52 30,56 26,64", "M26,68 C40,80 48,84 58,84"].map((d) => (
          <g key={d}>
            <path d={d} stroke="rgba(17,17,17,.15)" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
            <path d={d} stroke="#111" strokeWidth="2" fill="none" strokeDasharray="4 10" vectorEffect="non-scaling-stroke">
              <animate attributeName="stroke-dashoffset" from="28" to="0" dur="1.2s" repeatCount="indefinite" />
            </path>
          </g>
        ))}
      </svg>
      {nodes.map((n) => (
        <div key={n.t} className="absolute flex items-center gap-3 rounded-2xl bg-white p-2 pr-5 shadow-lift" style={{ left: n.x, top: n.y }}>
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-brand"><n.icon className="h-4 w-4" /></span>
          <span className="text-sm font-medium">{n.t}</span>
        </div>
      ))}
    </div>
  );
}

/* ================================================================== */
function Impact() {
  return (
    <section className="container py-24 md:py-36">
      <div className="grid gap-6 pb-12 lg:grid-cols-[220px_1fr]">
        <Eyebrow n="03">Impact</Eyebrow>
        <Reveal><h2 className="max-w-3xl text-[clamp(2.4rem,5vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.05em]">Numbers our customers <span className="serif-i">actually</span> report.</h2></Reveal>
      </div>
      <div className="grid gap-3 md:grid-cols-6 md:grid-rows-[260px_260px]">
        <Reveal className="md:col-span-3 md:row-span-2">
          <div className="relative flex h-full min-h-[380px] flex-col justify-between overflow-hidden rounded-[32px] bg-ink p-8 text-white md:p-10">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
            <p className="eyebrow text-white/50">Average per person · per week</p>
            <div>
              <p className="text-[clamp(6rem,14vw,12rem)] font-medium leading-[0.8] tracking-[-0.07em] text-brand"><CountUp to={11} proportional /><span className="serif-i text-white">hrs</span></p>
              <p className="mt-6 max-w-sm text-lg text-white/60">given back to every teammate — time that goes into ideas, not busywork.</p>
            </div>
          </div>
        </Reveal>
        <Reveal className="md:col-span-3" delay={0.1}>
          <div className="relative h-full min-h-[240px] overflow-hidden rounded-[32px]">
            <Img src={IMG.teamWork} alt="Team collaborating" className="absolute inset-0 h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 text-white">
              <p className="max-w-xs text-lg leading-snug">“It's the first AI tool our designers <span className="serif-i">asked</span> to keep.”</p>
              <Avatar src={PEOPLE.emma} name="Emma" className="h-11 w-11 ring-white/30" />
            </div>
          </div>
        </Reveal>
        <Reveal className="md:col-span-2" delay={0.15}>
          <div className="flex h-full min-h-[220px] flex-col justify-between rounded-[32px] bg-brand p-7">
            <p className="eyebrow text-ink/60">Faster to first draft</p>
            <p className="text-7xl font-medium tracking-[-0.06em]"><CountUp to={4} /><span className="serif-i">×</span></p>
          </div>
        </Reveal>
        <Reveal className="md:col-span-1" delay={0.2}>
          <div className="flex h-full min-h-[220px] flex-col justify-between rounded-[32px] bg-white p-7 shadow-soft ring-1 ring-ink/5">
            <Star className="h-6 w-6 fill-flame text-flame" />
            <div><p className="text-5xl font-medium tracking-[-0.05em]">4.9</p><p className="mt-1 text-sm text-ink/50">G2 rating</p></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-68%"]);
  const items = GALLERY.slice(0, 9);
  return (
    <section id="gallery" ref={ref} className="relative h-[320vh] bg-ink text-white">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow n="04" className="text-white/50 [&>span:first-child]:text-brand [&>span:nth-child(2)]:bg-white/25">Showcase</Eyebrow>
            <h2 className="mt-6 text-[clamp(2.6rem,6vw,5.5rem)] font-medium leading-[0.92] tracking-[-0.05em]">Made with <span className="serif-i text-brand">Nexora.</span></h2>
          </div>
          <p className="max-w-xs text-white/50">Every image below was generated in seconds by teams using Aurora and Prism models.</p>
        </div>
        <motion.div style={{ x }} className="flex gap-5 pl-5 md:pl-10">
          {items.map((g, i) => (
            <div key={g.id} className={cn("group relative shrink-0 overflow-hidden rounded-[28px]", i % 3 === 1 ? "mt-16 h-[44vh] w-[34vh]" : "h-[52vh] w-[40vh]")}>
              <Img src={unsplash(g.id, 900)} alt={g.prompt} className="h-full w-full" imgClassName="transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-x-3 bottom-3 translate-y-2 rounded-2xl bg-white/90 p-3 text-ink opacity-0 backdrop-blur transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="line-clamp-2 text-[13px] leading-snug">{g.prompt}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ink/50">{g.model}</p>
              </div>
              <span className="absolute left-4 top-4 rounded-full bg-ink/60 px-2.5 py-1 font-mono text-[10px] text-white backdrop-blur">#{String(i + 1).padStart(2, "0")}</span>
            </div>
          ))}
          <Link to="/app/studio" className="group grid h-[52vh] w-[40vh] shrink-0 place-items-center rounded-[28px] bg-brand text-ink">
            <div className="text-center">
              <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-ink text-brand transition group-hover:rotate-45"><ArrowUpRight className="h-8 w-8" /></span>
              <p className="mt-6 text-3xl font-medium tracking-tight">Create <span className="serif-i">yours</span></p>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
function Customers() {
  const [i, setI] = useState(0);
  const list = TESTIMONIALS.slice(0, 5);
  useEffect(() => {
    const t = setTimeout(() => setI((v) => (v + 1) % list.length), 6500);
    return () => clearTimeout(t);
  }, [i, list.length]);
  const t = list[i];
  return (
    <section id="customers" className="container py-24 md:py-40">
      <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
        <Eyebrow n="05">Customers</Eyebrow>
        <div>
          <div className="min-h-[300px] md:min-h-[340px]">
            <AnimatePresence mode="wait">
              <motion.blockquote key={i} initial={{ opacity: 0, y: 24, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -16, filter: "blur(6px)" }} transition={{ duration: 0.7, ease: EASE }} className="text-[clamp(1.9rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.04em]">
                <span className="serif-i text-flame">“</span>{t.text}<span className="serif-i text-flame">”</span>
              </motion.blockquote>
            </AnimatePresence>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <div className="flex gap-2">
              {list.map((x, k) => (
                <button key={x.name} onClick={() => setI(k)} className={cn("relative rounded-full p-0.5 transition", k === i ? "ring-2 ring-ink" : "opacity-50 grayscale hover:opacity-100 hover:grayscale-0")}>
                  <Avatar src={x.avatar} name={x.name} className="h-12 w-12 ring-0" />
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                <p className="font-medium">{t.name}</p>
                <p className="text-sm text-ink/50">{t.role}</p>
              </motion.div>
            </AnimatePresence>
            <div className="ml-auto hidden h-1 w-40 overflow-hidden rounded-full bg-ink/10 md:block">
              <motion.div key={i} initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 6.5, ease: "linear" }} className="h-full bg-ink" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
export function PricingCards({ compact }: { compact?: boolean }) {
  const [yearly, setYearly] = useState(true);
  return (
    <div>
      <div className={cn("mb-10 flex items-center gap-3", compact ? "justify-center" : "justify-start")}>
        <div className="inline-flex rounded-full bg-ink/[0.06] p-1">
          {(["Monthly", "Yearly"] as const).map((p) => {
            const on = (p === "Yearly") === yearly;
            return (
              <button key={p} onClick={() => setYearly(p === "Yearly")} className={cn("relative rounded-full px-5 py-2 text-sm font-medium transition", on ? "text-white" : "text-ink/50")}>
                {on && <motion.span layoutId={`billing-${compact ? "c" : "l"}`} className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 35 }} />}
                <span className="relative">{p}</span>
              </button>
            );
          })}
        </div>
        <Badge variant="brand">Save 20%</Badge>
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        {PLANS.map((p, i) => {
          const dark = !!p.popular;
          return (
            <Reveal key={p.name} delay={i * 0.08}>
              <div className={cn("relative flex h-full flex-col rounded-[32px] p-8", dark ? "bg-ink text-white" : "bg-white shadow-soft ring-1 ring-ink/5")}>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium">{p.name}</h3>
                  {dark && <Badge variant="brand"><Sparkles /> Most loved</Badge>}
                </div>
                <p className={cn("mt-2 text-sm", dark ? "text-white/55" : "text-ink/55")}>{p.desc}</p>
                <div className="mt-8 flex items-end gap-1.5">
                  <span className="text-6xl font-medium tracking-[-0.06em]">
                    $<AnimatePresence mode="popLayout"><motion.span key={yearly ? "y" : "m"} initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }} className="inline-block">{yearly ? p.price.yearly : p.price.monthly}</motion.span></AnimatePresence>
                  </span>
                  <span className={cn("mb-2 text-sm", dark ? "text-white/50" : "text-ink/50")}>/ seat / month</span>
                </div>
                <Link to="/signup" className="mt-8">
                  <Button variant={dark ? "brand" : "default"} size="lg" className="w-full">{p.cta}</Button>
                </Link>
                <div className={cn("my-8 h-px", dark ? "bg-white/10" : "bg-ink/10")} />
                <ul className="space-y-3.5 text-[15px]">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className={cn("mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full", dark ? "bg-brand text-ink" : "bg-ink/[0.07] text-ink")}><Check className="h-3 w-3" strokeWidth={3} /></span>
                      <span className={dark ? "text-white/85" : "text-ink/80"}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="container py-24 md:py-32">
      <div className="grid gap-6 pb-12 lg:grid-cols-[220px_1fr]">
        <Eyebrow n="06">Pricing</Eyebrow>
        <Reveal><h2 className="max-w-3xl text-[clamp(2.4rem,5vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.05em]">Simple plans. <span className="serif-i">Serious</span> value.</h2></Reveal>
      </div>
      <PricingCards />
    </section>
  );
}

/* ================================================================== */
const FAQS = [
  { q: "Which AI models does Nexora use?", a: "Nexora routes every task to the best model for the job — frontier language models plus our own Aurora and Prism image models. You can pin a specific model per workspace at any time." },
  { q: "Is my data used to train models?", a: "Never. Prompts, files and outputs are encrypted in transit and at rest and are never used for training. Business plans include zero data retention." },
  { q: "How do credits work?", a: "Credits are one simple unit across text, image and workflow usage. A chat message uses about 1 credit, an image 4. Unused credits roll over for a month on paid plans." },
  { q: "Can I bring my own API keys?", a: "Yes — on Pro and Business you can connect your own provider keys and we'll only bill for platform features." },
  { q: "Do you offer startup or non-profit discounts?", a: "Eligible early-stage startups, students and registered non-profits get 50% off for twelve months. Just reach out." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="container py-24 md:py-32">
      <div className="grid gap-12 lg:grid-cols-[220px_1fr_1.3fr]">
        <Eyebrow n="07">FAQ</Eyebrow>
        <Reveal>
          <h2 className="text-[clamp(2.2rem,4vw,3.6rem)] font-medium leading-[1] tracking-[-0.05em]">Questions, <span className="serif-i">answered.</span></h2>
          <p className="mt-5 max-w-xs text-ink/55">Still curious? Our team replies in under five minutes, every day.</p>
          <Button variant="outline" className="mt-6"><MessageSquare /> Talk to a human</Button>
        </Reveal>
        <div className="border-t border-ink/10">
          {FAQS.map((f, i) => (
            <div key={f.q} className="border-b border-ink/10">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium tracking-tight">
                {f.q}
                <motion.span animate={{ rotate: open === i ? 45 : 0, backgroundColor: open === i ? "#D4FF3A" : "rgba(17,17,17,0.05)" }} className="grid h-9 w-9 shrink-0 place-items-center rounded-full"><Plus className="h-4 w-4" /></motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="overflow-hidden">
                    <p className="max-w-xl pb-6 leading-relaxed text-ink/60">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
function CTA() {
  return (
    <section className="px-3 pb-3 md:px-5 md:pb-5">
      <div className="relative overflow-hidden rounded-5xl bg-brand px-6 py-20 md:px-14 md:py-28">
        <div className="absolute inset-0 bg-dots opacity-40" />
        <Tilt className="absolute -right-10 top-10 hidden w-64 rotate-6 lg:block" max={10}>
          <div className="rounded-3xl bg-white p-2 shadow-lift"><Img src={unsplash(GALLERY[4].id, 600)} alt="" className="aspect-[4/5] rounded-2xl" /></div>
        </Tilt>
        <Tilt className="absolute bottom-10 right-72 hidden w-44 -rotate-6 xl:block" max={10}>
          <div className="rounded-3xl bg-white p-2 shadow-lift"><Img src={unsplash(GALLERY[6].id, 400)} alt="" className="aspect-square rounded-2xl" /></div>
        </Tilt>
        <div className="relative max-w-3xl">
          <p className="eyebrow text-ink/60">Ready when you are</p>
          <h2 className="mt-6 text-[clamp(3rem,8vw,7.5rem)] font-medium leading-[0.9] tracking-[-0.06em]">Make something <span className="serif-i">remarkable</span> today.</h2>
          <p className="mt-6 max-w-md text-lg text-ink/65">Free forever plan. No credit card. Set up in under two minutes.</p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic><Link to="/signup"><ArrowButton>Start creating free</ArrowButton></Link></Magnetic>
            <Link to="/app"><ArrowButton variant="light">See the dashboard</ArrowButton></Link>
          </div>
          <div className="mt-10 flex items-center gap-3 text-sm text-ink/60">
            <Zap className="h-4 w-4" /> 14-day Pro trial included with every account
          </div>
        </div>
      </div>
    </section>
  );
}
