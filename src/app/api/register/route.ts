import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, name, email, phone, sector, region } = body;

    if (type === 'report') {
      return NextResponse.json({
        success: true,
        pdfUrl: '/technical-report.pdf',
        message: `تم إرسال التقرير بنجاح إلى ${email}`
      });
    }

    if (type === 'qualification') {
      // هنا يتم حفظ البيانات ورسالة التأهيل
      return NextResponse.json({
        success: true,
        data: { name, email, phone, sector, region },
        message: 'تم تسجيل طلب التأهيل بنجاح'
      });
    }

    return NextResponse.json({ success: false, error: 'نوع الطلب غير مدعوم' }, { status: 400 });
  } catch {
    return NextResponse.json({ success: false, error: 'حدث خطأ في معالجة الطلب' }, { status: 500 });
  }
}
