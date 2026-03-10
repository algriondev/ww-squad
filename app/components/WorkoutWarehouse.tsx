"use client";

import { useState, useEffect, useRef, useCallback, memo, lazy, Suspense } from "react";
import Footer from './Footer';
import CoachesSection from './CoachesSection';
import VibeGrid from './VibeGrid';

/* ───────────────────────────────────────────
   DESIGN TOKENS — WORKOUT WAREHOUSE REBRAND
─────────────────────────────────────────── */
const LoadingScreen = () => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setOpacity(0), 100);
    return () => clearTimeout(timer);
  }, []);

  if (opacity === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#000000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        transition: "opacity 0.5s ease",
        pointerEvents: opacity === 0 ? "none" : "auto",
      }}
    >
      <div
        style={{
          fontFamily: "'Inter Tight',sans-serif",
          fontSize: 52,
          fontWeight: 900,
          color: "#b366cc",
          letterSpacing: "-.01em",
          animation: "ww-pulse 1.4s ease infinite",
          textShadow: "0 0 40px rgba(179,102,204,0.45)",
        }}
      >
        WORKOUT
      </div>
      <div
        style={{
          fontFamily: "'Inter Tight',sans-serif",
          fontSize: 52,
          fontWeight: 800,
          color: "#f0f0f0",
          letterSpacing: ".18em",
        }}
      >
        WAREHOUSE
      </div>
      <div
        style={{
          marginTop: 22,
          width: 3,
          height: 36,
          background: "#b366cc",
          borderRadius: 2,
          animation: "ww-heartbeat 1.4s ease infinite",
          boxShadow: "0 0 14px #b366cc",
        }}
      />
    </div>
  );
};
const C = {
  bg: "#000000", // Pure black (from brand images)
  card: "#0d0d0d", // Slightly lifted black for cards
  cardUp: "#1a1a1a", // Elevated cards
  primary: "#b366cc", // Brand magenta-purple (main accent)
  primaryDim: "rgba(179,102,204,0.13)",
  primaryGlow: "rgba(179,102,204,0.45)",
  yellow: "#e6ff00", // Highlight yellow (used in "STUDENT OFFER" etc)
  yellowDim: "rgba(230,255,0,0.12)",
  slate: "#5c6370", // Muted text
  slateL: "#9ca3af", // Light muted text
  white: "#f0f0f0", // Off-white for readability
  red: "#e83e3e", // Vibe tile: STRENGTH
  blue: "#5ba3d9", // Vibe tile: ZEN
  orange: "#ff8c42", // Vibe tile: SWEAT
  ice: "#7ecfe3", // Vibe tile: RECOVERY
  gold: "#f0c040", // Reserved for premium tier (if needed)
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
      @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;800;900&family=Tenor+Sans&display=swap');
      @keyframes ww-ping{0%{box-shadow:0 0 0 0 rgba(204,255,0,.45)}70%{box-shadow:0 0 0 14px rgba(204,255,0,0)}100%{box-shadow:0 0 0 0 rgba(204,255,0,0)}}
      @keyframes ww-spin{to{transform:rotate(360deg)}}
      @media (prefers-reduced-motion: reduce) {
        * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
      }
    `;
    document.head.appendChild(el);
  }, []);
  return null;
};

/* ───────────────────────────────────────────
   HOOK: SCROLL REVEAL
─────────────────────────────────────────── */
function useScrollReveal() {
  // Observer disabled - all content visible immediately
  // This prevents jank from callback fires during scroll
}

/* ───────────────────────────────────────────
   HOOK: WINDOW SIZE
─────────────────────────────────────────── */
function useWindowSize() {
  const [size, setSize] = useState({ w: 1200 });
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
const Grain = memo(() => (
  <svg
    className="ww-grain"
    style={{
      width: "100%",
      height: "100%",
      willChange: "opacity",
    }}
  >
    <filter id="ww-grain-f">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.72"
        numOctaves="3"
        stitchTiles="stitch"
      />
    </filter>
    <rect width="100%" height="100%" filter="url(#ww-grain-f)" />
  </svg>
));

/* ───────────────────────────────────────────
   TICKER
─────────────────────────────────────────── */
const tickerData = [
  "412 SQUAD MEMBERS TRAINING NOW",
  "COACH LINET· 'HARDCORE HIIT' — SOHO · 12 SPOTS LEFT",
  "98% PEAK PERFORMANCE REACHED TODAY",
  "RECOVERY PRO SESSIONS LIVE IN SHOREDITCH",
  "SQUAD RECORD BROKEN — 6:14 AM BRUTAL THURSDAY",
  "NEW COACH Barrack JOINS SHOREDITCH BASE",
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
              background: C.primary,
              boxShadow: `0 0 7px ${C.primary}`,
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

const CurrentOffers = memo(() => {
  const { w } = useWindowSize();
  const isMobile = w < 768;
  return (
    <section
      style={{
        padding: isMobile ? "40px 20px" : "50px 64px",
        background: C.card,
        color: C.white,
      }}
    >
      <div style={{ maxWidth: 1140, margin: "0 auto", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: isMobile ? 28 : 36,
            fontWeight: 900,
            marginBottom: isMobile ? 16 : 24,
          }}
        >
          Current Offers
        </h2>
        <p
          style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: isMobile ? 14 : 16,
            color: C.slateL,
            maxWidth: 720,
            margin: "0 auto",
            lineHeight: 1.5,
          }}
        >
          Catch our latest promotions and limited time deals here – from
          February Offers, Our annual anniversary offers, Black November, just to mention a few.
        </p>
      </div>
    </section>
  );
});

const FaqSection = memo(() => {
  const { w } = useWindowSize();
  const isMobile = w < 768;
  const faqs = [
    {
      q: "What are your opening hours?",
      a: "We're open 5am-9:30 PM Monday-Friday, 7am-5pm on Sartudays and 7am-3pm on Sundays",
    },
    {
      q: "How can I cancel or freeze my membership?",
      a: "Log into your account or contact support 30 days prior to billing.",
    },
    {
      q: "Do you offer student discounts?",
      a: "Yes, we have reduced rates for students. See the pricing tab above.",
    },
  ];
  return (
    <section
      id="faq"
      style={{
        padding: isMobile ? "40px 20px" : "50px 64px",
        background: C.bg,
        color: C.white,
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: isMobile ? 28 : 36,
            fontWeight: 900,
            textAlign: "center",
            marginBottom: isMobile ? 24 : 32,
          }}
        >
          Frequently Asked Questions
        </h2>
        <dl>
          {faqs.map((item, i) => (
            <div key={i} style={{ marginBottom: isMobile ? 16 : 24 }}>
              <dt
                style={{
                  fontFamily: "'Inter Tight',sans-serif",
                  fontSize: isMobile ? 16 : 18,
                  fontWeight: 700,
                }}
              >
                {item.q}
              </dt>
              <dd
                style={{
                  fontFamily: "'Inter Tight',sans-serif",
                  fontSize: isMobile ? 14 : 16,
                  color: C.slateL,
                  marginTop: 4,
                }}
              >
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
});

/* ───────────────────────────────────────────
   NAV
─────────────────────────────────────────── */
const navLinks = ["HOME", "EXPLORE", "COACHES", "JOIN", "CONTACT"];
const Nav = ({ openJoin }: { openJoin: () => void }) => {
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
          backdropFilter: "none",
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
        <img
          src="/media/ww-logo.webp"
          alt="Workout Warehouse logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            height: isMobile ? 48 : 64,
            cursor: "pointer",
            transition: "opacity .3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        />

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
            {navLinks.map((l) => (
              <button
                key={l}
                onClick={() => {
                  if (l === "JOIN") openJoin();
                  else {
                    const map: Record<string, number | undefined> = {
                      HOME: 0,
                      EXPLORE: document.getElementById("explore")?.offsetTop,
                      COACHES: document.getElementById("coaches")?.offsetTop,
                      CONTACT: document.getElementById("contact")?.offsetTop,
                    };
                    window.scrollTo({
                      top: (map[l] as number) || 0,
                      behavior: "smooth",
                    });
                  }
                }}
                style={{
                  background: "none",
                  border: "none",
                  fontFamily: "'Inter Tight',sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: ".18em",
                  color: l === "JOIN" ? C.primary : C.slateL,
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
                      border: `1px solid ${C.primary}`,
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
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
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
                background: menuOpen ? C.primary : C.white,
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
                background: menuOpen ? C.primary : C.white,
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
                background: menuOpen ? C.primary : C.white,
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
            background: "rgba(12,12,12,.94)",
            backdropFilter: "none",
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
                  const map: Record<string, number | undefined> = {
                    EXPLORE: document.getElementById("explore")?.offsetTop,
                    COACHES: document.getElementById("coaches")?.offsetTop,
                    CONTACT: document.getElementById("contact")?.offsetTop,
                  };
                  const scrollTop = l in map ? (map[l] as number) : 0;
                  window.scrollTo({
                    top: scrollTop || 0,
                    behavior: "smooth",
                  });
                }
              }}
              style={{
                background: "none",
                border: "none",
                fontFamily: "'Inter Tight',sans-serif",
                fontSize: 28,
                fontWeight: 800,
                color: l === "JOIN" ? C.primary : C.white,
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
const Hero = ({ openJoin }: { openJoin: () => void }) => {
  const { w } = useWindowSize();
  const isMobile = w < 768;
  const py = 0; // Parallax disabled for performance

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
      {/* Hero Video Background */}
      <video
        key="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/media/hero-poster.webp"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
        }}
      >
        {/* Browser tries WebM FIRST (smaller) */}
        <source src="/media/hero.webm" type="video/webm" />
        
        {/* If WebM not supported, use MP4 */}
        <source src="/media/hero.mp4" type="video/mp4" />
      </video>

      {/* Layered cinematic bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(155deg,#0d100f 0%,#111210 30%,#0c0e12 60%,#0c0c0c 100%)",
          zIndex: 0,
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
            color: C.primary,
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
              background: C.primary,
              boxShadow: `0 0 8px ${C.primary}`,
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
              color: C.primary,
              display: "block",
              textShadow: `0 0 60px ${C.primaryGlow}`,
            }}
          >
            WORKOUT
          </span>
          <span style={{ display: "block" }}>WAREHOUSE</span>
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
          Fitness&nbsp;|&nbsp;Wellness&nbsp;|&nbsp;Lifestyle
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
              background: C.primary,
              border: "none",
              borderRadius: 50,
              padding: isMobile ? "14px 32px" : "16px 40px",
              cursor: "pointer",
              boxShadow: `0 6px 36px ${C.primaryGlow}`,
              transition: "transform .15s,box-shadow .15s",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "scale(.96)";
              e.currentTarget.style.boxShadow = `0 2px 18px ${C.primaryGlow}`;
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = `0 6px 36px ${C.primaryGlow}`;
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
            background: `linear-gradient(to bottom,${C.primary},transparent)`,
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
    color: C.red,
    bg: "radial-gradient(135deg at 30% 70%,rgba(232,62,62,.15) 0%,transparent 60%)",
    bgImage: "/media/vibe-strength.webp",
  },
  {
    id: "zen",
    label: "ZEN",
    sub: "Mind Reset",
    color: C.blue,
    bg: "radial-gradient(135deg 70% 30%,rgba(91,163,217,.12) 0%,transparent 60%)",
    bgImage: "/media/vibe-zen.webp",
  },
  {
    id: "sweat",
    label: "SWEAT",
    sub: "Burn Zone",
    color: "#ff8c42",
    bg: "radial-gradient(135deg at 60% 40%,rgba(255,140,66,.13) 0%,transparent 60%)",
    bgImage: "/media/vibe-sweat.webp",
  },
  {
    id: "recovery",
    label: "RECOVERY",
    sub: "Restore",
    color: C.ice,
    bg: "radial-gradient(135deg at 50% 80%,rgba(126,207,227,.12) 0%,transparent 60%)",
    bgImage: "/media/vibe-recovery.webp",
  },
];


/* ───────────────────────────────────────────
   WHY WORKOUT WAREHOUSE (editorial asymmetric)
─────────────────────────────────────────── */
const stats = [
  { num: "412", label: "Training Right Now" },
  { num: "98%", label: "Peak Performance" },
  { num: "24/7", label: "Always Open" },
  { num: "12+", label: "Live Classes Daily" },
];

const WhySection = ({ accent }: { accent: string }) => {
  const { w } = useWindowSize();
  const isMobile = w < 768;
  const isTablet = w < 1024;

  return (
    <section
      style={{
        padding: isMobile ? "48px 20px" : "70px 64px",
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
            WHY WORKOUT WAREHOUSE
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
            WORKOUT WAREHOUSE blends elite luxury, raw intensity, lightning-fast
            convenience, and a tech-powered community — into one obsessive,
            members-first experience built for 2026. Every space. Every session.
            Every second — engineered for you and your squad.
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

        {/* Right: fitness image */}
        <div
          className="ww-reveal"
          style={{ animationDelay: ".12s", marginTop: isMobile ? 32 : 0 }}
        >
          <img
            src="/media/fitness.webp"
            alt="Fitness training at Workout Warehouse"
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
    </section>
  );
};

/* ───────────────────────────────────────────
   COACHES
─────────────────────────────────────────── */
const coaches = [
  {
    name: "LINNET M.",
    role: "HIIT & Conditioning",
    base: "Highway Mall",
    img: "/media/coach-sarah.webp",
    classes: 847,
    rating: 4.9,
  },
  {
    name: "BARRACK H.",
    role: "Strength & Power",
    base: "Highway Mall",
    img: "/media/coach-Barrack.webp",
    classes: 612,
    rating: 4.8,
  },
  {
    name: "VINCENT J.",
    role: "Zen & Flow",
    base: "Highway Mall",
    img: "/media/coach-Vincent .webp",
    classes: 1204,
    rating: 5.0,
  },
  {
    name: "DANIEL O.",
    role: "Cardio & Endurance",
    base: "Highway Mall",
    img: "/media/coach-Daniel.webp",
    classes: 538,
    rating: 4.7,
  },
  {
    name: "HAMISI J.",
    role: "Recovery & Mobility",
    base: "Highway Mall",
    img: "/media/coach-Hamisi.webp",
    classes: 423,
    rating: 4.9,
  },
];

/* ───────────────────────────────────────────
   SQUAD STATS
─────────────────────────────────────────── */
const squadStats = [
  { num: "412", label: "Training Right Now" },
  { num: "98%", label: "Peak Performance" },
  { num: "Open", label: "Daily" },
  { num: "12+", label: "Live Classes Daily" },
];

const StatsSection = ({ accent }: { accent: string }) => {
  const { w } = useWindowSize();
  const isMobile = w < 768;
  const isTablet = w < 1024;

  return (
    <section
      style={{
        padding: isMobile ? "48px 20px" : "70px 64px",
        background: C.bg,
        position: "relative",
        overflow: "hidden",
      }}
    >
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
        {/* Left: stats grid */}
        <div className="ww-reveal">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: isMobile ? 12 : 16,
            }}
          >
            {squadStats.map((s, i) => (
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

        {/* Right: gym-lower image */}
        <div
          className="ww-reveal"
          style={{ animationDelay: ".12s", marginTop: isMobile ? 32 : 0 }}
        >
          <img
            src="/media/gym-lower.webp"
            alt="Workout Warehouse facility"
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
    </section>
  );
};

/* ───────────────────────────────────────────
   TESTIMONIALS
─────────────────────────────────────────── */
const testimonials = [
  {
    name: "JAMIE L.",
    base: "Member · 8 months",
    quote:
      "I've tried every gym in Nairobi. Workout Warehouse is the first place that actually feels like a community. The energy is unreal.",
    stars: 5,
  },
  {
    name: "PRIYA S.",
    base: "Member · 1 year",
    quote:
      "The coaches here are world-class. Sarah's HIIT sessions are legendary — I've never pushed harder or felt better.",
    stars: 5,
  },
  {
    name: "MARCUS D.",
    base: "Member · 6 months",
    quote:
      "From the app to the recovery suite, every detail is obsessively designed. This isn't a gym. It's an experience.",
    stars: 5,
  },
];

const Testimonials = ({ accent }: { accent: string }) => {
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
        padding: isMobile ? "48px 20px" : "60px 64px",
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
              aria-label={`View testimonial ${i + 1} of ${testimonials.length}`}
              style={{
                width: i === idx ? 28 : 12,
                height: 12,
                borderRadius: 5,
                minWidth: 44,
                minHeight: 44,
                padding: 0,
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
/* ───────────────────────────────────────────
   PRICING & SCHEDULE SECTION (3 tabs)
─────────────────────────────────────────── */

// Standard membership packages (from gym_rates.jpeg)
const standardRates = [
  { name: "Day Pass", price: "1,000", validity: "Same day" },
  { name: "Weekly", price: "2,500", validity: "7 days" },
  { name: "Monthly", price: "6,000", validity: "30 days" },
  {
    name: "3 Months",
    price: "17,000",
    validity: "90 days",
    badge: "BEST VALUE",
  },
  { name: "6 Months", price: "32,000", validity: "180 days" },
  { name: "Annual", price: "59,000", validity: "365 days" },
  { name: "Annual (Couples)", price: "105,000", validity: "365 days" },
];

// Student packages (from student_rates.jpeg)
const studentRates = [
  {
    name: "Peak (All Hours)",
    monthly: "5,000",
    firstMonth: "2,500",
    note: "Valid student ID required",
  },
  {
    name: "Peak Direct Debit",
    monthly: "4,500",
    firstMonth: null,
    note: "Min. 12 months commitment",
  },
  {
    name: "Off-Peak (8am–4:30pm)",
    monthly: "3,000",
    firstMonth: "1,500",
    note: "Weekdays only",
  },
];

// Cold plunge rates (from cold_plunge_rates.jpeg)
const coldPlungeRates = [
  { sessions: "Single Session", member: "1,500", nonMember: "2,000" },
  { sessions: "4-Session Pass", member: "5,500", nonMember: "6,500" },
  { sessions: "8-Session Pass", member: "10,000", nonMember: "12,000" },
  { sessions: "12-Session Pass", member: "13,500", nonMember: "16,000" },
];

// Class schedule (from class_schedules.jpeg)
const classSchedule = [
  {
    time: "5:45 AM – 6:30 AM",
    mon: { name: "BODYSCULPT", coach: "IGGY" },
    tue: { name: "KICKBOXING", coach: "EVANS" },
    wed: { name: "BOXING", coach: "HASSAN" },
    fri: { name: "INSANITY", coach: "HASSAN" },
  },
  {
    time: "5:50 AM – 6:35 AM",
    tue: { name: "SPIN", coach: "LINNET" },
    thu: { name: "TAEBO-CHOMA & TONING", coach: "ALVIN" },
  },
  {
    time: "6:40 AM – 7:25 AM",
    mon: { name: "BODYSCULPT", coach: "IGGY" },
    tue: { name: "KATA BOX", coach: "KEITH" },
    wed: { name: "DANCE FITNESS", coach: "BRACHO" },
    fri: { name: "BOXING", coach: "HASSAN" },
  },
  { time: "6:45 AM – 7:30 AM", tue: { name: "SPIN", coach: "LINNET" } },
  { time: "9:00 AM – 9:45 AM", sat: { name: "SPIN", coach: "VIN" } },
  { time: "10:00 AM – 10:45 AM", sat: { name: "SPIN", coach: "VIN" } },
  {
    time: "5:30 PM – 6:15 PM",
    mon: { name: "AEROBICS", coach: "DENNO" },
    tue: { name: "CIRCUITS", coach: "FRANK" },
    wed: { name: "MOBILITY", coach: "EVANS" },
    thu: { name: "WEIGHT PARTY", coach: "LINNET" },
  },
  {
    time: "5:50 PM – 6:35 PM",
    mon: { name: "SPIN", coach: "LINNET" },
    thu: { name: "SPIN", coach: "VIN" },
    fri: { name: "DANCE FITNESS", coach: "BRACHO" },
  },
  {
    time: "6:25 PM – 7:10 PM",
    mon: { name: "HIIT", coach: "DENNO" },
    tue: { name: "DANCE FITNESS", coach: "BRACHO" },
    wed: { name: "STEPS/TABATA", coach: "KEITH" },
    thu: { name: "WEIGHT PARTY", coach: "LINNET" },
  },
  { time: "6:45 PM – 7:30 PM", mon: { name: "SPIN", coach: "LINNET" } },
];

const PricingScheduleSection = memo(({ accent }: { accent: string }) => {
  const [activeTab, setActiveTab] = useState("standard"); // "standard" | "student" | "classes"
  const { w } = useWindowSize();
  const isMobile = w < 768;

  return (
    <section
      id="pricing"
      style={{
        padding: isMobile ? "48px 20px" : "60px 64px",
        background: C.bg,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Diagonal accent glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "-10%",
          width: "50%",
          height: "60%",
          background: `radial-gradient(ellipse,${accent}06 0%,transparent 70%)`,
          pointerEvents: "none",
          filter: "blur(80px)",
        }}
      />

      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <div
          className="ww-reveal"
          style={{ textAlign: "center", marginBottom: isMobile ? 24 : 32 }}
        >
          <span
            style={{
              fontFamily: "'Inter Tight',sans-serif",
              fontSize: 11,
              fontWeight: 600,
              color: accent,
              letterSpacing: ".22em",
            }}
          >
            PRICING & SCHEDULE
          </span>
          <h2
            style={{
              fontFamily: "'Inter Tight',sans-serif",
              fontSize: isMobile ? 36 : 52,
              fontWeight: 900,
              color: C.white,
              marginTop: 10,
              lineHeight: 1.05,
            }}
          >
            Transparent.
            <br />
            <span style={{ color: accent }}>No surprises.</span>
          </h2>
        </div>

        {/* Tab Navigation */}
        <div
          className="ww-reveal"
          style={{
            display: "flex",
            gap: isMobile ? 8 : 12,
            justifyContent: "center",
            marginBottom: 40,
            flexWrap: "wrap",
          }}
        >
          {[
            { id: "standard", label: "STANDARD RATES" },
            { id: "student", label: "STUDENT RATES" },
            { id: "classes", label: "CLASS SCHEDULE" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              aria-label={`View ${tab.label.toLowerCase()}`}
              aria-pressed={activeTab === tab.id}
              style={{
                padding: isMobile ? "12px 20px" : "14px 28px",
                background: activeTab === tab.id ? accent : "transparent",
                border: `1.5px solid ${activeTab === tab.id ? accent : "rgba(255,255,255,.1)"}`,
                borderRadius: 50,
                cursor: "pointer",
                fontFamily: "'Inter Tight',sans-serif",
                fontSize: isMobile ? 10 : 11,
                fontWeight: 800,
                color: activeTab === tab.id ? C.bg : C.slateL,
                letterSpacing: ".16em",
                transition: "all .3s",
                boxShadow:
                  activeTab === tab.id ? `0 0 20px ${accent}40` : "none",
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.borderColor = `${accent}60`;
                  e.currentTarget.style.color = C.white;
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,.1)";
                  e.currentTarget.style.color = C.slateL;
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── TAB CONTENT: STANDARD RATES ── */}
        {activeTab === "standard" && (
          <div style={{ animation: "ww-fadeUp .4s ease" }}>
            {/* Main packages */}
            <div
              style={{
                background: C.card,
                borderRadius: 22,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,.06)",
                marginBottom: 12, // tightened spacing per design feedback
              }}
            >
              <div
                style={{
                  padding: isMobile ? "16px 18px" : "18px 24px",
                  background: `${accent}08`,
                  borderBottom: "1px solid rgba(255,255,255,.06)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Inter Tight',sans-serif",
                    fontSize: isMobile ? 14 : 16,
                    fontWeight: 800,
                    color: C.white,
                    letterSpacing: ".1em",
                  }}
                >
                  GYM MEMBERSHIPS
                </h3>
              </div>
              <div style={{ padding: isMobile ? "0" : "0" }}>
                {standardRates.map((rate, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: isMobile ? "8px 18px" : "10px 24px",
                      borderBottom:
                        i < standardRates.length - 1
                          ? "1px solid rgba(255,255,255,.04)"
                          : "none",
                      position: "relative",
                    }}
                  >
                    {rate.badge && (
                      <span
                        style={{
                          position: "absolute",
                          top: isMobile ? 8 : 10,
                          right: isMobile ? 18 : 24,
                          fontFamily: "'Inter Tight',sans-serif",
                          fontSize: 8,
                          fontWeight: 800,
                          color: C.bg,
                          background: accent,
                          padding: "3px 10px",
                          borderRadius: 50,
                          letterSpacing: ".12em",
                        }}
                      >
                        {rate.badge}
                      </span>
                    )}
                    <div>
                      <div
                        style={{
                          fontFamily: "'Inter Tight',sans-serif",
                          fontSize: isMobile ? 14 : 16,
                          fontWeight: 700,
                          color: C.white,
                        }}
                      >
                        {rate.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Tenor Sans',serif",
                          fontSize: isMobile ? 11 : 12,
                          color: C.slate,
                          marginTop: 3,
                        }}
                      >
                        Valid for {rate.validity}
                      </div>
                    </div>
                    <div
                      style={{
                        fontFamily: "'Inter Tight',sans-serif",
                        fontSize: isMobile ? 18 : 22,
                        fontWeight: 900,
                        color: accent,
                      }}
                    >
                      KSh {rate.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cold Plunge */}
            <div
              className="ww-reveal"
              style={{
                background: C.card,
                borderRadius: 22,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,.06)",
                animationDelay: ".1s",
              }}
            >
              <div
                style={{
                  padding: isMobile ? "16px 18px" : "18px 24px",
                  background: `${C.ice}08`,
                  borderBottom: "1px solid rgba(255,255,255,.06)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Inter Tight',sans-serif",
                    fontSize: isMobile ? 14 : 16,
                    fontWeight: 800,
                    color: C.white,
                    letterSpacing: ".1em",
                  }}
                >
                  COLD PLUNGE SESSIONS
                </h3>
              </div>
              <div
                style={{
                  overflowX: isMobile ? "auto" : "visible",
                  padding: isMobile ? "0" : "8px 0",
                }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,.06)",
                      }}
                    >
                      <th
                        style={{
                          fontFamily: "'Inter Tight',sans-serif",
                          fontSize: isMobile ? 10 : 11,
                          fontWeight: 700,
                          color: C.slateL,
                          letterSpacing: ".12em",
                          textAlign: "left",
                          padding: isMobile ? "12px 18px" : "14px 24px",
                        }}
                      >
                        PACKAGE
                      </th>
                      <th
                        style={{
                          fontFamily: "'Inter Tight',sans-serif",
                          fontSize: isMobile ? 10 : 11,
                          fontWeight: 700,
                          color: C.slateL,
                          letterSpacing: ".12em",
                          textAlign: "right",
                          padding: isMobile ? "12px 18px" : "14px 24px",
                        }}
                      >
                        MEMBER
                      </th>
                      <th
                        style={{
                          fontFamily: "'Inter Tight',sans-serif",
                          fontSize: isMobile ? 10 : 11,
                          fontWeight: 700,
                          color: C.slateL,
                          letterSpacing: ".12em",
                          textAlign: "right",
                          padding: isMobile ? "12px 18px" : "14px 24px",
                        }}
                      >
                        NON-MEMBER
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {coldPlungeRates.map((cp, i) => (
                      <tr
                        key={i}
                        style={{
                          borderBottom:
                            i < coldPlungeRates.length - 1
                              ? "1px solid rgba(255,255,255,.04)"
                              : "none",
                        }}
                      >
                        <td
                          style={{
                            fontFamily: "'Tenor Sans',serif",
                            fontSize: isMobile ? 12 : 13,
                            color: C.white,
                            padding: isMobile ? "14px 18px" : "16px 24px",
                          }}
                        >
                          {cp.sessions}
                        </td>
                        <td
                          style={{
                            fontFamily: "'Inter Tight',sans-serif",
                            fontSize: isMobile ? 13 : 14,
                            fontWeight: 700,
                            color: accent,
                            textAlign: "right",
                            padding: isMobile ? "14px 18px" : "16px 24px",
                          }}
                        >
                          KSh {cp.member}
                        </td>
                        <td
                          style={{
                            fontFamily: "'Inter Tight',sans-serif",
                            fontSize: isMobile ? 13 : 14,
                            fontWeight: 700,
                            color: C.slateL,
                            textAlign: "right",
                            padding: isMobile ? "14px 18px" : "16px 24px",
                          }}
                        >
                          KSh {cp.nonMember}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Additional services note */}
            <div
              style={{
                marginTop: 24,
                textAlign: "center",
                fontFamily: "'Tenor Sans',serif",
                fontSize: isMobile ? 12 : 13,
                color: C.slate,
                lineHeight: 1.6,
              }}
            >
              Physiotherapy: KSh 3,500 per session · BMI Analysis: KSh 500 per
              session
            </div>
          </div>
        )}

        {/* ── TAB CONTENT: STUDENT RATES ── */}
        {activeTab === "student" && (
          <div style={{ animation: "ww-fadeUp .4s ease" }}>
            {/* Student badge */}
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: `${C.yellow}12`,
                  border: `1px solid ${C.yellow}40`,
                  borderRadius: 50,
                  padding: "10px 24px",
                }}
              >
                <span style={{ fontSize: 18 }}>🎓</span>
                <span
                  style={{
                    fontFamily: "'Inter Tight',sans-serif",
                    fontSize: 12,
                    fontWeight: 800,
                    color: C.yellow,
                    letterSpacing: ".14em",
                  }}
                >
                  VALID STUDENT ID REQUIRED
                </span>
              </div>
            </div>

            <div
              style={{
                background: C.card,
                borderRadius: 22,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,.06)",
              }}
            >
              <div
                style={{
                  padding: isMobile ? "16px 18px" : "18px 24px",
                  background: `${C.yellow}08`,
                  borderBottom: "1px solid rgba(255,255,255,.06)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Inter Tight',sans-serif",
                    fontSize: isMobile ? 14 : 16,
                    fontWeight: 800,
                    color: C.white,
                    letterSpacing: ".1em",
                  }}
                >
                  STUDENT MEMBERSHIPS
                </h3>
              </div>
              <div style={{ padding: isMobile ? "0" : "0" }}>
                {studentRates.map((rate, i) => (
                  <div
                    key={i}
                    style={{
                      padding: isMobile ? "8px 18px" : "10px 24px",
                      borderBottom:
                        i < studentRates.length - 1
                          ? "1px solid rgba(255,255,255,.04)"
                          : "none",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 10,
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontFamily: "'Inter Tight',sans-serif",
                            fontSize: isMobile ? 15 : 17,
                            fontWeight: 700,
                            color: C.white,
                          }}
                        >
                          {rate.name}
                        </div>
                        <div
                          style={{
                            fontFamily: "'Tenor Sans',serif",
                            fontSize: isMobile ? 11 : 12,
                            color: C.slate,
                            marginTop: 4,
                          }}
                        >
                          {rate.note}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div
                          style={{
                            fontFamily: "'Inter Tight',sans-serif",
                            fontSize: isMobile ? 18 : 22,
                            fontWeight: 900,
                            color: C.yellow,
                          }}
                        >
                          KSh {rate.monthly}
                        </div>
                        <div
                          style={{
                            fontFamily: "'Tenor Sans',serif",
                            fontSize: 10,
                            color: C.slateL,
                            marginTop: 2,
                          }}
                        >
                          /month
                        </div>
                      </div>
                    </div>
                    {rate.firstMonth && (
                      <div
                        style={{
                          display: "inline-block",
                          background: `${C.yellow}15`,
                          border: `1px solid ${C.yellow}30`,
                          borderRadius: 8,
                          padding: "6px 12px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Inter Tight',sans-serif",
                            fontSize: 10,
                            fontWeight: 700,
                            color: C.yellow,
                            letterSpacing: ".1em",
                          }}
                        >
                          FIRST MONTH: KSh {rate.firstMonth}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                marginTop: 24,
                textAlign: "center",
                fontFamily: "'Tenor Sans',serif",
                fontSize: isMobile ? 12 : 13,
                color: C.slate,
                lineHeight: 1.6,
              }}
            >
              World-class gym · Brand new equipment · 5 classes per day
            </div>
          </div>
        )}

        {/* ── TAB CONTENT: CLASS SCHEDULE ── */}
        {activeTab === "classes" && (
          <div style={{ animation: "ww-fadeUp .4s ease" }}>
            <div
              style={{
                background: C.card,
                borderRadius: 22,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,.06)",
              }}
            >
              <div
                style={{
                  padding: isMobile ? "16px 18px" : "18px 24px",
                  background: `${accent}08`,
                  borderBottom: "1px solid rgba(255,255,255,.06)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Inter Tight',sans-serif",
                    fontSize: isMobile ? 14 : 16,
                    fontWeight: 800,
                    color: C.white,
                    letterSpacing: ".1em",
                  }}
                >
                  GROUP FITNESS CLASSES
                </h3>
                <p
                  style={{
                    fontFamily: "'Tenor Sans',serif",
                    fontSize: 12,
                    color: C.slate,
                    marginTop: 6,
                  }}
                >
                  All classes included with membership · First-come,
                  first-served
                </p>
              </div>

              {/* Desktop table */}
              {!isMobile && (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr
                        style={{
                          background: C.cardUp,
                          borderBottom: "1px solid rgba(255,255,255,.06)",
                        }}
                      >
                        <th
                          style={{
                            fontFamily: "'Inter Tight',sans-serif",
                            fontSize: 10,
                            fontWeight: 700,
                            color: C.slateL,
                            letterSpacing: ".12em",
                            textAlign: "left",
                            padding: "14px 20px",
                            minWidth: 140,
                          }}
                        >
                          TIME
                        </th>
                        {[
                          "MONDAY",
                          "TUESDAY",
                          "WEDNESDAY",
                          "THURSDAY",
                          "FRIDAY",
                          "SATURDAY",
                        ].map((day) => (
                          <th
                            key={day}
                            style={{
                              fontFamily: "'Inter Tight',sans-serif",
                              fontSize: 10,
                              fontWeight: 700,
                              color: accent,
                              letterSpacing: ".12em",
                              textAlign: "left",
                              padding: "14px 16px",
                              minWidth: 140,
                            }}
                          >
                            {day}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {classSchedule.map((row, i) => (
                        <tr
                          key={i}
                          style={{
                            borderBottom: "1px solid rgba(255,255,255,.03)",
                          }}
                        >
                          <td
                            style={{
                              fontFamily: "'Inter Tight',sans-serif",
                              fontSize: 11,
                              fontWeight: 600,
                              color: C.slateL,
                              padding: "14px 20px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {row.time}
                          </td>
                          {["mon", "tue", "wed", "thu", "fri", "sat"].map(
                            (day) => (
                              <td key={day} style={{ padding: "14px 16px" }}>
                                {(row as any)[day] ? (
                                  <div>
                                    <div
                                      style={{
                                        fontFamily: "'Inter Tight',sans-serif",
                                        fontSize: 12,
                                        fontWeight: 700,
                                        color: C.white,
                                        marginBottom: 3,
                                      }}
                                    >
                                      {(row as any)[day].name}
                                    </div>
                                    <div
                                      style={{
                                        fontFamily: "'Tenor Sans',serif",
                                        fontSize: 10,
                                        color: accent,
                                      }}
                                    >
                                      {(row as any)[day].coach}
                                    </div>
                                  </div>
                                ) : (
                                  <div style={{ height: 36 }} />
                                )}
                              </td>
                            ),
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Mobile list */}
              {isMobile && (
                <div style={{ padding: "8px 0" }}>
                  {classSchedule.map((row, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "16px 18px",
                        borderBottom:
                          i < classSchedule.length - 1
                            ? "1px solid rgba(255,255,255,.04)"
                            : "none",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Inter Tight',sans-serif",
                          fontSize: 10,
                          fontWeight: 700,
                          color: accent,
                          letterSpacing: ".1em",
                          marginBottom: 10,
                        }}
                      >
                        {row.time}
                      </div>
                      {["mon", "tue", "wed", "thu", "fri", "sat"].map(
                        (day) =>
                          (row as any)[day] && (
                            <div key={day} style={{ marginBottom: 8 }}>
                              <div
                                style={{
                                  fontFamily: "'Inter Tight',sans-serif",
                                  fontSize: 11,
                                  fontWeight: 700,
                                  color: C.white,
                                }}
                              >
                                {(row as any)[day].name}
                              </div>
                              <div
                                style={{
                                  fontFamily: "'Tenor Sans',serif",
                                  fontSize: 10,
                                  color: C.slate,
                                }}
                              >
                                {(row as any)[day].coach} ·{" "}
                                {day.toUpperCase().slice(0, 3)}
                              </div>
                            </div>
                          ),
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div
              style={{
                marginTop: 24,
                textAlign: "center",
                fontFamily: "'Tenor Sans',serif",
                fontSize: isMobile ? 12 : 13,
                color: C.slate,
                lineHeight: 1.6,
              }}
            >
              Classes subject to availability · Check in-app for real-time
              updates
            </div>
          </div>
        )}
      </div>
    </section>
  );
});
const CtaBand = ({
  openJoin,
  accent,
}: {
  openJoin: () => void;
  accent: string;
}) => {
  const { w } = useWindowSize();
  const isMobile = w < 768;
  return (
    <section
      id="contact"
      style={{
        padding: isMobile ? "48px 20px" : "60px 64px",
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
          Become part of the movement. . No contracts required
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
          Cancel anytime · No hidden fees · 
        </div>
      </div>
    </section>
  );
};

/* ───────────────────────────────────────────
   MOBILE FAB  (JOIN · center bottom)
─────────────────────────────────────────── */
const FAB = ({
  openJoin,
  accent,
}: {
  openJoin: () => void;
  accent: string;
}) => {
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
// ── Real Workout Warehouse WhatsApp contact ──
const WA_NUMBER = "254759983995";
const WA_MSG = encodeURIComponent(
  "Hi Workout Warehouse 👋 I'd like to learn more about joining.",
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
      aria-label="Chat with WORKOUT WAREHOUSE on WhatsApp"
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
   JOIN FLOW MODAL — WORKOUT WAREHOUSE PRICING
─────────────────────────────────────────── */
// Standard membership tiers (show by default)
const membershipLevels = [
  {
    id: "monthly",
    label: "MONTHLY",
    sub: "Flexibility",
    price: 6000,
    perks: ["All Classes", "Open Gym Access", "5 Classes/Day"],
    color: C.slateL,
  },
  {
    id: "3month",
    label: "3-MONTH",
    sub: "Best Value",
    price: 17000,
    totalPrice: 17000,
    perks: ["Everything in Monthly", "1 Free BMI Session", "Priority Booking"],
    color: C.primary,
    popular: true,
  },
  {
    id: "6month",
    label: "6-MONTH",
    sub: "Committed",
    price: 32000,
    totalPrice: 32000,
    perks: ["Everything in 3-Month", "2 Free BMI Sessions", "Guest Passes"],
    color: C.primary,
  },
  {
    id: "annual",
    label: "ANNUAL",
    sub: "Full Access",
    price: 59000,
    totalPrice: 59000,
    perks: ["Everything in 6-Month", "3 Free BMI Sessions", "VIP Events"],
    color: C.gold,
  },
  {
    id: "couples",
    label: "COUPLES ANNUAL",
    sub: "Train Together",
    price: 105000,
    totalPrice: 105000,
    perks: [
      "2 Full Memberships",
      "6 Free BMI Sessions Total",
      "Priority Booking",
    ],
    color: C.gold,
  },
];

// Student membership tiers (separate toggle in join flow)
const studentLevels = [
  {
    id: "student-peak",
    label: "STUDENT PEAK",
    sub: "All Hours Access",
    price: 5000,
    firstMonth: 2500,
    perks: ["Unlimited Classes", "Open Gym 24/7", "Valid Student ID Required"],
    color: C.yellow,
  },
  {
    id: "student-peak-dd",
    label: "STUDENT PEAK DD",
    sub: "Direct Debit (min 12mo)",
    price: 4500,
    perks: ["Same as Peak", "12-Month Commitment", "Auto-Renewal"],
    color: C.slateL,
  },
  {
    id: "student-offpeak",
    label: "STUDENT OFF-PEAK",
    sub: "8:00am – 4:30pm",
    price: 3000,
    firstMonth: 1500,
    perks: ["Off-Peak Hours Only", "All Classes", "Valid Student ID Required"],
    color: C.slateL,
  },
];

// Add-on options (cold plunge, physio, BMI)
const addonOptions = [
  {
    id: "coldplunge-single",
    label: "Cold Plunge (Single Session)",
    price: 1500,
    icon: "❄️",
    category: "recovery",
  },
  {
    id: "coldplunge-4",
    label: "Cold Plunge (4 Sessions)",
    price: 5500,
    icon: "❄️",
    category: "recovery",
  },
  {
    id: "coldplunge-8",
    label: "Cold Plunge (8 Sessions)",
    price: 10000,
    icon: "❄️",
    category: "recovery",
  },
  {
    id: "physio",
    label: "Physiotherapy Session",
    price: 3500,
    icon: "🩺",
    category: "wellness",
  },
  {
    id: "bmi",
    label: "BMI Analysis",
    price: 500,
    icon: "📊",
    category: "wellness",
  },
];

// Lazy load the JoinModal component for better performance
const LazyJoinModal = lazy(() => import("./JoinModal"));

const JoinModalWithSuspense = ({ onClose }: { onClose: () => void }) => (
  <Suspense
    fallback={
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: C.bg,
          zIndex: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    }
  >
    <LazyJoinModal onClose={onClose} />
  </Suspense>
);

/* ───────────────────────────────────────────
   ROOT APP
─────────────────────────────────────────── */
export default function WorkoutWarehouse() {
  const [joinOpen, setJoinOpen] = useState(false);
  const [accent, setAccent] = useState(C.primary);

  // Scroll reveal disabled for performance

  return (
    <>
      <GlobalStyles />
      <Grain />
      {/* LoadingScreen removed for instant display */}

      <Nav openJoin={() => setJoinOpen(true)} />
      <Hero openJoin={() => setJoinOpen(true)} />
      <CurrentOffers />
      <Ticker />
      <VibeGrid accent={accent} setAccent={setAccent} />
      <WhySection accent={accent} />
      <CoachesSection accent={accent} />
      <StatsSection accent={accent} />
      <Testimonials accent={accent} />
      <PricingScheduleSection accent={accent} />
      <FaqSection />
      <CtaBand openJoin={() => setJoinOpen(true)} accent={accent} />
      <Footer />

      <FAB openJoin={() => setJoinOpen(true)} accent={accent} />
      <WhatsAppBubble />

      {joinOpen && <JoinModalWithSuspense onClose={() => setJoinOpen(false)} />}
    </>
  );
}

