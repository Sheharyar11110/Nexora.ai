import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Switch({ checked, onCheckedChange, className }: { checked: boolean; onCheckedChange: (v: boolean) => void; className?: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full p-[3px] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink",
        checked ? "justify-end bg-ink" : "justify-start bg-ink/15",
        className
      )}
    >
      <motion.span layout transition={{ type: "spring", stiffness: 600, damping: 32 }} className={cn("block h-[18px] w-[18px] rounded-full shadow", checked ? "bg-brand" : "bg-white")} />
    </button>
  );
}

export function Progress({ value, className, barClassName }: { value: number; className?: string; barClassName?: string }) {
  return (
    <div className={cn("relative h-2 w-full overflow-hidden rounded-full bg-ink/[0.07]", className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className={cn("h-full rounded-full bg-ink", barClassName)}
      />
    </div>
  );
}

export function Avatar({ src, name, className }: { src?: string; name: string; className?: string }) {
  const [err, setErr] = useState(false);
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("");
  return (
    <span className={cn("relative inline-flex h-9 w-9 shrink-0 overflow-hidden rounded-full bg-lilac ring-2 ring-white", className)}>
      {src && !err ? (
        <img src={src} alt={name} onError={() => setErr(true)} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <span className="flex h-full w-full items-center justify-center text-xs font-semibold text-lilac-deep">{initials}</span>
      )}
    </span>
  );
}

/** Image with fade/blur-in on load and a paper-tone shimmer placeholder. */
export function Img({ src, alt, className, imgClassName }: { src: string; alt: string; className?: string; imgClassName?: string }) {
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState(false);
  return (
    <div className={cn("relative overflow-hidden bg-paper-deep", className)}>
      {!loaded && !err && <div className="absolute inset-0 animate-shimmer bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,.7)_50%,transparent_70%)] bg-[length:200%_100%]" />}
      {!err && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setErr(true)}
          className={cn("h-full w-full object-cover transition-all duration-700", loaded ? "scale-100 opacity-100 blur-0" : "scale-105 opacity-0 blur-md", imgClassName)}
        />
      )}
    </div>
  );
}

/** Segmented control with a sliding white pill. */
export function Tabs<T extends string>({
  tabs, value, onChange, id, className, dark,
}: {
  tabs: { value: T; label: React.ReactNode }[];
  value: T;
  onChange: (v: T) => void;
  id: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div className={cn("inline-flex items-center gap-1 rounded-full p-1", dark ? "bg-white/10" : "bg-ink/[0.06]", className)}>
      {tabs.map((t) => {
        const on = value === t.value;
        return (
          <button
            key={t.value}
            onClick={() => onChange(t.value)}
            className={cn("relative rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors", on ? (dark ? "text-ink" : "text-ink") : dark ? "text-white/60 hover:text-white" : "text-ink/50 hover:text-ink")}
          >
            {on && (
              <motion.span layoutId={`tab-${id}`} className={cn("absolute inset-0 rounded-full shadow-soft", dark ? "bg-brand" : "bg-white")} transition={{ type: "spring", stiffness: 500, damping: 38 }} />
            )}
            <span className="relative z-10 flex items-center justify-center gap-1.5">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function Kbd({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd className={cn("inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-ink/10 bg-white px-1.5 font-mono text-[10px] text-ink/50 shadow-[0_1px_0_rgba(17,17,17,.08)]", className)}>
      {children}
    </kbd>
  );
}

/** Mono section label like: [01] — Capabilities */
export function Eyebrow({ n, children, className }: { n?: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow flex h-fit items-center gap-2 self-start lg:pt-3", className)}>
      {n && <span className="text-ink">[{n}]</span>}
      <span className="h-px w-6 bg-ink/25" />
      {children}
    </p>
  );
}
