"use client";

import { useEffect } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import AnnouncementBar from "@/components/AnnouncementBar";
import CompactFooter from "@/components/CompactFooter";

export default function DeploymentPage() {
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
      <SiteNav active="Core" tone="light" />

      {/* Hero */}
      <section
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "76px 24px 0",
        }}
      >
        <p
          data-reveal
          style={{
            font: "var(--eyebrow)",
            letterSpacing: "var(--eyebrow-track)",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            margin: "0 0 18px",
          }}
        >
          Deployment
        </p>
        <h1
          data-reveal
          style={{
            font: "var(--display-2)",
            letterSpacing: "var(--display-track)",
            color: "var(--text-strong)",
            margin: 0,
            maxWidth: "28ch",
            textWrap: "pretty" as never,
          }}
        >
          Forward deployed. Embedded with your team. Accountable for what ships.
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
          Most AI work is done at a distance: scoped from the outside, built in
          isolation, and handed over to a team that had no part in shaping it.
          Deployed works differently. We embed engineers and strategists directly
          inside your operation, so the people building the system are the same
          people who see it run.
        </p>
        <div
          data-reveal
          style={{
            marginTop: 56,
            borderBottom: "1px solid var(--border-hairline)",
          }}
        />
      </section>

      {/* Body text + quote */}
      <section
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "64px 24px 0",
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
          Every workflow we touch is one we have watched someone perform. Every
          system we build is shaped by the constraints we uncovered sitting next
          to the people who will use it. That proximity is not a nice-to-have. It
          is the mechanism that turns generic tooling into operating leverage.
        </p>
        <p
          data-reveal
          style={{
            font: "var(--display-3)",
            letterSpacing: "var(--display-track)",
            color: "var(--blue-600)",
            margin: "48px 0 0",
            maxWidth: "28ch",
            textWrap: "pretty" as never,
          }}
        >
          That is why we deploy from inside the operation.
        </p>
        <p
          data-reveal
          style={{
            font: "var(--body-lg)",
            color: "var(--text-body)",
            margin: "48px 0 0",
            maxWidth: "60ch",
            textWrap: "pretty" as never,
          }}
        >
          A forward-deployed team does not just write code. It watches how
          decisions get made, where information gets stuck, and which manual steps
          quietly absorb hours every week. Then it builds software that removes
          those friction points, validates it against real volume, and iterates
          until the ROI is obvious.
        </p>
      </section>

      {/* Transition strip */}
      <section
        data-reveal
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "72px 24px",
        }}
      >
        <div
          data-r="transition"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: 24,
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "var(--surface-sunken)",
              borderRadius: "var(--radius-md)",
              padding: "28px 24px",
              font: "var(--body-lg)",
              color: "var(--text-muted)",
              textWrap: "pretty" as never,
            }}
          >
            From software handed over from the outside.
          </div>
          <img
            src="/assets/icon-arrow-navy.png"
            alt=""
            style={{ width: 20, height: 18, display: "block", opacity: 0.35 }}
          />
          <div
            style={{
              background: "var(--blue-050)",
              borderRadius: "var(--radius-md)",
              padding: "28px 24px",
              font: "var(--body-lg)",
              color: "var(--blue-800)",
              textWrap: "pretty" as never,
            }}
          >
            A deployment team embedded inside, shipping alongside you.
          </div>
        </div>
      </section>

      {/* Phase diagram */}
      <section
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "0 24px 80px",
        }}
      >
        <div
          data-reveal
          data-r="phases"
          style={{
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div
            className="phase-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(200px, 1fr))",
              gap: 20,
              minWidth: 760,
              alignItems: "start",
            }}
          >
            {/* Phase 01 — Embed */}
            <div style={{ paddingTop: 0 }}>
              <p
                style={{
                  font: "var(--mono-md)",
                  color: "var(--text-muted)",
                  margin: "0 0 16px",
                }}
              >
                Phase 01
              </p>
              <div
                style={{
                  border: "1px solid var(--border-hairline)",
                  borderRadius: "var(--radius-md)",
                  padding: "18px 20px",
                  background: "var(--surface-card)",
                  textAlign: "center",
                  marginBottom: 12,
                }}
              >
                <p
                  style={{
                    font: "var(--heading-2)",
                    color: "var(--text-strong)",
                    margin: 0,
                  }}
                >
                  Embed
                </p>
              </div>
              <div
                style={{
                  border: "1px solid var(--border-hairline)",
                  borderRadius: "var(--radius-md)",
                  padding: "20px 22px",
                  background: "var(--surface-card)",
                }}
              >
                <p
                  style={{
                    font: "var(--body-sm)",
                    fontWeight: 500,
                    color: "var(--text-strong)",
                    margin: "0 0 12px",
                  }}
                >
                  Feedback
                </p>
                <div style={{ display: "grid", gap: 8 }}>
                  {[
                    "Metrics",
                    "Pattern recognition",
                    "Workflow enhancement",
                    "Optimisation",
                  ].map((item) => (
                    <p
                      key={item}
                      style={{
                        font: "var(--body-sm)",
                        color: "var(--text-body)",
                        margin: 0,
                      }}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Phase 02 — Build & deploy */}
            <div style={{ paddingTop: 40 }}>
              <p
                style={{
                  font: "var(--mono-md)",
                  color: "var(--text-muted)",
                  margin: "0 0 16px",
                }}
              >
                Phase 02
              </p>
              <div
                style={{
                  border: "1px dashed var(--border-subtle)",
                  borderRadius: "var(--radius-md)",
                  padding: "28px 22px",
                  background: "var(--surface-card)",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    font: "var(--heading-2)",
                    color: "var(--text-strong)",
                    margin: 0,
                  }}
                >
                  Build & deploy
                </p>
              </div>
            </div>

            {/* Phase 03 — Production */}
            <div style={{ paddingTop: 80 }}>
              <p
                style={{
                  font: "var(--mono-md)",
                  color: "var(--text-muted)",
                  margin: "0 0 16px",
                }}
              >
                Phase 03
              </p>
              <div
                style={{
                  borderRadius: "var(--radius-md)",
                  padding: "36px 22px",
                  background: "var(--blue-950)",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    font: "var(--heading-2)",
                    color: "var(--paper-050)",
                    margin: 0,
                  }}
                >
                  Production
                </p>
              </div>
            </div>

            {/* Phase 04 — Handoff */}
            <div style={{ paddingTop: 40 }}>
              <p
                style={{
                  font: "var(--mono-md)",
                  color: "var(--text-muted)",
                  margin: "0 0 16px",
                }}
              >
                Phase 04
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 16,
                }}
              >
                <p
                  style={{
                    font: "var(--heading-2)",
                    color: "var(--text-strong)",
                    margin: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  Handoff
                </p>
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: "var(--border-strong)",
                  }}
                />
                <img
                  src="/assets/icon-arrow-navy.png"
                  alt=""
                  style={{ width: 16, height: 14, display: "block", opacity: 0.55 }}
                />
              </div>
              <p
                style={{
                  font: "var(--body-md)",
                  color: "var(--text-body)",
                  margin: 0,
                  maxWidth: "30ch",
                  textWrap: "pretty" as never,
                }}
              >
                Complete ownership, documentation, and the capability to run it
                without us.
              </p>
            </div>
          </div>

          {/* Iterate bar spanning phases 1-3 */}
          <div
            className="phase-iterate-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(200px, 1fr))",
              gap: 20,
              minWidth: 760,
              marginTop: 32,
            }}
          >
            <div
              style={{
                gridColumn: "1 / 4",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none" style={{ flexShrink: 0 }}>
                <path d="M6 1L1 6l5 5" stroke="var(--blue-600)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div style={{ flex: 1, position: "relative" }}>
                <div
                  style={{
                    height: 2,
                    background: "var(--blue-600)",
                    borderRadius: 1,
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: -10,
                    left: "50%",
                    transform: "translateX(-50%)",
                    font: "var(--body-sm)",
                    color: "var(--blue-600)",
                    background: "var(--paper-050)",
                    padding: "0 12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Iterate till ROI
                </span>
              </div>
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none" style={{ flexShrink: 0 }}>
                <path d="M12 1l5 5-5 5" stroke="var(--blue-600)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Roles section */}
      <section
        style={{
          background: "var(--paper-000)",
          borderTop: "1px solid var(--border-hairline)",
          borderBottom: "1px solid var(--border-hairline)",
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
            data-reveal
            style={{
              font: "var(--display-3)",
              letterSpacing: "var(--display-track)",
              color: "var(--text-strong)",
              margin: "0 0 56px",
              maxWidth: "24ch",
              textWrap: "pretty" as never,
            }}
          >
            Locally embedded teams that ship.
          </h2>
          <div
            data-reveal
            data-r="cols2"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 32,
            }}
          >
            <div
              style={{
                border: "1px solid var(--border-hairline)",
                borderRadius: "var(--radius-md)",
                padding: "36px 28px",
                background: "var(--paper-050)",
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
                Role
              </p>
              <h3
                style={{
                  font: "var(--heading-1)",
                  color: "var(--text-strong)",
                  margin: "0 0 16px",
                }}
              >
                Forward Deployed Engineer
              </h3>
              <p
                style={{
                  font: "var(--body-lg)",
                  color: "var(--text-body)",
                  margin: 0,
                  textWrap: "pretty" as never,
                }}
              >
                The person who makes it work. Sits inside your operation, builds
                the software that eliminates friction, and ships code against
                real workflows every week.
              </p>
            </div>
            <div
              style={{
                border: "1px solid var(--border-hairline)",
                borderRadius: "var(--radius-md)",
                padding: "36px 28px",
                background: "var(--paper-050)",
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
                Role
              </p>
              <h3
                style={{
                  font: "var(--heading-1)",
                  color: "var(--text-strong)",
                  margin: "0 0 16px",
                }}
              >
                Deployment Strategist
              </h3>
              <p
                style={{
                  font: "var(--body-lg)",
                  color: "var(--text-body)",
                  margin: 0,
                  textWrap: "pretty" as never,
                }}
              >
                The person who makes it matter. Maps the operational landscape,
                identifies the highest-leverage problems, and ensures what gets
                built drives measurable business outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statement + link cards */}
      <section
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "96px 24px",
        }}
      >
        <p
          data-reveal
          style={{
            font: "var(--display-2)",
            letterSpacing: "var(--display-track)",
            color: "var(--text-strong)",
            margin: "0 0 56px",
            maxWidth: "26ch",
            textWrap: "pretty" as never,
          }}
        >
          We do not consult. We do not hand over decks. We ship working systems
          from inside your operation.
        </p>
        <div
          data-reveal
          data-r="cols2"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
          }}
        >
          <Link
            href="/strategy"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid var(--border-hairline)",
              borderRadius: "var(--radius-md)",
              padding: "28px 24px",
              background: "var(--surface-card)",
              transition: "background var(--dur-fast) var(--ease-out)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--blue-050)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--surface-card)")
            }
          >
            <div>
              <p
                style={{
                  font: "var(--eyebrow)",
                  letterSpacing: "var(--eyebrow-track)",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  margin: "0 0 10px",
                }}
              >
                Strategy
              </p>
              <p
                style={{
                  font: "var(--heading-1)",
                  color: "var(--text-strong)",
                  margin: 0,
                }}
              >
                How we identify where AI creates the most leverage
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginTop: 28,
                font: "var(--label)",
                letterSpacing: "var(--label-track)",
                color: "var(--text-link)",
              }}
            >
              Read more
              <img
                src="/assets/icon-arrow-navy.png"
                alt=""
                style={{ width: 13, height: 12, display: "block" }}
              />
            </div>
          </Link>
          <Link
            href="/the-deployed-fit"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid var(--border-hairline)",
              borderRadius: "var(--radius-md)",
              padding: "28px 24px",
              background: "var(--surface-card)",
              transition: "background var(--dur-fast) var(--ease-out)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--blue-050)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--surface-card)")
            }
          >
            <div>
              <p
                style={{
                  font: "var(--eyebrow)",
                  letterSpacing: "var(--eyebrow-track)",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  margin: "0 0 10px",
                }}
              >
                The Deployed fit
              </p>
              <p
                style={{
                  font: "var(--heading-1)",
                  color: "var(--text-strong)",
                  margin: 0,
                }}
              >
                Where we create the most leverage for your organization
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginTop: 28,
                font: "var(--label)",
                letterSpacing: "var(--label-track)",
                color: "var(--text-link)",
              }}
            >
              Read more
              <img
                src="/assets/icon-arrow-navy.png"
                alt=""
                style={{ width: 13, height: 12, display: "block" }}
              />
            </div>
          </Link>
        </div>
      </section>

      <CompactFooter />

      <style>{`
        @media (max-width: 900px) {
          [data-r="cols2"] {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 24px !important;
          }
          [data-r="transition"] {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            text-align: center;
          }
          [data-r="transition"] img {
            transform: rotate(90deg);
            margin: 0 auto;
          }
          .phase-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            min-width: 0 !important;
            gap: 24px !important;
          }
          .phase-grid > * {
            padding-top: 0 !important;
          }
          .phase-iterate-grid {
            grid-template-columns: 1fr !important;
            min-width: 0 !important;
          }
          .phase-iterate-grid > div {
            grid-column: auto !important;
          }
        }
        @media (max-width: 560px) {
          .phase-grid {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 28px !important;
          }
        }
      `}</style>
    </div>
  );
}
