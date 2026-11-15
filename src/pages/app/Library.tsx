import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, FolderPlus, Grid3x3, ImageIcon, List, MoreHorizontal, Search, Star, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, Img, Progress, Tabs } from "@/components/ui/misc";
import { PageHeader } from "@/layouts/AppLayout";
import { PROJECTS } from "@/data/mock";
import { cn, unsplash } from "@/lib/utils";

const typeIcon = (t: string) => (t.includes("Image") ? ImageIcon : t.includes("Workflow") ? Workflow : FileText);

export default function Library() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [q, setQ] = useState("");
  const [starred, setStarred] = useState<Set<string>>(new Set(["Spring Campaign"]));
  const items = PROJECTS.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
  const toggleStar = (n: string) => setStarred((s) => { const x = new Set(s); x.has(n) ? x.delete(n) : x.add(n); return x; });

  return (
    <div className="mx-auto max-w-[1360px] p-4 md:p-7">
      <PageHeader eyebrow="Workspace" title="Your" serif="library" desc="Every project, asset and draft — beautifully organised.">
        <Button><FolderPlus /> New project</Button>
      </PageHeader>

      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        {[
          { l: "Images", v: "1,284", s: "3.2 GB", icon: ImageIcon, bg: "bg-peach" },
          { l: "Documents", v: "342", s: "48 MB", icon: FileText, bg: "bg-lilac" },
          { l: "Workflows", v: "18", s: "12 live", icon: Workflow, bg: "bg-mint" },
        ].map((s, i) => (
          <motion.div key={s.l} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className={cn("flex items-end justify-between rounded-[28px] p-6", s.bg)}>
            <div>
              <s.icon className="h-5 w-5" strokeWidth={1.8} />
              <p className="mt-8 text-5xl font-medium tracking-[-0.055em]">{s.v}</p>
              <p className="mt-1 text-sm text-ink/60">{s.l}</p>
            </div>
            <span className="rounded-full bg-white/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink/60">{s.s}</span>
          </motion.div>
        ))}
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects" className="rounded-full pl-10" />
        </div>
        <Tabs id="lib-view" className="ml-auto" value={view} onChange={setView} tabs={[{ value: "grid", label: <Grid3x3 className="h-4 w-4" /> }, { value: "list", label: <List className="h-4 w-4" /> }]} />
      </div>

      <AnimatePresence mode="wait">
        {view === "grid" ? (
          <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((p, i) => {
              const Icon = typeIcon(p.type);
              return (
                <motion.div key={p.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="group rounded-[28px] bg-white p-2 shadow-soft ring-1 ring-ink/5 transition hover:-translate-y-1 hover:shadow-lift">
                  <div className="relative h-52 overflow-hidden rounded-[22px]">
                    <Img src={unsplash(p.cover, 800)} alt={p.name} className="h-full w-full" imgClassName="transition-transform duration-700 group-hover:scale-110" />
                    <button onClick={() => toggleStar(p.name)} className={cn("absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full backdrop-blur transition", starred.has(p.name) ? "bg-brand" : "bg-white/85")}>
                      <Star className={cn("h-4 w-4", starred.has(p.name) && "fill-ink")} />
                    </button>
                    <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider backdrop-blur"><Icon className="h-3 w-3" /> {p.type} · {p.items}</span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between"><h3 className="text-lg font-medium tracking-tight">{p.name}</h3><span className="font-mono text-[10px] uppercase tracking-wider text-ink/40">{p.tag}</span></div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex -space-x-2">{p.members.map((m, k) => <Avatar key={k} src={m} name="m" className="h-7 w-7" />)}</div>
                      <span className="text-xs text-ink/45">Updated {p.updated}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-hidden rounded-[28px] bg-white shadow-soft ring-1 ring-ink/5">
            <table className="w-full text-sm">
              <thead className="text-left">
                <tr className="border-b border-ink/[0.06]">{["Name", "Type", "Progress", "Team", "Updated", ""].map((h, i) => <th key={i} className={cn("eyebrow p-5 font-normal", i === 1 && "hidden md:table-cell", i === 2 && "hidden lg:table-cell", i === 3 && "hidden sm:table-cell")}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {items.map((p, i) => (
                  <motion.tr key={p.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="border-b border-ink/[0.05] last:border-0 hover:bg-paper/60">
                    <td className="p-4 pl-5"><div className="flex items-center gap-3"><Img src={unsplash(p.cover, 120)} alt="" className="h-11 w-11 rounded-xl" /><span className="font-medium">{p.name}</span>{starred.has(p.name) && <Star className="h-3.5 w-3.5 fill-ink" />}</div></td>
                    <td className="hidden p-4 text-ink/55 md:table-cell">{p.type}</td>
                    <td className="hidden p-4 lg:table-cell"><div className="flex w-40 items-center gap-2"><Progress value={p.progress} className="h-1.5" /><span className="font-mono text-xs text-ink/50">{p.progress}%</span></div></td>
                    <td className="hidden p-4 sm:table-cell"><div className="flex -space-x-2">{p.members.map((m, k) => <Avatar key={k} src={m} name="m" className="h-7 w-7" />)}</div></td>
                    <td className="p-4 text-ink/50">{p.updated}</td>
                    <td className="p-4"><button className="text-ink/40 hover:text-ink"><MoreHorizontal className="h-4 w-4" /></button></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
