import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend"; // أو المكتبة الخاصة بالخدمة التي تستخدمها

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const passportNumber = formData.get("passportNumber") as string;
    const region = formData.get("region") as string;
    const selectedSectors = JSON.parse((formData.get("selectedSectors") as string) || "[]");
    const passportFile = formData.get("passportFile") as File | null;

    if (!fullName || !email || !passportNumber || !passportFile) {
      return NextResponse.json(
        { success: false, error: "جميع البيانات المطلوبة وملف الجواز الزامية." },
        { status: 400 }
      );
    }

    const partnerId = `NEXUS-${Math.floor(100000 + Math.random() * 900000)}`;

    // 📧 كود إرسال الإيميل الفعلي
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Nexus Engine <onboarding@resend.dev>',
        to: email,
        subject: `تأكيد طلب حجز Nexus Engine - ${partnerId}`,
        html: `<p>مرحباً ${fullName}، تم استقبال طلبك بنجاح. رقم الشريك الخاص بك هو: <strong>${partnerId}</strong></p>`,
      });
    }

    return NextResponse.json({
      success: true,
      partnerId,
      message: "تم حفظ بيانات الحجز وإرسال التقرير بنجاح.",
    });
  } catch (error) {
    console.error("خطأ في معالجة التسجيل:", error);
    return NextResponse.json(
      { success: false, error: "حدث خطأ غير متوقع أثناء معالجة الطلب." },
      { status: 500 }
    );
  }
}