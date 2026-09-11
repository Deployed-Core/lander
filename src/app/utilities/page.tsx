"use client";

import { useEffect } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import CompactFooter from "@/components/CompactFooter";

export default function UtilitiesPage() {
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
            src="/assets/utilities-hero.png"
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
            Utilities
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
            Where a utility&#8217;s hardest workflows become reliable
            production &#8212; first report to closed job, at outage volume.
          </p>
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
          Raise the AI density of your utility operation
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
              24/7
            </div>
            <div
              style={{
                font: "var(--heading-3)",
                color: "var(--text-strong)",
                marginTop: 14,
              }}
            >
              Resolution, not routing
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
              A bill query or an outage report is handled end to end at any
              hour, without being passed between departments.
            </p>
          </div>
          <div
            style={{
              paddingLeft: 32,
              borderLeft: "1px solid var(--border-hairline)",
            }}
          >
            <div style={{ font: "var(--metric)", color: "var(--blue-700)" }}>
              −38%
            </div>
            <div
              style={{
                font: "var(--heading-3)",
                color: "var(--text-strong)",
                marginTop: 14,
              }}
            >
              Cost to serve
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
              Billing, field, and the contact centre run leaner on the CRM,
              CIS, and WFM systems already in place.
            </p>
          </div>
          <div
            style={{
              paddingLeft: 32,
              borderLeft: "1px solid var(--border-hairline)",
            }}
          >
            <div style={{ font: "var(--metric)", color: "var(--blue-700)" }}>
              14x
            </div>
            <div
              style={{
                font: "var(--heading-3)",
                color: "var(--text-strong)",
                marginTop: 14,
              }}
            >
              Surge headroom
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
              Storm spikes, emergencies, and seasonal peaks are absorbed
              without growing the operation.
            </p>
          </div>
        </div>
      </section>

      {/* Customer story */}
      <section
        className="brand-field--flat on-navy"
        style={{ position: "relative", marginTop: 96 }}
      >
        <div
          style={{
            maxWidth: 1160,
            margin: "0 auto",
            padding: "80px clamp(20px,5vw,40px)",
          }}
        >
          <div
            data-r="story"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1.1fr) minmax(0,1fr)",
              gap: 48,
              alignItems: "center",
            }}
          >
            <div
              data-reveal
              style={{
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                height: "clamp(220px,26vw,340px)",
                position: "relative",
                background: "rgba(255,255,255,.05)",
                border: "1px solid rgba(255,255,255,.10)",
              }}
            >
              <img
                src="/assets/utilities-slot3.png"
                alt="Field engineer at utility substation"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <div data-reveal>
              <div
                style={{
                  font: "var(--eyebrow)",
                  letterSpacing: "var(--eyebrow-track)",
                  textTransform: "uppercase",
                  color: "rgba(249,246,243,.6)",
                }}
              >
                Customer story
              </div>
              <p
                style={{
                  font: "var(--heading-1)",
                  color: "var(--paper-050)",
                  margin: "16px 0 0",
                  maxWidth: "34ch",
                  textWrap: "pretty" as never,
                }}
              >
                A regional electric utility deployed policy-aligned agents
                across outage management and field operations &#8212;
                coordinating incidents from detection through restoration.
              </p>
              <div
                data-r="storystats"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,minmax(0,1fr))",
                  gap: 20,
                  marginTop: 36,
                }}
              >
                <div>
                  <div
                    style={{
                      font: "var(--metric)",
                      fontSize: 34,
                      color: "var(--paper-050)",
                    }}
                  >
                    −18%
                  </div>
                  <div
                    style={{
                      font: "var(--body-sm)",
                      color: "rgba(249,246,243,.7)",
                      marginTop: 6,
                    }}
                  >
                    SAIDI contribution from operational delays
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      font: "var(--metric)",
                      fontSize: 34,
                      color: "var(--paper-050)",
                    }}
                  >
                    −27%
                  </div>
                  <div
                    style={{
                      font: "var(--body-sm)",
                      color: "rgba(249,246,243,.7)",
                      marginTop: 6,
                    }}
                  >
                    Time to field dispatch
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      font: "var(--metric)",
                      fontSize: 34,
                      color: "var(--paper-050)",
                    }}
                  >
                    −23%
                  </div>
                  <div
                    style={{
                      font: "var(--body-sm)",
                      color: "rgba(249,246,243,.7)",
                      marginTop: 6,
                    }}
                  >
                    Truck rolls per incident
                  </div>
                </div>
              </div>
            </div>
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
          The workflows we enhanced earlier
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
              Field and emergency operations
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
              Technician dispatch, incident triage for gas and water escapes,
              and asset monitoring across electricity, gas, and water.
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
              Grid and connections
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
              Capacity-increase requests, new connection processing, and
              outage status surfaced to customers in real time.
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
              Service visit booking, site onboarding, meter access
              appointments, and tariff or plan eligibility checks.
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
              Billing and collections
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
              Billing queries, arrears and payment plans, and reconciliation
              across cash, card, and direct debit.
            </p>
          </div>
        </div>
      </section>

      {/* Why utilities deploy with us */}
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
            Why utilities deploy with us
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
            We don&#8217;t automate one function at a time. We take a workflow
            into production across every person and system that touches it.
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
                Evaluated continuously against your own tariffs, policies, and
                network cases &#8212; in your tenancy, your region, your
                controls.
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
                One deployment, whole utility
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
                Grid, field, billing, and customer operations share one
                measured surface, connected to the systems you already run.
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
                Always-on, infrastructure grade
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
                SOC 2 Type II and PCI DSS controls, human oversight on
                safety-critical steps, and a full audit trail on every
                decision.
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
              Bring us one utility workflow
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
          [data-r="story"] {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 28px !important;
          }
          [data-r="storystats"] {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
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
