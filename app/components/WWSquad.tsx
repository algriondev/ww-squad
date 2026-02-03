"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ───────────────────────────────────────────
   DESIGN TOKENS
─────────────────────────────────────────── */
const C = {
  bg: "#0c0c0c",
  card: "#141414",
  cardUp: "#1a1a1a",
  lime: "#CCFF00",
  limeDim: "rgba(204,255,0,0.13)",
  limeGlow: "rgba(204,255,0,0.38)",
  slate: "#5c6370",
  slateL: "#8a9099",
  white: "#ececec",
  red: "#e83e3e",
  blue: "#5ba3d9",
  ice: "#7ecfe3",
  gold: "#f0c040",
};

/* ───────────────────────────────────────────
   GLOBAL STYLES INJECTOR
─────────────────────────────────────────── */
const GlobalStyles = () => {
  useEffect(() => {
    const id = "ww-squad-styles";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800;900&family=Tenor+Sans&display=swap');
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
      body{background:#0c0c0c;color:#ececec;overflow-x:hidden}
      ::selection{background:rgba(204,255,0,0.25);color:#fff}
      img{display:block;max-width:100%}
      button{-webkit-tap-highlight-color:transparent}

      /* ── Grain ── */
      .ww-grain{position:fixed;inset:0;pointer-events:none;z-index:9999;opacity:.04}

      /* ── Scroll Reveal ── */
      .ww-reveal{opacity:0;transform:translateY(28px);transition:opacity .7s cubic-bezier(.4,0,.2,1),transform .7s cubic-bezier(.4,0,.2,1)}
      .ww-reveal.visible{opacity:1;transform:translateY(0)}

      /* ── Ticker ── */
      @keyframes ticker-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
      .ww-ticker-track{display:flex;white-space:nowrap;animation:ticker-scroll 28s linear infinite}

      /* ── Pulse ── */
      @keyframes ww-pulse{0%,100%{opacity:.55;transform:scale(.96)}50%{opacity:1;transform:scale(1.04)}}
      @keyframes ww-heartbeat{0%,100%{transform:scaleY(1);opacity:.5}50%{transform:scaleY(1.7);opacity:1}}
      @keyframes ww-ping{0%{box-shadow:0 0 0 0 rgba(204,255,0,.45)}70%{box-shadow:0 0 0 14px rgba(204,255,0,0)}100%{box-shadow:0 0 0 0 rgba(204,255,0,0)}}
      @keyframes ww-fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
      @keyframes ww-slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
      @keyframes ww-fadeIn{from{opacity:0}to{opacity:1}}
      @keyframes ww-spin{to{transform:rotate(360deg)}}

      /* ── Scrollbar ── */
      ::-webkit-scrollbar{width:6px}
      ::-webkit-scrollbar-track{background:#0c0c0c}
      ::-webkit-scrollbar-thumb{background:#2a2a2a;border-radius:3px}
      ::-webkit-scrollbar-thumb:hover{background:#3a3a3a}
    `;
    document.head.appendChild(el);
  }, []);
  return null;
};

/* ───────────────────────────────────────────
   HOOK: SCROLL REVEAL
─────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".ww-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ───────────────────────────────────────────
   HOOK: WINDOW SIZE
─────────────────────────────────────────── */
function useWindowSize() {
  const [size, setSize] = useState({
    w: typeof window !== "undefined" ? window.innerWidth : 1200,
  });
  useEffect(() => {
    const up = () => setSize({ w: window.innerWidth });
    window.addEventListener("resize", up);
    up();
    return () => window.removeEventListener("resize", up);
  }, []);
  return size;
}

/* ───────────────────────────────────────────
   GRAIN OVERLAY (SVG noise)
─────────────────────────────────────────── */
const Grain = () => (
  <svg className="ww-grain" style={{ width: "100%", height: "100%" }}>
    <filter id="ww-grain-f">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.72"
        numOctaves="4"
        stitchTiles="stitch"
      />
    </filter>
    <rect width="100%" height="100%" filter="url(#ww-grain-f)" />
  </svg>
);

/* ───────────────────────────────────────────
   TICKER
─────────────────────────────────────────── */
const tickerData = [
  "412 SQUAD MEMBERS TRAINING NOW",
  "COACH SARAH · 'HARDCORE HIIT' — SOHO · 12 SPOTS LEFT",
  "98% PEAK PERFORMANCE REACHED TODAY",
  "RECOVERY PRO SESSIONS LIVE IN SHOREDITCH",
  "SQUAD RECORD BROKEN — 6:14 AM BRUTAL THURSDAY",
  "NEW COACH ALEX JOINS SHOREDITCH BASE",
];
const Ticker = () => (
  <div
    style={{
      overflow: "hidden",
      borderTop: "1px solid rgba(204,255,0,.1)",
      borderBottom: "1px solid rgba(204,255,0,.1)",
      background: "rgba(204,255,0,.035)",
      padding: "11px 0",
    }}
  >
    <div className="ww-ticker-track">
      {[...tickerData, ...tickerData].map((t, i) => (
        <span
          key={i}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            marginRight: 56,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: C.lime,
              boxShadow: `0 0 7px ${C.lime}`,
            }}
          />
          <span
            style={{
              fontFamily: "'Inter Tight',sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: ".15em",
              color: C.slateL,
              textTransform: "uppercase",
            }}
          >
            {t}
          </span>
        </span>
      ))}
    </div>
  </div>
);

/* ───────────────────────────────────────────
   NAV
─────────────────────────────────────────── */
const navLinks = ["HOME", "EXPLORE", "COACHES", "JOIN", "CONTACT"];
const Nav = ({ openJoin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { w } = useWindowSize();
  const isMobile = w < 768;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBg = scrolled ? "rgba(12,12,12,.88)" : "transparent";
  const navBorder = scrolled
    ? "1px solid rgba(255,255,255,.06)"
    : "1px solid transparent";

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: navBg,
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: navBorder,
          transition:
            "background .4s ease, border-color .4s ease, backdrop-filter .4s ease",
          padding: isMobile ? "14px 20px" : "18px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 3,
            cursor: "pointer",
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span
            style={{
              fontFamily: "'Inter Tight',sans-serif",
              fontSize: isMobile ? 20 : 24,
              fontWeight: 900,
              color: C.lime,
              letterSpacing: "-.01em",
              textShadow: `0 0 18px ${C.limeGlow}`,
            }}
          >
            WW
          </span>
          <span
            style={{
              fontFamily: "'Inter Tight',sans-serif",
              fontSize: isMobile ? 20 : 24,
              fontWeight: 800,
              color: C.white,
              letterSpacing: ".16em",
            }}
          >
            SQUAD
          </span>
        </div>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
            {navLinks.map((l) => (
              <button
                key={l}
                onClick={() => {
                  if (l === "JOIN") openJoin();
                  else {
                    const map = {
                      HOME: 0,
                      EXPLORE: document.getElementById("explore")?.offsetTop,
                      COACHES: document.getElementById("coaches")?.offsetTop,
                      CONTACT: document.getElementById("contact")?.offsetTop,
                    };
                    window.scrollTo({ top: map[l] || 0, behavior: "smooth" });
                  }
                }}
                style={{
                  background: "none",
                  border: "none",
                  fontFamily: "'Inter Tight',sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: ".18em",
                  color: l === "JOIN" ? C.lime : C.slateL,
                  cursor: "pointer",
                  padding: "6px 0",
                  position: "relative",
                  transition: "color .25s",
                }}
                onMouseEnter={(e) => {
                  if (l !== "JOIN") e.currentTarget.style.color = C.white;
                }}
                onMouseLeave={(e) => {
                  if (l !== "JOIN") e.currentTarget.style.color = C.slateL;
                }}
              >
                {l}
                {l === "JOIN" && (
                  <span
                    style={{
                      position: "absolute",
                      inset: "-6px -14px",
                      border: `1px solid ${C.lime}`,
                      borderRadius: 50,
                      opacity: 0.5,
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 5,
              padding: 6,
            }}
          >
            <span
              style={{
                display: "block",
                width: 24,
                height: 2,
                background: menuOpen ? C.lime : C.white,
                borderRadius: 2,
                transition: "all .3s ease",
                transform: menuOpen
                  ? "rotate(45deg) translate(5px,5px)"
                  : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: 24,
                height: 2,
                background: menuOpen ? C.lime : C.white,
                borderRadius: 2,
                transition: "opacity .3s",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: 24,
                height: 2,
                background: menuOpen ? C.lime : C.white,
                borderRadius: 2,
                transition: "all .3s ease",
                transform: menuOpen
                  ? "rotate(-45deg) translate(5px,-5px)"
                  : "none",
              }}
            />
          </button>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobile && menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background: "rgba(12,12,12,.96)",
            backdropFilter: "blur(10px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
            animation: "ww-fadeIn .3s ease",
          }}
        >
          {navLinks.map((l, i) => (
            <button
              key={l}
              onClick={() => {
                setMenuOpen(false);
                if (l === "JOIN") openJoin();
                else {
                  const map = {
                    EXPLORE: document.getElementById("explore")?.offsetTop,
                    COACHES: document.getElementById("coaches")?.offsetTop,
                    CONTACT: document.getElementById("contact")?.offsetTop,
                  };
                  window.scrollTo({ top: map[l] || 0, behavior: "smooth" });
                }
              }}
              style={{
                background: "none",
                border: "none",
                fontFamily: "'Inter Tight',sans-serif",
                fontSize: 28,
                fontWeight: 800,
                color: l === "JOIN" ? C.lime : C.white,
                letterSpacing: ".14em",
                cursor: "pointer",
                opacity: 0,
                animation: `ww-fadeUp .4s ease ${i * 0.08}s forwards`,
              }}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

/* ───────────────────────────────────────────
   HERO
─────────────────────────────────────────── */
const Hero = ({ openJoin }) => {
  const { w } = useWindowSize();
  const isMobile = w < 768;
  const [py, setPy] = useState(0);

  useEffect(() => {
    const onScroll = () => setPy(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        minHeight: 560,
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      {/* Layered cinematic bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(155deg,#0d100f 0%,#111210 30%,#0c0e12 60%,#0c0c0c 100%)",
        }}
      />
      {/* Warm blob */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: isMobile ? "-20%" : "5%",
          width: isMobile ? "80%" : "55%",
          height: "55%",
          background:
            "radial-gradient(ellipse,rgba(55,38,24,.5) 0%,transparent 70%)",
          filter: "blur(60px)",
          transform: `translateY(${py * 0.08}px)`,
          transition: "transform .1s linear",
        }}
      />
      {/* Cool blob */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          right: isMobile ? "-15%" : "0%",
          width: isMobile ? "70%" : "50%",
          height: "50%",
          background:
            "radial-gradient(ellipse,rgba(24,36,52,.45) 0%,transparent 70%)",
          filter: "blur(50px)",
          transform: `translateY(${py * 0.05}px)`,
        }}
      />

      {/* Abstract silhouette SVG */}
      <svg
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: `translateX(-50%) translateY(${py * 0.12}px)`,
          width: isMobile ? "180%" : "100%",
          height: "100%",
          opacity: 0.13,
          pointerEvents: "none",
        }}
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="figG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        {/* Torso */}
        <ellipse cx="600" cy="220" rx="68" ry="85" fill="url(#figG)" />
        {/* Head */}
        <ellipse cx="600" cy="115" rx="52" ry="60" fill="url(#figG)" />
        {/* Arms stretched */}
        <rect
          x="480"
          y="240"
          width="52"
          height="180"
          rx="24"
          fill="url(#figG)"
          transform="rotate(-28 506 330)"
        />
        <rect
          x="668"
          y="240"
          width="52"
          height="180"
          rx="24"
          fill="url(#figG)"
          transform="rotate(30 694 330)"
        />
        {/* Legs */}
        <rect
          x="555"
          y="390"
          width="42"
          height="220"
          rx="18"
          fill="url(#figG)"
          transform="rotate(6 576 500)"
        />
        <rect
          x="603"
          y="390"
          width="42"
          height="220"
          rx="18"
          fill="url(#figG)"
          transform="rotate(-5 624 500)"
        />
      </svg>

      {/* Bottom gradient */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "60%",
          background: "linear-gradient(to top,#0c0c0c 0%,transparent 100%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          padding: isMobile ? "0 24px 80px" : "0 64px 100px",
        }}
      >
        <div
          style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: isMobile ? 11 : 12,
            fontWeight: 600,
            color: C.lime,
            letterSpacing: ".24em",
            marginBottom: 14,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: C.lime,
              boxShadow: `0 0 8px ${C.lime}`,
              animation: "ww-pulse 2s ease infinite",
            }}
          />
          LIVE NOW · 412 TRAINING
        </div>
        <h1
          style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: isMobile ? 56 : 86,
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-.02em",
            color: C.white,
          }}
        >
          <span
            style={{
              color: C.lime,
              display: "block",
              textShadow: `0 0 60px ${C.limeGlow}`,
            }}
          >
            WW
          </span>
          <span style={{ display: "block" }}>SQUAD</span>
        </h1>
        <p
          style={{
            fontFamily: "'Tenor Sans',serif",
            fontSize: isMobile ? 17 : 21,
            color: C.slateL,
            marginTop: 14,
            fontStyle: "italic",
            letterSpacing: ".02em",
            maxWidth: 420,
          }}
        >
          THE END OF AVERAGE.
        </p>
        <div
          style={{
            marginTop: isMobile ? 28 : 36,
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={openJoin}
            style={{
              fontFamily: "'Inter Tight',sans-serif",
              fontSize: isMobile ? 13 : 14,
              fontWeight: 800,
              letterSpacing: ".18em",
              color: C.bg,
              background: C.lime,
              border: "none",
              borderRadius: 50,
              padding: isMobile ? "14px 32px" : "16px 40px",
              cursor: "pointer",
              boxShadow: `0 6px 36px ${C.limeGlow}`,
              transition: "transform .15s,box-shadow .15s",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "scale(.96)";
              e.currentTarget.style.boxShadow = `0 2px 18px ${C.limeGlow}`;
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = `0 6px 36px ${C.limeGlow}`;
            }}
          >
            JOIN THE SQUAD
          </button>
          <button
            onClick={() =>
              document
                .getElementById("explore")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              fontFamily: "'Inter Tight',sans-serif",
              fontSize: isMobile ? 12 : 13,
              fontWeight: 600,
              letterSpacing: ".16em",
              color: C.slateL,
              background: "transparent",
              border: "1px solid rgba(255,255,255,.15)",
              borderRadius: 50,
              padding: isMobile ? "14px 28px" : "16px 34px",
              cursor: "pointer",
              transition: "border-color .25s,color .25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,.35)";
              e.currentTarget.style.color = C.white;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,.15)";
              e.currentTarget.style.color = C.slateL;
            }}
          >
            EXPLORE
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span
          style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: ".2em",
            color: C.slate,
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: 1,
            height: 34,
            background: `linear-gradient(to bottom,${C.lime},transparent)`,
            animation: "ww-heartbeat 2s ease infinite",
          }}
        />
      </div>
    </section>
  );
};

/* ───────────────────────────────────────────
   VIBE GRID (Explore Section)
─────────────────────────────────────────── */
const vibes = [
  {
    id: "strength",
    label: "STRENGTH",
    sub: "Raw Power",
    icon: "⚡",
    color: C.red,
    bg: "radial-gradient(135deg at 30% 70%,rgba(232,62,62,.15) 0%,transparent 60%)",
  },
  {
    id: "zen",
    label: "ZEN",
    sub: "Mind Reset",
    icon: "🌊",
    color: C.blue,
    bg: "radial-gradient(135deg 70% 30%,rgba(91,163,217,.12) 0%,transparent 60%)",
  },
  {
    id: "sweat",
    label: "SWEAT",
    sub: "Burn Zone",
    icon: "🔥",
    color: "#ff8c42",
    bg: "radial-gradient(135deg at 60% 40%,rgba(255,140,66,.13) 0%,transparent 60%)",
  },
  {
    id: "recovery",
    label: "RECOVERY",
    sub: "Restore",
    icon: "❄️",
    color: C.ice,
    bg: "radial-gradient(135deg at 50% 80%,rgba(126,207,227,.12) 0%,transparent 60%)",
  },
];

const VibeGrid = ({ accent, setAccent }) => {
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
        <div className="ww-reveal" style={{ marginBottom: isMobile ? 36 : 52 }}>
          <span
            style={{
              fontFamily: "'Inter Tight',sans-serif",
              fontSize: 11,
              fontWeight: 600,
              color: C.lime,
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
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <button
                  onClick={() => setAccent(active ? C.lime : v.color)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    cursor: "pointer",
                    background: active ? v.bg : C.card,
                    border: `1.5px solid ${active ? v.color : "rgba(255,255,255,.06)"}`,
                    borderRadius: 20,
                    padding: isMobile ? "22px 18px" : "32px 24px",
                    transition: "all .35s cubic-bezier(.4,0,.2,1)",
                    boxShadow: active ? `0 0 28px ${v.color}28` : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.borderColor = `${v.color}60`;
                      e.currentTarget.style.background = `${v.color}08`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,.06)";
                      e.currentTarget.style.background = C.card;
                    }
                  }}
                >
                  <div
                    style={{ fontSize: isMobile ? 26 : 32, marginBottom: 10 }}
                  >
                    {v.icon}
                  </div>
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
                      color: C.slate,
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
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ───────────────────────────────────────────
   WHY WW SQUAD (editorial asymmetric)
─────────────────────────────────────────── */
const stats = [
  { num: "412", label: "Training Right Now" },
  { num: "98%", label: "Peak Performance" },
  { num: "24/7", label: "Always Open" },
  { num: "12+", label: "Live Classes Daily" },
];

const WhySection = ({ accent }) => {
  const { w } = useWindowSize();
  const isMobile = w < 768;
  const isTablet = w < 1024;

  return (
    <section
      style={{
        padding: isMobile ? "72px 20px" : "120px 64px",
        background: C.bg,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Diagonal accent stripe */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "45%",
          height: "120%",
          background: `linear-gradient(135deg,transparent 40%,${accent}04 50%,transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1140,
          margin: "0 auto",
          display: isMobile ? "flex" : "grid",
          gridTemplateColumns: isTablet ? "1fr" : "1.1fr 0.9fr",
          gap: isMobile ? 48 : 80,
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* Left: text */}
        <div className="ww-reveal">
          <span
            style={{
              fontFamily: "'Inter Tight',sans-serif",
              fontSize: 11,
              fontWeight: 600,
              color: accent,
              letterSpacing: ".22em",
            }}
          >
            WHY WW SQUAD
          </span>
          <h2
            style={{
              fontFamily: "'Inter Tight',sans-serif",
              fontSize: isMobile ? 34 : 48,
              fontWeight: 900,
              color: C.white,
              marginTop: 10,
              lineHeight: 1.08,
            }}
          >
            Not a gym.
            <br />
            <span style={{ color: accent }}>A movement.</span>
          </h2>
          <p
            style={{
              fontFamily: "'Tenor Sans',serif",
              fontSize: isMobile ? 15 : 17,
              color: C.slateL,
              marginTop: 20,
              lineHeight: 1.7,
              maxWidth: 480,
            }}
          >
            WW SQUAD fuses the luxury of Equinox, the raw energy of Gymbox, the
            speed of PureGym, and the tech-driven community of Peloton — into
            one obsessive, members-first experience built for 2026.
          </p>
          <p
            style={{
              fontFamily: "'Tenor Sans',serif",
              fontSize: isMobile ? 14 : 16,
              color: C.slate,
              marginTop: 16,
              lineHeight: 1.65,
              maxWidth: 480,
            }}
          >
            Every space. Every session. Every second — designed around you and
            your squad.
          </p>
        </div>

        {/* Right: stats grid */}
        <div className="ww-reveal" style={{ animationDelay: ".12s" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: isMobile ? 12 : 16,
            }}
          >
            {stats.map((s, i) => (
              <div
                key={i}
                style={{
                  background: C.card,
                  border: "1px solid rgba(255,255,255,.06)",
                  borderRadius: 18,
                  padding: isMobile ? "22px 18px" : "28px 22px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* corner glow */}
                <div
                  style={{
                    position: "absolute",
                    top: -20,
                    right: -20,
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: `${accent}08`,
                    filter: "blur(20px)",
                  }}
                />
                <div
                  style={{
                    fontFamily: "'Inter Tight',sans-serif",
                    fontSize: isMobile ? 30 : 38,
                    fontWeight: 900,
                    color: accent,
                    position: "relative",
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontFamily: "'Tenor Sans',serif",
                    fontSize: isMobile ? 12 : 13,
                    color: C.slate,
                    marginTop: 4,
                    position: "relative",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ───────────────────────────────────────────
   COACHES
─────────────────────────────────────────── */
const coaches = [
  {
    name: "SARAH K.",
    role: "HIIT & Conditioning",
    base: "Soho",
    img: "🏋️",
    classes: 847,
    rating: 4.9,
  },
  {
    name: "ALEX M.",
    role: "Strength & Power",
    base: "Shoreditch",
    img: "💪",
    classes: 612,
    rating: 4.8,
  },
  {
    name: "LUNA R.",
    role: "Zen & Flow",
    base: "Notting Hill",
    img: "🧘",
    classes: 1204,
    rating: 5.0,
  },
  {
    name: "JAKE T.",
    role: "Cardio & Endurance",
    base: "Camden",
    img: "🏃",
    classes: 538,
    rating: 4.7,
  },
  {
    name: "MIA S.",
    role: "Recovery & Mobility",
    base: "Greenwich",
    img: "❄️",
    classes: 423,
    rating: 4.9,
  },
];

const CoachCard = ({ coach, accent }) => {
  const { w } = useWindowSize();
  const isMobile = w < 768;
  return (
    <div
      style={{
        flexShrink: 0,
        width: isMobile ? 260 : 280,
        background: C.card,
        borderRadius: 22,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,.06)",
        transition: "transform .3s,border-color .3s",
        cursor: "pointer",
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
          height: 160,
          background: `linear-gradient(135deg,${C.cardUp},${C.card})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div style={{ fontSize: 56 }}>{coach.img}</div>
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
            color: C.slate,
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
              color: C.slateL,
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
              color: C.slateL,
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
    </div>
  );
};

const CoachesSection = ({ accent }) => {
  const { w } = useWindowSize();
  const isMobile = w < 768;
  const isTablet = w < 1024;
  const scrollRef = useRef(null);

  const scroll = (dir) => {
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
          WebkitOverflowScrolling: "touch",
        }}
      >
        <style>{`::-webkit-scrollbar{display:none}`}</style>
        {coaches.map((c, i) => (
          <div
            key={i}
            className="ww-reveal"
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            <CoachCard coach={c} accent={accent} />
          </div>
        ))}
      </div>
    </section>
  );
};

/* ───────────────────────────────────────────
   TESTIMONIALS
─────────────────────────────────────────── */
const testimonials = [
  {
    name: "JAMIE L.",
    base: "Soho Member · 8 months",
    quote:
      "I've tried every gym in London. WW Squad is the first place that actually feels like a community. The energy is unreal.",
    stars: 5,
  },
  {
    name: "PRIYA S.",
    base: "Shoreditch Member · 1 year",
    quote:
      "The coaches here are world-class. Sarah's HIIT sessions are legendary — I've never pushed harder or felt better.",
    stars: 5,
  },
  {
    name: "MARCUS D.",
    base: "Camden Member · 6 months",
    quote:
      "From the app to the recovery suite, every detail is obsessively designed. This isn't a gym. It's an experience.",
    stars: 5,
  },
];

const Testimonials = ({ accent }) => {
  const [idx, setIdx] = useState(0);
  const { w } = useWindowSize();
  const isMobile = w < 768;

  useEffect(() => {
    const iv = setInterval(
      () => setIdx((i) => (i + 1) % testimonials.length),
      5000,
    );
    return () => clearInterval(iv);
  }, []);

  const t = testimonials[idx];

  return (
    <section
      style={{
        padding: isMobile ? "72px 20px" : "100px 64px",
        background: C.bg,
        position: "relative",
      }}
    >
      {/* big quote mark bg */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'Inter Tight',sans-serif",
          fontSize: isMobile ? 300 : 440,
          fontWeight: 900,
          color: `${accent}04`,
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        "
      </div>

      <div
        style={{
          maxWidth: 780,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="ww-reveal">
          <span
            style={{
              fontFamily: "'Inter Tight',sans-serif",
              fontSize: 11,
              fontWeight: 600,
              color: accent,
              letterSpacing: ".22em",
            }}
          >
            THE SQUAD SPEAKS
          </span>
        </div>
        <div
          style={{
            marginTop: 44,
            minHeight: 180,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            animation: "ww-fadeIn .5s ease",
          }}
          key={idx}
        >
          <p
            style={{
              fontFamily: "'Tenor Sans',serif",
              fontSize: isMobile ? 18 : 22,
              color: C.white,
              lineHeight: 1.6,
              fontStyle: "italic",
              maxWidth: 680,
            }}
          >
            "{t.quote}"
          </p>
          <div
            style={{
              marginTop: 28,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: C.card,
                border: `2px solid ${accent}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Inter Tight',sans-serif",
                fontSize: 15,
                fontWeight: 800,
                color: accent,
              }}
            >
              {t.name[0]}
            </div>
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontFamily: "'Inter Tight',sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: C.white,
                }}
              >
                {t.name}
              </div>
              <div
                style={{
                  fontFamily: "'Tenor Sans',serif",
                  fontSize: 11,
                  color: C.slate,
                }}
              >
                {t.base}
              </div>
            </div>
          </div>
          {/* Stars */}
          <div style={{ marginTop: 14, display: "flex", gap: 4 }}>
            {[...Array(t.stars)].map((_, i) => (
              <span key={i} style={{ color: accent, fontSize: 14 }}>
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div
          style={{
            marginTop: 36,
            display: "flex",
            gap: 10,
            justifyContent: "center",
          }}
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              style={{
                width: i === idx ? 28 : 10,
                height: 10,
                borderRadius: 5,
                background: i === idx ? accent : "rgba(255,255,255,.12)",
                border: "none",
                cursor: "pointer",
                transition: "width .3s,background .3s",
                boxShadow: i === idx ? `0 0 8px ${accent}50` : "none",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ───────────────────────────────────────────
   CONTACT / CTA BAND
─────────────────────────────────────────── */
const CtaBand = ({ openJoin, accent }) => {
  const { w } = useWindowSize();
  const isMobile = w < 768;
  return (
    <section
      id="contact"
      style={{
        padding: isMobile ? "64px 20px" : "100px 64px",
        background: C.bg,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 50%,${accent}06 0%,transparent 65%)`,
          pointerEvents: "none",
        }}
      />
      <div
        className="ww-reveal"
        style={{
          maxWidth: 780,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
        }}
      >
        <h2
          style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: isMobile ? 36 : 56,
            fontWeight: 900,
            color: C.white,
            lineHeight: 1.05,
          }}
        >
          Ready to
          <br />
          <span style={{ color: accent }}>join the squad?</span>
        </h2>
        <p
          style={{
            fontFamily: "'Tenor Sans',serif",
            fontSize: isMobile ? 15 : 17,
            color: C.slateL,
            marginTop: 16,
            maxWidth: 480,
            margin: "16px auto 0",
            lineHeight: 1.65,
          }}
        >
          Become part of the movement. First session free. No contracts required
          to start.
        </p>
        <button
          onClick={openJoin}
          style={{
            marginTop: 36,
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: isMobile ? 13 : 15,
            fontWeight: 800,
            letterSpacing: ".18em",
            color: C.bg,
            background: accent,
            border: "none",
            borderRadius: 50,
            padding: isMobile ? "16px 40px" : "18px 52px",
            cursor: "pointer",
            boxShadow: `0 6px 40px ${accent}40`,
            transition: "transform .15s,box-shadow .15s",
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "scale(.96)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          JOIN THE SQUAD
        </button>
        <div
          style={{
            marginTop: 18,
            fontFamily: "'Tenor Sans',serif",
            fontSize: 12,
            color: C.slate,
          }}
        >
          Cancel anytime · No hidden fees · First session free
        </div>
      </div>
    </section>
  );
};

/* ───────────────────────────────────────────
   FOOTER
─────────────────────────────────────────── */
const Footer = () => {
  const { w } = useWindowSize();
  const isMobile = w < 768;
  const cols = [
    { title: "WW SQUAD", items: ["About Us", "Careers", "Press", "Blog"] },
    {
      title: "VISIT",
      items: ["Soho", "Shoreditch", "Notting Hill", "Camden", "Greenwich"],
    },
    {
      title: "SUPPORT",
      items: ["Help Center", "Membership FAQ", "Contact Us", "Privacy Policy"],
    },
  ];
  return (
    <footer
      style={{
        background: "#0a0a0a",
        borderTop: "1px solid rgba(255,255,255,.05)",
        padding: isMobile ? "48px 20px 32px" : "72px 64px 40px",
      }}
    >
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "2fr 1fr 1fr 1fr",
            gap: isMobile ? 32 : 48,
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: isMobile ? "1 / -1" : "auto" }}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 3,
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter Tight',sans-serif",
                  fontSize: 22,
                  fontWeight: 900,
                  color: C.lime,
                }}
              >
                WW
              </span>
              <span
                style={{
                  fontFamily: "'Inter Tight',sans-serif",
                  fontSize: 22,
                  fontWeight: 800,
                  color: C.white,
                  letterSpacing: ".16em",
                }}
              >
                SQUAD
              </span>
            </div>
            <p
              style={{
                fontFamily: "'Tenor Sans',serif",
                fontSize: 13,
                color: C.slate,
                lineHeight: 1.6,
                maxWidth: 280,
              }}
            >
              The end of average. A people-first fitness movement built for the
              modern era.
            </p>
            <div style={{ marginTop: 20, display: "flex", gap: 14 }}>
              {[
                { k: "IG" },
                { k: "TW" },
                { k: "TK" },
                { k: "YT" },
                { k: "WS", wa: true },
              ].map(({ k, wa }) => (
                <div
                  key={k}
                  onClick={() => {
                    if (wa) window.open(WA_URL, "_blank", "noopener");
                  }}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: C.card,
                    border: "1px solid rgba(255,255,255,.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Inter Tight',sans-serif",
                    fontSize: wa ? 14 : 10,
                    fontWeight: 700,
                    color: C.slateL,
                    cursor: "pointer",
                    transition: "border-color .2s,color .2s,background .2s",
                  }}
                  onMouseEnter={(e) => {
                    const c = wa ? WA_GREEN : C.lime;
                    e.currentTarget.style.borderColor = `${c}50`;
                    e.currentTarget.style.color = c;
                    if (wa) e.currentTarget.style.background = WA_GREEN_DIM;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,.08)";
                    e.currentTarget.style.color = C.slateL;
                    e.currentTarget.style.background = C.card;
                  }}
                >
                  {wa ? <WhatsAppIcon size={16} /> : k}
                </div>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <div
                style={{
                  fontFamily: "'Inter Tight',sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  color: C.slateL,
                  letterSpacing: ".18em",
                  marginBottom: 16,
                }}
              >
                {col.title}
              </div>
              {col.items.map((item) => (
                <div
                  key={item}
                  style={{
                    fontFamily: "'Tenor Sans',serif",
                    fontSize: 13,
                    color: C.slate,
                    padding: "5px 0",
                    cursor: "pointer",
                    transition: "color .2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = C.white)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = C.slate)}
                >
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: isMobile ? 40 : 56,
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,.06)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: "'Tenor Sans',serif",
              fontSize: 12,
              color: C.slate,
            }}
          >
            © 2026 WW SQUAD. All rights reserved.
          </span>
          <span
            style={{
              fontFamily: "'Tenor Sans',serif",
              fontSize: 12,
              color: C.slate,
            }}
          >
            London · Built for the movement.
          </span>
        </div>
      </div>
    </footer>
  );
};

/* ───────────────────────────────────────────
   MOBILE FAB  (JOIN · center bottom)
─────────────────────────────────────────── */
const FAB = ({ openJoin, accent }) => {
  const { w } = useWindowSize();
  if (w >= 768) return null;
  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 200,
      }}
    >
      <button
        onClick={openJoin}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "rgba(12,12,12,.92)",
          border: `1.5px solid ${accent}`,
          borderRadius: 50,
          padding: "13px 26px",
          cursor: "pointer",
          backdropFilter: "blur(16px)",
          boxShadow: `0 6px 28px rgba(0,0,0,.55),0 0 18px ${accent}35`,
          transition: "transform .15s",
        }}
        onMouseDown={(e) =>
          (e.currentTarget.style.transform = "translateX(-50%) scale(.95)")
        }
        onMouseUp={(e) =>
          (e.currentTarget.style.transform = "translateX(-50%) scale(1)")
        }
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: accent,
            boxShadow: `0 0 7px ${accent}`,
            animation: "ww-pulse 2s ease infinite",
          }}
        />
        <span
          style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: 11,
            fontWeight: 700,
            color: accent,
            letterSpacing: ".15em",
          }}
        >
          JOIN THE SQUAD
        </span>
      </button>
    </div>
  );
};

/* ───────────────────────────────────────────
   WHATSAPP BUBBLE  (all breakpoints · bottom-right)
─────────────────────────────────────────── */
const WA_GREEN = "#25c366";
const WA_GREEN_DIM = "rgba(37,195,102,.18)";
const WA_GREEN_GLOW = "rgba(37,195,102,.40)";
// ── swap in the real WW SQUAD number (digits only, inc. country code) ──
const WA_NUMBER = "447911123456";
const WA_MSG = encodeURIComponent(
  "Hi WW SQUAD 👋 I'd like to learn more about joining.",
);
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

const WhatsAppIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M20.4457 3.55431C18.2132 1.31972 15.2273 .111328 12.0576 .111328C5.46094 .111328 .0507813 5.52148 .0507813 12.1182C.0507813 14.2881 .607422 16.3926 1.66406 18.2539L0 24.1113L5.99414 22.4746C7.78516 23.4414 9.81641 23.9453 11.8789 23.9453H11.8848C18.4814 23.9453 23.8926 18.5352 23.8926 11.9385C23.8926 8.76855 22.6841 5.78262 20.4457 3.55431ZM11.8848 21.9375C10.0371 21.9375 8.22656 21.4531 6.63867 20.5371L6.22852 20.2949L2.71289 21.2734L3.69727 17.8359L3.4375 17.4121C2.4375 15.7676 1.90723 13.8867 1.90723 11.8652C1.90723 6.52148 6.25098 2.17285 11.8848 2.17285C14.6602 2.17285 17.2734 3.24512 19.2246 5.19629C21.1758 7.14746 22.2363 9.76074 22.2363 12.5363C22.2363 17.8809 17.8934 21.9375 11.8848 21.9375ZM17.8574 14.7656C17.5488 14.6113 16.0918 13.8535 15.8027 13.7441C15.5137 13.6348 15.3086 13.5801 15.1035 13.8887C14.8984 14.1973 14.2852 14.8574 14.1055 15.0625C13.9258 15.2676 13.7461 15.2949 13.4375 15.1406C13.1289 14.9863 12.166 14.6738 11.0254 13.6465C10.1309 12.8359 9.54102 11.8457 9.36133 11.5371C9.18164 11.2285 9.3438 11.0508 9.49805 10.8984C9.63672 10.7617 9.80664 10.5488 9.96094 10.3691C10.1152 10.1895 10.168 10.0645 10.2773 9.86523C10.3867 9.66602 10.332 9.48633 10.2773 9.33203C10.168 9.03711 9.37305 7.11914 9.08398 6.42969C8.79492 5.75781 8.51855 5.83691 8.31445 5.82715C8.1348 5.82031 7.94727 5.81348 7.76758 5.81348C7.5879 5.81348 7.27930 5.87988 7.01367 6.14844C6.72461 6.44531 5.79102 7.48535 5.79102 8.90039C5.79102 10.3154 6.74805 11.6826 6.89648 11.8848C7.04492 12.0869 9.08789 15.2949 12.2734 16.8496C13.3008 17.3535 14.1055 17.6621 14.7344 17.8926C15.8066 18.2734 16.7803 18.2324 17.5664 18.2051C18.4453 18.1738 20.2852 17.2129 20.6309 16.1621C20.9766 15.1113 20.9766 14.2148 20.8652 14.0352C20.7539 13.8809 20.5664 13.7949 20.2578 13.6406L17.8574 14.7656Z"
      fill="currentColor"
    />
  </svg>
);

const WhatsAppBubble = () => {
  const [hovered, setHovered] = useState(false);
  const { w } = useWindowSize();
  const isMobile = w < 768;

  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with WW SQUAD on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        bottom: 28,
        right: isMobile ? 22 : 28,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        gap: hovered && !isMobile ? 10 : 0,
        background: "rgba(12,12,12,.92)",
        border: `1.5px solid ${hovered ? WA_GREEN : "rgba(37,195,102,.35)"}`,
        borderRadius: 50,
        padding: isMobile ? "12px" : hovered ? "13px 22px 13px 14px" : "14px",
        cursor: "pointer",
        backdropFilter: "blur(16px)",
        boxShadow: `0 6px 28px rgba(0,0,0,.55), 0 0 18px ${hovered ? WA_GREEN_GLOW : "rgba(37,195,102,.2)"}`,
        transition: "all .3s cubic-bezier(.4,0,.2,1)",
        textDecoration: "none",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      {/* Pulse ring */}
      <span
        style={{
          position: "absolute",
          inset: -3,
          borderRadius: "50%",
          border: `2px solid ${WA_GREEN}`,
          opacity: hovered ? 0 : 0.45,
          animation: "ww-ping 2.4s ease infinite",
          pointerEvents: "none",
          transition: "opacity .3s",
        }}
      />

      {/* Icon */}
      <span
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: WA_GREEN,
          flexShrink: 0,
          transition: "transform .3s",
          transform: hovered && !isMobile ? "scale(1.08)" : "scale(1)",
        }}
      >
        <WhatsAppIcon size={isMobile ? 22 : 21} />
      </span>

      {/* Label – slides open on desktop hover only */}
      {!isMobile && (
        <span
          style={{
            position: "relative",
            zIndex: 1,
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: 11,
            fontWeight: 700,
            color: WA_GREEN,
            letterSpacing: ".13em",
            maxWidth: hovered ? 110 : 0,
            opacity: hovered ? 1 : 0,
            overflow: "hidden",
            transition:
              "max-width .35s cubic-bezier(.4,0,.2,1), opacity .25s ease",
            whiteSpace: "nowrap",
          }}
        >
          CHAT WITH US
        </span>
      )}
    </a>
  );
};

/* ───────────────────────────────────────────
   JOIN FLOW MODAL
─────────────────────────────────────────── */
const squadLevels = [
  {
    id: "recruit",
    label: "RECRUIT",
    sub: "Basic Access",
    price: 29,
    perks: ["Single Club", "Group Classes", "App Access"],
    color: C.slateL,
  },
  {
    id: "elite",
    label: "ELITE",
    sub: "Multi-Club + Guests",
    price: 59,
    perks: ["All Clubs", "Guest Passes", "Priority Booking"],
    color: C.lime,
    popular: true,
  },
  {
    id: "commander",
    label: "COMMANDER",
    sub: "Full Command",
    price: 99,
    perks: [
      "Everything in Elite",
      "Personal Training",
      "Recovery Suite",
      "VIP Events",
    ],
    color: C.gold,
  },
];
const addonOptions = [
  { id: "pt", label: "Personal Training Starter", price: 45, icon: "🏋️" },
  { id: "locker", label: "Locker Rental", price: 12, icon: "🔒" },
  {
    id: "recovery",
    label: "Recovery Pro (Sauna + Cold Plunge)",
    price: 28,
    icon: "❄️",
  },
  {
    id: "health",
    label: "Sync Apple Health / Google Fit",
    price: 0,
    icon: "📱",
  },
];

const JoinModal = ({ onClose }) => {
  const [step, setStep] = useState(0); // 0 = intro pulse
  const [selectedLevel, setSelectedLevel] = useState("elite");
  const [addons, setAddons] = useState([]);
  const [confirmed, setConfirmed] = useState(false);
  const [introOpacity, setIntroOpacity] = useState(1);
  const { w } = useWindowSize();
  const isMobile = w < 768;

  useEffect(() => {
    if (step === 0) {
      const t1 = setTimeout(() => setIntroOpacity(0), 2100);
      const t2 = setTimeout(() => setStep(1), 2800);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [step]);

  const toggleAddon = (id) =>
    setAddons((p) => (p.includes(id) ? p.filter((a) => a !== id) : [...p, id]));
  const basePrice = squadLevels.find((l) => l.id === selectedLevel)?.price || 0;
  const addonTotal = addons.reduce(
    (s, a) => s + (addonOptions.find((o) => o.id === a)?.price || 0),
    0,
  );
  const total = basePrice + addonTotal;

  const pad = isMobile ? "0 22px" : "0 40px";
  const btnStyle = (color = C.lime) => ({
    width: "100%",
    padding: "15px",
    background: color,
    border: "none",
    borderRadius: 50,
    fontFamily: "'Inter Tight',sans-serif",
    fontSize: 13,
    fontWeight: 800,
    color: C.bg,
    letterSpacing: ".16em",
    cursor: "pointer",
    boxShadow: `0 5px 28px ${color}45`,
    transition: "transform .15s,box-shadow .15s",
  });

  /* ── INTRO PULSE ── */
  if (step === 0)
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 500,
          background: C.bg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: introOpacity,
          transition: "opacity 1s ease",
        }}
      >
        <div
          style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: 52,
            fontWeight: 900,
            color: C.lime,
            letterSpacing: "-.01em",
            animation: "ww-pulse 1.4s ease infinite",
            textShadow: `0 0 40px ${C.limeGlow}`,
          }}
        >
          WW
        </div>
        <div
          style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: 52,
            fontWeight: 800,
            color: C.white,
            letterSpacing: ".18em",
            animation: "ww-pulse 1.4s ease .2s infinite",
          }}
        >
          SQUAD
        </div>
        <div
          style={{
            marginTop: 22,
            width: 3,
            height: 36,
            background: C.lime,
            borderRadius: 2,
            animation: "ww-heartbeat 1.4s ease infinite",
            boxShadow: `0 0 14px ${C.lime}`,
          }}
        />
      </div>
    );

  /* ── CONFIRMED ── */
  if (confirmed)
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 500,
          background: C.bg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
        }}
      >
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: "50%",
            background: `${C.lime}12`,
            border: `2.5px solid ${C.lime}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 50px ${C.limeGlow}`,
            marginBottom: 28,
          }}
        >
          <span style={{ fontSize: 40, color: C.lime }}>✓</span>
        </div>
        <h2
          style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: isMobile ? 28 : 34,
            fontWeight: 900,
            color: C.white,
            textAlign: "center",
            lineHeight: 1.15,
          }}
        >
          WELCOME TO
          <br />
          <span style={{ color: C.lime }}>THE SQUAD</span>
        </h2>
        <p
          style={{
            fontFamily: "'Tenor Sans',serif",
            fontSize: 15,
            color: C.slate,
            marginTop: 14,
            textAlign: "center",
            lineHeight: 1.6,
            maxWidth: 360,
          }}
        >
          Your {squadLevels.find((l) => l.id === selectedLevel)?.label}{" "}
          membership is confirmed. Let's go.
        </p>
        <button
          onClick={onClose}
          style={{ ...btnStyle(), marginTop: 36, maxWidth: 280 }}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(.96)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          BACK TO HOME
        </button>
      </div>
    );

  /* ── STEPS 1-4 ── */
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        background: C.bg,
        overflowY: "auto",
        animation: "ww-slideUp .38s cubic-bezier(.4,0,.2,1)",
      }}
    >
      {/* Header bar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 2,
          background: C.bg,
          padding: isMobile ? "16px 22px 12px" : "20px 40px 14px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Progress dots */}
        <div style={{ display: "flex", gap: 6 }}>
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              style={{
                width: s < step ? 30 : 8,
                height: 3,
                borderRadius: 2,
                background: s < step ? C.lime : "rgba(255,255,255,.1)",
                transition: "width .4s ease,background .4s ease",
                boxShadow: s < step ? `0 0 7px ${C.lime}50` : "none",
              }}
            />
          ))}
        </div>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: C.slate,
            fontSize: 22,
            cursor: "pointer",
            lineHeight: 1,
            padding: "2px 6px",
            transition: "color .2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = C.white)}
          onMouseLeave={(e) => (e.currentTarget.style.color = C.slate)}
        >
          ✕
        </button>
      </div>

      <div style={{ padding: `12px ${isMobile ? "22px" : "40px"} 100px` }}>
        {/* ── STEP 1 · Squad Base ── */}
        {step === 1 && (
          <div
            style={{
              animation: "ww-fadeUp .45s ease",
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            <div
              style={{
                fontFamily: "'Inter Tight',sans-serif",
                fontSize: 11,
                fontWeight: 600,
                color: C.lime,
                letterSpacing: ".2em",
              }}
            >
              STEP 01 · YOUR SQUAD BASE
            </div>
            <h3
              style={{
                fontFamily: "'Inter Tight',sans-serif",
                fontSize: isMobile ? 28 : 34,
                fontWeight: 900,
                color: C.white,
                marginTop: 10,
                lineHeight: 1.1,
              }}
            >
              Find your
              <br />
              <span style={{ color: C.lime }}>home base.</span>
            </h3>
            <p
              style={{
                fontFamily: "'Tenor Sans',serif",
                fontSize: 13,
                color: C.slate,
                marginTop: 8,
              }}
            >
              GPS detected your location.
            </p>

            {/* Map card */}
            <div
              style={{
                marginTop: 24,
                background: C.card,
                borderRadius: 22,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,.07)",
              }}
            >
              <div
                style={{
                  height: 160,
                  background:
                    "linear-gradient(140deg,#161a16 0%,#0e120e 50%,#121618 100%)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Grid lines */}
                <svg
                  width="100%"
                  height="100%"
                  style={{ position: "absolute", inset: 0, opacity: 0.28 }}
                >
                  {[...Array(9)].map((_, i) => (
                    <line
                      key={`h${i}`}
                      x1="0"
                      y1={i * 21}
                      x2="100%"
                      y2={i * 21}
                      stroke="#2d3748"
                      strokeWidth=".6"
                    />
                  ))}
                  {[...Array(14)].map((_, i) => (
                    <line
                      key={`v${i}`}
                      x1={i * 38}
                      y1="0"
                      x2={i * 38}
                      y2="100%"
                      stroke="#2d3748"
                      strokeWidth=".6"
                    />
                  ))}
                </svg>
                {/* Roads */}
                <svg
                  width="100%"
                  height="100%"
                  style={{ position: "absolute", inset: 0 }}
                >
                  <line
                    x1="15%"
                    y1="100%"
                    x2="72%"
                    y2="0%"
                    stroke="#3a4555"
                    strokeWidth="3.5"
                  />
                  <line
                    x1="0%"
                    y1="55%"
                    x2="65%"
                    y2="55%"
                    stroke="#3a4555"
                    strokeWidth="2.2"
                  />
                  <line
                    x1="40%"
                    y1="100%"
                    x2="90%"
                    y2="20%"
                    stroke="#2f3a48"
                    strokeWidth="2"
                  />
                </svg>
                {/* Pin */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "42%",
                    transform: "translate(-50%,-50%)",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: `${C.lime}1a`,
                      border: `2px solid ${C.lime}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 0 20px ${C.limeGlow}`,
                      animation: "ww-ping 2.2s ease infinite",
                    }}
                  >
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: C.lime,
                        boxShadow: `0 0 8px ${C.lime}`,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div style={{ padding: "18px 20px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'Inter Tight',sans-serif",
                        fontSize: 16,
                        fontWeight: 800,
                        color: C.white,
                      }}
                    >
                      WW SQUAD · Soho
                    </div>
                    <div
                      style={{
                        fontFamily: "'Tenor Sans',serif",
                        fontSize: 12,
                        color: C.slate,
                        marginTop: 3,
                      }}
                    >
                      27 Wardour Street, London W1
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: "'Inter Tight',sans-serif",
                      fontSize: 10,
                      fontWeight: 700,
                      color: C.lime,
                      background: C.limeDim,
                      padding: "4px 11px",
                      borderRadius: 50,
                      letterSpacing: ".1em",
                    }}
                  >
                    0.4 MI
                  </span>
                </div>
                <div
                  style={{
                    marginTop: 14,
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  {["24/7", "Sauna", "Pool", "Cold Plunge", "+12"].map(
                    (tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "'Inter Tight',sans-serif",
                          fontSize: 9.5,
                          fontWeight: 600,
                          color: C.slateL,
                          background: "rgba(255,255,255,.06)",
                          padding: "5px 10px",
                          borderRadius: 7,
                          letterSpacing: ".08em",
                        }}
                      >
                        {tag}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              style={{ ...btnStyle(), marginTop: 24 }}
              onMouseDown={(e) =>
                (e.currentTarget.style.transform = "scale(.96)")
              }
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              CONFIRM · SOHO BASE →
            </button>
          </div>
        )}

        {/* ── STEP 2 · Squad Level ── */}
        {step === 2 && (
          <div
            style={{
              animation: "ww-fadeUp .45s ease",
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            <div
              style={{
                fontFamily: "'Inter Tight',sans-serif",
                fontSize: 11,
                fontWeight: 600,
                color: C.lime,
                letterSpacing: ".2em",
              }}
            >
              STEP 02 · SQUAD LEVEL
            </div>
            <h3
              style={{
                fontFamily: "'Inter Tight',sans-serif",
                fontSize: isMobile ? 28 : 34,
                fontWeight: 900,
                color: C.white,
                marginTop: 10,
                lineHeight: 1.1,
              }}
            >
              Choose your
              <br />
              <span style={{ color: C.lime }}>rank.</span>
            </h3>

            <div
              style={{
                marginTop: 24,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {squadLevels.map((lvl) => {
                const active = selectedLevel === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    onClick={() => setSelectedLevel(lvl.id)}
                    style={{
                      background: active ? `${lvl.color}0d` : C.card,
                      border: `1.5px solid ${active ? lvl.color : "rgba(255,255,255,.07)"}`,
                      borderRadius: 18,
                      padding: "18px 20px",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all .3s cubic-bezier(.4,0,.2,1)",
                      boxShadow: active ? `0 0 24px ${lvl.color}22` : "none",
                      position: "relative",
                    }}
                  >
                    {lvl.popular && (
                      <span
                        style={{
                          position: "absolute",
                          top: -11,
                          right: 18,
                          fontFamily: "'Inter Tight',sans-serif",
                          fontSize: 9,
                          fontWeight: 800,
                          color: C.bg,
                          background: C.lime,
                          padding: "3px 12px",
                          borderRadius: 50,
                          letterSpacing: ".14em",
                          boxShadow: `0 2px 12px ${C.limeGlow}`,
                        }}
                      >
                        MOST POPULAR
                      </span>
                    )}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily: "'Inter Tight',sans-serif",
                            fontSize: 17,
                            fontWeight: 800,
                            color: active ? lvl.color : C.white,
                            letterSpacing: ".1em",
                            transition: "color .3s",
                          }}
                        >
                          {lvl.label}
                        </div>
                        <div
                          style={{
                            fontFamily: "'Tenor Sans',serif",
                            fontSize: 12,
                            color: C.slate,
                            marginTop: 2,
                          }}
                        >
                          {lvl.sub}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span
                          style={{
                            fontFamily: "'Inter Tight',sans-serif",
                            fontSize: 26,
                            fontWeight: 900,
                            color: active ? lvl.color : C.white,
                          }}
                        >
                          £{lvl.price}
                        </span>
                        <span
                          style={{
                            fontFamily: "'Tenor Sans',serif",
                            fontSize: 11,
                            color: C.slate,
                          }}
                        >
                          /mo
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        marginTop: 14,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 7,
                      }}
                    >
                      {lvl.perks.map((p) => (
                        <span
                          key={p}
                          style={{
                            fontFamily: "'Inter Tight',sans-serif",
                            fontSize: 9.5,
                            fontWeight: 600,
                            color: active ? lvl.color : C.slateL,
                            background: active
                              ? `${lvl.color}12`
                              : "rgba(255,255,255,.06)",
                            padding: "5px 10px",
                            borderRadius: 7,
                            letterSpacing: ".07em",
                            transition: "all .3s",
                          }}
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setStep(3)}
              style={{ ...btnStyle(), marginTop: 26 }}
              onMouseDown={(e) =>
                (e.currentTarget.style.transform = "scale(.96)")
              }
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              CONTINUE →
            </button>
          </div>
        )}

        {/* ── STEP 3 · Add-ons ── */}
        {step === 3 && (
          <div
            style={{
              animation: "ww-fadeUp .45s ease",
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            <div
              style={{
                fontFamily: "'Inter Tight',sans-serif",
                fontSize: 11,
                fontWeight: 600,
                color: C.lime,
                letterSpacing: ".2em",
              }}
            >
              STEP 03 · LEVEL UP
            </div>
            <h3
              style={{
                fontFamily: "'Inter Tight',sans-serif",
                fontSize: isMobile ? 28 : 34,
                fontWeight: 900,
                color: C.white,
                marginTop: 10,
                lineHeight: 1.1,
              }}
            >
              Stack your
              <br />
              <span style={{ color: C.lime }}>edge.</span>
            </h3>
            <p
              style={{
                fontFamily: "'Tenor Sans',serif",
                fontSize: 13,
                color: C.slate,
                marginTop: 8,
              }}
            >
              Optional add-ons. Tap to include.
            </p>

            <div
              style={{
                marginTop: 22,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {addonOptions.map((addon) => {
                const active = addons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: active ? `${C.lime}0a` : C.card,
                      border: `1.5px solid ${active ? C.lime : "rgba(255,255,255,.07)"}`,
                      borderRadius: 16,
                      padding: "15px 18px",
                      cursor: "pointer",
                      transition: "all .25s ease",
                      boxShadow: active ? `0 0 16px ${C.limeGlow}` : "none",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 14 }}
                    >
                      <span style={{ fontSize: 22 }}>{addon.icon}</span>
                      <div style={{ textAlign: "left" }}>
                        <div
                          style={{
                            fontFamily: "'Inter Tight',sans-serif",
                            fontSize: 14,
                            fontWeight: 700,
                            color: active ? C.lime : C.white,
                            transition: "color .25s",
                          }}
                        >
                          {addon.label}
                        </div>
                        <div
                          style={{
                            fontFamily: "'Tenor Sans',serif",
                            fontSize: 11,
                            color: addon.price === 0 ? C.lime : C.slate,
                            marginTop: 2,
                          }}
                        >
                          {addon.price > 0
                            ? `+£${addon.price}/mo`
                            : "Free · Personalizes your dashboard"}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        flexShrink: 0,
                        background: active ? C.lime : "transparent",
                        border: `2px solid ${active ? C.lime : "rgba(255,255,255,.2)"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all .25s ease",
                        boxShadow: active ? `0 0 10px ${C.limeGlow}` : "none",
                      }}
                    >
                      <span
                        style={{
                          color: active ? C.bg : C.slate,
                          fontWeight: 800,
                          fontSize: active ? 15 : 17,
                        }}
                      >
                        {active ? "✓" : "+"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setStep(4)}
              style={{ ...btnStyle(), marginTop: 26 }}
              onMouseDown={(e) =>
                (e.currentTarget.style.transform = "scale(.96)")
              }
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              REVIEW ORDER →
            </button>
          </div>
        )}

        {/* ── STEP 4 · Confirm ── */}
        {step === 4 && (
          <div
            style={{
              animation: "ww-fadeUp .45s ease",
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            <div
              style={{
                fontFamily: "'Inter Tight',sans-serif",
                fontSize: 11,
                fontWeight: 600,
                color: C.lime,
                letterSpacing: ".2em",
              }}
            >
              REVIEW
            </div>
            <h3
              style={{
                fontFamily: "'Inter Tight',sans-serif",
                fontSize: isMobile ? 28 : 34,
                fontWeight: 900,
                color: C.white,
                marginTop: 10,
                lineHeight: 1.1,
              }}
            >
              Your <span style={{ color: C.lime }}>Squad</span> summary.
            </h3>

            <div
              style={{
                marginTop: 24,
                background: C.card,
                borderRadius: 22,
                border: "1px solid rgba(255,255,255,.07)",
                overflow: "hidden",
              }}
            >
              {/* Base row */}
              <div
                style={{
                  padding: "16px 20px",
                  borderBottom: "1px solid rgba(255,255,255,.06)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'Inter Tight',sans-serif",
                      fontSize: 13,
                      fontWeight: 700,
                      color: C.white,
                    }}
                  >
                    Squad Base
                  </div>
                  <div
                    style={{
                      fontFamily: "'Tenor Sans',serif",
                      fontSize: 12,
                      color: C.slate,
                    }}
                  >
                    WW SQUAD · Soho
                  </div>
                </div>
                <span style={{ color: C.lime, fontSize: 16 }}>✓</span>
              </div>
              {/* Level row */}
              <div
                style={{
                  padding: "16px 20px",
                  borderBottom: "1px solid rgba(255,255,255,.06)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'Inter Tight',sans-serif",
                      fontSize: 13,
                      fontWeight: 700,
                      color: C.white,
                    }}
                  >
                    Squad Level
                  </div>
                  <div
                    style={{
                      fontFamily: "'Tenor Sans',serif",
                      fontSize: 12,
                      color: C.slate,
                    }}
                  >
                    {squadLevels.find((l) => l.id === selectedLevel)?.sub}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: "'Inter Tight',sans-serif",
                      fontSize: 14,
                      fontWeight: 800,
                      color: squadLevels.find((l) => l.id === selectedLevel)
                        ?.color,
                    }}
                  >
                    {squadLevels.find((l) => l.id === selectedLevel)?.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter Tight',sans-serif",
                      fontSize: 13,
                      color: C.slateL,
                    }}
                  >
                    £{basePrice}/mo
                  </div>
                </div>
              </div>
              {/* Add-ons */}
              {addons.length > 0 && (
                <div
                  style={{
                    padding: "16px 20px",
                    borderBottom: "1px solid rgba(255,255,255,.06)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Inter Tight',sans-serif",
                      fontSize: 12,
                      fontWeight: 600,
                      color: C.slateL,
                      marginBottom: 10,
                    }}
                  >
                    ADD-ONS
                  </div>
                  {addons.map((id) => {
                    const a = addonOptions.find((o) => o.id === id);
                    return (
                      <div
                        key={id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "4px 0",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Tenor Sans',serif",
                            fontSize: 13,
                            color: C.slateL,
                          }}
                        >
                          {a.icon} {a.label}
                        </span>
                        <span
                          style={{
                            fontFamily: "'Inter Tight',sans-serif",
                            fontSize: 13,
                            fontWeight: 600,
                            color: C.slateL,
                          }}
                        >
                          {a.price > 0 ? `£${a.price}` : "Free"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
              {/* Total */}
              <div style={{ padding: "20px", background: `${C.lime}06` }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter Tight',sans-serif",
                      fontSize: 14,
                      fontWeight: 700,
                      color: C.white,
                      letterSpacing: ".1em",
                    }}
                  >
                    TOTAL / MONTH
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter Tight',sans-serif",
                      fontSize: 32,
                      fontWeight: 900,
                      color: C.lime,
                    }}
                  >
                    £{total}
                    <span
                      style={{ fontSize: 14, color: C.slate, fontWeight: 600 }}
                    >
                      /mo
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setConfirmed(true)}
              style={{
                ...btnStyle(),
                marginTop: 26,
                padding: "17px",
                fontSize: 15,
              }}
              onMouseDown={(e) =>
                (e.currentTarget.style.transform = "scale(.96)")
              }
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              JOIN THE SQUAD
            </button>
            <div
              style={{
                textAlign: "center",
                marginTop: 16,
                fontFamily: "'Tenor Sans',serif",
                fontSize: 12,
                color: C.slate,
              }}
            >
              Cancel anytime · No hidden fees
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ───────────────────────────────────────────
   ROOT APP
─────────────────────────────────────────── */
export default function WWSquad() {
  const [joinOpen, setJoinOpen] = useState(false);
  const [accent, setAccent] = useState(C.lime);

  useScrollReveal();

  return (
    <>
      <GlobalStyles />
      <Grain />

      <Nav openJoin={() => setJoinOpen(true)} />
      <Hero openJoin={() => setJoinOpen(true)} />
      <Ticker />
      <VibeGrid accent={accent} setAccent={setAccent} />
      <WhySection accent={accent} />
      <CoachesSection accent={accent} />
      <Testimonials accent={accent} />
      <CtaBand openJoin={() => setJoinOpen(true)} accent={accent} />
      <Footer />

      <FAB openJoin={() => setJoinOpen(true)} accent={accent} />
      <WhatsAppBubble />

      {joinOpen && <JoinModal onClose={() => setJoinOpen(false)} />}
    </>
  );
}
