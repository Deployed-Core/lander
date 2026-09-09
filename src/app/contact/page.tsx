"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";

const industryOptions = [
  "Healthcare & hospitality",
  "Supply chain",
  "Manufacturing",
  "Utilities",
  "Financial services",
  "Other",
];

const companySizeOptions = [
  "1–50",
  "51–250",
  "251–1,000",
  "1,001–5,000",
  "5,000+",
];

const countryOptions = [
  "United States",
  "United Kingdom",
  "India",
  "Singapore",
  "United Arab Emirates",
  "Australia",
  "Germany",
  "Other",
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid var(--border-subtle)",
  borderRadius: "var(--radius-sm)",
  padding: "10px 14px",
  font: "var(--body-md)",
  color: "var(--text-strong)",
  background: "var(--paper-000)",
  outline: "none",
  transition: "var(--transition-ui)",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  font: "var(--body-sm)",
  color: "var(--text-muted)",
  marginBottom: 6,
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    jobTitle: "",
    phone: "",
    company: "",
    industry: "",
    companySize: "",
    country: "",
  });

  const update = (key: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const reset = () => {
    setForm({
      email: "",
      firstName: "",
      lastName: "",
      jobTitle: "",
      phone: "",
      company: "",
      industry: "",
      companySize: "",
      country: "",
    });
    setSent(false);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top banner */}
      <div
        style={{
          background: "var(--blue-950)",
          color: "var(--paper-050)",
          padding: "10px var(--gutter)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--space-4)",
          font: "var(--body-sm)",
          flexWrap: "wrap",
        }}
      >
        <span style={{ textAlign: "center" }}>
          Now taking Q4 deployment engagements
        </span>
        <Link
          href="/blog"
          style={{
            color: "var(--blue-300)",
            font: "var(--body-sm)",
            fontWeight: 500,
            borderBottom: 0,
          }}
        >
          Read more
        </Link>
        <span
          className="contact-lang"
          style={{
            marginLeft: "auto",
            font: "var(--label)",
            letterSpacing: "var(--label-track)",
            color: "rgba(249,246,243,.5)",
          }}
        >
          EN
        </span>
      </div>

      {/* Two-column split */}
      <div
        className="contact-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          flex: 1,
          minHeight: "calc(100vh - 40px)",
        }}
      >
        {/* Left column */}
        <div
          className="brand-field on-navy"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <SiteNav tone="navy" showCta={false} />

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "var(--space-16) clamp(32px, 5vw, 80px)",
              maxWidth: 600,
            }}
          >
            <h1
              style={{
                font: "var(--display-2)",
                letterSpacing: "var(--display-track)",
                color: "var(--paper-000)",
              }}
            >
              Applied AI for the enterprise
            </h1>
            <p
              style={{
                font: "var(--body-lg)",
                color: "rgba(249,246,243,.82)",
                marginTop: "var(--space-6)",
                marginBottom: 0,
                maxWidth: "var(--prose-max)",
              }}
            >
              We build custom AI systems around how your organisation already
              operates — then hand them over. No lock-in, no dependency.
            </p>

            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,.10)",
                marginTop: "var(--space-10)",
                paddingTop: "var(--space-8)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gap: "var(--space-3)",
                  font: "var(--body-md)",
                }}
              >
                <a
                  href="mailto:info@deployed.md"
                  style={{
                    color: "var(--blue-300)",
                    borderBottom: 0,
                  }}
                >
                  info@deployed.md
                </a>
                <a
                  href="mailto:security@deployed.md"
                  style={{
                    color: "var(--blue-300)",
                    borderBottom: 0,
                  }}
                >
                  security@deployed.md
                </a>
                <a
                  href="#"
                  style={{
                    color: "rgba(249,246,243,.60)",
                    font: "var(--body-sm)",
                    borderBottom: 0,
                  }}
                >
                  Bug bounty programme
                </a>
              </div>
            </div>
          </div>

          {/* Privacy note */}
          <div
            style={{
              padding: "var(--space-6) clamp(32px, 5vw, 80px)",
              font: "var(--body-sm)",
              color: "rgba(249,246,243,.38)",
            }}
          >
            Your data is processed in accordance with our privacy policy. We
            will never share your information with third parties.
          </div>
        </div>

        {/* Right column */}
        <div
          style={{
            background: "var(--paper-000)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "var(--space-16) var(--gutter)",
          }}
        >
          <div style={{ width: "100%", maxWidth: 480 }}>
            {!sent ? (
              <>
                <h2
                  style={{
                    font: "var(--display-3)",
                    letterSpacing: "var(--display-track)",
                    color: "var(--text-strong)",
                  }}
                >
                  Set a meeting with our team
                </h2>
                <p
                  style={{
                    font: "var(--body-md)",
                    color: "var(--text-muted)",
                    marginTop: "var(--space-2)",
                    marginBottom: "var(--space-10)",
                  }}
                >
                  Fill in the form and we will get back to you within one
                  working day.
                </p>

                <form
                  onSubmit={handleSubmit}
                  style={{ display: "grid", gap: "var(--space-5)" }}
                >
                  {/* Work email - full width */}
                  <Field label="Work email">
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={update("email")}
                      style={inputStyle}
                      placeholder="you@company.com"
                    />
                  </Field>

                  {/* First name + Last name */}
                  <div
                    className="form-row"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "var(--space-4)",
                    }}
                  >
                    <Field label="First name">
                      <input
                        type="text"
                        required
                        value={form.firstName}
                        onChange={update("firstName")}
                        style={inputStyle}
                      />
                    </Field>
                    <Field label="Last name">
                      <input
                        type="text"
                        required
                        value={form.lastName}
                        onChange={update("lastName")}
                        style={inputStyle}
                      />
                    </Field>
                  </div>

                  {/* Job title + Phone number */}
                  <div
                    className="form-row"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "var(--space-4)",
                    }}
                  >
                    <Field label="Job title">
                      <input
                        type="text"
                        value={form.jobTitle}
                        onChange={update("jobTitle")}
                        style={inputStyle}
                      />
                    </Field>
                    <Field label="Phone number">
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={update("phone")}
                        style={inputStyle}
                      />
                    </Field>
                  </div>

                  {/* Company + Industry */}
                  <div
                    className="form-row"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "var(--space-4)",
                    }}
                  >
                    <Field label="Company">
                      <input
                        type="text"
                        required
                        value={form.company}
                        onChange={update("company")}
                        style={inputStyle}
                      />
                    </Field>
                    <Field label="Industry">
                      <select
                        value={form.industry}
                        onChange={update("industry")}
                        required
                        style={{
                          ...inputStyle,
                          appearance: "none",
                          backgroundImage:
                            'url("data:image/svg+xml,%3Csvg width=\'10\' height=\'6\' viewBox=\'0 0 10 6\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 1l4 4 4-4\' stroke=\'%236c7486\' stroke-width=\'1.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")',
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 14px center",
                          paddingRight: 36,
                        }}
                      >
                        <option value="" disabled>
                          Select...
                        </option>
                        {industryOptions.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  {/* Company size + Country */}
                  <div
                    className="form-row"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "var(--space-4)",
                    }}
                  >
                    <Field label="Company size">
                      <select
                        value={form.companySize}
                        onChange={update("companySize")}
                        required
                        style={{
                          ...inputStyle,
                          appearance: "none",
                          backgroundImage:
                            'url("data:image/svg+xml,%3Csvg width=\'10\' height=\'6\' viewBox=\'0 0 10 6\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 1l4 4 4-4\' stroke=\'%236c7486\' stroke-width=\'1.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")',
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 14px center",
                          paddingRight: 36,
                        }}
                      >
                        <option value="" disabled>
                          Select...
                        </option>
                        {companySizeOptions.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Country">
                      <select
                        value={form.country}
                        onChange={update("country")}
                        required
                        style={{
                          ...inputStyle,
                          appearance: "none",
                          backgroundImage:
                            'url("data:image/svg+xml,%3Csvg width=\'10\' height=\'6\' viewBox=\'0 0 10 6\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 1l4 4 4-4\' stroke=\'%236c7486\' stroke-width=\'1.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")',
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 14px center",
                          paddingRight: 36,
                        }}
                      >
                        <option value="" disabled>
                          Select...
                        </option>
                        {countryOptions.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    style={{
                      marginTop: "var(--space-4)",
                      background: "var(--action-primary)",
                      color: "var(--paper-050)",
                      font: "var(--label)",
                      letterSpacing: "var(--label-track)",
                      padding: "14px 28px",
                      borderRadius: "var(--radius-sm)",
                      border: "none",
                      cursor: "pointer",
                      transition: "var(--transition-ui)",
                      width: "100%",
                    }}
                  >
                    Send
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "var(--space-16) 0" }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "var(--green-100)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto var(--space-6)",
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--green-600)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2
                  style={{
                    font: "var(--display-3)",
                    letterSpacing: "var(--display-track)",
                    color: "var(--text-strong)",
                  }}
                >
                  Request received
                </h2>
                <p
                  style={{
                    font: "var(--body-md)",
                    color: "var(--text-muted)",
                    marginTop: "var(--space-3)",
                    marginBottom: "var(--space-8)",
                  }}
                >
                  We will be in touch within one working day.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  style={{
                    font: "var(--label)",
                    letterSpacing: "var(--label-track)",
                    padding: "13px 28px",
                    borderRadius: "var(--radius-pill)",
                    border: "1px solid var(--border-strong)",
                    background: "transparent",
                    color: "var(--text-strong)",
                    cursor: "pointer",
                    transition: "var(--transition-ui)",
                  }}
                >
                  Send another
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
          .contact-lang {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
