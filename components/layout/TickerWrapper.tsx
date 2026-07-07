import { getTickerItems } from "@/lib/data";
import { NewsTicker } from "./NewsTicker";

export function TickerWrapper() {
  const items = getTickerItems();
  if (items.length === 0) return null;

  return (
    <div
      style={{
        backgroundColor: "#4a9960",
        paddingTop: "12px",
        paddingBottom: "12px",
        // clip-path on the same element as the background ensures the green is always
        // visible AND the animated child is properly clipped — no parent/child
        // compositing layer separation.
        clipPath: "inset(0)",
        WebkitClipPath: "inset(0)",
      }}
    >
      <NewsTicker items={items} />
    </div>
  );
}
