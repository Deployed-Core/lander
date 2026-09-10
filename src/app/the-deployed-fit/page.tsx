"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import AnnouncementBar from "@/components/AnnouncementBar";
import CompactFooter from "@/components/CompactFooter";

const rotatingLines = [
  "The workflow everyone complains about.",
  "The spreadsheet someone has to maintain.",
  "The decisions that keep waiting for someone.",
  "The process that needs another hire every time volume increases.",
  "The operation you’ve tried three different tools to fix.",
];

export default function TheDeployedFitPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  /* Reveal-on-scroll */
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

  /* Rotating text interval */
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % rotatingLines.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ background: "var(--paper-050)", minHeight: "100vh" }}>
      <AnnouncementBar />
      <SiteNav active="Core" tone="light" />

      {/* Hero */}
      <section
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
          The Deployed fit
        </h1>
        <p
          data-reveal
          style={{
            font: "var(--body-lg)",
            color: "var(--text-body)",
            margin: "28px 0 0",
            maxWidth: "54ch",
            textWrap: "pretty" as never,
          }}
        >
          We work best with organizations where{" "}
          <span style={{ color: "var(--blue-600)", fontWeight: 500 }}>
            operational complexity is the bottleneck
          </span>
          , not technology adoption. If your problem is that the right tool does
          not exist yet, we are probably a good fit.
        </p>
      </section>

      {/* Body text */}
      <section
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "56px 24px 0",
        }}
      >
        <p
          data-reveal
          style={{
            font: "var(--body-lg)",
            color: "var(--text-body)",
            margin: 0,
            maxWidth: "60ch",
            textWrap: "pretty" as never,
          }}
        >
          Most enterprise teams already have smart people, decent systems, and
          some version of a data strategy. What they lack is the capacity to turn
          all of that into software that reshapes how the operation runs. They
          have the pieces. They do not have the deployment muscle to assemble
          them under pressure.
        </p>
      </section>

      {/* Blockquote */}
      <section
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "56px 24px 0",
        }}
      >
        <blockquote
          data-reveal
          style={{
            margin: 0,
            padding: "28px 32px",
            borderLeft: "3px solid var(--blue-600)",
            background: "var(--blue-050)",
            borderRadius: "0 var(--radius-md) var(--radius-md) 0",
          }}
        >
          <p
            style={{
              font: "var(--display-3)",
              letterSpacing: "var(--display-track)",
              color: "var(--blue-800)",
              margin: 0,
              textWrap: "pretty" as never,
            }}
          >
            That gap is where we create leverage.
          </p>
        </blockquote>
      </section>

      {/* Bento grid */}
      <section
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "72px 24px 0",
        }}
      >
        <div
          data-reveal
          data-r="bento"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "auto auto",
            gap: 16,
          }}
        >
          {/* Tall left card */}
          <div
            style={{
              gridRow: "1 / 3",
              border: "1px solid var(--border-hairline)",
              borderRadius: "var(--radius-md)",
              padding: "36px 28px",
              background: "var(--surface-card)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <p
              style={{
                font: "var(--eyebrow)",
                letterSpacing: "var(--eyebrow-track)",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                margin: "0 0 12px",
              }}
            >
              Signal
            </p>
            <p
              style={{
                font: "var(--heading-1)",
                color: "var(--text-strong)",
                margin: "0 0 16px",
                textWrap: "pretty" as never,
              }}
            >
              Your growth is adding operational complexity
            </p>
            <p
              style={{
                font: "var(--body-md)",
                color: "var(--text-body)",
                margin: 0,
                textWrap: "pretty" as never,
              }}
            >
              Revenue is growing but the cost to operate is growing faster.
              Every new customer, product line, or geography adds process,
              headcount, and coordination. AI should bend that curve.
            </p>
          </div>

          {/* Wide top-right card */}
          <div
            style={{
              border: "1px solid var(--border-hairline)",
              borderRadius: "var(--radius-md)",
              padding: "28px 24px",
              background: "var(--surface-card)",
            }}
          >
            <p
              style={{
                font: "var(--eyebrow)",
                letterSpacing: "var(--eyebrow-track)",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                margin: "0 0 10px",
              }}
            >
              Signal
            </p>
            <p
              style={{
                font: "var(--heading-2)",
                color: "var(--text-strong)",
                margin: "0 0 10px",
                textWrap: "pretty" as never,
              }}
            >
              You know there is leverage in your data and workflows
            </p>
            <p
              style={{
                font: "var(--body-sm)",
                color: "var(--text-body)",
                margin: 0,
                textWrap: "pretty" as never,
              }}
            >
              The opportunity is visible. You just do not have a team that can
              sit inside the operation, build the system, and prove the ROI.
            </p>
          </div>

          {/* Two smaller bottom-right cards */}
          <div
            data-r="bento-bottom"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            <div
              style={{
                border: "1px solid var(--border-hairline)",
                borderRadius: "var(--radius-md)",
                padding: "24px 20px",
                background: "var(--surface-card)",
              }}
            >
              <p
                style={{
                  font: "var(--eyebrow)",
                  letterSpacing: "var(--eyebrow-track)",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  margin: "0 0 8px",
                }}
              >
                Signal
              </p>
              <p
                style={{
                  font: "var(--heading-3)",
                  color: "var(--text-strong)",
                  margin: 0,
                  textWrap: "pretty" as never,
                }}
              >
                Your team is too busy running the business to build the tools
                that would make it easier
              </p>
            </div>
            <div
              style={{
                border: "1px solid var(--border-hairline)",
                borderRadius: "var(--radius-md)",
                padding: "24px 20px",
                background: "var(--surface-card)",
              }}
            >
              <p
                style={{
                  font: "var(--eyebrow)",
                  letterSpacing: "var(--eyebrow-track)",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  margin: "0 0 8px",
                }}
              >
                Signal
              </p>
              <p
                style={{
                  font: "var(--heading-3)",
                  color: "var(--text-strong)",
                  margin: 0,
                  textWrap: "pretty" as never,
                }}
              >
                Previous automation projects delivered features, not operating
                change
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* When Deployed isn't the right fit */}
      <section
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "96px 24px 0",
        }}
      >
        <h2
          data-reveal
          style={{
            font: "var(--display-3)",
            letterSpacing: "var(--display-track)",
            color: "var(--text-strong)",
            margin: "0 0 28px",
            maxWidth: "28ch",
            textWrap: "pretty" as never,
          }}
        >
          When Deployed isn{"’"}t the right fit
        </h2>
        <p
          data-reveal
          style={{
            font: "var(--body-lg)",
            color: "var(--text-body)",
            margin: "0 0 36px",
            maxWidth: "60ch",
            textWrap: "pretty" as never,
          }}
        >
          We are not the right partner for every problem. If what you need is a
          chatbot on your website, a vendor integration, or a one-off proof of
          concept with no path to production, there are faster and cheaper ways
          to get there.
        </p>
        <blockquote
          data-reveal
          style={{
            margin: 0,
            padding: "24px 28px",
            borderLeft: "3px solid var(--border-strong)",
            borderRadius: "0 var(--radius-md) var(--radius-md) 0",
            background: "var(--surface-sunken)",
          }}
        >
          <p
            style={{
              font: "var(--body-lg)",
              color: "var(--text-body)",
              margin: 0,
              textWrap: "pretty" as never,
            }}
          >
            We are built for the problems that sit at the intersection of
            operations, data, and decision-making, where the only way to solve
            them is to be inside the operation itself.
          </p>
        </blockquote>
      </section>

      {/* Rotating text section */}
      <section
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "96px 24px 0",
        }}
      >
        <p
          data-reveal
          style={{
            font: "var(--display-3)",
            letterSpacing: "var(--display-track)",
            color: "var(--text-strong)",
            margin: "0 0 40px",
            maxWidth: "26ch",
            textWrap: "pretty" as never,
          }}
        >
          You probably already know where the friction is.
        </p>
        <div
          data-reveal
          className="rotating-text-wrap"
          style={{
            position: "relative",
            minHeight: 80,
          }}
        >
          {rotatingLines.map((line, i) => {
            const isLongest = i === 3;
            return (
              <p
                key={line}
                style={{
                  position: isLongest ? "relative" : "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  font: "var(--display-3)",
                  letterSpacing: "var(--display-track)",
                  color: "var(--blue-600)",
                  margin: 0,
                  maxWidth: "34ch",
                  textWrap: "pretty" as never,
                  opacity: activeIndex === i ? 1 : 0,
                  visibility: isLongest && activeIndex !== i ? "hidden" : undefined,
                  transform:
                    activeIndex === i ? "translateY(0)" : "translateY(6px)",
                  transition:
                    "opacity 500ms cubic-bezier(.22,.61,.36,1), transform 500ms cubic-bezier(.22,.61,.36,1)",
                }}
              >
                {line}
              </p>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "96px 24px 104px",
        }}
      >
        <p
          data-reveal
          style={{
            font: "var(--display-2)",
            letterSpacing: "var(--display-track)",
            color: "var(--text-strong)",
            margin: "0 0 36px",
            maxWidth: "22ch",
            textWrap: "pretty" as never,
          }}
        >
          Bring us one operational problem.
        </p>
        <Link
          data-reveal
          href="/contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "var(--action-primary)",
            color: "var(--paper-050)",
            font: "var(--label)",
            letterSpacing: "var(--label-track)",
            padding: "15px 26px",
            borderRadius: 999,
            borderBottom: 0,
            transition: "background var(--dur-fast) var(--ease-out)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background =
              "var(--action-primary-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "var(--action-primary)")
          }
        >
          Talk to a deployment strategist
          <img
            src="/assets/icon-arrow-white.png"
            alt=""
            style={{ width: 13, height: 12, display: "block" }}
          />
        </Link>
      </section>

      <CompactFooter />

      <style>{`
        @media (max-width: 900px) {
          [data-r="bento"] {
            grid-template-columns: 1fr !important;
          }
          [data-r="bento"] > div:first-child {
            grid-row: auto !important;
          }
          [data-r="bento-bottom"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
