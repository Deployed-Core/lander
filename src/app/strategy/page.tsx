"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import CompactFooter from "@/components/CompactFooter";

const PRINCIPLES: { title: string; body: string[] }[] = [
  {
    title: "Most enterprises don’t have an AI problem",
    body: [
      "They have a workflow, decision-making, and execution problem that AI can now fundamentally change.",
      "Strategy starts with the business — not the technology.",
    ],
  },
  {
    title: "Solve for leverage, in the right sequence",
    body: [
      "Not every AI opportunity is equally valuable, and the highest-ROI use case is not always the right place to start. We look for interventions that unlock what comes next — building the capabilities, data flows, and infrastructure that allow improvements to compound across the organisation.",
      "Understand, prioritise, sequence, deploy.",
    ],
  },
  {
    title: "Design around workflows, not functions",
    body: [
      "Enterprises are organised into functions, but work rarely stays within them. A single business process can move across teams, systems, approvals, and decisions before reaching completion. Deploying AI function by function risks creating smarter silos. We design around the end-to-end flow of work, allowing intelligence and agents to coordinate across boundaries and improve the process as a whole.",
    ],
  },
  {
    title: "Put intelligence where it changes the economics",
    body: [
      "Not every task needs AI, and not every workflow needs an agent. Intelligence should be introduced where it materially changes how the business performs — reducing coordination, compressing execution time, improving decisions, removing repetitive work, or increasing the amount of output the organisation can produce.",
      "We look for the points where adding intelligence creates disproportionate operational leverage.",
    ],
  },
  {
    title: "Build for adaptability, not dependency",
    body: [
      "Models, infrastructure, and agentic systems will continue to evolve. Your operating model should be able to evolve with them. We design systems around the needs and logic of the business rather than around the constraints of a single model, vendor, or platform.",
      "This keeps the underlying intelligence replaceable and the enterprise flexible enough to adopt better capabilities as they emerge.",
    ],
  },
  {
    title: "Measure the operating model, not the AI",
    body: [
      "AI adoption is not the outcome. A better-performing enterprise is. We measure whether workflows move faster, decisions require less coordination, costs fall, and the organisation can handle more complexity without proportional increases in people or resources.",
      "The measure of successful AI transformation is ultimately simple: has it changed what the enterprise is capable of doing?",
    ],
  },
];

