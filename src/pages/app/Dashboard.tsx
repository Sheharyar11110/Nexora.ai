import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowUpRight, ImageIcon, MessageSquare, PenLine, Plus, TrendingUp, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, Img, Progress, Tabs } from "@/components/ui/misc";
import { CountUp } from "@/components/effects";
import { ACTIVITY, MODEL_SPLIT, PROJECTS, REVENUE, USER, WEEKLY } from "@/data/mock";
import { cn, unsplash } from "@/lib/utils";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };

export function ChartTooltip({ active, payload, label, unit = "" }: { active?: boolean; payload?: { value: number; name: string; color?: string; payload?: { color?: string; fill?: string } }[]; label?: string; unit?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-2xl bg-ink px-3.5 py-2.5 text-xs text-white shadow-lift">
      {label && <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-white/50">{label}</p>}
      {payload.map((p) => (
        <p key={p.name} className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ background: p.payload?.color ?? p.color }} />
          <span className="text-white/60">{p.name}</span>
          <span className="ml-auto font-medium tabular-nums">{p.value.toLocaleString()}{unit}</span>
        </p>
      ))}
    </div>
  );
}

const METRICS = {
  tokens: { label: "Tokens (k)", short: "Tokens", color: "#5b4bff" },
  images: { label: "Images", short: "Images", color: "#f0541e" },
  runs: { label: "Workflow runs", short: "Runs", color: "#0e9f6e" },
} as const;
type Metric = keyof typeof METRICS;

const AXIS = { fill: "rgba(17,17,17,.45)", fontSize: 11, fontFamily: "Geist Mono" };

