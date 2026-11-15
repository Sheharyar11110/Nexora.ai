import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Camera, Copy, Eye, EyeOff, Key, Palette, Plus, Shield, Trash2, User, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Avatar, Switch } from "@/components/ui/misc";
import { useToast } from "@/components/providers";
import { PageHeader } from "@/layouts/AppLayout";
import { USER } from "@/data/mock";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "workspace", label: "Workspace", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "api", label: "API keys", icon: Key },
  { id: "security", label: "Security", icon: Shield },
] as const;
type Sec = (typeof SECTIONS)[number]["id"];
const ACCENTS = [
  { n: "Lime", c: "#D4FF3A" }, { n: "Flame", c: "#F0541E" }, { n: "Lilac", c: "#5B4BFF" }, { n: "Mint", c: "#0E9F6E" },
];

function Row({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-ink/[0.06] py-5 last:border-0">
      <div><p className="font-medium">{title}</p><p className="text-sm text-ink/50">{desc}</p></div>
      {children}
    </div>
  );
}

export default function Settings() {
  const toast = useToast();
  const [sec, setSec] = useState<Sec>("profile");
  const [notif, setNotif] = useState({ email: true, push: true, weekly: false, product: true });
  const [twofa, setTwofa] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [accent, setAccent] = useState("Lime");
  const [density, setDensity] = useState("Comfortable");
  const save = () => toast({ title: "Settings saved", description: "Your changes are live." });

  return (
    <div className="mx-auto max-w-[1100px] p-4 md:p-7">
      <PageHeader eyebrow="Account" title="Settings &" serif="preferences" />
      <div className="grid gap-6 md:grid-cols-[210px_1fr]">
        <nav className="flex gap-1 overflow-x-auto md:flex-col">
          {SECTIONS.map((s) => (
            <button key={s.id} onClick={() => setSec(s.id)} className={cn("relative flex h-10 shrink-0 items-center gap-2.5 rounded-full px-4 text-sm transition", sec === s.id ? "text-white" : "text-ink/55 hover:text-ink")}>
              {sec === s.id && <motion.span layoutId="settings-nav" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 500, damping: 40 }} />}
              <s.icon className={cn("relative h-4 w-4", sec === s.id && "text-brand")} /><span className="relative">{s.label}</span>
            </button>
          ))}
        </nav>

        <AnimatePresence mode="wait">
          <motion.div key={sec} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} transition={{ duration: 0.25 }} className="rounded-[28px] bg-white p-6 shadow-soft ring-1 ring-ink/5 md:p-8">
            {sec === "profile" && (
              <div className="space-y-6">
                <div className="flex items-center gap-5 rounded-3xl bg-paper p-4">
                  <div className="group relative">
                    <Avatar src={USER.avatar} name={USER.name} className="h-20 w-20" />
                    <button className="absolute inset-0 grid place-items-center rounded-full bg-ink/50 text-white opacity-0 transition group-hover:opacity-100"><Camera className="h-5 w-5" /></button>
                  </div>
                  <div><p className="text-2xl font-medium tracking-[-0.04em]">{USER.name}</p><p className="text-sm text-ink/50">{USER.email}</p><Badge variant="brand" className="mt-2">Pro member</Badge></div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2"><Label>Full name</Label><Input defaultValue={USER.name} /></div>
                  <div className="space-y-2"><Label>Email</Label><Input defaultValue={USER.email} /></div>
                  <div className="space-y-2"><Label>Job title</Label><Input defaultValue="Head of Product" /></div>
                  <div className="space-y-2"><Label>Timezone</Label><Input defaultValue="(GMT+01:00) Berlin" /></div>
                </div>
                <div className="space-y-2"><Label>Bio</Label><Textarea defaultValue="Building delightful products with AI. Coffee enthusiast." /></div>
                <div className="flex justify-end"><Button onClick={save}>Save changes</Button></div>
              </div>
            )}

            {sec === "workspace" && (
              <div className="space-y-8">
                <div>
                  <p className="font-medium">Accent colour</p>
                  <p className="text-sm text-ink/50">Used for highlights across your workspace.</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {ACCENTS.map((a) => (
                      <button key={a.n} onClick={() => setAccent(a.n)} className={cn("flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4 text-sm ring-1 transition", accent === a.n ? "ring-ink" : "ring-ink/10 hover:ring-ink/30")}>
                        <span className="grid h-7 w-7 place-items-center rounded-full" style={{ background: a.c }}>{accent === a.n && <Check className={cn("h-3.5 w-3.5", a.n === "Lime" ? "text-ink" : "text-white")} strokeWidth={3} />}</span>{a.n}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-medium">Interface density</p>
                  <div className="mt-4 grid grid-cols-3 gap-1 rounded-full bg-paper p-1">
                    {["Compact", "Comfortable", "Spacious"].map((d) => <button key={d} onClick={() => setDensity(d)} className={cn("rounded-full py-2 text-sm transition", density === d ? "bg-ink text-white" : "text-ink/55")}>{d}</button>)}
                  </div>
                </div>
                <Row title="Reduce motion" desc="Follow your operating system preference."><Switch checked={false} onCheckedChange={() => toast({ title: "Using your OS motion setting", type: "info" })} /></Row>
              </div>
            )}

            {sec === "notifications" && (
              <div>
                <Row title="Email summaries" desc="Activity digests delivered to your inbox."><Switch checked={notif.email} onCheckedChange={(v) => setNotif({ ...notif, email: v })} /></Row>
                <Row title="Push notifications" desc="When workflows finish or fail."><Switch checked={notif.push} onCheckedChange={(v) => setNotif({ ...notif, push: v })} /></Row>
                <Row title="Monday digest" desc="A weekly recap of your team's AI usage."><Switch checked={notif.weekly} onCheckedChange={(v) => setNotif({ ...notif, weekly: v })} /></Row>
                <Row title="Product news" desc="New models, features and improvements."><Switch checked={notif.product} onCheckedChange={(v) => setNotif({ ...notif, product: v })} /></Row>
              </div>
            )}

            {sec === "api" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div><p className="font-medium">API keys</p><p className="text-sm text-ink/50">Authenticate requests to the Nexora API.</p></div>
                  <Button size="sm" onClick={() => toast({ title: "New key generated" })}><Plus /> New key</Button>
                </div>
                {[{ n: "Production", k: "nx_live_8f2a91c4e7b34d0f9a1c", c: "Created Oct 12" }, { n: "Development", k: "nx_test_3b7d1e5f9a2c48e6b0d4", c: "Created Sep 02" }].map((key) => (
                  <div key={key.n} className="rounded-3xl bg-paper p-4">
                    <div className="flex items-center justify-between"><p className="font-medium">{key.n}</p><span className="font-mono text-[10px] uppercase tracking-wider text-ink/45">{key.c}</span></div>
                    <div className="mt-3 flex items-center gap-1.5">
                      <code className="flex-1 truncate rounded-full bg-white px-4 py-2.5 font-mono text-xs">{reveal ? key.k : key.k.slice(0, 8) + "•".repeat(20)}</code>
                      <Button size="icon" variant="ghost" onClick={() => setReveal(!reveal)}>{reveal ? <EyeOff /> : <Eye />}</Button>
                      <Button size="icon" variant="ghost" onClick={() => { navigator.clipboard?.writeText(key.k); toast({ title: "API key copied" }); }}><Copy /></Button>
                      <Button size="icon" variant="ghost" className="text-flame hover:bg-flame-soft hover:text-flame"><Trash2 /></Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {sec === "security" && (
              <div>
                <Row title="Two-factor authentication" desc="An extra layer of protection for your account."><Switch checked={twofa} onCheckedChange={setTwofa} /></Row>
                <Row title="Single sign-on" desc="SAML & SCIM on the Business plan."><Badge variant="outline">Business</Badge></Row>
                <Row title="Active sessions" desc="Chrome on Windows · Berlin · this device"><Button size="sm" variant="outline">Sign out others</Button></Row>
                <div className="mt-6 rounded-3xl bg-flame-soft p-5">
                  <p className="font-medium text-flame">Danger zone</p>
                  <p className="mt-1 text-sm text-ink/60">Permanently delete your account and all of its data.</p>
                  <Button variant="destructive" size="sm" className="mt-4"><Trash2 /> Delete account</Button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
