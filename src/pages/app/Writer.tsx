import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Bold, Copy, Download, Italic, Link2, List, Search, Sparkles, Underline, Wand2, Heading2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input, Label, Textarea } from "@/components/ui/input";
import { useToast } from "@/components/providers";
import { PageHeader } from "@/layouts/AppLayout";
import { TEMPLATES } from "@/data/mock";
import { cn } from "@/lib/utils";

const TONES = ["Professional", "Friendly", "Witty", "Bold", "Empathetic", "Persuasive"];
const CATS = ["All", ...Array.from(new Set(TEMPLATES.map((t) => t.cat)))];

const OUTPUT = `# How AI is reshaping creative teams in 2026

Creative work used to be bottlenecked by production. Today, the bottleneck is **taste**.

## From making to directing

AI now handles the first 80% of most creative tasks — drafting, resizing, variant generation and localisation. That frees designers and writers to focus on what actually moves the needle: strategy, narrative and judgement.

## Three patterns in high-performing teams

- **Brief-first workflows.** Sharp, structured briefs matter more than ever, because AI amplifies clarity — and confusion.
- **Brand voice as infrastructure.** Tone guidelines are encoded once and applied everywhere, automatically.
- **Human-in-the-loop review.** Every AI output passes through an expert before it ships.

## What this means for you

The teams winning in 2026 aren't the ones using the most AI. They're the ones using it most *deliberately*. Start small, measure outcomes, and scale what works.`;

const fmt = (s: string) => s.replace(/\*\*(.+?)\*\*/g, "<b class='font-medium text-ink'>$1</b>").replace(/\*(.+?)\*/g, "<i class='serif-i text-[1.15em]'>$1</i>");

function ScoreRing({ value, label }: { value: number; label: string }) {
  const r = 26, c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-3">
      <svg width="64" height="64" className="-rotate-90">
        <circle cx="32" cy="32" r={r} stroke="rgba(17,17,17,.07)" strokeWidth="6" fill="none" />
        <motion.circle cx="32" cy="32" r={r} stroke="#111" strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c - (value / 100) * c }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} />
      </svg>
      <div><p className="text-2xl font-medium tracking-[-0.04em]">{value}</p><p className="font-mono text-[10px] uppercase tracking-wider text-ink/45">{label}</p></div>
    </div>
  );
}

