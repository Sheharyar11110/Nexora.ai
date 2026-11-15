import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Check, Clock, Database, Filter, Mail, Play, Plus, Slack, Webhook, Zap, Loader2, GitBranch, Move } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/misc";
import { useToast } from "@/components/providers";
import { PageHeader } from "@/layouts/AppLayout";
import { cn } from "@/lib/utils";

type Node = { id: string; x: number; y: number; title: string; sub: string; icon: typeof Bot; bg: string; kind: string };

const INITIAL: Node[] = [
  { id: "n1", x: 30, y: 160, title: "New ticket", sub: "Zendesk webhook", icon: Webhook, bg: "bg-butter", kind: "Trigger" },
  { id: "n2", x: 300, y: 60, title: "Classify intent", sub: "Nexora Ultra", icon: Bot, bg: "bg-lilac", kind: "AI step" },
  { id: "n3", x: 300, y: 260, title: "Lookup customer", sub: "Postgres", icon: Database, bg: "bg-mist", kind: "Data" },
  { id: "n4", x: 570, y: 160, title: "Is it urgent?", sub: "priority = high", icon: Filter, bg: "bg-peach", kind: "Condition" },
  { id: "n5", x: 840, y: 60, title: "Alert on-call", sub: "#support-urgent", icon: Slack, bg: "bg-mint", kind: "Action" },
  { id: "n6", x: 840, y: 260, title: "Draft reply", sub: "Brand voice · email", icon: Mail, bg: "bg-mint", kind: "Action" },
];
const EDGES: [string, string][] = [["n1", "n2"], ["n1", "n3"], ["n2", "n4"], ["n3", "n4"], ["n4", "n5"], ["n4", "n6"]];
const W = 210, H = 68;
const ORDER = ["n1", "n2", "n3", "n4", "n5", "n6"];

const FLOWS = [
  { name: "Support Triage v3", runs: 9248, status: true, last: "2m ago" },
  { name: "Lead Enrichment", runs: 3120, status: true, last: "14m ago" },
  { name: "Weekly SEO Report", runs: 52, status: true, last: "2d ago" },
  { name: "Social Auto-Poster", runs: 840, status: false, last: "6d ago" },
];

const LOGS = ["Webhook received · ticket #48213", "Classified: Billing / urgent (0.94)", "Customer found: Acme Corp (Enterprise)", "Condition → urgent branch", "Posted to #support-urgent", "Reply drafted, queued for review"];

