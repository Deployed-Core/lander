import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import CompactFooter from "@/components/CompactFooter";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Deployed collects, uses, and protects your personal information.",
};

const sectionHeading: React.CSSProperties = {
  font: "var(--display-4)",
  letterSpacing: "var(--display-track)",
  color: "var(--text-strong)",
  margin: "48px 0 12px",
};

const bodyText: React.CSSProperties = {
  font: "var(--body-md)",
  color: "var(--text-body)",
  margin: "0 0 16px",
  maxWidth: "var(--prose-max)",
};

export default function PrivacyPage() {
  return (
    <div style={{ background: "var(--paper-050)", minHeight: "100vh" }}>
      <SiteNav tone="light" />

      <section
        style={{
          maxWidth: 780,
          margin: "0 auto",
          padding: "76px 24px 96px",
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
          Legal
        </p>
        <h1
          style={{
            font: "var(--display-2)",
            letterSpacing: "var(--display-track)",
            color: "var(--text-strong)",
            margin: "0 0 8px",
          }}
        >
          Privacy Policy
        </h1>
        <p
          style={{
            font: "var(--body-sm)",
            color: "var(--text-muted)",
            margin: "0 0 48px",
          }}
        >
          Last updated: 11 September 2026
        </p>

        {/* Intro */}
        <p style={bodyText}>
          Deployed (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the
          website at{" "}
          <Link
            href="/"
            style={{ color: "var(--blue-700)", textDecoration: "underline" }}
          >
            deployed.md
          </Link>
          . This policy explains what personal information we collect through our
          website, why we collect it, and how we handle it.
        </p>

        {/* 1 */}
        <h2 style={sectionHeading}>1. Information we collect</h2>
        <p style={bodyText}>
          When you submit our contact form, we collect the following:
        </p>
        <ul
          style={{
            ...bodyText,
            paddingLeft: 20,
            display: "grid",
            gap: 6,
          }}
        >
          <li>Name (first and last)</li>
          <li>Work email address</li>
          <li>Phone number (optional)</li>
          <li>Job title (optional)</li>
          <li>Company name</li>
          <li>Industry</li>
          <li>Company size</li>
          <li>Country</li>
        </ul>
        <p style={bodyText}>
          We do not use cookies for tracking. We do not collect analytics or
          behavioural data through third-party scripts.
        </p>

        {/* 2 */}
        <h2 style={sectionHeading}>2. How we use your information</h2>
        <p style={bodyText}>We use the information you provide solely to:</p>
        <ul
          style={{
            ...bodyText,
            paddingLeft: 20,
            display: "grid",
            gap: 6,
          }}
        >
          <li>Respond to your enquiry</li>
          <li>Schedule and conduct a meeting with our team</li>
          <li>Understand the context of your organisation so we can prepare for that conversation</li>
        </ul>

        {/* 3 */}
        <h2 style={sectionHeading}>3. How we process and store your data</h2>
        <p style={bodyText}>
          Contact form submissions are sent to our team via{" "}
          <strong>Resend</strong>, a transactional email service. The data is
          transmitted over encrypted connections (TLS) and is not stored in any
          external database beyond our email infrastructure.
        </p>
        <p style={bodyText}>
          We retain your information only for as long as necessary to fulfil the
          purpose for which it was collected. If an engagement does not proceed,
          we delete your data within 12 months of your last interaction with us.
        </p>

        {/* 4 */}
        <h2 style={sectionHeading}>4. Third-party sharing</h2>
        <p style={bodyText}>
          We do not sell, rent, or share your personal information with third
          parties for marketing purposes. Your data is only shared with the
          service providers strictly necessary to deliver our service (e.g. our
          email provider), and only to the extent required.
        </p>

        {/* 5 */}
        <h2 style={sectionHeading}>5. Your rights</h2>
        <p style={bodyText}>You have the right to:</p>
        <ul
          style={{
            ...bodyText,
            paddingLeft: 20,
            display: "grid",
            gap: 6,
          }}
        >
          <li>Request a copy of the personal data we hold about you</li>
          <li>Request correction or deletion of your data</li>
          <li>Withdraw consent at any time</li>
        </ul>
        <p style={bodyText}>
          To exercise any of these rights, email us at{" "}
          <a
            href="mailto:security@deployed.md"
            style={{ color: "var(--blue-700)", textDecoration: "underline" }}
          >
            security@deployed.md
          </a>
          .
        </p>

        {/* 6 */}
        <h2 style={sectionHeading}>6. Security</h2>
        <p style={bodyText}>
          We take reasonable technical and organisational measures to protect
          your personal information from unauthorised access, loss, or misuse.
          All data is transmitted over encrypted connections.
        </p>

        {/* 7 */}
        <h2 style={sectionHeading}>7. Changes to this policy</h2>
        <p style={bodyText}>
          We may update this policy from time to time. Changes will be posted on
          this page with an updated revision date. We encourage you to review
          this policy periodically.
        </p>

        {/* 8 */}
        <h2 style={sectionHeading}>8. Contact</h2>
        <p style={bodyText}>
          If you have questions about this policy or how we handle your data,
          contact us at{" "}
          <a
            href="mailto:security@deployed.md"
            style={{ color: "var(--blue-700)", textDecoration: "underline" }}
          >
            security@deployed.md
          </a>
          .
        </p>
      </section>

      <CompactFooter />
    </div>
  );
}
