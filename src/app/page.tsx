'use client';

import React, { useState } from 'react';
import { Shield, Zap, Lock, CheckCircle, X, FileText } from 'lucide-react';

export default function Home() {
  // حالات النماذج (Form States)
  const [reportForm, setReportForm] = useState({ name: '', email: '', phone: '' });
  const [qualForm, setQualForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    sector: 'التجارة الإلكترونية والأنظمة اللوجستية', 
    region: '', 
    termsAgreed: false 
  });

  const [loadingReport, setLoadingReport] = useState(false);
  const [loadingQual, setLoadingQual] = useState(false);

  const [modal, setModal] = useState<{ 
    open: boolean; 
    title: string; 
    message: string; 
    pdfUrl?: string; 
    data?: any 
  } | null>(null);

  // فتح نوافذ السياسات والوثائق
  const openPolicyModal = (type: 'privacy' | 'disclaimer' | 'license') => {
    if (type === 'privacy') {
      setModal({
        open: true,
        title: 'سياسة الخصوصية - Nexus Engine',
        message: 'نلتزم بشدة بحماية بياناتك الشخصية والتجارية. كافة البيانات المدخلة (الاسم، البريد الإلكتروني، رقم الجوال) يتم استخدامها حصرياً لأغراض التواصل والتأهيل الاستثماري، ولا يتم مشاركتها أو بيعها لأي طرف ثالث خارج إطار تفعيل التشغيل.',
      });
    } else if (type === 'disclaimer') {
      setModal({
        open: true,
        title: 'إخلاء المسؤولية القانونية',
        message: 'المعلومات والتقارير المقدمة في هذه المنصة هي لأغراض التقييم والتأهيل الاستثماري والتشغيلي. تقديم هذا الطلب لا يعني قبولاً مضموناً أو تعاقداً نهائياً، بل يخضع لعملية المراجعة الفنية والقانونية من قبل فريق Nexus Engine.',
      });
    } else if (type === 'license') {
      setModal({
        open: true,
        title: 'وثيقة الترخيص والسيادة التشغيلية',
        message: 'تنظم وثيقة الترخيص العلاقة الاستراتيجية بين الشريك والمنصة؛ حيث يحصل الشريك على حق تشغيل النطاق الجغرافي المعتمد بنسبة عوائد تشغيلية 80% للشريك مقابل 20% لرسوم تشغيل المنصة وأتمتة الذكاء الاصطناعي والدعم البرمجي.',
      });
    }
  };

  // إرسال طلب التقرير الفني
  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingReport(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'report', ...reportForm }),
      });
      const data = await res.json();
      if (data.success) {
        setModal({
          open: true,
          title: 'تم إرسال التقرير الفني بنجاح',
          message: data.message || 'تم إرسال رابط التقرير الفني إلى بريدك الإلكتروني بنجاح.',
          pdfUrl: data.pdfUrl,
        });
        setReportForm({ name: '', email: '', phone: '' });
      } else {
        alert(data.error || 'حدث خطأ أثناء إرسال الطلب');
      }
    } catch (err) {
      alert('حدث خطأ في الاتصال بالسيرفر');
    } finally {
      setLoadingReport(false);
    }
  };

  // إرسال طلب التأهيل للامتياز الجغرافي
  const handleQualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!qualForm.termsAgreed) {
      alert('يرجى الموافقة على الشروط والأحكام أولاً');
      return;
    }
    setLoadingQual(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'qualification', ...qualForm }),
      });
      const data = await res.json();
      if (data.success) {
        setModal({
          open: true,
          title: 'تم حفظ بياناتك وتوليد مسودة عقد المشاركة الرسمية بنجاح ✓',
          message: 'اتفاقية مشاركة رقمية وتفعيل إقليمي',
          data: {
            partner: qualForm.name,
            email: qualForm.email,
            phone: qualForm.phone,
            region: qualForm.region || 'الشرق الأوسط وشمال أفريقيا',
            sector: qualForm.sector,
          }
        });
        setQualForm({ 
          name: '', 
          email: '', 
          phone: '', 
          sector: 'التجارة الإلكترونية والأنظمة اللوجستية', 
          region: '', 
          termsAgreed: false 
        });
      } else {
        alert(data.error || 'حدث خطأ أثناء إرسال الطلب');
      }
    } catch (err) {
      alert('حدث خطأ في الاتصال بالسيرفر');
    } finally {
      setLoadingQual(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#07090e] text-white selection:bg-[#D4AF37] selection:text-black font-sans relative overflow-x-hidden pb-12">
      {/* إضاءة خلفية دافئة وراقية */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-radial from-[#D4AF37]/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* الهيدر العلوي */}
      <header className="w-full max-w-6xl mx-auto px-4 py-6 flex flex-wrap justify-between items-center gap-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#AA771C] flex items-center justify-center font-black text-black text-xl shadow-lg shadow-[#D4AF37]/20">
            N
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-wider text-white block leading-none">NEXUS ENGINE</span>
            <span className="text-[10px] text-gray-400">برنامج ترخيص وشراكة تشغيل رقمي</span>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-[#D4AF37]/30 px-3 py-1.5 rounded-full text-xs font-semibold text-[#D4AF37]">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
          المقاعد المتاحة: 15 مقعداً استراتيجياً
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 pt-10 space-y-12 text-center">
        {/* الوسم الترحيبي العلوي */}
        <div className="inline-block bg-white/[0.02] border border-white/10 rounded-full px-4 py-1.5 text-xs text-gray-300 backdrop-blur-md">
          تحالف الـ 15 الاستراتيجي — سيادة تشغيلية وحرية زمنية
        </div>

        {/* العنوان الرئيسي */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight text-white tracking-tight">
          منظومة إدارة الأصول الرقمية المؤتمتة —{' '}
          <span className="bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA771C] bg-clip-text text-transparent whitespace-nowrap">
            NEXUS ENGINE
          </span>
        </h1>

        <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
          امتلك امتياز تشغيل النطاق الإقليمي كـ "مالك استراتيجي للأصل الرقمي". أتمتة برمجية كاملة تتولى التشغيل والذكاء الاصطناعي دون أعباء إدارية أو صيانة.
        </p>

        {/* شريط توزيع العوائد */}
        <div className="bg-gradient-to-r from-white/[0.03] via-white/[0.06] to-white/[0.03] border border-[#D4AF37]/30 rounded-2xl p-4 text-xs md:text-sm text-gray-200 shadow-xl max-w-2xl mx-auto">
          <span className="text-[#D4AF37] font-bold">هيكل توزيع العوائد:</span> يستحق الشريك الاستراتيجي <span className="text-[#D4AF37] font-bold">%80</span> من صافي العوائد التشغيلية مقابل <span className="text-[#D4AF37] font-bold">%20</span> رسوم تشغيل المنصة والذكاء الاصطناعي.
        </div>

        {/* شبكة البطاقات الثلاث */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-right pt-4">
          <div className="bg-[#121926]/60 backdrop-blur-xl border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl p-6 transition-all duration-300 shadow-xl hover:-translate-y-1 group">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">أتمتة تشغيلية بالذكاء الاصطناعي</h3>
            <p className="text-xs text-gray-400 font-medium leading-relaxed">
              أدوات مؤتمتة لإدارة العمليات اليومية للمرخص له، تضمن استمرارية العمل على مدار الساعة.
            </p>
          </div>

          <div className="bg-[#121926]/60 backdrop-blur-xl border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl p-6 transition-all duration-300 shadow-xl hover:-translate-y-1 group">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">توزيع مالی موثق (%80 / %20)</h3>
            <p className="text-xs text-gray-400 font-medium leading-relaxed">
              تحويلات مسجلة وفق دورة محددة في العقد، بعد الرسوم والضرائب، لضمان أعلى عائد استثماري.
            </p>
          </div>

          <div className="bg-[#121926]/60 backdrop-blur-xl border border-white/10 hover:border-[#D4AF37]/50 rounded-2xl p-6 transition-all duration-300 shadow-xl hover:-translate-y-1 group">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">حصرية نطاق عند التوفر</h3>
            <p className="text-xs text-gray-400 font-medium leading-relaxed">
              حصرية جغرافية حسب توفر النطاق الفعلي، موثقة بالعقد لضمان السيادة الكاملة على النطاق.
            </p>
          </div>
        </div>

        {/* النموذج الأول: حمل التقرير الفني */}
        <div className="bg-[#0f1420]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 text-right shadow-2xl max-w-2xl mx-auto">
          <div className="mb-6 text-center">
            <h2 className="text-lg md:text-xl font-bold text-white flex items-center justify-center gap-2">
              📄 حمل التقرير الفني والملف التقديمي
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              هيكل الشراكة Nexus Engine هذا تحميل معلوماتي يتضمن نظرة تقنية وعملية عامة على منصة
            </p>
          </div>

          <form onSubmit={handleReportSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">الاسم الكامل</label>
              <input
                type="text"
                required
                placeholder="أدخل اسمك الكريم"
                value={reportForm.name}
                onChange={(e) => setReportForm({ ...reportForm, name: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">البريد الإلكتروني</label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={reportForm.email}
                onChange={(e) => setReportForm({ ...reportForm, email: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">رقم الجوال</label>
              <input
                type="tel"
                required
                placeholder="+20 123 456 7890"
                value={reportForm.phone}
                onChange={(e) => setReportForm({ ...reportForm, phone: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loadingReport}
              className="w-full mt-2 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA771C] text-black font-extrabold py-3.5 px-6 rounded-xl shadow-lg shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40 hover:scale-[1.005] active:scale-[0.995] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loadingReport ? 'جاري الإرسال...' : 'عرض وتحميل التقرير الفني 📥'}
            </button>
          </form>
        </div>

        {/* النموذج الثاني: طلب التأهيل */}
        <div className="bg-[#0f1420]/80 backdrop-blur-2xl border border-[#D4AF37]/30 rounded-3xl p-6 md:p-8 text-right shadow-2xl max-w-2xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="mb-6 text-center">
            <h2 className="text-lg md:text-xl font-extrabold text-[#D4AF37] mb-1">
              طلب التأهيل للامتياز الجغرافي والسيادة التشغيلية
            </h2>
            <p className="text-xs text-gray-300">
              قدم طلبك لنيل الامتياز الإقليمي الحصري كـ "مالك أصل رقمي مؤمتت" وحجز النطاق المستهدف
            </p>
          </div>

          <form onSubmit={handleQualSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">الاسم الكامل</label>
              <input
                type="text"
                required
                placeholder="أدخل اسمك الكامل"
                value={qualForm.name}
                onChange={(e) => setQualForm({ ...qualForm, name: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">البريد الإلكتروني الرسمي</label>
              <input
                type="email"
                required
                placeholder="name@domain.com"
                value={qualForm.email}
                onChange={(e) => setQualForm({ ...qualForm, email: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">رقم الجوال الرسمي</label>
              <input
                type="tel"
                required
                placeholder="+20 123 456 7890"
                value={qualForm.phone}
                onChange={(e) => setQualForm({ ...qualForm, phone: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">القطاع المستهدف</label>
              <select
                value={qualForm.sector}
                onChange={(e) => setQualForm({ ...qualForm, sector: e.target.value })}
                className="w-full bg-[#121824] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-all"
              >
                <option value="التجارة الإلكترونية والأنظمة اللوجستية">التجارة الإلكترونية والأنظمة اللوجستية</option>
                <option value="الذكاء الاصطناعي والحلول البرمجية">الذكاء الاصطناعي والحلول البرمجية</option>
                <option value="الخدمات المالية والاستثمار الرقمي">الخدمات المالية والاستثمار الرقمي</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">النطاق الجغرافي المطلوب (المدينة / الدولة)</label>
              <input
                type="text"
                required
                placeholder="مثال: الشرق الأوسط وشمال أفريقيا / مصر / الإمارات"
                value={qualForm.region}
                onChange={(e) => setQualForm({ ...qualForm, region: e.target.value })}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="terms"
                checked={qualForm.termsAgreed}
                onChange={(e) => setQualForm({ ...qualForm, termsAgreed: e.target.checked })}
                className="mt-1 accent-[#D4AF37] cursor-pointer"
              />
              <label htmlFor="terms" className="text-[11px] text-gray-400 leading-relaxed cursor-pointer select-none">
                أقر بأنني اطلعت ووافقت على{' '}
                <button
                  type="button"
                  onClick={() => openPolicyModal('license')}
                  className="text-[#D4AF37] underline hover:text-[#F3E5AB]"
                >
                  وثيقة الترخيص
                </button>{' '}
                و{' '}
                <button
                  type="button"
                  onClick={() => openPolicyModal('disclaimer')}
                  className="text-[#D4AF37] underline hover:text-[#F3E5AB]"
                >
                  إخلاء المسؤولية
                </button>{' '}
                وأن تقديم هذا الطلب لا يعني قبولاً مضموناً إلا بعد المراجعة.
              </label>
            </div>

            <button
              type="submit"
              disabled={loadingQual}
              className="w-full mt-2 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA771C] text-black font-extrabold py-3.5 px-6 rounded-xl shadow-lg shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40 hover:scale-[1.005] active:scale-[0.995] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loadingQual ? 'جاري الحفظ والاعتماد...' : '🚀 إرسال الطلب للمراجعة والاعتماد'}
            </button>
          </form>
        </div>

        {/* النافذة المنبثقة للنتائج والسياسات (Modal) */}
        {modal?.open && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <div className="bg-[#0f1420] border border-[#D4AF37]/50 rounded-2xl p-6 md:p-8 max-w-lg w-full text-right relative shadow-2xl space-y-4">
              <button
                onClick={() => setModal(null)}
                className="absolute top-4 left-4 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-base border-b border-white/10 pb-3">
                <FileText className="w-5 h-5" />
                <span>{modal.title}</span>
              </div>

              {modal.data ? (
                <div className="bg-black/50 border border-white/10 rounded-xl p-4 text-xs space-y-2 text-gray-300">
                  <p className="font-bold text-center text-[#D4AF37] mb-2">{modal.message}</p>
                  <p><strong>الطرف الثاني (الشريك):</strong> {modal.data.partner}</p>
                  <p><strong>البريد الإلكتروني:</strong> {modal.data.email}</p>
                  <p><strong>الهاتف:</strong> {modal.data.phone}</p>
                  <p><strong>النطاق الجغرافي:</strong> {modal.data.region}</p>
                  <p><strong>القطاع:</strong> {modal.data.sector}</p>
                  <hr className="border-white/10 my-2" />
                  <p className="text-center text-emerald-400 font-bold">
                    يستحق الشريك %80 من صافي العوائد التشغيلية مقابل %20 لفرع المنصة وللذكاء الاصطناعي.
                  </p>
                </div>
              ) : (
                <p className="text-xs text-gray-300 leading-relaxed font-light py-2">
                  {modal.message}
                </p>
              )}

              {modal.pdfUrl && (
                <a
                  href={modal.pdfUrl}
                  download
                  className="block text-center bg-[#D4AF37] text-black font-bold py-2.5 px-4 rounded-xl text-xs hover:bg-[#c39f2e] transition-colors"
                >
                  تحميل الملف مباشرة (PDF)
                </a>
              )}

              <button
                onClick={() => setModal(null)}
                className="w-full bg-white/10 text-white font-bold py-2.5 rounded-xl text-xs hover:bg-white/20 transition-colors"
              >
                إغلاق النافذة
              </button>
            </div>
          </div>
        )}

        {/* الفوتر الملكي التفاعلي */}
        <footer className="w-full mt-20 pt-8 pb-6 border-t border-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent text-center text-xs text-gray-400 space-y-4">
          <div className="flex justify-center items-center gap-6 text-gray-400 font-medium text-xs">
            <button
              onClick={() => openPolicyModal('privacy')}
              className="hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              سياسة الخصوصية
            </button>
            <span>•</span>
            <button
              onClick={() => openPolicyModal('disclaimer')}
              className="hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              إخلاء المسؤولية
            </button>
            <span>•</span>
            <button
              onClick={() => openPolicyModal('license')}
              className="hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              وثيقة الترخيص
            </button>
          </div>
          <p className="text-gray-500 font-mono text-[11px]">© 2026 NEXUS ENGINE. جميع الحقوق محفوظة.</p>
        </footer>
      </div>
    </main>
  );
}
