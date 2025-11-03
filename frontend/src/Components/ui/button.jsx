import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-400/50",
  {
    variants: {
      variant: {
        default:
          "bg-blue-500 hover:bg-blue-400 active:bg-blue-300 shadow-[0_0_10px_rgba(0,255,150,0.3)] hover:shadow-[0_0_20px_rgba(0,255,150,0.4)]",
        outline:
          "border border-gray-700 bg-transparent text-gray-200 hover:bg-gray-800/70 hover:text-white",
        ghost:
          "text-gray-400 hover:text-white hover:bg-gray-800/60",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500/50",
        secondary:
          "bg-gray-800 text-gray-200 hover:bg-gray-700 focus-visible:ring-gray-500/50",
      },
      size: {
        default: "h-9 px-4 py-2 text-sm",
        sm: "h-8 px-3 text-sm",
        lg: "h-10 px-6 text-base",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