export default function Dashboard() {
  const [metric, setMetric] = useState<Metric>("tokens");
  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const today = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  const maxDay = Math.max(...WEEKLY.map((w) => w.v));

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="mx-auto max-w-[1360px] space-y-3 p-4 md:p-7">
      {/* Greeting */}
      <motion.div variants={item} className="flex flex-col justify-between gap-6 pb-5 pt-2 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">{today}</p>
          <h1 className="mt-3 text-[clamp(2.4rem,5vw,4.2rem)] font-medium leading-[0.95] tracking-[-0.055em]">
            {greet}, <span className="serif-i">{USER.name.split(" ")[0]}.</span>
          </h1>
          <p className="mt-3 max-w-lg text-ink/55">Your team saved <span className="marker text-ink">42 hours</span> this week. Three workflows are running and 12 images await review.</p>
        </div>
        <div className="flex gap-2">
          <Link to="/app/studio"><Button variant="outline" size="lg"><ImageIcon /> New image</Button></Link>
          <Link to="/app/chat"><Button size="lg"><Plus /> New chat</Button></Link>
        </div>
      </motion.div>

      {/* KPI bento */}
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <motion.div variants={item} className="relative overflow-hidden rounded-[28px] bg-ink p-6 text-white xl:row-span-1">
          <div className="flex items-center justify-between"><p className="eyebrow text-white/50">Hours saved</p><span className="flex items-center gap-1 rounded-full bg-brand px-2 py-0.5 text-[11px] font-medium text-ink"><TrendingUp className="h-3 w-3" /> 19%</span></div>
          <p className="mt-6 text-6xl font-medium tracking-[-0.06em] text-brand"><CountUp to={342} /><span className="serif-i text-3xl text-white/70"> hrs</span></p>
          <div className="-mx-6 -mb-6 mt-3 h-16">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE}>
                <defs><linearGradient id="hs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#D4FF3A" stopOpacity={0.35} /><stop offset="1" stopColor="#D4FF3A" stopOpacity={0} /></linearGradient></defs>
                <Area type="monotone" dataKey="runs" stroke="#D4FF3A" strokeWidth={2} fill="url(#hs)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        {[
          { l: "Credits used", v: 2580, d: "+12.4%", bg: "bg-lilac", icon: MessageSquare },
          { l: "Images generated", v: 1284, d: "+28.1%", bg: "bg-peach", icon: ImageIcon },
          { l: "Workflow runs", v: 9312, d: "+8.7%", bg: "bg-mint", icon: Workflow },
        ].map((k) => (
          <motion.div key={k.l} variants={item} whileHover={{ y: -4 }} className={cn("flex flex-col justify-between rounded-[28px] p-6", k.bg)}>
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/70"><k.icon className="h-[18px] w-[18px]" strokeWidth={1.8} /></span>
              <span className="font-mono text-[11px] text-ink/60">{k.d}</span>
            </div>
            <div className="mt-8">
              <p className="text-5xl font-medium tracking-[-0.055em]"><CountUp to={k.v} /></p>
              <p className="mt-1 text-sm text-ink/60">{k.l}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-3 xl:grid-cols-3">
        <motion.div variants={item} className="rounded-[28px] bg-white p-6 shadow-soft ring-1 ring-ink/5 xl:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Usage · 12 months</p>
              <p className="mt-2 text-2xl font-medium tracking-tight">{METRICS[metric].label}</p>
            </div>
            <Tabs id="metric" value={metric} onChange={setMetric} tabs={(Object.keys(METRICS) as Metric[]).map((m) => ({ value: m, label: <><span className="h-2 w-2 rounded-full" style={{ background: METRICS[m].color }} />{METRICS[m].short}</> }))} />
          </div>
          <div className="mt-6 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE} margin={{ left: -18, right: 6, top: 6 }}>
                <defs>
                  <linearGradient id="usage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor={METRICS[metric].color} stopOpacity={0.22} />
                    <stop offset="1" stopColor={METRICS[metric].color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="rgba(17,17,17,.06)" />
                <XAxis dataKey="m" axisLine={false} tickLine={false} tick={AXIS} dy={8} />
                <YAxis axisLine={false} tickLine={false} tick={AXIS} tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)} />
                <Tooltip content={<ChartTooltip />} cursor={{ stroke: "rgba(17,17,17,.3)", strokeDasharray: "3 3" }} />
                <Area key={metric} type="monotone" dataKey={metric} name={METRICS[metric].label} stroke={METRICS[metric].color} strokeWidth={2} fill="url(#usage)" activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff" }} animationDuration={900} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={item} className="rounded-[28px] bg-white p-6 shadow-soft ring-1 ring-ink/5">
          <p className="eyebrow">This month</p>
          <p className="mt-2 text-2xl font-medium tracking-tight">Credits by <span className="serif-i">capability</span></p>
          <div className="relative mt-4 h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={MODEL_SPLIT} dataKey="value" nameKey="name" innerRadius={60} outerRadius={84} paddingAngle={2} stroke="#fff" strokeWidth={2} cornerRadius={4}>
                  {MODEL_SPLIT.map((m) => <Cell key={m.name} fill={m.color} />)}
                </Pie>
                <Tooltip content={<ChartTooltip unit="%" />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
              <div><p className="text-3xl font-medium tracking-[-0.05em]">2,580</p><p className="font-mono text-[10px] uppercase tracking-wider text-ink/45">credits</p></div>
            </div>
          </div>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
            {MODEL_SPLIT.map((m) => (
              <li key={m.name} className="flex items-center gap-2.5 text-sm">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: m.color }} />
                <span className="flex-1 text-ink/60">{m.name}</span>
                <span className="font-mono text-xs tabular-nums">{m.value}%</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="grid gap-3 xl:grid-cols-3">
        <motion.div variants={item} className="rounded-[28px] bg-white p-6 shadow-soft ring-1 ring-ink/5">
          <p className="eyebrow">Quick start</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {[
              { l: "Ask AI", d: "Chat & research", to: "/app/chat", icon: MessageSquare, bg: "bg-lilac" },
              { l: "Create image", d: "Aurora 2.0", to: "/app/studio", icon: ImageIcon, bg: "bg-peach" },
              { l: "Write copy", d: "40+ templates", to: "/app/writer", icon: PenLine, bg: "bg-mint" },
              { l: "Automate", d: "Build a flow", to: "/app/workflows", icon: Workflow, bg: "bg-mist" },
            ].map((a) => (
              <Link key={a.l} to={a.to} className={cn("group relative rounded-3xl p-4 transition-transform hover:-translate-y-1", a.bg)}>
                <a.icon className="h-5 w-5" strokeWidth={1.8} />
                <p className="mt-8 font-medium">{a.l}</p>
                <p className="text-xs text-ink/55">{a.d}</p>
                <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-ink text-brand opacity-0 transition group-hover:opacity-100"><ArrowUpRight className="h-3.5 w-3.5" /></span>
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="rounded-[28px] bg-white p-6 shadow-soft ring-1 ring-ink/5">
          <div className="flex items-start justify-between">
            <div><p className="eyebrow">Team sessions</p><p className="mt-2 text-2xl font-medium tracking-tight">This <span className="serif-i">week</span></p></div>
            <span className="font-mono text-xs text-ink/50">470 total</span>
          </div>
          <div className="mt-4 h-[230px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY} margin={{ left: -26, top: 8 }}>
                <CartesianGrid vertical={false} stroke="rgba(17,17,17,.06)" />
                <XAxis dataKey="d" axisLine={false} tickLine={false} tick={AXIS} />
                <YAxis axisLine={false} tickLine={false} tick={AXIS} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(17,17,17,.04)", radius: 8 }} />
                <Bar dataKey="v" name="Sessions" radius={[4, 4, 4, 4]} maxBarSize={30}>
                  {WEEKLY.map((w) => <Cell key={w.d} fill={w.v === maxDay ? "#f0541e" : "#111111"} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={item} className="rounded-[28px] bg-white p-6 shadow-soft ring-1 ring-ink/5">
          <div className="flex items-start justify-between">
            <div><p className="eyebrow">Activity</p><p className="mt-2 text-2xl font-medium tracking-tight">What's <span className="serif-i">new</span></p></div>
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-mint-deep"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint-deep" /> live</span>
          </div>
          <ol className="mt-5 space-y-4">
            {ACTIVITY.map((a, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.08 }} className="flex gap-3">
                <Avatar src={a.avatar} name={a.who} className="h-8 w-8" />
                <div className="min-w-0 flex-1 text-sm leading-snug">
                  <p><span className="font-medium">{a.who.split(" ")[0]}</span> <span className="text-ink/55">{a.what}</span> <span className="font-medium">{a.target}</span></p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-ink/40">{a.time}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>

      <motion.div variants={item} className="pt-6">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-3xl font-medium tracking-[-0.045em]">Recent <span className="serif-i">projects</span></h2>
          <Link to="/app/library" className="flex items-center gap-1 text-sm text-ink/55 hover:text-ink">View all <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {PROJECTS.slice(0, 3).map((p) => (
            <Link to="/app/library" key={p.name} className="group rounded-[28px] bg-white p-2 shadow-soft ring-1 ring-ink/5 transition hover:-translate-y-1 hover:shadow-lift">
              <div className="relative h-44 overflow-hidden rounded-[22px]">
                <Img src={unsplash(p.cover, 800)} alt={p.name} className="h-full w-full" imgClassName="transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider backdrop-blur">{p.tag}</span>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between"><h3 className="font-medium">{p.name}</h3><span className="font-mono text-[10px] text-ink/45">{p.updated}</span></div>
                <p className="text-sm text-ink/50">{p.type} · {p.items} items</p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex -space-x-2">{p.members.map((m, i) => <Avatar key={i} src={m} name="m" className="h-7 w-7" />)}</div>
                  <Progress value={p.progress} className="h-1.5" />
                  <span className="font-mono text-xs tabular-nums text-ink/50">{p.progress}%</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
