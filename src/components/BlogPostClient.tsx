"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import {
  getPostBySlug,
  getRelatedPosts,
  getAdjacentPosts,
  type ContentBlock,
} from "@/data/posts";

export default function BlogPostClient({ slug }: { slug: string }) {
  const post = getPostBySlug(slug)!;
  const related = getRelatedPosts(slug);
  const { prev, next } = getAdjacentPosts(slug);

  const [progress, setProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState("");
  const [copied, setCopied] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);

  const headings = post.content.filter(
    (b): b is ContentBlock & { type: "heading"; id: string; text: string } =>
      b.type === "heading"
  );

  useEffect(() => {
    const onScroll = () => {
      if (!articleRef.current) return;
      const rect = articleRef.current.getBoundingClientRect();
      const total = articleRef.current.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      setProgress(Math.max(0, Math.min(1, scrolled / total)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = headings.map((h) => h.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveHeading(e.target.id);
        });
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  const shareUrl = `https://deployed.md/blog/${post.slug}`;
  const shareText = post.title;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ background: "var(--surface-page)", minHeight: "100vh" }}>
      <style>{`
        @media (max-width: 900px) {
          .blog-toc-sidebar { display: none !important; }
          .blog-article-grid { grid-template-columns: 1fr !important; }
          [data-r="foot"] { grid-template-columns: repeat(2, minmax(0,1fr)) !important; gap: 32px !important; }
        }
        @media (max-width: 560px) {
          [data-r="foot"] { grid-template-columns: minmax(0,1fr) !important; }
          .blog-hero-meta { flex-direction: column !important; gap: 16px !important; align-items: flex-start !important; }
          .blog-hero-meta .meta-divider { display: none !important; }
          .blog-hero-meta .meta-share { margin-left: 0 !important; }
          .blog-adj-grid { grid-template-columns: 1fr !important; }
        }
        .fig-state-flow {
          display: grid;
          grid-template-columns: 1fr 36px 1.08fr 36px 1fr;
          align-items: center;
          gap: 8px;
        }
        .fig-strategy-flow {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
          list-style: none;
          counter-reset: strategy;
          margin: 0;
          padding: 22px 25px;
        }
        .fig-strategy-flow li {
          counter-increment: strategy;
          border-top: 1px solid var(--border-subtle);
          padding-top: 12px;
        }
        .fig-strategy-flow li::before {
          content: '0' counter(strategy);
          font: var(--label);
          letter-spacing: var(--label-track);
          color: var(--blue-600);
          display: block;
          margin-bottom: 8px;
        }
        .fig-workflow-panels {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
        }
        .fig-workflow-steps li:not(:last-child)::after {
          content: '↓';
          position: absolute;
          bottom: -26px;
          left: calc(50% - 6px);
          color: var(--text-faint);
          font-size: 17px;
          height: 25px;
        }
        .fig-journey-steps {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 18px;
          list-style: none;
          padding: 26px;
          margin: 0;
        }
        .fig-ownership-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 23px 32px;
          padding: 26px;
        }
        .fig-metrics-table {
          width: 100%;
          border-collapse: collapse;
        }
        .fig-metrics-table th,
        .fig-metrics-table td {
          padding: 15px 23px;
          border-bottom: 1px solid var(--border-hairline);
          vertical-align: top;
          text-align: left;
        }
        .fig-metrics-table th {
          font: var(--label);
          letter-spacing: var(--label-track);
          text-transform: uppercase;
          color: var(--text-muted);
          background: var(--surface-card);
        }
        .fig-metrics-table th:first-child { width: 26%; }
        .fig-metrics-table td:first-child {
          font-weight: 600;
          color: var(--text-strong);
        }
        .fig-metrics-table td {
          font: var(--body-md);
          color: var(--text-muted);
        }
        .fig-metrics-table tr:last-child td { border-bottom: 0; }
        .fig-metrics-table tr:last-child { background: var(--surface-accent-soft); }
        @media (max-width: 800px) {
          .fig-state-flow {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }
          .fig-state-flow .flow-arrow-svg {
            transform: rotate(90deg);
            width: 29px !important;
            height: 27px !important;
            justify-self: center;
          }
          .fig-strategy-flow {
            grid-template-columns: 1fr 1fr !important;
            padding: 18px !important;
            gap: 20px !important;
          }
          .fig-workflow-panels {
            grid-template-columns: 1fr !important;
          }
          .fig-workflow-panel-after {
            border-left: 0 !important;
            border-top: 1px solid var(--border-hairline) !important;
          }
          .fig-journey-steps {
            grid-template-columns: 1fr !important;
            padding: 20px !important;
            gap: 18px !important;
          }
          .fig-journey-steps li {
            display: grid !important;
            grid-template-columns: 40px 1fr !important;
            gap: 0 10px !important;
          }
          .fig-ownership-grid {
            grid-template-columns: 1fr !important;
            padding: 20px !important;
          }
          .fig-metrics-table td,
          .fig-metrics-table th {
            padding: 12px !important;
          }
        }
        .fig-comparison-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .fig-consumption-stages {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
          padding: 22px 25px;
        }
        .fig-paths-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .fig-paths-lenses {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 23px 32px;
          padding: 26px;
          border-top: 1px solid var(--border-hairline);
          background: var(--surface-accent-soft);
        }
        @media (max-width: 800px) {
          .fig-comparison-grid {
            grid-template-columns: 1fr !important;
          }
          .fig-comparison-grid > div + div {
            border-left: 0 !important;
            border-top: 1px solid var(--border-hairline) !important;
          }
          .fig-consumption-stages {
            grid-template-columns: 1fr !important;
            padding: 18px !important;
          }
          .fig-paths-grid {
            grid-template-columns: 1fr !important;
          }
          .fig-paths-grid > div + div {
            border-left: 0 !important;
            border-top: 1px solid var(--border-hairline) !important;
          }
          .fig-paths-lenses {
            grid-template-columns: 1fr !important;
            padding: 20px !important;
          }
        }
      `}</style>

      {/* Scroll progress bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: 3,
          width: `${progress * 100}%`,
          background: "var(--blue-500)",
          zIndex: 100,
          transition: "width 80ms linear",
        }}
      />

      <SiteNav active="Blog" tone="light" />

      {/* Breadcrumb */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "var(--space-5) var(--gutter)",
        }}
      >
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            font: "var(--body-sm)",
          }}
        >
          <Link
            href="/blog"
            style={{ color: "var(--text-muted)", borderBottom: 0 }}
          >
            Blog
          </Link>
          <span style={{ color: "var(--text-faint)" }}>/</span>
          <span style={{ color: "var(--text-body)" }}>{post.tag}</span>
          <span style={{ color: "var(--text-faint)" }}>/</span>
          <span
            style={{
              color: "var(--text-muted)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {post.title}
          </span>
        </nav>
      </div>

      {/* Hero image */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "var(--space-4) var(--gutter) 0",
        }}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: "21 / 9",
            background: post.gradient,
            borderRadius: "var(--radius-lg)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.title}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <>
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
              <div
                style={{
                  position: "absolute",
                  bottom: 32,
                  left: 36,
                  font: "var(--display-1)",
                  fontSize: "clamp(32px, 5vw, 72px)",
                  color: "rgba(255,255,255,0.08)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  maxWidth: "80%",
                  pointerEvents: "none",
                }}
              >
                {post.title}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Post header */}
      <header
        style={{
          maxWidth: 780,
          margin: "0 auto",
          padding: "var(--space-10) var(--gutter) 0",
        }}
      >
        <span
          style={{
            display: "inline-block",
            font: "var(--body-sm)",
            color: "var(--blue-700)",
            background: "var(--surface-accent-soft)",
            padding: "3px 12px",
            borderRadius: "var(--radius-pill)",
          }}
        >
          {post.tag}
        </span>

        <h1
          style={{
            font: "var(--display-2)",
            letterSpacing: "var(--display-track)",
            color: "var(--text-strong)",
            marginTop: "var(--space-5)",
          }}
        >
          {post.title}
        </h1>

        <p
          style={{
            font: "var(--body-lg)",
            color: "var(--text-body)",
            marginTop: "var(--space-4)",
            marginBottom: 0,
          }}
        >
          {post.description}
        </p>

        {/* Meta row */}
        <div
          className="blog-hero-meta"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginTop: "var(--space-8)",
            paddingBottom: "var(--space-8)",
            borderBottom: "1px solid var(--border-hairline)",
            flexWrap: "wrap",
          }}
        >
          {/* Author */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {post.author.avatarImage ? (
              <img
                src={post.author.avatarImage}
                alt={post.author.name}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
            ) : (
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "var(--blue-850)",
                  color: "var(--paper-050)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  font: "var(--label)",
                  letterSpacing: "var(--label-track)",
                  flexShrink: 0,
                }}
              >
                {post.author.avatar}
              </div>
            )}
            <div>
              <div
                style={{
                  font: "var(--label)",
                  letterSpacing: "var(--label-track)",
                  color: "var(--text-strong)",
                }}
              >
                {post.author.name}
              </div>
              <div
                style={{ font: "var(--body-sm)", color: "var(--text-muted)" }}
              >
                {post.author.role}
              </div>
            </div>
          </div>

          <div
            className="meta-divider"
            style={{
              width: 1,
              height: 28,
              background: "var(--border-hairline)",
            }}
          />

          {/* Date */}
          <div>
            <div
              style={{ font: "var(--body-sm)", color: "var(--text-muted)" }}
            >
              Published
            </div>
            <div
              style={{
                font: "var(--label)",
                letterSpacing: "var(--label-track)",
                color: "var(--text-strong)",
              }}
            >
              {post.date}
            </div>
          </div>

          <div
            className="meta-divider"
            style={{
              width: 1,
              height: 28,
              background: "var(--border-hairline)",
            }}
          />

          {/* Reading time */}
          <div>
            <div
              style={{ font: "var(--body-sm)", color: "var(--text-muted)" }}
            >
              Reading time
            </div>
            <div
              style={{
                font: "var(--label)",
                letterSpacing: "var(--label-track)",
                color: "var(--text-strong)",
              }}
            >
              {post.readingTime} min read
            </div>
          </div>

          {/* Share buttons — pushed right */}
          <div
            className="meta-share"
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                font: "var(--body-sm)",
                color: "var(--text-faint)",
                marginRight: 4,
              }}
            >
              Share
            </span>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Share on LinkedIn"
              style={{
                width: 34,
                height: 34,
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-subtle)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                font: "var(--label)",
                color: "var(--text-muted)",
                borderBottom: 0,
              }}
            >
              in
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Share on X"
              style={{
                width: 34,
                height: 34,
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-subtle)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                font: "var(--label)",
                color: "var(--text-muted)",
                borderBottom: 0,
              }}
            >
              X
            </a>
            <button
              type="button"
              onClick={copyLink}
              title="Copy link"
              style={{
                width: 34,
                height: 34,
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-subtle)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                font: "var(--label)",
                fontSize: 11,
                color: copied ? "var(--green-600)" : "var(--text-muted)",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              {copied ? "✓" : "⧉"}
            </button>
          </div>
        </div>
      </header>

      {/* Article body + ToC sidebar */}
      <div
        className="blog-article-grid"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "var(--space-10) var(--gutter) var(--space-16)",
          display: "grid",
          gridTemplateColumns: "1fr 240px",
          gap: 56,
          alignItems: "start",
        }}
      >
        {/* Article content */}
        <article
          ref={articleRef}
          style={{
            maxWidth: 780,
            font: "var(--body-lg)",
            color: "var(--text-body)",
            lineHeight: 1.72,
          }}
        >
          {post.content.map((block, i) => {
            switch (block.type) {
              case "heading":
                return (
                  <h2
                    key={i}
                    id={block.id}
                    style={{
                      font: "var(--heading-1)",
                      color: "var(--text-strong)",
                      marginTop: i === 0 ? 0 : "var(--space-12)",
                      marginBottom: "var(--space-4)",
                      scrollMarginTop: 90,
                    }}
                  >
                    {block.text}
                  </h2>
                );
              case "subheading":
                return (
                  <h3
                    key={i}
                    id={block.id}
                    style={{
                      font: "var(--heading-2)",
                      color: "var(--text-strong)",
                      marginTop: "var(--space-8)",
                      marginBottom: "var(--space-3)",
                      scrollMarginTop: 90,
                    }}
                  >
                    {block.text}
                  </h3>
                );
              case "paragraph":
                return (
                  <p
                    key={i}
                    style={{
                      margin: "0 0 var(--space-5)",
                      ...(block.lead
                        ? { fontSize: 21, lineHeight: 1.65 }
                        : {}),
                    }}
                  >
                    {block.text}
                  </p>
                );
              case "quote":
                return (
                  <blockquote
                    key={i}
                    style={{
                      borderLeft: "3px solid var(--blue-400)",
                      margin: "var(--space-8) 0",
                      padding: "var(--space-4) 0 var(--space-4) var(--space-6)",
                    }}
                  >
                    <p
                      style={{
                        font: "var(--display-3)",
                        fontSize: "clamp(18px, 2vw, 24px)",
                        letterSpacing: "var(--display-track)",
                        color: "var(--text-strong)",
                        margin: 0,
                        fontStyle: "italic",
                      }}
                    >
                      &ldquo;{block.text}&rdquo;
                    </p>
                    {block.attribution && (
                      <cite
                        style={{
                          display: "block",
                          font: "var(--body-sm)",
                          color: "var(--text-muted)",
                          marginTop: "var(--space-3)",
                          fontStyle: "normal",
                        }}
                      >
                        &mdash; {block.attribution}
                      </cite>
                    )}
                  </blockquote>
                );
              case "list":
                return (
                  <ul
                    key={i}
                    style={{
                      margin: "var(--space-4) 0 var(--space-6)",
                      paddingLeft: "var(--space-6)",
                      display: "grid",
                      gap: "var(--space-3)",
                    }}
                  >
                    {block.items.map((item, j) => (
                      <li
                        key={j}
                        style={{
                          font: "var(--body-md)",
                          color: "var(--text-body)",
                          lineHeight: 1.65,
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              case "pull-quote":
                return (
                  <p
                    key={i}
                    style={{
                      borderLeft: "3px solid var(--blue-500)",
                      padding: "3px 0 3px 23px",
                      fontSize: 22,
                      lineHeight: 1.55,
                      margin: "var(--space-8) 0",
                      color: "var(--text-strong)",
                    }}
                  >
                    {block.text}
                  </p>
                );
              case "example-note":
                return (
                  <p
                    key={i}
                    style={{
                      font: "var(--body-sm)",
                      lineHeight: 1.6,
                      color: "var(--text-muted)",
                      borderLeft: "2px solid var(--blue-200)",
                      paddingLeft: 14,
                      margin: "var(--space-6) 0",
                    }}
                  >
                    <strong>{block.text.split(".")[0]}.</strong>
                    {block.text.substring(block.text.indexOf(".") + 1)}
                  </p>
                );
              case "figure-transition":
                return (
                  <figure
                    key={i}
                    style={{
                      margin: "var(--space-8) 0 var(--space-6)",
                      background: "var(--blue-850)",
                      border: "1px solid var(--blue-800)",
                      borderRadius: "var(--radius-lg)",
                      overflow: "hidden",
                      color: "var(--paper-050)",
                    }}
                  >
                    <div
                      style={{
                        padding: "19px 25px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                        font: "var(--label)",
                        letterSpacing: "var(--label-track)",
                        textTransform: "uppercase",
                        color: "rgba(212,220,255,.7)",
                        borderBottom: "1px solid rgba(255,255,255,.18)",
                      }}
                    >
                      <span style={{ color: "var(--paper-050)" }}>{block.label}</span>
                      <span>{block.sublabel}</span>
                    </div>
                    <div style={{ padding: "32px 26px 26px" }}>
                      <div className="fig-state-flow">
                        <div
                          style={{
                            border: "1px solid rgba(255,255,255,.28)",
                            padding: "20px 16px",
                            minHeight: 185,
                          }}
                        >
                          <div
                            style={{
                              font: "var(--label)",
                              letterSpacing: "1px",
                              textTransform: "uppercase",
                              marginBottom: 13,
                              color: "rgba(212,220,255,.7)",
                            }}
                          >
                            {block.inputState.label}
                          </div>
                          <ul
                            style={{
                              listStyle: "none",
                              margin: 0,
                              padding: 0,
                              font: "var(--body-md)",
                              lineHeight: 1.9,
                            }}
                          >
                            {block.inputState.items.map((item, j) => (
                              <li key={j}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <svg
                          className="flow-arrow-svg"
                          viewBox="0 0 36 24"
                          aria-hidden="true"
                          style={{ width: "100%", height: 25, color: "currentColor" }}
                        >
                          <path
                            d="M2 12h30m-8-8 8 8-8 8"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            fill="none"
                          />
                        </svg>
                        <div
                          style={{
                            background: "var(--paper-000)",
                            color: "var(--blue-600)",
                            border: "1px solid var(--paper-000)",
                            padding: "20px 16px",
                            minHeight: 185,
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              font: "var(--label)",
                              letterSpacing: "1px",
                              textTransform: "uppercase",
                              marginBottom: 13,
                              color: "var(--text-muted)",
                            }}
                          >
                            {block.functionBox.label}
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--font-display)",
                              fontStyle: "italic",
                              fontSize: "clamp(24px, 2.5vw, 34px)",
                              lineHeight: 1.2,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {block.functionBox.name}
                          </div>
                          <div
                            style={{
                              font: "var(--body-sm)",
                              lineHeight: 1.6,
                              marginTop: 12,
                              whiteSpace: "pre-line",
                            }}
                          >
                            {block.functionBox.detail}
                          </div>
                        </div>
                        <svg
                          className="flow-arrow-svg"
                          viewBox="0 0 36 24"
                          aria-hidden="true"
                          style={{ width: "100%", height: 25, color: "currentColor" }}
                        >
                          <path
                            d="M2 12h30m-8-8 8 8-8 8"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            fill="none"
                          />
                        </svg>
                        <div
                          style={{
                            border: "1px solid rgba(255,255,255,.28)",
                            padding: "20px 16px",
                            minHeight: 185,
                          }}
                        >
                          <div
                            style={{
                              font: "var(--label)",
                              letterSpacing: "1px",
                              textTransform: "uppercase",
                              marginBottom: 13,
                              color: "rgba(212,220,255,.7)",
                            }}
                          >
                            {block.outputState.label}
                          </div>
                          <ul
                            style={{
                              listStyle: "none",
                              margin: 0,
                              padding: 0,
                              font: "var(--body-md)",
                              lineHeight: 1.9,
                            }}
                          >
                            {block.outputState.items.map((item, j) => (
                              <li key={j}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 20,
                          lineHeight: 1.65,
                          textAlign: "center",
                          paddingTop: 26,
                          marginTop: 27,
                          borderTop: "1px solid rgba(255,255,255,.18)",
                        }}
                      >
                        <span>{block.equation.input}</span>
                        <br />
                        <span style={{ color: "rgba(212,220,255,.7)" }}>
                          {block.equation.output}
                        </span>
                      </div>
                    </div>
                    <figcaption
                      style={{
                        font: "var(--body-sm)",
                        lineHeight: 1.6,
                        color: "rgba(212,220,255,.7)",
                        padding: "16px 25px",
                        borderTop: "1px solid rgba(255,255,255,.18)",
                      }}
                    >
                      {block.caption}
                    </figcaption>
                  </figure>
                );
              case "figure-strategy":
                return (
                  <figure
                    key={i}
                    style={{
                      margin: "var(--space-8) 0 var(--space-6)",
                      background: "var(--surface-accent-soft)",
                      border: "1px solid var(--border-hairline)",
                      borderRadius: "var(--radius-lg)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        padding: "19px 25px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                        font: "var(--label)",
                        letterSpacing: "var(--label-track)",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        borderBottom: "1px solid var(--border-hairline)",
                      }}
                    >
                      <span style={{ color: "var(--blue-600)" }}>{block.label}</span>
                      <span>{block.sublabel}</span>
                    </div>
                    <ol className="fig-strategy-flow">
                      {block.steps.map((step, j) => (
                        <li key={j}>
                          <strong
                            style={{
                              font: "var(--heading-3)",
                              color: "var(--text-strong)",
                              display: "block",
                              lineHeight: 1.4,
                            }}
                          >
                            {step.title}
                          </strong>
                          <small
                            style={{
                              display: "block",
                              font: "var(--body-sm)",
                              color: "var(--text-muted)",
                              marginTop: 6,
                            }}
                          >
                            {step.description}
                          </small>
                        </li>
                      ))}
                    </ol>
                    <figcaption
                      style={{
                        font: "var(--body-sm)",
                        lineHeight: 1.6,
                        color: "var(--text-muted)",
                        padding: "16px 25px",
                        borderTop: "1px solid var(--border-hairline)",
                        background: "var(--surface-card)",
                      }}
                    >
                      {block.caption}
                    </figcaption>
                  </figure>
                );
              case "figure-workflow":
                return (
                  <figure
                    key={i}
                    style={{
                      margin: "var(--space-6) 0 var(--space-6)",
                      background: "var(--surface-card)",
                      border: "1px solid var(--border-hairline)",
                      borderRadius: "var(--radius-lg)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        padding: "19px 25px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        font: "var(--label)",
                        letterSpacing: "var(--label-track)",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        borderBottom: "1px solid var(--border-hairline)",
                        background: "var(--surface-accent-soft)",
                      }}
                    >
                      <span style={{ color: "var(--blue-600)" }}>{block.label}</span>
                    </div>
                    <div className="fig-workflow-panels">
                      {[block.before, block.after].map((panel, pi) => (
                        <div
                          key={pi}
                          className={pi === 1 ? "fig-workflow-panel-after" : ""}
                          style={{
                            padding: 24,
                            ...(pi === 1
                              ? {
                                  borderLeft: "1px solid var(--border-hairline)",
                                  background: "var(--surface-accent-soft)",
                                }
                              : {}),
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              marginBottom: 20,
                              font: "var(--heading-3)",
                              color: "var(--text-strong)",
                            }}
                          >
                            <span
                              style={{
                                font: "var(--label)",
                                letterSpacing: "1px",
                                textTransform: "uppercase",
                                padding: "3px 7px",
                                lineHeight: 1.5,
                                background:
                                  pi === 0
                                    ? "var(--border-subtle)"
                                    : "var(--blue-600)",
                                color:
                                  pi === 0
                                    ? "var(--text-muted)"
                                    : "var(--paper-050)",
                                fontSize: 11,
                              }}
                            >
                              {panel.tag}
                            </span>
                            {panel.title}
                          </div>
                          <ol
                            className="fig-workflow-steps"
                            style={{
                              listStyle: "none",
                              margin: 0,
                              padding: 0,
                            }}
                          >
                            {panel.steps.map((step, si) => (
                              <li
                                key={si}
                                style={{
                                  position: "relative",
                                  border: `1px solid ${step.highlight ? "var(--blue-300)" : "var(--border-hairline)"}`,
                                  padding: "13px 14px",
                                  background: "var(--surface-card)",
                                  marginBottom: si < panel.steps.length - 1 ? 24 : 0,
                                }}
                              >
                                {step.owner && (
                                  <span
                                    style={{
                                      font: "var(--label)",
                                      fontSize: 10,
                                      letterSpacing: ".9px",
                                      color: "var(--blue-600)",
                                      textTransform: "uppercase",
                                      display: "block",
                                      marginBottom: 4,
                                    }}
                                  >
                                    {step.owner}
                                  </span>
                                )}
                                <strong
                                  style={{
                                    font: "var(--body-md)",
                                    fontWeight: 600,
                                    color: "var(--text-strong)",
                                    display: "block",
                                    lineHeight: 1.4,
                                  }}
                                >
                                  {step.title}
                                </strong>
                                <small
                                  style={{
                                    display: "block",
                                    font: "var(--body-sm)",
                                    color: "var(--text-muted)",
                                    marginTop: 5,
                                  }}
                                >
                                  {step.description}
                                </small>
                              </li>
                            ))}
                          </ol>
                          <div
                            style={{
                              font: "var(--body-sm)",
                              lineHeight: 1.5,
                              marginTop: 20,
                              color: "var(--text-muted)",
                            }}
                          >
                            {panel.summary}
                          </div>
                        </div>
                      ))}
                    </div>
                    <figcaption
                      style={{
                        font: "var(--body-sm)",
                        lineHeight: 1.6,
                        color: "var(--text-muted)",
                        padding: "16px 25px",
                        borderTop: "1px solid var(--border-hairline)",
                      }}
                    >
                      {block.caption}
                    </figcaption>
                  </figure>
                );
              case "figure-journey":
                return (
                  <figure
                    key={i}
                    style={{
                      margin: "var(--space-8) 0 var(--space-6)",
                      background: "var(--surface-accent-soft)",
                      border: "1px solid var(--border-hairline)",
                      borderRadius: "var(--radius-lg)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        padding: "19px 25px",
                        font: "var(--label)",
                        letterSpacing: "var(--label-track)",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        borderBottom: "1px solid var(--border-hairline)",
                      }}
                    >
                      <span style={{ color: "var(--blue-600)" }}>{block.label}</span>
                    </div>
                    <ol className="fig-journey-steps">
                      {block.steps.map((step, j) => (
                        <li
                          key={j}
                          style={{
                            borderTop: `2px solid ${j === block.steps.length - 1 ? "var(--blue-500)" : "var(--border-subtle)"}`,
                            paddingTop: 15,
                          }}
                        >
                          <span
                            style={{
                              font: "var(--label)",
                              letterSpacing: "var(--label-track)",
                              textTransform: "uppercase",
                              color: "var(--blue-600)",
                              marginBottom: 9,
                              display: "block",
                            }}
                          >
                            {step.number}
                          </span>
                          <strong
                            style={{
                              font: "var(--heading-3)",
                              color: "var(--text-strong)",
                              display: "block",
                              lineHeight: 1.4,
                            }}
                          >
                            {step.title}
                          </strong>
                          <small
                            style={{
                              display: "block",
                              font: "var(--body-sm)",
                              color: "var(--text-muted)",
                              marginTop: 8,
                            }}
                          >
                            {step.description}
                          </small>
                        </li>
                      ))}
                    </ol>
                    {block.checkpoint && (
                      <div
                        style={{
                          margin: "0 26px 26px",
                          padding: "15px 18px",
                          borderLeft: "3px solid var(--blue-500)",
                          background: "var(--blue-050)",
                          font: "var(--body-sm)",
                          lineHeight: 1.6,
                          color: "var(--text-body)",
                        }}
                      >
                        <strong style={{ color: "var(--blue-600)" }}>
                          {block.checkpoint.split(":")[0]}:
                        </strong>
                        {block.checkpoint.substring(block.checkpoint.indexOf(":") + 1)}
                      </div>
                    )}
                  </figure>
                );
              case "figure-metrics":
                return (
                  <figure
                    key={i}
                    style={{
                      margin: "var(--space-8) 0 var(--space-6)",
                      background: "var(--surface-accent-soft)",
                      border: "1px solid var(--border-hairline)",
                      borderRadius: "var(--radius-lg)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        padding: "19px 25px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                        font: "var(--label)",
                        letterSpacing: "var(--label-track)",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        borderBottom: "1px solid var(--border-hairline)",
                      }}
                    >
                      <span style={{ color: "var(--blue-600)" }}>{block.label}</span>
                      {block.sublabel && <span>{block.sublabel}</span>}
                    </div>
                    <table className="fig-metrics-table">
                      <thead>
                        <tr>
                          {block.headers.map((h, j) => (
                            <th key={j}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.rows.map((row, j) => (
                          <tr key={j}>
                            {row.map((cell, k) => (
                              <td key={k}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {block.valueRule && (
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 26,
                          lineHeight: 1.45,
                          padding: "24px 26px",
                          borderTop: "1px solid var(--border-hairline)",
                          color: "var(--blue-600)",
                          background: "var(--surface-card)",
                        }}
                      >
                        {block.valueRule}
                      </div>
                    )}
                    <figcaption
                      style={{
                        font: "var(--body-sm)",
                        lineHeight: 1.6,
                        color: "var(--text-muted)",
                        padding: "16px 25px",
                        borderTop: "1px solid var(--border-hairline)",
                        background: "var(--surface-card)",
                      }}
                    >
                      {block.caption}
                    </figcaption>
                  </figure>
                );
              case "figure-ownership":
                return (
                  <figure
                    key={i}
                    style={{
                      margin: "var(--space-8) 0 var(--space-6)",
                      background: "var(--surface-accent-soft)",
                      border: "1px solid var(--border-hairline)",
                      borderRadius: "var(--radius-lg)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        padding: "19px 25px",
                        font: "var(--label)",
                        letterSpacing: "var(--label-track)",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        borderBottom: "1px solid var(--border-hairline)",
                      }}
                    >
                      <span style={{ color: "var(--blue-600)" }}>{block.label}</span>
                    </div>
                    <div className="fig-ownership-grid">
                      {block.items.map((item, j) => (
                        <div
                          key={j}
                          style={{
                            borderTop: "1px solid var(--border-subtle)",
                            paddingTop: 14,
                          }}
                        >
                          <h3
                            style={{
                              font: "var(--heading-3)",
                              color: "var(--text-strong)",
                              margin: 0,
                            }}
                          >
                            {item.title}
                          </h3>
                          <p
                            style={{
                              font: "var(--body-sm)",
                              color: "var(--text-muted)",
                              lineHeight: 1.6,
                              margin: "6px 0 0",
                            }}
                          >
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                    <figcaption
                      style={{
                        font: "var(--body-sm)",
                        lineHeight: 1.6,
                        color: "var(--text-muted)",
                        padding: "16px 25px",
                        borderTop: "1px solid var(--border-hairline)",
                        background: "var(--surface-card)",
                      }}
                    >
                      {block.caption}
                    </figcaption>
                  </figure>
                );
              case "closing-block":
                return (
                  <section
                    key={i}
                    style={{
                      marginTop: "var(--space-12)",
                      paddingTop: "var(--space-10)",
                      borderTop: "2px solid var(--text-strong)",
                    }}
                  >
                    <p
                      style={{
                        font: "var(--eyebrow)",
                        letterSpacing: "var(--eyebrow-track)",
                        textTransform: "uppercase",
                        color: "var(--blue-600)",
                        display: "flex",
                        alignItems: "center",
                        gap: 15,
                        marginBottom: "var(--space-5)",
                      }}
                    >
                      <span
                        style={{
                          width: 28,
                          height: 2,
                          background: "var(--blue-500)",
                          display: "inline-block",
                        }}
                      />
                      {block.eyebrow}
                    </p>
                    <blockquote
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(24px, 3vw, 32px)",
                        letterSpacing: "-0.6px",
                        lineHeight: 1.35,
                        margin: "0 0 var(--space-6)",
                        maxWidth: 740,
                        color: "var(--text-strong)",
                      }}
                    >
                      {block.quote}
                    </blockquote>
                    <p
                      style={{
                        fontSize: 19,
                        fontWeight: 650,
                        color: "var(--text-strong)",
                        marginBottom: "var(--space-5)",
                      }}
                    >
                      {block.outcomes}
                    </p>
                    <p
                      style={{
                        font: "var(--body-lg)",
                        color: "var(--text-body)",
                        marginBottom: 0,
                      }}
                    >
                      {block.prose}
                    </p>
                  </section>
                );
              case "equation":
                return (
                  <div
                    key={i}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(18px, 2vw, 22px)",
                      lineHeight: 1.5,
                      textAlign: "center",
                      padding: "var(--space-5) var(--space-6)",
                      margin: "var(--space-4) 0",
                      background: "var(--surface-accent-soft)",
                      border: "1px solid var(--border-hairline)",
                      borderRadius: "var(--radius-md)",
                      color: "var(--blue-600)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {block.text}
                  </div>
                );
              case "references":
                return (
                  <section
                    key={i}
                    style={{
                      marginTop: "var(--space-10)",
                      paddingTop: "var(--space-8)",
                      borderTop: "1px solid var(--border-hairline)",
                    }}
                  >
                    <h3
                      style={{
                        font: "var(--label)",
                        letterSpacing: "var(--label-track)",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        marginBottom: "var(--space-4)",
                      }}
                    >
                      References
                    </h3>
                    <ol
                      style={{
                        margin: 0,
                        paddingLeft: "var(--space-5)",
                        display: "grid",
                        gap: "var(--space-2)",
                      }}
                    >
                      {block.items.map((ref, j) => (
                        <li
                          key={j}
                          style={{
                            font: "var(--body-sm)",
                            color: "var(--text-muted)",
                            lineHeight: 1.6,
                          }}
                        >
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "var(--blue-600)",
                              borderBottom: "1px solid var(--border-subtle)",
                            }}
                          >
                            {ref.text}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </section>
                );
              case "figure-comparison":
                return (
                  <figure
                    key={i}
                    style={{
                      margin: "var(--space-6) 0",
                      background: "var(--surface-card)",
                      border: "1px solid var(--border-hairline)",
                      borderRadius: "var(--radius-lg)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        padding: "19px 25px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                        font: "var(--label)",
                        letterSpacing: "var(--label-track)",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        borderBottom: "1px solid var(--border-hairline)",
                        background: "var(--surface-accent-soft)",
                      }}
                    >
                      <span style={{ color: "var(--blue-600)" }}>{block.label}</span>
                      <span>{block.sublabel}</span>
                    </div>
                    <div className="fig-comparison-grid">
                      {block.cases.map((c, ci) => (
                        <div
                          key={ci}
                          style={{
                            padding: "26px 24px",
                            borderLeft:
                              ci > 0
                                ? "1px solid var(--border-hairline)"
                                : undefined,
                          }}
                        >
                          <h3
                            style={{
                              font: "var(--heading-3)",
                              color: "var(--text-strong)",
                              margin: "0 0 var(--space-4)",
                            }}
                          >
                            {c.title}
                          </h3>
                          <div
                            style={{
                              display: "flex",
                              gap: 24,
                              marginBottom: "var(--space-4)",
                            }}
                          >
                            {c.values.map((v, vi) => (
                              <div key={vi}>
                                <div
                                  style={{
                                    fontFamily: "var(--font-display)",
                                    fontSize: "clamp(28px, 3vw, 36px)",
                                    lineHeight: 1.1,
                                    color: "var(--text-strong)",
                                    letterSpacing: "-0.02em",
                                  }}
                                >
                                  {v.amount}
                                </div>
                                <div
                                  style={{
                                    font: "var(--body-sm)",
                                    color: "var(--text-muted)",
                                    marginTop: 4,
                                  }}
                                >
                                  {v.label}
                                </div>
                              </div>
                            ))}
                          </div>
                          <p
                            style={{
                              font: "var(--body-sm)",
                              color: "var(--text-muted)",
                              lineHeight: 1.6,
                              margin: 0,
                            }}
                          >
                            {c.description}
                          </p>
                        </div>
                      ))}
                    </div>
                    <figcaption
                      style={{
                        font: "var(--body-sm)",
                        lineHeight: 1.6,
                        color: "var(--text-muted)",
                        padding: "16px 25px",
                        borderTop: "1px solid var(--border-hairline)",
                        background: "var(--surface-card)",
                      }}
                    >
                      {block.caption}
                    </figcaption>
                  </figure>
                );
              case "figure-consumption":
                return (
                  <figure
                    key={i}
                    style={{
                      margin: "var(--space-8) 0 var(--space-6)",
                      background: "var(--surface-accent-soft)",
                      border: "1px solid var(--border-hairline)",
                      borderRadius: "var(--radius-lg)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        padding: "19px 25px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                        font: "var(--label)",
                        letterSpacing: "var(--label-track)",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        borderBottom: "1px solid var(--border-hairline)",
                      }}
                    >
                      <span style={{ color: "var(--blue-600)" }}>{block.label}</span>
                      <span>{block.sublabel}</span>
                    </div>
                    <div className="fig-consumption-stages">
                      {block.stages.map((s, si) => (
                        <div
                          key={si}
                          style={{
                            borderTop: "2px solid var(--border-subtle)",
                            paddingTop: 15,
                          }}
                        >
                          <span
                            style={{
                              font: "var(--label)",
                              letterSpacing: "var(--label-track)",
                              textTransform: "uppercase",
                              color: "var(--blue-600)",
                              display: "block",
                              marginBottom: 8,
                              fontSize: 10,
                            }}
                          >
                            {s.index}
                          </span>
                          <strong
                            style={{
                              font: "var(--heading-3)",
                              color: "var(--text-strong)",
                              display: "block",
                              lineHeight: 1.4,
                            }}
                          >
                            {s.title}
                          </strong>
                          <div
                            style={{
                              fontFamily: "var(--font-display)",
                              fontSize: "clamp(22px, 2.5vw, 28px)",
                              lineHeight: 1.2,
                              color: "var(--text-strong)",
                              letterSpacing: "-0.02em",
                              marginTop: 10,
                            }}
                          >
                            {s.value}
                          </div>
                          <div
                            style={{
                              font: "var(--body-sm)",
                              color: "var(--text-muted)",
                              marginTop: 2,
                            }}
                          >
                            {s.unit}
                          </div>
                          <p
                            style={{
                              font: "var(--body-sm)",
                              color: "var(--text-muted)",
                              lineHeight: 1.5,
                              margin: "8px 0 0",
                            }}
                          >
                            {s.description}
                          </p>
                        </div>
                      ))}
                    </div>
                    {block.scenarios.map((sc, sci) => (
                      <div
                        key={sci}
                        style={{
                          padding: "12px 26px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderTop: "1px solid var(--border-hairline)",
                          font: "var(--body-sm)",
                        }}
                      >
                        <span style={{ color: "var(--text-muted)" }}>{sc.label}</span>
                        <strong style={{ color: "var(--text-strong)" }}>{sc.total}</strong>
                      </div>
                    ))}
                    <table className="fig-metrics-table">
                      <thead>
                        <tr>
                          {block.tableHeaders.map((h, j) => (
                            <th key={j}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.tableRows.map((row, j) => (
                          <tr
                            key={j}
                            style={
                              j === block.tableRows.length - 1
                                ? { background: "var(--surface-accent-soft)" }
                                : undefined
                            }
                          >
                            {row.map((cell, k) => (
                              <td
                                key={k}
                                style={
                                  j === block.tableRows.length - 1
                                    ? { fontWeight: 600, color: "var(--text-strong)" }
                                    : undefined
                                }
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <figcaption
                      style={{
                        font: "var(--body-sm)",
                        lineHeight: 1.6,
                        color: "var(--text-muted)",
                        padding: "16px 25px",
                        borderTop: "1px solid var(--border-hairline)",
                        background: "var(--surface-card)",
                      }}
                    >
                      {block.caption}
                    </figcaption>
                  </figure>
                );
              case "figure-paths":
                return (
                  <figure
                    key={i}
                    style={{
                      margin: "var(--space-8) 0 var(--space-6)",
                      background: "var(--surface-card)",
                      border: "1px solid var(--border-hairline)",
                      borderRadius: "var(--radius-lg)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        padding: "19px 25px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                        font: "var(--label)",
                        letterSpacing: "var(--label-track)",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        borderBottom: "1px solid var(--border-hairline)",
                        background: "var(--surface-accent-soft)",
                      }}
                    >
                      <span style={{ color: "var(--blue-600)" }}>{block.label}</span>
                      <span>{block.sublabel}</span>
                    </div>
                    <div className="fig-paths-grid">
                      {block.paths.map((path, pi) => (
                        <div
                          key={pi}
                          style={{
                            padding: 24,
                            borderLeft:
                              pi > 0
                                ? "1px solid var(--border-hairline)"
                                : undefined,
                          }}
                        >
                          {path.steps.map((step, si) => (
                            <div
                              key={si}
                              style={{
                                border: `1px solid ${step.isResult ? "var(--blue-300)" : "var(--border-hairline)"}`,
                                background: step.isResult
                                  ? "var(--surface-accent-soft)"
                                  : "var(--surface-card)",
                                padding: "14px 16px",
                                marginBottom:
                                  si < path.steps.length - 1 ? 12 : 0,
                                position: "relative",
                              }}
                            >
                              {step.index && (
                                <span
                                  style={{
                                    font: "var(--label)",
                                    fontSize: 10,
                                    letterSpacing: ".9px",
                                    color: "var(--blue-600)",
                                    textTransform: "uppercase",
                                    display: "block",
                                    marginBottom: 4,
                                  }}
                                >
                                  {step.index}
                                </span>
                              )}
                              <strong
                                style={{
                                  font: "var(--body-md)",
                                  fontWeight: 600,
                                  color: "var(--text-strong)",
                                  display: "block",
                                  lineHeight: 1.4,
                                }}
                              >
                                {step.title}
                              </strong>
                              <small
                                style={{
                                  display: "block",
                                  font: "var(--body-sm)",
                                  color: "var(--text-muted)",
                                  marginTop: 5,
                                }}
                              >
                                {step.description}
                              </small>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                    <div className="fig-paths-lenses">
                      {block.lenses.map((lens, li) => (
                        <div
                          key={li}
                          style={{
                            borderTop: "1px solid var(--border-subtle)",
                            paddingTop: 14,
                          }}
                        >
                          <strong
                            style={{
                              font: "var(--heading-3)",
                              color: "var(--text-strong)",
                              display: "block",
                            }}
                          >
                            {lens.title}
                          </strong>
                          <p
                            style={{
                              font: "var(--body-sm)",
                              color: "var(--text-muted)",
                              lineHeight: 1.6,
                              margin: "6px 0 0",
                            }}
                          >
                            {lens.description}
                          </p>
                        </div>
                      ))}
                    </div>
                    <figcaption
                      style={{
                        font: "var(--body-sm)",
                        lineHeight: 1.6,
                        color: "var(--text-muted)",
                        padding: "16px 25px",
                        borderTop: "1px solid var(--border-hairline)",
                        background: "var(--surface-card)",
                      }}
                    >
                      {block.caption}
                    </figcaption>
                  </figure>
                );
              case "figure-deployment":
                return (
                  <figure
                    key={i}
                    style={{
                      margin: "var(--space-8) 0 var(--space-6)",
                      background: "var(--blue-850)",
                      border: "1px solid var(--blue-800)",
                      borderRadius: "var(--radius-lg)",
                      overflow: "hidden",
                      color: "var(--paper-050)",
                    }}
                  >
                    <div
                      style={{
                        padding: "19px 25px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                        font: "var(--label)",
                        letterSpacing: "var(--label-track)",
                        textTransform: "uppercase",
                        color: "rgba(212,220,255,.7)",
                        borderBottom: "1px solid rgba(255,255,255,.18)",
                      }}
                    >
                      <span style={{ color: "var(--paper-050)" }}>{block.label}</span>
                      <span>{block.sublabel}</span>
                    </div>
                    <ol
                      style={{
                        listStyle: "none",
                        margin: 0,
                        padding: "26px 26px 20px",
                        display: "grid",
                        gap: 16,
                      }}
                    >
                      {block.steps.map((step, si) => (
                        <li
                          key={si}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "44px 1fr",
                            gap: "0 14px",
                            padding: "16px 18px",
                            border: `1px solid ${step.isBoundary ? "var(--blue-400)" : "rgba(255,255,255,.18)"}`,
                            background: step.isBoundary
                              ? "rgba(255,255,255,.06)"
                              : "transparent",
                          }}
                        >
                          <span
                            style={{
                              font: "var(--label)",
                              letterSpacing: "var(--label-track)",
                              color: "var(--blue-400)",
                              gridRow: "1 / 3",
                              paddingTop: 2,
                            }}
                          >
                            {step.number}
                          </span>
                          <strong
                            style={{
                              font: "var(--heading-3)",
                              color: "var(--paper-050)",
                              lineHeight: 1.4,
                            }}
                          >
                            {step.title}
                          </strong>
                          <small
                            style={{
                              font: "var(--body-sm)",
                              color: "rgba(212,220,255,.7)",
                              lineHeight: 1.6,
                              marginTop: 4,
                            }}
                          >
                            {step.description}
                          </small>
                        </li>
                      ))}
                    </ol>
                    <div
                      style={{
                        margin: "0 26px 26px",
                        padding: "15px 18px",
                        borderLeft: "3px solid var(--blue-400)",
                        background: "rgba(255,255,255,.04)",
                        font: "var(--body-sm)",
                        lineHeight: 1.6,
                        color: "rgba(212,220,255,.7)",
                      }}
                    >
                      {block.feedback}
                    </div>
                    <figcaption
                      style={{
                        font: "var(--body-sm)",
                        lineHeight: 1.6,
                        color: "rgba(212,220,255,.7)",
                        padding: "16px 25px",
                        borderTop: "1px solid rgba(255,255,255,.18)",
                      }}
                    >
                      {block.caption}
                    </figcaption>
                  </figure>
                );
              case "invitation":
                return (
                  <section
                    key={i}
                    style={{
                      marginTop: "var(--space-10)",
                      maxWidth: 700,
                    }}
                  >
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(28px, 3vw, 34px)",
                        fontWeight: 400,
                        lineHeight: 1.2,
                        letterSpacing: "-0.5px",
                        color: "var(--text-strong)",
                        marginBottom: "var(--space-4)",
                      }}
                    >
                      {block.title}
                    </h2>
                    <p
                      style={{
                        font: "var(--body-lg)",
                        color: "var(--text-muted)",
                        margin: 0,
                      }}
                    >
                      {block.description}
                    </p>
                  </section>
                );
              default:
                return null;
            }
          })}
        </article>

        {/* Table of Contents sidebar */}
        <aside
          className="blog-toc-sidebar"
          style={{
            position: "sticky",
            top: 90,
            paddingTop: "var(--space-2)",
          }}
        >
          <div
            style={{
              font: "var(--eyebrow)",
              letterSpacing: "var(--eyebrow-track)",
              textTransform: "uppercase",
              color: "var(--text-faint)",
              marginBottom: "var(--space-4)",
            }}
          >
            On this page
          </div>
          <nav style={{ display: "grid", gap: 2 }}>
            {headings.map((h) => (
              <a
                key={h.id}
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(h.id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  font: "var(--body-sm)",
                  color:
                    activeHeading === h.id
                      ? "var(--blue-600)"
                      : "var(--text-muted)",
                  fontWeight: activeHeading === h.id ? 500 : 400,
                  padding: "6px 0 6px 12px",
                  borderLeft: `2px solid ${activeHeading === h.id ? "var(--blue-500)" : "var(--border-hairline)"}`,
                  transition: "color var(--dur-fast) var(--ease-out)",
                  borderBottom: 0,
                  display: "block",
                }}
              >
                {h.text}
              </a>
            ))}
          </nav>
        </aside>
      </div>

      {/* Author bio card */}
      <section
        style={{
          maxWidth: 780,
          margin: "0 auto",
          padding: "0 var(--gutter) var(--space-12)",
        }}
      >
        <div
          style={{
            background: "var(--surface-card)",
            border: "1px solid var(--border-hairline)",
            borderRadius: "var(--radius-lg)",
            padding: "var(--space-8)",
            display: "flex",
            gap: "var(--space-6)",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {post.author.avatarImage ? (
            <img
              src={post.author.avatarImage}
              alt={post.author.name}
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
          ) : (
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "var(--blue-850)",
                color: "var(--paper-050)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                font: "var(--heading-2)",
                flexShrink: 0,
              }}
            >
              {post.author.avatar}
            </div>
          )}
          <div style={{ flex: 1, minWidth: 200 }}>
            <div
              style={{
                font: "var(--heading-2)",
                color: "var(--text-strong)",
              }}
            >
              {post.author.name}
            </div>
            <div
              style={{
                font: "var(--body-sm)",
                color: "var(--text-muted)",
                marginTop: 2,
              }}
            >
              {post.author.role}
            </div>
            <p
              style={{
                font: "var(--body-md)",
                color: "var(--text-body)",
                margin: "var(--space-3) 0 0",
              }}
            >
              Building AI systems that create operating leverage for
              enterprises. Focused on forward-deployed engineering and
              measurable outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* CTA block */}
      <section
        style={{
          maxWidth: 780,
          margin: "0 auto",
          padding: "0 var(--gutter) var(--space-16)",
        }}
      >
        <div
          className="brand-field--gradient on-navy"
          style={{
            borderRadius: "var(--radius-lg)",
            padding: "var(--space-12) var(--space-10)",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              font: "var(--display-3)",
              letterSpacing: "var(--display-track)",
              color: "var(--paper-000)",
              margin: 0,
            }}
          >
            Want results like this for your organisation?
          </h3>
          <p
            style={{
              font: "var(--body-md)",
              color: "rgba(249,246,243,.74)",
              margin: "var(--space-4) auto 0",
              maxWidth: "48ch",
            }}
          >
            We build custom AI systems around how your team already operates —
            then hand them over.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              background: "var(--paper-050)",
              color: "var(--blue-950)",
              font: "var(--label)",
              letterSpacing: "var(--label-track)",
              padding: "14px 24px",
              borderRadius: 999,
              marginTop: "var(--space-6)",
              borderBottom: 0,
            }}
          >
            Get in touch
            <img
              src="/assets/icon-arrow-navy.png"
              alt=""
              style={{ width: 13, height: 12, display: "block" }}
            />
          </Link>
        </div>
      </section>

      {/* Previous / Next navigation */}
      {(prev || next) && (
        <section
          style={{
            maxWidth: 780,
            margin: "0 auto",
            padding: "0 var(--gutter) var(--space-12)",
          }}
        >
          <div
            className="blog-adj-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--space-4)",
            }}
          >
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                style={{
                  display: "block",
                  padding: "var(--space-5) var(--space-6)",
                  border: "1px solid var(--border-hairline)",
                  borderRadius: "var(--radius-md)",
                  borderBottom: "1px solid var(--border-hairline)",
                }}
              >
                <span
                  style={{
                    font: "var(--body-sm)",
                    color: "var(--text-faint)",
                  }}
                >
                  Previous
                </span>
                <span
                  style={{
                    display: "block",
                    font: "var(--heading-3)",
                    color: "var(--text-strong)",
                    marginTop: 4,
                  }}
                >
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                style={{
                  display: "block",
                  padding: "var(--space-5) var(--space-6)",
                  border: "1px solid var(--border-hairline)",
                  borderRadius: "var(--radius-md)",
                  textAlign: "right",
                  borderBottom: "1px solid var(--border-hairline)",
                }}
              >
                <span
                  style={{
                    font: "var(--body-sm)",
                    color: "var(--text-faint)",
                  }}
                >
                  Next
                </span>
                <span
                  style={{
                    display: "block",
                    font: "var(--heading-3)",
                    color: "var(--text-strong)",
                    marginTop: 4,
                  }}
                >
                  {next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </section>
      )}

      {/* Related posts */}
      {related.length > 0 && (
        <section
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 var(--gutter) var(--space-16)",
          }}
        >
          <div
            style={{
              borderTop: "1px solid var(--border-hairline)",
              paddingTop: "var(--space-12)",
            }}
          >
            <h3
              style={{
                font: "var(--heading-1)",
                color: "var(--text-strong)",
                marginBottom: "var(--space-8)",
              }}
            >
              Related posts
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "32px 24px",
              }}
            >
              {related.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  style={{
                    display: "block",
                    borderBottom: 0,
                  }}
                >
                  <div
                    style={{
                      aspectRatio: "16 / 10",
                      background: rp.gradient,
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
                      {rp.date}
                    </span>
                    <span
                      style={{
                        font: "var(--body-sm)",
                        color: "var(--text-faint)",
                      }}
                    >
                      &middot;
                    </span>
                    <span
                      style={{
                        font: "var(--body-sm)",
                        color: "var(--text-muted)",
                      }}
                    >
                      {rp.readingTime} min read
                    </span>
                  </div>
                  <h4
                    style={{
                      font: "var(--heading-2)",
                      color: "var(--text-strong)",
                      marginTop: "var(--space-2)",
                    }}
                  >
                    {rp.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}
