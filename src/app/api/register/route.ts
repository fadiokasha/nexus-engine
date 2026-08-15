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
      // إرسال إيميل التقرير الفني الشامل كاملاً داخل الإيميل
      await resend.emails.send({
        from: 'Nexus Engine <onboarding@resend.dev>',
        to: email,
        subject: 'التقرير الفني والملف التقديمي الرسمي - Nexus Engine',
        html: `
          <div dir="rtl" style="font-family: Arial, sans-serif; background-color: #0b0e14; color: #ffffff; padding: 40px 20px; text-align: right;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #121824; border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 16px; padding: 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
              
              <div style="text-align: center; margin-bottom: 24px;">
                <h1 style="color: #D4AF37; font-size: 22px; margin: 0; letter-spacing: 1px;">NEXUS ENGINE</h1>
                <p style="color: #94a3b8; font-size: 11px; margin-top: 4px;">التقرير الفني الرسمي والملف التقديمي</p>
              </div>

              <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.08); margin: 20px 0;" />
              
              <p style="font-size: 15px; color: #ffffff; margin-bottom: 16px;">مرحباً بك <strong style="color: #D4AF37;">${formattedName}</strong></p>
              
              <p style="font-size: 13px; color: #cbd5e1; line-height: 1.7; margin-bottom: 24px;">
                بناءً على طلبك، نرسل لك النسخة المعتمدة والشاملة من التقرير الفني الخاص بمنظومة <strong>Nexus Engine</strong>:
              </p>

              <!-- محتوى التقرير الفني الكامل -->
              <div style="background-color: #07090e; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; margin-bottom: 24px; text-align: right;">
                
                <h3 style="color: #D4AF37; font-size: 14px; margin-top: 0; margin-bottom: 8px;">1. النظرة العامة والمعمارية التقنية</h3>
                <p style="font-size: 12px; color: #94a3b8; line-height: 1.6; margin-bottom: 16px;">
                  تعتبر منصة NEXUS ENGINE منظومة برمجية متكاملة لإدارة وتأهيل الأصول الرقمية المؤتمتة، حيث توفر بنية تحتية سحابية هجينة تعتمد على خوارزميات الذكاء الاصطناعي لمعالجة البيانات والتفاعلات دون الحاجة لإدارة تشغيلية بشرية يومية.
                </p>

                <h3 style="color: #D4AF37; font-size: 14px; margin-top: 0; margin-bottom: 8px;">2. محرك الأتمتة والسيادة التشغيلية</h3>
                <p style="font-size: 12px; color: #94a3b8; line-height: 1.6; margin-bottom: 16px;">
                  يتولى النظام الآلي معالجة طلبيات النطاق المخصص، ربط قواعد البيانات، وتنفيذ بروتوكولات الأمان والحماية الذاتية. يحصل المرخص له على صلاحية متابعة الأداء ومراقبة المؤشرات عبر لوحة تحكم تحليلية متطورة.
                </p>

                <h3 style="color: #D4AF37; font-size: 14px; margin-top: 0; margin-bottom: 8px;">3. نموذج توزيع العوائد (%80 / %20)</h3>
                <p style="font-size: 12px; color: #94a3b8; line-height: 1.6; margin-bottom: 16px;">
                  يعتمد النظام نموذج مشاركة صافي العوائد بنسبة <strong style="color: #ffffff;">80% للشريك الاستراتيجي</strong> مقابل <strong style="color: #ffffff;">20% للمنصة</strong> لتغطية الرسوم التشغيلية والتطوير البرمجي واستدامة الخوادم.
                </p>

                <h3 style="color: #D4AF37; font-size: 14px; margin-top: 0; margin-bottom: 8px;">4. سياسة الحصرية الإقليمية</h3>
                <p style="font-size: 12px; color: #94a3b8; line-height: 1.6; margin: 0;">
                  تضمن المنصة حصرية النطاق الجغرافي المسجل لكل مرخص له لمنع التضارب التشغيلي، وتستمر الحصرية طوال فترة سريان ترخيص الامتياز المعتمد.
                </p>

              </div>
              
              <div style="text-align: center; margin-top: 28px;">
                <a href="https://nexus-engine-v6-8wtc9q2f7-nexus-engine.vercel.app" style="display: inline-block; background: linear-gradient(135deg, #D4AF37 0%, #AA771C 100%); color: #000000; font-weight: bold; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 13px;">
                  العودة للمنصة وحجز النطاق
                </a>
              </div>
              
              <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.08); margin: 30px 0 15px 0;" />
              <p style="font-size: 11px; color: #64748b; text-align: center;">
                © 2026 NEXUS ENGINE. جميع الحقوق محفوظة.
              </p>
            </div>
          </div>
        `,
      });

      return NextResponse.json({ success: true, message: 'تم إرسال التقرير الفني كاملاً إلى بريدك الإلكتروني بنجاح' });
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
