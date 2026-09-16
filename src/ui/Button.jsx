import { Slot } from "@radix-ui/react-slot";

export function Button({
  variant = "default",
  size = "default",
  asChild = false,
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    default: "bg-brand text-white shadow hover:bg-brand/90",
    outline: "border border-border bg-transparent hover:bg-accent",
    ghost: "hover:bg-accent",
    gradient: "bg-gradient-brand text-white shadow-lg hover:opacity-90",
  };

  const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 px-3 text-xs",
    lg: "h-11 px-8 text-base",
    icon: "h-9 w-9",
  };

  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
