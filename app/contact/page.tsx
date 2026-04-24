"use client";
import { useRouter } from "next/navigation";
import { C, WA_URL, WA_GREEN } from "../lib/constants";
import { useWindowSize } from "../hooks/useWindowSize";

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M20.4457 3.55431C18.2132 1.31972 15.2273 .111328 12.0576 .111328C5.46094 .111328 .0507813 5.52148 .0507813 12.1182C.0507813 14.2881 .607422 16.3926 1.66406 18.2539L0 24.1113L5.99414 22.4746C7.78516 23.4414 9.81641 23.9453 11.8789 23.9453H11.8848C18.4814 23.9453 23.8926 18.5352 23.8926 11.9385C23.8926 8.76855 22.6841 5.78262 20.4457 3.55431ZM11.8848 21.9375C10.0371 21.9375 8.22656 21.4531 6.63867 20.5371L6.22852 20.2949L2.71289 21.2734L3.69727 17.8359L3.4375 17.4121C2.4375 15.7676 1.90723 13.8867 1.90723 11.8652C1.90723 6.52148 6.25098 2.17285 11.8848 2.17285C14.6602 2.17285 17.2734 3.24512 19.2246 5.19629C21.1758 7.14746 22.2363 9.76074 22.2363 12.5363C22.2363 17.8809 17.8934 21.9375 11.8848 21.9375ZM17.8574 14.7656C17.5488 14.6113 16.0918 13.8535 15.8027 13.7441C15.5137 13.6348 15.3086 13.5801 15.1035 13.8887C14.8984 14.1973 14.2852 14.8574 14.1055 15.0625C13.9258 15.2676 13.7461 15.2949 13.4375 15.1406C13.1289 14.9863 12.166 14.6738 11.0254 13.6465C10.1309 12.8359 9.54102 11.8457 9.36133 11.5371C9.18164 11.2285 9.3438 11.0508 9.49805 10.8984C9.63672 10.7617 9.80664 10.5488 9.96094 10.3691C10.1152 10.1895 10.168 10.0645 10.2773 9.86523C10.3867 9.66602 10.332 9.48633 10.2773 9.33203C10.168 9.03711 9.37305 7.11914 9.08398 6.42969C8.79492 5.75781 8.51855 5.83691 8.31445 5.82715C8.1348 5.82031 7.94727 5.81348 7.76758 5.81348C7.5879 5.81348 7.27930 5.87988 7.01367 6.14844C6.72461 6.44531 5.79102 7.48535 5.79102 8.90039C5.79102 10.3154 6.74805 11.6826 6.89648 11.8848C7.04492 12.0869 9.08789 15.2949 12.2734 16.8496C13.3008 17.3535 14.1055 17.6621 14.7344 17.8926C15.8066 18.2734 16.7803 18.2324 17.5664 18.2051C18.4453 18.1738 20.2852 17.2129 20.6309 16.1621C20.9766 15.1113 20.9766 14.2148 20.8652 14.0352C20.7539 13.8809 20.5664 13.7949 20.2578 13.6406L17.8574 14.7656Z"
      fill="currentColor"
    />
  </svg>
);

const contactMethods = [
  {
    label: "Email",
    value: "signup@workoutwarehouse.co.ke",
    subtext: "We respond within 24 hours",
    href: "mailto:signup@workoutwarehouse.co.ke",
    color: C.primary,
    icon: "✉",
  },
  {
    label: "WhatsApp",
    value: "+254 759 983 995",
    subtext: "Chat with us directly",
    href: WA_URL,
    color: WA_GREEN,
    icon: "wa",
  },
  {
    label: "Visit Us",
    value: "Highway Mall, Opposite Nyayo Stadium",
    subtext: "Nairobi · 15,000 sq ft across two floors",
    href: null,
    color: C.yellow,
    icon: "◎",
  },
];

const hours = [
  { day: "Monday – Friday", time: "5:00 AM – 9:30 PM" },
  { day: "Saturday", time: "7:00 AM – 5:00 PM" },
  { day: "Sunday", time: "7:00 AM – 3:00 PM" },
];

