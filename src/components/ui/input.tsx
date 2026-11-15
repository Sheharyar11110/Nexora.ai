import * as React from "react";
import { cn } from "@/lib/utils";

const base =
  "w-full rounded-xl border border-input bg-white px-3.5 text-sm text-ink transition-all placeholder:text-ink/35 focus-visible:outline-none focus-visible:border-ink/50 focus-visible:ring-4 focus-visible:ring-brand/60 disabled:opacity-50";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => <input ref={ref} className={cn(base, "h-11", className)} {...props} />
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => <textarea ref={ref} className={cn(base, "min-h-[96px] py-3", className)} {...props} />
);
Textarea.displayName = "Textarea";

export const Label = ({ className, ...p }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label className={cn("text-[13px] font-medium text-ink/80", className)} {...p} />
);
