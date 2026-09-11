import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Knowledge base — In progress",
  description:
    "A sacred knowledge page for our ops, tech and customer stories. Coming soon.",
};

export default function BipPage() {
  return (
    <div style={{ background: "var(--surface-page)", minHeight: "100vh" }}>
      <SiteNav tone="light" />

      <section
        style={{
          minHeight: "calc(100vh - 70px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 600 }}>
          <span
            style={{
              font: "var(--mono-md)",
              color: "var(--blue-600)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            In progress
          </span>

          <h1
            style={{
              font: "var(--display-2)",
              letterSpacing: "var(--display-track)",
              color: "var(--text-strong)",
              margin: "20px 0 0",
              textWrap: "balance" as React.CSSProperties["textWrap"],
            }}
          >
            The sacred knowledge page
          </h1>

          <p
            style={{
              font: "var(--body-lg)",
              color: "var(--text-body)",
              margin: "22px 0 0",
              textWrap: "pretty" as React.CSSProperties["textWrap"],
            }}
          >
            A home for our ops, tech, and customer stories — built from the
            field, not the boardroom.
          </p>

          <div
            style={{
              marginTop: 48,
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {["Ops", "Tech", "Customer stories"].map((label) => (
              <span
                key={label}
                style={{
                  font: "var(--label)",
                  letterSpacing: "var(--label-track)",
                  color: "var(--blue-700)",
                  background: "rgba(63,122,224,.08)",
                  border: "1px solid rgba(63,122,224,.18)",
                  borderRadius: 999,
                  padding: "10px 20px",
                }}
              >
                {label}
              </span>
            ))}
          </div>

          <div
            style={{
              marginTop: 56,
              height: 1,
              background: "var(--border-hairline)",
              maxWidth: 200,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />

          <p
            style={{
              font: "var(--body-md)",
              color: "var(--text-muted)",
              margin: "28px 0 0",
            }}
          >
            We're putting this together. In the meantime —
          </p>

          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              background: "var(--action-primary)",
              color: "var(--paper-050)",
              font: "var(--label)",
              letterSpacing: "var(--label-track)",
              padding: "14px 24px",
              borderRadius: 999,
              marginTop: 20,
              transition: "background var(--dur-fast) var(--ease-out)",
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
      </section>
    </div>
  );
}
