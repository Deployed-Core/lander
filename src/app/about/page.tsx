"use client";

import { useEffect } from "react";
import SiteNav from "@/components/SiteNav";
import CompactFooter from "@/components/CompactFooter";
import LeadershipSection from "@/components/LeadershipSection";

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
      <SiteNav active="Company" tone="navy-solid" />

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
        <div data-reveal>
          <p
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
        </div>
      </section>

      {/* Locations */}
      <section
        className="brand-field--gradient on-navy"
        data-reveal
        style={{
          padding: "36px 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            padding: "100px 24px",
            textAlign: "center",
          }}
        >
        <h2
          style={{
            font: "var(--heading-2)",
            color: "var(--blue-300)",
            margin: "0 0 20px",
          }}
        >
          Where we work
        </h2>
        <p
          style={{
            font: "var(--display-2)",
            letterSpacing: "var(--display-track)",
            color: "var(--paper-000)",
            margin: 0,
            textWrap: "pretty" as never,
          }}
        >
          Serving enterprises across the United States, Australia, India, and the UAE.
        </p>
        <svg
          className="about-world-map"
          viewBox="0 0 1000 470"
          role="img"
          aria-labelledby="about-map-title about-map-description"
          style={{ display: "block", width: "100%", height: "auto", marginTop: 40, overflow: "visible" }}
        >
          <title id="about-map-title">Where Deployed works</title>
          <desc id="about-map-description">
            A world map marking the United States, the UAE, India, and Australia.
          </desc>
          <g fill="rgba(249,246,243,.14)" stroke="rgba(249,246,243,.24)" strokeWidth="1.5" strokeLinejoin="round">
            <path d="M83 112l32-29 55-13 33 14 22-4 31 20 10 23-18 15-7 25-25 11-12 30-20 20-8 28-21 7-17-19-5-33-18-21-19-6-13-30-19-12-5-26z" />
            <path d="M241 245l25 12 18 28 5 31-13 29-7 32-19 34-17-10-8-35-17-28 6-35 12-25-2-22 17-11z" />
            <path d="M432 102l31-20 39 6 21-11 28 13 22-2 18 18 35 2 33 18 37-6 35 19 28 25-6 18-34 2-20 19-29 4-21 21-21 5-14 26-20 7-16-16-20-3-18-23-25-3-16-22-24-1-16-18-19-5-20-24-27-8-9-24z" />
            <path d="M484 229l21-10 23 8 16 20-4 19-18 8-18-10-21-3-10-17z" />
            <path d="M516 264l32-16 37 6 23 23-4 27-23 10-7 31-19 23-21-8-10-26-23-16-9-25z" />
            <path d="M722 333l35-15 45 4 34 18 14 21-12 24-28 10-21-10-27 10-28-12-20-22z" />
            <path d="M853 390l13-7 12 8-5 16-14 4z" />
            <path d="M315 80l17-8 16 7-3 12-18 5z" />
          </g>
          <g fill="none" stroke="rgba(122,165,239,.62)" strokeWidth="1.5" strokeDasharray="5 7">
            <path d="M230 165Q387 82 547 224" />
            <path d="M547 224Q573 199 591 235" />
            <path d="M547 224Q638 264 751 355" />
          </g>
          <g className="about-map-marker" aria-label="United States">
            <circle className="about-map-pulse" cx="230" cy="165" r="12" />
            <circle cx="230" cy="165" r="5" />
            <text x="230" y="143" textAnchor="middle">UNITED STATES</text>
          </g>
          <g className="about-map-marker" aria-label="United Arab Emirates">
            <circle className="about-map-pulse" cx="547" cy="224" r="12" style={{ animationDelay: ".45s" }} />
            <circle cx="547" cy="224" r="5" />
            <text x="520" y="201" textAnchor="end">UAE</text>
          </g>
          <g className="about-map-marker" aria-label="India">
            <circle className="about-map-pulse" cx="591" cy="235" r="12" style={{ animationDelay: ".9s" }} />
            <circle cx="591" cy="235" r="5" />
            <text x="608" y="214">INDIA</text>
          </g>
          <g className="about-map-marker" aria-label="Australia">
            <circle className="about-map-pulse" cx="751" cy="355" r="12" style={{ animationDelay: "1.35s" }} />
            <circle cx="751" cy="355" r="5" />
            <text x="751" y="383" textAnchor="middle">AUSTRALIA</text>
          </g>
        </svg>
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
            {"“"}We build AI systems that enhances how the business operates.{"”"}
          </p>
        </div>
      </section>
      <LeadershipSection />
      <CompactFooter />

      <style>{`
        @keyframes about-map-pulse {
          0% { opacity: .65; transform: scale(.65); }
          100% { opacity: 0; transform: scale(2.4); }
        }
        .about-map-marker { fill: var(--blue-300); }
        .about-map-marker text { fill: var(--paper-000); font: 600 11px var(--font-sans, Arial, sans-serif); letter-spacing: 1.5px; }
        .about-map-pulse { fill: var(--blue-300); transform-box: fill-box; transform-origin: center; animation: about-map-pulse 1.8s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) { .about-map-pulse { animation: none; opacity: .35; transform: none; } }
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
