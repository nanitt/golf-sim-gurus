import type { QuizFormValues } from "@/lib/validations/quiz";
import type { ContactFormValues } from "@/lib/validations/contact";
import type { QuizResult } from "@/types";

export function buildQuizLeadEmail(
  data: QuizFormValues,
  result: QuizResult
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #32373c; margin: 0; padding: 0; background: #f8f7f5; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
    .header { background: #1a3d2e; color: #ffffff; padding: 24px 32px; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 600; }
    .badge { display: inline-block; background: #c9a959; color: #1a3d2e; padding: 4px 12px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-top: 8px; }
    .content { padding: 32px; }
    .section { margin-bottom: 24px; }
    .section h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #1a3d2e; margin: 0 0 12px 0; }
    .field { margin-bottom: 8px; }
    .field .label { font-size: 12px; color: #5a5f64; text-transform: uppercase; }
    .field .value { font-size: 15px; color: #32373c; font-weight: 500; }
    .recommendation { background: #f8f7f5; border-left: 3px solid #c9a959; padding: 16px 20px; margin: 24px 0; }
    .recommendation h3 { margin: 0 0 4px 0; font-size: 18px; color: #1a3d2e; }
    .recommendation .tier { font-size: 12px; color: #c9a959; text-transform: uppercase; font-weight: 600; }
    .recommendation .budget { font-size: 14px; color: #32373c; margin-top: 8px; }
    .footer { padding: 16px 32px; font-size: 12px; color: #5a5f64; border-top: 1px solid #f0efed; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Quiz Lead</h1>
      <div class="badge">Simulator Finder</div>
    </div>
    <div class="content">
      <div class="section">
        <h2>Contact Info</h2>
        <div class="field"><span class="label">Name:</span> <span class="value">${data.name}</span></div>
        <div class="field"><span class="label">Email:</span> <span class="value">${data.email}</span></div>
        ${data.phone ? `<div class="field"><span class="label">Phone:</span> <span class="value">${data.phone}</span></div>` : ""}
        ${data.notes ? `<div class="field"><span class="label">Notes:</span> <span class="value">${data.notes}</span></div>` : ""}
      </div>

      <div class="section">
        <h2>Quiz Answers</h2>
        <div class="field"><span class="label">Primary Goal:</span> <span class="value">${data.primary_goal}</span></div>
        <div class="field"><span class="label">Room Dimensions:</span> <span class="value">${data.room_width}' W × ${data.room_depth}' D × ${data.ceiling_height}' H</span></div>
        <div class="field"><span class="label">Priorities:</span> <span class="value">${data.priorities.join(", ")}</span></div>
      </div>

      <div class="recommendation">
        <div class="tier">${result.tier} Tier</div>
        <h3>${result.monitor}</h3>
        <div class="budget">${result.estimatedBudget}</div>
      </div>
    </div>
    <div class="footer">
      Golf Sim Gurus — Automated lead from golfsimulators.ca
    </div>
  </div>
</body>
</html>`;
}

export function buildContactLeadEmail(data: ContactFormValues): string {
  const hasProjectDetails = data.project_stage || data.space_type || data.room_width || data.timeline || data.budget;
  const hasDimensions = data.room_width && data.room_depth && data.ceiling_height;
  const hasQuizContext = data.source === "quiz" && data.quiz_tier && data.quiz_monitor;

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #32373c; margin: 0; padding: 0; background: #f8f7f5; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
    .header { background: #1a3d2e; color: #ffffff; padding: 24px 32px; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 600; }
    .badge { display: inline-block; background: #c9a959; color: #1a3d2e; padding: 4px 12px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-top: 8px; }
    .content { padding: 32px; }
    .section { margin-bottom: 24px; }
    .section h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #1a3d2e; margin: 0 0 12px 0; }
    .field { margin-bottom: 8px; }
    .field .label { font-size: 12px; color: #5a5f64; text-transform: uppercase; }
    .field .value { font-size: 15px; color: #32373c; font-weight: 500; }
    .message-box { background: #f8f7f5; padding: 16px 20px; border-left: 3px solid #1a3d2e; margin: 16px 0; font-size: 14px; line-height: 1.6; }
    .quiz-context { background: #f0faf5; border-left: 3px solid #c9a959; padding: 16px 20px; margin: 16px 0; }
    .quiz-context h3 { margin: 0 0 4px 0; font-size: 14px; color: #1a3d2e; text-transform: uppercase; letter-spacing: 1px; }
    .quiz-context .value { font-size: 16px; color: #1a3d2e; font-weight: 600; }
    .quiz-context .tier { font-size: 12px; color: #c9a959; text-transform: uppercase; font-weight: 600; }
    .footer { padding: 16px 32px; font-size: 12px; color: #5a5f64; border-top: 1px solid #f0efed; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Lead</h1>
      <div class="badge">${data.source === "quiz" ? "Quiz → Contact" : data.source === "homepage" ? "Homepage Form" : "Contact Form"}</div>
    </div>
    <div class="content">
      <div class="section">
        <h2>Contact Info</h2>
        <div class="field"><span class="label">Name:</span> <span class="value">${data.name}</span></div>
        <div class="field"><span class="label">Email:</span> <span class="value">${data.email}</span></div>
        ${data.phone ? `<div class="field"><span class="label">Phone:</span> <span class="value">${data.phone}</span></div>` : ""}
      </div>

      ${hasProjectDetails ? `
      <div class="section">
        <h2>Project Details</h2>
        ${data.project_stage ? `<div class="field"><span class="label">Project Stage:</span> <span class="value">${data.project_stage}</span></div>` : ""}
        ${data.space_type ? `<div class="field"><span class="label">Space Type:</span> <span class="value">${data.space_type}</span></div>` : ""}
        ${hasDimensions ? `<div class="field"><span class="label">Room Dimensions:</span> <span class="value">${data.room_width} W × ${data.room_depth} D × ${data.ceiling_height} H</span></div>` : ""}
        ${data.timeline ? `<div class="field"><span class="label">Timeline:</span> <span class="value">${data.timeline}</span></div>` : ""}
        ${data.budget ? `<div class="field"><span class="label">Budget Range:</span> <span class="value">${data.budget}</span></div>` : ""}
      </div>
      ` : ""}

      ${hasQuizContext ? `
      <div class="quiz-context">
        <h3>Quiz Recommendation</h3>
        <div class="tier">${data.quiz_tier} Package</div>
        <div class="value">${data.quiz_monitor}</div>
      </div>
      ` : ""}

      <div class="section">
        <h2>Message</h2>
        <div class="message-box">${data.message}</div>
      </div>
    </div>
    <div class="footer">
      Golf Sim Gurus — Automated lead from golfsimulators.ca
    </div>
  </div>
</body>
</html>`;
}
