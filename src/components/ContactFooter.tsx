import Link from "next/link";

export default function ContactFooter() {
  return (
    <footer className="brand-field--flat on-navy" style={{ position: "relative" }}>
      <style>{`
        @media (max-width: 900px) {
          .compact-footer-inner {
            justify-content: center !important;
            text-align: center;
          }
          .compact-footer-cta {
            margin-left: 0 !important;
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
      <div
        className="compact-footer-inner"
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "72px clamp(32px, 5vw, 80px)",
          display: "flex",
          alignItems: "flex-start",
          gap: 28,
          flexWrap: "wrap",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", borderBottom: 0 }}>
        <img src="/assets/logo-horizontal-white.png" alt="Deployed" style={{ width: 150, minWidth: 130, display: "block" }} />
        </Link>
        <span style={{ font: "var(--eyebrow)", letterSpacing: "var(--eyebrow-track)", textTransform: "uppercase", color: "rgba(249,246,243,.6)" }}>
          Reach optimal AI density within your org
        </span>
        <div className="compact-footer-cta" style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 20 }}>
          <Link
            href="/privacy"
            style={{
              font: "var(--body-sm)",
              color: "rgba(249,246,243,.5)",
            }}
          >
            Privacy
          </Link>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              background: "var(--paper-050)",
              color: "var(--blue-950)",
              font: "var(--label)",
              letterSpacing: "var(--label-track)",
              padding: "13px 22px",
              borderRadius: 999,
            }}
          >
            Get in touch
            <img src="/assets/icon-arrow-navy.png" alt="" style={{ width: 13, height: 12, display: "block" }} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
