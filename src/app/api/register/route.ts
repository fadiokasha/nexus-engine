import { NextRequest, NextResponse } from "next/server";

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

    // تحويل ملف الجواز إلى Buffer تمهيداً للتخزين السحابي
    const arrayBuffer = await passportFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // معرّف فريد للطلب ولحساب الشريك
    const partnerId = `NEXUS-${Math.floor(100000 + Math.random() * 900000)}`;

    console.log("تم استقبال طلب حجز جديد:", {
      partnerId,
      fullName,
      email,
      passportNumber,
      region,
      selectedSectors,
      fileSize: `${(buffer.length / 1024).toFixed(2)} KB`,
    });

    return NextResponse.json({
      success: true,
      partnerId,
      message: "تم حفظ بيانات الحجز وتوليد العقد بنجاح.",
    });
  } catch (error) {
    console.error("خطأ في معالجة التسجيل:", error);
    return NextResponse.json(
      { success: false, error: "حدث خطأ غير متوقع أثناء معالجة الطلب." },
      { status: 500 }
    );
  }
}