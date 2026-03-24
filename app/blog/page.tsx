"use client";
import { useRouter } from "next/navigation";
import { C } from "../lib/constants";

export default function BlogPage() {
  const router = useRouter();
  
  return (
    <main style={{ background: C.bg, minHeight: "100vh", paddingTop: 100, padding: "100px 40px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
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
          Blog
        </h1>

        <p style={{
          fontFamily: "'Tenor Sans',serif",
          fontSize: 18,
          color: C.slateL,
          marginBottom: 40,
        }}>
          Fitness tips, training guides, and squad stories coming soon.
        </p>

        <p style={{
          fontFamily: "'Tenor Sans',serif",
          fontSize: 14,
          color: C.slate,
        }}>
          Follow us on social media for daily content and updates!
        </p>
      </div>
    </main>
  );
}