interface NewsTickerProps {
  items: string[];
}

export function NewsTicker({ items }: NewsTickerProps) {
  if (items.length === 0) return null;

  const repeated = [...items, ...items];

  // Estimate pixel width (~7px per char at 16px Montserrat) and target 180px/s.
  // The result overrides the base 20s in globals.css via inline animation-duration.
  const totalChars = items.reduce((n, s) => n + s.length, 0);
  const duration = `${Math.round((totalChars * 7) / 180)}s`;

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#4a9960",
        paddingTop: "12px",
        paddingBottom: "12px",
        clipPath: "inset(0)",
        WebkitClipPath: "inset(0)",
      }}
    >
      <div
        className="nm-ticker-track"
        style={{
          animationDuration: duration,
          WebkitAnimationDuration: duration,
        }}
      >
        {repeated.map((text, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              flexShrink: 0,
              whiteSpace: "nowrap",
              fontFamily: "var(--font-montserrat)",
              fontSize: "1rem",
              fontWeight: 700,
              paddingLeft: "3rem",
              paddingRight: "3rem",
              color: "#ffcd00",
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.6)", marginRight: "0.5rem" }}>•</span>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
