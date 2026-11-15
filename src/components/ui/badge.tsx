import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium leading-none [&_svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-ink text-white",
        brand: "bg-brand text-ink",
        secondary: "bg-secondary text-ink/70",
        outline: "border border-ink/15 bg-white text-ink",
        success: "bg-mint text-mint-deep",
        warning: "bg-butter text-[#8a5a00]",
        destructive: "bg-flame-soft text-flame",
        lilac: "bg-lilac text-lilac-deep",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
