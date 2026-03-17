"use client";

import { useState, useEffect, memo } from "react";

// Constants from WorkoutWarehouse
const C = {
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

// Custom hook for window size
const useWindowSize = () => {
  const [w, setW] = useState(768);
  useEffect(() => {
    const updateSize = () => setW(window.innerWidth);
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return { w };
};

// Pricing data
const membershipLevels = [
  {
    id: "3month",
    color: "#5ba3d9",
    label: "STARTER 3-Month",
    sub: "All hours access",
    price: 13500,
    popular: true,
    firstMonth: 5000,
    perks: ["All gym access", "Locker"],
  },
  {
    id: "annual",
    color: "#ff8c42",
    label: "ANNUAL",
    sub: "All hours, full year",
    price: 45000,
    perks: ["All gym access", "Locker", "Free water"],
  },
  {
    id: "monthly",
    color: "#7ecfe3",
    label: "MONTHLY",
    sub: "Cancel anytime",
    price: 6000,
    perks: ["All gym access"],
  },
];

const studentLevels = [
  {
    id: "student-peak",
    color: "#ff8c42",
    label: "PEAK (All Hours)",
    sub: "No time restrictions",
    price: 5000,
    firstMonth: 2500,
    perks: ["All hours", "Valid ID required"],
  },
  {
    id: "student-offpeak",
    color: "#7ecfe3",
    label: "OFF-PEAK (8am–4:30pm)",
    sub: "Weekdays only",
    price: 3000,
    firstMonth: 1500,
    perks: ["Weekdays only", "Valid ID required"],
  },
];

const addonOptions = [
  { id: "cold-plunge", icon: "❄️", label: "Cold Plunge Pass (4 sessions)", price: 5500 },
  { id: "physiotherapy", icon: "💆", label: "Physiotherapy Session", price: 8000 },
  { id: "personal-training", icon: "💪", label: "Personal Training (5 sessions)", price: 25000 },
];

const WA_URL = "https://wa.me/254700000000";

const JoinModal = memo(({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [memberType, setMemberType] = useState("standard");
  const [selectedLevel, setSelectedLevel] = useState("3month");
  const [addons, setAddons] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.name.trim() && formData.email.trim() && formData.phone.trim();

  const handleWhatsAppSubmit = () => {
    const selectedTier = (memberType === "student" ? studentLevels : membershipLevels).find(
      (l) => l.id === selectedLevel
    );
    const addonList = addons
      .map((a) => {
        const addon = addonOptions.find((o) => o.id === a);
        return addon?.label;
      })
      .filter(Boolean)
      .join(", ");

    const message = `Hi Workout Warehouse 👋 I'd like to join!\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*Package:* ${selectedTier?.label}\n${
      addonList ? `*Add-ons:* ${addonList}` : ""
    }`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/254759983995?text=${encodedMessage}`, "_blank", "noopener");
    setSubmitted(true);
  };

  const toggleAddon = (id: string) =>
    setAddons((p: string[]) =>
      p.includes(id) ? p.filter((a) => a !== id) : [...p, id]
    );

  const levels = memberType === "student" ? studentLevels : membershipLevels;
  const selectedTier = levels.find((l) => l.id === selectedLevel);
  const basePrice = selectedTier?.price || 0;
  const addonTotal = addons.reduce(
    (s, a) => s + (addonOptions.find((o) => o.id === a)?.price || 0),
    0
  );
  const total = basePrice + addonTotal;

  const btnStyle = (color = C.primary) => ({
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

  if (submitted)
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
            background: `${C.primary}12`,
            border: `2.5px solid ${C.primary}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 50px ${C.primaryGlow}`,
            marginBottom: 28,
          }}
        >
          <span style={{ fontSize: 40, color: C.primary }}>✓</span>
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
          REQUEST SENT
          <br />
          <span style={{ color: C.primary }}>CHECK YOUR WHATSAPP</span>
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
          Your membership details have been sent to WhatsApp. Our team will confirm shortly.
        </p>
        <button
          onClick={onClose}
          style={{ ...btnStyle(), marginTop: 36, maxWidth: 280 }}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(.96)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          CLOSE
        </button>
      </div>
    );

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
            color: C.primary,
            letterSpacing: "-.01em",
            animation: "ww-pulse 1.4s ease infinite",
            textShadow: `0 0 40px ${C.primaryGlow}`,
          }}
        >
          WORKOUT
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
          WAREHOUSE
        </div>
        <div
          style={{
            marginTop: 22,
            width: 3,
            height: 36,
            background: C.primary,
            borderRadius: 2,
            animation: "ww-heartbeat 1.4s ease infinite",
            boxShadow: `0 0 14px ${C.primary}`,
          }}
        />
      </div>
    );

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
            background: `${C.primary}12`,
            border: `2.5px solid ${C.primary}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 50px ${C.primaryGlow}`,
            marginBottom: 28,
          }}
        >
          <span style={{ fontSize: 40, color: C.primary }}>✓</span>
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
          <span style={{ color: C.primary }}>WORKOUT WAREHOUSE</span>
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
          Your {selectedTier?.label} membership is confirmed. Let's go.
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
      {/* Minimal header - step 1-4 content goes here */}
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
        <div style={{ display: "flex", gap: 6 }}>
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              style={{
                width: s < step ? 30 : 8,
                height: 3,
                borderRadius: 2,
                background: s < step ? C.primary : "rgba(255,255,255,.1)",
                transition: "width .4s ease,background .4s ease",
                boxShadow: s < step ? `0 0 7px ${C.primary}50` : "none",
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
        {step === 1 && (
          <div style={{ animation: "ww-fadeUp .45s ease", maxWidth: 520, margin: "0 auto" }}>
            <div style={{ fontFamily: "'Inter Tight',sans-serif", fontSize: 11, fontWeight: 600, color: C.primary, letterSpacing: ".2em" }}>
              STEP 01 · TELL US ABOUT YOU
            </div>
            <h3 style={{ fontFamily: "'Inter Tight',sans-serif", fontSize: isMobile ? 28 : 34, fontWeight: 900, color: C.white, marginTop: 10, lineHeight: 1.1 }}>
              Let's get<br /><span style={{ color: C.primary }}>started.</span>
            </h3>
            <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 16 }}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleFormChange}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  background: C.card,
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: 12,
                  fontFamily: "'Inter Tight',sans-serif",
                  fontSize: 13,
                  color: C.white,
                  transition: "border-color .2s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = `${C.primary}40`)}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,.08)")}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleFormChange}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  background: C.card,
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: 12,
                  fontFamily: "'Inter Tight',sans-serif",
                  fontSize: 13,
                  color: C.white,
                  transition: "border-color .2s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = `${C.primary}40`)}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,.08)")}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleFormChange}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  background: C.card,
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: 12,
                  fontFamily: "'Inter Tight',sans-serif",
                  fontSize: 13,
                  color: C.white,
                  transition: "border-color .2s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = `${C.primary}40`)}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,.08)")}
              />
            </div>
            <button
              onClick={() => isFormValid && setStep(2)}
              disabled={!isFormValid}
              style={{
                ...btnStyle(),
                marginTop: 26,
                opacity: isFormValid ? 1 : 0.5,
                cursor: isFormValid ? "pointer" : "not-allowed",
              }}
              onMouseDown={(e) => isFormValid && (e.currentTarget.style.transform = "scale(.96)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              CONTINUE →
            </button>
          </div>
        )}
        {step === 2 && (
          <div style={{ animation: "ww-fadeUp .45s ease", maxWidth: 580, margin: "0 auto" }}>
            <div style={{ fontFamily: "'Inter Tight',sans-serif", fontSize: 11, fontWeight: 600, color: C.primary, letterSpacing: ".2em" }}>
              STEP 02 · SELECT MEMBERSHIP
            </div>
            <h3 style={{ fontFamily: "'Inter Tight',sans-serif", fontSize: isMobile ? 28 : 34, fontWeight: 900, color: C.white, marginTop: 10, lineHeight: 1.1 }}>
              Choose your<br /><span style={{ color: C.primary }}>plan.</span>
            </h3>
            <div style={{ marginTop: 24, display: "flex", gap: 8, background: C.card, padding: 6, borderRadius: 50, border: "1px solid rgba(255,255,255,.06)" }}>
              {[{ id: "standard", label: "STANDARD" }, { id: "student", label: "STUDENT" }].map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setMemberType(t.id);
                    setSelectedLevel(t.id === "student" ? "student-peak" : "3month");
                  }}
                  style={{
                    flex: 1,
                    padding: "10px",
                    background: memberType === t.id ? C.primary : "transparent",
                    border: "none",
                    borderRadius: 50,
                    fontFamily: "'Inter Tight',sans-serif",
                    fontSize: 11,
                    fontWeight: 800,
                    color: memberType === t.id ? C.bg : C.slateL,
                    letterSpacing: ".14em",
                    cursor: "pointer",
                    transition: "all .25s",
                    boxShadow: memberType === t.id ? `0 0 12px ${C.primaryGlow}` : "none",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
              {levels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  style={{
                    padding: "20px 16px",
                    background: selectedLevel === level.id ? `${level.color}15` : C.card,
                    border: `1.5px solid ${selectedLevel === level.id ? level.color : "rgba(255,255,255,.06)"}`,
                    borderRadius: 14,
                    fontFamily: "'Inter Tight',sans-serif",
                    fontSize: 13,
                    fontWeight: 800,
                    color: selectedLevel === level.id ? level.color : C.white,
                    cursor: "pointer",
                    transition: "all .25s",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    if (selectedLevel !== level.id) {
                      e.currentTarget.style.borderColor = `${level.color}60`;
                      e.currentTarget.style.backgroundColor = `${level.color}08`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedLevel !== level.id) {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,.06)";
                      e.currentTarget.style.backgroundColor = C.card;
                    }
                  }}
                >
                  {level.label}
                  <div style={{ fontSize: 11, color: C.slateL, marginTop: 4 }}>{level.sub}</div>
                  <div style={{ fontSize: 14, fontWeight: 900, marginTop: 8, color: level.color }}>
                    KES {level.price.toLocaleString()}
                  </div>
                  {level.firstMonth && (
                    <div style={{ fontSize: 10, color: C.slate, marginTop: 6 }}>
                      First month: KES {level.firstMonth.toLocaleString()}
                    </div>
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(3)}
              style={{ ...btnStyle(), marginTop: 26 }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(.96)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              CONTINUE →
            </button>
          </div>
        )}
        {step === 3 && (
          <div style={{ animation: "ww-fadeUp .45s ease", maxWidth: 520, margin: "0 auto" }}>
            <div style={{ fontFamily: "'Inter Tight',sans-serif", fontSize: 11, fontWeight: 600, color: C.primary, letterSpacing: ".2em" }}>
              STEP 03 · ENHANCE YOUR PLAN
            </div>
            <h3 style={{ fontFamily: "'Inter Tight',sans-serif", fontSize: isMobile ? 28 : 34, fontWeight: 900, color: C.white, marginTop: 10, lineHeight: 1.1 }}>
              Add-ons<br /><span style={{ color: C.primary }}>(optional).</span>
            </h3>
            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
              {addonOptions.map((addon) => (
                <button
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  style={{
                    padding: "16px",
                    background: addons.includes(addon.id) ? `${C.primary}15` : C.card,
                    border: `1.5px solid ${addons.includes(addon.id) ? C.primary : "rgba(255,255,255,.06)"}`,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    cursor: "pointer",
                    transition: "all .25s",
                    fontFamily: "'Inter Tight',sans-serif",
                    color: C.white,
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    if (!addons.includes(addon.id)) {
                      e.currentTarget.style.borderColor = `${C.primary}60`;
                      e.currentTarget.style.backgroundColor = `${C.primary}08`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!addons.includes(addon.id)) {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,.06)";
                      e.currentTarget.style.backgroundColor = C.card;
                    }
                  }}
                >
                  <div style={{ fontSize: 24 }}>{addon.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".08em" }}>
                      {addon.label}
                    </div>
                    <div style={{ fontSize: 11, color: C.slateL, marginTop: 2 }}>
                      KES {addon.price.toLocaleString()}
                    </div>
                  </div>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 4,
                      border: `2px solid ${addons.includes(addon.id) ? C.primary : C.slate}`,
                      background: addons.includes(addon.id) ? C.primary : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: C.bg,
                      fontSize: 12,
                      fontWeight: 900,
                    }}
                  >
                    {addons.includes(addon.id) ? "✓" : ""}
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(4)}
              style={{ ...btnStyle(), marginTop: 26 }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(.96)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              REVIEW ORDER →
            </button>
          </div>
        )}
        {step === 4 && (
          <div style={{ animation: "ww-fadeUp .45s ease", maxWidth: 520, margin: "0 auto" }}>
            <div style={{ fontFamily: "'Inter Tight',sans-serif", fontSize: 11, fontWeight: 600, color: C.primary, letterSpacing: ".2em" }}>
              STEP 04 · REVIEW
            </div>
            <h3 style={{ fontFamily: "'Inter Tight',sans-serif", fontSize: isMobile ? 28 : 34, fontWeight: 900, color: C.white, marginTop: 10, lineHeight: 1.1 }}>
              Your<br /><span style={{ color: C.primary }}>summary.</span>
            </h3>
            <div style={{ marginTop: 28, background: C.card, border: "1px solid rgba(255,255,255,.06)", borderRadius: 16, padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                <span style={{ color: C.slateL, fontSize: 13 }}>Name</span>
                <span style={{ color: C.white, fontWeight: 800 }}>{formData.name}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                <span style={{ color: C.slateL, fontSize: 13 }}>Email</span>
                <span style={{ color: C.white, fontWeight: 800 }}>{formData.email}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                <span style={{ color: C.slateL, fontSize: 13 }}>Phone</span>
                <span style={{ color: C.white, fontWeight: 800 }}>{formData.phone}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                <span style={{ color: C.slateL, fontSize: 13 }}>Membership</span>
                <span style={{ color: C.white, fontWeight: 800 }}>{selectedTier?.label}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                <span style={{ color: C.slateL, fontSize: 13 }}>Package Price</span>
                <span style={{ color: C.white, fontWeight: 800 }}>KES {basePrice.toLocaleString()}</span>
              </div>
              {addons.length > 0 && (
                <>
                  <div style={{ marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                    <div style={{ color: C.slateL, fontSize: 13, marginBottom: 8 }}>Add-ons</div>
                    {addons.map((addonId) => {
                      const addon = addonOptions.find((o) => o.id === addonId);
                      return (
                        <div
                          key={addonId}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: 12,
                            color: C.slateL,
                            marginBottom: 6,
                          }}
                        >
                          <span>{addon?.label}</span>
                          <span>KES {addon?.price.toLocaleString()}</span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, paddingTop: 16, borderTop: `2px solid ${C.primary}` }}>
                <span style={{ color: C.white, fontSize: 14, fontWeight: 900 }}>TOTAL</span>
                <span style={{ color: C.primary, fontSize: 16, fontWeight: 900 }}>KES {total.toLocaleString()}</span>
              </div>
            </div>
            <button
              onClick={handleWhatsAppSubmit}
              style={{ ...btnStyle(), marginTop: 26, padding: "17px", fontSize: 15 }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(.96)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              SUBMIT TO WHATSAPP
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

JoinModal.displayName = "JoinModal";
export default JoinModal;
