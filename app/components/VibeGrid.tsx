// app/components/VibeGrid.tsx

"use client";
import { memo } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import { vibes } from "../lib/vibes";
import { C } from "../lib/constants";
import Link from "next/link";

const VibeGrid = memo(
  ({
    accent,
    setAccent,
  }: {
    accent: string;
    setAccent: (color: string) => void;
  }) => {
    const { w } = useWindowSize();
    const isMobile = w < 768;

    return (
      <section
        id="explore"
        style={{
          padding: isMobile ? "72px 20px" : "100px 64px",
          background: C.bg,
        }}
      >
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div
            className="ww-reveal"
            style={{ marginBottom: isMobile ? 36 : 52 }}
          >
            <span
              style={{
                fontFamily: "'Inter Tight',sans-serif",
                fontSize: 11,
                fontWeight: 600,
                color: C.primary,
                letterSpacing: ".22em",
              }}
            >
              EXPLORE
            </span>
            <h2
              style={{
                fontFamily: "'Inter Tight',sans-serif",
                fontSize: isMobile ? 36 : 52,
                fontWeight: 900,
                color: C.white,
                marginTop: 8,
                lineHeight: 1.05,
              }}
            >
              Find your
              <br />
              <span style={{ color: accent }}>zone.</span>
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr 1fr",
              gap: isMobile ? 12 : 16,
            }}
          >
            {vibes.map((v, i) => {
              const active = accent === v.color;
              return (
                <div
                  key={v.id}
                  className="ww-reveal"
                  style={{ animationDelay: `${i * 0.01}s` }}
                >
                  <Link
                    href={`/vibes/${v.id}`}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      cursor: "pointer",
                      backgroundImage: v.bgImage
                        ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${v.bgImage})`
                        : "none",
                      backgroundColor: v.bgImage ? "transparent" : C.card,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      border: `1.5px solid ${active ? v.color : "rgba(255,255,255,.06)"}`,
                      borderRadius: 20,
                      padding: isMobile ? "22px 18px" : "32px 24px",
                      transition: "border .25s, transform .25s",
                      boxShadow: active ? `0 0 28px ${v.color}28` : "none",
                      textDecoration: "none",
                    }}
                    
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.borderColor = `${v.color}60`;
                        e.currentTarget.style.backgroundColor = `${v.color}08`;
                        e.currentTarget.style.transform = "translateY(-4px)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,.06)";
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.transform = "translateY(0)";
                      }
                    }}
                    aria-label={`Explore ${v.label} training zone`}
                    aria-pressed={active}
                  >
                    <div
                      style={{
                        fontFamily: "'Inter Tight',sans-serif",
                        fontSize: isMobile ? 14 : 16,
                        fontWeight: 800,
                        color: active ? v.color : C.white,
                        letterSpacing: ".12em",
                        transition: "color .3s",
                      }}
                    >
                      {v.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Tenor Sans',serif",
                        fontSize: isMobile ? 11 : 12,
                        color: "rgba(255,255,255,.65)",
                        marginTop: 4,
                      }}
                    >
                      {v.sub}
                    </div>
                    {/* bottom accent line */}
                    <div
                      style={{
                        marginTop: isMobile ? 16 : 22,
                        height: 2,
                        borderRadius: 1,
                        background: active ? v.color : "rgba(255,255,255,.08)",
                        boxShadow: active ? `0 0 8px ${v.color}50` : "none",
                        transition: "all .35s",
                      }}
                    />
                    
                    {/* Learn More hint on hover */}
                    <div
                      style={{
                        marginTop: 12,
                        fontFamily: "'Inter Tight',sans-serif",
                        fontSize: 9,
                        fontWeight: 600,
                        color: active ? v.color : "rgba(255,255,255,0.4)",
                        letterSpacing: ".1em",
                        transition: "opacity .3s",
                      }}
                    >
                      CLICK TO LEARN MORE →
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          {/* stats grid closes */}

          {/* Gym Interior Photo */}
          <div
            className="ww-reveal"
            style={{ animationDelay: ".3s", marginTop: isMobile ? 32 : 48 }}
          >
            <img
              src="/media/gym-interior.webp"
              alt="Workout Warehouse interior"
              loading="lazy"
              width="651"
              height="488"
              style={{
                width: "100%",
                borderRadius: 18,
                display: "block",
                maxHeight: 400,
                objectFit: "cover",
              }}
            />
          </div>
        </div>
        {/* container closes */}
      </section>
    );
  },
);

VibeGrid.displayName = "VibeGrid";

export default VibeGrid;