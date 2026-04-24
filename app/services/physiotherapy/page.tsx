"use client";
import { useRouter } from "next/navigation";
import { C, WA_URL } from "../../lib/constants";
import { useWindowSize } from "../../hooks/useWindowSize";

const services = [
  {
    title: "Sports Injury Assessment & Rehabilitation",
    desc: "Comprehensive assessment and structured rehab programmes to get you back training stronger.",
  },
  {
    title: "Remedial & Deep Tissue Massage",
    desc: "Targeted massage therapy to release tension, improve mobility, and speed up recovery.",
  },
  {
    title: "Mobility & Movement Screening",
    desc: "Identify limitations and imbalances before they become injuries.",
  },
  {
    title: "Pre- & Post-Competition Treatment",
    desc: "Tailored sessions to prepare your body before a big event and recover faster after.",
  },
  {
    title: "Chronic Pain & Postural Correction",
    desc: "Long-term programmes addressing persistent pain and postural dysfunction.",
  },
];

export default function PhysiotherapyPage() {
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
          EXPERT HANDS-ON CARE
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
          Physiotherapy &{" "}
          <span style={{ color: C.primary }}>Sports Massage</span>
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
          Our on-site physiotherapists and sports massage therapists provide
          clinical-grade treatment at the gym — no separate appointment, no
          separate commute. Whether you're managing an existing injury, preventing
          a new one, or simply maintaining peak physical condition, our team
          delivers results.
        </p>

        {/* Services list */}
        <h2
          style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: isMobile ? 22 : 28,
            fontWeight: 900,
            color: C.white,
            marginBottom: 24,
          }}
        >
          What We Offer
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 56 }}>
          {services.map((s) => (
            <div
              key={s.title}
              style={{
                background: C.card,
                borderRadius: 14,
                padding: "28px 28px",
                border: `1px solid rgba(255,255,255,.06)`,
                display: "flex",
                gap: 20,
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: C.primary,
                  boxShadow: `0 0 10px ${C.primary}`,
                  flexShrink: 0,
                  marginTop: 6,
                }}
              />
              <div>
                <h3
                  style={{
                    fontFamily: "'Inter Tight',sans-serif",
                    fontSize: 16,
                    fontWeight: 800,
                    color: C.white,
                    marginBottom: 8,
                  }}
                >
                  {s.title}
                </h3>
                <p style={{ fontFamily: "'Tenor Sans',serif", fontSize: 14, color: "#d4d8e0", lineHeight: 1.7, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing CTA */}
        <div
          style={{
            background: C.card,
            borderRadius: 16,
            padding: isMobile ? "36px 24px" : "48px 52px",
            border: `1px solid rgba(179,102,204,.25)`,
          }}
        >
          <h2
            style={{
              fontFamily: "'Inter Tight',sans-serif",
              fontSize: isMobile ? 22 : 28,
              fontWeight: 900,
              color: C.white,
              marginBottom: 14,
            }}
          >
            Pricing
          </h2>
          <p
            style={{
              fontFamily: "'Tenor Sans',serif",
              fontSize: 16,
              color: "#d4d8e0",
              lineHeight: 1.8,
              marginBottom: 32,
            }}
          >
            Sessional and package rates available. Book directly at the front
            desk or by emailing us in advance to secure your preferred
            appointment time.
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
                EMAIL TO BOOK
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
