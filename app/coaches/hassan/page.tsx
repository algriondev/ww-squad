"use client";
import { useRouter } from "next/navigation";
import { coaches } from "../../lib/coaches";
import { C } from "../../lib/constants";
import { useWindowSize } from "../../hooks/useWindowSize";
import Link from "next/link";

export default function CoachHassanPage() {
  const router = useRouter();
  const { w } = useWindowSize();
  const isMobile = w < 768;
  
  const coach = coaches.find(c => c.id === "hassan");
  
  if (!coach) {
    return (
      <div style={{ background: C.bg, color: C.white, padding: 100 }}>
        <h1>Coach not found</h1>
        <Link href="/#coaches">
          <button style={{ marginTop: 20, padding: "10px 20px", background: C.primary }}>
            Back to Coaches
          </button>
        </Link>
      </div>
    );
  }

  return (
    <main style={{ background: C.bg, minHeight: "100vh", paddingTop: 80 }}>
      {/* Back button */}
      <div style={{ padding: isMobile ? "20px" : "40px 64px" }}>
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
          }}
        >
          ← BACK
        </button>
      </div>

      {/* Hero Section */}
      <div style={{
        padding: isMobile ? "40px 20px" : "60px 64px",
        maxWidth: 1200,
        margin: "0 auto",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 60,
          alignItems: "center",
        }}>
          {/* Image */}
          <img
            src={coach.img}
            alt={coach.name}
            style={{
              width: "100%",
              borderRadius: 20,
              maxHeight: 600,
              objectFit: "cover",
            }}
          />

          {/* Info */}
          <div>
            <h1 style={{
              fontFamily: "'Inter Tight',sans-serif",
              fontSize: isMobile ? 48 : 64,
              fontWeight: 900,
              color: C.white,
              marginBottom: 10,
            }}>
              {coach.name}
            </h1>
            
            <p style={{
              fontFamily: "'Tenor Sans',serif",
              fontSize: 20,
              color: C.primary,
              marginBottom: 20,
            }}>
              {coach.role}
            </p>

            <div style={{
              display: "flex",
              gap: 20,
              marginBottom: 30,
              flexWrap: "wrap",
            }}>
              <div style={{
                background: C.card,
                padding: "12px 20px",
                borderRadius: 12,
              }}>
                <div style={{
                  fontFamily: "'Inter Tight',sans-serif",
                  fontSize: 24,
                  fontWeight: 900,
                  color: C.primary,
                }}>
                  {coach.rating}★
                </div>
                <div style={{
                  fontFamily: "'Tenor Sans',serif",
                  fontSize: 12,
                  color: C.slate,
                }}>
                  Rating
                </div>
              </div>

              <div style={{
                background: C.card,
                padding: "12px 20px",
                borderRadius: 12,
              }}>
                <div style={{
                  fontFamily: "'Inter Tight',sans-serif",
                  fontSize: 24,
                  fontWeight: 900,
                  color: C.primary,
                }}>
                  {coach.classes}+
                </div>
                <div style={{
                  fontFamily: "'Tenor Sans',serif",
                  fontSize: 12,
                  color: C.slate,
                }}>
                  Classes
                </div>
              </div>

              <div style={{
                background: C.card,
                padding: "12px 20px",
                borderRadius: 12,
              }}>
                <div style={{
                  fontFamily: "'Inter Tight',sans-serif",
                  fontSize: 24,
                  fontWeight: 900,
                  color: C.primary,
                }}>
                  {coach.experience}
                </div>
                <div style={{
                  fontFamily: "'Tenor Sans',serif",
                  fontSize: 12,
                  color: C.slate,
                }}>
                  Experience
                </div>
              </div>
            </div>

            <p style={{
              fontFamily: "'Tenor Sans',serif",
              fontSize: 16,
              color: C.slateL,
              lineHeight: 1.8,
            }}>
              {coach.bio}
            </p>
          </div>
        </div>

        {/* Philosophy */}
        <div style={{
          marginTop: 80,
          background: `${C.primary}08`,
          border: `1px solid ${C.primary}30`,
          borderRadius: 20,
          padding: isMobile ? "30px 20px" : "40px",
        }}>
          <h2 style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: 14,
            fontWeight: 700,
            color: C.primary,
            letterSpacing: ".15em",
            marginBottom: 15,
          }}>
            COACHING PHILOSOPHY
          </h2>
          <p style={{
            fontFamily: "'Tenor Sans',serif",
            fontSize: 18,
            color: C.white,
            lineHeight: 1.7,
            fontStyle: "italic",
          }}>
            "{coach.philosophy}"
          </p>
        </div>

        {/* Specialties */}
        <div style={{ marginTop: 60 }}>
          <h2 style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: 28,
            fontWeight: 900,
            color: C.white,
            marginBottom: 20,
          }}>
            Specialties
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 15,
          }}>
            {coach.specialties.map((spec, i) => (
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
                  background: C.primary,
                  boxShadow: `0 0 10px ${C.primary}`,
                }} />
                <span style={{
                  fontFamily: "'Tenor Sans',serif",
                  fontSize: 15,
                  color: C.white,
                }}>
                  {spec}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div style={{ marginTop: 60 }}>
          <h2 style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: 28,
            fontWeight: 900,
            color: C.white,
            marginBottom: 20,
          }}>
            Certifications
          </h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {coach.certifications.map((cert, i) => (
              <div key={i} style={{
                background: `${C.primary}15`,
                border: `1px solid ${C.primary}40`,
                borderRadius: 50,
                padding: "8px 18px",
              }}>
                <span style={{
                  fontFamily: "'Inter Tight',sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  color: C.primary,
                  letterSpacing: ".08em",
                }}>
                  {cert}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule */}
        <div style={{ marginTop: 60 }}>
          <h2 style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: 28,
            fontWeight: 900,
            color: C.white,
            marginBottom: 20,
          }}>
            Class Schedule
          </h2>
          <div style={{
            background: C.card,
            border: "1px solid rgba(255,255,255,.06)",
            borderRadius: 20,
            overflow: "hidden",
          }}>
            {coach.schedule.map((s, i) => (
              <div key={i} style={{
                padding: "20px 24px",
                borderBottom: i < coach.schedule.length - 1 ? "1px solid rgba(255,255,255,.04)" : "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 15,
              }}>
                <div>
                  <div style={{
                    fontFamily: "'Inter Tight',sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    color: C.white,
                  }}>
                    {s.class}
                  </div>
                  <div style={{
                    fontFamily: "'Tenor Sans',serif",
                    fontSize: 13,
                    color: C.slate,
                    marginTop: 4,
                  }}>
                    {s.day} · {s.duration}
                  </div>
                </div>
                <div style={{
                  fontFamily: "'Inter Tight',sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: C.primary,
                }}>
                  {s.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{
          marginTop: 80,
          textAlign: "center",
          background: C.card,
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
            Ready to train with {coach.name.split(' ')[0]}?
          </h2>
          <p style={{
            fontFamily: "'Tenor Sans',serif",
            fontSize: 16,
            color: C.slateL,
            marginBottom: 30,
          }}>
            Join now and book your first class
          </p>
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
              JOIN NOW
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}