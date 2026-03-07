"use client";
import { useRouter } from "next/navigation";
import { C } from "../lib/constants";

export default function FAQPage() {
  const router = useRouter();
  
  const faqs = [
    {
      q: "What are your operating hours?",
      a: "We're open 24/7 for members with access cards. Staffed hours are 5:00 AM - 10:00 PM daily."
    },
    {
      q: "Do you offer day passes?",
      a: "Yes! Day passes are KSh 1,000 and give you full access to all zones and equipment."
    },
    {
      q: "Can I freeze my membership?",
      a: "Yes, you can freeze your membership for up to 3 months per year with no additional fees."
    },
    {
      q: "Do I need to book classes?",
      a: "We recommend booking popular classes in advance through our app, but walk-ins are welcome if space is available."
    },
  ];

  return (
    <main style={{ background: C.bg, minHeight: "100vh", paddingTop: 100, padding: "100px 40px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
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

        <h1 style={{
          fontFamily: "'Inter Tight',sans-serif",
          fontSize: 64,
          fontWeight: 900,
          color: C.white,
          marginBottom: 30,
        }}>
          FAQ
        </h1>

        <div>
          {faqs.map((faq, i) => (
            <div key={i} style={{
              marginBottom: 40,
              paddingBottom: 40,
              borderBottom: i < faqs.length - 1 ? "1px solid rgba(255,255,255,.06)" : "none",
            }}>
              <h3 style={{
                fontFamily: "'Inter Tight',sans-serif",
                fontSize: 20,
                fontWeight: 800,
                color: C.primary,
                marginBottom: 15,
              }}>
                {faq.q}
              </h3>
              <p style={{
                fontFamily: "'Tenor Sans',serif",
                fontSize: 16,
                color: C.slateL,
                lineHeight: 1.8,
              }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}