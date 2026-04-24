"use client";
import { useRouter } from "next/navigation";
import { C } from "../lib/constants";
import { useWindowSize } from "../hooks/useWindowSize";
import Link from "next/link";

const faqs = [
  {
    q: "What's included in my membership?",
    a: "Full access to our gym floor, multiple training zones, 5–8 daily studio classes, and showers & steam rooms.",
  },
  {
    q: "Are classes included in the membership?",
    a: "Yes — all classes, including spin, strength, HIIT, and functional training, are included at no extra charge.",
  },
  {
    q: "What types of membership plans do you offer?",
    a: "We offer flexible options to suit your lifestyle: Day Pass, Monthly, Quarterly (3 Months), and Annual memberships.",
  },
  {
    q: "What recovery services do you offer?",
    a: "Cold Plunge Recovery, Sports Massage, Physiotherapy, and Body Composition Analysis are available at an additional cost.",
  },
  {
    q: "Is Workout Warehouse suitable for beginners?",
    a: "Absolutely. All classes and training zones cater to beginners, intermediate, and advanced fitness levels. Our trainers and instructors are experienced in welcoming first-timers and helping them feel at home.",
  },
  {
    q: "What should I bring on my first visit?",
    a: "Just bring gym wear, a water bottle, and a towel. Everything else is already here.",
  },
  {
    q: "Where are you located?",
    a: "Highway Mall, opposite Nyayo Stadium, Nairobi — 15,000 sq ft across two floors.",
  },
  {
    q: "How do I get in touch?",
    a: "Email us at signup@workoutwarehouse.co.ke, reach us on WhatsApp at +254 759 983 995, or visit us at the front desk during opening hours.",
  },
];

export default function FAQPage() {
  const router = useRouter();
  const { w } = useWindowSize();
  const isMobile = w < 768;

  return (
    <main style={{ minHeight: "100vh", background: C.bg, color: C.white }}>
      <section
        style={{
          padding: isMobile ? "100px 20px 60px" : "120px 64px 80px",
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
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
            marginBottom: 48,
            display: "block",
          }}
        >
          ← BACK
        </button>

        <h1
          style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: isMobile ? 28 : 36,
            fontWeight: 900,
            textAlign: "center",
            marginBottom: isMobile ? 40 : 56,
            color: C.white,
          }}
        >
          Frequently Asked Questions
        </h1>

        <dl>
          {faqs.map((item, i) => (
            <div
              key={i}
              style={{
                marginBottom: isMobile ? 28 : 36,
                paddingBottom: isMobile ? 28 : 36,
                borderBottom: i < faqs.length - 1 ? "1px solid rgba(255,255,255,.06)" : "none",
              }}
            >
              <dt
                style={{
                  fontFamily: "'Inter Tight',sans-serif",
                  fontSize: isMobile ? 16 : 18,
                  fontWeight: 700,
                  color: C.white,
                  marginBottom: 8,
                }}
              >
                {item.q}
              </dt>
              <dd
                style={{
                  fontFamily: "'Inter Tight',sans-serif",
                  fontSize: isMobile ? 14 : 16,
                  color: "#d4d8e0",
                  margin: 0,
                  lineHeight: 1.7,
                }}
              >
                {item.a}
              </dd>
            </div>
          ))}
        </dl>

        <div style={{ textAlign: "center", marginTop: isMobile ? 40 : 56 }}>
          <p
            style={{
              fontFamily: "'Inter Tight',sans-serif",
              fontSize: 15,
              color: C.slateL,
              marginBottom: 20,
            }}
          >
            Still have questions?
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
