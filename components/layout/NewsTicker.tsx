"use client";

import { useRef, useEffect } from "react";

interface NewsTickerProps {
  items: string[];
}

const PX_PER_SECOND = 200;

export function NewsTicker({ items }: NewsTickerProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof track.animate !== "function") return;

    // scrollWidth ignores overflow clipping, giving the true rendered width of
    // all children. Half of that is exactly one set of items — the correct
    // distance to translate for a seamless loop.
    const oneSetWidth = track.scrollWidth / 2;
    const duration = (oneSetWidth / PX_PER_SECOND) * 1000; // ms

    track.animate(
      [
        { transform: "translate3d(0, 0, 0)" },
        { transform: `translate3d(-${oneSetWidth}px, 0, 0)` },
      ],
      { duration, iterations: Infinity, easing: "linear" }
    );
  }, []);

  if (items.length === 0) return null;

  const repeated = [...items, ...items];

  return (
    <div className="w-full overflow-hidden py-3" style={{ backgroundColor: "#4a9960" }}>
      <div ref={trackRef} className="inline-flex">
        {repeated.map((text, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 text-base font-bold flex-shrink-0"
            style={{ fontFamily: "var(--font-montserrat)", paddingLeft: "3rem", paddingRight: "3rem", color: "#ffcd00" }}
          >
            <span className="text-white/60 mr-2">•</span>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
