import * as React from "react"
import {cva, type VariantProps} from "class-variance-authority"

import {cn} from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900",
      {
    variants: {
      variant: {
        default:
          "border-transparent bg-emerald-600 text-[var(--text)] hover:bg-emerald-500",
        secondary:
          "border-transparent bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-gray-200 dark:hover:bg-neutral-700",
        destructive:
          "border-transparent bg-red-600 text-[var(--text)] hover:bg-red-500",
        outline: "text-[var(--text)] border border-gray-300 dark:border-neutral-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { Badge, badgeVariants }
