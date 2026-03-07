"use client";
import { useRouter } from "next/navigation";
import { C } from "../lib/constants";
import { useWindowSize } from "../hooks/useWindowSize";
import Link from "next/link";

export default function AboutPage() {
  const router = useRouter();
  const { w } = useWindowSize();
  const isMobile = w < 768;

  return (
    <main style={{ background: C.bg, minHeight: "100vh", paddingTop: 100 }}>
      <div style={{
        padding: isMobile ? "40px 20px" : "80px 64px",
        maxWidth: 900,
        margin: "0 auto",
      }}>
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
          fontSize: isMobile ? 42 : 64,
          fontWeight: 900,
          color: C.white,
          marginBottom: 30,
        }}>
          About Workout Warehouse
        </h1>

        <div style={{
          fontFamily: "'Tenor Sans',serif",
          fontSize: 18,
          color: C.slateL,
          lineHeight: 1.8,
        }}>
          <p style={{ marginBottom: 25 }}>
            Workout Warehouse is Nairobi's premier fitness destination, combining elite-level equipment, world-class coaching, and a tech-powered community experience. Located in Highway Mall, we've created a space where fitness meets luxury, intensity meets intelligence, and every member becomes part of something bigger.
          </p>

          <p style={{ marginBottom: 25 }}>
            Founded in 2023, our mission is simple: end the era of average gyms. We believe fitness should be accessible, results-driven, and obsessively member-focused. From our competition-grade equipment to our cutting-edge recovery suite, every detail is designed to help you achieve your goals faster and safer.
          </p>

          <h2 style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: 28,
            fontWeight: 900,
            color: C.primary,
            marginTop: 50,
            marginBottom: 20,
          }}>
            Our Philosophy
          </h2>

          <p style={{ marginBottom: 25 }}>
            We don't believe in one-size-fits-all fitness. Whether you're training for a powerlifting meet, seeking zen through yoga, building cardiovascular endurance, or optimizing recovery, we provide specialized zones and expert coaching for every goal.
          </p>

          <h2 style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: 28,
            fontWeight: 900,
            color: C.primary,
            marginTop: 50,
            marginBottom: 20,
          }}>
            What Sets Us Apart
          </h2>

          <ul style={{
            listStyle: "none",
            padding: 0,
            marginBottom: 25,
          }}>
            {[
              "Competition-grade equipment from Rogue, Eleiko, and Concept2",
              "World-class coaches with international certifications",
              "Dedicated training zones: Strength, Zen, Sweat, and Recovery",
              "State-of-the-art recovery suite with cold plunge and infrared sauna",
              "24/7 access for ultimate flexibility",
              "Member-first culture built on community and results",
            ].map((item, i) => (
              <li key={i} style={{
                marginBottom: 15,
                paddingLeft: 30,
                position: "relative",
              }}>
                <span style={{
                  position: "absolute",
                  left: 0,
                  top: 8,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: C.primary,
                  boxShadow: `0 0 10px ${C.primary}`,
                  display: "inline-block",
                }} />
                {item}
              </li>
            ))}
          </ul>

          <div style={{
            marginTop: 60,
            textAlign: "center",
          }}>
            <Link href="/#join">
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
                JOIN THE MOVEMENT
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}