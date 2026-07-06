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
    if (!track) return;

    // Wait one frame so the browser has completed layout and scrollWidth is accurate.
    const setup = requestAnimationFrame(() => {
      const oneSetWidth = track.scrollWidth / 2;
      if (oneSetWidth <= 0) return;

      let position = 0;
      let lastTs = performance.now();
      let raf: number;

      const tick = (now: number) => {
        position += (PX_PER_SECOND * (now - lastTs)) / 1000;
        lastTs = now;
        if (position >= oneSetWidth) position -= oneSetWidth;
        track.style.transform = `translate3d(-${position}px, 0, 0)`;
        raf = requestAnimationFrame(tick);
      };

      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    });

    return () => cancelAnimationFrame(setup);
  }, []);

  if (items.length === 0) return null;

  const repeated = [...items, ...items];

  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#4a9960",
        paddingTop: "12px",
        paddingBottom: "12px",
        transform: "translateZ(0)",
      }}
    >
      <div
        ref={trackRef}
        style={{ display: "inline-flex" }}
      >
        {repeated.map((text, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "1rem",
              fontWeight: 700,
              flexShrink: 0,
              whiteSpace: "nowrap",
              fontFamily: "var(--font-montserrat)",
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
