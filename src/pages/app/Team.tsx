import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, MoreHorizontal, Search, UserPlus, X, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input, Label } from "@/components/ui/input";
import { Avatar, Progress } from "@/components/ui/misc";
import { useToast } from "@/components/providers";
import { PageHeader } from "@/layouts/AppLayout";
import { TEAM } from "@/data/mock";
import { cn } from "@/lib/utils";

const roleVariant = { Owner: "default", Admin: "lilac", Editor: "success", Viewer: "secondary" } as const;
const statusColor = { online: "bg-mint-deep", away: "bg-[#b07800]", offline: "bg-ink/25" } as const;

export default function Team() {
  const toast = useToast();
  const [q, setQ] = useState("");
  const [invite, setInvite] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Editor");
  const members = TEAM.filter((m) => (m.name + m.email).toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="mx-auto max-w-[1360px] p-4 md:p-7">
      <PageHeader eyebrow="Account" title="The" serif="team" desc="People, roles and how much they're creating.">
        <Button onClick={() => setInvite(true)}><UserPlus /> Invite people</Button>
      </PageHeader>

      <div className="mb-3 grid gap-3 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex items-center justify-between rounded-[28px] bg-ink p-6 text-white">
          <div>
            <p className="eyebrow text-white/45">Seats in use</p>
            <p className="mt-4 text-6xl font-medium tracking-[-0.06em]">{TEAM.length}<span className="serif-i text-3xl text-white/40"> / 10</span></p>
          </div>
          <div className="flex -space-x-3">{TEAM.slice(0, 4).map((m) => <Avatar key={m.email} src={m.avatar} name={m.name} className="h-12 w-12 ring-ink" />)}</div>
        </div>
        <div className="rounded-[28px] bg-lilac p-6"><p className="eyebrow">Admins</p><p className="mt-4 text-5xl font-medium tracking-[-0.055em]">{TEAM.filter((t) => t.role === "Admin" || t.role === "Owner").length}</p></div>
        <div className="rounded-[28px] bg-butter p-6"><p className="eyebrow">Pending invites</p><p className="mt-4 text-5xl font-medium tracking-[-0.055em]">2</p></div>
      </div>

      <div className="overflow-hidden rounded-[28px] bg-white shadow-soft ring-1 ring-ink/5">
        <div className="flex items-center gap-3 p-4">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search people" className="rounded-full pl-10" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-sm">
            <thead className="text-left"><tr className="border-y border-ink/[0.06]">{["Member", "Role", "Credit usage", "Status", ""].map((h) => <th key={h} className="eyebrow p-5 font-normal">{h}</th>)}</tr></thead>
            <tbody>
              {members.map((m, i) => (
                <motion.tr key={m.email} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="border-b border-ink/[0.05] last:border-0 hover:bg-paper/60">
                  <td className="p-4 pl-5">
                    <div className="flex items-center gap-3">
                      <span className="relative"><Avatar src={m.avatar} name={m.name} className="h-10 w-10" /><span className={cn("absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-white", statusColor[m.status as keyof typeof statusColor])} /></span>
                      <div><p className="flex items-center gap-1.5 font-medium">{m.name}{m.role === "Owner" && <Crown className="h-3.5 w-3.5 text-flame" />}</p><p className="text-xs text-ink/45">{m.email}</p></div>
                    </div>
                  </td>
                  <td className="p-4"><Badge variant={roleVariant[m.role as keyof typeof roleVariant]}>{m.role}</Badge></td>
                  <td className="p-4"><div className="flex w-48 items-center gap-3"><Progress value={m.usage} className="h-1.5" /><span className="font-mono text-xs text-ink/50">{m.usage}%</span></div></td>
                  <td className="p-4 capitalize text-ink/55">{m.status}</td>
                  <td className="p-4"><button className="text-ink/40 hover:text-ink"><MoreHorizontal className="h-4 w-4" /></button></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {invite && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setInvite(false)} className="fixed inset-0 z-[80] grid place-items-center bg-ink/25 p-4 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 16 }} transition={{ type: "spring", stiffness: 400, damping: 30 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-[32px] bg-white p-7 shadow-lift">
              <div className="flex items-start justify-between">
                <h2 className="text-3xl font-medium tracking-[-0.045em]">Invite <span className="serif-i">teammates</span></h2>
                <button onClick={() => setInvite(false)} className="grid h-9 w-9 place-items-center rounded-full bg-paper"><X className="h-4 w-4" /></button>
              </div>
              <p className="mt-2 text-sm text-ink/55">They'll get a magic link to join Acme Studio.</p>
              <div className="mt-6 space-y-5">
                <div className="space-y-2"><Label>Email addresses</Label><Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@company.com, john@company.com" /></div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <div className="grid grid-cols-3 gap-1 rounded-full bg-paper p-1">
                    {["Admin", "Editor", "Viewer"].map((r) => <button key={r} onClick={() => setRole(r)} className={cn("rounded-full py-2 text-sm transition", role === r ? "bg-ink text-white" : "text-ink/55")}>{r}</button>)}
                  </div>
                </div>
              </div>
              <Button size="lg" className="mt-7 w-full" disabled={!email.includes("@")} onClick={() => { setInvite(false); setEmail(""); toast({ title: "Invitations sent", description: `Invited as ${role}` }); }}><Mail /> Send invites</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
