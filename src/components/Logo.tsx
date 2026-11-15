import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("relative grid h-8 w-8 place-items-center rounded-[10px] bg-ink", className)}>
      <svg viewBox="0 0 32 32" className="h-[70%] w-[70%] animate-spin-slow [animation-duration:24s]">
        <circle cx="16" cy="16" r="10" fill="#D4FF3A" />
        <path d="M16 8v16M8 16h16M10.3 10.3l11.4 11.4M21.7 10.3 10.3 21.7" stroke="#111" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function Logo({ to = "/", className, light }: { to?: string; className?: string; light?: boolean }) {
  return (
    <Link to={to} className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className={cn("text-[19px] font-semibold tracking-[-0.04em]", light ? "text-white" : "text-ink")}>
        nexora<span className="serif-i text-[21px] text-flame">.ai</span>
      </span>
    </Link>
  );
}
