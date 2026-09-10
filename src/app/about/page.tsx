"use client";

import { useEffect } from "react";
import SiteNav from "@/components/SiteNav";
import AnnouncementBar from "@/components/AnnouncementBar";
import CompactFooter from "@/components/CompactFooter";

export default function AboutPage() {
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
      <AnnouncementBar />
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
          We build operating leverage with AI.
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
          Deployed is a forward-deployed solution engineering firm
        </p>
      </section>

      {/* Two-column: image + body text */}
      <section
        data-r="cols2"
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "48px 24px 96px",
          display: "grid",
          gridTemplateColumns: "minmax(0,1.35fr) minmax(0,1fr)",
          gap: 56,
          alignItems: "start",
        }}
      >
        <div
          data-reveal
          style={{
            position: "relative",
            aspectRatio: "16/10",
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
            border: "1px solid var(--border-hairline)",
            background: "var(--surface-sunken)",
          }}
        >
          <img
            src="/assets/about-slot1.png"
            alt="Team collaborating in a modern office"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
        <p
          data-reveal
          style={{
            font: "var(--body-lg)",
            color: "var(--text-body)",
            margin: 0,
            maxWidth: "44ch",
            textWrap: "pretty" as never,
          }}
        >
          We work with enterprise teams to identify high-leverage business
          problems, then build custom AI and agentic systems directly into their
          operations.
        </p>
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
            {"“"}AI should change how the business operates.{"”"}
          </p>
        </div>
      </section>

      {/* Two-column: display text + benefits list */}
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
            The value of AI is not in how much you use.
          </p>
          <p
            style={{
              font: "var(--display-3)",
              letterSpacing: "var(--display-track)",
              color: "var(--blue-700)",
              margin: "22px 0 0",
              maxWidth: "24ch",
              textWrap: "pretty" as never,
            }}
          >
            It is in what it makes possible.
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
            "More throughput",
            "Faster decisions",
            "Less coordination",
            "New capabilities without proportional headcount",
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

      {/* Wide image with overlay text */}
      <section
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "0 24px 104px",
        }}
      >
        <div
          data-reveal
          style={{
            position: "relative",
            aspectRatio: "21/9",
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
            border: "1px solid var(--border-hairline)",
            background: "var(--surface-sunken)",
          }}
        >
          <img
            src="/assets/about-slot2.png"
            alt="Team presenting strategy on whiteboard"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div
            style={{
              position: "absolute",
              inset: "auto 0 0 0",
              pointerEvents: "none",
              background:
                "linear-gradient(to top,rgba(0,5,30,.92),rgba(0,5,30,0))",
              padding: "64px 32px 28px",
            }}
          >
            <p
              style={{
                font: "var(--display-3)",
                fontSize: "clamp(18px,1.7vw,24px)",
                letterSpacing: "var(--display-track)",
                color: "var(--paper-000)",
                margin: 0,
                maxWidth: "38ch",
                textWrap: "pretty" as never,
              }}
            >
              We start with the business outcome and work backwards into the
              technology.
            </p>
          </div>
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
