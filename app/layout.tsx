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
        {/* Google Fonts — Inter Tight (display) + Tenor Sans (body serif) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800;900&family=Tenor+Sans&display=swap"
          rel="stylesheet"
        />

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
