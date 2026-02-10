import type { Metadata } from "next";

// ── Meta ──────────────────────────────────────────
export const metadata: Metadata = {
  title: "Workout Warehouse | The End of Average",
  description:
    "Workout Warehouse — A people-first fitness movement. Luxury. Edge. Speed. Community. Highway Mall, Nairobi.",
  keywords: [
    "Workout Warehouse",
    "gym Nairobi",
    "fitness community",
    "personal training",
    "HIIT",
    "luxury gym",
  ],
  // Open Graph (social previews)
  openGraph: {
    title: "Workout Warehouse | The End of Average",
    description:
      "Not a gym. A movement. Workout Warehouse fuses luxury, raw energy, speed and tech into one obsessive fitness experience.",
    type: "website",
    locale: "en_KE",
  },
  // Viewport — critical for mobile
};

// Viewport must be exported separately in Next.js 14+
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// ── Dynamic title by time-of-day (server-side, runs on every request) ──
// This delivers the "Good Morning / Late Night" metadata from the spec
// without client-side hydration issues.
function getTimeTitle(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good Morning. Ready to sweat?";
  if (hour >= 12 && hour < 17) return "Midday grind starts now.";
  if (hour >= 17 && hour < 21) return "Evening session. Let's go.";
  return "Late Night Session? We're Open.";
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Critical inline styles — prevent FOUC (Flash of Unstyled Content) */}
        <style>{`
          *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
          html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
          body{background:#0c0c0c;color:#ececec;overflow-x:hidden}
          ::selection{background:rgba(204,255,0,0.25);color:#fff}
          img{display:block;max-width:100%}
          button{-webkit-tap-highlight-color:transparent}
          .ww-grain{position:fixed;inset:0;pointer-events:none;z-index:1;opacity:.04}
          .ww-reveal{opacity:1 !important;transform:translateY(0) !important;transition:none !important}
          @keyframes ticker-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
          .ww-ticker-track{display:flex;white-space:nowrap;animation:ticker-scroll 28s linear infinite}
          @keyframes ww-pulse{0%,100%{opacity:.55;transform:scale(.96)}50%{opacity:1;transform:scale(1.04)}}
          @keyframes ww-heartbeat{0%,100%{transform:scaleY(1);opacity:.5}50%{transform:scaleY(1.7);opacity:1}}
          @keyframes ww-fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
          @keyframes ww-slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
          @keyframes ww-fadeIn{from{opacity:0}to{opacity:1}}
          ::-webkit-scrollbar{width:6px}
          ::-webkit-scrollbar-track{background:#0c0c0c}
          ::-webkit-scrollbar-thumb{background:#2a2a2a;border-radius:3px}
        `}</style>
        {/* Preload critical fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;800;900&family=Tenor+Sans&display=swap"
          rel="stylesheet"
        />

        {/* Preload hero poster image */}
        <link rel="preload" as="image" href="/media/hero-poster.png" />

        {/* Preload first vibe image */}
        <link rel="preload" as="image" href="/media/vibe-strength.webp" />

        {/* Dynamic title script — updates <title> based on server time */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var h = new Date().getHours();
                var t = h>=5&&h<12 ? "Good Morning. Ready to sweat?" :
                        h>=12&&h<17 ? "Midday grind starts now." :
                        h>=17&&h<21 ? "Evening session. Let's go." :
                        "Late Night Session? We're Open.";
                document.title = t + " | Workout Warehouse";
              })();
            `,
          }}
        />
      </head>

      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#0c0c0c", // Obsidian — kills any white flash before React hydrates
          color: "#ececec",
          overflowX: "hidden",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        {children}
      </body>
    </html>
  );
}
