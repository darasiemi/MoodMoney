interface TagProps {
  label: string;
  variant?: "default" | "outline" | "gold";
}

export function Tag({ label, variant = "default" }: TagProps) {
  if (variant === "gold") {
    return (
      <span className="inline-block rounded-full bg-ucd-gold-100 px-2.5 py-1 text-xs font-medium text-ucd-navy-900">
        {label}
      </span>
    );
  }
  if (variant === "outline") {
    return (
      <span className="inline-block rounded-full border border-[color:var(--border)] px-2.5 py-1 text-xs font-medium text-[color:var(--muted)]">
        {label}
      </span>
    );
  }
  return (
    <span className="inline-block rounded-full bg-ucd-navy-50 px-2.5 py-1 text-xs font-medium text-ucd-navy dark:bg-[color:var(--surface-subtle)] dark:text-ucd-navy-200">
      {label}
    </span>
  );
}
