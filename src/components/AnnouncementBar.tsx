import Link from "next/link";

export default function AnnouncementBar({ tone = "light" }: { tone?: "light" | "navy" | "navy-solid" }) {
  const dark = tone === "navy" || tone === "navy-solid";
  return (
    <div
      style={{
        background: dark
          ? "var(--paper-050)"
          : "var(--blue-950)",
        color: dark ? "var(--text-strong)" : "var(--paper-050)",
        borderBottom: dark ? "1px solid var(--border-hairline)" : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        padding: "10px 24px",
        font: "var(--body-sm)",
        textAlign: "center",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          fontWeight: 600,
        }}
      >
        <span
          style={{
            background: dark
              ? "rgba(10, 37, 64, 0.08)"
              : "rgba(255, 255, 255, 0.14)",
            color: dark ? "var(--blue-700)" : "var(--blue-200)",
            font: "var(--label)",
            letterSpacing: "var(--label-track)",
            padding: "3px 10px",
            borderRadius: "var(--radius-pill)",
            lineHeight: 1.4,
          }}
        >
          Latest
        </span>
        State of AI in Healthcare — 2026
      </span>
      <Link
        href="/report/state-of-ai-in-healthcare-2026"
        style={{
          color: dark ? "var(--text-link)" : "var(--blue-300)",
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          font: "var(--label)",
          letterSpacing: "var(--label-track)",
          borderBottom: 0,
          whiteSpace: "nowrap",
        }}
      >
        Read More
        <span aria-hidden="true" style={{ fontSize: 14 }}>&rarr;</span>
      </Link>
    </div>
  );
}
