"use client";

import { useRef, useEffect, useState } from "react";

interface NewsTickerProps {
  items: string[];
}

// Pixels per second — same on every screen size, so perceived speed is consistent
const SPEED_PX_PER_S = 100;

export function NewsTicker({ items }: NewsTickerProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState("60s");

  useEffect(() => {
    function update() {
      if (!trackRef.current) return;
      // The animation scrolls -50% of the track's full width
      const dist = trackRef.current.scrollWidth / 2;
      setDuration(`${(dist / SPEED_PX_PER_S).toFixed(1)}s`);
    }

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [items]);

  if (items.length === 0) return null;

  const repeated = [...items, ...items];

  return (
    <div style={{ width: "100%" }}>
      <div
        ref={trackRef}
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
