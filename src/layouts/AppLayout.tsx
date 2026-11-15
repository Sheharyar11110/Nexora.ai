import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Bell, ChevronsUpDown, LogOut, Menu, PanelLeftClose, PanelLeftOpen, Search, X } from "lucide-react";
import { Logo, LogoMark } from "@/components/Logo";
import { CommandPalette } from "@/components/CommandPalette";
import { Avatar, Kbd } from "@/components/ui/misc";
import { NAV } from "./nav";
import { NOTIFICATIONS, USER } from "@/data/mock";
import { cn } from "@/lib/utils";

function useClickOutside(ref: React.RefObject<HTMLElement>, fn: () => void) {
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) fn(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [ref, fn]);
}

function Sidebar({ collapsed, onToggle, onNavigate }: { collapsed: boolean; onToggle?: () => void; onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className={cn("flex h-16 items-center", collapsed ? "justify-center" : "justify-between pl-5 pr-3")}>
        {collapsed ? <Link to="/"><LogoMark /></Link> : <Logo />}
        {onToggle && !collapsed && (
          <button onClick={onToggle} className="grid h-8 w-8 place-items-center rounded-full text-ink/40 hover:bg-ink/5 hover:text-ink"><PanelLeftClose className="h-4 w-4" /></button>
        )}
      </div>

      {!collapsed && (
        <button className="mx-3 mb-3 mt-1 flex items-center gap-3 rounded-2xl bg-white p-2 text-left shadow-soft ring-1 ring-ink/5 transition hover:ring-ink/15">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-flame text-sm font-semibold text-white">A</span>
          <span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium">Acme Studio</span><span className="block font-mono text-[10px] uppercase tracking-wider text-ink/45">Pro · 7 seats</span></span>
          <ChevronsUpDown className="mr-1 h-4 w-4 text-ink/35" />
        </button>
      )}

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-2">
        {NAV.map((g) => (
          <div key={g.label}>
            {!collapsed && <p className="eyebrow mb-2 px-3">{g.label}</p>}
            <ul className="space-y-0.5">
              {g.items.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={"end" in item ? item.end : false} onClick={onNavigate} title={collapsed ? item.label : undefined}>
                    {({ isActive }) => (
                      <span className={cn("group relative flex h-10 items-center gap-3 rounded-full px-3.5 text-[14px] transition-colors", collapsed && "justify-center px-0", isActive ? "text-white" : "text-ink/60 hover:bg-ink/[0.04] hover:text-ink")}>
                        {isActive && <motion.span layoutId={`side-${collapsed ? "c" : "e"}`} className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 500, damping: 40 }} />}
                        <item.icon className={cn("relative h-[18px] w-[18px]", isActive && "text-brand")} strokeWidth={1.8} />
                        {!collapsed && <span className="relative flex-1">{item.label}</span>}
                        {!collapsed && "badge" in item && item.badge && (
                          <span className={cn("relative rounded-full px-2 py-0.5 font-mono text-[10px]", isActive ? "bg-brand text-ink" : "bg-ink/[0.06] text-ink/55")}>{item.badge}</span>
                        )}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {!collapsed && (
        <div className="m-3 rounded-3xl bg-brand p-4">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-ink/60">Credits left</p>
            <span className="font-mono text-[10px] text-ink/60">74%</span>
          </div>
          <p className="mt-2 text-3xl font-medium tracking-[-0.05em]">{USER.credits.toLocaleString()}<span className="serif-i text-xl text-ink/50"> /10k</span></p>
          <div className="mt-3 flex gap-[3px]">
            {Array.from({ length: 24 }).map((_, i) => <span key={i} className={cn("h-5 flex-1 rounded-sm", i < 18 ? "bg-ink" : "bg-ink/15")} />)}
          </div>
          <Link to="/app/billing" onClick={onNavigate} className="mt-4 flex items-center justify-between rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-white transition hover:bg-ink-soft">
            Upgrade plan <ArrowUpRight className="h-4 w-4 text-brand" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default function AppLayout() {
  const loc = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [cmd, setCmd] = useState(false);
  const [notif, setNotif] = useState(false);
  const [menu, setMenu] = useState(false);
  const [notes, setNotes] = useState(NOTIFICATIONS);
  const notifRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(notifRef, () => setNotif(false));
  useClickOutside(menuRef, () => setMenu(false));

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setCmd((v) => !v); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);
  useEffect(() => setMobile(false), [loc.pathname]);

  const current = NAV.flatMap((g) => g.items).find((i) => (i.to === "/app" ? loc.pathname === "/app" : loc.pathname.startsWith(i.to)));
  const unread = notes.filter((n) => n.unread).length;

  return (
    <div className="flex min-h-screen bg-background">
      <motion.aside animate={{ width: collapsed ? 76 : 268 }} transition={{ type: "spring", stiffness: 300, damping: 34 }} className="sticky top-0 z-30 hidden h-screen shrink-0 lg:block">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(true)} />
      </motion.aside>

      <AnimatePresence>
        {mobile && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobile(false)} className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm lg:hidden" />
            <motion.aside initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", stiffness: 400, damping: 40 }} className="fixed inset-y-2 left-2 z-50 w-[280px] rounded-[28px] bg-background shadow-lift lg:hidden">
              <button onClick={() => setMobile(false)} className="absolute right-3 top-4 grid h-8 w-8 place-items-center rounded-full bg-ink/5"><X className="h-4 w-4" /></button>
              <Sidebar collapsed={false} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col lg:py-2 lg:pr-2">
        <div className="flex min-h-full flex-1 flex-col bg-white/60 lg:rounded-[32px] lg:ring-1 lg:ring-ink/[0.06]">
          <header className="sticky top-0 z-20 flex h-16 items-center gap-3 rounded-t-[32px] bg-white/70 px-4 backdrop-blur-xl md:px-7">
            <button onClick={() => setMobile(true)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-white lg:hidden"><Menu className="h-4 w-4" /></button>
            {collapsed && <button onClick={() => setCollapsed(false)} className="hidden h-9 w-9 place-items-center rounded-full text-ink/45 hover:bg-ink/5 hover:text-ink lg:grid"><PanelLeftOpen className="h-4 w-4" /></button>}
            <div className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-wider sm:flex">
              <span className="text-ink/40">Acme</span><span className="text-ink/25">/</span>
              <AnimatePresence mode="wait"><motion.span key={current?.label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="text-ink">{current?.label}</motion.span></AnimatePresence>
            </div>

            <button onClick={() => setCmd(true)} className="ml-auto flex h-10 w-full max-w-[300px] items-center gap-2.5 rounded-full bg-paper px-4 text-sm text-ink/45 ring-1 ring-ink/[0.05] transition hover:ring-ink/15">
              <Search className="h-4 w-4" /><span className="flex-1 text-left">Search or jump to…</span>
              <span className="hidden gap-1 sm:flex"><Kbd>Ctrl</Kbd><Kbd>K</Kbd></span>
            </button>

            <div className="relative" ref={notifRef}>
              <button onClick={() => setNotif(!notif)} className="relative grid h-10 w-10 place-items-center rounded-full bg-paper text-ink/60 ring-1 ring-ink/[0.05] hover:text-ink">
                <Bell className="h-4 w-4" />
                {unread > 0 && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-flame ring-2 ring-white" />}
              </button>
              <AnimatePresence>
                {notif && (
                  <motion.div initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.97 }} transition={{ duration: 0.18 }} className="absolute right-0 top-12 w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl bg-white shadow-lift ring-1 ring-ink/10">
                    <div className="flex items-center justify-between px-5 py-4">
                      <p className="font-medium">Notifications</p>
                      <button onClick={() => setNotes((n) => n.map((x) => ({ ...x, unread: false })))} className="font-mono text-[10px] uppercase tracking-wider text-ink/50 hover:text-ink">Mark all read</button>
                    </div>
                    <div className="px-2 pb-2">
                      {notes.map((n, i) => (
                        <div key={i} className={cn("flex gap-3 rounded-2xl p-3", n.unread && "bg-paper")}>
                          <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", n.unread ? "bg-flame" : "bg-ink/15")} />
                          <div className="min-w-0 flex-1"><p className="text-sm font-medium">{n.title}</p><p className="truncate text-xs text-ink/50">{n.desc}</p></div>
                          <span className="font-mono text-[10px] text-ink/40">{n.time}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenu(!menu)} className="rounded-full ring-2 ring-transparent transition hover:ring-brand"><Avatar src={USER.avatar} name={USER.name} className="h-10 w-10 ring-0" /></button>
              <AnimatePresence>
                {menu && (
                  <motion.div initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.97 }} transition={{ duration: 0.18 }} className="absolute right-0 top-12 w-64 overflow-hidden rounded-3xl bg-white p-2 shadow-lift ring-1 ring-ink/10">
                    <div className="flex items-center gap-3 rounded-2xl bg-paper p-3">
                      <Avatar src={USER.avatar} name={USER.name} />
                      <div className="min-w-0"><p className="truncate text-sm font-medium">{USER.name}</p><p className="truncate text-xs text-ink/50">{USER.email}</p></div>
                    </div>
                    {[{ l: "Settings", to: "/app/settings" }, { l: "Billing", to: "/app/billing" }, { l: "Team", to: "/app/team" }].map((x) => (
                      <Link key={x.l} to={x.to} onClick={() => setMenu(false)} className="mt-0.5 block rounded-xl px-3 py-2.5 text-sm text-ink/75 hover:bg-ink/[0.04] hover:text-ink">{x.l}</Link>
                    ))}
                    <Link to="/login" className="mt-0.5 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-flame hover:bg-flame-soft"><LogOut className="h-4 w-4" /> Log out</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </header>

          <main className="relative flex-1">
            <AnimatePresence mode="wait">
              <motion.div key={loc.pathname} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="h-full">
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      <CommandPalette open={cmd} onClose={() => setCmd(false)} />
    </div>
  );
}

/** Editorial page header: mono eyebrow, big title with an optional serif-italic word. */
export function PageHeader({ eyebrow, title, serif, desc, children }: { eyebrow?: string; title: string; serif?: string; desc?: string; children?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="text-4xl font-medium leading-none tracking-[-0.05em] md:text-5xl">
          {title} {serif && <span className="serif-i">{serif}</span>}
        </h1>
        {desc && <p className="mt-3 text-[15px] text-ink/55">{desc}</p>}
      </div>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </div>
  );
}
