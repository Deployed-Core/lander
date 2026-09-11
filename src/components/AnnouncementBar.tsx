import Link from "next/link";

export default function AnnouncementBar({ tone = "light" }: { tone?: "light" | "navy" }) {
  const navy = tone === "navy";
  return (
    <div
      style={{
        background: navy ? "var(--blue-950)" : "var(--paper-050)",
        color: navy ? "var(--paper-050)" : "var(--text-body)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        padding: "11px 24px",
        font: "var(--body-sm)",
        textAlign: "center",
        borderBottom: navy ? "none" : "1px solid var(--border-hairline)",
      }}
    >
      <span>Now taking Q4 deployment engagements</span>
      <Link
        href="/blog"
        style={{
          color: navy ? "var(--blue-300)" : "var(--text-strong)",
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          font: "var(--label)",
          letterSpacing: "var(--label-track)",
          borderBottom: 0,
        }}
      >
        Read more
        {!navy && (
          <img
            src="/assets/icon-arrow-navy.png"
            alt=""
            style={{ width: 13, height: 12, display: "block" }}
          />
        )}
      </Link>
    </div>
  );
}
