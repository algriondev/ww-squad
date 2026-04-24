"use client";
import { useRouter } from "next/navigation";
import { C } from "../../lib/constants";
import { useWindowSize } from "../../hooks/useWindowSize";
import Link from "next/link";

const classes = [
  { name: "Spin", desc: "High-energy cycling sessions in our fully equipped spin studio.", zone: "Sweat" },
  { name: "HIIT", desc: "High-intensity interval training to maximise calorie burn and conditioning.", zone: "Sweat" },
  { name: "Strength", desc: "Technique-focused strength sessions on Olympic platforms and power racks.", zone: "Strength" },
  { name: "Functional Training", desc: "Movement-pattern based workouts for real-world fitness.", zone: "Strength" },
  { name: "Yoga & Flow", desc: "Vinyasa, yin, and restorative yoga to build flexibility and calm.", zone: "Zen" },
  { name: "Mobility & Recovery", desc: "Guided stretch, foam rolling, and active recovery work.", zone: "Recovery" },
  { name: "Bootcamp", desc: "Full-body conditioning combining cardio and resistance drills.", zone: "Sweat" },
];

const zoneColors: Record<string, string> = {
  Sweat: C.orange,
  Strength: C.red,
  Zen: C.blue,
  Recovery: C.ice,
};

export default function GroupClassesPage() {
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
          INCLUDED IN MEMBERSHIP
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
          Group Classes
        </h1>

        <p
          style={{
            fontFamily: "'Tenor Sans',serif",
            fontSize: 18,
            color: C.white,
            lineHeight: 1.8,
            maxWidth: 620,
            marginBottom: 56,
          }}
        >
          5–8 classes run every day across our training zones — all included in
          your membership at no extra cost. Find a style that suits you and show
          up.
        </p>

        {/* Classes grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: 16,
            marginBottom: 56,
          }}
        >
          {classes.map((cls) => (
            <div
              key={cls.name}
              style={{
                background: C.card,
                borderRadius: 14,
                padding: "28px 28px",
                border: `1px solid rgba(255,255,255,.06)`,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h3
                  style={{
                    fontFamily: "'Inter Tight',sans-serif",
                    fontSize: 18,
                    fontWeight: 800,
                    color: C.white,
                    margin: 0,
                  }}
                >
                  {cls.name}
                </h3>
                <span
                  style={{
                    fontFamily: "'Inter Tight',sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    color: zoneColors[cls.zone],
                    letterSpacing: ".15em",
                    padding: "4px 12px",
                    borderRadius: 20,
                    background: `${zoneColors[cls.zone]}18`,
                    border: `1px solid ${zoneColors[cls.zone]}40`,
                  }}
                >
                  {cls.zone.toUpperCase()}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'Tenor Sans',serif",
                  fontSize: 14,
                  color: "#d4d8e0",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {cls.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            background: C.card,
            borderRadius: 16,
            padding: isMobile ? "32px 24px" : "44px 48px",
            border: `1px solid rgba(179,102,204,.2)`,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Inter Tight',sans-serif",
                fontSize: 20,
                fontWeight: 800,
                color: C.white,
                marginBottom: 8,
              }}
            >
              Ready to join?
            </p>
            <p style={{ fontFamily: "'Tenor Sans',serif", fontSize: 15, color: "#d4d8e0", margin: 0 }}>
              All classes included with any membership plan.
            </p>
          </div>
          <Link href="/#join">
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
                letterSpacing: ".15em",
                boxShadow: `0 6px 30px rgba(179,102,204,0.45)`,
                whiteSpace: "nowrap",
              }}
            >
              GET MEMBERSHIP
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
