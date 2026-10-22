"use client";

import { useRef, useCallback, useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { getReportBySlug, type ReportContentBlock } from "@/data/reports";

export default function ReportClient({ slug }: { slug: string }) {
  const report = getReportBySlug(slug);
  const articleRef = useRef<HTMLElement>(null);
  if (!report) return null;

  const reportUrl = `https://www.deployed.md/report/${report.slug}`;

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      await navigator.share({
        title: report.title,
        text: report.description,
        url: reportUrl,
      });
    } else {
      await navigator.clipboard.writeText(reportUrl);
    }
  }, [report, reportUrl]);

  const headings = report.content.filter(
    (b) => b.type === "heading"
  ) as { type: "heading"; text: string; id: string }[];

  return (
    <div style={{ background: "var(--surface-page)", minHeight: "100vh" }}>
      <style>{reportStyles}</style>
      <SiteNav tone="light" />

      {/* Hero */}
      <header className="rpt-hero">
        <div className="rpt-hero__inner">
          <div className="rpt-hero__text">
            <span className="rpt-hero__tag">{report.tag}</span>
            <h1 className="rpt-hero__title">{report.title}</h1>
            <p className="rpt-hero__subtitle">{report.subtitle}</p>
            <div className="rpt-hero__meta-row">
              <span>Global research + India context</span>
              <span>Updated {report.date}</span>
              <span>Evidence-led report · {report.readingTime} min read</span>
            </div>
            <div className="rpt-hero__actions">
              <button
                type="button"
                className="rpt-action-btn"
                onClick={handleShare}
                aria-label="Share"
                title="Share"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              </button>
              <button
                type="button"
                className="rpt-action-btn"
                onClick={handlePrint}
                aria-label="Print"
                title="Print"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
              </button>
              {report.pdfUrl && (
                <a
                  href={report.pdfUrl}
                  download
                  className="rpt-action-btn"
                  aria-label="Download PDF"
                  title="Download PDF"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </a>
              )}
            </div>
          </div>
          {report.coverImage && (
            <div className="rpt-hero__image">
              <img src={report.coverImage} alt={report.title} />
            </div>
          )}
        </div>
      </header>

      {/* Section nav */}
      <nav className="rpt-section-nav" aria-label="Report sections">
        {headings.map((h) => (
          <a key={h.id} href={`#${h.id}`} className="rpt-section-nav__link">
            {h.text}
          </a>
        ))}
      </nav>

      {/* Body */}
      <div className="rpt-wrap">
        <article ref={articleRef} className="rpt-content">
          {report.content.map((block, i) => (
            <ReportBlock key={i} block={block} />
          ))}
        </article>
      </div>

      <footer className="rpt-footer">
        <div className="rpt-wrap">
          {report.title} · {report.date}
        </div>
      </footer>

      <SiteFooter />
    </div>
  );
}

function JourneyStage({ block }: { block: Extract<ReportContentBlock, { type: "journey-stage" }> }) {
  const [open, setOpen] = useState(block.index === "01");

  const roleColor = (role: string) => {
    switch (role) {
      case "patient": return "var(--rpt-patient)";
      case "clinical": return "var(--rpt-clinical)";
      case "operations": return "var(--rpt-operations)";
      case "payer": return "var(--rpt-payer)";
      default: return "var(--blue-600)";
    }
  };

  const roleLabel = (role: string) => {
    switch (role) {
      case "patient": return "Patient";
      case "clinical": return "Provider — clinical";
      case "operations": return "Provider — operations";
      case "payer": return "Payer";
      default: return role;
    }
  };

  return (
    <div className={`rpt-stage${open ? " rpt-stage--open" : ""}`}>
      <button
        type="button"
        className="rpt-stage__summary"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="rpt-stage__index">{block.index}</span>
        <span className="rpt-stage__info">
          <span className="rpt-stage__phase">{block.phase}</span>
          <span className="rpt-stage__name">{block.name}</span>
        </span>
        <span className="rpt-stage__count">{block.useCaseCount} use cases</span>
        <span className="rpt-stage__expander" aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="rpt-stage__body">
          <div>
            <span className="rpt-stage__col-head">Current friction</span>
            {block.friction.map((f, i) => (
              <div key={i} className="rpt-stage__pain">{f}</div>
            ))}
          </div>
          <div>
            <span className="rpt-stage__col-head">AI / digital use-case landscape</span>
            {block.useCases.map((uc, i) => (
              <div key={i} className="rpt-stage__use" style={{ borderLeftColor: roleColor(uc.role) }}>
                {uc.text}
                <small>{roleLabel(uc.role)}</small>
              </div>
            ))}
          </div>
          <div>
            <span className="rpt-stage__col-head">Outcomes to evaluate</span>
            <div className="rpt-stage__outcome">
              <b>For the organisation</b>
              {block.orgOutcome}
            </div>
            <div className="rpt-stage__outcome rpt-stage__outcome--patient">
              <b>For the patient</b>
              {block.patientOutcome}
            </div>
          </div>
          <p className="rpt-stage__note">
            <b>Evidence context:</b> {block.evidenceNote}
          </p>
        </div>
      )}
    </div>
  );
}

