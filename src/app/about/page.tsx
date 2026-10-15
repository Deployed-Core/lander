"use client";

import { useEffect } from "react";
import type { GeoJsonObject } from "geojson";
import { ComposableMap, Geographies, Geography, Line, Marker } from "react-simple-maps";
import worldMap from "world-atlas/countries-110m.json";
import SiteNav from "@/components/SiteNav";
import CompactFooter from "@/components/CompactFooter";
import LeadershipSection from "@/components/LeadershipSection";

export default function AboutPage() {
  const locations = [
    { name: "UNITED STATES", coordinates: [-98, 39] as [number, number], offset: [0, -16] as [number, number] },
    { name: "UAE", coordinates: [54.4, 24.5] as [number, number], offset: [-12, -14] as [number, number] },
    { name: "INDIA", coordinates: [78.9, 20.6] as [number, number], offset: [16, -12] as [number, number] },
    { name: "AUSTRALIA", coordinates: [133.8, -25] as [number, number], offset: [0, 22] as [number, number] },
  ];
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
        <div role="img" aria-labelledby="about-map-title about-map-description" style={{ width: "100%", marginTop: 40 }}>
          <span id="about-map-title" className="about-map-sr-only">Where Deployed works</span>
          <span id="about-map-description" className="about-map-sr-only">A world map marking the United States, the UAE, India, and Australia, connected by animated lines.</span>
          <ComposableMap
            className="about-world-map"
            width={1000}
            height={470}
            projection="geoEqualEarth"
            projectionConfig={{ scale: 165, center: [12, 4] }}
            style={{ display: "block", width: "100%", height: "auto", overflow: "visible" }}
          >
            {/* react-simple-maps converts TopoJSON at runtime; its prop type only declares GeoJSON. */}
            <Geographies geography={worldMap as unknown as GeoJsonObject}>
              {({ geographies }) => geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="rgba(249,246,243,.14)"
                  stroke="rgba(249,246,243,.24)"
                  strokeWidth={0.7}
                  style={{ outline: "none" }}
                />
              ))}
            </Geographies>
            {locations.slice(0, -1).map((location, index) => (
              <Line
                key={`${location.name}-${locations[index + 1].name}`}
                from={location.coordinates}
                to={locations[index + 1].coordinates}
                className="about-map-connection"
                stroke="rgba(122,165,239,.8)"
                strokeWidth={1.5}
                strokeLinecap="round"
                style={{ animationDelay: `${index * 0.35}s` }}
              />
            ))}
            {locations.map((location, index) => (
              <Marker key={location.name} coordinates={location.coordinates}>
                <g className="about-map-marker" aria-label={location.name}>
                  <circle className="about-map-pulse" r={11} style={{ animationDelay: `${index * 0.4}s` }} />
                  <circle r={4.5} />
                  <text x={location.offset[0]} y={location.offset[1]} textAnchor="middle">{location.name}</text>
                </g>
              </Marker>
            ))}
          </ComposableMap>
        </div>
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
        @keyframes about-map-connection-blink {
          0%, 100% { opacity: .25; }
          50% { opacity: 1; }
        }
        .about-map-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
        .about-map-connection { stroke-dasharray: 5 7; animation: about-map-connection-blink 2s ease-in-out infinite; }
        .about-map-marker { fill: var(--blue-300); }
        .about-map-marker text { fill: var(--paper-000); font: 600 11px var(--font-sans, Arial, sans-serif); letter-spacing: 1.5px; }
        .about-map-pulse { fill: var(--blue-300); transform-box: fill-box; transform-origin: center; animation: about-map-pulse 1.8s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) { .about-map-pulse, .about-map-connection { animation: none; opacity: .55; transform: none; } }
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
