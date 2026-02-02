import { cn } from "@/lib/utils"

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full rounded-md border border-gray-700 bg-gray-900 px-3 text-sm text-gray-100 shadow-sm transition-all placeholder:text-gray-500 focus:border-blue-500 outline-none disabled:opacity-50 disabled:cursor-not-allowed",
        "file:border-0 file:bg-transparent file:text-gray-300 file:font-medium file:cursor-pointer hover:file:text-green-300",
        className
      )}
      {...props}
    />
  )
}

export { Input }
