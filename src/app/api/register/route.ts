import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * ⚠️ هذا المسار خاص فقط بنموذج "تحميل التقرير الفني" (lead magnet) —
 * لا علاقة له بمسار طلب الشراكة (/api/vetting) ولا يمر بأي مراجعة إدارية.
 * الاستجابة فورية دائمًا لأنها مجرد تسجيل اهتمام + إرسال تقرير عام،
 * وليست التزامًا أو قبول شراكة. requestId هنا معرّف تقني للطلب فقط،
 * وليس هوية "شريك".
 *
 * .env.local يحتاج:
 *   RESEND_API_KEY=...
 *   RESEND_FROM_EMAIL=reports@yourdomain.com   (لازم يكون دومين مفعّل على Resend)
 */

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REPORT_PUBLIC_PATH = "/technical-report.pdf";

interface RegisterBody {
  fullName?: string;
  email?: string;
  phone?: string;
}

export async function POST(req: NextRequest) {
  let body: RegisterBody;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "الطلب غير صالح (JSON تالف)" }, { status: 400 });
  }

  const fullName = body.fullName?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim();

  if (!fullName || fullName.length < 2) {
    return NextResponse.json({ error: "الاسم الكامل مطلوب" }, { status: 400 });
  }
  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "بريد إلكتروني غير صالح" }, { status: 400 });
  }
  if (!phone || phone.length < 8) {
    return NextResponse.json({ error: "رقم جوال غير صالح" }, { status: 400 });
  }
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY غير مضبوط في .env.local");
    return NextResponse.json({ error: "إعداد البريد غير مكتمل على السيرفر" }, { status: 500 });
  }

  const requestId = crypto.randomUUID();

  // TODO (إنتاج): خزّن fullName/email/phone/requestId في جدول leads بقاعدة
  // البيانات (نفس أسلوب vetting_requests) عشان تقدر تتابعهم لاحقًا بدل ما
  // تعتمد فقط على البريد. حاليًا نكتفي بتسجيلها بالـ log.
  console.log(`[register] lead جديد: ${fullName} / ${email} / ${phone} (requestId=${requestId})`);

  const fromAddress = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  // تحذير مبكر: عنوان resend.dev التجريبي يقدر يرسل فقط للإيميل المسجّل
  // بحساب Resend نفسه. لو شفت هذا التحذير بالـ logs والبريد ما يوصل،
  // السبب غالبًا هنا وليس بالكود — فعّل دومين حقيقي بـ Resend Dashboard.
  if (fromAddress === "onboarding@resend.dev") {
    console.warn(
      `[register] يُستخدم عنوان Resend التجريبي (sandbox). البريد لن يصل لأي` +
        ` مستلم غير الإيميل المسجّل بحساب Resend. فعّل دومينك في Resend > Domains` +
        ` واضبط RESEND_FROM_EMAIL على Vercel.`
    );
  }

  // إرسال البريد لا يمنع نجاح العملية لو فشل — نسجل الخطأ ونكمل، لأن
  // المستخدم أصلاً راح يشوف التقرير مباشرة بالنافذة المنبثقة ويقدر
  // يحمّله من هناك حتى لو تعطّل البريد.
  let emailSent = false;
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nexusengine.ai";
    const reportLink = `${siteUrl}${REPORT_PUBLIC_PATH}`;

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: email,
      subject: "تقريرك الفني من Nexus Engine",
      html: `
        <div dir="rtl" style="font-family: sans-serif; line-height: 1.6;">
          <p>مرحبًا ${escapeHtml(fullName)}،</p>
          <p>شكرًا لاهتمامك بمنصة Nexus Engine. تقدر تحمّل التقرير الفني مباشرة من الرابط التالي:</p>
          <p><a href="${reportLink}">تحميل التقرير الفني (PDF)</a></p>
          <p style="color:#888; font-size:12px;">الرقم المرجعي للطلب: ${requestId}</p>
          <hr style="border:none; border-top:1px solid #eee; margin:20px 0;" />
          <p style="font-size:13px;">
            للعودة إلى منصة Nexus Engine في أي وقت:
            <a href="${siteUrl}">${siteUrl}</a>
          </p>
        </div>
      `,
    });

    // ⚠️ مهم: resend.emails.send() لا يرمي دائمًا استثناء عند الفشل —
    // أحيانًا يرجع { error } بهدوء (مثلاً دومين غير مفعّل). لازم نتحقق
    // من data.error صراحة، مو بس نعتمد على try/catch.
    if (error) {
      console.error(`[register] Resend رجع خطأ (requestId=${requestId}):`, error);
    } else {
      emailSent = true;
      console.log(`[register] تم إرسال البريد بنجاح (requestId=${requestId}, id=${data?.id})`);
    }
  } catch (emailErr) {
    console.error(`[register] استثناء أثناء إرسال البريد (requestId=${requestId}):`, emailErr);
  }

  return NextResponse.json(
    { success: true, requestId, reportUrl: REPORT_PUBLIC_PATH, emailSent },
    { status: 200 }
  );
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
