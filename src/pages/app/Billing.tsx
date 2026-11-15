import { motion } from "framer-motion";
import { ArrowUpRight, Download, ImageIcon, MessageSquare, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/misc";
import { useToast } from "@/components/providers";
import { PageHeader } from "@/layouts/AppLayout";
import { PricingCards } from "@/pages/marketing/Landing";
import { INVOICES, USER } from "@/data/mock";

export default function Billing() {
  const toast = useToast();
  return (
    <div className="mx-auto max-w-[1360px] p-4 md:p-7">
      <PageHeader eyebrow="Account" title="Plan &" serif="billing" desc="Your subscription, usage and invoices." />

      <div className="grid gap-3 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, rotate: -3, y: 20 }} animate={{ opacity: 1, rotate: 0, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <div className="relative aspect-[1.6] overflow-hidden rounded-[28px] bg-ink p-6 text-white">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand" />
            <div className="absolute -right-6 top-24 h-24 w-24 rounded-full bg-flame mix-blend-screen" />
            <div className="relative flex h-full flex-col">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold tracking-[-0.04em]">nexora<span className="serif-i text-flame">.ai</span></span>
              </div>
              <div className="mt-auto">
                <p className="font-mono text-lg tracking-[0.22em]">•••• •••• •••• 4242</p>
                <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-wider text-white/50"><span>{USER.name}</span><span>12/28</span></div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col rounded-[28px] bg-white p-6 shadow-soft ring-1 ring-ink/5">
          <div className="flex items-center justify-between"><p className="eyebrow">Current plan</p><Badge variant="brand">Pro</Badge></div>
          <p className="mt-5 text-6xl font-medium tracking-[-0.06em]">$29<span className="serif-i text-2xl text-ink/40"> /month</span></p>
          <p className="mt-2 text-sm text-ink/55">Renews <span className="font-medium text-ink">Dec 01, 2026</span></p>
          <div className="mt-auto flex gap-2 pt-6">
            <Button className="flex-1">Upgrade <ArrowUpRight /></Button>
            <Button variant="outline" onClick={() => toast({ title: "Billing portal opened", type: "info" })}>Manage</Button>
          </div>
        </div>

        <div className="rounded-[28px] bg-lilac p-6">
          <p className="eyebrow">This cycle</p>
          <p className="mt-5 text-5xl font-medium tracking-[-0.055em]">{(USER.creditsMax - USER.credits).toLocaleString()}<span className="serif-i text-2xl text-ink/45"> used</span></p>
          <div className="mt-5 space-y-3 text-sm">
            {[{ l: "Chat", v: 1240, icon: MessageSquare }, { l: "Images", v: 920, icon: ImageIcon }, { l: "Workflows", v: 420, icon: Workflow }].map((u) => (
              <div key={u.l}>
                <div className="mb-1.5 flex justify-between"><span className="flex items-center gap-1.5 text-ink/65"><u.icon className="h-3.5 w-3.5" /> {u.l}</span><span className="font-mono text-xs">{u.v.toLocaleString()}</span></div>
                <Progress value={(u.v / 2580) * 100} className="h-1.5 bg-white/60" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-14">
        <h2 className="mb-8 text-center text-4xl font-medium tracking-[-0.05em]">Change your <span className="serif-i">plan</span></h2>
        <PricingCards compact />
      </div>

      <div className="mt-14 overflow-hidden rounded-[28px] bg-white shadow-soft ring-1 ring-ink/5">
        <div className="flex items-center justify-between p-5"><h2 className="text-xl font-medium tracking-tight">Invoices</h2><Button size="sm" variant="ghost"><Download /> Download all</Button></div>
        <table className="w-full text-sm">
          <tbody>
            {INVOICES.map((inv) => (
              <tr key={inv.id} className="border-t border-ink/[0.05] hover:bg-paper/60">
                <td className="p-4 pl-5 font-mono text-xs">{inv.id}</td>
                <td className="p-4 text-ink/55">{inv.date}</td>
                <td className="p-4 font-medium tabular-nums">${inv.amount}.00</td>
                <td className="p-4"><Badge variant={inv.status === "Paid" ? "success" : "secondary"}>{inv.status}</Badge></td>
                <td className="p-4 pr-5 text-right"><button onClick={() => toast({ title: `Downloading ${inv.id}.pdf`, type: "info" })} className="grid h-8 w-8 place-items-center rounded-full text-ink/40 hover:bg-paper hover:text-ink"><Download className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
