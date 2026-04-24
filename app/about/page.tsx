"use client";
import { useRouter } from "next/navigation";
import { C, WA_URL } from "../lib/constants";
import { useWindowSize } from "../hooks/useWindowSize";
import Link from "next/link";

export default function AboutPage() {
  const router = useRouter();
  const { w } = useWindowSize();
  const isMobile = w < 768;

  const amenities = [
    "Brand-new, state-of-the-art equipment across two expansive floors",
    "Multiple dedicated training zones to suit different training styles",
    "5–8 studio classes daily",
    "Fully equipped spin studio",
    "High-pressure showers and steam rooms for post-workout recovery",
  ];

  const addons = [
    { label: "Cold Plunge Recovery", href: "/services/cold-plunge" },
    { label: "Sports Massage & Physiotherapy", href: "/services/physiotherapy" },
    { label: "Body Composition Analysis", href: "/services/bmi-analysis" },
  ];

  return (
    <main style={{ background: C.bg, minHeight: "100vh", paddingTop: 100 }}>
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
            marginBottom: 12,
          }}
        >
          About Workout Warehouse
        </h1>

        <p
          style={{
            fontFamily: "'Tenor Sans',serif",
            fontSize: 13,
            color: C.slateL,
            letterSpacing: ".12em",
            marginBottom: 48,
          }}
        >
          HIGHWAY MALL · OPPOSITE NYAYO STADIUM · NAIROBI
        </p>

        <div
          style={{
            fontFamily: "'Tenor Sans',serif",
            fontSize: 17,
            color: C.white,
            lineHeight: 1.85,
          }}
        >
          <p style={{ marginBottom: 28 }}>
            Workout Warehouse is a premium commercial gym located at Highway Mall
            (opposite Nyayo Stadium), spanning 15,000 sq ft of thoughtfully
            designed training space.
          </p>

          <p style={{ marginBottom: 48 }}>
            Our facility features brand-new, state-of-the-art equipment across
            two expansive floors, with multiple dedicated training zones to suit
            different training styles. Members have access to 5–8 studio classes
            daily, a fully equipped spin studio, as well as high-pressure showers
            and steam rooms for post-workout recovery.
          </p>

          {/* Included in Membership */}
          <h2
            style={{
              fontFamily: "'Inter Tight',sans-serif",
              fontSize: isMobile ? 24 : 30,
              fontWeight: 900,
              color: C.primary,
              marginBottom: 20,
            }}
          >
            Included in Every Membership
          </h2>

          <ul style={{ listStyle: "none", padding: 0, marginBottom: 48 }}>
            {amenities.map((item, i) => (
              <li
                key={i}
                style={{ marginBottom: 16, paddingLeft: 30, position: "relative" }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 9,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: C.primary,
                    boxShadow: `0 0 10px ${C.primary}`,
                    display: "inline-block",
                  }}
                />
                {item}
              </li>
            ))}
          </ul>

          {/* Add-ons */}
          <h2
            style={{
              fontFamily: "'Inter Tight',sans-serif",
              fontSize: isMobile ? 24 : 30,
              fontWeight: 900,
              color: C.primary,
              marginBottom: 12,
            }}
          >
            Additional Services
          </h2>

          <p style={{ marginBottom: 20 }}>
            Available at an extra cost — book at reception or enquire via email:
          </p>

          <ul style={{ listStyle: "none", padding: 0, marginBottom: 56 }}>
            {addons.map((item) => (
              <li
                key={item.label}
                style={{ marginBottom: 14, paddingLeft: 30, position: "relative" }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 9,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: C.yellow,
                    display: "inline-block",
                  }}
                />
                <Link
                  href={item.href}
                  style={{ color: C.white, textDecoration: "underline", textDecorationColor: "rgba(255,255,255,.2)" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Vision */}
          <div
            style={{
              background: C.card,
              border: `1px solid rgba(179,102,204,.2)`,
              borderRadius: 16,
              padding: isMobile ? "28px 24px" : "36px 40px",
              marginBottom: 24,
            }}
          >
            <h3
              style={{
                fontFamily: "'Inter Tight',sans-serif",
                fontSize: 12,
                fontWeight: 700,
                color: C.primary,
                letterSpacing: ".2em",
                marginBottom: 14,
              }}
            >
              OUR VISION
            </h3>
            <p style={{ color: C.white, lineHeight: 1.8, margin: 0 }}>
              To be the leading fitness destination where people of all lifestyles
              can access convenient, affordable, and effective wellness solutions.
            </p>
          </div>

          {/* Mission */}
          <div
            style={{
              background: C.card,
              border: `1px solid rgba(179,102,204,.2)`,
              borderRadius: 16,
              padding: isMobile ? "28px 24px" : "36px 40px",
              marginBottom: 60,
            }}
          >
            <h3
              style={{
                fontFamily: "'Inter Tight',sans-serif",
                fontSize: 12,
                fontWeight: 700,
                color: C.primary,
                letterSpacing: ".2em",
                marginBottom: 14,
              }}
            >
              OUR MISSION
            </h3>
            <p style={{ color: C.white, lineHeight: 1.8, margin: 0 }}>
              To make fitness accessible, convenient, and sustainable — by
              providing world-class facilities, expert coaching, and recovery
              services that support every member at every stage of their journey.
            </p>
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center", display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/#join">
              <button
                style={{
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
                  boxShadow: `0 6px 30px rgba(179,102,204,0.45)`,
                }}
              >
                JOIN THE MOVEMENT
              </button>
            </Link>
            <Link href="/careers">
              <button
                style={{
                  background: "none",
                  border: `1px solid ${C.primary}`,
                  color: C.primary,
                  padding: "16px 40px",
                  borderRadius: 50,
                  cursor: "pointer",
                  fontFamily: "'Inter Tight',sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: ".15em",
                }}
              >
                JOIN OUR TEAM
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
