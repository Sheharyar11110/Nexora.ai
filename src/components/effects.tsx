import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade + rise when scrolled into view. */
export function Reveal({ children, delay = 0, y = 28, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Line-mask reveal: each line slides up from behind a clip. */
export function MaskLine({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <span className={cn("block overflow-hidden pb-[0.08em]", className)}>
      <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay, ease: EASE }}>
        {children}
      </motion.span>
    </span>
  );
}

/** Animated number counter. */
export function CountUp({ to, prefix = "", suffix = "", decimals = 0, duration = 2, proportional }: { to: number; prefix?: string; suffix?: string; decimals?: number; duration?: number; proportional?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true });
  const [visibleOnMount, setVisibleOnMount] = useState(false);
  const [val, setVal] = useState(0);
  // Fallback: if the element is already on screen at mount, start even if IntersectionObserver is late.
  useEffect(() => {
    const r = ref.current?.getBoundingClientRect();
    if (r && r.top < window.innerHeight && r.bottom > 0) setVisibleOnMount(true);
  }, []);
  const inView = seen || visibleOnMount;
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration, ease: EASE, onUpdate: setVal });
    return () => c.stop();
  }, [inView, to, duration]);
  return (
    <span ref={ref} className={proportional ? undefined : "tabular-nums"}>
      {prefix}
      {val.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

/** Paragraph whose words light up as you scroll through it. */
export function ScrollText({ text, className, highlight = [] }: { text: string; className?: string; highlight?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.35"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={cn("flex flex-wrap", className)}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} hl={highlight.includes(w.replace(/[.,]/g, ""))}>
          {w}
        </Word>
      ))}
    </p>
  );
}
function Word({ children, progress, range, hl }: { children: string; progress: MotionValue<number>; range: [number, number]; hl: boolean }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <span className="relative mr-[0.25em]">
      <motion.span style={{ opacity }} className={cn(hl && "serif-i")}>{children}</motion.span>
    </span>
  );
}

/** 3D tilt on hover. */
export function Tilt({ children, className, max = 6 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(0, { stiffness: 180, damping: 18 });
  const ry = useSpring(0, { stiffness: 180, damping: 18 });
  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Infinite horizontal marquee. */
export function Marquee({ children, reverse, duration = 40, className, gap = "3rem" }: { children: ReactNode; reverse?: boolean; duration?: number; className?: string; gap?: string }) {
  return (
    <div className={cn("group flex overflow-hidden mask-fade-x", className)} style={{ ["--duration" as string]: `${duration}s`, ["--gap" as string]: gap }}>
      {[0, 1].map((k) => (
        <div key={k} aria-hidden={k === 1} className={cn("flex shrink-0 animate-marquee items-center gap-[var(--gap)] pr-[var(--gap)] group-hover:[animation-play-state:paused]", reverse && "[animation-direction:reverse]")}>
          {children}
        </div>
      ))}
    </div>
  );
}

/** Magnetic hover wrapper. */
export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const x = useSpring(0, { stiffness: 250, damping: 15 });
  const y = useSpring(0, { stiffness: 250, damping: 15 });
  return (
    <motion.div
      style={{ x, y }}
      className="inline-block"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/** Cycles through words with a vertical slot-machine roll. */
export function WordRoll({ words, className, interval = 2200 }: { words: string[]; className?: string; interval?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);
  return (
    <motion.span layout transition={{ duration: 0.6, ease: EASE }} className={cn("relative inline-block overflow-hidden whitespace-nowrap pb-[0.06em] align-bottom", className)}>
      {/* invisible sizer: container width follows the current word */}
      <span className="invisible">{words[i]}</span>
      {words.map((w, k) => (
        <motion.span
          key={w}
          className="absolute left-0 top-0"
          initial={false}
          animate={{ y: k === i ? "0%" : k === (i - 1 + words.length) % words.length ? "-110%" : "110%", opacity: k === i ? 1 : 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {w}
        </motion.span>
      ))}
    </motion.span>
  );
}
