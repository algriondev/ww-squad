"use client";
import { useRouter } from "next/navigation";
import { C, WA_URL } from "../../lib/constants";
import { coldPlungeRates } from "../../lib/pricing";
import { useWindowSize } from "../../hooks/useWindowSize";

const benefits = [
  "Therapeutic temperature maintained for maximum benefit",
  "Ideal post-training or on active recovery days",
  "Reduces DOMS and speeds up muscle repair",
  "Supports circulation, focus, and mental resilience",
  "Supervised sessions available for first-timers",
];

export default function ColdPlungePage() {
  const router = useRouter();
  const { w } = useWindowSize();
  const isMobile = w < 768;

  return (
    <main style={{ background: C.bg, minHeight: "100vh", paddingTop: 100 }}>
      <div
        style={{
          padding: isMobile ? "40px 20px" : "80px 64px",
          maxWidth: 960,
          margin: "0 auto",
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            background: "none",
            border: `1px solid ${C.ice}`,
            color: C.ice,
            padding: "10px 20px",
            borderRadius: 50,
            cursor: "pointer",
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: ".1em",
            marginBottom: 40,
          }}
        >
          ← BACK
        </button>

        <p
          style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: 11,
            fontWeight: 700,
            color: C.ice,
            letterSpacing: ".2em",
            marginBottom: 12,
          }}
        >
          COLD · SHARP · TRANSFORMATIVE
        </p>

        <h1
          style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: isMobile ? 40 : 60,
            fontWeight: 900,
            color: C.white,
            marginBottom: 20,
          }}
        >
          Cold Plunge Recovery
        </h1>

        <p
          style={{
            fontFamily: "'Tenor Sans',serif",
            fontSize: 18,
            color: C.white,
            lineHeight: 1.8,
            maxWidth: 660,
            marginBottom: 56,
          }}
        >
          Cold water immersion is one of the most evidence-backed recovery tools
          available. Our cold plunge facility is maintained at optimal therapeutic
          temperatures, reducing inflammation, accelerating muscle recovery, and
          resetting the nervous system after intense training.
        </p>

        {/* Benefits */}
        <h2
          style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: isMobile ? 22 : 28,
            fontWeight: 900,
            color: C.ice,
            marginBottom: 24,
          }}
        >
          Benefits
        </h2>

        <ul style={{ listStyle: "none", padding: 0, marginBottom: 56 }}>
          {benefits.map((b, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
                marginBottom: 16,
                padding: "18px 20px",
                background: C.card,
                borderRadius: 10,
                border: `1px solid rgba(126,207,227,.12)`,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: C.ice,
                  boxShadow: `0 0 10px ${C.ice}`,
                  flexShrink: 0,
                  marginTop: 6,
                }}
              />
              <span style={{ fontFamily: "'Tenor Sans',serif", fontSize: 16, color: "#d4d8e0", lineHeight: 1.6 }}>
                {b}
              </span>
            </li>
          ))}
        </ul>

        {/* Pricing table */}
        <h2
          style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: isMobile ? 22 : 28,
            fontWeight: 900,
            color: C.white,
            marginBottom: 24,
          }}
        >
          Pricing
        </h2>

        <div
          style={{
            background: C.card,
            borderRadius: 16,
            border: `1px solid rgba(126,207,227,.2)`,
            overflow: "hidden",
            marginBottom: 40,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              padding: "14px 24px",
              background: "rgba(126,207,227,.08)",
              borderBottom: `1px solid rgba(126,207,227,.15)`,
            }}
          >
            {["Package", "Member", "Non-Member"].map((h) => (
              <span
                key={h}
                style={{
                  fontFamily: "'Inter Tight',sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  color: C.ice,
                  letterSpacing: ".18em",
                }}
              >
                {h.toUpperCase()}
              </span>
            ))}
          </div>

          {coldPlungeRates.map((row, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr",
                padding: "18px 24px",
                borderBottom: i < coldPlungeRates.length - 1 ? `1px solid rgba(255,255,255,.04)` : "none",
                alignItems: "center",
              }}
            >
              <span style={{ fontFamily: "'Tenor Sans',serif", fontSize: 15, color: C.white }}>
                {row.sessions}
              </span>
              <span style={{ fontFamily: "'Inter Tight',sans-serif", fontSize: 15, fontWeight: 700, color: C.ice }}>
                KES {row.member}
              </span>
              <span style={{ fontFamily: "'Tenor Sans',serif", fontSize: 15, color: "#d4d8e0" }}>
                KES {row.nonMember}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <button
              style={{
                background: C.ice,
                border: "none",
                color: C.bg,
                padding: "14px 36px",
                borderRadius: 50,
                cursor: "pointer",
                fontFamily: "'Inter Tight',sans-serif",
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: ".12em",
              }}
            >
              BOOK VIA WHATSAPP
            </button>
          </a>
          <a href="mailto:signup@workoutwarehouse.co.ke" style={{ textDecoration: "none" }}>
            <button
              style={{
                background: "none",
                border: `1px solid ${C.ice}`,
                color: C.ice,
                padding: "14px 36px",
                borderRadius: 50,
                cursor: "pointer",
                fontFamily: "'Inter Tight',sans-serif",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: ".12em",
              }}
            >
              EMAIL US
            </button>
          </a>
        </div>

        <p
          style={{
            fontFamily: "'Tenor Sans',serif",
            fontSize: 13,
            color: C.slate,
            marginTop: 20,
          }}
        >
          Or ask at reception during your next visit.
        </p>
      </div>
    </main>
  );
}
