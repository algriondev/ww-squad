"use client";
import { useRouter } from "next/navigation";
import { C } from "../lib/constants";
import Link from "next/link";

export default function HelpPage() {
  const router = useRouter();
  
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
          Help Center
        </h1>

        <div style={{
          fontFamily: "'Tenor Sans',serif",
          fontSize: 16,
          color: C.slateL,
          lineHeight: 1.8,
        }}>
          <h2 style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: 24,
            fontWeight: 800,
            color: C.primary,
            marginTop: 40,
            marginBottom: 20,
          }}>
            How can we help you?
          </h2>

          <p style={{ marginBottom: 20 }}>
            Need assistance? We're here to help! Check our FAQ page or contact us directly:
          </p>

          <ul style={{
            listStyle: "none",
            padding: 0,
            marginBottom: 30,
          }}>
            <li style={{ marginBottom: 15, paddingLeft: 30, position: "relative" }}>
              <span style={{
                position: "absolute",
                left: 0,
                top: 8,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: C.primary,
                boxShadow: `0 0 10px ${C.primary}`,
              }} />
              <strong>WhatsApp:</strong> +254 759 983 995
            </li>
            <li style={{ marginBottom: 15, paddingLeft: 30, position: "relative" }}>
              <span style={{
                position: "absolute",
                left: 0,
                top: 8,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: C.primary,
                boxShadow: `0 0 10px ${C.primary}`,
              }} />
              <strong>Location:</strong> 1st Floor Highway Mall, Nairobi
            </li>
            <li style={{ marginBottom: 15, paddingLeft: 30, position: "relative" }}>
              <span style={{
                position: "absolute",
                left: 0,
                top: 8,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: C.primary,
                boxShadow: `0 0 10px ${C.primary}`,
              }} />
              <strong>Hours:</strong> Mon-Fri 5am-9:30pm, Sat 7am-5pm, Sun 7am-3pm
            </li>
          </ul>

          <div style={{ marginTop: 40 }}>
            <Link href="/faq">
              <button style={{
                background: C.primary,
                border: "none",
                color: C.bg,
                padding: "16px 40px",
                borderRadius: 50,
                cursor: "pointer",
                fontFamily: "'Inter Tight',sans-serif",
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: ".15em",
                marginRight: 15,
              }}>
                VIEW FAQ
              </button>
            </Link>
            <Link href="/contact">
              <button style={{
                background: "transparent",
                border: `1px solid ${C.primary}`,
                color: C.primary,
                padding: "16px 40px",
                borderRadius: 50,
                cursor: "pointer",
                fontFamily: "'Inter Tight',sans-serif",
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: ".15em",
              }}>
                CONTACT US
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}