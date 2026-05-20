"use client";

interface NewsTickerProps {
  items: string[];
}

export function NewsTicker({ items }: NewsTickerProps) {
  if (items.length === 0) return null;

  const repeated = [...items, ...items];

  return (
    <div className="w-full overflow-hidden py-3" style={{ backgroundColor: "#4a9960" }}>
      <div className="flex animate-ticker" style={{ width: "max-content" }}>
        {repeated.map((text, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 text-ucd-gold text-base font-bold flex-shrink-0"
            style={{ fontFamily: "var(--font-montserrat)", paddingLeft: "3rem", paddingRight: "3rem" }}
          >
            <span className="text-white/60 mr-2">•</span>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
