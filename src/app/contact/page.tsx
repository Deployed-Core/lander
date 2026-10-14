"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

const industries = [
  "Healthcare & hospitality",
  "Supply chain",
  "Manufacturing",
  "Utilities",
  "Financial services",
  "Other",
];
const companySizes = ["1–50", "51–250", "251–1,000", "1,001–5,000", "5,000+"];
const countries = [
  "United States",
  "United Kingdom",
  "India",
  "Singapore",
  "United Arab Emirates",
  "Australia",
  "Germany",
  "Other",
];

type FormState = {
  email: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  phone: string;
  company: string;
  industry: string;
  companySize: string;
  country: string;
};

const emptyForm: FormState = {
  email: "",
  firstName: "",
  lastName: "",
  jobTitle: "",
  phone: "",
  company: "",
  industry: "",
  companySize: "",
  country: "",
};

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="new-contact-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

export default function NewContactPage() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const update = (key: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((current) => ({ ...current, [key]: event.target.value }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Failed to send");
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSending(false);
    }
  };

  const selectStyle = { backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236c7486' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")` };

  return (
    <main className="new-contact-page">
      <SiteNav tone="navy-solid" showCta={false} />

      <section className="new-contact-layout">
        <header className="new-contact-intro">
          <div className="new-contact-intro-inner">
            <h1>Applied AI for the enterprise</h1>
            <p className="new-contact-lede">
              We build custom AI systems around how your organisation already operates — then hand them over. No lock-in, no dependency.
            </p>

            <div className="new-contact-direct">
              <a href="mailto:info@deployed.md">info@deployed.md</a>
              <a href="mailto:security@deployed.md">security@deployed.md</a>
            </div>
          </div>
        </header>

        <section className="new-contact-form-side" aria-labelledby="contact-form-title">
          <div className="new-contact-form-wrap">
            {sent ? (
              <div className="new-contact-success" role="status">
                <div className="new-contact-success-mark" aria-hidden="true">✓</div>
                <h2>Request received</h2>
                <p>We will be in touch within one working day.</p>
                <button className="new-contact-reset" type="button" onClick={() => { setForm(emptyForm); setSent(false); }}>
                  Send another
                </button>
              </div>
            ) : (
              <>
                <div className="new-contact-form-heading">
                  <h2 id="contact-form-title">Set a meeting with our team</h2>
                  <p>Fill in the form and we will get back to you within one working day.</p>
                </div>

                <form className="new-contact-form" onSubmit={handleSubmit}>
                  <FormField label="Work email">
                    <input type="email" autoComplete="email" required placeholder="you@company.com" value={form.email} onChange={update("email")} />
                  </FormField>
                  <div className="new-contact-row">
                    <FormField label="First name"><input required autoComplete="given-name" value={form.firstName} onChange={update("firstName")} /></FormField>
                    <FormField label="Last name"><input required autoComplete="family-name" value={form.lastName} onChange={update("lastName")} /></FormField>
                  </div>
                  <div className="new-contact-row">
                    <FormField label="Job title"><input autoComplete="organization-title" value={form.jobTitle} onChange={update("jobTitle")} /></FormField>
                    <FormField label="Phone number"><input type="tel" autoComplete="tel" value={form.phone} onChange={update("phone")} /></FormField>
                  </div>
                  <div className="new-contact-row">
                    <FormField label="Company"><input required autoComplete="organization" value={form.company} onChange={update("company")} /></FormField>
                    <FormField label="Industry">
                      <select required value={form.industry} onChange={update("industry")} style={selectStyle}>
                        <option value="" disabled>Select industry</option>
                        {industries.map((item) => <option key={item}>{item}</option>)}
                      </select>
                    </FormField>
                  </div>
                  <div className="new-contact-row">
                    <FormField label="Company size">
                      <select required value={form.companySize} onChange={update("companySize")} style={selectStyle}>
                        <option value="" disabled>Select size</option>
                        {companySizes.map((item) => <option key={item}>{item}</option>)}
                      </select>
                    </FormField>
                    <FormField label="Country">
                      <select required value={form.country} onChange={update("country")} style={selectStyle}>
                        <option value="" disabled>Select country</option>
                        {countries.map((item) => <option key={item}>{item}</option>)}
                      </select>
                    </FormField>
                  </div>

                  {error && <p className="new-contact-error" role="alert">{error}</p>}
                  <button className="new-contact-submit" type="submit" disabled={sending}>
                    {sending ? "Sending…" : "Send"}<span aria-hidden="true">↗</span>
                  </button>
                </form>
              </>
            )}
          </div>
        </section>
        <footer className="new-contact-privacy">
          Your information stays private. Read our <Link href="/privacy">privacy policy</Link>.
        </footer>
      </section>
      <SiteFooter />

      <style>{`
        .new-contact-page { min-height: 100vh; background: var(--paper-050); color: var(--text-strong); }
        .new-contact-layout { display: grid; grid-template-columns: minmax(320px, .9fr) minmax(0, 1.1fr); align-items: stretch; background: var(--blue-950) url("/assets/texture-navy.png") center/cover fixed; }
        .new-contact-intro { position: relative; display: flex; align-items: center; min-height: calc(100vh - 70px); padding: 60px clamp(24px, 6vw, 88px); color: var(--paper-050); background: rgba(0,5,30,.22); overflow: hidden; }
        .new-contact-intro::after { content: ""; position: absolute; width: 390px; height: 390px; right: 8%; top: 50%; transform: translateY(-50%); border: 1px solid rgba(122,165,239,.16); border-radius: 50%; box-shadow: 0 0 0 42px rgba(122,165,239,.035), 0 0 0 84px rgba(122,165,239,.025); pointer-events: none; }
        .new-contact-intro-inner, .new-contact-privacy { position: relative; z-index: 1; }
        .new-contact-intro-inner { max-width: 680px; margin: 0 auto; width: 100%; }
        .new-contact-kicker { color: var(--blue-500); font: var(--label); letter-spacing: var(--label-track); text-transform: uppercase; }
        .new-contact-intro h1 { max-width: 640px; margin-top: 18px; color: var(--paper-000); font: var(--display-2); letter-spacing: var(--display-track); }
        .new-contact-lede { max-width: 560px; margin: 16px 0 0; color: rgba(249,246,243,.76); font: var(--body-lg); }
        .new-contact-direct { display: flex; align-items: center; flex-wrap: wrap; gap: 16px; margin-top: 24px; }
        .new-contact-direct a { width: fit-content; color: var(--paper-000); font: var(--body-md); }
        .new-contact-privacy { grid-column: 1 / -1; padding: 18px 24px 24px; color: rgba(249,246,243,.58); font: var(--body-sm); text-align: center; background: rgba(0,5,30,.22); }
        .new-contact-privacy a { color: rgba(249,246,243,.84); text-decoration: underline; text-underline-offset: 3px; }
        .new-contact-form-side { display: flex; align-items: center; justify-content: center; padding: 28px clamp(20px, 3.5vw, 48px); background: rgba(0,5,30,.22); }
        .new-contact-form-wrap { width: 100%; max-width: 640px; padding: clamp(24px, 2.8vw, 34px); border: 1px solid rgba(255,255,255,.55); border-radius: var(--radius-lg); background: var(--paper-050); box-shadow: 0 24px 70px rgba(0,0,0,.22); }
        .new-contact-form-heading { margin-bottom: 22px; }
        .new-contact-form-heading h2, .new-contact-success h2 { margin-top: 12px; color: var(--text-strong); font: var(--display-3); letter-spacing: var(--display-track); }
        .new-contact-form-heading p, .new-contact-success > p { margin: 10px 0 0; color: var(--text-muted); font: var(--body-md); }
        .new-contact-form { display: grid; gap: 12px; }
        .new-contact-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .new-contact-field { display: grid; gap: 5px; min-width: 0; color: var(--text-body); font: var(--body-sm); }
        .new-contact-field input, .new-contact-field select { box-sizing: border-box; width: 100%; min-height: 40px; padding: 8px 12px; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); outline: none; background-color: var(--paper-000); color: var(--text-strong); font: var(--body-md); transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out); }
        .new-contact-field input:focus, .new-contact-field select:focus { border-color: var(--blue-500); box-shadow: 0 0 0 3px rgba(63,122,224,.13); }
        .new-contact-field select { appearance: none; background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px; }
        .new-contact-submit { display: flex; justify-content: space-between; align-items: center; min-height: 46px; margin-top: 2px; padding: 0 18px; border: 0; border-radius: var(--radius-sm); background: var(--blue-950); color: var(--paper-000); cursor: pointer; font: var(--label); letter-spacing: var(--label-track); transition: background var(--dur-fast) var(--ease-out), opacity var(--dur-fast) var(--ease-out); }
        .new-contact-submit:hover { background: var(--blue-850); }
        .new-contact-submit:disabled { opacity: .65; cursor: wait; }
        .new-contact-submit span { font-size: 18px; }
        .new-contact-consent { margin: -7px 0 0; color: var(--text-muted); font: var(--body-sm); }
        .new-contact-error { margin: 0; color: var(--red-600); font: var(--body-sm); }
        .new-contact-success { padding: 36px 0; }
        .new-contact-success-mark { width: 54px; height: 54px; display: grid; place-items: center; margin-bottom: 28px; border-radius: 50%; background: rgba(63,122,224,.12); color: var(--blue-600); font-size: 26px; }
        .new-contact-reset { margin-top: 28px; padding: 12px 18px; border: 1px solid var(--border-strong); border-radius: var(--radius-pill); background: transparent; color: var(--text-strong); cursor: pointer; font: var(--label); }
        @media (max-width: 900px) { .new-contact-layout { grid-template-columns: 1fr; background-attachment: scroll; } .new-contact-intro { min-height: 340px; padding: 48px clamp(24px, 7vw, 56px); } .new-contact-intro-inner { margin: auto; } .new-contact-form-side { padding: 40px 24px 52px; } .new-contact-form-wrap { max-width: 640px; } }
        @media (max-width: 560px) { .new-contact-row { grid-template-columns: 1fr; gap: 18px; } .new-contact-intro h1 { font-size: clamp(38px, 11vw, 54px); } .new-contact-form-wrap { padding: 26px 20px; border-radius: var(--radius-md); } }
      `}</style>
    </main>
  );
}
