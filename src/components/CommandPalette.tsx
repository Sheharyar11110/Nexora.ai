import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, LogOut, Plus, Search, Sparkles } from "lucide-react";
import { Kbd } from "@/components/ui/misc";
import { NAV } from "@/layouts/nav";
import { cn } from "@/lib/utils";

type Cmd = { id: string; label: string; group: string; icon: React.ComponentType<{ className?: string }>; run: () => void };

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const cmds: Cmd[] = useMemo(
    () => [
      { id: "new-chat", label: "Start a new chat", group: "Quick actions", icon: Plus, run: () => nav("/app/chat") },
      { id: "gen", label: "Generate an image", group: "Quick actions", icon: Sparkles, run: () => nav("/app/studio") },
      ...NAV.flatMap((g) => g.items).map((i) => ({ id: i.to, label: i.label, group: "Go to", icon: i.icon, run: () => nav(i.to) })),
      { id: "logout", label: "Log out", group: "Account", icon: LogOut, run: () => nav("/login") },
    ],
    [nav]
  );

  const filtered = cmds.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()));
  const groups = Array.from(new Set(filtered.map((c) => c.group)));

  useEffect(() => {
    if (open) { setQ(""); setIdx(0); setTimeout(() => inputRef.current?.focus(), 50); }
  }, [open]);
  useEffect(() => setIdx(0), [q]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(i + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
    if (e.key === "Enter" && filtered[idx]) { filtered[idx].run(); onClose(); }
    if (e.key === "Escape") onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] flex items-start justify-center bg-ink/20 p-4 pt-[12vh] backdrop-blur-[6px]" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onKey}
            className="w-full max-w-xl overflow-hidden rounded-[28px] bg-white shadow-[0_40px_100px_-20px_rgba(17,17,17,.35)] ring-1 ring-ink/10"
          >
            <div className="flex items-center gap-3 px-5">
              <Search className="h-5 w-5 text-ink/35" />
              <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="What do you want to do?" className="h-16 flex-1 bg-transparent text-[17px] outline-none placeholder:text-ink/35" />
              <Kbd>esc</Kbd>
            </div>
            <div className="max-h-[50vh] overflow-y-auto border-t border-ink/[0.06] p-2">
              {filtered.length === 0 && <p className="py-12 text-center text-sm text-ink/50">Nothing matches “{q}”</p>}
              {groups.map((g) => (
                <div key={g} className="mb-1">
                  <p className="eyebrow px-3 pb-1.5 pt-3">{g}</p>
                  {filtered.filter((c) => c.group === g).map((c) => {
                    const i = filtered.indexOf(c);
                    const on = i === idx;
                    return (
                      <button key={c.id} onMouseEnter={() => setIdx(i)} onClick={() => { c.run(); onClose(); }} className={cn("relative flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-[15px]", on ? "text-white" : "text-ink/75")}>
                        {on && <motion.span layoutId="cmd-active" className="absolute inset-0 rounded-2xl bg-ink" transition={{ type: "spring", stiffness: 600, damping: 40 }} />}
                        <span className={cn("relative grid h-8 w-8 place-items-center rounded-xl", on ? "bg-brand text-ink" : "bg-ink/[0.05]")}><c.icon className="h-4 w-4" /></span>
                        <span className="relative">{c.label}</span>
                        {on && <ArrowRight className="relative ml-auto h-4 w-4 text-brand" />}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 border-t border-ink/[0.06] bg-paper/60 px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-ink/45">
              <span className="flex items-center gap-1.5"><Kbd>↑</Kbd><Kbd>↓</Kbd> move</span>
              <span className="flex items-center gap-1.5"><Kbd>↵</Kbd> open</span>
              <span className="ml-auto">nexora command</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