export default function Writer() {
  const toast = useToast();
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [tpl, setTpl] = useState<(typeof TEMPLATES)[number] | null>(null);
  const [tone, setTone] = useState("Professional");
  const [out, setOut] = useState("");
  const [busy, setBusy] = useState(false);

  const list = TEMPLATES.filter((t) => (cat === "All" || t.cat === cat) && t.name.toLowerCase().includes(q.toLowerCase()));

  const generate = async () => {
    setBusy(true);
    setOut("");
    await new Promise((r) => setTimeout(r, 600));
    for (let i = 0; i <= OUTPUT.length; i += 6) {
      setOut(OUTPUT.slice(0, i));
      await new Promise((r) => setTimeout(r, 12));
    }
    setOut(OUTPUT);
    setBusy(false);
  };
  const words = out.trim() ? out.trim().split(/\s+/).length : 0;

  return (
    <div className="mx-auto max-w-[1360px] p-4 md:p-7">
      <AnimatePresence mode="wait">
        {!tpl ? (
          <motion.div key="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }}>
            <PageHeader eyebrow="Create · Writing" title="The" serif="writer's room" desc="Expert-crafted templates that sound like you, not a robot.">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
                <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search templates" className="w-64 rounded-full pl-10" />
              </div>
            </PageHeader>
            <div className="mb-6 flex flex-wrap gap-1.5">
              {CATS.map((c) => (
                <button key={c} onClick={() => setCat(c)} className={cn("relative rounded-full px-4 py-2 text-sm transition", cat === c ? "text-white" : "text-ink/55 hover:text-ink")}>
                  {cat === c && <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 500, damping: 35 }} />}
                  <span className="relative">{c}</span>
                </button>
              ))}
            </div>
            <motion.div layout className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence>
                {list.map((t, i) => (
                  <motion.button layout key={t.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} whileHover={{ y: -5 }} onClick={() => setTpl(t)} className={cn("group relative flex min-h-[220px] flex-col rounded-[28px] p-6 text-left", t.color)}>
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-[11px] text-ink/45">{String(i + 1).padStart(2, "0")}</span>
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-brand opacity-0 transition group-hover:opacity-100"><ArrowUpRight className="h-4 w-4" /></span>
                    </div>
                    <h3 className="mt-auto text-2xl font-medium tracking-[-0.04em]">{t.name}</h3>
                    <p className="mt-1.5 text-sm text-ink/60">{t.desc}</p>
                    <span className="mt-4 w-fit rounded-full bg-white/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink/60">{t.cat}</span>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div key="editor" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <button onClick={() => { setTpl(null); setOut(""); }} className="mb-6 flex items-center gap-1.5 text-sm text-ink/55 hover:text-ink"><ArrowLeft className="h-4 w-4" /> All templates</button>
            <div className="grid gap-3 xl:grid-cols-[380px_1fr]">
              <div className="space-y-5 rounded-[28px] bg-white p-6 shadow-soft ring-1 ring-ink/5 xl:self-start">
                <div className={cn("rounded-3xl p-5", tpl.color)}>
                  <FileText className="h-5 w-5" strokeWidth={1.8} />
                  <h2 className="mt-6 text-2xl font-medium tracking-[-0.04em]">{tpl.name}</h2>
                  <p className="text-sm text-ink/60">{tpl.desc}</p>
                </div>
                <div className="space-y-2"><Label>Topic</Label><Input defaultValue="How AI is reshaping creative teams" /></div>
                <div className="space-y-2"><Label>Key points</Label><Textarea defaultValue="Shift from making to directing; brand voice; human review" /></div>
                <div className="space-y-2">
                  <Label>Tone of voice</Label>
                  <div className="flex flex-wrap gap-1.5">
                    {TONES.map((t) => <button key={t} onClick={() => setTone(t)} className={cn("rounded-full px-3 py-1.5 text-xs transition", tone === t ? "bg-ink text-white" : "bg-paper text-ink/60 hover:text-ink")}>{t}</button>)}
                  </div>
                </div>
                <Button size="lg" className="w-full" onClick={generate} disabled={busy}><Sparkles className={cn(busy && "animate-spin")} /> {busy ? "Writing…" : "Write my draft"}</Button>
              </div>

              <div className="flex min-h-[640px] flex-col overflow-hidden rounded-[28px] bg-white shadow-soft ring-1 ring-ink/5">
                <div className="flex flex-wrap items-center gap-1 border-b border-ink/[0.06] px-4 py-2.5">
                  {[Heading2, Bold, Italic, Underline, List, Link2].map((I, i) => (
                    <button key={i} className="grid h-9 w-9 place-items-center rounded-full text-ink/45 hover:bg-paper hover:text-ink"><I className="h-4 w-4" /></button>
                  ))}
                  <div className="ml-auto flex items-center gap-2">
                    <span className="font-mono text-[11px] text-ink/45 tabular-nums">{words} words</span>
                    <Button size="sm" variant="ghost" onClick={() => { navigator.clipboard?.writeText(out); toast({ title: "Copied to clipboard" }); }} disabled={!out}><Copy /> Copy</Button>
                    <Button size="sm" disabled={!out} onClick={() => toast({ title: "Exported to Google Docs", type: "info" })}><Download /> Export</Button>
                  </div>
                </div>
                <div className="grid flex-1 lg:grid-cols-[1fr_230px]">
                  <div className="px-6 py-10 md:px-14">
                    {!out && !busy ? (
                      <div className="grid h-full place-items-center text-center">
                        <div>
                          <Wand2 className="mx-auto h-8 w-8 text-ink/25" strokeWidth={1.5} />
                          <p className="mt-5 text-3xl font-medium tracking-[-0.045em]">A blank page, <span className="serif-i">for now.</span></p>
                          <p className="mt-2 text-sm text-ink/50">Fill in the brief and we'll draft it in your voice.</p>
                        </div>
                      </div>
                    ) : (
                      <article className="mx-auto max-w-2xl space-y-4">
                        {out.split("\n").map((l, i) => {
                          if (l.startsWith("# ")) return <h1 key={i} className="text-4xl font-medium leading-[1.05] tracking-[-0.05em] md:text-5xl">{l.slice(2)}</h1>;
                          if (l.startsWith("## ")) return <h2 key={i} className="pt-4 text-2xl font-medium tracking-[-0.035em]">{l.slice(3)}</h2>;
                          if (l.startsWith("- ")) return <li key={i} className="ml-5 list-disc text-[16px] leading-[1.75] text-ink/70 marker:text-flame" dangerouslySetInnerHTML={{ __html: fmt(l.slice(2)) }} />;
                          if (!l.trim()) return null;
                          return <p key={i} className="text-[16px] leading-[1.75] text-ink/70" dangerouslySetInnerHTML={{ __html: fmt(l) }} />;
                        })}
                        {busy && <span className="inline-block h-5 w-2 animate-blink rounded-sm bg-flame" />}
                      </article>
                    )}
                  </div>
                  <aside className="space-y-6 border-t border-ink/[0.06] bg-paper/50 p-6 lg:border-l lg:border-t-0">
                    <p className="eyebrow">Insights</p>
                    {out && !busy ? (
                      <>
                        <ScoreRing value={92} label="SEO score" />
                        <ScoreRing value={86} label="Readability" />
                        <div className="space-y-3 text-sm">
                          {[["Tone", tone], ["Read time", `${Math.max(1, Math.round(words / 220))} min`], ["Originality", "100%"]].map(([k, v]) => (
                            <div key={k} className="flex justify-between border-b border-ink/[0.06] pb-2"><span className="text-ink/50">{k}</span><span className="font-medium">{v}</span></div>
                          ))}
                        </div>
                        <Badge variant="brand">On-brand ✓</Badge>
                      </>
                    ) : (
                      <p className="text-sm text-ink/45">Scores appear once your draft is ready.</p>
                    )}
                  </aside>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
