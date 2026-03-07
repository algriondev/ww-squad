"use client";
import { useRouter } from "next/navigation";
import { C } from "../lib/constants";

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>

        <div style={{
          fontFamily: "'Tenor Sans',serif",
          fontSize: 16,
          color: C.slateL,
          lineHeight: 1.8,
        }}>
          <p style={{ marginBottom: 25 }}>
            Last updated: March 7, 2026
          </p>
          
          <h2 style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: 24,
            fontWeight: 800,
            color: C.primary,
            marginTop: 40,
            marginBottom: 20,
          }}>
            Information We Collect
          </h2>
          <p style={{ marginBottom: 25 }}>
            We collect information you provide directly to us when you create an account, make a purchase, or communicate with us.
          </p>

          <h2 style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: 24,
            fontWeight: 800,
            color: C.primary,
            marginTop: 40,
            marginBottom: 20,
          }}>
            How We Use Your Information
          </h2>
          <p style={{ marginBottom: 25 }}>
            We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.
          </p>

          <h2 style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: 24,
            fontWeight: 800,
            color: C.primary,
            marginTop: 40,
            marginBottom: 20,
          }}>
            Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@workoutwarehouse.co.ke
          </p>
        </div>
      </div>
    </main>
  );
}