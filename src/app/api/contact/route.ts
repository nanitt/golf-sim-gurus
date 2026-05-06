import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { resend, NOTIFICATION_EMAIL } from "@/lib/resend/client";
import { buildContactLeadEmail } from "@/lib/resend/templates";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    if (resend) {
      await resend.emails.send({
        from: "Golf Sim Gurus <onboarding@resend.dev>",
        to: NOTIFICATION_EMAIL,
        subject: `Contact Lead: ${data.name}${data.project_stage ? ` (${data.project_stage})` : ""}`,
        html: buildContactLeadEmail(data),
      });
    } else {
      console.log("RESEND_API_KEY not set — contact lead logged:", {
        name: data.name,
        email: data.email,
        message: data.message.slice(0, 100),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { error: "Invalid submission" },
      { status: 400 }
    );
  }
}
