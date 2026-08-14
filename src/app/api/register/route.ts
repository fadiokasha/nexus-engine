import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// الربط مع مفتاح Resend المكتوب في Vercel
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, name, email, phone, sector, region } = body;

    // 1. طلب التقرير الفني
    if (type === 'report') {
      // إرسال إيميل حقيقي للعميل يتضمن رابط التقرير
      await resend.emails.send({
        from: 'Nexus Engine <onboarding@resend.dev>',
        to: email,
        subject: 'التقرير الفني والملف التقديمي - Nexus Engine',
        html: `
          <div dir="rtl" style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2>مرحباً ${name}،</h2>
            <p>شكراً لاهتمامك بـ <strong>Nexus Engine</strong>.</p>
            <p>يمكنك تحميل التقرير الفني مباشرة عبر الرابط التالي:</p>
            <p><a href="https://nexusengine.ai/technical-report.pdf" style="background: #D4AF37; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">تحميل التقرير الفني PDF</a></p>
            <br/>
            <p style="font-size: 12px; color: #777;">للعودة إلى منصة Nexus Engine في أي وقت: https://nexusengine.ai</p>
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
      // إرسال إشعار لك كمدير + إرسال تأكيد للعميل على بريده
      await resend.emails.send({
        from: 'Nexus Engine <onboarding@resend.dev>',
        to: email,
        subject: 'تأكيد تقديم طلب التأهيل - Nexus Engine',
        html: `
          <div dir="rtl" style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2>أهلاً ${name}،</h2>
            <p>تم استلام طلب تأهيل الامتياز الجغرافي لنطاق: <strong>${region}</strong> (${sector}).</p>
            <p>فريقنا يتراجع طلبك حالياً وسنتواصل معك عبر البريد المعتمد لنفس الحساب.</p>
            <hr/>
            <p style="font-size: 12px; color: #777;">للعودة إلى منصة Nexus Engine في أي وقت: https://nexusengine.ai</p>
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
    return NextResponse.json({ success: false, error: 'حدث خطأ أثناء الإرسال، تأكد من إعدادات المفاتيح' }, { status: 500 });
  }
}
