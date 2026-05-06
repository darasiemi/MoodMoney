interface TagProps {
  label: string;
  variant?: "default" | "outline" | "gold";
}

export function Tag({ label, variant = "default" }: TagProps) {
  if (variant === "gold") {
    return (
      <span className="inline-block px-2 py-0.5 text-xs bg-ucd-gold text-ucd-navy-900 font-medium rounded-full">
        {label}
      </span>
    );
  }
  if (variant === "outline") {
    return (
      <span className="inline-block px-2 py-0.5 text-xs border border-ucd-green-100 text-ucd-green dark:border-ucd-green/30 dark:text-ucd-green-100 rounded-full">
        {label}
      </span>
    );
  }
  return (
    <span className="inline-block px-2 py-0.5 text-xs bg-ucd-green-50 text-ucd-green dark:bg-ucd-green-100/10 dark:text-ucd-green-100 rounded-full">
      {label}
    </span>
  );
}
