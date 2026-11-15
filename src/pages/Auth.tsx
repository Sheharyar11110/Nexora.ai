import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Github, Loader2 } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Avatar, Img } from "@/components/ui/misc";
import { GALLERY, PEOPLE } from "@/data/mock";
import { cn, sleep, unsplash } from "@/lib/utils";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.94l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}

export default function Auth({ mode }: { mode: "login" | "signup" }) {
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const signup = mode === "signup";
  const strength = Math.min(4, [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((r) => r.test(pw)).length);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await sleep(1100);
    nav("/app");
  };

  return (
    <div className="grid min-h-screen gap-3 p-3 lg:grid-cols-[1fr_1.05fr]">
      <div className="flex flex-col px-4 py-5 sm:px-10">
        <div className="flex items-center justify-between">
          <Logo />
          <Link to="/" className="flex items-center gap-1.5 text-sm text-ink/55 hover:text-ink"><ArrowLeft className="h-4 w-4" /> Home</Link>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={mode} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="mx-auto my-auto w-full max-w-[400px] py-12">
            <p className="eyebrow">{signup ? "Create account" : "Welcome back"}</p>
            <h1 className="mt-4 text-5xl font-medium leading-[0.95] tracking-[-0.05em]">
              {signup ? <>Start making <span className="serif-i">magic.</span></> : <>Good to see <span className="serif-i">you.</span></>}
            </h1>
            <p className="mt-4 text-ink/55">{signup ? "Free forever plan with a 14-day Pro trial. No card needed." : "Sign in to pick up right where you left off."}</p>

            <div className="mt-8 grid grid-cols-2 gap-2">
              <Button variant="outline" size="lg" type="button" onClick={() => nav("/app")}><GoogleIcon /> Google</Button>
              <Button variant="outline" size="lg" type="button" onClick={() => nav("/app")}><Github /> GitHub</Button>
            </div>
            <div className="my-7 flex items-center gap-3"><span className="h-px flex-1 bg-ink/10" /><span className="eyebrow">or with email</span><span className="h-px flex-1 bg-ink/10" /></div>

            <form onSubmit={submit} className="space-y-4">
              {signup && <div className="space-y-2"><Label htmlFor="name">Full name</Label><Input id="name" placeholder="Alex Morgan" required /></div>}
              <div className="space-y-2"><Label htmlFor="email">Work email</Label><Input id="email" type="email" placeholder="you@company.com" required defaultValue={signup ? "" : "alex@nexora.ai"} /></div>
              <div className="space-y-2">
                <div className="flex items-center justify-between"><Label htmlFor="pw">Password</Label>{!signup && <a href="#" className="text-xs text-ink/55 underline-offset-4 hover:text-ink hover:underline">Forgot?</a>}</div>
                <div className="relative">
                  <Input id="pw" type={show ? "text" : "password"} placeholder="••••••••" value={pw} onChange={(e) => setPw(e.target.value)} required className="pr-11" />
                  <button type="button" onClick={() => setShow(!show)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink">{show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                </div>
                {signup && pw && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="flex items-center gap-3 pt-1">
                    <div className="flex flex-1 gap-1">{[0, 1, 2, 3].map((i) => <span key={i} className={cn("h-1.5 flex-1 rounded-full transition-colors duration-300", i < strength ? (strength < 3 ? "bg-flame" : "bg-ink") : "bg-ink/10")} />)}</div>
                    <span className="font-mono text-[11px] text-ink/50">{["weak", "weak", "fair", "good", "strong"][strength]}</span>
                  </motion.div>
                )}
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : signup ? "Create my account" : "Sign in"}
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-ink/55">
              {signup ? "Already have an account? " : "New to Nexora? "}
              <Link to={signup ? "/login" : "/signup"} className="font-medium text-ink underline-offset-4 hover:underline">{signup ? "Sign in" : "Create an account"}</Link>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative hidden overflow-hidden rounded-[36px] bg-ink lg:block">
        <div className="absolute inset-0 grid grid-cols-3 gap-3 p-3 opacity-90">
          {[0, 1, 2].map((col) => (
            <motion.div key={col} className="flex flex-col gap-3" animate={{ y: col % 2 ? ["-30%", "0%"] : ["0%", "-30%"] }} transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}>
              {[...GALLERY, ...GALLERY].slice(col * 4, col * 4 + 7).map((g, i) => (
                <Img key={i} src={unsplash(g.id, 500)} alt="" className={cn("w-full shrink-0 rounded-3xl", i % 2 ? "aspect-[3/4]" : "aspect-square")} />
              ))}
            </motion.div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="absolute inset-x-8 bottom-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="rounded-[28px] bg-white/95 p-7 backdrop-blur">
            <p className="text-2xl font-medium leading-snug tracking-tight">“Nexora replaced five tools for us. Our content velocity went up <span className="serif-i text-flame">4×</span> in the first month.”</p>
            <div className="mt-6 flex items-center gap-3">
              <Avatar src={PEOPLE.sarah} name="Sarah Chen" className="h-11 w-11" />
              <div><p className="font-medium">Sarah Chen</p><p className="text-sm text-ink/50">Head of Growth, Lumina</p></div>
              <span className="ml-auto rounded-full bg-brand px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider">48k+ teams</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
