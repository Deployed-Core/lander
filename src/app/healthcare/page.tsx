"use client";

import { useEffect } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import AnnouncementBar from "@/components/AnnouncementBar";
import CompactFooter from "@/components/CompactFooter";

export default function HealthcarePage() {
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

  const marqueeNames = [
    "Rowan Health System",
    "Ardennes Clinics",
    "Meridian Care Network",
    "Sable Diagnostics",
    "Halden Payer Group",
    "Northfield Hospitals",
  ];

  return (
    <div style={{ background: "var(--paper-050)", minHeight: "100vh" }}>
      <AnnouncementBar />
      <SiteNav active="Industries" tone="navy" />

      {/* Hero */}
      <section
        className="brand-field on-navy"
        data-r="hero"
        style={{
          position: "relative",
          minHeight: "78vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "180px clamp(20px,5vw,40px) 72px",
          marginTop: -70,
        }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "var(--blue-950)",
            }}
          />
          <img
            src="/assets/healthcare-hero.png"
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "linear-gradient(to top,rgba(0,5,30,.94) 0%,rgba(0,5,30,.6) 50%,rgba(0,5,30,.4) 100%)",
            }}
          />
        </div>
        <div
          data-reveal
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1160,
            margin: "0 auto",
            width: "100%",
          }}
        >
          <div
            style={{
              font: "var(--eyebrow)",
              letterSpacing: "var(--eyebrow-track)",
              textTransform: "uppercase",
              color: "rgba(249,246,243,.62)",
            }}
          >
            Industries
          </div>
          <h1
            style={{
              font: "var(--display-1)",
              letterSpacing: "var(--display-track)",
              color: "var(--paper-050)",
              margin: "14px 0 0",
            }}
          >
            Healthcare
          </h1>
          <p
            style={{
              font: "var(--body-lg)",
              color: "rgba(249,246,243,.86)",
              margin: "20px 0 0",
              maxWidth: "58ch",
              textWrap: "pretty" as never,
            }}
          >
            Where a provider&#8217;s hardest workflows become compliant
            production &#8212; referral to reconciliation, with a clinician
            still in the loop.
          </p>
        </div>
      </section>

      {/* Marquee */}
      <section style={{ background: "var(--paper-050)", padding: "52px 24px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div
            style={{
              font: "var(--eyebrow)",
              letterSpacing: "var(--eyebrow-track)",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              textAlign: "center",
            }}
          >
            Deployed across providers and payers
          </div>
          <div
            style={{
              overflow: "hidden",
              marginTop: 26,
              maskImage:
                "linear-gradient(to right,transparent,#000 8%,#000 92%,transparent)",
              WebkitMaskImage:
                "linear-gradient(to right,transparent,#000 8%,#000 92%,transparent)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 56,
                width: "max-content",
                animation: "hc-marquee 34s linear infinite",
                opacity: 0.5,
              }}
            >
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  style={{
                    display: "flex",
                    gap: 56,
                    alignItems: "center",
                  }}
                >
                  {marqueeNames.map((name) => (
                    <span
                      key={`${copy}-${name}`}
                      style={{
                        font: "var(--heading-3)",
                        color: "var(--text-strong)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {name}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Image */}
      <section
        style={{ maxWidth: 1160, margin: "0 auto", padding: "8px 24px 0" }}
      >
        <div
          data-reveal
          style={{
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
            height: "clamp(220px,34vw,420px)",
            position: "relative",
            background: "var(--surface-sunken)",
            border: "1px solid var(--border-hairline)",
          }}
        >
          <img
            src="/assets/healthcare-slot2.png"
            alt="Healthcare facility operations"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      </section>

      {/* Stats */}
      <section
        style={{ maxWidth: 1160, margin: "0 auto", padding: "80px 24px 0" }}
      >
        <h2
          data-reveal
          style={{
            font: "var(--display-3)",
            letterSpacing: "var(--display-track)",
            color: "var(--text-strong)",
            margin: 0,
            maxWidth: "24ch",
            textWrap: "pretty" as never,
          }}
        >
          Raise the AI density of your care operation
        </h2>
        <div
          data-r="tri"
          data-reveal
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,minmax(0,1fr))",
            gap: 0,
            marginTop: 48,
          }}
        >
          <div style={{ paddingRight: 32 }}>
            <div style={{ font: "var(--metric)", color: "var(--blue-700)" }}>
              −74%
            </div>
            <div
              style={{
                font: "var(--heading-3)",
                color: "var(--text-strong)",
                marginTop: 14,
              }}
            >
              Time to access
            </div>
            <p
              style={{
                font: "var(--body-md)",
                color: "var(--text-body)",
                margin: "10px 0 0",
                maxWidth: "34ch",
                textWrap: "pretty" as never,
              }}
            >
              Referrals, eligibility, and scheduling resolve in one pass
              instead of being handed between departments.
            </p>
          </div>
          <div
            style={{
              paddingLeft: 32,
              borderLeft: "1px solid var(--border-hairline)",
            }}
          >
            <div style={{ font: "var(--metric)", color: "var(--blue-700)" }}>
              +2.4x
            </div>
            <div
              style={{
                font: "var(--heading-3)",
                color: "var(--text-strong)",
                marginTop: 14,
              }}
            >
              Cases cleared per FTE
            </div>
            <p
              style={{
                font: "var(--body-md)",
                color: "var(--text-body)",
                margin: "10px 0 0",
                maxWidth: "34ch",
                textWrap: "pretty" as never,
              }}
            >
              Claims, prior authorisation, and back-office queues absorb
              volume on the systems you already run.
            </p>
          </div>
          <div
            style={{
              paddingLeft: 32,
              borderLeft: "1px solid var(--border-hairline)",
            }}
          >
            <div style={{ font: "var(--metric)", color: "var(--blue-700)" }}>
              −6.8 pts
            </div>
            <div
              style={{
                font: "var(--heading-3)",
                color: "var(--text-strong)",
                marginTop: 14,
              }}
            >
              No-show rate
            </div>
            <p
              style={{
                font: "var(--body-md)",
                color: "var(--text-body)",
                margin: "10px 0 0",
                maxWidth: "34ch",
                textWrap: "pretty" as never,
              }}
            >
              Fuller schedules and preventive outreach that reaches the right
              patient at the right moment.
            </p>
          </div>
        </div>
      </section>

      {/* Workflows */}
      <section
        style={{ maxWidth: 1160, margin: "0 auto", padding: "96px 24px 0" }}
      >
        <h2
          data-reveal
          style={{
            font: "var(--display-3)",
            letterSpacing: "var(--display-track)",
            color: "var(--text-strong)",
            margin: 0,
            maxWidth: "26ch",
            textWrap: "pretty" as never,
          }}
        >
          The workflows we deploy first
        </h2>
        <div
          data-r="wf"
          data-reveal
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,minmax(0,1fr))",
            gap: 20,
            marginTop: 40,
          }}
        >
          <div
            style={{
              border: "1px solid var(--border-hairline)",
              borderRadius: "var(--radius-md)",
              background: "var(--surface-card)",
              boxShadow: "var(--shadow-1)",
              padding: 30,
            }}
          >
            <div
              style={{
                font: "var(--label)",
                letterSpacing: "var(--label-track)",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}
            >
              01
            </div>
            <div
              style={{
                font: "var(--heading-2)",
                color: "var(--text-strong)",
                marginTop: 14,
              }}
            >
              Clinical operations
            </div>
            <p
              style={{
                font: "var(--body-md)",
                color: "var(--text-body)",
                margin: "12px 0 0",
                maxWidth: "44ch",
                textWrap: "pretty" as never,
              }}
            >
              Record summarisation, documentation drafting, and care
              coordination that augments clinicians &#8212; a person signs
              every clinical decision.
            </p>
          </div>
          <div
            style={{
              border: "1px solid var(--border-hairline)",
              borderRadius: "var(--radius-md)",
              background: "var(--surface-card)",
              boxShadow: "var(--shadow-1)",
              padding: 30,
            }}
          >
            <div
              style={{
                font: "var(--label)",
                letterSpacing: "var(--label-track)",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}
            >
              02
            </div>
            <div
              style={{
                font: "var(--heading-2)",
                color: "var(--text-strong)",
                marginTop: 14,
              }}
            >
              Scheduling and access
            </div>
            <p
              style={{
                font: "var(--body-md)",
                color: "var(--text-body)",
                margin: "12px 0 0",
                maxWidth: "44ch",
                textWrap: "pretty" as never,
              }}
            >
              Booking, referral management, eligibility checks, and
              preventive-care outreach &#8212; actioned in the EHR rather than
              logged as a task.
            </p>
          </div>
          <div
            style={{
              border: "1px solid var(--border-hairline)",
              borderRadius: "var(--radius-md)",
              background: "var(--surface-card)",
              boxShadow: "var(--shadow-1)",
              padding: 30,
            }}
          >
            <div
              style={{
                font: "var(--label)",
                letterSpacing: "var(--label-track)",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}
            >
              03
            </div>
            <div
              style={{
                font: "var(--heading-2)",
                color: "var(--text-strong)",
                marginTop: 14,
              }}
            >
              Compliance and quality
            </div>
            <p
              style={{
                font: "var(--body-md)",
                color: "var(--text-body)",
                margin: "12px 0 0",
                maxWidth: "44ch",
                textWrap: "pretty" as never,
              }}
            >
              Continuous policy monitoring, QA sampling, and an audit trail on
              every interaction &#8212; assembled as work happens, not at
              review time.
            </p>
          </div>
          <div
            style={{
              border: "1px solid var(--border-hairline)",
              borderRadius: "var(--radius-md)",
              background: "var(--surface-card)",
              boxShadow: "var(--shadow-1)",
              padding: 30,
            }}
          >
            <div
              style={{
                font: "var(--label)",
                letterSpacing: "var(--label-track)",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}
            >
              04
            </div>
            <div
              style={{
                font: "var(--heading-2)",
                color: "var(--text-strong)",
                marginTop: 14,
              }}
            >
              Revenue cycle and corporate
            </div>
            <p
              style={{
                font: "var(--body-md)",
                color: "var(--text-body)",
                margin: "12px 0 0",
                maxWidth: "44ch",
                textWrap: "pretty" as never,
              }}
            >
              Claims processing, denial rework, invoice validation,
              procurement review, and internal service requests cleared end to
              end.
            </p>
          </div>
        </div>
      </section>

      {/* Why healthcare leaders deploy with us */}
      <section
        className="brand-field--flat on-navy"
        style={{ position: "relative", marginTop: 96 }}
      >
        <div
          style={{
            maxWidth: 1160,
            margin: "0 auto",
            padding: "88px clamp(20px,5vw,40px)",
          }}
        >
          <div
            style={{
              font: "var(--eyebrow)",
              letterSpacing: "var(--eyebrow-track)",
              textTransform: "uppercase",
              color: "rgba(249,246,243,.6)",
            }}
          >
            Why healthcare leaders deploy with us
          </div>
          <p
            data-reveal
            style={{
              font: "var(--display-2)",
              letterSpacing: "var(--display-track)",
              color: "var(--paper-050)",
              margin: "20px 0 0",
              maxWidth: "34ch",
              textWrap: "pretty" as never,
            }}
          >
            We don&#8217;t automate one department at a time. We take a
            workflow into production across every person and system that
            touches it.
          </p>
          <div
            data-r="why"
            data-reveal
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,minmax(0,1fr))",
              gap: 20,
              marginTop: 56,
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,.05)",
                border: "1px solid rgba(255,255,255,.10)",
                borderRadius: "var(--radius-md)",
                padding: 28,
              }}
            >
              <div
                style={{
                  font: "var(--heading-2)",
                  color: "var(--paper-050)",
                }}
              >
                Frontier models, in production
              </div>
              <p
                style={{
                  font: "var(--body-md)",
                  color: "rgba(249,246,243,.78)",
                  margin: "12px 0 0",
                  maxWidth: "42ch",
                  textWrap: "pretty" as never,
                }}
              >
                Evaluated continuously against your own cases and coding rules
                &#8212; in your tenancy, your region, your controls.
              </p>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,.05)",
                border: "1px solid rgba(255,255,255,.10)",
                borderRadius: "var(--radius-md)",
                padding: 28,
              }}
            >
              <div
                style={{
                  font: "var(--heading-2)",
                  color: "var(--paper-050)",
                }}
              >
                One deployment, whole organisation
              </div>
              <p
                style={{
                  font: "var(--body-md)",
                  color: "rgba(249,246,243,.78)",
                  margin: "12px 0 0",
                  maxWidth: "42ch",
                  textWrap: "pretty" as never,
                }}
              >
                Clinical, revenue cycle, and back office share one measured
                surface, connected to the HIS, EHR, and claims systems already
                in place.
              </p>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,.05)",
                border: "1px solid rgba(255,255,255,.10)",
                borderRadius: "var(--radius-md)",
                padding: 28,
              }}
            >
              <div
                style={{
                  font: "var(--heading-2)",
                  color: "var(--paper-050)",
                }}
              >
                HIPAA-grade by construction
              </div>
              <p
                style={{
                  font: "var(--body-md)",
                  color: "rgba(249,246,243,.78)",
                  margin: "12px 0 0",
                  maxWidth: "42ch",
                  textWrap: "pretty" as never,
                }}
              >
                Minimum-necessary data access, explicit human oversight, and
                evidence attached to every decision.
              </p>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,.05)",
                border: "1px solid rgba(255,255,255,.10)",
                borderRadius: "var(--radius-md)",
                padding: 28,
              }}
            >
              <div
                style={{
                  font: "var(--heading-2)",
                  color: "var(--paper-050)",
                }}
              >
                A deployment team, not a licence
              </div>
              <p
                style={{
                  font: "var(--body-md)",
                  color: "rgba(249,246,243,.78)",
                  margin: "12px 0 0",
                  maxWidth: "42ch",
                  textWrap: "pretty" as never,
                }}
              >
                Forward-deployed engineers put the first workflow live, then
                leave your teams able to build the next one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "96px 24px 96px",
        }}
      >
        <div
          data-r="cols2"
          data-reveal
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1.3fr) minmax(0,1fr)",
            gap: 48,
            alignItems: "end",
          }}
        >
          <div>
            <h2
              style={{
                font: "var(--display-3)",
                letterSpacing: "var(--display-track)",
                color: "var(--text-strong)",
                margin: 0,
                maxWidth: "24ch",
                textWrap: "pretty" as never,
              }}
            >
              Bring us one care workflow
            </h2>
            <p
              style={{
                font: "var(--body-md)",
                color: "var(--text-body)",
                margin: "16px 0 0",
                maxWidth: "56ch",
                textWrap: "pretty" as never,
              }}
            >
              We baseline its AI density in a week, then deploy against the
              largest gap. Assessment before commitment.
            </p>
          </div>
          <Link
            href="/contact"
            style={{
              justifySelf: "start",
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              background: "var(--action-primary)",
              color: "var(--paper-050)",
              font: "var(--label)",
              letterSpacing: "var(--label-track)",
              padding: "15px 26px",
              borderRadius: 999,
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

      <CompactFooter />

      <style>{`
        @keyframes hc-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (max-width: 900px) {
          [data-r="cols2"] {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 28px !important;
          }
          [data-r="tri"] {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 0 !important;
          }
          [data-r="tri"] > * {
            border-left: 0 !important;
            border-top: 1px solid var(--border-hairline) !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            padding-top: 26px !important;
          }
          [data-r="tri"] > *:first-child {
            border-top: 0 !important;
            padding-top: 0 !important;
          }
          [data-r="wf"] {
            grid-template-columns: minmax(0, 1fr) !important;
          }
          [data-r="why"] {
            grid-template-columns: minmax(0, 1fr) !important;
          }
          [data-r="hero"] {
            min-height: 0 !important;
            padding: 120px 24px 64px !important;
          }
        }
      `}</style>
    </div>
  );
}
