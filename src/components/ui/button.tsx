import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 active:scale-[0.97] [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-ink text-white hover:bg-ink-soft shadow-[0_1px_0_rgba(255,255,255,.15)_inset,0_8px_20px_-8px_rgba(17,17,17,.5)]",
        brand: "bg-brand text-ink hover:bg-brand-deep shadow-[0_8px_24px_-10px_rgba(150,190,0,.8)]",
        outline: "border border-ink/15 bg-white/70 text-ink backdrop-blur hover:border-ink/40 hover:bg-white",
        secondary: "bg-secondary text-secondary-foreground hover:bg-paper-deep",
        ghost: "text-ink/70 hover:bg-ink/[0.05] hover:text-ink",
        destructive: "bg-destructive text-white hover:brightness-110",
        link: "text-ink underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-8 px-3.5 text-xs",
        lg: "h-12 px-6 text-[15px]",
        xl: "h-14 px-7 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
  )
);
Button.displayName = "Button";

/** Signature CTA: ink pill with a lime circular arrow that slides on hover. */
export function ArrowButton({ children, className, variant = "ink", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "ink" | "light" }) {
  const ink = variant === "ink";
  return (
    <button
      className={cn(
        "group relative inline-flex h-14 items-center gap-4 overflow-hidden rounded-full py-2 pl-7 pr-2 text-[15px] font-medium transition-all duration-300 active:scale-[0.98]",
        ink ? "bg-ink text-white" : "border border-ink/15 bg-white text-ink",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className={cn("relative z-10 grid h-10 w-10 place-items-center overflow-hidden rounded-full transition-transform duration-500 group-hover:rotate-[-45deg]", ink ? "bg-brand text-ink" : "bg-ink text-white")}>
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </span>
    </button>
  );
}
