"use client";
import { useRouter } from "next/navigation";
import { C, WA_URL } from "../../lib/constants";
import { useWindowSize } from "../../hooks/useWindowSize";
import Link from "next/link";

const features = [
  {
    title: "One-on-One Sessions",
    desc: "Train exclusively with a certified personal trainer — no distractions, full focus on you.",
  },
  {
    title: "Custom Programme Design",
    desc: "Periodised training plans built around your body, your schedule, and your ambitions.",
  },
  {
    title: "Nutritional Guidance",
    desc: "Lifestyle and nutritional coaching to support your goals inside and outside the gym.",
  },
  {
    title: "Progress Tracking",
    desc: "Regular assessments and check-ins so you can see — and feel — the difference.",
  },
];

export default function PersonalTrainingPage() {
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
          TRAIN WITH A PRO
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
          Personal Training
        </h1>

        <p
          style={{
            fontFamily: "'Tenor Sans',serif",
            fontSize: 18,
            color: C.white,
            lineHeight: 1.8,
            maxWidth: 660,
            marginBottom: 60,
          }}
        >
          Our certified personal trainers are among the most experienced in
          Nairobi. Whether the goal is a first fitness milestone or competing at
          a high level, our trainers design programmes built entirely around the
          individual — their body, their schedule, their ambitions.
        </p>

        {/* Feature cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: 16,
            marginBottom: 56,
          }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                background: C.card,
                borderRadius: 14,
                padding: "32px 28px",
                border: `1px solid rgba(255,255,255,.06)`,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: C.primary,
                  boxShadow: `0 0 12px ${C.primary}`,
                  marginBottom: 18,
                }}
              />
              <h3
                style={{
                  fontFamily: "'Inter Tight',sans-serif",
                  fontSize: 17,
                  fontWeight: 800,
                  color: C.white,
                  marginBottom: 10,
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Tenor Sans',serif",
                  fontSize: 14,
                  color: "#d4d8e0",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {f.desc}
              </p>
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
              fontSize: isMobile ? 22 : 30,
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
            Sessions are available individually or in packages. Enquire at the
            front desk or via email for current rates and trainer availability.
          </p>

          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <a
              href="mailto:signup@workoutwarehouse.co.ke"
              style={{ textDecoration: "none" }}
            >
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

        <p
          style={{
            fontFamily: "'Tenor Sans',serif",
            fontSize: 14,
            color: C.slate,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Or{" "}
          <Link href="/coaches" style={{ color: C.primary, textDecoration: "none" }}>
            browse our coaches
          </Link>{" "}
          to find the right trainer for you.
        </p>
      </div>
    </main>
  );
}
