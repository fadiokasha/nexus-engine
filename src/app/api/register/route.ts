import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function capitalizeWords(str: string) {
  if (!str) return '';
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, name, email, phone, sector, region } = body;

    const formattedName = capitalizeWords(name);
    const formattedRegion = capitalizeWords(region || 'الشرق الأوسط وشمال أفريقيا');
    const formattedSector = sector || 'التجارة الإلكترونية والأنظمة اللوجستية';

    if (type === 'report') {
      // إرسال إيميل التقرير الفني
      await resend.emails.send({
        from: 'Nexus Engine <onboarding@resend.dev>',
        to: email,
        subject: 'التقرير الفني والملف التقديمي - Nexus Engine',
        html: `
          <div dir="rtl" style="font-family: Arial, sans-serif; background-color: #0b0e14; color: #ffffff; padding: 40px 20px; text-align: center;">
            <div style="max-width: 550px; margin: 0 auto; background-color: #121824; border: 1px solid rgba(212, 175, 55, 0.25); border-radius: 16px; padding: 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
              <h1 style="color: #D4AF37; font-size: 22px; margin-bottom: 8px; letter-spacing: 1px;">NEXUS ENGINE</h1>
              <p style="color: #94a3b8; font-size: 11px; margin-top: 0;">منظومة إدارة الأصول الرقمية المؤتمتة</p>
              <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.08); margin: 20px 0;" />
              
              <h2 style="font-size: 18px; color: #ffffff; margin-bottom: 16px;">أهلاً بك <span style="color: #D4AF37;">${formattedName}</span></h2>
              <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6; margin-bottom: 24px;">
                شكراً لاهتمامك بـ <strong>Nexus Engine</strong>. تم اعتماد طلب استعراض التقرير الفني والملف التقديمي بنجاح.
              </p>

              <div style="background-color: #07090e; border-right: 3px solid #D4AF37; padding: 16px; border-radius: 8px; text-align: right; margin-bottom: 24px;">
                <p style="font-size: 12px; color: #e2e8f0; margin: 0; line-height: 1.7;">
                  يمكنك متابعة تفاصيل النماذج والحلول البرمجية مباشرة عبر موقع المنصة في أي وقت.
                </p>
              </div>
              
              <a href="https://nexus-engine-v6-8wtc9q2f7-nexus-engine.vercel.app" style="display: inline-block; background: linear-gradient(135deg, #D4AF37 0%, #AA771C 100%); color: #000000; font-weight: bold; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-size: 14px; box-shadow: 0 4px 15px rgba(212,175,55,0.2);">
                العودة إلى المنصة الرئيسية
              </a>
              
              <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.08); margin: 30px 0 15px 0;" />
              <p style="font-size: 11px; color: #64748b;">
                © 2026 NEXUS ENGINE. جميع الحقوق محفوظة.
              </p>
            </div>
          </div>
        `,
      });

      return NextResponse.json({ success: true, message: 'تم إرسال التأكيد إلى بريدك الإلكتروني بنجاح' });
    } 
    
    if (type === 'qualification') {
      // إرسال إيميل طلب التأهيل
      await resend.emails.send({
        from: 'Nexus Engine <onboarding@resend.dev>',
        to: email,
        subject: 'تم استلام طلب التأهيل - Nexus Engine',
        html: `
          <div dir="rtl" style="font-family: Arial, sans-serif; background-color: #0b0e14; color: #ffffff; padding: 40px 20px; text-align: right;">
            <div style="max-width: 580px; margin: 0 auto; background-color: #121824; border: 1px solid rgba(212, 175, 55, 0.25); border-radius: 16px; padding: 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
              
              <div style="text-align: center; margin-bottom: 24px;">
                <h1 style="color: #D4AF37; font-size: 22px; margin: 0; letter-spacing: 1px;">NEXUS ENGINE</h1>
                <span style="font-size: 11px; color: #94a3b8;">تأهيل الامتياز الجغرافي والسيادة التشغيلية</span>
              </div>
              
              <p style="font-size: 16px; color: #ffffff;">أهلاً بك <span style="color: #D4AF37; font-weight: bold;">${formattedName}</span></p>
              
              <p style="font-size: 14px; color: #cbd5e1; line-height: 1.8;">
                تم استلام طلب تأهيل الامتياز الجغرافي لنطاق: <strong style="color: #ffffff; background-color: rgba(255,255,255,0.08); padding: 3px 8px; border-radius: 4px;">${formattedRegion}</strong> 
                قطاع: <strong style="color: #ffffff; background-color: rgba(255,255,255,0.08); padding: 3px 8px; border-radius: 4px;">${formattedSector}</strong>.
              </p>

              <div style="background-color: #07090e; border-right: 3px solid #D4AF37; padding: 16px; border-radius: 8px; margin: 20px 0;">
                <p style="font-size: 13px; color: #e2e8f0; margin: 0; line-height: 1.6;">
                  فريقنا يراجع طلبك حالياً وستصلك رسالة التحديث عبر البريد المعتمد لنفس الحساب.
                </p>
              </div>

              <div style="text-align: center; margin-top: 30px;">
                <a href="https://nexus-engine-v6-8wtc9q2f7-nexus-engine.vercel.app" style="color: #D4AF37; font-size: 12px; text-decoration: underline; font-weight: bold;">
                  العودة إلى منصة Nexus Engine
                </a>
              </div>

              <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.08); margin: 25px 0 15px 0;" />
              <p style="font-size: 11px; color: #64748b; text-align: center;">
                © 2026 NEXUS ENGINE. جميع الحقوق محفوظة.
              </p>
            </div>
          </div>
        `,
      });

      return NextResponse.json({ success: true, message: 'تم استلام طلب التأهيل بنجاح' });
    }

    return NextResponse.json({ error: 'نوع الطلب غير معروف' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ في السيرفر' }, { status: 500 });
  }
}
