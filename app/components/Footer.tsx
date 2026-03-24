// app/components/Footer.tsx

"use client";
import { memo } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import { C, WA_URL, WA_GREEN, WA_GREEN_DIM } from "../lib/constants";
import Link from "next/link";

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M20.4457 3.55431C18.2132 1.31972 15.2273 .111328 12.0576 .111328C5.46094 .111328 .0507813 5.52148 .0507813 12.1182C.0507813 14.2881 .607422 16.3926 1.66406 18.2539L0 24.1113L5.99414 22.4746C7.78516 23.4414 9.81641 23.9453 11.8789 23.9453H11.8848C18.4814 23.9453 23.8926 18.5352 23.8926 11.9385C23.8926 8.76855 22.6841 5.78262 20.4457 3.55431ZM11.8848 21.9375C10.0371 21.9375 8.22656 21.4531 6.63867 20.5371L6.22852 20.2949L2.71289 21.2734L3.69727 17.8359L3.4375 17.4121C2.4375 15.7676 1.90723 13.8867 1.90723 11.8652C1.90723 6.52148 6.25098 2.17285 11.8848 2.17285C14.6602 2.17285 17.2734 3.24512 19.2246 5.19629C21.1758 7.14746 22.2363 9.76074 22.2363 12.5363C22.2363 17.8809 17.8934 21.9375 11.8848 21.9375ZM17.8574 14.7656C17.5488 14.6113 16.0918 13.8535 15.8027 13.7441C15.5137 13.6348 15.3086 13.5801 15.1035 13.8887C14.8984 14.1973 14.2852 14.8574 14.1055 15.0625C13.9258 15.2676 13.7461 15.2949 13.4375 15.1406C13.1289 14.9863 12.166 14.6738 11.0254 13.6465C10.1309 12.8359 9.54102 11.8457 9.36133 11.5371C9.18164 11.2285 9.3438 11.0508 9.49805 10.8984C9.63672 10.7617 9.80664 10.5488 9.96094 10.3691C10.1152 10.1895 10.168 10.0645 10.2773 9.86523C10.3867 9.66602 10.332 9.48633 10.2773 9.33203C10.168 9.03711 9.37305 7.11914 9.08398 6.42969C8.79492 5.75781 8.51855 5.83691 8.31445 5.82715C8.1348 5.82031 7.94727 5.81348 7.76758 5.81348C7.5879 5.81348 7.27930 5.87988 7.01367 6.14844C6.72461 6.44531 5.79102 7.48535 5.79102 8.90039C5.79102 10.3154 6.74805 11.6826 6.89648 11.8848C7.04492 12.0869 9.08789 15.2949 12.2734 16.8496C13.3008 17.3535 14.1055 17.6621 14.7344 17.8926C15.8066 18.2734 16.7803 18.2324 17.5664 18.2051C18.4453 18.1738 20.2852 17.2129 20.6309 16.1621C20.9766 15.1113 20.9766 14.2148 20.8652 14.0352C20.7539 13.8809 20.5664 13.7949 20.2578 13.6406L17.8574 14.7656Z"
      fill="currentColor"
    />
  </svg>
);

const Footer = memo(() => {
  const { w } = useWindowSize();
  const isMobile = w < 768;

  const cols = [
    {
      title: "WORKOUT WAREHOUSE",
      items: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Press", href: "/press" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      title: "SERVICES",
      items: [
        { label: "Group Classes", href: "/services/group-classes" },
        { label: "Personal Training", href: "/services/personal-training" },
        { label: "Cold Plunge", href: "/services/cold-plunge" },
        { label: "Physiotherapy", href: "/services/physiotherapy" },
        { label: "BMI Analysis", href: "/services/bmi-analysis" },
      ],
    },
    {
      title: "SUPPORT",
      items: [
        { label: "Help Center", href: "/help" },
        { label: "Membership FAQ", href: "/faq" },
        { label: "Contact Us", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy" },
      ],
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
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 3,
                marginBottom: 14,
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter Tight',sans-serif",
                  fontSize: 22,
                  fontWeight: 900,
                  color: C.primary,
                }}
              >
                WORKOUT
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
                WAREHOUSE
              </span>
            </Link>
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
                { k: "IG", href: "https://instagram.com/workoutwarehouse_ke" },
                { k: "TW", href: "https://twitter.com/workoutwarehouse" },
                { k: "TK", href: "https://tiktok.com/@workoutwarehouse" },
                { k: "YT", href: "https://youtube.com/@workoutwarehouse" },
                { k: "WS", wa: true },
              ].map(({ k, wa, href }) => (
                <a
                  key={k}
                  href={wa ? WA_URL : href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {wa ? <WhatsAppIcon size={16} /> : k}
                </a>
              ))}
            </div>
          </div>

          {/* Footer columns with working links */}
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
                <Link
                  key={item.label}
                  href={item.href}
                  style={{
                    display: "block",
                    fontFamily: "'Tenor Sans',serif",
                    fontSize: 13,
                    color: C.slate,
                    padding: "5px 0",
                    cursor: "pointer",
                    transition: "color .2s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = C.white)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = C.slate)}
                >
                  {item.label}
                </Link>
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
            © 2026 WORKOUT WAREHOUSE. All rights reserved.
          </span>
          <span
            style={{
              fontFamily: "'Tenor Sans',serif",
              fontSize: 12,
              color: C.slate,
            }}
          >
            Nairobi · Built for the movement.
          </span>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
