"use client";
import { useRouter } from "next/navigation";
import { vibes } from "../../lib/vibes";
import { C } from "../../lib/constants";
import { useWindowSize } from "../../hooks/useWindowSize";
import Link from "next/link";

export default function ZenZonePage() {
  const router = useRouter();
  const { w } = useWindowSize();
  const isMobile = w < 768;
  
  const vibe = vibes.find(v => v.id === "zen")!;

  return (
    <main style={{ background: C.bg, minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{
        position: "relative",
        height: isMobile ? "60vh" : "70vh",
        overflow: "hidden",
      }}>
        <img
          src={vibe.bgImage}
          alt={vibe.label}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8))",
        }} />
        
        <div style={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: isMobile ? "20px" : "64px",
          maxWidth: 1200,
          margin: "0 auto",
        }}>
          <button
            onClick={() => router.back()}
            style={{
              position: "absolute",
              top: 100,
              left: isMobile ? 20 : 64,
              background: "rgba(12,12,12,0.8)",
              border: `1px solid ${vibe.color}`,
              color: vibe.color,
              padding: "10px 20px",
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

          <div style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: 12,
            fontWeight: 700,
            color: vibe.color,
            letterSpacing: ".2em",
            marginBottom: 10,
          }}>
            {vibe.sub.toUpperCase()}
          </div>
          
          <h1 style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: isMobile ? 56 : 86,
            fontWeight: 900,
            color: C.white,
            lineHeight: 1,
            marginBottom: 20,
          }}>
            {vibe.hero.title}
          </h1>

          <p style={{
            fontFamily: "'Tenor Sans',serif",
            fontSize: isMobile ? 16 : 20,
            color: C.slateL,
            maxWidth: 600,
            lineHeight: 1.7,
          }}>
            {vibe.hero.description}
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{
        padding: isMobile ? "60px 20px" : "100px 64px",
        maxWidth: 1200,
        margin: "0 auto",
      }}>
        {/* About */}
        <p style={{
          fontFamily: "'Tenor Sans',serif",
          fontSize: 18,
          color: C.white,
          lineHeight: 1.8,
          marginBottom: 80,
        }}>
          {vibe.about}
        </p>

        {/* Features */}
        <h2 style={{
          fontFamily: "'Inter Tight',sans-serif",
          fontSize: 36,
          fontWeight: 900,
          color: C.white,
          marginBottom: 30,
        }}>
          Features
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 20,
          marginBottom: 80,
        }}>
          {vibe.features.map((f, i) => (
            <div key={i} style={{
              background: C.card,
              border: `1px solid ${vibe.color}20`,
              borderRadius: 16,
              padding: "24px",
            }}>
              <h3 style={{
                fontFamily: "'Inter Tight',sans-serif",
                fontSize: 18,
                fontWeight: 800,
                color: vibe.color,
                marginBottom: 10,
              }}>
                {f.name}
              </h3>
              <p style={{
                fontFamily: "'Tenor Sans',serif",
                fontSize: 14,
                color: C.slateL,
                lineHeight: 1.6,
              }}>
                {f.description}
              </p>
            </div>
          ))}
        </div>

        {/* Classes */}
        <h2 style={{
          fontFamily: "'Inter Tight',sans-serif",
          fontSize: 36,
          fontWeight: 900,
          color: C.white,
          marginBottom: 30,
        }}>
          Classes
        </h2>
        <div style={{
          background: C.card,
          border: "1px solid rgba(255,255,255,.06)",
          borderRadius: 20,
          overflow: "hidden",
          marginBottom: 80,
        }}>
          {vibe.classes.map((cls, i) => (
            <div key={i} style={{
              padding: "24px",
              borderBottom: i < vibe.classes.length - 1 ? "1px solid rgba(255,255,255,.04)" : "none",
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 10,
              }}>
                <h3 style={{
                  fontFamily: "'Inter Tight',sans-serif",
                  fontSize: 20,
                  fontWeight: 800,
                  color: C.white,
                }}>
                  {cls.name}
                </h3>
                <div style={{
                  background: `${vibe.color}20`,
                  border: `1px solid ${vibe.color}40`,
                  borderRadius: 50,
                  padding: "4px 12px",
                  fontFamily: "'Inter Tight',sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  color: vibe.color,
                  letterSpacing: ".1em",
                }}>
                  {cls.level.toUpperCase()}
                </div>
              </div>
              <p style={{
                fontFamily: "'Tenor Sans',serif",
                fontSize: 14,
                color: C.slateL,
                marginBottom: 10,
              }}>
                {cls.description}
              </p>
              <div style={{
                fontFamily: "'Inter Tight',sans-serif",
                fontSize: 12,
                fontWeight: 600,
                color: vibe.color,
              }}>
                Duration: {cls.duration}
              </div>
            </div>
          ))}
        </div>

        {/* Equipment */}
        <h2 style={{
          fontFamily: "'Inter Tight',sans-serif",
          fontSize: 36,
          fontWeight: 900,
          color: C.white,
          marginBottom: 30,
        }}>
          Equipment
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 15,
          marginBottom: 80,
        }}>
          {vibe.equipment.map((eq, i) => (
            <div key={i} style={{
              background: C.card,
              border: "1px solid rgba(255,255,255,.06)",
              borderRadius: 12,
              padding: "15px 20px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: vibe.color,
                boxShadow: `0 0 10px ${vibe.color}`,
              }} />
              <span style={{
                fontFamily: "'Tenor Sans',serif",
                fontSize: 14,
                color: C.white,
              }}>
                {eq}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          textAlign: "center",
          background: `${vibe.color}08`,
          border: `1px solid ${vibe.color}30`,
          padding: isMobile ? "40px 20px" : "60px",
          borderRadius: 20,
        }}>
          <h2 style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: isMobile ? 32 : 42,
            fontWeight: 900,
            color: C.white,
            marginBottom: 15,
          }}>
            Experience the {vibe.label} Zone
          </h2>
          <p style={{
            fontFamily: "'Tenor Sans',serif",
            fontSize: 16,
            color: C.slateL,
            marginBottom: 30,
          }}>
            Join Workout Warehouse and access all zones
          </p>
          <Link href="/#join">
            <button style={{
              background: vibe.color,
              border: "none",
              color: C.bg,
              padding: "16px 40px",
              borderRadius: 50,
              cursor: "pointer",
              fontFamily: "'Inter Tight',sans-serif",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: ".15em",
              boxShadow: `0 6px 30px ${vibe.color}40`,
            }}>
              JOIN NOW
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}