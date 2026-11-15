import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Heart, Maximize2, RefreshCw, Shuffle, Sparkles, Wand2, X, Copy, Square, RectangleHorizontal, RectangleVertical, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Img, Tabs } from "@/components/ui/misc";
import { useToast } from "@/components/providers";
import { PageHeader } from "@/layouts/AppLayout";
import { GALLERY } from "@/data/mock";
import { cn, unsplash } from "@/lib/utils";

const STYLES = [
  { name: "Cinematic", id: GALLERY[0].id },
  { name: "3D Render", id: GALLERY[1].id },
  { name: "Painterly", id: GALLERY[3].id },
  { name: "Chrome", id: GALLERY[6].id },
  { name: "Nature", id: GALLERY[5].id },
  { name: "Liquid", id: GALLERY[10].id },
];
const RATIOS = [
  { v: "1:1", icon: Square, cls: "aspect-square" },
  { v: "16:9", icon: RectangleHorizontal, cls: "aspect-video" },
  { v: "3:4", icon: RectangleVertical, cls: "aspect-[3/4]" },
];
const PROMPTS = [
  "A floating glass island above a calm pastel ocean at dusk, ultra detailed, editorial",
  "Minimal product shot of a ceramic vase, soft peach gradient background, studio light",
  "Aerial view of a turquoise alpine lake surrounded by snowy peaks, cinematic",
  "Iridescent liquid chrome sculpture on paper-white backdrop, dramatic rim light",
];
const BLOBS = ["#E7E2FF", "#FFE7D9", "#DDF3E6", "#E3EDF7"];

type Gen = { id: string; prompt: string };

