"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Tone = "light" | "navy" | "navy-solid";
type MenuState = "core" | "industries" | "company" | "mobile" | null;

export default function SiteNav({
  tone = "light",
  active = "",
  showCta = true,
  showSignIn = false,
}: {
  tone?: Tone;
  active?: string;
  showCta?: boolean;
  showSignIn?: boolean;
}) {
  const [menu, setMenu] = useState<MenuState>(null);

  const solid = tone === "navy-solid";
  const navy = tone === "navy" || solid;

  const strong = navy ? "var(--paper-050)" : "var(--text-strong)";
  const body = navy ? "rgba(249,246,243,.78)" : "var(--text-body)";
  const activeColor = navy ? "var(--blue-300)" : "var(--blue-600)";
  const col = (name: string) => (active === name ? activeColor : body);
  const wt = (name: string) => (active === name ? "500" : "400");

  const barBg = solid ? "#00051e" : navy ? "transparent" : "rgba(249,246,243,.92)";
  const barBorder = solid ? "1px solid rgba(255,255,255,.09)" : navy ? "0" : "1px solid var(--border-hairline)";
  const panelBg = navy ? "rgba(0,5,30,.94)" : "rgba(249,246,243,.98)";
  const hairline = navy ? "rgba(255,255,255,.10)" : "var(--border-hairline)";
  const cardBorder = navy ? "rgba(255,255,255,.12)" : "var(--border-hairline)";
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
          maxWidth: solid ? 1200 : navy ? "none" : 1160,
          margin: "0 auto",
          padding: navy && !solid ? "0 clamp(20px,3vw,40px)" : "0 24px",
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
          <Link href="/blog" style={{ font: "var(--body-sm)", fontSize: "13.5px", color: col("Blog"), fontWeight: wt("Blog"), borderBottom: 0 }}>Blog</Link>
        </nav>

        {showSignIn && (
          <Link href="/contact" className="nav-links" style={{ marginLeft: "auto", font: "var(--body-sm)", fontSize: "13.5px", color: strong, borderBottom: 0 }}>Sign in</Link>
        )}

        <button type="button" className="nav-burger" onClick={() => setMenu(m => m === "mobile" ? null : "mobile")} aria-label="Menu" style={{ background: "none", border: `1px solid ${ctaBorder}`, borderRadius: 999, padding: "9px 14px", cursor: "pointer", alignItems: "center", gap: 8, font: "var(--label)", letterSpacing: "var(--label-track)", color: strong }}>{menu === "mobile" ? "Close" : "Menu"}</button>

        {showCta && (
          <Link href="/contact" className="nav-cta" style={{ marginLeft: showSignIn ? 16 : "auto", display: "inline-flex", alignItems: "center", gap: 9, border: `1px solid ${ctaBorder}`, color: strong, font: "var(--label)", letterSpacing: "var(--label-track)", padding: "11px 18px", borderRadius: 999 }}>
            Get in touch
            <img src={arrow} alt="" style={{ width: 13, height: 12, display: "block" }} />
          </Link>
        )}
      </div>

      {menu === "core" && (
        <div style={{ position: "absolute", left: 0, right: 0, top: "100%", background: panelBg, borderTop: `1px solid ${hairline}`, borderBottom: `1px solid ${hairline}`, backdropFilter: "var(--blur-glass)", WebkitBackdropFilter: "var(--blur-glass)", animation: "nav-fade var(--dur-base) var(--ease-out) both" }}>
          <div style={{ maxWidth: 1160, margin: "0 auto", padding: "26px 24px 30px", display: "grid", gridTemplateColumns: "minmax(0,1.15fr) minmax(0,1fr)", gap: 18 }}>
            <Link href="/the-deployed-fit" onClick={() => setMenu(null)} style={{ borderRadius: "var(--radius-md)", padding: 26, background: glassBg, display: "flex", flexDirection: "column", justifyContent: "flex-end", minHeight: 150, transition: "background var(--dur-fast) var(--ease-out)", borderBottom: 0 }} onMouseEnter={e => (e.currentTarget.style.background = glassBgHover)} onMouseLeave={e => (e.currentTarget.style.background = glassBg)}>
              <div style={{ font: "var(--eyebrow)", letterSpacing: "var(--eyebrow-track)", textTransform: "uppercase", color: linkMuted }}>The Deployed fit</div>
              <div style={{ font: "var(--display-3)", letterSpacing: "var(--display-track)", color: strong, marginTop: 12 }}>Where we create the most leverage</div>
            </Link>
            <div style={{ display: "grid", gap: 18 }}>
              <Link href="/strategy" onClick={() => setMenu(null)} style={{ borderRadius: "var(--radius-md)", padding: "20px 22px", background: glassBg, display: "block", transition: "background var(--dur-fast) var(--ease-out)", borderBottom: 0 }} onMouseEnter={e => (e.currentTarget.style.background = glassBgHover)} onMouseLeave={e => (e.currentTarget.style.background = glassBg)}>
                <div style={{ font: "var(--heading-2)", color: strong }}>Strategy</div>
                <div style={{ font: "var(--body-sm)", color: linkMuted, marginTop: 5 }}>Drive your AI transformation</div>
              </Link>
              <Link href="/deployment" onClick={() => setMenu(null)} style={{ borderRadius: "var(--radius-md)", padding: "20px 22px", background: glassBg, display: "block", transition: "background var(--dur-fast) var(--ease-out)", borderBottom: 0 }} onMouseEnter={e => (e.currentTarget.style.background = glassBgHover)} onMouseLeave={e => (e.currentTarget.style.background = glassBg)}>
                <div style={{ font: "var(--heading-2)", color: strong }}>Deployment</div>
                <div style={{ font: "var(--body-sm)", color: linkMuted, marginTop: 5 }}>Locally embedded teams who ship</div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {menu === "industries" && (
        <div style={{ position: "absolute", left: 0, right: 0, top: "100%", background: panelBg, borderTop: `1px solid ${hairline}`, borderBottom: `1px solid ${hairline}`, backdropFilter: "var(--blur-glass)", WebkitBackdropFilter: "var(--blur-glass)", animation: "nav-fade var(--dur-base) var(--ease-out) both" }}>
          <div style={{ maxWidth: 1160, margin: "0 auto", padding: "26px 24px 30px", display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 16 }}>
            {[
              { href: "/banking", label: "Banking" },
              { href: "/healthcare", label: "Healthcare" },
              { href: "/utilities", label: "Utilities" },
            ].map(item => (
              <Link key={item.href} href={item.href} onClick={() => setMenu(null)} style={{ border: `1px solid ${cardBorder}`, borderRadius: "var(--radius-md)", padding: "20px 22px", background: cardBg, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                <span style={{ font: "var(--heading-2)", color: strong }}>{item.label}</span>
                <img src={arrow} alt="" style={{ width: 15, height: 14, display: "block", opacity: 0.55 }} />
              </Link>
            ))}
          </div>
        </div>
      )}

      {menu === "company" && (
        <div style={{ position: "absolute", left: 0, right: 0, top: "100%", background: panelBg, borderTop: `1px solid ${hairline}`, borderBottom: `1px solid ${hairline}`, backdropFilter: "var(--blur-glass)", WebkitBackdropFilter: "var(--blur-glass)", animation: "nav-fade var(--dur-base) var(--ease-out) both" }}>
          <div style={{ maxWidth: 1160, margin: "0 auto", padding: "22px 24px 26px", display: "grid", gap: 2 }}>
            <Link href="/about" onClick={() => setMenu(null)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "14px 4px", borderBottom: `1px solid ${hairline}` }}>
              <span style={{ font: "var(--heading-2)", color: strong }}>About us</span>
              <img src={arrow} alt="" style={{ width: 15, height: 14, display: "block", opacity: 0.5 }} />
            </Link>
            <Link href="#" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "14px 4px", borderBottom: 0 }}>
              <span style={{ font: "var(--heading-2)", color: strong }}>Careers</span>
              <img src={arrow} alt="" style={{ width: 15, height: 14, display: "block", opacity: 0.5 }} />
            </Link>
          </div>
        </div>
      )}

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
            <Link href="#" style={{ font: "var(--body-lg)", color: strong, padding: "11px 0", borderBottom: `1px solid ${hairline}` }}>Careers</Link>
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
