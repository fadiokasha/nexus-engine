import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, name, email, phone, sector, region } = body;

    // جلب رابط الموقع الشغال حالياً تلقائياً لتفادي خطأ النطاق
    const host = request.headers.get('host') || 'nexus-engine-v6.vercel.app';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;

    // 1. طلب التقرير الفني
    if (type === 'report') {
      await resend.emails.send({
        from: 'Nexus Engine <onboarding@resend.dev>',
        to: email,
        subject: 'التقرير الفني والملف التقديمي - Nexus Engine',
        html: `
          <div dir="rtl" style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2>مرحباً ${name}،</h2>
            <p>شكراً لاهتمامك بـ <strong>Nexus Engine</strong>.</p>
            <p>يمكنك تحميل التقرير الفني مباشرة عبر الرابط التالي:</p>
            <p><a href="${baseUrl}/technical-report.pdf" style="background: #D4AF37; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">تحميل التقرير الفني PDF</a></p>
            <br/>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #777;">للعودة إلى منصة Nexus Engine في أي وقت: <a href="${baseUrl}">${baseUrl}</a></p>
          </div>
        `,
      });

      return NextResponse.json({
        success: true,
        pdfUrl: '/technical-report.pdf',
        message: `تم إرسال التقرير بنجاح إلى بريدك (${email})`
      });
    }

    // 2. طلب التأهيل للإمتياز الجغرافي
    if (type === 'qualification') {
      await resend.emails.send({
        from: 'Nexus Engine <onboarding@resend.dev>',
        to: email,
        subject: 'تأكيد تقديم طلب التأهيل - Nexus Engine',
        html: `
          <div dir="rtl" style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2>أهلاً ${name}،</h2>
            <p>تم استلام طلب تأهيل الامتياز الجغرافي لنطاق: <strong>${region}</strong> (${sector}).</p>
            <p>فريقنا <strong>يراجع</strong> طلبك حالياً وسنتواصل معك عبر البريد المعتمد لنفس الحساب.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #777;">للعودة إلى منصة Nexus Engine في أي وقت: <a href="${baseUrl}">${baseUrl}</a></p>
          </div>
        `,
      });

      return NextResponse.json({
        success: true,
        message: 'تم حفظ البيانات وإرسال التأكيد إلى بريدك الإلكتروني.'
      });
    }

    return NextResponse.json({ success: false, error: 'نوع الطلب غير مدعوم' }, { status: 400 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'حدث خطأ أثناء الإرسال' }, { status: 500 });
  }
}
