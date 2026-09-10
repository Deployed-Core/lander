"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import AnnouncementBar from "@/components/AnnouncementBar";
import { posts } from "@/data/posts";

type Filter = "All posts" | "Deployments" | "Industry" | "Product";
const filters: Filter[] = ["All posts", "Deployments", "Industry", "Product"];

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All posts");
  const stickyWrapRef = useRef<HTMLDivElement>(null);
  const stickyInnerRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [gridOverflow, setGridOverflow] = useState(0);
  const rafRef = useRef<number>(0);

  const filtered =
    activeFilter === "All posts"
      ? posts
      : posts.filter((p) => p.tag === activeFilter);

  const featured = posts[0];

  const measure = useCallback(() => {
    if (!clipRef.current || !gridRef.current) return 0;
    const clipH = clipRef.current.offsetHeight;
    const gridH = gridRef.current.scrollHeight;
    const overflow = Math.max(0, gridH - clipH + 40);
    return overflow;
  }, []);

  useEffect(() => {
    const recalc = () => {
      const ov = measure();
      setGridOverflow(ov);
      if (stickyWrapRef.current) {
        stickyWrapRef.current.style.height = `calc(100vh + ${ov}px)`;
      }
    };

    recalc();
    window.addEventListener("resize", recalc);

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!stickyWrapRef.current) return;
        const rect = stickyWrapRef.current.getBoundingClientRect();
        const progress = Math.max(0, -rect.top);
        setScrollOffset(progress);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const timer = setTimeout(recalc, 100);

    return () => {
      window.removeEventListener("resize", recalc);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timer);
    };
  }, [measure, filtered.length]);

  useEffect(() => {
    const ov = measure();
    setGridOverflow(ov);
    if (stickyWrapRef.current) {
      stickyWrapRef.current.style.height = `calc(100vh + ${ov}px)`;
    }
  }, [activeFilter, measure]);

  const clampedOffset = Math.min(scrollOffset, gridOverflow);

  return (
    <div style={{ background: "var(--surface-page)", minHeight: "100vh" }}>
      <style>{`
        @media (max-width: 768px) {
          .featured-card {
            grid-template-columns: 1fr !important;
          }
          .featured-card > div:last-child {
            padding: var(--space-6) var(--space-6) var(--space-8) !important;
          }
          .blog-sticky-inner {
            position: relative !important;
            top: auto !important;
            height: auto !important;
            overflow: visible !important;
          }
          .blog-sticky-wrap {
            height: auto !important;
          }
          .blog-grid-translate {
            transform: none !important;
          }
        }
        @media (max-width: 900px) {
          [data-r="foot"] {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 560px) {
          [data-r="foot"] {
            grid-template-columns: minmax(0, 1fr) !important;
          }
        }
      `}</style>

      <AnnouncementBar />
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
          href={`/blog/${featured.slug}`}
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
          <div
            style={{
              aspectRatio: "16 / 10",
              background: featured.gradient,
              borderRadius: "var(--radius-lg) 0 0 var(--radius-lg)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "url(/assets/grain-512.png) repeat",
                backgroundSize: "512px 512px",
                opacity: 0.06,
                mixBlendMode: "soft-light",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "var(--space-10) var(--space-10) var(--space-10) 0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  font: "var(--body-sm)",
                  color: "var(--text-muted)",
                }}
              >
                {featured.date}
              </span>
              <span style={{ font: "var(--body-sm)", color: "var(--text-faint)" }}>&middot;</span>
              <span
                style={{
                  font: "var(--body-sm)",
                  color: "var(--text-muted)",
                }}
              >
                {featured.readingTime} min read
              </span>
            </div>
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
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: "var(--space-6)" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  font: "var(--label)",
                  letterSpacing: "var(--label-track)",
                  color: "var(--text-link)",
                }}
              >
                Read the case
                <img
                  src="/assets/icon-arrow-navy.png"
                  alt=""
                  style={{ width: 13, height: 12, display: "block" }}
                />
              </span>
              <span
                style={{
                  font: "var(--body-sm)",
                  color: "var(--text-muted)",
                  background: "var(--surface-accent-soft)",
                  padding: "2px 10px",
                  borderRadius: "var(--radius-pill)",
                }}
              >
                {featured.tag}
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Sticky scroll section */}
      <div ref={stickyWrapRef} className="blog-sticky-wrap">
        <div
          ref={stickyInnerRef}
          className="blog-sticky-inner"
          style={{
            position: "sticky",
            top: 70,
            height: "calc(100vh - 70px)",
            overflow: "hidden",
            background: "var(--surface-page)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header area — stays fixed, never overlapped */}
          <div
            style={{
              flexShrink: 0,
              maxWidth: "var(--page-max)",
              margin: "0 auto",
              padding: "var(--space-10) var(--gutter) 0",
              width: "100%",
              boxSizing: "border-box",
              background: "var(--surface-page)",
              zIndex: 3,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div>
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
                  Perspectives on applied AI, deployments, and building for the
                  enterprise.
                </p>
              </div>

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
                      onClick={() => setActiveFilter(f)}
                      style={{
                        font: "var(--body-sm)",
                        padding: "8px 18px",
                        borderRadius: "var(--radius-pill)",
                        cursor: "pointer",
                        transition: "var(--transition-ui)",
                        border: isActive
                          ? "1px solid transparent"
                          : "1px solid var(--border-subtle)",
                        background: isActive ? "var(--blue-850)" : "transparent",
                        color: isActive
                          ? "var(--paper-050)"
                          : "var(--text-body)",
                      }}
                    >
                      {f}
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              style={{
                borderBottom: "1px solid var(--border-hairline)",
                margin: "var(--space-6) 0 0",
              }}
            />
          </div>

          {/* Clipped viewport for scrolling cards */}
          <div ref={clipRef} style={{ flex: 1, overflow: "hidden", position: "relative" }}>
          <div
            className="blog-grid-translate"
            style={{
              transform: `translateY(-${clampedOffset}px)`,
              willChange: "transform",
            }}
          >
            <div
              ref={gridRef}
              style={{
                maxWidth: "var(--page-max)",
                margin: "0 auto",
                padding: "var(--space-8) var(--gutter) var(--space-20)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(272px, 1fr))",
                  gap: "40px 32px",
                }}
              >
                {filtered.map((post, i) => (
                  <Link
                    key={`${activeFilter}-${i}`}
                    href={`/blog/${post.slug}`}
                    style={{
                      display: "block",
                      textDecoration: "none",
                      borderBottom: 0,
                    }}
                  >
                    <div
                      style={{
                        aspectRatio: "4 / 3",
                        background: post.gradient,
                        borderRadius: "var(--radius-md)",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "url(/assets/grain-512.png) repeat",
                          backgroundSize: "512px 512px",
                          opacity: 0.06,
                          mixBlendMode: "soft-light",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginTop: "var(--space-4)",
                      }}
                    >
                      <span
                        style={{
                          font: "var(--body-sm)",
                          color: "var(--text-muted)",
                        }}
                      >
                        {post.date}
                      </span>
                      <span style={{ font: "var(--body-sm)", color: "var(--text-faint)" }}>&middot;</span>
                      <span
                        style={{
                          font: "var(--body-sm)",
                          color: "var(--text-muted)",
                        }}
                      >
                        {post.readingTime} min read
                      </span>
                    </div>
                    <h3
                      style={{
                        font: "var(--heading-2)",
                        color: "var(--text-strong)",
                        marginTop: "var(--space-2)",
                      }}
                    >
                      {post.title}
                    </h3>
                    <p
                      style={{
                        font: "var(--body-sm)",
                        color: "var(--text-body)",
                        marginTop: "var(--space-2)",
                        marginBottom: 0,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {post.description}
                    </p>
                    <span
                      style={{
                        display: "inline-block",
                        font: "var(--body-sm)",
                        color: "var(--text-muted)",
                        marginTop: "var(--space-3)",
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
            </div>
          </div>

          {/* Fade overlay at bottom */}
          {gridOverflow > 0 && clampedOffset < gridOverflow - 10 && (
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 120,
                background:
                  "linear-gradient(to top, var(--surface-page) 0%, transparent 100%)",
                pointerEvents: "none",
                zIndex: 2,
              }}
            />
          )}
          </div>{/* end clipped viewport */}
        </div>
      </div>

      {/* Footer */}
      <footer
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
            gridTemplateColumns: "minmax(0,1.3fr) repeat(3,minmax(0,1fr))",
            gap: 48,
          }}
        >
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
            <Link
              href="/contact"
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

          <div style={{ display: "grid", gap: 11, alignContent: "start" }}>
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

          <div style={{ display: "grid", gap: 11, alignContent: "start" }}>
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

          <div style={{ display: "grid", gap: 11, alignContent: "start" }}>
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
              href="#"
              style={{
                font: "var(--body-sm)",
                color: "rgba(249,246,243,.78)",
              }}
            >
              Industries
            </a>
            <a
              href="#"
              style={{
                font: "var(--body-sm)",
                color: "rgba(249,246,243,.78)",
              }}
            >
              Security
            </a>
          </div>
        </div>

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