function ReportBlock({ block }: { block: ReportContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className={`rpt-p${block.lead ? " rpt-p--lead" : ""}`}>
          {block.text}
        </p>
      );

    case "heading":
      return (
        <h2 id={block.id} className="rpt-h2">
          <span className="rpt-h2__rule" />
          <span dangerouslySetInnerHTML={{ __html: block.text }} />
        </h2>
      );

    case "subheading":
      return (
        <h3 id={block.id} className="rpt-h3">
          {block.text}
        </h3>
      );

    case "at-a-glance":
      return (
        <section className="rpt-section" id="at-a-glance">
          <span className="rpt-eyebrow">At a glance</span>
          <h2 className="rpt-h2" style={{ marginTop: 0 }}>Two outcomes define the opportunity.</h2>
          <ul className="rpt-glance-list">
            {block.items.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        </section>
      );

    case "dual-outcomes":
      return (
        <div className="rpt-dual-outcomes">
          {block.outcomes.map((o, i) => (
            <article key={i} className={`rpt-dual-outcomes__card${i === 1 ? " rpt-dual-outcomes__card--patient" : ""}`}>
              <span className="rpt-dual-outcomes__eyebrow">{o.eyebrow}</span>
              <strong className="rpt-dual-outcomes__headline">{o.headline}</strong>
              <p className="rpt-dual-outcomes__detail">{o.detail}</p>
            </article>
          ))}
        </div>
      );

    case "technology-evolution":
      return (
        <div className="rpt-tech-evo">
          {block.cards.map((card, i) => (
            <article key={i} className="rpt-tech-evo__card">
              <span className="rpt-tech-evo__title">{card.title}</span>
              <p className="rpt-tech-evo__desc">{card.description}</p>
            </article>
          ))}
        </div>
      );

    case "narrative-grid":
      return (
        <div className="rpt-narrative-grid">
          {block.columns.map((col, i) => (
            <div key={i}>
              <h3 className="rpt-narrative-grid__heading">{col.heading}</h3>
              {col.paragraphs.map((p, j) => (
                <p key={j} className="rpt-narrative-grid__p">{p}</p>
              ))}
            </div>
          ))}
        </div>
      );

    case "key-stats":
      return (
        <div className="rpt-key-stats">
          {block.stats.map((stat, i) => (
            <article key={i} className="rpt-stat">
              <span className="rpt-stat__tag">{stat.tag}</span>
              <strong className="rpt-stat__value">{stat.value}</strong>
              <p className="rpt-stat__desc">{stat.description}</p>
              <span className="rpt-stat__footnote">{stat.footnote}</span>
            </article>
          ))}
        </div>
      );

    case "journey-stage":
      return <JourneyStage block={block} />;

    case "enterprise-backend":
      return (
        <div className="rpt-backend">
          {block.areas.map((area, i) => (
            <article key={i} className="rpt-backend__area">
              <h3 className="rpt-backend__title">{area.title}</h3>
              {area.items.map((item, j) => (
                <div key={j} className="rpt-backend__item">
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  <small>Measure: {item.measure}</small>
                </div>
              ))}
            </article>
          ))}
          {block.caption && (
            <p className="rpt-caption" style={{ gridColumn: "1 / -1" }}>{block.caption}</p>
          )}
        </div>
      );

    case "framework-cards":
      return (
        <div className="rpt-framework">
          {block.cards.map((card, i) => (
            <article key={i} className="rpt-framework__card">
              <strong>{card.title}</strong>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      );

    case "assessment-table":
      return (
        <figure className="rpt-figure">
          <div className="rpt-figurehead">
            <span className="rpt-figurehead__exhibit">{block.label}</span>
            <span className="rpt-figurehead__qualifier">{block.qualifier}</span>
          </div>
          <div className="rpt-assessment-scroll">
            <table className="rpt-assessment">
              <thead>
                <tr>
                  {block.headers.map((h, i) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, i) => (
                  <tr key={i}>
                    <th scope="row">{row.touchpoint}</th>
                    {row.cells.map((cell, j) => (
                      <td key={j}>
                        <span className={`rpt-rating rpt-rating--${cell.rating}`}>
                          {cell.rating === "very-high" ? "Very high" : cell.rating.charAt(0).toUpperCase() + cell.rating.slice(1)}
                        </span>
                        <p>{cell.text}</p>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && <p className="rpt-caption">{block.caption}</p>}
          {block.source && <p className="rpt-caption">{block.source}</p>}
        </figure>
      );

    case "adoption-waves":
      return (
        <div>
          <div className="rpt-figurehead">
            <span className="rpt-figurehead__exhibit">{block.label}</span>
            <span className="rpt-figurehead__qualifier">{block.qualifier}</span>
          </div>
          <div className="rpt-waves">
            {block.waves.map((wave, i) => (
              <article key={i} className={`rpt-wave rpt-wave--${String(i + 1).padStart(2, "0")}`}>
                <span className="rpt-wave__number">{wave.number}</span>
                <span className="rpt-wave__phase">{wave.phase}</span>
                <h3 className="rpt-wave__title">{wave.title}</h3>
                <ul className="rpt-wave__list">
                  {wave.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
                <p className="rpt-caption rpt-wave__caption">{wave.caption}</p>
              </article>
            ))}
          </div>
          {block.source && <p className="rpt-caption">{block.source}</p>}
        </div>
      );

    case "case-grid":
      return (
        <div className="rpt-case-grid">
          {block.cases.map((c, i) => (
            <article key={i} className="rpt-case">
              <span className="rpt-case__tag">{c.tag}</span>
              <h3 className="rpt-case__title">{c.title}</h3>
              <strong className="rpt-case__metric">{c.metric}</strong>
              <p className="rpt-case__desc">{c.description}</p>
              <div className="rpt-case__take">
                <b>Operational lens:</b> {c.orgLens}<br />
                <b>Patient lens:</b> {c.patientLens}
              </div>
              <p className="rpt-caption">{c.caption}</p>
            </article>
          ))}
        </div>
      );

    case "horizontal-bar-charts":
      return (
        <div className="rpt-charts">
          {block.charts.map((chart, i) => (
            <article key={i} className="rpt-chart">
              <span className="rpt-chart__source">{chart.source}</span>
              <h3 className="rpt-chart__title">{chart.title}</h3>
              {chart.bars.map((bar, j) => (
                <div key={j} className="rpt-barrow">
                  <div className="rpt-barrow__label">
                    <span>{bar.label}</span>
                    <strong>{bar.value}%</strong>
                  </div>
                  <div className="rpt-barrow__track">
                    <div className="rpt-barrow__fill" style={{ width: `${bar.value}%` }} />
                  </div>
                </div>
              ))}
              <div className="rpt-barrow__axis">
                <span>0%</span><span>50%</span><span>100%</span>
              </div>
              <p className="rpt-caption">{chart.caption}</p>
            </article>
          ))}
        </div>
      );

    case "imperative-list":
      return (
        <ol className="rpt-imperative-list">
          {block.items.map((item, i) => (
            <li key={i}>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </li>
          ))}
        </ol>
      );

    case "closing-thesis":
      return (
        <div className="rpt-closing-thesis">
          <span className="rpt-closing-thesis__eyebrow">{block.eyebrow}</span>
          <p className="rpt-closing-thesis__text">{block.text}</p>
        </div>
      );

    case "source-grid":
      return (
        <div>
          <div className="rpt-source-grid">
            {block.sources.map((src) => (
              <article key={src.id} className="rpt-source" id={`source-${src.id}`}>
                <h4 className="rpt-source__title">{src.id} — {src.title}</h4>
                <p className="rpt-source__detail">{src.detail}</p>
                {src.links.map((link, j) => (
                  <a key={j} href={link.url} target="_blank" rel="noopener noreferrer" className="rpt-source__link">
                    {link.label} ↗
                  </a>
                ))}
              </article>
            ))}
          </div>
          {block.provenance && (
            <div className="rpt-provenance">
              {block.provenance.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
          )}
        </div>
      );

    case "delivery-options":
      return (
        <div className="rpt-delivery-options">
          {block.options.map((opt, i) => (
            <article key={i} className="rpt-delivery-options__card">
              <span className="rpt-eyebrow">{opt.eyebrow}</span>
              <h3>{opt.title}</h3>
              <p>{opt.description}</p>
            </article>
          ))}
        </div>
      );

    case "figure-table":
      return (
        <figure className="rpt-figure" style={!block.label && !block.title ? { background: "transparent", border: "none", padding: 0 } : undefined}>
          {(block.label || block.title) && (
            <div className="rpt-figure__header">
              {block.label && <span className="rpt-figure__label">{block.label}</span>}
              {block.title && <h4 className="rpt-figure__title">{block.title}</h4>}
            </div>
          )}
          <div className="rpt-table-wrap">
            <table className="rpt-table">
              <thead>
                <tr>
                  {block.headers.map((h, i) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} dangerouslySetInnerHTML={{ __html: cell }} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.notes && <p className="rpt-caption">{block.notes}</p>}
          {block.sources && <p className="rpt-caption">{block.sources}</p>}
        </figure>
      );

    case "quote":
      return (
        <blockquote className="rpt-blockquote">
          <p>{block.text}</p>
          {block.attribution && <cite className="rpt-blockquote__cite">{block.attribution}</cite>}
        </blockquote>
      );

    case "pull-quote":
      return (
        <aside className="rpt-pull-quote">
          <p>{block.text}</p>
        </aside>
      );

    case "list":
      if (block.ordered) {
        return (
          <ol className="rpt-list rpt-list--ordered">
            {block.items.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ol>
        );
      }
      return (
        <ul className="rpt-list">
          {block.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      );

    case "collaboration":
      return (
        <div className="rpt-collaboration">
          <div className="rpt-collaboration__rule" />
          <p className="rpt-collaboration__label">Written in collaboration with</p>
          {block.partnerLogo ? (
            <img src={block.partnerLogo} alt={block.partnerName} className="rpt-collaboration__logo" />
          ) : (
            <span className="rpt-collaboration__name">{block.partnerName}</span>
          )}
        </div>
      );

    case "about-partner":
      return (
        <div className="rpt-about-partner">
          <hr className="rpt-divider" />
          <div className="rpt-about-partner__inner">
            {block.logo && <img src={block.logo} alt={block.name} className="rpt-about-partner__logo" />}
            <div>
              <h3 className="rpt-about-partner__title">About {block.name}</h3>
              <p className="rpt-about-partner__desc">{block.description}</p>
            </div>
          </div>
        </div>
      );

    case "download-cta":
      return (
        <div className="rpt-download-cta">
          {block.url ? (
            <a href={block.url} download className="rpt-download-cta__btn">{block.label}</a>
          ) : (
            <button type="button" className="rpt-download-cta__btn" onClick={() => window.print()}>{block.label}</button>
          )}
        </div>
      );

    case "divider":
      return <hr className="rpt-divider" />;

    case "example-note":
      return (
        <aside className="rpt-note">
          <p>{block.text}</p>
        </aside>
      );

    default:
      return null;
  }
}

const reportStyles = `
  :root {
    --rpt-patient: #d74255;
    --rpt-clinical: #a42c18;
    --rpt-operations: #7065ad;
    --rpt-payer: #6044d4;
  }

  /* ─── Hero ─── */
  .rpt-hero {
    background: var(--blue-950);
    color: var(--paper-050);
  }
  .rpt-hero__inner {
    max-width: var(--page-max);
    margin: 0 auto;
    padding: var(--space-16) var(--gutter) var(--space-12);
  }
  .rpt-hero__tag {
    font: var(--eyebrow);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(158,220,200,1);
    display: block;
    margin-bottom: var(--space-4);
  }
  .rpt-hero__title {
    font: 550 clamp(48px,7vw,90px)/1.03 var(--font-ui);
    letter-spacing: -0.06em;
    color: var(--paper-050);
    margin: 0 0 var(--space-6);
  }
  .rpt-hero__subtitle {
    font: 400 21px/1.5 var(--font-ui);
    color: rgba(210,223,232,0.9);
    margin: 0 0 var(--space-8);
    max-width: 750px;
  }
  .rpt-hero__meta-row {
    display: flex;
    gap: var(--space-5);
    flex-wrap: wrap;
    color: rgba(189,208,222,0.9);
    font: var(--body-sm);
    margin-bottom: var(--space-8);
  }
  .rpt-hero__meta-row span {
    border-left: 2px solid rgba(122,203,180,0.7);
    padding-left: var(--space-3);
  }
  .rpt-hero__actions {
    display: flex;
    gap: var(--space-2);
  }
  .rpt-action-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.25);
    background: transparent;
    color: rgba(255,255,255,0.75);
    cursor: pointer;
    transition: var(--transition-ui);
    text-decoration: none;
  }
  .rpt-action-btn:hover {
    border-color: rgba(255,255,255,0.5);
    color: white;
    background: rgba(255,255,255,0.08);
  }
  .rpt-hero__image {
    display: none;
  }

  /* ─── Section nav ─── */
  .rpt-section-nav {
    display: flex;
    gap: var(--space-3) var(--space-6);
    flex-wrap: wrap;
    max-width: var(--page-max);
    margin: 0 auto;
    padding: var(--space-5) var(--gutter);
    border-bottom: 1px solid var(--border-hairline);
    font: var(--body-sm);
  }
  .rpt-section-nav__link {
    color: var(--text-link);
    text-decoration: none;
    border-bottom: none;
  }
  .rpt-section-nav__link:hover {
    color: var(--text-link-hover);
  }

  /* ─── Layout ─── */
  .rpt-wrap {
    max-width: var(--page-max);
    margin: 0 auto;
    padding: 0 var(--gutter);
  }
  .rpt-content {
    padding: var(--space-10) 0 var(--space-20);
  }
  .rpt-section {
    padding: var(--space-12) 0 var(--space-6);
  }
  .rpt-eyebrow {
    font: var(--eyebrow);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    display: block;
    margin-bottom: var(--space-4);
    color: var(--text-muted);
  }
  .rpt-caption {
    font: var(--body-sm);
    color: var(--text-faint);
    margin: var(--space-3) 0;
    line-height: 1.5;
  }

  /* ─── Paragraphs ─── */
  .rpt-p {
    font: var(--body-lg);
    color: var(--text-body);
    margin: 0 0 var(--space-5);
    line-height: 1.7;
    max-width: 820px;
  }
  .rpt-p--lead {
    color: var(--text-muted);
    max-width: 820px;
  }

  /* ─── Headings ─── */
  .rpt-h2 {
    font: 550 clamp(30px,4vw,46px)/1.15 var(--font-ui);
    letter-spacing: -0.035em;
    color: var(--text-strong);
    margin: var(--space-12) 0 var(--space-4);
    padding-top: var(--space-12);
    border-top: 1px solid var(--border-hairline);
    scroll-margin-top: 90px;
  }
  .rpt-h2__rule { display: none; }
  .rpt-h3 {
    font: 600 22px/1.25 var(--font-ui);
    letter-spacing: -0.02em;
    color: var(--text-strong);
    margin: var(--space-8) 0 var(--space-4);
    scroll-margin-top: 90px;
  }

  /* ─── At a Glance ─── */
  .rpt-glance-list {
    list-style: none;
    padding: 0;
    margin: var(--space-8) 0 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 var(--space-10);
  }
  .rpt-glance-list li {
    position: relative;
    padding: var(--space-5) 0 var(--space-5) 22px;
    border-top: 1px solid var(--border-hairline);
    font: var(--body-lg);
    line-height: 1.6;
    color: var(--text-body);
  }
  .rpt-glance-list li::before {
    content: "";
    width: 6px;
    height: 6px;
    background: var(--blue-600);
    position: absolute;
    top: 31px;
    left: 0;
  }

  /* ─── Dual outcomes ─── */
  .rpt-dual-outcomes {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-5);
    margin: var(--space-6) 0 var(--space-8);
  }
  .rpt-dual-outcomes__card {
    padding: var(--space-6);
    background: #e6efed;
  }
  .rpt-dual-outcomes__card--patient {
    background: #e9eefb;
  }
  .rpt-dual-outcomes__eyebrow {
    display: block;
    font: var(--eyebrow);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: var(--space-4);
  }
  .rpt-dual-outcomes__headline {
    font: 600 24px/1.3 var(--font-ui);
    letter-spacing: -0.025em;
    color: var(--text-strong);
    display: block;
  }
  .rpt-dual-outcomes__detail {
    font: var(--body-sm);
    margin: var(--space-4) 0 0;
    color: var(--text-muted);
  }

  /* ─── Technology evolution ─── */
  .rpt-tech-evo {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-5);
    margin: var(--space-8) 0;
  }
  .rpt-tech-evo__card {
    border-top: 3px solid var(--blue-300);
    padding: var(--space-5);
    background: var(--surface-card);
  }
  .rpt-tech-evo__title {
    font: 600 15px/1.4 var(--font-ui);
    color: var(--text-strong);
  }
  .rpt-tech-evo__desc {
    font: var(--body-sm);
    color: var(--text-muted);
    margin: var(--space-3) 0 0;
  }

  /* ─── Narrative grid ─── */
  .rpt-narrative-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-10);
    margin: var(--space-8) 0;
  }
  .rpt-narrative-grid__heading {
    font: 600 21px/1.25 var(--font-ui);
    color: var(--text-strong);
    margin: 0 0 var(--space-4);
  }
  .rpt-narrative-grid__p {
    font: var(--body-md);
    color: var(--text-muted);
    margin: 0 0 var(--space-4);
    line-height: 1.6;
  }

  /* ─── Key stats ─── */
  .rpt-key-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-5);
    margin: var(--space-2) 0 var(--space-12);
  }
  .rpt-stat {
    border-top: 3px solid var(--blue-600);
    background: var(--surface-card);
    padding: var(--space-6);
  }
  .rpt-stat__tag {
    display: inline-block;
    font: var(--label);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    background: var(--surface-sunken);
    padding: 4px 7px;
    margin-bottom: var(--space-3);
    color: var(--text-muted);
  }
  .rpt-stat__value {
    font: 600 44px/1.2 var(--font-ui);
    letter-spacing: -0.05em;
    display: block;
    color: var(--text-strong);
  }
  .rpt-stat__desc {
    font: var(--body-md);
    margin: var(--space-3) 0;
    color: var(--text-body);
  }
  .rpt-stat__footnote {
    font: var(--body-sm);
    color: var(--text-faint);
  }

  /* ─── Journey stages ─── */
  .rpt-stage {
    background: var(--surface-card);
    margin-bottom: var(--space-4);
    border: 1px solid var(--border-hairline);
  }
  .rpt-stage__summary {
    width: 100%;
    padding: var(--space-6);
    display: flex;
    gap: var(--space-5);
    align-items: center;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
  }
  .rpt-stage__summary:hover {
    background: rgba(0,0,0,0.015);
  }
  .rpt-stage__index {
    font: 500 30px/1 var(--font-ui);
    letter-spacing: -0.05em;
    color: var(--blue-600);
    min-width: 44px;
  }
  .rpt-stage__info {
    display: flex;
    flex-direction: column;
  }
  .rpt-stage__phase {
    font: var(--eyebrow);
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 4px;
  }
  .rpt-stage__name {
    font: 600 21px/1.3 var(--font-ui);
    color: var(--text-strong);
  }
  .rpt-stage__count {
    font: var(--body-sm);
    color: var(--text-muted);
    margin-left: auto;
    white-space: nowrap;
  }
  .rpt-stage__expander {
    font-size: 24px;
    color: var(--text-faint);
    margin-left: var(--space-3);
    width: 28px;
    text-align: center;
  }
  .rpt-stage__body {
    border-top: 1px solid var(--border-hairline);
    padding: var(--space-6);
    display: grid;
    grid-template-columns: 1fr 1.2fr 1fr;
    gap: var(--space-8);
  }
  .rpt-stage__col-head {
    font: var(--eyebrow);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    display: block;
    margin-bottom: var(--space-5);
    color: var(--text-muted);
  }
  .rpt-stage__pain {
    padding: var(--space-4) 0;
    border-top: 1px solid var(--border-hairline);
    font: var(--body-lg);
    color: var(--text-body);
  }
  .rpt-stage__use {
    border-left: 3px solid var(--blue-600);
    padding: 1px 0 1px 11px;
    margin: 0 0 var(--space-4);
    font: var(--body-md);
    line-height: 1.45;
    color: var(--text-body);
  }
  .rpt-stage__use small {
    display: block;
    font: var(--label);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-faint);
    margin-top: 4px;
  }
  .rpt-stage__outcome {
    background: #edf5f1;
    padding: var(--space-4);
    margin-bottom: var(--space-3);
    font: var(--body-sm);
    color: var(--text-body);
    line-height: 1.5;
  }
  .rpt-stage__outcome b {
    font: var(--label);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    display: block;
    margin-bottom: var(--space-2);
    color: var(--text-muted);
  }
  .rpt-stage__outcome--patient {
    background: #edf2fb;
  }
  .rpt-stage__note {
    grid-column: 1 / -1;
    margin: 0;
    padding-top: var(--space-4);
    border-top: 1px solid var(--border-hairline);
    font: var(--body-sm);
    color: var(--text-muted);
  }

  /* ─── Enterprise backend ─── */
  .rpt-backend {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-5);
    margin: var(--space-8) 0;
  }
  .rpt-backend__area {
    background: #eaf0f0;
    padding: var(--space-6);
  }
  .rpt-backend__title {
    font: 600 20px/1.3 var(--font-ui);
    color: var(--text-strong);
    margin: 0 0 var(--space-4);
  }
  .rpt-backend__item {
    border-top: 1px solid rgba(207,218,219,1);
    padding: var(--space-4) 0 var(--space-2);
  }
  .rpt-backend__item h4 {
    font: 600 15px/1.4 var(--font-ui);
    margin: 0 0 var(--space-1);
    color: var(--text-strong);
  }
  .rpt-backend__item p {
    font: var(--body-sm);
    color: var(--text-muted);
    margin: 0 0 var(--space-2);
  }
  .rpt-backend__item small {
    font: var(--body-sm);
    color: #405f58;
  }

  /* ─── Framework cards ─── */
  .rpt-framework {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-5);
    margin: var(--space-8) 0;
  }
  .rpt-framework__card {
    padding: var(--space-5);
    background: #eaf0f3;
  }
  .rpt-framework__card strong {
    font: 600 21px/1.3 var(--font-ui);
    color: var(--text-strong);
  }
  .rpt-framework__card p {
    font: var(--body-sm);
    color: var(--text-muted);
    margin: var(--space-3) 0 0;
  }

  /* ─── Figurehead ─── */
  .rpt-figurehead {
    display: flex;
    gap: var(--space-4);
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    margin: var(--space-8) 0 var(--space-5);
  }
  .rpt-figurehead__exhibit {
    font: 600 13px/1 var(--font-ui);
    letter-spacing: 0.025em;
    color: var(--text-strong);
  }
  .rpt-figurehead__qualifier {
    font: var(--body-sm);
    color: var(--text-faint);
  }

  /* ─── Assessment table ─── */
  .rpt-assessment-scroll {
    overflow-x: auto;
  }
  .rpt-assessment {
    width: 100%;
    border-collapse: collapse;
    font: var(--body-sm);
    table-layout: fixed;
  }
  .rpt-assessment th:first-child {
    width: 21%;
  }
  .rpt-assessment thead th {
    background: #e9eef0;
    padding: var(--space-4) var(--space-3);
    text-align: left;
    font: var(--label);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-muted);
  }
  .rpt-assessment tbody th {
    padding: var(--space-5) var(--space-3) var(--space-5) 0;
    font: 600 13px/1.4 var(--font-ui);
    color: var(--text-strong);
    text-transform: none;
    letter-spacing: 0;
    vertical-align: top;
  }
  .rpt-assessment td {
    padding: var(--space-5) var(--space-3);
    border-bottom: 1px solid var(--border-hairline);
    vertical-align: top;
    line-height: 1.45;
    color: var(--text-body);
  }
  .rpt-assessment td p {
    margin: var(--space-2) 0 0;
    color: var(--text-muted);
  }

  /* ─── Rating badges ─── */
  .rpt-rating {
    display: inline-block;
    font: 700 10px/1 var(--font-ui);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    border-radius: 2px;
    padding: 4px 8px;
    white-space: nowrap;
  }
  .rpt-rating--low { background: #efedf0; color: #534c59; }
  .rpt-rating--medium { background: #ede6f4; color: #665077; }
  .rpt-rating--high { background: #dfeee8; color: #235946; }
  .rpt-rating--very-high { background: #dce7fd; color: #244fac; }

  /* ─── Adoption waves ─── */
  .rpt-waves {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-5);
    margin: var(--space-6) 0;
  }
  .rpt-wave {
    background: var(--surface-card);
    border-top: 4px solid var(--grey-400);
    padding: var(--space-6);
  }
  .rpt-wave--01 { border-color: var(--blue-600); }
  .rpt-wave--02 { border-color: #6c90a0; }
  .rpt-wave--03 { border-color: var(--grey-400); }
  .rpt-wave__number {
    font: 500 40px/1 var(--font-ui);
    color: var(--grey-300);
    display: block;
    margin-bottom: var(--space-5);
  }
  .rpt-wave__phase {
    font: var(--label);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-muted);
    display: block;
    min-height: 30px;
    line-height: 1.5;
  }
  .rpt-wave__title {
    font: 600 28px/1.2 var(--font-ui);
    letter-spacing: -0.02em;
    color: var(--text-strong);
    margin: var(--space-3) 0 var(--space-5);
  }
  .rpt-wave__list {
    padding-left: var(--space-5);
    margin: 0 0 var(--space-5);
    font: var(--body-sm);
    color: var(--text-body);
    min-height: 140px;
  }
  .rpt-wave__list li {
    padding: 0 0 var(--space-3) 2px;
    line-height: 1.45;
  }
  .rpt-wave__caption {
    padding-top: var(--space-4);
    border-top: 1px solid var(--border-hairline);
    margin-bottom: 0;
  }

  /* ─── Delivery options ─── */
  .rpt-delivery-options {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-5);
    margin: var(--space-8) 0;
  }
  .rpt-delivery-options__card {
    padding: var(--space-5);
    border-top: 2px solid var(--blue-600);
    background: var(--surface-card);
  }
  .rpt-delivery-options__card h3 {
    font: 600 20px/1.3 var(--font-ui);
    color: var(--text-strong);
    margin: var(--space-2) 0 var(--space-3);
  }
  .rpt-delivery-options__card p {
    font: var(--body-sm);
    color: var(--text-muted);
    margin: 0;
  }

  /* ─── Case grid ─── */
  .rpt-case-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-5);
    margin: var(--space-8) 0;
  }
  .rpt-case {
    padding: var(--space-6);
    background: var(--surface-card);
    border: 1px solid var(--border-hairline);
  }
  .rpt-case__tag {
    display: inline-block;
    font: var(--label);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    background: var(--surface-sunken);
    padding: 4px 7px;
    margin-bottom: var(--space-3);
    color: var(--text-muted);
    font-size: 9px;
  }
  .rpt-case__title {
    font: 600 21px/1.25 var(--font-ui);
    color: var(--text-strong);
    margin: 0 0 var(--space-4);
    min-height: 52px;
  }
  .rpt-case__metric {
    font: 600 38px/1.2 var(--font-ui);
    letter-spacing: -0.045em;
    color: var(--blue-600);
    display: block;
    margin: var(--space-5) 0;
  }
  .rpt-case__desc {
    font: var(--body-sm);
    color: var(--text-muted);
    margin: 0 0 var(--space-4);
  }
  .rpt-case__take {
    font: var(--body-sm);
    border-top: 1px solid var(--border-hairline);
    padding-top: var(--space-4);
    line-height: 1.7;
    margin-bottom: var(--space-4);
    color: var(--text-body);
  }

  /* ─── Horizontal bar charts ─── */
  .rpt-charts {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-6);
    margin: var(--space-8) 0;
  }
  .rpt-chart {
    min-width: 0;
  }
  .rpt-chart__source {
    font: var(--label);
    letter-spacing: 0.04em;
    color: var(--text-faint);
    text-transform: uppercase;
    display: block;
    margin-bottom: var(--space-2);
    font-size: 10px;
  }
  .rpt-chart__title {
    font: 600 20px/1.3 var(--font-ui);
    color: var(--text-strong);
    margin: 0 0 var(--space-5);
    min-height: 52px;
  }
  .rpt-barrow {
    margin: var(--space-4) 0;
  }
  .rpt-barrow__label {
    display: flex;
    gap: var(--space-4);
    justify-content: space-between;
    font: var(--body-sm);
    margin-bottom: var(--space-1);
    color: var(--text-body);
  }
  .rpt-barrow__label strong {
    font-variant-numeric: tabular-nums;
  }
  .rpt-barrow__track {
    height: 12px;
    background: #e0e6ea;
  }
  .rpt-barrow__fill {
    height: 12px;
    background: var(--blue-600);
  }
  .rpt-barrow__axis {
    display: flex;
    justify-content: space-between;
    font: var(--body-sm);
    font-size: 10px;
    color: var(--text-faint);
    border-top: 1px solid var(--grey-300);
    padding-top: var(--space-1);
  }

  /* ─── Imperative list ─── */
  .rpt-imperative-list {
    list-style: none;
    counter-reset: actions;
    margin: var(--space-8) 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 var(--space-8);
  }
  .rpt-imperative-list li {
    counter-increment: actions;
    padding: var(--space-5) 0 var(--space-5) 38px;
    border-top: 1px solid var(--border-hairline);
    position: relative;
  }
  .rpt-imperative-list li::before {
    content: counter(actions, decimal-leading-zero);
    position: absolute;
    left: 0;
    top: var(--space-5);
    color: var(--blue-600);
    font: 500 15px/1 var(--font-ui);
  }
  .rpt-imperative-list strong {
    font: 600 17px/1.45 var(--font-ui);
    display: block;
    color: var(--text-strong);
  }
  .rpt-imperative-list p {
    font: var(--body-sm);
    color: var(--text-muted);
    margin: var(--space-2) 0 0;
  }

  /* ─── Closing thesis ─── */
  .rpt-closing-thesis {
    background: var(--blue-950);
    color: var(--paper-050);
    padding: var(--space-8);
    margin: var(--space-8) 0;
  }
  .rpt-closing-thesis__eyebrow {
    font: var(--eyebrow);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(165,216,201,1);
    display: block;
    margin-bottom: var(--space-4);
  }
  .rpt-closing-thesis__text {
    font: 400 26px/1.4 var(--font-ui);
    letter-spacing: -0.025em;
    margin: 0;
  }

  /* ─── Source grid ─── */
  .rpt-source-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 var(--space-8);
  }
  .rpt-source {
    padding: var(--space-5) 0;
    border-top: 1px solid var(--border-hairline);
    scroll-margin-top: 90px;
  }
  .rpt-source__title {
    font: 600 14px/1.5 var(--font-ui);
    margin: 0 0 var(--space-2);
    color: var(--text-strong);
  }
  .rpt-source__detail {
    font: var(--body-sm);
    color: var(--text-muted);
    margin: 0 0 var(--space-2);
  }
  .rpt-source__link {
    font: var(--body-sm);
    color: var(--text-link);
    margin-right: var(--space-4);
  }
  .rpt-provenance {
    padding: var(--space-6) 0;
    font: var(--body-sm);
    color: var(--text-muted);
  }
  .rpt-provenance p {
    margin: 0 0 var(--space-4);
  }

  /* ─── Tables ─── */
  .rpt-table-wrap { overflow-x: auto; }
  .rpt-table {
    width: 100%;
    border-collapse: collapse;
    font: var(--body-sm);
  }
  .rpt-table th {
    text-align: left;
    font: var(--label);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-muted);
    padding: var(--space-4) var(--space-4) var(--space-4) 0;
    border-bottom: 2px solid var(--border-subtle);
    white-space: nowrap;
  }
  .rpt-table td {
    padding: var(--space-4) var(--space-4) var(--space-4) 0;
    border-bottom: 1px solid var(--border-hairline);
    color: var(--text-body);
    vertical-align: top;
  }
  .rpt-table td:first-child {
    font-weight: 600;
    min-width: 170px;
    color: var(--text-strong);
  }

  /* ─── Figure (shared) ─── */
  .rpt-figure {
    margin: var(--space-8) 0;
  }
  .rpt-figure__header {
    margin-bottom: var(--space-4);
  }
  .rpt-figure__label {
    font: var(--eyebrow);
    letter-spacing: var(--eyebrow-track);
    text-transform: uppercase;
    color: var(--text-muted);
    display: block;
    margin-bottom: var(--space-2);
  }
  .rpt-figure__title {
    font: var(--heading-1);
    color: var(--text-strong);
    margin: 0;
  }

  /* ─── Quotes ─── */
  .rpt-blockquote {
    border-left: 3px solid var(--blue-600);
    padding: var(--space-4) var(--space-6);
    margin: var(--space-6) 0;
    background: var(--surface-accent-soft);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
  }
  .rpt-blockquote p {
    font: 400 18px/1.6 var(--font-display);
    color: var(--text-strong);
    margin: 0;
    font-style: italic;
  }
  .rpt-blockquote__cite {
    display: block;
    font: var(--body-sm);
    color: var(--text-muted);
    margin-top: var(--space-3);
    font-style: normal;
  }
  .rpt-pull-quote {
    border-left: 3px solid var(--blue-600);
    padding: var(--space-4) var(--space-6);
    margin: var(--space-8) 0;
  }
  .rpt-pull-quote p {
    font: 400 clamp(18px, 2vw, 22px)/1.5 var(--font-display);
    color: var(--text-strong);
    margin: 0;
    font-style: italic;
  }

  /* ─── Lists ─── */
  .rpt-list {
    font: var(--body-lg);
    color: var(--text-body);
    margin: 0 0 var(--space-6);
    padding-left: var(--space-6);
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }
  .rpt-list--ordered { list-style: decimal; }

  /* ─── Misc ─── */
  .rpt-divider {
    border: none;
    border-top: 1px solid var(--border-subtle);
    margin: var(--space-8) 0;
  }
  .rpt-note {
    background: var(--surface-accent-soft);
    border-left: 3px solid var(--blue-400);
    padding: var(--space-4) var(--space-5);
    border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
    margin: var(--space-5) 0;
  }
  .rpt-note p {
    font: var(--body-sm);
    color: var(--text-body);
    margin: 0;
  }
  .rpt-collaboration {
    text-align: center;
    margin: var(--space-12) 0;
  }
  .rpt-collaboration__rule {
    height: 1px;
    background: var(--border-subtle);
    margin-bottom: var(--space-8);
  }
  .rpt-collaboration__label {
    font: var(--heading-2);
    color: var(--text-strong);
    margin: 0 0 var(--space-6);
  }
  .rpt-collaboration__logo {
    height: 80px;
    object-fit: contain;
  }
  .rpt-collaboration__name {
    font: var(--heading-1);
    color: var(--text-strong);
  }
  .rpt-about-partner {
    margin: var(--space-10) 0;
  }
  .rpt-about-partner__inner {
    display: flex;
    gap: var(--space-8);
    align-items: flex-start;
    padding-top: var(--space-8);
  }
  .rpt-about-partner__logo {
    width: 120px;
    height: 120px;
    object-fit: contain;
    flex-shrink: 0;
    border: 1px solid var(--border-hairline);
    border-radius: var(--radius-md);
    padding: var(--space-3);
  }
  .rpt-about-partner__title {
    font: var(--heading-1);
    color: var(--text-strong);
    margin: 0 0 var(--space-4);
  }
  .rpt-about-partner__desc {
    font: var(--body-md);
    color: var(--text-body);
    margin: 0;
    line-height: 1.65;
  }
  .rpt-download-cta {
    text-align: center;
    margin: var(--space-12) 0;
  }
  .rpt-download-cta__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font: var(--label);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--paper-000);
    background: var(--action-primary);
    border: none;
    border-radius: var(--radius-sm);
    padding: var(--space-5) var(--space-10);
    cursor: pointer;
    text-decoration: none;
    transition: var(--transition-ui);
  }
  .rpt-download-cta__btn:hover {
    background: var(--action-primary-hover);
  }

  /* ─── Footer ─── */
  .rpt-footer {
    padding: var(--space-6) 0 var(--space-12);
    font: var(--body-sm);
    color: var(--text-faint);
    border-top: 1px solid var(--border-hairline);
  }

  /* ─── Responsive ─── */
  @media (max-width: 900px) {
    .rpt-glance-list,
    .rpt-dual-outcomes,
    .rpt-tech-evo,
    .rpt-narrative-grid,
    .rpt-key-stats,
    .rpt-framework,
    .rpt-waves,
    .rpt-delivery-options,
    .rpt-case-grid,
    .rpt-charts,
    .rpt-imperative-list,
    .rpt-source-grid {
      grid-template-columns: 1fr 1fr;
    }
    .rpt-backend {
      grid-template-columns: 1fr;
    }
    .rpt-stage__body {
      grid-template-columns: 1fr 1fr;
    }
    .rpt-stage__body > div:last-of-type {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-4);
    }
    .rpt-stage__body > div:last-of-type > .rpt-stage__col-head {
      grid-column: 1 / -1;
    }
  }
  @media (max-width: 600px) {
    .rpt-hero__inner {
      padding: var(--space-10) var(--gutter);
    }
    .rpt-hero__title {
      font-size: clamp(36px, 10vw, 48px);
    }
    .rpt-glance-list,
    .rpt-dual-outcomes,
    .rpt-tech-evo,
    .rpt-narrative-grid,
    .rpt-key-stats,
    .rpt-framework,
    .rpt-waves,
    .rpt-delivery-options,
    .rpt-case-grid,
    .rpt-charts,
    .rpt-imperative-list,
    .rpt-source-grid {
      grid-template-columns: 1fr;
    }
    .rpt-stage__body {
      grid-template-columns: 1fr;
      gap: var(--space-5);
      padding: var(--space-5);
    }
    .rpt-stage__body > div:last-of-type {
      display: block;
      grid-column: auto;
    }
    .rpt-stage__summary {
      padding: var(--space-4) var(--space-4);
      gap: var(--space-3);
    }
    .rpt-stage__name {
      font-size: 18px;
    }
    .rpt-stage__note {
      grid-column: auto;
    }
    .rpt-section-nav {
      gap: var(--space-3) var(--space-5);
    }
    .rpt-wave__list {
      min-height: 0;
    }
    .rpt-wave__phase {
      min-height: 0;
    }
    .rpt-assessment {
      min-width: 690px;
    }
    .rpt-case__title {
      min-height: 0;
    }
    .rpt-chart__title {
      min-height: 0;
    }
    .rpt-closing-thesis__text {
      font-size: 23px;
    }
  }

  /* ─── Print ─── */
  @media print {
    .rpt-hero__actions,
    .rpt-section-nav,
    .rpt-download-cta,
    nav[class*="nav"],
    footer,
    .nav-burger {
      display: none !important;
    }
    .rpt-hero {
      background: #14283d !important;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }
    .rpt-hero__inner {
      padding: 20px var(--gutter);
    }
    .rpt-hero__title {
      font-size: 49px;
    }
    .rpt-stage {
      break-inside: avoid;
    }
    .rpt-figure {
      break-inside: avoid;
    }
    .rpt-source {
      break-inside: avoid;
    }
    .rpt-stat,
    .rpt-barrow__track,
    .rpt-barrow__fill,
    .rpt-rating,
    .rpt-closing-thesis,
    .rpt-dual-outcomes__card,
    .rpt-backend__area,
    .rpt-wave {
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }
    body {
      font-size: 11pt;
    }
    a[href]::after {
      content: none;
    }
  }
`;