export default function ImageStudio() {
  const toast = useToast();
  const [prompt, setPrompt] = useState(PROMPTS[0]);
  const [style, setStyle] = useState(STYLES[0].name);
  const [ratio, setRatio] = useState(RATIOS[0]);
  const [count, setCount] = useState(4);
  const [model, setModel] = useState<"aurora" | "prism" | "canvas">("aurora");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<Gen[]>(GALLERY.slice(0, 4).map((g) => ({ id: g.id, prompt: g.prompt })));
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [lightbox, setLightbox] = useState<(typeof GALLERY)[number] | null>(null);
  const [tab, setTab] = useState<"community" | "mine">("community");

  const generate = () => {
    if (loading) return;
    setLoading(true);
    setProgress(0);
    const start = Date.now();
    const iv = setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / 2600) * 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(iv);
        setResults([...GALLERY].sort(() => Math.random() - 0.5).slice(0, count).map((g) => ({ id: g.id, prompt })));
        setLoading(false);
        toast({ title: `${count} images ready`, description: `${count * 4} credits used` });
      }
    }, 50);
  };

  const toggleLike = (id: string) => setLiked((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <div className="mx-auto max-w-[1360px] p-4 md:p-7">
      <PageHeader eyebrow="Create · Images" title="Image" serif="studio" desc="Describe it. We'll make it beautiful.">
        <Badge variant="brand"><Sparkles /> Aurora 2.0 is live</Badge>
      </PageHeader>

      <div className="grid gap-3 xl:grid-cols-[380px_1fr]">
        <div className="space-y-6 rounded-[28px] bg-white p-6 shadow-soft ring-1 ring-ink/5 xl:sticky xl:top-20 xl:self-start">
          <div>
            <div className="mb-2.5 flex items-center justify-between">
              <p className="eyebrow">01 · Prompt</p>
              <button onClick={() => setPrompt(PROMPTS[Math.floor(Math.random() * PROMPTS.length)])} className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-ink/45 hover:text-ink"><Shuffle className="h-3 w-3" /> Surprise</button>
            </div>
            <div className="rounded-3xl bg-paper p-1 ring-1 ring-transparent transition focus-within:ring-ink/20">
              <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4} className="w-full resize-none bg-transparent p-3 text-[15px] leading-relaxed outline-none" />
              <div className="flex items-center justify-between px-2 pb-1">
                <span className="font-mono text-[10px] text-ink/35">{prompt.length}/500</span>
                <button onClick={() => { setPrompt((p) => p + ", highly detailed, award-winning photography, soft natural light"); toast({ title: "Prompt enhanced", type: "info" }); }} className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium shadow-soft hover:bg-brand"><Wand2 className="h-3 w-3" /> Enhance</button>
              </div>
            </div>
          </div>

          <div>
            <p className="eyebrow mb-2.5">02 · Model</p>
            <Tabs id="img-model" value={model} onChange={setModel} className="flex w-full [&>button]:flex-1" tabs={[{ value: "aurora", label: "Aurora" }, { value: "prism", label: "Prism" }, { value: "canvas", label: "Canvas" }]} />
          </div>

          <div>
            <p className="eyebrow mb-2.5">03 · Style</p>
            <div className="grid grid-cols-3 gap-2">
              {STYLES.map((s) => (
                <button key={s.name} onClick={() => setStyle(s.name)} className={cn("group relative overflow-hidden rounded-2xl p-1 transition", style === s.name ? "bg-ink" : "bg-transparent hover:bg-paper")}>
                  <Img src={unsplash(s.id, 200)} alt={s.name} className="aspect-square rounded-xl" imgClassName="transition-transform duration-500 group-hover:scale-110" />
                  <span className={cn("block py-1.5 text-center text-[11px] font-medium", style === s.name ? "text-white" : "text-ink/60")}>{s.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="eyebrow mb-2.5">Ratio</p>
              <div className="flex gap-1 rounded-full bg-paper p-1">
                {RATIOS.map((r) => (
                  <button key={r.v} onClick={() => setRatio(r)} title={r.v} className={cn("grid h-8 flex-1 place-items-center rounded-full transition", ratio.v === r.v ? "bg-ink text-brand" : "text-ink/45 hover:text-ink")}><r.icon className="h-4 w-4" /></button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-2.5">Count</p>
              <div className="flex items-center justify-between rounded-full bg-paper p-1">
                <button onClick={() => setCount((c) => Math.max(1, c - 1))} className="grid h-8 w-8 place-items-center rounded-full bg-white shadow-soft"><Minus className="h-3.5 w-3.5" /></button>
                <span className="font-mono text-sm">{count}</span>
                <button onClick={() => setCount((c) => Math.min(4, c + 1))} className="grid h-8 w-8 place-items-center rounded-full bg-white shadow-soft"><Plus className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          </div>

          <button onClick={generate} disabled={loading || !prompt.trim()} className="relative flex h-14 w-full items-center justify-between overflow-hidden rounded-full bg-ink pl-6 pr-2 text-[15px] font-medium text-white disabled:opacity-70">
            {loading && <motion.span className="absolute inset-y-0 left-0 bg-white/10" style={{ width: `${progress}%` }} />}
            <span className="relative">{loading ? `Generating · ${Math.round(progress)}%` : "Generate"}</span>
            <span className="relative flex items-center gap-2">
              {!loading && <span className="font-mono text-[11px] text-white/50">{count * 4} credits</span>}
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-ink"><Sparkles className={cn("h-4 w-4", loading && "animate-spin")} /></span>
            </span>
          </button>
        </div>

        <div className="space-y-10">
          <div className={cn("grid gap-3", count === 1 ? "grid-cols-1" : "grid-cols-2")}>
            {(loading ? Array.from({ length: count }) : results).map((r, i) => {
              const g = r as Gen;
              return (
                <motion.div key={loading ? `l${i}` : `${g.id}-${i}`} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }} className={cn("group relative overflow-hidden rounded-[28px] bg-white shadow-soft ring-1 ring-ink/5", ratio.cls)}>
                  {loading ? (
                    <div className="absolute inset-0 overflow-hidden bg-paper">
                      <motion.div className="absolute -inset-1/4" style={{ background: `radial-gradient(circle at 30% 30%, ${BLOBS[i % 4]} 0, transparent 45%), radial-gradient(circle at 70% 70%, ${BLOBS[(i + 1) % 4]} 0, transparent 45%), radial-gradient(circle at 60% 20%, #D4FF3A55 0, transparent 35%)`, filter: "blur(20px)" }} animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} />
                      <div className="absolute inset-0 bg-dots opacity-50" />
                      <div className="absolute inset-0 grid place-items-center text-center">
                        <div>
                          <p className="text-5xl font-medium tracking-[-0.06em] tabular-nums">{Math.round(progress)}<span className="serif-i text-3xl">%</span></p>
                          <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-ink/50">{progress < 30 ? "reading prompt" : progress < 70 ? "denoising" : "adding detail"}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Img src={unsplash(g.id, 1000)} alt={g.prompt} className="absolute inset-0 h-full w-full" imgClassName="transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute right-3 top-3 flex gap-1.5 opacity-0 transition duration-300 group-hover:opacity-100">
                        {[
                          { I: Heart, a: () => toggleLike(g.id), on: liked.has(g.id) },
                          { I: Download, a: () => toast({ title: "Downloading 4K image", type: "info" }) },
                          { I: Maximize2, a: () => setLightbox(GALLERY.find((x) => x.id === g.id) ?? null) },
                        ].map(({ I, a, on }, k) => (
                          <button key={k} onClick={a} className={cn("grid h-10 w-10 place-items-center rounded-full bg-white/90 backdrop-blur transition hover:scale-110", on && "bg-flame text-white")}><I className={cn("h-4 w-4", on && "fill-current")} /></button>
                        ))}
                      </div>
                      <div className="absolute inset-x-3 bottom-3 flex translate-y-3 gap-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <Button size="sm" className="h-9"><RefreshCw /> Vary</Button>
                        <Button size="sm" variant="outline" className="h-9">Upscale 4×</Button>
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-3xl font-medium tracking-[-0.045em]">Explore <span className="serif-i">inspiration</span></h2>
              <Tabs id="gallery" value={tab} onChange={setTab} tabs={[{ value: "community", label: "Community" }, { value: "mine", label: "Mine" }]} />
            </div>
            <div className="columns-2 gap-3 lg:columns-3 [&>*]:mb-3">
              {(tab === "community" ? GALLERY : [...GALLERY].reverse().slice(0, 6)).map((g, i) => (
                <motion.button key={g.id + tab} layoutId={`img-${g.id}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.08 }} onClick={() => setLightbox(g)} className="group relative block w-full break-inside-avoid overflow-hidden rounded-[24px] text-left">
                  <Img src={unsplash(g.id, 700)} alt={g.prompt} className={cn("w-full", g.ratio === "portrait" ? "aspect-[3/4]" : g.ratio === "landscape" ? "aspect-[4/3]" : "aspect-square")} imgClassName="transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-x-2 bottom-2 translate-y-2 rounded-2xl bg-white/90 p-3 opacity-0 backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="line-clamp-2 text-[13px] leading-snug">{g.prompt}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ink/45">{g.model}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)} className="fixed inset-0 z-[80] grid place-items-center bg-paper/80 p-4 backdrop-blur-xl">
            <motion.div layoutId={`img-${lightbox.id}`} onClick={(e) => e.stopPropagation()} className="grid w-full max-w-5xl overflow-hidden rounded-[32px] bg-white p-2 shadow-lift ring-1 ring-ink/10 md:grid-cols-[1.5fr_1fr]">
              <Img src={unsplash(lightbox.id, 1600)} alt={lightbox.prompt} className="aspect-square rounded-[26px] md:aspect-auto md:h-[74vh]" />
              <div className="flex flex-col p-6">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{lightbox.model}</Badge>
                  <button onClick={() => setLightbox(null)} className="grid h-9 w-9 place-items-center rounded-full bg-paper hover:bg-paper-deep"><X className="h-4 w-4" /></button>
                </div>
                <p className="eyebrow mt-8">Prompt</p>
                <p className="mt-3 text-xl leading-snug tracking-tight">{lightbox.prompt}</p>
                <div className="mt-8 grid grid-cols-2 gap-2 text-sm">
                  {[["Ratio", lightbox.ratio], ["Steps", "40"], ["Guidance", "7.5"], ["Seed", "2948120"]].map(([k, v]) => (
                    <div key={k} className="rounded-2xl bg-paper p-3"><p className="font-mono text-[10px] uppercase tracking-wider text-ink/45">{k}</p><p className="mt-1 font-medium capitalize">{v}</p></div>
                  ))}
                </div>
                <div className="mt-auto flex gap-2 pt-8">
                  <Button className="flex-1" size="lg" onClick={() => { setPrompt(lightbox.prompt); setLightbox(null); toast({ title: "Prompt copied to editor" }); }}><Copy /> Use this prompt</Button>
                  <Button variant="outline" size="lg" className="w-12 px-0"><Download /></Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
