import { NextResponse } from "next/server";
import { transporter } from "@/lib/email";
import * as z from "zod";

const enquirySchema = z.object({
  name: z.string().min(2),
  designation: z.string().optional(),
  company: z.string().min(2),
  email: z.string().email(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().min(1),
  phone: z.string().min(7),
  query: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = enquirySchema.parse(body);

    const {
      name,
      designation,
      company,
      email,
      address,
      city,
      country,
      phone,
      query,
    } = validatedData;

    // Formatting Email contents
    const mailOptions = {
      from: process.env.SMTP_USER || "mahavirvalves@gmail.com",
      to: process.env.SMTP_TO || "mahavirvalves@gmail.com",
      subject: `New Enquiry from ${company} — ${name} — Swastik Valves`,
      html: `
        <h2>New Business Enquiry Received</h2>
        <table border="1" cellpadding="6" style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td><strong>Name</strong></td>
            <td>${name}</td>
          </tr>
          <tr>
            <td><strong>Designation</strong></td>
            <td>${designation || "Not Provided"}</td>
          </tr>
          <tr>
            <td><strong>Company</strong></td>
            <td>${company}</td>
          </tr>
          <tr>
            <td><strong>Email</strong></td>
            <td>${email}</td>
          </tr>
          <tr>
            <td><strong>Contact No.</strong></td>
            <td>${phone}</td>
          </tr>
          <tr>
            <td><strong>City</strong></td>
            <td>${city || "Not Provided"}</td>
          </tr>
          <tr>
            <td><strong>Country</strong></td>
            <td>${country}</td>
          </tr>
          <tr>
            <td><strong>Address</strong></td>
            <td>${address || "Not Provided"}</td>
          </tr>
          <tr>
            <td><strong>Inquiry Detail</strong></td>
            <td>${query.replace(/\n/g, "<br/>")}</td>
          </tr>
        </table>
      `,
    };

    // Auto-Reply options
    const autoReplyOptions = {
      from: process.env.SMTP_USER || "mahavirvalves@gmail.com",
      to: email,
      subject: "We received your enquiry — Swastik Valves India",
      text: `Dear ${name},

Thank you for your enquiry. We have received your message and our team will get back to you within 24 hours.

Swastik Valves India
Corporate Office: Plot. 1240, St. No: 41, Janta Nagar, Jaimal Road, Ludhiana - 141003, Punjab (INDIA)
Tel: +91-161-2503914 | Mobile: +91-98156-52779
Email: mahavirvalves@gmail.com`,
    };

    // Send emails if SMTP credentials are set
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail(mailOptions);
      await transporter.sendMail(autoReplyOptions);
    } else {
      console.warn("SMTP credentials not configured. Simulating successful send.");
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Enquiry form API error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : "Failed to process enquiry";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
