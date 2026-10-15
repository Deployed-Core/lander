"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Tone = "light" | "navy" | "navy-solid";
type MenuState = "core" | "industries" | "company" | "mobile" | null;

export default function ContactNav({
  tone = "light",
  active = "",
  showCta = true,
}: {
  tone?: Tone;
  active?: string;
  showCta?: boolean;
}) {
  const [menu, setMenu] = useState<MenuState>(null);

  const solid = tone === "navy-solid";
  const navy = tone === "navy" || solid;

  const strong = navy ? "var(--paper-050)" : "var(--text-strong)";
  const body = navy ? "rgba(249,246,243,.78)" : "var(--text-body)";
  const activeColor = navy ? "var(--blue-300)" : "var(--blue-600)";
  const col = (name: string) => (active === name ? activeColor : body);
  const wt = (name: string) => (active === name ? "500" : "400");
  const hairline = navy ? "rgba(255,255,255,.10)" : "var(--border-hairline)";
    const barBg = solid
    ? "#00051e"
    : navy
      ? "transparent"
      : "rgba(255,255,255,.98)";

  const barBorder = solid
    ? "1px solid rgba(255,255,255,.09)"
    : navy
      ? "0"
      : "1px solid rgba(15,23,42,.12)";

  const panelBg = navy
    ? "rgba(0,5,30,.98)"
    : "rgba(255,255,255,.99)";

  const cardBorder = navy
    ? "rgba(255,255,255,.16)"
    : "rgba(15,23,42,.16)";
  const cardBg = navy ? "rgba(255,255,255,.04)" : "var(--paper-000)";
  const glassBg = navy ? "rgba(255,255,255,.07)" : "rgba(255,255,255,.55)";
  const glassBgHover = navy ? "rgba(255,255,255,.12)" : "rgba(255,255,255,.78)";
  const logo = navy ? "/assets/logo-horizontal-white.png" : "/assets/logo-horizontal-navy.png";
  const arrow = navy ? "/assets/icon-arrow-white.png" : "/assets/icon-arrow-navy.png";
  const ctaBorder = navy ? "rgba(255,255,255,.30)" : "var(--border-strong)";
  const linkMuted = navy ? "rgba(249,246,243,.62)" : "var(--text-muted)";
  const mobileCtaBg = navy ? "var(--paper-050)" : "var(--action-primary)";
  const mobileCtaFg = navy ? "var(--blue-950)" : "var(--paper-050)";
  const mobileCtaArrow = navy ? "/assets/icon-arrow-navy.png" : "/assets/icon-arrow-white.png";

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenu(null); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div
      onMouseLeave={() => { if (menu !== "mobile") setMenu(null); }}
      style={{
        position: navy && !solid ? "relative" : "sticky",
        top: 0,
        zIndex: 40,
        background: barBg,
        backdropFilter: "var(--blur-glass)",
        WebkitBackdropFilter: "var(--blur-glass)",
        borderBottom: barBorder,
        boxShadow: navy ? "none" : "0 8px 24px rgba(15,23,42,.06)",
      }}
    >
      <style>{`
        @keyframes nav-fade { from { opacity: 0; } to { opacity: 1; } }
        .nav-burger { display: none !important; }
        @media (max-width: 860px) {
          .nav-links { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-burger { display: inline-flex !important; margin-left: auto !important; }
        }
      `}</style>

      <div
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "0 clamp(32px, 5vw, 80px)",
          height: 70,
          display: "flex",
          alignItems: "center",
          gap: "clamp(16px,3vw,36px)",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", borderBottom: 0 }}>
          <img src={logo} alt="Deployed" style={{ width: 138, minWidth: 130, display: "block" }} />
        </Link>

        <nav className="nav-links" style={{ display: "flex", gap: "clamp(14px,1.8vw,28px)", alignItems: "center", whiteSpace: "nowrap" }}>
          <button type="button" onMouseEnter={() => setMenu("core")} onClick={() => setMenu(m => m === "core" ? null : "core")} style={{ background: "none", border: 0, padding: 0, cursor: "pointer", font: "var(--body-sm)", fontSize: "13.5px", color: col("Core"), fontWeight: wt("Core") }}>Core</button>
          <button type="button" onMouseEnter={() => setMenu("industries")} onClick={() => setMenu(m => m === "industries" ? null : "industries")} style={{ background: "none", border: 0, padding: 0, cursor: "pointer", font: "var(--body-sm)", fontSize: "13.5px", color: col("Industries"), fontWeight: wt("Industries") }}>Industries</button>
          <button type="button" onMouseEnter={() => setMenu("company")} onClick={() => setMenu(m => m === "company" ? null : "company")} style={{ background: "none", border: 0, padding: 0, cursor: "pointer", font: "var(--body-sm)", fontSize: "13.5px", color: col("Company"), fontWeight: wt("Company") }}>Company</button>
          <Link href="/blog" onMouseEnter={() => setMenu(null)} style={{ font: "var(--body-sm)", fontSize: "13.5px", color: col("Blog"), fontWeight: wt("Blog"), borderBottom: 0 }}>Blog</Link>
        </nav>

        <button type="button" className="nav-burger" onClick={() => setMenu(m => m === "mobile" ? null : "mobile")} aria-label="Menu" style={{ background: "none", border: `1px solid ${ctaBorder}`, borderRadius: 999, padding: "9px 14px", cursor: "pointer", alignItems: "center", gap: 8, font: "var(--label)", letterSpacing: "var(--label-track)", color: strong }}>{menu === "mobile" ? "Close" : "Menu"}</button>

        {showCta && (
          <Link href="/contact" className="nav-cta" style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 9, border: `1px solid ${ctaBorder}`, color: strong, font: "var(--label)", letterSpacing: "var(--label-track)", padding: "11px 18px", borderRadius: 999 }}>
            Get in touch
            <img src={arrow} alt="" style={{ width: 13, height: 12, display: "block" }} />
          </Link>
        )}
      </div>
      {(menu === "core" || menu === "industries" || menu === "company") && (() => {
        const menuContent = {
          core: {
            featured: {
              href: "/the-deployed-fit",
              eyebrow: "THE DEPLOYED FIT",
              title: "Where we create the most leverage",
            },
            links: [
              {
                href: "/strategy",
                title: "Strategy",
                description: "Drive your AI transformation",
              },
              {
                href: "/deployment",
                title: "Deployment",
                description: "Locally embedded teams who ship",
              },
            ],
          },
          industries: {
            featured: {
              href: "/banking",
              eyebrow: "INDUSTRIES",
              title: "AI transformation for banking",
            },
            links: [
              {
                href: "/healthcare",
                title: "Healthcare",
                description: "Build better outcomes with AI",
              },
              {
                href: "/utilities",
                title: "Utilities",
                description: "Modernize essential services",
              },
            ],
          },
          company: {
            featured: {
              href: "/about",
              eyebrow: "COMPANY",
              title: "Meet Deployed",
            },
            links: [
              {
                href: "/careers",
                title: "Careers",
                description: "Join the team",
              },
              {
                href: "/contact",
                title: "Get in touch",
                description: "Talk with our team",
              },
            ],
          },
        }[menu];

        return (
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "100%",
              background: panelBg,
              borderTop: `1px solid ${hairline}`,
              borderBottom: `1px solid ${hairline}`,
              backdropFilter: "var(--blur-glass)",
              WebkitBackdropFilter: "var(--blur-glass)",
              animation: "nav-fade var(--dur-base) var(--ease-out) both",
              boxShadow: navy ? "0 16px 36px rgba(0,0,0,.24)" : "0 16px 36px rgba(15,23,42,.12)",
            }}
          >
            <div
              style={{
                maxWidth: 1160,
                margin: "0 auto",
                padding: "26px 24px 30px",
                display: "grid",
                gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 1fr)",
                gap: 18,
              }}
            >
              <Link
                href={menuContent.featured.href}
                onClick={() => setMenu(null)}
                style={{
                  minHeight: 190,
                  boxSizing: "border-box",
                  border: `1px solid ${cardBorder}`,
                  borderRadius: "var(--radius-md)",
                  padding: 26,
                  background: glassBg,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  transition: "background var(--dur-fast) var(--ease-out)",
                  borderBottomWidth: 1,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = glassBgHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = glassBg;
                }}
              >
                <span
                  style={{
                    font: "var(--eyebrow)",
                    letterSpacing: "var(--eyebrow-track)",
                    textTransform: "uppercase",
                    color: linkMuted,
                  }}
                >
                  {menuContent.featured.eyebrow}
                </span>
                <span
                  style={{
                    font: "var(--display-3)",
                    letterSpacing: "var(--display-track)",
                    color: strong,
                    marginTop: 12,
                  }}
                >
                  {menuContent.featured.title}
                </span>
                <img
                  src={arrow}
                  alt=""
                  style={{
                    width: 15,
                    height: 14,
                    display: "block",
                    opacity: 0.65,
                    marginTop: 18,
                  }}
                />
              </Link>

              <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 18 }}>
                {menuContent.links.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenu(null)}
                    style={{
                      boxSizing: "border-box",
                      border: `1px solid ${cardBorder}`,
                      borderRadius: "var(--radius-md)",
                      padding: "20px 22px",
                      background: cardBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 16,
                      transition: "background var(--dur-fast) var(--ease-out)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = glassBgHover;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = cardBg;
                    }}
                  >
                    <span>
                      <span
                        style={{
                          display: "block",
                          font: "var(--heading-2)",
                          color: strong,
                        }}
                      >
                        {item.title}
                      </span>
                      <span
                        style={{
                          display: "block",
                          font: "var(--body-sm)",
                          color: linkMuted,
                          marginTop: 5,
                        }}
                      >
                        {item.description}
                      </span>
                    </span>
                    <img
                      src={arrow}
                      alt=""
                      style={{
                        width: 15,
                        height: 14,
                        display: "block",
                        opacity: 0.55,
                        flexShrink: 0,
                      }}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      {menu === "mobile" && (
        <div style={{ position: "absolute", left: 0, right: 0, top: "100%", background: panelBg, borderTop: `1px solid ${hairline}`, borderBottom: `1px solid ${hairline}`, backdropFilter: "var(--blur-glass)", WebkitBackdropFilter: "var(--blur-glass)", animation: "nav-fade var(--dur-base) var(--ease-out) both", maxHeight: "calc(100vh - 70px)", overflowY: "auto" }}>
          <div style={{ padding: "18px clamp(20px,5vw,40px) 26px", display: "grid", gap: 2 }}>
            <div style={{ font: "var(--label)", letterSpacing: "var(--label-track)", color: linkMuted, padding: "10px 0 4px" }}>Core</div>
            <Link href="/the-deployed-fit" onClick={() => setMenu(null)} style={{ font: "var(--heading-2)", color: strong, padding: "12px 0", borderBottom: `1px solid ${hairline}` }}>The Deployed fit</Link>
            <Link href="/strategy" onClick={() => setMenu(null)} style={{ font: "var(--heading-2)", color: strong, padding: "12px 0", borderBottom: `1px solid ${hairline}` }}>Strategy</Link>
            <Link href="/deployment" onClick={() => setMenu(null)} style={{ font: "var(--heading-2)", color: strong, padding: "12px 0", borderBottom: `1px solid ${hairline}` }}>Deployment</Link>
            <div style={{ font: "var(--label)", letterSpacing: "var(--label-track)", color: linkMuted, padding: "18px 0 4px" }}>Industries</div>
            <Link href="/banking" onClick={() => setMenu(null)} style={{ font: "var(--body-lg)", color: strong, padding: "11px 0", borderBottom: `1px solid ${hairline}` }}>Banking</Link>
            <Link href="/healthcare" onClick={() => setMenu(null)} style={{ font: "var(--body-lg)", color: strong, padding: "11px 0", borderBottom: `1px solid ${hairline}` }}>Healthcare</Link>
            <Link href="/utilities" onClick={() => setMenu(null)} style={{ font: "var(--body-lg)", color: strong, padding: "11px 0", borderBottom: `1px solid ${hairline}` }}>Utilities</Link>
            <div style={{ font: "var(--label)", letterSpacing: "var(--label-track)", color: linkMuted, padding: "18px 0 4px" }}>Company</div>
            <Link href="/about" onClick={() => setMenu(null)} style={{ font: "var(--body-lg)", color: strong, padding: "11px 0", borderBottom: `1px solid ${hairline}` }}>About us</Link>
            <Link href="/careers" onClick={() => setMenu(null)} style={{ font: "var(--body-lg)", color: strong, padding: "11px 0", borderBottom: `1px solid ${hairline}` }}>Careers</Link>
            <div style={{ font: "var(--label)", letterSpacing: "var(--label-track)", color: linkMuted, padding: "18px 0 4px" }}>Resources</div>
            <Link href="/blog" onClick={() => setMenu(null)} style={{ font: "var(--body-lg)", color: strong, padding: "11px 0", borderBottom: `1px solid ${hairline}` }}>Blog</Link>
            <Link href="/contact" onClick={() => setMenu(null)} style={{ marginTop: 22, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9, background: mobileCtaBg, color: mobileCtaFg, font: "var(--label)", letterSpacing: "var(--label-track)", padding: "15px 22px", borderRadius: 999, minHeight: 48, borderBottom: 0 }}>
              Get in touch
              <img src={mobileCtaArrow} alt="" style={{ width: 13, height: 12, display: "block" }} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
