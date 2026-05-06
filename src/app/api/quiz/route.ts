import { NextResponse } from "next/server";
import { quizSchema } from "@/lib/validations/quiz";
import { getQuizResult } from "@/lib/utils/quiz-logic";
import { resend, NOTIFICATION_EMAIL } from "@/lib/resend/client";
import { buildQuizLeadEmail } from "@/lib/resend/templates";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = quizSchema.parse(body);
    const result = getQuizResult(data);

    if (resend) {
      await resend.emails.send({
        from: "Golf Sim Gurus <onboarding@resend.dev>",
        to: NOTIFICATION_EMAIL,
        subject: `Quiz Lead: ${data.name} — ${result.monitor} (${result.tier})`,
        html: buildQuizLeadEmail(data, result),
      });
    } else {
      console.log("RESEND_API_KEY not set — quiz lead logged:", {
        name: data.name,
        email: data.email,
        result: result.monitor,
        tier: result.tier,
      });
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Quiz submission error:", error);
    return NextResponse.json(
      { error: "Invalid submission" },
      { status: 400 }
    );
  }
}
