interface NewsTickerProps {
  items: string[];
}

export function NewsTicker({ items }: NewsTickerProps) {
  if (items.length === 0) return null;

  const repeated = [...items, ...items];

  // Estimate pixel width from character count (~7px per char at 16px Montserrat)
  // and target ~250px/s scroll speed to set duration proportionally.
  const totalChars = items.reduce((n, s) => n + s.length, 0);
  const estimatedWidth = totalChars * 7; // px for one set of items
  const duration = Math.round(estimatedWidth / 250); // seconds

  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#4a9960",
        paddingTop: "12px",
        paddingBottom: "12px",
      }}
    >
      {/* Inline style avoids CSS variable / custom-property bugs in production */}
      <style>{`
        @-webkit-keyframes nm-ticker {
          from { -webkit-transform: translateX(0); transform: translateX(0); }
          to   { -webkit-transform: translateX(-50%); transform: translateX(-50%); }
        }
        @keyframes nm-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .nm-ticker-track {
          display: inline-flex;
          min-width: -webkit-max-content;
          min-width: max-content;
          -webkit-animation: nm-ticker ${duration}s linear infinite;
          animation: nm-ticker ${duration}s linear infinite;
        }
      `}</style>
      <div className="nm-ticker-track">
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
