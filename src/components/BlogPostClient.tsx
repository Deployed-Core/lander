"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import AnnouncementBar from "@/components/AnnouncementBar";
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
          .blog-hero-meta { flex-direction: column !important; gap: 12px !important; }
          .blog-adj-grid { grid-template-columns: 1fr !important; }
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

      <AnnouncementBar />
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
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "url(/assets/grain-512.png) repeat",
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
            <div style={{ font: "var(--label)", letterSpacing: "var(--label-track)", color: "rgba(249,246,243,.44)", marginBottom: 4 }}>Core</div>
            <Link href="/strategy" style={{ font: "var(--body-sm)", color: "rgba(249,246,243,.78)" }}>Strategy</Link>
            <Link href="/deployment" style={{ font: "var(--body-sm)", color: "rgba(249,246,243,.78)" }}>Deployment</Link>
            <Link href="/the-deployed-fit" style={{ font: "var(--body-sm)", color: "rgba(249,246,243,.78)" }}>The Deployed fit</Link>
          </div>

          <div style={{ display: "grid", gap: 11, alignContent: "start" }}>
            <div style={{ font: "var(--label)", letterSpacing: "var(--label-track)", color: "rgba(249,246,243,.44)", marginBottom: 4 }}>Company</div>
            <Link href="/about" style={{ font: "var(--body-sm)", color: "rgba(249,246,243,.78)" }}>About</Link>
            <a href="#" style={{ font: "var(--body-sm)", color: "rgba(249,246,243,.78)" }}>Careers</a>
            <Link href="/contact" style={{ font: "var(--body-sm)", color: "rgba(249,246,243,.78)" }}>Contact</Link>
          </div>

          <div style={{ display: "grid", gap: 11, alignContent: "start" }}>
            <div style={{ font: "var(--label)", letterSpacing: "var(--label-track)", color: "rgba(249,246,243,.44)", marginBottom: 4 }}>Resources</div>
            <Link href="/blog" style={{ font: "var(--body-sm)", color: "rgba(249,246,243,.78)" }}>Blog</Link>
            <a href="#" style={{ font: "var(--body-sm)", color: "rgba(249,246,243,.78)" }}>Industries</a>
            <a href="#" style={{ font: "var(--body-sm)", color: "rgba(249,246,243,.78)" }}>Security</a>
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
          <span style={{ font: "var(--mono-md)", color: "rgba(249,246,243,.38)" }}>deployed.md</span>
          <span style={{ font: "var(--mono-md)", color: "rgba(249,246,243,.38)" }}>{"©"} 2026 Deployed</span>
        </div>
      </footer>
    </div>
  );
}
