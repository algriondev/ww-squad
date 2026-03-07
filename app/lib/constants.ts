// app/lib/constants.ts

// Color palette
export const C = {
  bg: "#000000",
  card: "#0d0d0d",
  cardUp: "#1a1a1a",
  primary: "#b366cc",
  primaryDim: "rgba(179,102,204,0.13)",
  primaryGlow: "rgba(179,102,204,0.45)",
  yellow: "#e6ff00",
  yellowDim: "rgba(230,255,0,0.12)",
  slate: "#5c6370",
  slateL: "#9ca3af",
  white: "#f0f0f0",
  red: "#e83e3e",
  blue: "#5ba3d9",
  orange: "#ff8c42",
  ice: "#7ecfe3",
  gold: "#f0c040",
};

// WhatsApp contact
export const WA_NUMBER = "254759983995";
export const WA_MSG = encodeURIComponent(
  "Hi Workout Warehouse 👋 I'd like to learn more about joining."
);
export const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;
export const WA_GREEN = "#25c366";
export const WA_GREEN_DIM = "rgba(37,195,102,.18)";
export const WA_GREEN_GLOW = "rgba(37,195,102,.40)";

// Navigation links
export const navLinks = ["HOME", "EXPLORE", "COACHES", "JOIN", "CONTACT"];

// Ticker data
export const tickerData = [
  "412 SQUAD MEMBERS TRAINING NOW",
  "COACH LINET· 'HARDCORE HIIT' — HIGHWAY MALL · 12 SPOTS LEFT",
  "98% PEAK PERFORMANCE REACHED TODAY",
  "RECOVERY PRO SESSIONS LIVE",
  "SQUAD RECORD BROKEN — 6:14 AM BRUTAL THURSDAY",
  "NEW COACH Barrack JOINS HIGHWAY MALL BASE",
];

// Stats
export const stats = [
  { num: "412", label: "Training Right Now" },
  { num: "98%", label: "Peak Performance" },
  { num: "24/7", label: "Always Open" },
  { num: "12+", label: "Live Classes Daily" },
];

// Testimonials
export const testimonials = [
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