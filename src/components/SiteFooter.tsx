import Link from "next/link";

export default function SiteFooter({ id }: { id?: string }) {
  return (
    <footer
      id={id}
      className="brand-field--flat on-navy"
      style={{ position: "relative" }}
    >
      <div
        data-r="foot"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "80px 24px 40px",
          display: "grid",
          gridTemplateColumns: "minmax(0,1.3fr) repeat(3,minmax(0,1fr))",
          gap: 48,
        }}
      >
        <div>
          <img
            src="/assets/logo-horizontal-white.png"
            alt="Deployed"
            style={{ width: 150, display: "block" }}
          />
          <div
            style={{
              font: "var(--eyebrow)",
              letterSpacing: "var(--eyebrow-track)",
              textTransform: "uppercase",
              color: "rgba(249,246,243,.44)",
              marginTop: 16,
              maxWidth: "24ch",
            }}
          >
            Reach optimal AI density within your org
          </div>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              border: "1px solid rgba(255,255,255,.28)",
              color: "var(--paper-050)",
              font: "var(--label)",
              letterSpacing: "var(--label-track)",
              padding: "12px 20px",
              borderRadius: 999,
              marginTop: 28,
              borderBottom: 0,
            }}
          >
            Get in touch
            <img
              src="/assets/icon-arrow-white.png"
              alt=""
              style={{ width: 13, height: 12, display: "block" }}
            />
          </Link>
        </div>

        <div style={{ display: "grid", gap: 11, alignContent: "start" }}>
          <div
            style={{
              font: "var(--label)",
              letterSpacing: "var(--label-track)",
              color: "rgba(249,246,243,.44)",
              marginBottom: 4,
            }}
          >
            Core
          </div>
          <Link
            href="/strategy"
            style={{ font: "var(--body-sm)", color: "rgba(249,246,243,.78)" }}
          >
            Strategy
          </Link>
          <Link
            href="/deployment"
            style={{ font: "var(--body-sm)", color: "rgba(249,246,243,.78)" }}
          >
            Deployment
          </Link>
          <Link
            href="/the-deployed-fit"
            style={{ font: "var(--body-sm)", color: "rgba(249,246,243,.78)" }}
          >
            The Deployed fit
          </Link>
        </div>

        <div style={{ display: "grid", gap: 11, alignContent: "start" }}>
          <div
            style={{
              font: "var(--label)",
              letterSpacing: "var(--label-track)",
              color: "rgba(249,246,243,.44)",
              marginBottom: 4,
            }}
          >
            Company
          </div>
          <Link
            href="/about"
            style={{ font: "var(--body-sm)", color: "rgba(249,246,243,.78)" }}
          >
            About
          </Link>
          <Link
            href="/careers"
            style={{ font: "var(--body-sm)", color: "rgba(249,246,243,.78)" }}
          >
            Careers
          </Link>
          <Link
            href="/contact"
            style={{ font: "var(--body-sm)", color: "rgba(249,246,243,.78)" }}
          >
            Contact
          </Link>
        </div>

        <div style={{ display: "grid", gap: 11, alignContent: "start" }}>
          <div
            style={{
              font: "var(--label)",
              letterSpacing: "var(--label-track)",
              color: "rgba(249,246,243,.44)",
              marginBottom: 4,
            }}
          >
            Resources
          </div>
          <Link
            href="/blog"
            style={{ font: "var(--body-sm)", color: "rgba(249,246,243,.78)" }}
          >
            Blog
          </Link>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "22px 24px 40px",
          borderTop: "1px solid var(--border-hairline)",
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{ font: "var(--mono-md)", color: "rgba(249,246,243,.38)" }}
        >
          deployed.md
        </span>
        <span
          style={{ font: "var(--mono-md)", color: "rgba(249,246,243,.38)" }}
        >
          {"©"} 2026 Deployed
        </span>
      </div>
    </footer>
  );
}
