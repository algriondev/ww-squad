// app/components/CoachesSection.tsx

"use client";
import { useState, useRef, memo } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import { coaches } from "../lib/coaches";
import { C } from "../lib/constants";
import Link from "next/link";

const CoachCard = memo(({ coach, accent }: { coach: any; accent: string }) => {
  const { w } = useWindowSize();
  const isMobile = w < 768;

  return (
    <Link
      href={`/coaches/${coach.id}`}
      style={{
        flexShrink: 0,
        width: isMobile ? 260 : 280,
        background: C.card,
        borderRadius: 22,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,.06)",
        transition: "transform .3s,border-color .3s",
        cursor: "pointer",
        textDecoration: "none",
        display: "block",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.borderColor = `${accent}40`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,.06)";
      }}
    >
      {/* Avatar area */}
      <div
        style={{
          height: 280,
          background: `linear-gradient(135deg,${C.cardUp},${C.card})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={coach.img}
          alt={coach.name}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 14,
            right: 16,
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: 10,
            fontWeight: 700,
            color: C.bg,
            background: accent,
            padding: "4px 10px",
            borderRadius: 50,
            letterSpacing: ".1em",
          }}
        >
          ★ {coach.rating}
        </div>
      </div>
      <div style={{ padding: "20px 20px 22px" }}>
        <div
          style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: 16,
            fontWeight: 800,
            color: C.white,
          }}
        >
          {coach.name}
        </div>
        <div
          style={{
            fontFamily: "'Tenor Sans',serif",
            fontSize: 13,
            color: "#d4d8e0",
            marginTop: 3,
          }}
        >
          {coach.role}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
          <span
            style={{
              fontFamily: "'Inter Tight',sans-serif",
              fontSize: 10,
              color: "#c0c4cc",
              background: "rgba(255,255,255,.06)",
              padding: "4px 10px",
              borderRadius: 6,
              letterSpacing: ".08em",
            }}
          >
            📍 {coach.base}
          </span>
          <span
            style={{
              fontFamily: "'Inter Tight',sans-serif",
              fontSize: 10,
              color: "#c0c4cc",
              background: "rgba(255,255,255,.06)",
              padding: "4px 10px",
              borderRadius: 6,
              letterSpacing: ".08em",
            }}
          >
            {coach.classes} classes
          </span>
        </div>
      </div>
    </Link>
  );
});

CoachCard.displayName = "CoachCard";

const CoachesSection = memo(({ accent }: { accent: string }) => {
  const { w } = useWindowSize();
  const isMobile = w < 768;
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    if (scrollRef.current)
      scrollRef.current.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <section
      id="coaches"
      style={{ padding: isMobile ? "72px 0" : "100px 0", background: C.bg }}
    >
      <div
        style={{
          maxWidth: 1140,
          margin: "0 auto",
          padding: "0 " + (isMobile ? "20px" : "64px"),
        }}
      >
        <div
          className="ww-reveal"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: isMobile ? 28 : 40,
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "'Inter Tight',sans-serif",
                fontSize: 11,
                fontWeight: 600,
                color: accent,
                letterSpacing: ".22em",
              }}
            >
              THE COACHES
            </span>
            <h2
              style={{
                fontFamily: "'Inter Tight',sans-serif",
                fontSize: isMobile ? 34 : 50,
                fontWeight: 900,
                color: C.white,
                marginTop: 8,
                lineHeight: 1.05,
              }}
            >
              Led by the
              <br />
              <span style={{ color: accent }}>best.</span>
            </h2>
          </div>
          {!isMobile && (
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => scroll(-1)}
                aria-label="Scroll coaches left"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: C.card,
                  border: "1px solid rgba(255,255,255,.1)",
                  color: C.white,
                  fontSize: 18,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background .2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = C.cardUp)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = C.card)
                }
              >
                ←
              </button>
              <button
                onClick={() => scroll(1)}
                aria-label="Scroll coaches right"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: C.card,
                  border: "1px solid rgba(255,255,255,.1)",
                  color: C.white,
                  fontSize: 18,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background .2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = C.cardUp)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = C.card)
                }
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Horizontal scroll row */}
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          gap: isMobile ? 14 : 18,
          overflowX: "auto",
          padding: "0 " + (isMobile ? "20px" : "64px"),
          paddingBottom: 24,
          scrollbarWidth: "none",
        }}
      >
        <style>{`::-webkit-scrollbar{display:none}`}</style>
        {coaches.map((c, i) => (
          <div
            key={c.id}
            className="ww-reveal"
            style={{ animationDelay: `${i * 0.02}s` }}
          >
            <CoachCard coach={c} accent={accent} />
          </div>
        ))}
      </div>
    </section>
  );
});

CoachesSection.displayName = "CoachesSection";

export default CoachesSection;