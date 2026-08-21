import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userEmail = body.email || body.userEmail;
    const userName = body.name || body.userName || 'شريك جديد';
    const phone = body.phone || 'غير محدد';
    const passportNo = body.passportNo || 'غير محدد';
    const region = body.region || 'مصر / الشرق الأوسط';
    const sectors = Array.isArray(body.sectors) ? body.sectors.join(', ') : (body.sector || 'غير محدد');
    const fee = body.fee || 'غير محدد';
    const type = body.type || 'qualification';

    const isQualification = type === 'qualification';
    const pdfUrl = 'https://nexus-engine-v6.vercel.app/technical-report.pdf';
    const platformUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexus-engine-v6.vercel.app';

    const emailSubject = isQualification 
      ? 'تأكيد تسجيل طلب التأهيل ومسودة الاتفاقية - Nexus Engine' 
      : 'التقرير الفني والملف التقديمي - Nexus Engine';

    // 1. إرسال إشعار الإدارة التنفيذي (جدول منظم)
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right; background-color: #0c1019; color: #ffffff; padding: 25px; border-radius: 12px; border: 1px solid #D4AF37;">
        <h2 style="color: #D4AF37; margin-bottom: 20px;">📥 طلب جديد على المنصة (${isQualification ? 'حجز ترخيص $600' : 'تقرير فني'})</h2>
        <table style="width: 100%; border-collapse: collapse; color: #ffffff; text-align: right;">
          <tr style="border-bottom: 1px solid #222;">
            <td style="padding: 10px; font-weight: bold; color: #D4AF37;">اسم المتقدم:</td>
            <td style="padding: 10px;">${userName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #222;">
            <td style="padding: 10px; font-weight: bold; color: #D4AF37;">البريد الإلكتروني:</td>
            <td style="padding: 10px;">${userEmail}</td>
          </tr>
          <tr style="border-bottom: 1px solid #222;">
            <td style="padding: 10px; font-weight: bold; color: #D4AF37;">رقم الهاتف:</td>
            <td style="padding: 10px;">${phone}</td>
          </tr>
          ${isQualification ? `
          <tr style="border-bottom: 1px solid #222;">
            <td style="padding: 10px; font-weight: bold; color: #D4AF37;">رقم جواز السفر:</td>
            <td style="padding: 10px;">${passportNo}</td>
          </tr>
          <tr style="border-bottom: 1px solid #222;">
            <td style="padding: 10px; font-weight: bold; color: #D4AF37;">القطاعات المختارة:</td>
            <td style="padding: 10px;">${sectors}</td>
          </tr>
          <tr style="border-bottom: 1px solid #222;">
            <td style="padding: 10px; font-weight: bold; color: #D4AF37;">رسوم التأسيس:</td>
            <td style="padding: 10px;">${fee}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #D4AF37;">النطاق المطلوب:</td>
            <td style="padding: 10px;">${region}</td>
          </tr>
        </table>
        <hr style="border-color: #333; margin: 20px 0;" />
        <p style="color: #888; font-size: 13px;">💡 للرد المباشر على هذا المتقدم، اضغط على زر "الرد (Reply)" في بريدك الإلكتروني.</p>
      </div>
    `;

    await resend.emails.send({
      from: 'Nexus Engine <onboarding@resend.dev>',
      to: 'nexusengine.v6@gmail.com',
      replyTo: userEmail,
      subject: `📥 طلب جديد (${isQualification ? 'ترخيص $600' : 'تقرير فني'}): ${userName}`,
      html: adminHtml,
    });

    // فاصل زمني (1 ثانية) للالتزام بحدود Rate Limit لـ Resend
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 2. إيميل العميل المباشر
    const clientHtml = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0b0f17; color: #ffffff; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #0f172a; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; }
          .header { background-color: #090d16; padding: 30px; text-align: center; border-bottom: 1px solid #1e293b; }
          .title { color: #D4AF37; font-size: 24px; font-weight: bold; margin: 0; }
          .subtitle { color: #94a3b8; font-size: 13px; margin-top: 5px; }
          .content { padding: 30px; }
          .welcome { font-size: 18px; font-weight: bold; color: #ffffff; margin-bottom: 15px; }
          .main-btn { display: inline-block; background: linear-gradient(135deg, #D4AF37, #AA771C); color: #000000; font-weight: bold; padding: 12px 30px; border-radius: 8px; text-decoration: none; }
          .footer { background-color: #090d16; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="title">NEXUS ENGINE</div>
            <div class="subtitle">منظومة إدارة الأصول الرقمية المؤتمتة</div>
          </div>
          <div class="content">
            <div class="welcome">أهلاً بك <span style="color: #D4AF37;">${userName}</span></div>
            <div style="background: #0f1420; border-right: 4px solid #D4AF37; padding: 15px; border-radius: 8px; margin: 20px 0; font-size: 14px; line-height: 1.6;">
              ${isQualification 
                ? 'تم تسجيل طلب حجز الترخيص ومسودة العقد بنجاح. جاري مراجعة إشعار التحويل البنكي والتأهيل من قبل الفريق المختص.' 
                : 'تم اعتماد طلبك لاستعراض التقرير الفني والملف التقديمي للمنظومة بنجاح.'}
            </div>
            ${!isQualification ? `
            <div style="text-align: center; margin: 25px 0;">
              <a href="${pdfUrl}" target="_blank" class="main-btn">📄 تحميل التقرير الفني PDF</a>
            </div>
            ` : ''}
            <div style="text-align: center; margin-top: 20px;">
              <a href="${platformUrl}" style="color: #94a3b8; text-decoration: none; font-size: 12px;">العودة إلى المنصة الرئيسية</a>
            </div>
          </div>
          <div class="footer">© 2026 NEXUS ENGINE. جميع الحقوق محفوظة.</div>
        </div>
      </body>
      </html>
    `;

    await resend.emails.send({
      from: 'Nexus Engine <onboarding@resend.dev>',
      to: [userEmail],
      subject: emailSubject,
      html: clientHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
