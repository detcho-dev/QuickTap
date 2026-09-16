export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`flex min-h-[100px] w-full rounded-md border border-border bg-secondary/40 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}