export default function StrategyPage() {
  const [open, setOpen] = useState<Record<number, boolean>>({});

  const openCount = PRINCIPLES.filter((_, i) => open[i]).length;
  const allOpen = openCount === PRINCIPLES.length;

  const toggleAll = () => {
    if (allOpen) {
      setOpen({});
    } else {
      const next: Record<number, boolean> = {};
      PRINCIPLES.forEach((_, i) => {
        next[i] = true;
      });
      setOpen(next);
    }
  };

  const toggleOne = (i: number) => {
    setOpen((prev) => ({ ...prev, [i]: !prev[i] }));
  };

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
      <SiteNav active="Core" tone="light" />

      {/* Hero */}
      <section
        id="top"
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "76px 24px 0",
        }}
      >
        <div
          data-reveal
          style={{
            font: "var(--eyebrow)",
            letterSpacing: "var(--eyebrow-track)",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          Strategy
        </div>
        <h1
          data-reveal
          style={{
            font: "var(--display-2)",
            letterSpacing: "var(--display-track)",
            color: "var(--text-strong)",
            margin: "20px 0 0",
            maxWidth: "26ch",
            textWrap: "pretty" as never,
          }}
        >
          AI transformation isn&rsquo;t about adopting technology.
        </h1>
        <p
          data-reveal
          style={{
            font: "var(--body-lg)",
            color: "var(--text-body)",
            margin: "16px 0 0",
          }}
        >
          It&rsquo;s about changing how the enterprise operates.
        </p>
        <div
          style={{
            height: 1,
            background: "var(--border-hairline)",
            marginTop: 40,
          }}
        />
      </section>

      {/* Sidebar: operating leverage */}
      <section
        data-r="side"
        data-reveal
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "56px 24px 24px",
          display: "grid",
          gridTemplateColumns: "minmax(150px,220px) minmax(0,1fr)",
          gap: 48,
          alignItems: "start",
        }}
      >
        <h2
          style={{
            font: "var(--display-3)",
            fontSize: "clamp(20px,1.9vw,27px)",
            letterSpacing: "var(--display-track)",
            color: "var(--text-strong)",
            margin: 0,
            position: "sticky",
            top: 104,
          }}
        >
          The enterprise with operating leverage
        </h2>
        <div style={{ display: "grid", gap: 22, maxWidth: "74ch" }}>
          <p
            style={{
              font: "var(--body-lg)",
              color: "var(--text-strong)",
              margin: 0,
              textWrap: "pretty" as never,
            }}
          >
            Enterprises with operating leverage don&rsquo;t just adopt AI. They
            restructure around it.
          </p>
          <p
            style={{
              font: "var(--body-md)",
              color: "var(--text-body)",
              margin: 0,
              textWrap: "pretty" as never,
            }}
          >
            Operating leverage with AI doesn&rsquo;t come from stacking AI SaaS
            tools across the organisation and improving isolated metrics. Those
            tools are built around predefined workflows &mdash; which means,
            eventually, your enterprise starts adapting how it works to how the
            software was designed.
          </p>
          <p
            style={{
              font: "var(--body-md)",
              color: "var(--text-body)",
              margin: 0,
              textWrap: "pretty" as never,
            }}
          >
            The larger opportunity is the inverse: build AI around how your
            enterprise should operate.
          </p>
          <p
            style={{
              font: "var(--body-md)",
              color: "var(--text-body)",
              margin: 0,
              textWrap: "pretty" as never,
            }}
          >
            That means rethinking processes, coordination, and execution from the
            ground up &mdash; understanding where intelligence belongs, what
            decisions can become autonomous, how workflows can be compressed, and
            where agents can coordinate work across functions. The result is not
            another layer of software, but a more optimal operating structure: an
            enterprise where people, systems, and agents work together as one
            coordinated infrastructure.
          </p>
          <p
            style={{
              font: "var(--body-md)",
              color: "var(--text-body)",
              margin: 0,
              textWrap: "pretty" as never,
            }}
          >
            That structural change is where AI creates real operating leverage.
          </p>
        </div>
      </section>

      {/* Sidebar: accordion */}
      <section
        data-r="side"
        data-reveal
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "64px 24px 96px",
          display: "grid",
          gridTemplateColumns: "minmax(150px,220px) minmax(0,1fr)",
          gap: 48,
          alignItems: "start",
        }}
      >
        <div style={{ position: "sticky", top: 104 }}>
          <h2
            style={{
              font: "var(--display-3)",
              fontSize: "clamp(20px,1.9vw,27px)",
              letterSpacing: "var(--display-track)",
              color: "var(--text-strong)",
              margin: 0,
            }}
          >
            First principles
          </h2>
          <button
            type="button"
            onClick={toggleAll}
            style={{
              cursor: "pointer",
              marginTop: 16,
              background: "none",
              border: 0,
              padding: 0,
              font: "var(--label)",
              letterSpacing: "var(--label-track)",
              color: "var(--blue-600)",
            }}
          >
            {allOpen ? "Collapse all" : "Expand all"}
          </button>
        </div>

        <div style={{ borderTop: "1px solid var(--border-hairline)" }}>
          {PRINCIPLES.map((p, i) => (
            <div
              key={i}
              style={{ borderBottom: "1px solid var(--border-hairline)" }}
            >
              <button
                type="button"
                onClick={() => toggleOne(i)}
                style={{
                  cursor: "pointer",
                  width: "100%",
                  background: "none",
                  border: 0,
                  padding: "22px 4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 20,
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    font: "var(--heading-2)",
                    color: "var(--text-strong)",
                    textWrap: "pretty" as never,
                  }}
                >
                  {p.title}
                </span>
                <span
                  style={{
                    flex: "none",
                    width: 22,
                    height: 22,
                    borderRadius: 999,
                    border: "1px solid var(--border-strong)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    font: "var(--mono-md)",
                    fontSize: 14,
                    color: "var(--text-muted)",
                  }}
                >
                  {open[i] ? "–" : "+"}
                </span>
              </button>
              {open[i] && (
                <div
                  style={{
                    padding: "0 4px 26px",
                    display: "grid",
                    gap: 16,
                    maxWidth: "70ch",
                    animation:
                      "dep-open var(--dur-base) var(--ease-out) both",
                  }}
                >
                  {p.body.map((text, j) => (
                    <p
                      key={j}
                      style={{
                        font: "var(--body-md)",
                        color: "var(--text-body)",
                        margin: 0,
                        textWrap: "pretty" as never,
                      }}
                    >
                      {text}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section
        data-reveal
        style={{
          background: "var(--paper-000)",
          borderTop: "1px solid var(--border-hairline)",
        }}
      >
        <div
          style={{
            maxWidth: 1160,
            margin: "0 auto",
            padding: "96px 24px",
          }}
        >
          <h2
            style={{
              font: "var(--display-2)",
              letterSpacing: "var(--display-track)",
              color: "var(--text-strong)",
              margin: 0,
              maxWidth: "26ch",
              textWrap: "pretty" as never,
            }}
          >
            We enable organisations to go through the transformation.
          </h2>
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
              marginTop: 32,
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

          <div
            data-r="cols2"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1fr) minmax(0,1.6fr)",
              gap: 20,
              marginTop: 56,
            }}
          >
            <Link
              href="/the-deployed-fit"
              style={{
                border: "1px solid var(--border-hairline)",
                borderRadius: "var(--radius-md)",
                background: "var(--surface-page)",
                boxShadow: "var(--shadow-1)",
                padding: 28,
                minHeight: 180,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                textAlign: "right" as const,
                transition: "background var(--dur-fast) var(--ease-out)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--surface-sunken)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--surface-page)")
              }
            >
              <div
                style={{
                  font: "var(--heading-2)",
                  color: "var(--text-strong)",
                }}
              >
                The Deployed fit
              </div>
              <div
                style={{
                  font: "var(--body-sm)",
                  color: "var(--text-muted)",
                  marginTop: 6,
                }}
              >
                Where we create the most leverage
              </div>
            </Link>
            <Link
              href="/deployment"
              style={{
                border: "1px solid var(--border-hairline)",
                borderRadius: "var(--radius-md)",
                background: "var(--surface-page)",
                boxShadow: "var(--shadow-1)",
                padding: 28,
                minHeight: 180,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                textAlign: "right" as const,
                transition: "background var(--dur-fast) var(--ease-out)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--surface-sunken)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--surface-page)")
              }
            >
              <div
                style={{
                  font: "var(--heading-2)",
                  color: "var(--text-strong)",
                }}
              >
                Deployment
              </div>
              <div
                style={{
                  font: "var(--body-sm)",
                  color: "var(--text-muted)",
                  marginTop: 6,
                }}
              >
                Locally embedded teams who ship
              </div>
            </Link>
          </div>
        </div>
      </section>

      <CompactFooter />

      <style>{`
        @keyframes dep-open {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @media (max-width: 900px) {
          [data-r="cols2"] {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 32px !important;
          }
          [data-r="side"] {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 24px !important;
          }
          [data-r="side"] > * {
            position: static !important;
          }
        }
      `}</style>
    </div>
  );
}