export default function Workflows() {
  const toast = useToast();
  const [nodes, setNodes] = useState(INITIAL);
  const [flows, setFlows] = useState(FLOWS);
  const [active, setActive] = useState(FLOWS[0].name);
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(-1);
  const [selected, setSelected] = useState("n2");
  const drag = useRef<{ id: string; dx: number; dy: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const pos = (id: string) => nodes.find((n) => n.id === id)!;

  const onPointerDown = (e: React.PointerEvent, n: Node) => {
    const c = canvasRef.current!, r = c.getBoundingClientRect();
    drag.current = { id: n.id, dx: e.clientX - r.left + c.scrollLeft - n.x, dy: e.clientY - r.top + c.scrollTop - n.y };
    setSelected(n.id);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const c = canvasRef.current!, r = c.getBoundingClientRect();
    const { id, dx, dy } = drag.current;
    const x = Math.max(0, e.clientX - r.left + c.scrollLeft - dx);
    const y = Math.max(0, e.clientY - r.top + c.scrollTop - dy);
    setNodes((ns) => ns.map((n) => (n.id === id ? { ...n, x, y } : n)));
  };

  const run = async () => {
    setRunning(true);
    for (let i = 0; i < LOGS.length; i++) { setStep(i); await new Promise((r) => setTimeout(r, 650)); }
    setStep(LOGS.length);
    setRunning(false);
    toast({ title: "Run completed", description: "6 steps · 3.9s · 12 credits" });
  };

  const sel = pos(selected);

  return (
    <div className="mx-auto max-w-[1360px] p-4 md:p-7">
      <PageHeader eyebrow="Automate" title="Workflows that" serif="run themselves">
        <Button variant="outline"><GitBranch /> Templates</Button>
        <Button onClick={() => toast({ title: "New workflow created", type: "info" })}><Plus /> New workflow</Button>
      </PageHeader>

      <div className="mb-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {flows.map((f, i) => (
          <motion.button key={f.name} onClick={() => setActive(f.name)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={cn("rounded-[24px] p-5 text-left transition", active === f.name ? "bg-ink text-white" : "bg-white shadow-soft ring-1 ring-ink/5 hover:ring-ink/15")}>
            <div className="flex items-center justify-between">
              <span className={cn("flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider", f.status ? (active === f.name ? "text-brand" : "text-mint-deep") : "text-ink/40")}>
                <span className={cn("h-1.5 w-1.5 rounded-full", f.status ? "animate-pulse bg-current" : "bg-current")} /> {f.status ? "Live" : "Paused"}
              </span>
              <span onClick={(e) => e.stopPropagation()}><Switch checked={f.status} onCheckedChange={(v) => setFlows((fs) => fs.map((x) => (x.name === f.name ? { ...x, status: v } : x)))} className={active === f.name ? "bg-white/20" : ""} /></span>
            </div>
            <p className="mt-6 text-lg font-medium tracking-tight">{f.name}</p>
            <p className={cn("mt-1 flex items-center gap-3 text-xs", active === f.name ? "text-white/50" : "text-ink/45")}><span className="flex items-center gap-1"><Zap className="h-3 w-3" /> {f.runs.toLocaleString()}</span><span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {f.last}</span></p>
          </motion.button>
        ))}
      </div>

      <div className="grid gap-3 2xl:grid-cols-[1fr_320px]">
        <div className="overflow-hidden rounded-[28px] bg-white shadow-soft ring-1 ring-ink/5">
          <div className="flex items-center gap-3 px-5 py-4">
            <p className="font-medium">{active}</p>
            <Badge variant="success">Published</Badge>
            <span className="hidden items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-ink/40 sm:flex"><Move className="h-3 w-3" /> drag to arrange</span>
            <Button size="sm" className="ml-auto h-9" onClick={run} disabled={running}>{running ? <><Loader2 className="animate-spin" /> Running</> : <><Play /> Test run</>}</Button>
          </div>
          <div ref={canvasRef} onPointerMove={onPointerMove} onPointerUp={() => (drag.current = null)} className="relative mx-2 mb-2 h-[440px] overflow-auto rounded-[22px] bg-paper bg-dots">
            <div className="relative h-[400px] w-[1080px]">
              <svg className="pointer-events-none absolute inset-0 h-full w-full">
                {EDGES.map(([a, b]) => {
                  const A = pos(a), B = pos(b);
                  const x1 = A.x + W, y1 = A.y + H / 2, x2 = B.x, y2 = B.y + H / 2, mx = (x1 + x2) / 2;
                  const d = `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
                  const lit = step >= ORDER.indexOf(b);
                  return (
                    <g key={a + b}>
                      <path d={d} stroke="rgba(17,17,17,.12)" strokeWidth="2" fill="none" />
                      <path d={d} stroke={lit ? "#0e9f6e" : "#111"} strokeWidth="2" fill="none" strokeDasharray="5 9" className="transition-colors duration-500">
                        <animate attributeName="stroke-dashoffset" from="28" to="0" dur="0.9s" repeatCount="indefinite" />
                      </path>
                    </g>
                  );
                })}
              </svg>
              {nodes.map((n) => {
                const idx = ORDER.indexOf(n.id);
                const state = step < 0 ? "idle" : idx < step || step >= LOGS.length ? "done" : idx === step && running ? "active" : "idle";
                return (
                  <motion.div
                    key={n.id}
                    onPointerDown={(e) => onPointerDown(e, n)}
                    animate={{ scale: state === "active" ? 1.05 : 1 }}
                    style={{ left: n.x, top: n.y, width: W, height: H }}
                    className={cn("absolute flex cursor-grab touch-none select-none items-center gap-3 rounded-[20px] bg-white p-2 pr-3 shadow-lift ring-1 transition-shadow active:cursor-grabbing", selected === n.id ? "ring-2 ring-ink" : "ring-ink/5", state === "active" && "ring-2 ring-flame")}
                  >
                    <span className={cn("grid h-[52px] w-[52px] shrink-0 place-items-center rounded-2xl", n.bg)}><n.icon className="h-5 w-5" strokeWidth={1.8} /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[9px] uppercase tracking-wider text-ink/40">{n.kind}</span>
                      <span className="block truncate text-sm font-medium">{n.title}</span>
                    </span>
                    {state === "done" && <span className="grid h-6 w-6 place-items-center rounded-full bg-mint-deep text-white"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>}
                    {state === "active" && <Loader2 className="h-4 w-4 animate-spin text-flame" />}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-1 2xl:content-start">
          <div className="rounded-[28px] bg-white p-6 shadow-soft ring-1 ring-ink/5">
            <p className="eyebrow">Selected · {sel.kind}</p>
            <div className={cn("mt-4 rounded-3xl p-5", sel.bg)}>
              <sel.icon className="h-6 w-6" strokeWidth={1.6} />
              <p className="mt-6 text-2xl font-medium tracking-[-0.04em]">{sel.title}</p>
              <p className="text-sm text-ink/55">{sel.sub}</p>
            </div>
            <div className="mt-4 space-y-2.5 text-sm">
              {[["Retries", "3"], ["Timeout", "30s"], ["Avg latency", "640ms"], ["Success", "99.2%"]].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-ink/[0.06] pb-2.5 last:border-0"><span className="text-ink/50">{k}</span><span className="font-mono text-[13px]">{v}</span></div>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] bg-ink p-6 text-white">
            <p className="eyebrow text-white/45">Run log</p>
            <div className="mt-4 space-y-2.5 font-mono text-[12px]">
              {step < 0 && <p className="text-white/40">› press “Test run” to execute</p>}
              <AnimatePresence>
                {LOGS.slice(0, Math.min(step + 1, LOGS.length)).map((l, i) => (
                  <motion.p key={l} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="flex gap-3">
                    <span className="text-white/35">{(i * 0.65 + 0.1).toFixed(1)}s</span>
                    <span className={i === step && running ? "text-brand" : "text-white/80"}>{l}</span>
                  </motion.p>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
