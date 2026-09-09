"use client";

import { useEffect } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";

export default function Home() {
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
    <div style={{ background: "var(--surface-page)", minHeight: "100vh" }}>
      <style>{`
        @keyframes dep-travel{0%{transform:translateX(0);opacity:0}12%{opacity:1}88%{opacity:1}100%{transform:translateX(var(--dep-run,56px));opacity:0}}
        @keyframes dep-breathe{0%,100%{box-shadow:0 0 0 0 rgba(63,122,224,0)}50%{box-shadow:0 0 0 5px rgba(63,122,224,.13)}}
        @keyframes dep-flip{
          0%,20%{transform:translateY(0) rotateX(0deg)}
          26%{transform:translateY(-12.5%) rotateX(-42deg)}
          33%,53%{transform:translateY(-25%) rotateX(0deg)}
          59%{transform:translateY(-37.5%) rotateX(-42deg)}
          66%,86%{transform:translateY(-50%) rotateX(0deg)}
          92%{transform:translateY(-62.5%) rotateX(-42deg)}
          100%{transform:translateY(-75%) rotateX(0deg)}
        }
        @media (prefers-reduced-motion:reduce){[data-flow]{animation:none !important}}

        @media (max-width:900px){
          [data-r="cols2"]{grid-template-columns:minmax(0,1fr) !important;gap:32px !important}
          [data-r="tri"]{grid-template-columns:minmax(0,1fr) !important;gap:16px !important}
          [data-r="side"]{grid-template-columns:minmax(0,1fr) !important;gap:24px !important}
          [data-r="side"] > *{position:static !important}
          [data-r="flow"]{grid-template-columns:minmax(0,1fr) !important;gap:18px !important}
          [data-r="conn"]{display:none !important}
          [data-r="foot"]{grid-template-columns:repeat(2,minmax(0,1fr)) !important;gap:32px !important}
        }
        @media (max-width:620px){
          [data-r="mosaic"]{grid-template-columns:minmax(0,1fr) !important}
          [data-r="mosaic"] > *{grid-row:auto !important;grid-column:auto !important}
        }
        @media (max-width:560px){
          [data-r="foot"]{grid-template-columns:minmax(0,1fr) !important}
        }
      `}</style>

      {/* ── Banner ── */}
      <div
        style={{
          background: "var(--paper-050)",
          color: "var(--text-body)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          padding: "11px 24px",
          font: "var(--body-sm)",
          textAlign: "center",
        }}
      >
        <span>Now taking Q4 deployment engagements</span>
        <a
          href="#contact"
          style={{
            color: "var(--text-strong)",
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            font: "var(--label)",
            letterSpacing: "var(--label-track)",
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

      {/* ── Nav ── */}
      <SiteNav tone="navy-solid" showSignIn={true} />

      {/* ── Hero ── */}
      <section
        id="top"
        className="brand-field on-navy"
        style={{
          position: "relative",
          minHeight: "78vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          overflow: "hidden",
        }}
      >
        <div
          data-r="cols2"
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1200,
            margin: "0 auto",
            width: "100%",
            padding: "clamp(120px,16vw,150px) 24px 68px",
            boxSizing: "border-box",
            display: "grid",
            gridTemplateColumns: "minmax(0,1.25fr) minmax(0,1fr)",
            gap: 48,
            alignItems: "end",
          }}
        >
          <div>
            <img
              src="/assets/wordmark-white.png"
              alt="Deployed"
              style={{ width: "min(100%,520px)", display: "block" }}
            />
            <div
              style={{
                font: "var(--eyebrow)",
                letterSpacing: "var(--eyebrow-track)",
                textTransform: "uppercase",
                color: "rgba(249,246,243,.58)",
                marginTop: 20,
              }}
            >
              Reach optimal AI density within your org
            </div>
          </div>
          <div style={{ paddingBottom: 6 }}>
            <h1
              style={{
                font: "var(--display-2)",
                letterSpacing: "var(--display-track)",
                color: "var(--paper-000)",
                margin: 0,
              }}
            >
              Applied AI
              <br />
              for the enterprise
            </h1>
            <p
              style={{
                font: "var(--body-md)",
                color: "rgba(249,246,243,.74)",
                margin: "18px 0 0",
                maxWidth: "38ch",
              }}
            >
              We build custom AI systems around how your organisation already
              operates — then hand them over.
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 26,
                flexWrap: "wrap",
              }}
            >
              <a
                href="#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  background: "var(--paper-050)",
                  color: "var(--blue-950)",
                  font: "var(--label)",
                  letterSpacing: "var(--label-track)",
                  padding: "14px 22px",
                  borderRadius: 999,
                  transition:
                    "background var(--dur-fast) var(--ease-out)",
                }}
              >
                Get in touch
                <img
                  src="/assets/icon-arrow-navy.png"
                  alt=""
                  style={{ width: 13, height: 12, display: "block" }}
                />
              </a>
              <a
                href="#fit"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  border: "1px solid rgba(255,255,255,.30)",
                  color: "var(--paper-050)",
                  font: "var(--label)",
                  letterSpacing: "var(--label-track)",
                  padding: "14px 22px",
                  borderRadius: 999,
                  transition:
                    "border-color var(--dur-fast) var(--ease-out)",
                }}
              >
                See the approach
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Client logos ── */}
      <section
        id="industries"
        style={{
          background: "var(--surface-page)",
          borderBottom: "1px solid var(--border-hairline)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "26px 24px",
            display: "flex",
            alignItems: "center",
            gap: 32,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              font: "var(--eyebrow)",
              letterSpacing: "var(--eyebrow-track)",
              textTransform: "uppercase",
              color: "var(--text-faint)",
            }}
          >
            Deployed with
          </span>
          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              flex: 1,
            }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  minWidth: 104,
                  height: 38,
                  border: "1px dashed var(--border-subtle)",
                  borderRadius: "var(--radius-sm)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  font: "var(--body-sm)",
                  fontSize: 11,
                  color: "var(--text-faint)",
                }}
              >
                Client mark
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Premise ── */}
      <section id="fit" style={{ background: "var(--surface-page)" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "96px 24px 40px",
          }}
        >
          <div data-reveal style={{ maxWidth: "22ch" }}>
            <span
              style={{
                font: "var(--eyebrow)",
                letterSpacing: "var(--eyebrow-track)",
                textTransform: "uppercase",
                color: "var(--text-faint)",
              }}
            >
              The premise
            </span>
          </div>
          <p
            data-reveal=""
            style={{
              font: "var(--display-3)",
              letterSpacing: "var(--display-track)",
              color: "var(--text-strong)",
              margin: "18px 0 0",
              maxWidth: "30ch",
              textWrap: "pretty" as React.CSSProperties["textWrap"],
            }}
          >
            Enterprises need custom AI systems built around how they already
            operate
          </p>
          <p
            data-reveal=""
            style={{
              font: "var(--body-lg)",
              color: "var(--text-body)",
              margin: "20px 0 0",
              maxWidth: "58ch",
              textWrap: "pretty" as React.CSSProperties["textWrap"],
            }}
          >
            — aligned with their workflows, data, and existing stack, to unlock
            meaningful operating leverage.
          </p>
        </div>

        <div
          data-r="cols2"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "24px 24px 100px",
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
            gap: 64,
            alignItems: "start",
          }}
        >
          {/* Left column — callout + word flip */}
          <div>
            <div
              data-reveal=""
              style={{
                borderLeft: "2px solid var(--blue-400)",
                paddingLeft: 18,
                marginBottom: 44,
              }}
            >
              <p
                style={{
                  font: "var(--display-3)",
                  fontSize: "clamp(22px,2vw,30px)",
                  letterSpacing: "var(--display-track)",
                  color: "var(--blue-700)",
                  margin: 0,
                  textWrap: "pretty" as React.CSSProperties["textWrap"],
                }}
              >
                AI is changing the economics of how businesses operate.
              </p>
            </div>
            <p
              data-reveal=""
              style={{
                font: "var(--display-2)",
                fontSize: "clamp(28px,3.1vw,44px)",
                letterSpacing: "var(--display-track)",
                color: "var(--text-strong)",
                margin: 0,
                textWrap: "pretty" as React.CSSProperties["textWrap"],
              }}
            >
              Same{" "}
              <span
                style={{
                  display: "inline-block",
                  verticalAlign: "bottom",
                  height: "1.06em",
                  overflow: "hidden",
                  perspective: 600,
                }}
              >
                <span
                  data-flow=""
                  style={{
                    display: "block",
                    animation:
                      "dep-flip 9s cubic-bezier(.22,.61,.36,1) infinite",
                    transformOrigin: "center bottom",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      height: "1.06em",
                      color: "var(--blue-700)",
                    }}
                  >
                    systems
                  </span>
                  <span
                    style={{
                      display: "block",
                      height: "1.06em",
                      color: "var(--blue-700)",
                    }}
                  >
                    processes
                  </span>
                  <span
                    style={{
                      display: "block",
                      height: "1.06em",
                      color: "var(--blue-700)",
                    }}
                  >
                    manpower
                  </span>
                  <span
                    style={{
                      display: "block",
                      height: "1.06em",
                      color: "var(--blue-700)",
                    }}
                  >
                    systems
                  </span>
                </span>
              </span>
              , powered by agentic ops.
            </p>
          </div>

          {/* Right column — stat mosaic */}
          <div data-reveal="">
            <div
              data-r="mosaic"
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
                gridAutoRows: "minmax(96px,auto)",
                gap: 14,
              }}
            >
              <div
                style={{
                  gridRow: "span 2",
                  background: "var(--surface-card)",
                  border: "1px solid var(--border-hairline)",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "var(--shadow-1)",
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  style={{
                    font: "var(--metric)",
                    fontSize: "clamp(44px,5vw,68px)",
                    fontVariantNumeric: "tabular-nums",
                    color: "var(--blue-850)",
                  }}
                >
                  4x
                </div>
                <div
                  style={{
                    font: "var(--label)",
                    letterSpacing: "var(--label-track)",
                    color: "var(--text-muted)",
                    marginTop: 10,
                  }}
                >
                  Revenue growth
                </div>
              </div>
              <div
                style={{
                  background: "var(--surface-card)",
                  border: "1px solid var(--border-hairline)",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "var(--shadow-1)",
                  padding: 20,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  style={{
                    font: "var(--metric)",
                    fontVariantNumeric: "tabular-nums",
                    color: "var(--blue-850)",
                  }}
                >
                  60%
                </div>
                <div
                  style={{
                    font: "var(--label)",
                    letterSpacing: "var(--label-track)",
                    color: "var(--text-muted)",
                    marginTop: 8,
                  }}
                >
                  Conversion
                </div>
              </div>
              <div
                style={{
                  background: "var(--surface-card)",
                  border: "1px solid var(--border-hairline)",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "var(--shadow-1)",
                  padding: 20,
                  display: "grid",
                  gridTemplateColumns: "auto minmax(0,1fr)",
                  alignItems: "end",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    font: "var(--metric)",
                    fontSize: 30,
                    color: "var(--blue-400)",
                    lineHeight: 1,
                  }}
                >
                  {"↑"}
                </div>
                <div
                  style={{
                    font: "var(--label)",
                    letterSpacing: "var(--label-track)",
                    color: "var(--text-muted)",
                  }}
                >
                  Efficiency
                </div>
              </div>
              <div
                style={{
                  gridColumn: "span 2",
                  background: "var(--surface-card)",
                  border: "1px solid var(--border-hairline)",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "var(--shadow-1)",
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "baseline",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    font: "var(--metric)",
                    fontSize: 36,
                    fontVariantNumeric: "tabular-nums",
                    color: "var(--blue-850)",
                  }}
                >
                  0
                </div>
                <div
                  style={{
                    font: "var(--label)",
                    letterSpacing: "var(--label-track)",
                    color: "var(--text-muted)",
                  }}
                >
                  Downtime during rollout
                </div>
              </div>
            </div>
            <p
              style={{
                font: "var(--body-sm)",
                color: "var(--text-faint)",
                margin: "14px 0 0",
              }}
            >
              Illustrative outcomes — replace with measured client results.
            </p>
          </div>
        </div>
      </section>

      {/* ── Deployment flow ── */}
      <section
        id="deployment"
        className="brand-field--gradient on-navy"
        style={{ position: "relative" }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "100px 24px",
          }}
        >
          <div
            data-reveal=""
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 24,
              flexWrap: "wrap",
              borderBottom: "1px solid var(--border-hairline)",
              paddingBottom: 24,
            }}
          >
            <span
              style={{
                font: "var(--eyebrow)",
                letterSpacing: "var(--eyebrow-track)",
                textTransform: "uppercase",
                color: "rgba(249,246,243,.5)",
              }}
            >
              How the work lands
            </span>
            <span
              style={{
                font: "var(--mono-md)",
                color: "rgba(249,246,243,.5)",
              }}
            >
              01 {"→"} 02 {"→"} 03
            </span>
          </div>

          {/* Flow diagram */}
          <div
            data-reveal=""
            data-r="flow"
            style={{
              display: "grid",
              gridTemplateColumns:
                "minmax(210px,1fr) minmax(56px,80px) minmax(260px,1.25fr) minmax(56px,80px) minmax(210px,1fr)",
              gap: 0,
              alignItems: "center",
              marginTop: 56,
            }}
          >
            {/* 01 / You bring */}
            <div style={{ display: "grid", gap: 10 }}>
              <div
                style={{
                  font: "var(--mono-md)",
                  color: "rgba(249,246,243,.5)",
                  marginBottom: 4,
                }}
              >
                01 / You bring
              </div>
              {["Business context", "Processes", "KPIs"].map((label) => (
                <div
                  key={label}
                  style={{
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-sm)",
                    padding: "13px 16px",
                    font: "var(--body-md)",
                    color: "var(--paper-050)",
                    background: "rgba(255,255,255,.04)",
                  }}
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Connector left */}
            <div
              data-r="conn"
              style={{
                position: "relative",
                height: 1,
                background:
                  "linear-gradient(to right,rgba(255,255,255,.12),rgba(255,255,255,.34))",
              }}
            >
              <span
                data-flow=""
                style={
                  {
                    "--dep-run": "100%",
                    position: "absolute",
                    top: -2,
                    left: 0,
                    width: 5,
                    height: 5,
                    borderRadius: 999,
                    background: "var(--blue-300)",
                    boxShadow: "0 0 10px 2px rgba(122,165,239,.6)",
                    animation:
                      "dep-travel 2.6s var(--ease-out) infinite",
                  } as React.CSSProperties
                }
              />
            </div>

            {/* 02 / Deployed center */}
            <div
              data-flow=""
              style={{
                border: "1px solid rgba(255,255,255,.22)",
                borderRadius: "var(--radius-md)",
                background: "rgba(0,4,15,.42)",
                padding: "28px 26px",
                animation:
                  "dep-breathe 2.6s var(--ease-out) infinite",
              }}
            >
              <img
                src="/assets/logo-horizontal-white.png"
                alt="Deployed"
                style={{ width: 154, display: "block" }}
              />
              <div
                style={{
                  height: 1,
                  background: "var(--border-hairline)",
                  margin: "22px 0",
                }}
              />
              <div style={{ display: "grid", gap: 11 }}>
                {[
                  "Fast deployment patterns",
                  "AI transformation frameworks",
                  "Embedded engineering capability",
                ].map((text) => (
                  <div
                    key={text}
                    style={{
                      display: "flex",
                      gap: 11,
                      alignItems: "baseline",
                      font: "var(--body-md)",
                      color: "var(--paper-050)",
                    }}
                  >
                    <span
                      style={{
                        font: "var(--mono-md)",
                        color: "var(--blue-300)",
                      }}
                    >
                      02
                    </span>
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Connector right */}
            <div
              data-r="conn"
              style={{
                position: "relative",
                height: 1,
                background:
                  "linear-gradient(to right,rgba(255,255,255,.34),rgba(255,255,255,.12))",
              }}
            >
              <span
                data-flow=""
                style={
                  {
                    "--dep-run": "100%",
                    position: "absolute",
                    top: -2,
                    left: 0,
                    width: 5,
                    height: 5,
                    borderRadius: 999,
                    background: "var(--blue-300)",
                    boxShadow: "0 0 10px 2px rgba(122,165,239,.6)",
                    animation:
                      "dep-travel 2.6s var(--ease-out) .5s infinite",
                  } as React.CSSProperties
                }
              />
            </div>

            {/* 03 / You get */}
            <div style={{ display: "grid", gap: 10 }}>
              <div
                style={{
                  font: "var(--mono-md)",
                  color: "rgba(249,246,243,.5)",
                  marginBottom: 4,
                }}
              >
                03 / You get
              </div>
              {[
                "Operating leverage",
                "Transformed workflows",
                "Enhanced efficiency",
              ].map((label) => (
                <div
                  key={label}
                  style={{
                    border: "1px solid rgba(63,122,224,.45)",
                    borderRadius: "var(--radius-sm)",
                    padding: "13px 16px",
                    font: "var(--body-md)",
                    color: "var(--paper-000)",
                    background: "rgba(63,122,224,.14)",
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Benefit cards */}
          <div
            data-reveal=""
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 1,
              marginTop: 56,
              background: "var(--border-hairline)",
              border: "1px solid var(--border-hairline)",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
            }}
          >
            {[
              "Skip months of trial and error",
              "No specialist hiring",
              "Complete hand-off and ownership",
            ].map((text) => (
              <div
                key={text}
                style={{
                  background: "rgba(0,4,15,.30)",
                  padding: "22px 24px",
                  font: "var(--body-md)",
                  color: "rgba(249,246,243,.86)",
                }}
              >
                {text}
              </div>
            ))}
          </div>

          {/* Bottom statement */}
          <div
            data-reveal=""
            data-r="cols2"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
              gap: 56,
              marginTop: 96,
              paddingTop: 44,
              borderTop: "1px solid var(--border-hairline)",
              alignItems: "start",
            }}
          >
            <h2
              style={{
                font: "var(--display-2)",
                letterSpacing: "var(--display-track)",
                color: "var(--paper-000)",
                margin: 0,
                textWrap: "pretty" as React.CSSProperties["textWrap"],
              }}
            >
              Business-first.
              <br />
              Embedded with your team.
              <br />
              Accountable for outcomes.
            </h2>
            <p
              style={{
                font: "var(--body-lg)",
                color: "rgba(249,246,243,.78)",
                margin: "8px 0 0",
                maxWidth: "52ch",
                textWrap: "pretty" as React.CSSProperties["textWrap"],
              }}
            >
              You bring the business context, processes, and KPIs. We bring
              proven deployment patterns, AI frameworks, and the engineering
              capability to turn them into working systems — fast.
            </p>
          </div>
        </div>
      </section>

      {/* ── Company quote ── */}
      <section
        id="company"
        style={{
          background: "var(--paper-000)",
          borderBottom: "1px solid var(--border-hairline)",
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            padding: "110px 24px",
            textAlign: "center",
          }}
        >
          <p
            data-reveal=""
            style={{
              font: "var(--display-2)",
              letterSpacing: "var(--display-track)",
              color: "var(--text-strong)",
              margin: 0,
              textWrap: "pretty" as React.CSSProperties["textWrap"],
            }}
          >
            {"“"}Deployed is your forward-deployed AI transformation
            function.{"”"}
          </p>
          <p
            data-reveal=""
            style={{
              font: "var(--body-lg)",
              color: "var(--text-body)",
              margin: "26px auto 0",
              maxWidth: "62ch",
              textWrap: "pretty" as React.CSSProperties["textWrap"],
            }}
          >
            We combine solution engineering, applied AI, and agentic workflows
            to build custom systems that improve how your organisation operates.
          </p>
          <div
            data-reveal=""
            style={{
              marginTop: 38,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                background: "var(--action-primary)",
                color: "var(--paper-050)",
                font: "var(--label)",
                letterSpacing: "var(--label-track)",
                padding: "15px 26px",
                borderRadius: 999,
                transition:
                  "background var(--dur-fast) var(--ease-out)",
              }}
            >
              Get in touch
              <img
                src="/assets/icon-arrow-white.png"
                alt=""
                style={{ width: 13, height: 12, display: "block" }}
              />
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        id="contact"
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
            gridTemplateColumns:
              "minmax(0,1.3fr) repeat(3,minmax(0,1fr))",
            gap: 48,
          }}
        >
          {/* Logo column */}
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
            <a
              href="#contact"
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
                transition:
                  "border-color var(--dur-fast) var(--ease-out)",
              }}
            >
              Get in touch
              <img
                src="/assets/icon-arrow-white.png"
                alt=""
                style={{ width: 13, height: 12, display: "block" }}
              />
            </a>
          </div>

          {/* Core links */}
          <div
            style={{
              display: "grid",
              gap: 11,
              alignContent: "start",
            }}
          >
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
              style={{
                font: "var(--body-sm)",
                color: "rgba(249,246,243,.78)",
              }}
            >
              Strategy
            </Link>
            <Link
              href="/deployment"
              style={{
                font: "var(--body-sm)",
                color: "rgba(249,246,243,.78)",
              }}
            >
              Deployment
            </Link>
            <Link
              href="/the-deployed-fit"
              style={{
                font: "var(--body-sm)",
                color: "rgba(249,246,243,.78)",
              }}
            >
              The Deployed fit
            </Link>
          </div>

          {/* Company links */}
          <div
            style={{
              display: "grid",
              gap: 11,
              alignContent: "start",
            }}
          >
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
              style={{
                font: "var(--body-sm)",
                color: "rgba(249,246,243,.78)",
              }}
            >
              About
            </Link>
            <a
              href="#"
              style={{
                font: "var(--body-sm)",
                color: "rgba(249,246,243,.78)",
              }}
            >
              Careers
            </a>
            <Link
              href="/contact"
              style={{
                font: "var(--body-sm)",
                color: "rgba(249,246,243,.78)",
              }}
            >
              Contact
            </Link>
          </div>

          {/* Resources links */}
          <div
            style={{
              display: "grid",
              gap: 11,
              alignContent: "start",
            }}
          >
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
              style={{
                font: "var(--body-sm)",
                color: "rgba(249,246,243,.78)",
              }}
            >
              Blog
            </Link>
            <a
              href="#industries"
              style={{
                font: "var(--body-sm)",
                color: "rgba(249,246,243,.78)",
              }}
            >
              Industries
            </a>
            <a
              href="#contact"
              style={{
                font: "var(--body-sm)",
                color: "rgba(249,246,243,.78)",
              }}
            >
              Security
            </a>
          </div>
        </div>

        {/* Copyright bar */}
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
            style={{
              font: "var(--mono-md)",
              color: "rgba(249,246,243,.38)",
            }}
          >
            deployed.md
          </span>
          <span
            style={{
              font: "var(--mono-md)",
              color: "rgba(249,246,243,.38)",
            }}
          >
            {"©"} 2026 Deployed
          </span>
        </div>
      </footer>
    </div>
  );
}