export default function ContactPage() {
  const router = useRouter();
  const { w } = useWindowSize();
  const isMobile = w < 768;

  return (
    <main style={{ background: C.bg, minHeight: "100vh", paddingTop: 100 }}>
      <div
        style={{
          padding: isMobile ? "40px 20px" : "80px 64px",
          maxWidth: 960,
          margin: "0 auto",
        }}
      >
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
            marginBottom: 40,
          }}
        >
          ← BACK
        </button>

        <h1
          style={{
            fontFamily: "'Inter Tight',sans-serif",
            fontSize: isMobile ? 40 : 64,
            fontWeight: 900,
            color: C.white,
            marginBottom: 16,
          }}
        >
          Contact Us
        </h1>

        <p
          style={{
            fontFamily: "'Tenor Sans',serif",
            fontSize: 18,
            color: C.white,
            lineHeight: 1.8,
            maxWidth: 560,
            marginBottom: 60,
          }}
        >
          Questions, membership enquiries, bookings — we're here. Reach out any
          way that works for you.
        </p>

        {/* Contact methods */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: 16,
            marginBottom: 56,
          }}
        >
          {contactMethods.map((method) => {
            const inner = (
              <div
                style={{
                  background: C.card,
                  borderRadius: 16,
                  padding: "32px 28px",
                  border: `1px solid rgba(255,255,255,.06)`,
                  height: "100%",
                  cursor: method.href ? "pointer" : "default",
                  transition: "border-color .2s",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: `${method.color}18`,
                    border: `1px solid ${method.color}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                    color: method.color,
                    fontSize: method.icon === "wa" ? 20 : 22,
                  }}
                >
                  {method.icon === "wa" ? <WhatsAppIcon size={20} /> : method.icon}
                </div>
                <p
                  style={{
                    fontFamily: "'Inter Tight',sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    color: method.color,
                    letterSpacing: ".2em",
                    marginBottom: 8,
                  }}
                >
                  {method.label.toUpperCase()}
                </p>
                <p
                  style={{
                    fontFamily: "'Tenor Sans',serif",
                    fontSize: 15,
                    color: C.white,
                    lineHeight: 1.5,
                    marginBottom: 8,
                  }}
                >
                  {method.value}
                </p>
                <p style={{ fontFamily: "'Tenor Sans',serif", fontSize: 13, color: C.slate, margin: 0 }}>
                  {method.subtext}
                </p>
              </div>
            );

            return method.href ? (
              <a
                key={method.label}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{ textDecoration: "none" }}
              >
                {inner}
              </a>
            ) : (
              <div key={method.label}>{inner}</div>
            );
          })}
        </div>

        {/* Opening hours */}
        <div
          style={{
            background: C.card,
            borderRadius: 16,
            padding: isMobile ? "32px 24px" : "44px 48px",
            border: `1px solid rgba(255,255,255,.06)`,
            marginBottom: 40,
          }}
        >
          <h2
            style={{
              fontFamily: "'Inter Tight',sans-serif",
              fontSize: isMobile ? 20 : 26,
              fontWeight: 900,
              color: C.white,
              marginBottom: 28,
            }}
          >
            Opening Hours
          </h2>

          {hours.map((h) => (
            <div
              key={h.day}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 0",
                borderBottom: `1px solid rgba(255,255,255,.05)`,
              }}
            >
              <span style={{ fontFamily: "'Tenor Sans',serif", fontSize: 15, color: "#d4d8e0" }}>
                {h.day}
              </span>
              <span
                style={{
                  fontFamily: "'Inter Tight',sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: C.white,
                }}
              >
                {h.time}
              </span>
            </div>
          ))}
        </div>

        {/* Careers nudge */}
        <div
          style={{
            textAlign: "center",
            padding: "32px 24px",
            border: `1px solid rgba(179,102,204,.15)`,
            borderRadius: 16,
          }}
        >
          <p style={{ fontFamily: "'Tenor Sans',serif", fontSize: 15, color: "#d4d8e0", marginBottom: 16 }}>
            Interested in joining our team?
          </p>
          <a href="/careers" style={{ textDecoration: "none" }}>
            <button
              style={{
                background: "none",
                border: `1px solid ${C.primary}`,
                color: C.primary,
                padding: "12px 32px",
                borderRadius: 50,
                cursor: "pointer",
                fontFamily: "'Inter Tight',sans-serif",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: ".12em",
              }}
            >
              VIEW CAREERS
            </button>
          </a>
        </div>
      </div>
    </main>
  );
}
