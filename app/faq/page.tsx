"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { C } from "../lib/constants";
import { useWindowSize } from "../hooks/useWindowSize";
import Link from "next/link";

const faqs = [
  {
    q: "What's included in my membership?",
    a: "Full access to our gym floor, multiple training zones, 5–8 daily studio classes, and showers & steam rooms.",
    bullets: null,
  },
  {
    q: "Are classes included in the membership?",
    a: "Yes — all classes, including spin, strength, HIIT, and functional training, are included at no extra charge.",
    bullets: null,
  },
  {
    q: "What types of membership plans do you offer?",
    a: "We offer flexible options to suit your lifestyle:",
    bullets: ["Day Pass", "Monthly", "Quarterly (3 Months)", "Annual"],
  },
  {
    q: "What recovery services do you offer?",
    a: "The following are available at an additional cost:",
    bullets: [
      "Cold Plunge Recovery",
      "Sports Massage",
      "Physiotherapy",
      "Body Composition Analysis",
    ],
  },
  {
    q: "Is Workout Warehouse suitable for beginners?",
    a: "Absolutely. All classes and training zones cater to beginners, intermediate, and advanced fitness levels. Our trainers and class instructors are experienced in welcoming first-timers and helping them feel at home.",
    bullets: null,
  },
  {
    q: "What should I bring on my first visit?",
    a: "Just bring gym wear, a water bottle, and a towel. Everything else is already here.",
    bullets: null,
  },
  {
    q: "Where are you located?",
    a: "We're at Highway Mall, opposite Nyayo Stadium, Nairobi — 15,000 sq ft across two floors.",
    bullets: null,
  },
  {
    q: "How do I get in touch?",
    a: null,
    bullets: [
      "Email: signup@workoutwarehouse.co.ke",
      "WhatsApp: +254 759 983 995",
      "Or visit us at the front desk during opening hours",
    ],
  },
];

export default function FAQPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const router = useRouter();
  const { w } = useWindowSize();
  const isMobile = w < 768;

  return (
    <main style={{ minHeight: "100vh", background: C.bg, color: C.white }}>
      {/* Hero */}
      <section
        style={{
          padding: "120px 20px 80px",
          textAlign: "center",
          borderBottom: `1px solid rgba(255,255,255,.05)`,
        }}
      >
        <h1
          style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: isMobile ? 40 : 56,
            fontWeight: 900,
            marginBottom: 16,
            color: C.white,
          }}
        >
          Frequently Asked Questions
        </h1>
        <p
          style={{
            fontFamily: "'Tenor Sans',serif",
            fontSize: 18,
            color: C.white,
            maxWidth: 600,
            margin: "0 auto 32px",
          }}
        >
          Everything you need to know about Workout Warehouse
        </p>
        <button
          onClick={() => router.back()}
          style={{
            background: "none",
            border: `1px solid ${C.primary}`,
            color: C.primary,
            padding: "10px 24px",
            borderRadius: 50,
            cursor: "pointer",
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: ".1em",
          }}
        >
          ← BACK
        </button>
      </section>

      {/* FAQs */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "60px 20px" }}>
        {faqs.map((faq, i) => (
          <div
            key={i}
            style={{
              marginBottom: 8,
              border: `1px solid ${expandedIndex === i ? "rgba(179,102,204,.3)" : "rgba(255,255,255,.06)"}`,
              borderRadius: 12,
              background: expandedIndex === i ? C.card : "transparent",
              transition: "all .2s",
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              style={{
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                padding: "20px 24px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
              }}
            >
              <h3
                style={{
                  fontFamily: "'Inter Tight',sans-serif",
                  fontSize: isMobile ? 15 : 17,
                  fontWeight: 700,
                  color: C.white,
                  margin: 0,
                }}
              >
                {faq.q}
              </h3>
              <span
                style={{
                  color: C.primary,
                  fontSize: 22,
                  fontWeight: 300,
                  flexShrink: 0,
                  transition: "transform .2s",
                  transform: expandedIndex === i ? "rotate(45deg)" : "none",
                }}
              >
                +
              </span>
            </button>

            {expandedIndex === i && (
              <div style={{ padding: "0 24px 24px" }}>
                {faq.a && (
                  <p
                    style={{
                      fontFamily: "'Tenor Sans',serif",
                      fontSize: 16,
                      color: "#d4d8e0",
                      lineHeight: 1.8,
                      marginBottom: faq.bullets ? 16 : 0,
                    }}
                  >
                    {faq.a}
                  </p>
                )}

                {faq.bullets && (
                  <ul style={{ fontFamily: "'Tenor Sans',serif", fontSize: 16, color: "#d4d8e0", lineHeight: 2, paddingLeft: 0, listStyle: "none" }}>
                    {faq.bullets.map((bullet, j) => (
                      <li key={j} style={{ position: "relative", paddingLeft: 24, marginBottom: 6 }}>
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            top: 11,
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: C.primary,
                            boxShadow: `0 0 8px ${C.primary}`,
                          }}
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Still have questions */}
        <div
          style={{
            marginTop: 56,
            textAlign: "center",
            padding: "40px 24px",
            background: C.card,
            borderRadius: 16,
            border: `1px solid rgba(179,102,204,.15)`,
          }}
        >
          <p
            style={{
              fontFamily: "'Inter Tight',sans-serif",
              fontSize: 22,
              fontWeight: 800,
              color: C.white,
              marginBottom: 10,
            }}
          >
            Still have questions?
          </p>
          <p
            style={{
              fontFamily: "'Tenor Sans',serif",
              fontSize: 15,
              color: C.slateL,
              marginBottom: 28,
            }}
          >
            Our team is happy to help — reach out any time.
          </p>
          <Link href="/contact">
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
              }}
            >
              CONTACT US
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
