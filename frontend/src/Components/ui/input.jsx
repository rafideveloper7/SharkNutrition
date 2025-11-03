import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
     className={cn(
  "file:text-foreground placeholder:text-gray-400 selection:bg-green-500 selection:text-white dark:bg-gray-700 border-gray-600 h-9 w-full min-w-0 rounded-md border bg-gray-800 px-3 py-1 text-white shadow-sm transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  "focus-visible:border-green-400 focus-visible:ring-green-400/50 focus-visible:ring-[3px]",
  "aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-400/40 aria-invalid:border-red-500",
  className
)}

      {...props} />
  );
}

export { Input }
