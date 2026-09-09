"use client";

import { useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";

const posts = [
  {
    date: "4 Sept 2026",
    title: "Healthcare manpower optimisation",
    tag: "Industry",
    description:
      "How a regional hospital network used AI-driven scheduling to cut agency spend by 34% while improving nurse satisfaction scores.",
  },
  {
    date: "28 Aug 2026",
    title: "What an assessment week actually looks like",
    tag: "Deployments",
    description:
      "A day-by-day walkthrough of how we map processes, identify leverage points, and build the deployment roadmap.",
  },
  {
    date: "19 Aug 2026",
    title: "Agentic ops for claims processing",
    tag: "Deployments",
    description:
      "End-to-end automation that handles intake, triage, and adjudication — reducing cycle time from days to minutes.",
  },
  {
    date: "7 Aug 2026",
    title: "Measuring AI density without scoring people",
    tag: "Product",
    description:
      "Our framework for quantifying organisational AI maturity at the process level, not the individual level.",
  },
  {
    date: "25 Jul 2026",
    title: "Hand-off, not dependency",
    tag: "Product",
    description:
      "Why every engagement ends with your team owning the system — and how we structure knowledge transfer from week one.",
  },
  {
    date: "11 Jul 2026",
    title: "Where logistics teams find leverage first",
    tag: "Industry",
    description:
      "The three operational bottlenecks where AI creates outsized returns in supply-chain and distribution businesses.",
  },
];

type Filter = "All posts" | "Deployments" | "Industry" | "Product";
const filters: Filter[] = ["All posts", "Deployments", "Industry", "Product"];

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All posts");
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered =
    activeFilter === "All posts"
      ? posts
      : posts.filter((p) => p.tag === activeFilter);

  const visible = filtered.slice(0, visibleCount);
  const featured = posts[0];

  return (
    <div style={{ background: "var(--surface-page)", minHeight: "100vh" }}>
      <SiteNav active="Blog" tone="light" />

      {/* Hero / eyebrow */}
      <section
        style={{
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          padding: "var(--space-16) var(--gutter) var(--space-10)",
        }}
      >
        <span
          style={{
            font: "var(--eyebrow)",
            letterSpacing: "var(--eyebrow-track)",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          Writing from Deployed
        </span>
      </section>

      {/* Featured post */}
      <section
        style={{
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          padding: "0 var(--gutter) var(--section-y)",
        }}
      >
        <Link
          href="#"
          className="featured-card"
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 1fr",
            gap: "var(--space-10)",
            background: "var(--surface-card)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            border: "1px solid var(--border-hairline)",
            textDecoration: "none",
            borderBottom: "1px solid var(--border-hairline)",
            transition: "box-shadow var(--dur-base) var(--ease-out)",
          }}
        >
          {/* Image placeholder */}
          <div
            style={{
              aspectRatio: "16 / 10",
              background: "var(--surface-sunken)",
              borderRadius: "var(--radius-lg) 0 0 var(--radius-lg)",
            }}
          />

          {/* Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "var(--space-10) var(--space-10) var(--space-10) 0",
            }}
          >
            <span
              style={{
                font: "var(--body-sm)",
                color: "var(--text-muted)",
              }}
            >
              {featured.date}
            </span>
            <h2
              style={{
                font: "var(--display-3)",
                letterSpacing: "var(--display-track)",
                color: "var(--text-strong)",
                marginTop: "var(--space-3)",
              }}
            >
              {featured.title}
            </h2>
            <p
              style={{
                font: "var(--body-md)",
                color: "var(--text-body)",
                marginTop: "var(--space-4)",
                marginBottom: 0,
                maxWidth: "var(--prose-max)",
              }}
            >
              {featured.description}
            </p>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                font: "var(--label)",
                letterSpacing: "var(--label-track)",
                color: "var(--text-link)",
                marginTop: "var(--space-6)",
              }}
            >
              Read the case
              <img
                src="/assets/icon-arrow-navy.png"
                alt=""
                style={{ width: 13, height: 12, display: "block" }}
              />
            </span>
          </div>
        </Link>
      </section>

      {/* All posts heading + filters */}
      <section
        style={{
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          padding: "0 var(--gutter)",
        }}
      >
        <h2
          style={{
            font: "var(--display-2)",
            letterSpacing: "var(--display-track)",
            color: "var(--text-strong)",
          }}
        >
          All posts
        </h2>
        <p
          style={{
            font: "var(--body-md)",
            color: "var(--text-muted)",
            marginTop: "var(--space-2)",
            marginBottom: 0,
          }}
        >
          Perspectives on applied AI, deployments, and building for the enterprise.
        </p>

        <div
          style={{
            borderBottom: "1px solid var(--border-hairline)",
            margin: "var(--space-8) 0 var(--space-10)",
          }}
        />

        {/* Filter buttons */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-2)",
          }}
        >
          {filters.map((f) => {
            const isActive = f === activeFilter;
            return (
              <button
                key={f}
                type="button"
                onClick={() => {
                  setActiveFilter(f);
                  setVisibleCount(6);
                }}
                style={{
                  font: "var(--body-sm)",
                  padding: "8px 18px",
                  borderRadius: "var(--radius-pill)",
                  cursor: "pointer",
                  transition: "var(--transition-ui)",
                  border: isActive ? "1px solid transparent" : "1px solid var(--border-subtle)",
                  background: isActive ? "var(--blue-850)" : "transparent",
                  color: isActive ? "var(--paper-050)" : "var(--text-body)",
                }}
              >
                {f}
              </button>
            );
          })}
        </div>
      </section>

      {/* Post grid */}
      <section
        style={{
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          padding: "var(--space-10) var(--gutter) var(--space-16)",
        }}
      >
        <div
          className="post-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(272px, 1fr))",
            gap: "40px 32px",
          }}
        >
          {visible.map((post, i) => (
            <Link
              key={i}
              href="#"
              style={{
                display: "block",
                textDecoration: "none",
                borderBottom: 0,
              }}
            >
              {/* Image placeholder */}
              <div
                style={{
                  aspectRatio: "4 / 3",
                  background: "var(--surface-sunken)",
                  borderRadius: "var(--radius-md)",
                }}
              />
              <span
                style={{
                  display: "block",
                  font: "var(--body-sm)",
                  color: "var(--text-muted)",
                  marginTop: "var(--space-4)",
                }}
              >
                {post.date}
              </span>
              <h3
                style={{
                  font: "var(--heading-2)",
                  color: "var(--text-strong)",
                  marginTop: "var(--space-2)",
                }}
              >
                {post.title}
              </h3>
              <span
                style={{
                  display: "inline-block",
                  font: "var(--body-sm)",
                  color: "var(--text-muted)",
                  marginTop: "var(--space-2)",
                  background: "var(--surface-accent-soft)",
                  padding: "2px 10px",
                  borderRadius: "var(--radius-pill)",
                }}
              >
                {post.tag}
              </span>
            </Link>
          ))}
        </div>

        {/* Load more */}
        {visible.length < filtered.length && (
          <div style={{ textAlign: "center", marginTop: "var(--space-12)" }}>
            <button
              type="button"
              onClick={() => setVisibleCount((c) => c + 6)}
              style={{
                font: "var(--label)",
                letterSpacing: "var(--label-track)",
                padding: "13px 32px",
                borderRadius: "var(--radius-pill)",
                border: "1px solid var(--border-strong)",
                background: "transparent",
                color: "var(--text-strong)",
                cursor: "pointer",
                transition: "var(--transition-ui)",
              }}
            >
              Load more
            </button>
          </div>
        )}
      </section>

      {/* Light footer */}
      <footer
        style={{
          background: "var(--paper-100)",
          borderTop: "1px solid var(--border-hairline)",
        }}
      >
        <div
          style={{
            maxWidth: "var(--page-max)",
            margin: "0 auto",
            padding: "72px var(--gutter)",
            display: "flex",
            alignItems: "center",
            gap: 28,
            flexWrap: "wrap",
          }}
        >
          <img
            src="/assets/logo-horizontal-navy.png"
            alt="Deployed"
            style={{ width: 150, minWidth: 130, display: "block" }}
          />
          <span
            style={{
              font: "var(--eyebrow)",
              letterSpacing: "var(--eyebrow-track)",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            Reach optimal AI density within your org
          </span>
          <Link
            href="/contact"
            style={{
              marginLeft: "auto",
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              background: "var(--action-primary)",
              color: "var(--paper-050)",
              font: "var(--label)",
              letterSpacing: "var(--label-track)",
              padding: "13px 22px",
              borderRadius: 999,
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
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .featured-card {
            grid-template-columns: 1fr !important;
          }
          .featured-card > div:last-child {
            padding: var(--space-6) var(--space-6) var(--space-8) !important;
          }
        }
      `}</style>
    </div>
  );
}
