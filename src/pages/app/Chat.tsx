import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp, Check, ChevronDown, Code2, Copy, Globe, Lightbulb, Mic, Paperclip, PenLine, Plus, RefreshCw,
  Search, Sparkles, Square, ThumbsDown, ThumbsUp, BarChart3, PanelLeft, Zap, Brain,
} from "lucide-react";
import { Avatar } from "@/components/ui/misc";
import { useToast } from "@/components/providers";
import { CHAT_HISTORY, USER } from "@/data/mock";
import { cn } from "@/lib/utils";

type Msg = { id: number; role: "user" | "ai"; text: string; done?: boolean };

const MODELS = [
  { id: "ultra", name: "Nexora Ultra", desc: "Deepest reasoning, best for complex work", icon: Brain, bg: "bg-lilac" },
  { id: "swift", name: "Nexora Swift", desc: "Fast answers for everyday tasks", icon: Zap, bg: "bg-butter" },
  { id: "code", name: "Nexora Code", desc: "Tuned for programming", icon: Code2, bg: "bg-mist" },
];

const SUGGESTIONS = [
  { icon: Lightbulb, title: "Brainstorm", text: "Give me 5 viral launch ideas for an AI note-taking app", bg: "bg-butter" },
  { icon: Code2, title: "Code", text: "Write a React hook that debounces a value", bg: "bg-mist" },
  { icon: PenLine, title: "Write", text: "Draft a warm onboarding email for new customers", bg: "bg-mint" },
  { icon: BarChart3, title: "Analyze", text: "Explain how to calculate customer lifetime value", bg: "bg-lilac" },
];

function replyFor(q: string) {
  const l = q.toLowerCase();
  if (l.includes("hook") || l.includes("code") || l.includes("react"))
    return "Here's a clean, typed `useDebounce` hook:\n\n```tsx\nimport { useEffect, useState } from \"react\";\n\nexport function useDebounce<T>(value: T, delay = 300) {\n  const [debounced, setDebounced] = useState(value);\n\n  useEffect(() => {\n    const t = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(t);\n  }, [value, delay]);\n\n  return debounced;\n}\n```\n\n**How it works:** every time `value` changes we schedule an update and cancel the previous timer — so state only settles once the user stops typing for `delay` ms.\n\nWant me to add a leading-edge option or a cancel function?";
  if (l.includes("email"))
    return "**Subject:** Welcome aboard — let's make something great\n\nHi {{first_name}},\n\nThanks for joining Nexora — we're thrilled you're here.\n\nThree things to try in your first five minutes:\n\n1. **Ask your first question** in Chat — connect Notion for grounded answers.\n2. **Generate a hero image** in Studio with Aurora 2.0.\n3. **Automate a task** with one of 40+ workflow templates.\n\nIf you ever get stuck, just reply — a real human reads every message.\n\nWarmly,\nThe Nexora team";
  if (l.includes("lifetime") || l.includes("ltv"))
    return "**Customer Lifetime Value (LTV)** estimates the total revenue a customer brings over their relationship with you.\n\nThe simplest SaaS formula:\n\n```text\nLTV = (ARPA × Gross Margin %) ÷ Monthly Churn Rate\n```\n\n**Example:** ARPA $50, gross margin 80%, churn 2% → `(50 × 0.8) ÷ 0.02 = $2,000`.\n\nA healthy benchmark is an **LTV:CAC ratio of 3:1 or higher**. Want me to build a calculator for your numbers?";
  return "Here are **5 launch ideas** with real viral potential:\n\n1. **The 24-hour memory challenge** — users record every meeting for a day, then share an AI-made highlight reel.\n2. **Public build log** — daily notes summarised by the app itself, dog-fooding in real time.\n3. **Template marketplace** — power users publish note templates and earn credits.\n4. **“Roast my notes”** — a playful critique mode that's made for social sharing.\n5. **Founder office hours** — live AI-assisted Q&A where answers become public docs.\n\nShall I turn one into a full go-to-market plan?";
}

