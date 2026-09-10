import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactForm {
  email: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  phone: string;
  company: string;
  industry: string;
  companySize: string;
  country: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactForm = await req.json();

    const { email, firstName, lastName, jobTitle, phone, company, industry, companySize, country } = body;

    if (!email || !firstName || !lastName || !company || !industry || !companySize || !country) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Deployed.md Contact <noreply@deployed.md>",
      to: "contact@deployed.md",
      replyTo: email,
      subject: `New enquiry from ${firstName} ${lastName} at ${company}`,
      html: `
        <h2>New Contact Request</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;">
          <tr><td style="padding:6px 12px;font-weight:600;">Name</td><td style="padding:6px 12px;">${firstName} ${lastName}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:600;">Email</td><td style="padding:6px 12px;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:6px 12px;font-weight:600;">Phone</td><td style="padding:6px 12px;">${phone || "—"}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:600;">Job title</td><td style="padding:6px 12px;">${jobTitle || "—"}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:600;">Company</td><td style="padding:6px 12px;">${company}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:600;">Industry</td><td style="padding:6px 12px;">${industry}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:600;">Company size</td><td style="padding:6px 12px;">${companySize}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:600;">Country</td><td style="padding:6px 12px;">${country}</td></tr>
        </table>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
