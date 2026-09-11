"use client";

import { useEffect } from "react";
import SiteNav from "@/components/SiteNav";
import CompactFooter from "@/components/CompactFooter";

export default function CareersPage() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    nodes.forEach((n) => {
      n.style.transition =
        "opacity 600ms cubic-bezier(.22,.61,.36,1), transform 600ms cubic-bezier(.22,.61,.36,1)";
      n.style.opacity = "0";
      n.style.transform = "translateY(8px)";
    });
    const show = (n: HTMLElement) => {
      n.style.opacity = "1";
      n.style.transform = "none";
    };
    if (!("IntersectionObserver" in window)) {
      nodes.forEach(show);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            show(e.target as HTMLElement);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    nodes.forEach((n) => io.observe(n));
    const safety = setTimeout(() => nodes.forEach(show), 2500);
    return () => {
      io.disconnect();
      clearTimeout(safety);
    };
  }, []);

  return (
    <div style={{ background: "var(--paper-050)", minHeight: "100vh" }}>
      <SiteNav active="Company" tone="light" />

      {/* Hero */}
      <section
        id="top"
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "76px 24px 0",
        }}
      >
        <h1
          data-reveal
          style={{
            font: "var(--display-2)",
            letterSpacing: "var(--display-track)",
            color: "var(--text-strong)",
            margin: 0,
            maxWidth: "24ch",
            textWrap: "pretty" as never,
          }}
        >
          Careers at Deployed
        </h1>
        <p
          data-reveal
          style={{
            font: "var(--eyebrow)",
            letterSpacing: "var(--eyebrow-track)",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            margin: "22px 0 0",
          }}
        >
          Join the team building operating leverage with AI
        </p>
      </section>

      {/* Coming Soon Card */}
      <section
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "64px 24px 40px",
        }}
      >
        <div
          data-reveal
          style={{
            position: "relative",
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
            border: "1px solid var(--border-hairline)",
            background: "var(--surface-sunken)",
            padding: "80px 32px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-block",
              font: "var(--eyebrow)",
              letterSpacing: "var(--eyebrow-track)",
              textTransform: "uppercase",
              color: "var(--blue-700)",
              background: "rgba(37,99,235,.08)",
              padding: "6px 16px",
              borderRadius: 999,
              marginBottom: 28,
            }}
          >
            Coming soon
          </div>
          <p
            style={{
              font: "var(--display-3)",
              letterSpacing: "var(--display-track)",
              color: "var(--text-strong)",
              margin: "0 auto",
              maxWidth: "28ch",
              textWrap: "pretty" as never,
            }}
          >
            We&rsquo;re building something worth joining.
          </p>
          <p
            style={{
              font: "var(--body-lg)",
              color: "var(--text-body)",
              margin: "20px auto 0",
              maxWidth: "48ch",
              textWrap: "pretty" as never,
            }}
          >
            Open roles will be listed here soon. In the meantime, reach out if
            you want to be part of a team that ships AI into real enterprise
            operations.
          </p>
        </div>
      </section>

      {/* Quote banner */}
      <section
        className="brand-field--gradient on-navy"
        style={{ position: "relative" }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            padding: "100px 24px",
            textAlign: "center",
          }}
        >
          <p
            data-reveal
            style={{
              font: "var(--display-2)",
              letterSpacing: "var(--display-track)",
              color: "var(--paper-000)",
              margin: 0,
              textWrap: "pretty" as never,
            }}
          >
            {"“"}We hire people who ship.{"”"}
          </p>
        </div>
      </section>

      {/* Values */}
      <section
        data-r="cols2"
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "96px 24px",
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1.05fr)",
          gap: 64,
          alignItems: "start",
        }}
      >
        <div data-reveal>
          <p
            style={{
              font: "var(--display-3)",
              letterSpacing: "var(--display-track)",
              color: "var(--text-strong)",
              margin: 0,
              maxWidth: "24ch",
              textWrap: "pretty" as never,
            }}
          >
            What it&rsquo;s like to work here.
          </p>
          <p
            style={{
              font: "var(--body-lg)",
              color: "var(--text-body)",
              margin: "20px 0 0",
              maxWidth: "38ch",
              textWrap: "pretty" as never,
            }}
          >
            We&rsquo;re a small, high-leverage team. Every person ships directly
            into enterprise operations.
          </p>
        </div>
        <div
          data-reveal
          style={{
            display: "grid",
            gap: 1,
            background: "var(--border-hairline)",
            borderTop: "1px solid var(--border-hairline)",
            borderBottom: "1px solid var(--border-hairline)",
          }}
        >
          {[
            "Forward-deployed — embedded with the client",
            "Ownership from day one",
            "Ship AI that runs real operations",
            "Small team, outsized impact",
          ].map((item) => (
            <div
              key={item}
              style={{
                background: "var(--surface-page)",
                padding: "20px 4px",
                font: "var(--body-lg)",
                color: "var(--text-body)",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "0 24px 104px",
          textAlign: "center",
        }}
      >
        <div
          data-reveal
          style={{
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-hairline)",
            background: "var(--paper-000)",
            padding: "56px 32px",
          }}
        >
          <p
            style={{
              font: "var(--display-3)",
              letterSpacing: "var(--display-track)",
              color: "var(--text-strong)",
              margin: 0,
            }}
          >
            Interested?
          </p>
          <p
            style={{
              font: "var(--body-lg)",
              color: "var(--text-body)",
              margin: "14px auto 28px",
              maxWidth: "42ch",
            }}
          >
            Drop us a line and tell us what you&rsquo;re working on.
          </p>
          <a
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              border: "1px solid var(--border-strong)",
              color: "var(--text-strong)",
              font: "var(--label)",
              letterSpacing: "var(--label-track)",
              padding: "13px 22px",
              borderRadius: 999,
              textDecoration: "none",
            }}
          >
            Get in touch
            <img
              src="/assets/icon-arrow-navy.png"
              alt=""
              style={{ width: 13, height: 12, display: "block" }}
            />
          </a>
        </div>
      </section>

      <CompactFooter />

      <style>{`
        @media (max-width: 900px) {
          [data-r="cols2"] {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </div>
  );
}
