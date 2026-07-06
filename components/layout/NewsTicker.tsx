"use client";

import { useRef, useEffect } from "react";

interface NewsTickerProps {
  items: string[];
}

// Target scroll speed in pixels per second — tuned for readability on mobile.
const PX_PER_SECOND = 200;

export function NewsTicker({ items }: NewsTickerProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // scrollWidth gives the true rendered width of all children, bypassing any
    // overflow clipping the parent applies. Dividing by 2 gives one set's width
    // since we doubled the items for the seamless loop.
    const oneSetWidth = track.scrollWidth / 2;
    const duration = +(oneSetWidth / PX_PER_SECOND).toFixed(2);
    track.style.setProperty("--ticker-translate", `-${oneSetWidth}px`);
    track.style.setProperty("--ticker-duration", `${duration}s`);
    track.style.animationPlayState = "running";
  }, []);

  if (items.length === 0) return null;

  const repeated = [...items, ...items];

  return (
    <div className="w-full overflow-hidden py-3" style={{ backgroundColor: "#4a9960" }}>
      <div ref={trackRef} className="inline-flex animate-ticker">
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
