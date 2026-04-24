"use client";
import { useRouter } from "next/navigation";
import { C } from "../lib/constants";
import { useWindowSize } from "../hooks/useWindowSize";

export default function CareersPage() {
  const router = useRouter();
  const { w } = useWindowSize();
  const isMobile = w < 768;

  const roles = [
    "Personal Trainer / Strength Coach",
    "Group Fitness Instructor",
    "Spin Instructor",
    "Yoga / Wellness Coach",
    "Sports Massage Therapist",
    "Physiotherapist",
    "Front Desk / Member Experience",
  ];

  return (
    <main
      style={{
        background: C.bg,
        minHeight: "100vh",
        paddingTop: 100,
      }}
    >
      <div
        style={{
          padding: isMobile ? "40px 20px" : "80px 64px",
          maxWidth: 900,
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

        <h1
          style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: isMobile ? 40 : 64,
            fontWeight: 900,
            color: C.white,
            marginBottom: 20,
          }}
        >
          Join Our Team
        </h1>

        <p
          style={{
            fontFamily: "'Tenor Sans',serif",
            fontSize: 18,
            color: C.white,
            lineHeight: 1.8,
            maxWidth: 680,
            marginBottom: 56,
          }}
        >
          We are always looking for passionate, experienced fitness professionals
          to join the Workout Warehouse team. If you believe in what we're
          building and want to be part of Nairobi's leading training facility,
          we want to hear from you.
        </p>

        {/* Roles */}
        <h2
          style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: isMobile ? 22 : 28,
            fontWeight: 900,
            color: C.primary,
            marginBottom: 24,
          }}
        >
          Areas We Hire In
        </h2>

        <ul style={{ listStyle: "none", padding: 0, marginBottom: 56 }}>
          {roles.map((role, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px 20px",
                marginBottom: 10,
                background: C.card,
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,.05)",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: C.primary,
                  boxShadow: `0 0 10px ${C.primary}`,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'Tenor Sans',serif",
                  fontSize: 16,
                  color: C.white,
                }}
              >
                {role}
              </span>
            </li>
          ))}
        </ul>

        {/* How to apply */}
        <div
          style={{
            background: C.card,
            border: `1px solid rgba(179,102,204,.25)`,
            borderRadius: 16,
            padding: isMobile ? "32px 24px" : "44px 48px",
          }}
        >
          <h2
            style={{
              fontFamily: "'Inter Tight',sans-serif",
              fontSize: isMobile ? 22 : 28,
              fontWeight: 900,
              color: C.white,
              marginBottom: 16,
            }}
          >
            How to Apply
          </h2>

          <p
            style={{
              fontFamily: "'Tenor Sans',serif",
              fontSize: 16,
              color: C.white,
              lineHeight: 1.85,
              marginBottom: 28,
            }}
          >
            Send your CV and a brief note about the role you're interested in.
            We review all applications and will be in touch if there's a fit.
          </p>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              background: "rgba(179,102,204,.1)",
              border: `1px solid rgba(179,102,204,.3)`,
              borderRadius: 50,
              padding: "14px 28px",
            }}
          >
            <span style={{ fontSize: 18 }}>✉</span>
            <a
              href="mailto:signup@workoutwarehouse.co.ke"
              style={{
                fontFamily: "'Inter Tight',sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: C.primary,
                textDecoration: "none",
                letterSpacing: ".05em",
              }}
            >
              signup@workoutwarehouse.co.ke
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
