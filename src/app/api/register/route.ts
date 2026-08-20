import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userEmail = body.userEmail || body.email;
    const userName = body.userName || body.name;
    const phone = body.phone || body.userPhone || 'غير محدد';
    const sector = body.sector || 'غير محدد';
    const region = body.region || 'غير محدد';
    const pdfDownloadUrl = body.pdfDownloadUrl;
    const type = body.type || body.formType;

    const pdfUrl = pdfDownloadUrl || 'https://nexus-engine-v6.vercel.app/technical-report.pdf';
    const platformUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexus-engine-v6.vercel.app';
    const isQualification = type === 'qualification';

    const emailSubject = isQualification 
      ? 'تأكيد تسجيل طلب التأهيل ومسودة الاتفاقية - Nexus Engine' 
      : 'التقرير الفني والملف التقديمي - Nexus Engine';

    const emailText = isQualification
      ? 'تم استقبال طلب التأهيل والاعتماد بنجاح. جاري مراجعة طلبك من قبل الفريق المختص لمتابعة إجراءات الاعتماد.'
      : 'تم اعتماد طلب استعراض التقرير الفني والملف التقديمي بنجاح. تجد أدناه النص الكامل للتقرير المعتمد.';

    // 1. إرسال إشعار فوري لك (الآدمن) بكامل بيانات العميل
await resend.emails.send({
  from: 'Nexus Engine <onboarding@resend.dev>',
  to: 'nexusengine.v6@gmail.com', // البريد الجديد للاستلام
  replyTo: userEmail,
  subject: `📥 طلب جديد (${isQualification ? 'تأهيل' : 'تقرير فني'}): ${userName}`,
      html: `
        <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right; background-color: #0c1019; color: #ffffff; padding: 25px; border-radius: 10px; border: 1px solid #D4AF37;">
          <h2 style="color: #D4AF37; margin-bottom: 20px;">بيانات الطلب الجديد</h2>
          <p><strong>اسم الشريك المتقدم:</strong> ${userName}</p>
          <p><strong>البريد الإلكتروني:</strong> ${userEmail}</p>
          <p><strong>رقم الهاتف:</strong> ${phone}</p>
          <p><strong>النطاق المطلوب:</strong> ${region}</p>
          <p><strong>القطاع:</strong> ${sector}</p>
          <p><strong>نوع الطلب:</strong> ${isQualification ? 'طلب تأهيل واعتماد' : 'طلب تقرير فني'}</p>
          <hr style="border-color: #333; margin: 20px 0;" />
          <p style="color: #888; font-size: 13px;">💡 للرد على هذا العميل مباشرة، اضغط على زر "الرد (Reply)" في بريدك.</p>
        </div>
      `,
    });

    // 2. إيميل العميل الأصلي الكامل
    const emailHtml = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0b0f17; color: #ffffff; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #0f172a; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; }
        .header { background-color: #090d16; padding: 30px; text-align: center; border-bottom: 1px solid #1e293b; }
        .title { color: #f59e0b; font-size: 24px; font-weight: bold; margin: 0; letter-spacing: 1px; }
        .subtitle { color: #94a3b8; font-size: 13px; margin-top: 5px; }
        .content { padding: 30px; }
        .welcome { font-size: 20px; font-weight: bold; color: #ffffff; margin-bottom: 15px; }
        
        .report-box { background-color: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 20px; margin: 25px 0; }
        .section-title { color: #f59e0b; font-size: 15px; font-weight: bold; margin-top: 15px; margin-bottom: 5px; }
        .section-desc { color: #94a3b8; font-size: 13px; line-height: 1.6; margin: 0; }
        
        .download-box { background-color: #182234; border: 1px dashed #f59e0b; border-radius: 12px; padding: 20px; text-align: center; margin-top: 30px; margin-bottom: 25px; }
        .download-text { color: #e2e8f0; font-size: 14px; font-weight: 500; margin-bottom: 12px; }
        .download-link { display: inline-block; background-color: #10172a; color: #f59e0b; border: 1px solid #f59e0b; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; }
        
        .btn-container { text-align: center; margin-top: 15px; margin-bottom: 25px; }
        .main-btn { display: inline-block; background: linear-gradient(135deg, #D4AF37, #AA771C); color: #000000; font-weight: bold; padding: 12px 30px; border-radius: 8px; text-decoration: none; }
        
        .footer { background-color: #090d16; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="title" style="color: #D4AF37;">NEXUS ENGINE</div>
          <div class="subtitle">منظومة إدارة الأصول الرقمية المؤتمتة</div>
        </div>

        <div class="content">
          <div class="welcome">أهلاً بك <span style="color: #D4AF37;">${userName || 'Fadi Azhari'}</span></div>
          <div style="background: #0f1420; border: 1px solid rgba(212, 175, 55, 0.25); border-right: 4px solid #D4AF37; border-radius: 12px; padding: 20px; margin: 25px 0; text-align: right;">
            <p style="color: #e5e7eb; font-size: 15px; line-height: 1.8; margin: 0; font-weight: 500;">
              ${emailText}
            </p>
          </div>

          <div class="report-box" style="${isQualification ? 'display: none;' : ''}">
            <div class="section-title">1. النظرة العامة والمسارية التقنية</div>
            <p class="section-desc">منظومة برمجية متكاملة لإدارة وتأهيل الأصول الرقمية المؤتمتة، حيث توفر بنية تحتية سحابية هجينة تعتمد على خوارزميات الذكاء الاصطناعي لمعالجة البيانات والتفاعلات دون الحاجة لإدارة تشغيلية بشرية يومية.</p>

            <div class="section-title">2. محرك الأتمتة والسيادة التشغيلية</div>
            <p class="section-desc">يتولى النظام الآلي معالجة طلبات النطاق المخصص، ربط قواعد البيانات، وتنفيذ بروتوكولات الأمان والحماية الذاتية. يحصل المرخص له على صلاحية متابعة الأداء ومراقبة المؤشرات عبر لوحة تحكم تحليلية متطورة.</p>

            <div class="section-title">3. نموذج توزيع العوائد والاستحقاق المالي</div>
            <p class="section-desc">يعتمد النظام نموذج مشاركة صافي العوائد بنسبة 80% للشريك الاستراتيجي مقابل 20% للمنصة لتغطية الرسوم التشغيلية والتطوير البرمجي واستدامة الخوادم دورياً.</p>

            <div class="section-title">4. سياسة الحصرية الإقليمية والتخصيص</div>
            <p class="section-desc">تضمن المنصة حصرية النطاق الجغرافي المسجل لكل مرخص له لمنع التضارب التشغيلي، وتستمر الحصرية طوال فترة سريان ترخيص الامتياز المعتمد.</p>
          </div>

          <div class="download-box" style="${isQualification ? 'display: none;' : ''}">
            <div class="download-text">يمكنك تحميل التقرير الفني مباشرة عبر الرابط التالي:</div>
            <a href="${pdfUrl}" target="_blank" download class="download-link">
              📄 تحميل التقرير الفني PDF
            </a>
          </div>

          <div class="btn-container">
            <a href="${platformUrl}" class="main-btn">العودة إلى المنصة الرئيسية</a>
          </div>
        </div>

        <div class="footer">
          © 2026 NEXUS ENGINE. جميع الحقوق محفوظة.
        </div>
      </div>
    </body>
    </html>
    `;

    // 3. إرسال البريد للعميل
    const data = await resend.emails.send({
      from: 'Nexus Engine <onboarding@resend.dev>',
      to: [userEmail],
      subject: emailSubject,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
