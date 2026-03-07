"use client";
import { useRouter } from "next/navigation";
import { C } from "../lib/constants";
import Link from "next/link";

export default function CareersPage() {
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
          Careers
        </h1>

        <p style={{
          fontFamily: "'Tenor Sans',serif",
          fontSize: 18,
          color: C.slateL,
          lineHeight: 1.8,
          marginBottom: 40,
        }}>
          Join the Workout Warehouse team. Opportunities coming soon.
        </p>

        <Link href="/#contact">
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
            boxShadow: `0 6px 30px ${C.primaryGlow}`,
          }}>
            CONTACT US
          </button>
        </Link>
      </div>
    </main>
  );
}