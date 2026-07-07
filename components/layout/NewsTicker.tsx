interface NewsTickerProps {
  items: string[];
}

export function NewsTicker({ items }: NewsTickerProps) {
  if (items.length === 0) return null;

  const repeated = [...items, ...items];

  const totalChars = items.reduce((n, s) => n + s.length, 0);
  const duration = `${Math.round((totalChars * 7) / 180)}s`;

  return (
    <div style={{ width: "100%" }}>
      <div
        className="nm-ticker-track"
        style={{ animationDuration: duration, WebkitAnimationDuration: duration }}
      >
        {repeated.map((text, i) => (
          <span key={i} className="nm-ticker-item">
            <span className="nm-ticker-bullet">•</span>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
