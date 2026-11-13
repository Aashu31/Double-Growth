import { ImageResponse } from "next/og";

export const alt = "Double Growth — Build Digital. Grow Business.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #050D1A 0%, #081A33 55%, #0D2547 100%)",
          padding: "72px 80px",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "#0F2A4E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
              color: "#2F6BFF",
            }}
          >
            DG
          </div>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.72)",
            }}
          >
            Double Growth
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            <span>Build Digital.</span>
            <span>Grow Business.</span>
          </div>
          <div
            style={{
              fontSize: 26,
              color: "rgba(255,255,255,0.6)",
              maxWidth: 820,
              lineHeight: 1.4,
            }}
          >
            Websites, e-commerce, custom applications and practical automation
            for businesses in India and worldwide.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, fontSize: 18, color: "rgba(255,255,255,0.5)" }}>
          <span>doublegrowth.in</span>
          <span>·</span>
          <span>Digital agency and platform</span>
        </div>
      </div>
    ),
    size,
  );
}