function RichText({ text }: { text: string }) {
  const parts = text.split(/```(\w*)\n([\s\S]*?)```/g);
  const out: React.ReactNode[] = [];
  for (let i = 0; i < parts.length; i++) {
    if (i % 3 === 0) {
      parts[i].split("\n").forEach((line, j) => {
        if (!line.trim()) { out.push(<div key={`${i}-${j}`} className="h-3" />); return; }
        const html = line
          .replace(/\*\*(.+?)\*\*/g, "<b class='font-medium'>$1</b>")
          .replace(/`([^`]+)`/g, '<code class="rounded-md bg-paper px-1.5 py-0.5 font-mono text-[0.85em] text-flame">$1</code>');
        out.push(<p key={`${i}-${j}`} className="leading-7" dangerouslySetInnerHTML={{ __html: html }} />);
      });
    } else if (i % 3 === 2) {
      out.push(<CodeBlock key={i} lang={parts[i - 1] || "code"} code={parts[i]} />);
    }
  }
  return <div className="text-[15.5px] text-ink/85">{out}</div>;
}

function CodeBlock({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="my-4 overflow-hidden rounded-2xl bg-ink text-white">
      <div className="flex items-center justify-between px-4 py-2.5 font-mono text-[11px] text-white/45">
        <span className="uppercase tracking-wider">{lang}</span>
        <button onClick={() => { navigator.clipboard?.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }} className="flex items-center gap-1.5 hover:text-brand">
          {copied ? <><Check className="h-3.5 w-3.5" /> copied</> : <><Copy className="h-3.5 w-3.5" /> copy</>}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 pb-4 font-mono text-[13px] leading-6 text-[#e8f5b5]">{code}</pre>
    </div>
  );
}

export default function Chat() {
  const toast = useToast();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [model, setModel] = useState(MODELS[0]);
  const [modelOpen, setModelOpen] = useState(false);
  const [web, setWeb] = useState(true);
  const [panel, setPanel] = useState(true);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const stopRef = useRef(false);
  const endRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [msgs]);
  useEffect(() => {
    const ta = taRef.current;
    if (ta) { ta.style.height = "auto"; ta.style.height = `${Math.min(ta.scrollHeight, 200)}px`; }
  }, [input]);

  const send = async (text = input) => {
    if (!text.trim() || streaming) return;
    setInput("");
    const id = Date.now();
    setMsgs((m) => [...m, { id, role: "user", text }, { id: id + 1, role: "ai", text: "" }]);
    setStreaming(true);
    stopRef.current = false;
    await new Promise((r) => setTimeout(r, 800));
    const full = replyFor(text);
    let i = 0;
    while (i < full.length && !stopRef.current) {
      i += Math.ceil(Math.random() * 4) + 1;
      const slice = full.slice(0, i);
      setMsgs((m) => m.map((x) => (x.id === id + 1 ? { ...x, text: slice } : x)));
      await new Promise((r) => setTimeout(r, 16));
    }
    setMsgs((m) => m.map((x) => (x.id === id + 1 ? { ...x, done: true } : x)));
    setStreaming(false);
  };

  const groups = Array.from(new Set(CHAT_HISTORY.map((c) => c.time)));

  return (
    <div className="flex h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)]">
      <AnimatePresence initial={false}>
        {panel && (
          <motion.aside initial={{ width: 0, opacity: 0 }} animate={{ width: 280, opacity: 1 }} exit={{ width: 0, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 34 }} className="hidden shrink-0 overflow-hidden border-r border-ink/[0.06] md:block">
            <div className="flex h-full w-[280px] flex-col p-4">
              <button onClick={() => { setMsgs([]); setActiveChat(null); }} className="flex h-11 items-center justify-between rounded-full bg-ink pl-4 pr-1.5 text-sm font-medium text-white transition hover:bg-ink-soft">
                New conversation <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-ink"><Plus className="h-4 w-4" /></span>
              </button>
              <div className="relative mt-3">
                <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink/35" />
                <input placeholder="Search conversations" className="h-10 w-full rounded-full bg-paper pl-9 pr-3 text-sm outline-none placeholder:text-ink/35 focus:ring-2 focus:ring-brand" />
              </div>
              <div className="mt-5 flex-1 space-y-5 overflow-y-auto">
                {groups.map((g) => (
                  <div key={g}>
                    <p className="eyebrow mb-1.5 px-3">{g}</p>
                    {CHAT_HISTORY.filter((c) => c.time === g).map((c) => (
                      <button key={c.id} onClick={() => setActiveChat(c.id)} className={cn("block w-full truncate rounded-full px-3 py-2 text-left text-sm transition", activeChat === c.id ? "bg-paper font-medium text-ink" : "text-ink/60 hover:bg-paper/70 hover:text-ink")}>
                        {c.title}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="relative flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2 px-4 py-3">
          <button onClick={() => setPanel(!panel)} className="hidden h-9 w-9 place-items-center rounded-full text-ink/45 hover:bg-ink/5 hover:text-ink md:grid"><PanelLeft className="h-4 w-4" /></button>
          <div className="relative">
            <button onClick={() => setModelOpen(!modelOpen)} className="flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3 text-sm font-medium hover:bg-ink/[0.04]">
              <span className={cn("grid h-7 w-7 place-items-center rounded-full", model.bg)}><model.icon className="h-3.5 w-3.5" /></span>
              {model.name}
              <ChevronDown className={cn("h-4 w-4 text-ink/40 transition", modelOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
              {modelOpen && (
                <motion.div initial={{ opacity: 0, y: -6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.98 }} className="absolute left-0 top-12 z-30 w-80 rounded-3xl bg-white p-2 shadow-lift ring-1 ring-ink/10">
                  {MODELS.map((m) => (
                    <button key={m.id} onClick={() => { setModel(m); setModelOpen(false); }} className="flex w-full items-center gap-3 rounded-2xl p-3 text-left hover:bg-paper">
                      <span className={cn("grid h-10 w-10 place-items-center rounded-2xl", m.bg)}><m.icon className="h-4 w-4" /></span>
                      <span className="flex-1"><span className="block text-sm font-medium">{m.name}</span><span className="block text-xs text-ink/50">{m.desc}</span></span>
                      {model.id === m.id && <span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-brand"><Check className="h-3.5 w-3.5" /></span>}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <span className="ml-auto hidden items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-ink/40 sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-mint-deep" /> 128k context</span>
        </div>

        <div className="flex-1 overflow-y-auto">
          {msgs.length === 0 ? (
            <div className="mx-auto flex h-full max-w-3xl flex-col justify-center px-5 py-10">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="eyebrow">Nexora Chat</motion.p>
              <motion.h2 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mt-4 text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[0.95] tracking-[-0.055em]">
                What are we <span className="serif-i">making</span> today?
              </motion.h2>
              <div className="mt-10 grid gap-2 sm:grid-cols-2">
                {SUGGESTIONS.map((s, i) => (
                  <motion.button key={s.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07 }} onClick={() => send(s.text)} className={cn("group flex flex-col rounded-3xl p-5 text-left transition hover:-translate-y-1", s.bg)}>
                    <div className="flex items-center justify-between"><s.icon className="h-5 w-5" strokeWidth={1.8} /><ArrowUp className="h-4 w-4 rotate-45 opacity-0 transition group-hover:opacity-100" /></div>
                    <p className="mt-6 font-mono text-[10px] uppercase tracking-wider text-ink/50">{s.title}</p>
                    <p className="mt-1 text-[15px] leading-snug">{s.text}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl space-y-8 px-5 py-8">
              {msgs.map((m) => (
                <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cn("flex gap-4", m.role === "user" && "justify-end")}>
                  {m.role === "ai" && <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand"><Sparkles className="h-4 w-4" /></span>}
                  <div className={cn("min-w-0", m.role === "user" ? "max-w-[80%] rounded-3xl rounded-br-lg bg-ink px-5 py-3 text-white" : "flex-1 pt-1.5")}>
                    {m.role === "user" ? (
                      <p className="whitespace-pre-wrap text-[15.5px]">{m.text}</p>
                    ) : m.text === "" ? (
                      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink/45">
                        {web ? <><Globe className="h-3.5 w-3.5 animate-spin-slow [animation-duration:3s]" /> Searching 4 sources</> : <span className="flex gap-1">{[0, 1, 2].map((i) => <motion.span key={i} animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }} className="h-2 w-2 rounded-full bg-ink" />)}</span>}
                      </div>
                    ) : (
                      <>
                        <RichText text={m.text} />
                        {!m.done && <span className="ml-0.5 inline-block h-4 w-2 animate-blink rounded-sm bg-flame align-middle" />}
                        {m.done && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex items-center gap-1 text-ink/40">
                            {[
                              { I: Copy, a: () => { navigator.clipboard?.writeText(m.text); toast({ title: "Copied to clipboard" }); } },
                              { I: ThumbsUp, a: () => toast({ title: "Thanks for the feedback" }) },
                              { I: ThumbsDown, a: () => toast({ title: "Feedback noted", type: "info" }) },
                              { I: RefreshCw, a: () => toast({ title: "Regenerating…", type: "info" }) },
                            ].map(({ I, a }, k) => (
                              <button key={k} onClick={a} className="grid h-8 w-8 place-items-center rounded-full hover:bg-ink/5 hover:text-ink"><I className="h-4 w-4" /></button>
                            ))}
                            {web && <span className="ml-2 flex items-center gap-1.5 rounded-full bg-paper px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink/55"><Globe className="h-3 w-3" /> 4 sources</span>}
                          </motion.div>
                        )}
                      </>
                    )}
                  </div>
                  {m.role === "user" && <Avatar src={USER.avatar} name={USER.name} className="h-9 w-9" />}
                </motion.div>
              ))}
              <div ref={endRef} />
            </div>
          )}
        </div>

        <div className="px-4 pb-5">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-[28px] bg-white p-2 shadow-lift ring-1 ring-ink/[0.08] transition focus-within:ring-ink/25">
              <textarea
                ref={taRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder={`Message ${model.name}…`}
                className="block w-full resize-none bg-transparent px-4 pb-2 pt-3 text-[16px] outline-none placeholder:text-ink/35"
              />
              <div className="flex items-center gap-1">
                <button onClick={() => toast({ title: "Attach files", description: "PDFs, images and spreadsheets supported.", type: "info" })} className="grid h-10 w-10 place-items-center rounded-full text-ink/50 hover:bg-ink/5 hover:text-ink"><Paperclip className="h-4 w-4" /></button>
                <button onClick={() => setWeb(!web)} className={cn("flex h-10 items-center gap-1.5 rounded-full px-4 text-sm transition", web ? "bg-brand text-ink" : "text-ink/50 hover:bg-ink/5")}><Globe className="h-4 w-4" /> Web</button>
                <button className="grid h-10 w-10 place-items-center rounded-full text-ink/50 hover:bg-ink/5 hover:text-ink"><Mic className="h-4 w-4" /></button>
                <span className="ml-auto mr-3 hidden font-mono text-[10px] uppercase tracking-wider text-ink/35 sm:block">⇧ ↵ new line</span>
                {streaming ? (
                  <button onClick={() => { stopRef.current = true; }} className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white"><Square className="h-3.5 w-3.5 fill-current" /></button>
                ) : (
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => send()} disabled={!input.trim()} className="grid h-11 w-11 place-items-center rounded-full bg-ink text-brand transition disabled:bg-ink/10 disabled:text-ink/30"><ArrowUp className="h-5 w-5" /></motion.button>
                )}
              </div>
            </div>
            <p className="mt-2.5 text-center font-mono text-[10px] uppercase tracking-wider text-ink/35">Nexora can make mistakes · verify important info</p>
          </div>
        </div>
      </div>
    </div>
  );
}
