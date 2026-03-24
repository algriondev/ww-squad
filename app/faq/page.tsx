"use client";
import { useState } from "react";
import { C } from "../lib/constants";

export default function FAQPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "What are your opening hours?",
      a: null,
      bullets: [
        "Monday - Friday: 5:00 AM - 9:30 PM",
        "Saturday: 7:00 AM - 5:00 PM",
        "Sunday: 7:00 AM - 3:00 PM",
      ],
    },
    {
      q: "How do I sign up for membership?",
      a: "Visit our website or come to the gym to complete your membership application. We offer flexible monthly and annual plans.",
      bullets: null,
    },
    {
      q: "What classes are available?",
      a: null,
      bullets: [
        "Strength Training",
        "HIIT Workouts",
        "Yoga & Recovery",
        "Boxing",
        "Functional Fitness",
      ],
    },
    {
      q: "Can I get a refund?",
      a: "We offer a 14-day money-back guarantee for new members. Cancel anytime with 30 days notice.",
      bullets: null,
    },
  ];

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
            fontSize: 56,
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
            color: C.slateL,
            maxWidth: 600,
            margin: "0 auto",
          }}
        >
          Everything you need to know about Workout Warehouse
        </p>
      </section>

      {/* FAQs */}
      <section
        style={{ maxWidth: 800, margin: "0 auto", padding: "60px 20px" }}
      >
        {faqs.map((faq, i) => (
          <div
            key={i}
            style={{
              marginBottom: 24,
              borderBottom: `1px solid rgba(255,255,255,.05)`,
              paddingBottom: 20,
            }}
          >
            <button
              onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              style={{
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                padding: "12px 0",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: C.white,
              }}
            >
              <h3
                style={{
                  fontFamily: "'Inter Tight',sans-serif",
                  fontSize: 18,
                  fontWeight: 600,
                  color: C.white,
                  margin: 0,
                }}
              >
                {faq.q}
              </h3>
              <span style={{ color: C.primary, fontSize: 20 }}>
                {expandedIndex === i ? "−" : "+"}
              </span>
            </button>

            {expandedIndex === i && (
              <div style={{ paddingTop: 12 }}>
                {faq.a && (
                  <p
                    style={{
                      fontFamily: "'Tenor Sans',serif",
                      fontSize: 16,
                      color: C.slateL,
                      lineHeight: 1.8,
                      marginBottom: faq.bullets ? 16 : 0,
                    }}
                  >
                    {faq.a}
                  </p>
                )}

                {faq.bullets && (
                  <ul
                    style={{
                      fontFamily: "'Tenor Sans',serif",
                      fontSize: 16,
                      color: C.slateL,
                      lineHeight: 2,
                      paddingLeft: 0,
                      listStyle: "none",
                    }}
                  >
                    {faq.bullets.map((bullet, j) => (
                      <li
                        key={j}
                        style={{
                          position: "relative",
                          paddingLeft: 24,
                          marginBottom: 8,
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: 0,
                            top: 10,
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
      </section>
    </main>
  );
}
