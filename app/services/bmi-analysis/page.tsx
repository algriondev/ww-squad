"use client";
import { useRouter } from "next/navigation";
import { C, WA_URL } from "../../lib/constants";
import { useWindowSize } from "../../hooks/useWindowSize";

const metrics = [
  { label: "Muscle Mass", desc: "Track lean muscle gains over time to confirm your training is working." },
  { label: "Body Fat %", desc: "See exactly how much body fat you're carrying and how it changes." },
  { label: "Visceral Fat", desc: "Measure internal fat around organs — a key health marker beyond the scale." },
  { label: "Metabolic Age", desc: "Understand your body's biological age relative to your caloric needs." },
  { label: "Hydration Levels", desc: "Ensure you're properly hydrated for performance and recovery." },
];

export default function BMIAnalysisPage() {
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
            border: `1px solid ${C.primary}`,
            color: C.primary,
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
            color: C.primary,
            letterSpacing: ".2em",
            marginBottom: 12,
          }}
        >
          KNOW YOUR NUMBERS
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
          Body Composition Analysis
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
          Precise body composition testing so you can track real progress beyond
          the scale. Know your muscle mass, body fat percentage, and more — so
          your training decisions are based on data, not guesswork.
        </p>

        {/* Metrics */}
        <h2
          style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: isMobile ? 22 : 28,
            fontWeight: 900,
            color: C.white,
            marginBottom: 24,
          }}
        >
          What We Measure
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: 14,
            marginBottom: 56,
          }}
        >
          {metrics.map((m) => (
            <div
              key={m.label}
              style={{
                background: C.card,
                borderRadius: 14,
                padding: "28px 24px",
                border: `1px solid rgba(255,255,255,.06)`,
              }}
            >
              <h3
                style={{
                  fontFamily: "'Inter Tight',sans-serif",
                  fontSize: 15,
                  fontWeight: 800,
                  color: C.primary,
                  marginBottom: 8,
                  letterSpacing: ".04em",
                }}
              >
                {m.label}
              </h3>
              <p style={{ fontFamily: "'Tenor Sans',serif", fontSize: 14, color: "#d4d8e0", lineHeight: 1.7, margin: 0 }}>
                {m.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Why it matters */}
        <div
          style={{
            background: `rgba(179,102,204,.08)`,
            borderRadius: 16,
            padding: isMobile ? "32px 24px" : "40px 44px",
            border: `1px solid rgba(179,102,204,.2)`,
            marginBottom: 40,
          }}
        >
          <h3
            style={{
              fontFamily: "'Inter Tight',sans-serif",
              fontSize: 18,
              fontWeight: 800,
              color: C.white,
              marginBottom: 12,
            }}
          >
            Why go beyond the scale?
          </h3>
          <p style={{ fontFamily: "'Tenor Sans',serif", fontSize: 15, color: "#d4d8e0", lineHeight: 1.85, margin: 0 }}>
            Weight alone tells you almost nothing. Two people can weigh the same
            but have completely different body compositions. Our analysis gives
            you the full picture — muscle, fat, water, and more — so you can set
            meaningful targets and see real progress over time.
          </p>
        </div>

        {/* CTA */}
        <div
          style={{
            background: C.card,
            borderRadius: 16,
            padding: isMobile ? "36px 24px" : "44px 48px",
            border: `1px solid rgba(179,102,204,.25)`,
          }}
        >
          <h2
            style={{
              fontFamily: "'Inter Tight',sans-serif",
              fontSize: isMobile ? 20 : 26,
              fontWeight: 900,
              color: C.white,
              marginBottom: 12,
            }}
          >
            Book a Session
          </h2>
          <p style={{ fontFamily: "'Tenor Sans',serif", fontSize: 15, color: "#d4d8e0", lineHeight: 1.8, marginBottom: 28 }}>
            Available at an additional cost. Enquire at reception or contact us
            directly to book a convenient time.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="mailto:signup@workoutwarehouse.co.ke" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: C.primary,
                  border: "none",
                  color: C.bg,
                  padding: "14px 36px",
                  borderRadius: 50,
                  cursor: "pointer",
                  fontFamily: "'Inter Tight',sans-serif",
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: ".12em",
                  boxShadow: `0 6px 30px rgba(179,102,204,0.45)`,
                }}
              >
                EMAIL US
              </button>
            </a>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: "none",
                  border: `1px solid #25c366`,
                  color: "#25c366",
                  padding: "14px 36px",
                  borderRadius: 50,
                  cursor: "pointer",
                  fontFamily: "'Inter Tight',sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: ".12em",
                }}
              >
                WHATSAPP
              </button>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
