'use client';

import { useState } from 'react';

export default function HomePage() {
  // Form 1 State (Report)
  const [reportName, setReportName] = useState('');
  const [reportEmail, setReportEmail] = useState('');
  const [reportPhone, setReportPhone] = useState('');
  const [reportLoading, setReportLoading] = useState(false);
  const [reportStatus, setReportStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  // Form 2 State (Qualification Request)
  const [qualName, setQualName] = useState('');
  const [qualEmail, setQualEmail] = useState('');
  const [qualPhone, setQualPhone] = useState('');
  const [qualSector, setQualSector] = useState('التجارة الإلكترونية والأنظمة اللوجستية');
  const [qualRegion, setQualRegion] = useState('');
  const [qualAgreed, setQualAgreed] = useState(false);
  const [qualLoading, setQualLoading] = useState(false);
  const [qualStatus, setQualStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  // Modals State
  const [activeModal, setActiveModal] = useState<'terms' | 'disclaimer' | 'privacy' | 'contract' | null>(null);

  // Submit Report Request
  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReportLoading(true);
    setReportStatus(null);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'report',
          name: reportName,
          email: reportEmail,
          phone: reportPhone,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setReportStatus({
          type: 'success',
          msg: `تم إرسال التقرير الفني بنجاح إلى بريدك (${reportEmail}) وأصبح جاهزاً للتحميل!`,
        });
        // Open PDF directly in new tab as fallback
        if (data.pdfUrl) {
          window.open(data.pdfUrl, '_blank');
        }
      } else {
        setReportStatus({
          type: 'error',
          msg: data.error || 'حدث خطأ أثناء إرسال التقرير، يرجى المحاولة مرة أخرى.',
        });
      }
    } catch {
      setReportStatus({
        type: 'error',
        msg: 'تعذر الاتصال بالسيرفر، تأكد من اتصالك بالإنترنت وحاول مرة أخرى.',
      });
    } finally {
      setReportLoading(false);
    }
  };

  // Submit Qualification Request
  const handleQualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!qualAgreed) {
      setQualStatus({
        type: 'error',
        msg: 'يرجى الموافقة على الشروط وإخلاء المسؤولية للمتابعة.',
      });
      return;
    }

    setQualLoading(true);
    setQualStatus(null);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'qualification',
          name: qualName,
          email: qualEmail,
          phone: qualPhone,
          sector: qualSector,
          region: qualRegion,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setQualStatus({
          type: 'success',
          msg: 'تم حفظ بياناتك وتوليد مسودة العقد بنجاح! سنقوم بمراجعة النطاق والتواصل معك.',
        });
        setActiveModal('contract');
      } else {
        setQualStatus({
          type: 'error',
          msg: data.error || 'حدث خطأ أثناء معالجة الطلب، يرجى المحاولة لاحقاً.',
        });
      }
    } catch {
      setQualStatus({
        type: 'error',
        msg: 'تعذر الاتصال بالسيرفر، تأكد من اتصالك بالإنترنت وحاول مرة أخرى.',
      });
    } finally {
      setQualLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white font-sans selection:bg-[#D4AF37]" dir="rtl">
      {/* Header */}
      <header className="border-b border-[#D4AF37]/20 bg-[#0B0C10]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#8A7120] flex items-center justify-center font-bold text-black text-xl shadow-lg shadow-[#D4AF37]/20">
              N
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-wider text-white block leading-none">NEXUS ENGINE</span>
              <span className="text-[10px] text-[#D4AF37] tracking-widest block mt-1 font-semibold">برنامج ترخيص وشراكة تشغيل رقمي</span>
            </div>
          </div>
          <div className="hidden sm:block">
            <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
              المقاعد المتاحة: 15 مقعداً استراتيجياً
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-12 space-y-16">
        
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="inline-block">
            <span className="text-xs md:text-sm font-bold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-4 py-1.5 rounded-full uppercase tracking-wider">
              تحالف الـ 15 الاستراتيجي — سيادة تشغيلية وحرية زمنية
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight max-w-4xl mx-auto">
            منظومة إدارة الأصول الرقمية المؤتمتة — <span className="text-[#D4AF37]">NEXUS ENGINE</span>
          </h1>

          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto font-medium leading-relaxed">
            امتلك امتياز تشغيل النطاق الإقليمي كـ &quot;مالك استراتيجي للأصل الرقمي&quot;. أتمتة برمجية كاملة تتولى التشغيل والذكاء الاصطناعي دون أعباء إدارية أو صيانة.
          </p>

          <div className="bg-[#101827] border border-[#D4AF37]/30 rounded-xl p-4 max-w-2xl mx-auto shadow-xl">
            <p className="text-xs md:text-sm font-bold text-gray-200">
              ⚙️ هيكل توزيع العوائد: يستحق الشريك الاستراتيجي <span className="text-[#D4AF37] text-base font-extrabold">80%</span> من صافي العوائد التشغيلية مقابل <span className="text-[#D4AF37] text-base font-extrabold">20%</span> رسوم تشغيل المنصة والذكاء الاصطناعي.
            </p>
          </div>
        </section>

        {/* Value Proposition Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#121926] border border-gray-800 rounded-xl p-6 space-y-3 hover:border-[#D4AF37]/50 transition shadow-lg">
            <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] text-xl font-bold">
              🔒
            </div>
            <h3 className="text-base font-bold text-white">حصريّة نطاق عند التوفر</h3>
            <p className="text-xs text-gray-400 font-medium leading-relaxed">
              حصريّة جغرافية حسب توفر النطاق الفعلي، موثّقة بالعقد لضمان السيادة الكاملة على النطاق.
            </p>
          </div>

          <div className="bg-[#121926] border border-gray-800 rounded-xl p-6 space-y-3 hover:border-[#D4AF37]/50 transition shadow-lg">
            <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] text-xl font-bold">
              🛡️
            </div>
            <h3 className="text-base font-bold text-white">توزيع مالي موثّق (80% / 20%)</h3>
            <p className="text-xs text-gray-400 font-medium leading-relaxed">
              تحويلات مسجّلة وفق دورة محدّدة في العقد، بعد الرسوم والضرائب، لضمان أعلى عائد استثماري.
            </p>
          </div>

          <div className="bg-[#121926] border border-gray-800 rounded-xl p-6 space-y-3 hover:border-[#D4AF37]/50 transition shadow-lg">
            <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] text-xl font-bold">
              ⚡
            </div>
            <h3 className="text-base font-bold text-white">أتمتة تشغيلية بالذكاء الاصطناعي</h3>
            <p className="text-xs text-gray-400 font-medium leading-relaxed">
              أدوات مؤتمتة لإدارة العمليات اليومية للمرخص له، تضمن استمرارية العمل على مدار الساعة.
            </p>
          </div>
        </section>

        {/* FORM 1: Report Download */}
        <section className="bg-[#101827] border border-[#D4AF37]/30 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto shadow-2xl space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2">
              📄 حمل التقرير الفني والملف التقديمي
            </h2>
            <p className="text-xs text-gray-400 font-medium">
              هذا تحميل معلوماتي يتضمن نظرة تقنية وعملية عامة على منصة Nexus Engine وهيكل الشراكة.
            </p>
          </div>

          {reportStatus && (
            <div className={`p-4 rounded-xl text-xs font-bold ${reportStatus.type === 'success' ? 'bg-green-950/80 border border-green-500 text-green-300' : 'bg-red-950/80 border border-red-500 text-red-300'}`}>
              {reportStatus.msg}
            </div>
          )}

          <form onSubmit={handleReportSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">الاسم الكامل</label>
              <input
                type="text"
                required
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                placeholder="أدخل اسمك الكريم"
                className="w-full bg-[#0B0C10] border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">البريد الإلكتروني</label>
              <input
                type="email"
                required
                value={reportEmail}
                onChange={(e) => setReportEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-[#0B0C10] border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">رقم الجوال / الواتساب</label>
              <input
                type="tel"
                required
                value={reportPhone}
                onChange={(e) => setReportPhone(e.target.value)}
                placeholder="+20 123 456 7890"
                className="w-full bg-[#0B0C10] border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition"
              />
            </div>

            <button
              type="submit"
              disabled={reportLoading}
              className="w-full bg-transparent hover:bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37] font-bold py-3 rounded-xl transition duration-200 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {reportLoading ? 'جاري إعداد التقرير...' : '📥 عرض وتحميل التقرير الفني'}
            </button>
          </form>
        </section>

        {/* FORM 2: Executive Qualification Request */}
        <section className="bg-[#101827] border border-[#D4AF37]/40 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto shadow-2xl space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-xl md:text-2xl font-extrabold text-[#D4AF37]">
              طلب التأهيل للامتياز الجغرافي والسيادة التشغيلية
            </h2>
            <p className="text-xs text-gray-300 font-medium">
              قدم طلبك لنيل الامتياز الإقليمي الحصري كـ &quot;مالك أصل رقمي مؤتمت&quot; وحجز النطاق المستهدف.
            </p>
          </div>

          {qualStatus && (
            <div className={`p-4 rounded-xl text-xs font-bold ${qualStatus.type === 'success' ? 'bg-green-950/80 border border-green-500 text-green-300' : 'bg-red-950/80 border border-red-500 text-red-300'}`}>
              {qualStatus.msg}
            </div>
          )}

          <form onSubmit={handleQualSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">الاسم الكامل</label>
              <input
                type="text"
                required
                value={qualName}
                onChange={(e) => setQualName(e.target.value)}
                placeholder="أدخل اسمك الكامل"
                className="w-full bg-[#0B0C10] border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">البريد الإلكتروني الرسمي</label>
              <input
                type="email"
                required
                value={qualEmail}
                onChange={(e) => setQualEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full bg-[#0B0C10] border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">رقم الجوال / الواتساب الرسمي</label>
              <input
                type="tel"
                required
                value={qualPhone}
                onChange={(e) => setQualPhone(e.target.value)}
                placeholder="+20 123 456 7890"
                className="w-full bg-[#0B0C10] border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">القطاع المستهدف</label>
              <select
                value={qualSector}
                onChange={(e) => setQualSector(e.target.value)}
                className="w-full bg-[#0B0C10] border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition"
              >
                <option value="التجارة الإلكترونية والأنظمة اللوجستية">التجارة الإلكترونية والأنظمة اللوجستية</option>
                <option value="العقارات الرقمية والأصول المبرمجة">العقارات الرقمية والأصول المبرمجة</option>
                <option value="الخدمات المالية وأتمتة الأعمال">الخدمات المالية وأتمتة الأعمال</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">النطاق الجغرافي المطلوب (المدينة / الدولة)</label>
              <input
                type="text"
                required
                value={qualRegion}
                onChange={(e) => setQualRegion(e.target.value)}
                placeholder="مثال: الشرق الأوسط وشمال أفريقيا / مصر / الإمارات"
                className="w-full bg-[#0B0C10] border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition"
              />
            </div>

            {/* RTL Clean Checkbox Agreement */}
            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={qualAgreed}
                onChange={(e) => setQualAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-700 bg-[#0B0C10] text-[#D4AF37] focus:ring-[#D4AF37]"
              />
              <label htmlFor="agreeTerms" className="text-xs text-gray-300 leading-relaxed">
                أقر بأنني اطلعت وافقت على{' '}
                <button
                  type="button"
                  onClick={() => setActiveModal('terms')}
                  className="text-[#D4AF37] underline font-bold hover:text-amber-300"
                >
                  وثيقة الترخيص
                </button>
                {' '}و{' '}
                <button
                  type="button"
                  onClick={() => setActiveModal('disclaimer')}
                  className="text-[#D4AF37] underline font-bold hover:text-amber-300"
                >
                  إخلاء المسؤولية
                </button>
                {' '}وأن تقديم هذا الطلب لا يعني قبولاً مضموناً إلا بعد المراجعة.
              </label>
            </div>

            <button
              type="submit"
              disabled={qualLoading}
              className="w-full bg-[#D4AF37] hover:bg-[#b8972e] text-black font-extrabold py-3.5 rounded-xl transition duration-200 shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {qualLoading ? 'جاري التقييم والاعتماد...' : '🚀 إرسال الطلب للمراجعة والاعتماد'}
            </button>
          </form>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#D4AF37]/10 py-8 text-center text-xs text-gray-500 space-y-4">
        <div className="flex justify-center gap-6 flex-wrap font-semibold text-gray-400">
          <button onClick={() => setActiveModal('terms')} className="hover:text-[#D4AF37] transition">
            وثيقة الترخيص
          </button>
          <span>•</span>
          <button onClick={() => setActiveModal('disclaimer')} className="hover:text-[#D4AF37] transition">
            إخلاء المسؤولية
          </button>
          <span>•</span>
          <button onClick={() => setActiveModal('privacy')} className="hover:text-[#D4AF37] transition">
            سياسة الخصوصية
          </button>
        </div>
        <p>© {new Date().getFullYear()} NEXUS ENGINE. جميع الحقوق محفوظة.</p>
      </footer>

      {/* ================= MODALS (Interactive Popups) ================= */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#101827] border border-[#D4AF37]/40 rounded-2xl max-w-xl w-full p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 left-4 text-gray-400 hover:text-white text-xl font-bold bg-gray-800 w-8 h-8 rounded-full flex items-center justify-center"
            >
              ✕
            </button>

            {/* Modal 1: Terms */}
            {activeModal === 'terms' && (
              <div className="space-y-4">
                <h3 className="text-lg font-extrabold text-[#D4AF37] border-b border-[#D4AF37]/20 pb-2">
                  وثيقة الترخيص والشراكة التشغيلية
                </h3>
                <div className="text-xs text-gray-300 leading-relaxed space-y-3 font-medium">
                  <p>
                    تحدد هذه الوثيقة إطار العمل والترخيص البرمجي لمنظومة <strong>Nexus Engine</strong>:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-400">
                    <li><strong>توزيع العوائد:</strong> يستحق الشريك المرخص له نسبة 80% من صافي العوائد التشغيلية للنطاق المعتمد.</li>
                    <li><strong>رسوم التشغيل:</strong> تحصل المنصة على 20% لتغطية الخوادم، الذكاء الاصطناعي، والصيانة الدورية.</li>
                    <li><strong>الملكية الفكرية:</strong> تظل البرمجيات والبنية التحتية ملكاً حصرياً لـ Nexus Engine بينما يتمتع الشريك بحق الاستغلال التجاري للنطاق.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Modal 2: Disclaimer */}
            {activeModal === 'disclaimer' && (
              <div className="space-y-4">
                <h3 className="text-lg font-extrabold text-[#D4AF37] border-b border-[#D4AF37]/20 pb-2">
                  إخلاء المسؤولية القانونية
                </h3>
                <div className="text-xs text-gray-300 leading-relaxed space-y-3 font-medium">
                  <p>
                    هذا البرنامج هو ترخيص تجاري وتشغيلي لأصول رقمية ومكونات برمجية، وليس عرضاً لأوراق مالية أو صندوق استثمار.
                  </p>
                  <p className="text-gray-400">
                    النسب المذكورة هي توزيعات تشغيلية تقديرية وتخضع للشروط والأحكام الكاملة الموضحة في عقد الامتياز الرسمي بعد الاعتماد.
                  </p>
                </div>
              </div>
            )}

            {/* Modal 3: Privacy Policy */}
            {activeModal === 'privacy' && (
              <div className="space-y-4">
                <h3 className="text-lg font-extrabold text-[#D4AF37] border-b border-[#D4AF37]/20 pb-2">
                  سياسة الخصوصية وحماية البيانات
                </h3>
                <div className="text-xs text-gray-300 leading-relaxed space-y-3 font-medium">
                  <p>
                    تلتزم منصة Nexus Engine بحماية بيانات المستثمرين والشركاء التشغيليين بأعلى معايير التشفير والأمان.
                  </p>
                  <p className="text-gray-400">
                    لن يتم مشاركة بريدك أو رقم هاتفك مع أي طرف ثالث، وتستخدم البيانات فقط لأغراض التقييم الفني والتواصل المباشر.
                  </p>
                </div>
              </div>
            )}

            {/* Modal 4: Generated Contract Draft */}
            {activeModal === 'contract' && (
              <div className="space-y-5">
                <div className="bg-green-950/60 border border-green-500 rounded-xl p-3 text-center text-xs font-bold text-green-300">
                  ✓ تم حفظ بياناتك وتوليد مسودة عقد المشاركة الرسمية بنجاح!
                </div>

                <div className="bg-[#0B0C10] border border-[#D4AF37]/30 rounded-xl p-4 text-xs space-y-3">
                  <h4 className="font-extrabold text-[#D4AF37] text-center text-sm">
                    اتفاقية مشاركة رقمية وتفعيل إقليمي
                  </h4>
                  <div className="space-y-1 text-gray-300 font-medium">
                    <p><strong>الطرف الثاني (الشريك):</strong> {qualName || 'فادي أزهري'}</p>
                    <p><strong>البريد الإلكتروني:</strong> {qualEmail}</p>
                    <p><strong>الهاتف:</strong> {qualPhone}</p>
                    <p><strong>النطاق الجغرافي:</strong> {qualRegion || 'الشرق الأوسط وشمال أفريقيا'}</p>
                    <p><strong>القطاع:</strong> {qualSector}</p>
                    <hr className="border-gray-800 my-2" />
                    <p className="text-[#D4AF37] font-bold">
                      يستحق الشريك 80% من صافي العوائد التشغيلية مقابل 20% لفرع المنصة للتشغيل والذكاء الاصطناعي.
                    </p>
                  </div>
                </div>

                <div className="bg-[#121926] p-4 rounded-xl border border-gray-800 space-y-2 text-center">
                  <h5 className="font-bold text-white text-xs">تأمين الامتياز الإقليمي والتشغيل</h5>
                  <p className="text-[11px] text-gray-400">
                    أنت الآن على بعد خطوة من تملك نظامك المؤتمت بالكامل.
                  </p>
                  <div className="text-xl font-extrabold text-[#D4AF37]">
                    رسوم التأسيس الربط: $600
                  </div>
                </div>

                <button
                  onClick={() => setActiveModal(null)}
                  className="w-full bg-[#D4AF37] hover:bg-[#b8972e] text-black font-extrabold py-3 rounded-xl transition text-xs"
                >
                  إغلاق ومتابعة الاعتماد عبر البريد
                </button>
              </div>
            )}

            <div className="text-center pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="text-xs text-gray-400 hover:text-white underline"
              >
                إغلاق النافذة
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
