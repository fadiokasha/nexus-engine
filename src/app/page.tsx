'use client';

import React, { useState } from 'react';
import { Shield, Zap, Lock, X, FileText, Send, CheckCircle2, Download, Building2, Printer } from 'lucide-react';

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
    type: 'policy' | 'report' | 'qualification';
    title: string; 
    subtitle?: string;
    message?: string; 
    data?: any 
  } | null>(null);

  // فتح نوافذ السياسات والوثائق
  const openPolicyModal = (policyType: 'privacy' | 'disclaimer' | 'license') => {
    if (policyType === 'privacy') {
      setModal({
        open: true,
        type: 'policy',
        title: 'سياسة الخصوصية - Nexus Engine',
        message: 'نلتزم بشدة بحماية بياناتك الشخصية والتجارية. كافة البيانات المدخلة (الاسم، البريد الإلكتروني، رقم الجوال) يتم استخدامها حصرياً لأغراض التواصل والتأهيل الاستثماري، ولا يتم مشاركتها أو بيعها لأي طرف ثالث خارج إطار تفعيل التشغيل.',
      });
    } else if (policyType === 'disclaimer') {
      setModal({
        open: true,
        type: 'policy',
        title: 'إخلاء المسؤولية القانونية',
        message: 'المعلومات والتقارير المقدمة في هذه المنصة هي لأغراض التقييم والتأهيل الاستثماري والتشغيلي. تقديم هذا الطلب لا يعني قبولاً مضموناً أو تعاقداً نهائياً، بل يخضع لعملية المراجعة الفنية والقانونية من قبل فريق Nexus Engine.',
      });
    } else if (policyType === 'license') {
      setModal({
        open: true,
        type: 'policy',
        title: 'وثيقة الترخيص والسيادة التشغيلية',
        message: 'تنظم وثيقة الترخيص العلاقة الاستراتيجية بين الشريك والمنصة؛ حيث يحصل الشريك على حق تشغيل النطاق الجغرافي المعتمد بنسبة عوائد تشغيلية 80% للشريك مقابل 20% لرسوم تشغيل المنصة وأتمتة الذكاء الاصطناعي والدعم البرمجي.',
      });
    }
  };

  // إرسال طلب التقرير الفني وعرض النافذة المنبثقة مباشرة
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
          type: 'report',
          title: 'التقرير الفني والملف التقديمي الرسمي',
          subtitle: 'منظومة Nexus Engine لإدارة الأصول الرقمية المؤتمتة',
          data: {
            name: reportForm.name,
            email: reportForm.email,
            phone: reportForm.phone
          }
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
          type: 'qualification',
          title: 'اعتماد طلب التأهيل ومسودة الاتفاقية',
          subtitle: 'اتفاقية مشاركة رقمية وتفعيل إقليمي حصري',
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

  // دالة طباعة/تحميل التقرير كـ PDF
  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-[#07090e] text-white selection:bg-[#D4AF37] selection:text-black font-sans relative overflow-x-hidden pb-12">
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

        <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-[#D4AF37]/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#D4AF37]">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
          المقاعد المتاحة: 15 مقعداً استراتيجياً
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 pt-10 space-y-12 text-center">
        <div className="inline-block bg-white/[0.02] border border-white/10 rounded-full px-4 py-1.5 text-xs text-gray-300 backdrop-blur-md">
          تحالف الـ 15 الاستراتيجي — سيادة تشغيلية وحرية زمنية
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight text-white tracking-tight">
          منظومة إدارة الأصول الرقمية المؤتمتة —{' '}
          <span className="bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA771C] bg-clip-text text-transparent whitespace-nowrap">
            NEXUS ENGINE
          </span>
        </h1>

        <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
          امتلك امتياز تشغيل النطاق الإقليمي كـ "مالك استراتيجي للأصل الرقمي". أتمتة برمجية كاملة تتولى التشغيل والذكاء الاصطناعي دون أعباء إدارية أو صيانة.
        </p>

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

        {/* النموذج الأول: استعراض التقرير الفني */}
        <div className="bg-[#0f1420]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 text-right shadow-2xl max-w-2xl mx-auto">
          <div className="mb-6 text-center">
            <h2 className="text-lg md:text-xl font-bold text-white flex items-center justify-center gap-2">
              <FileText className="w-5 h-5 text-[#D4AF37]" />
              <span>استعراض التقرير الفني والملف التقديمي</span>
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              تحميل واستعراض النظرة التقنية والهيكلية العامة لمنصة Nexus Engine
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
              <FileText className="w-4 h-4 text-black" />
              <span>{loadingReport ? 'جاري تجهيز التقرير...' : 'عرض وتحميل التقرير الفني'}</span>
            </button>
          </form>
        </div>

        {/* النموذج الثاني: طلب التأهيل */}
        <div className="bg-[#0f1420]/80 backdrop-blur-2xl border border-[#D4AF37]/30 rounded-3xl p-6 md:p-8 text-right shadow-2xl max-w-2xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="mb-6 text-center">
            <h2 className="text-lg md:text-xl font-extrabold text-[#D4AF37] mb-1 flex items-center justify-center gap-2">
              <Building2 className="w-5 h-5 text-[#D4AF37]" />
              <span>طلب التأهيل للامتياز الجغرافي والسيادة التشغيلية</span>
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
              <Send className="w-4 h-4 text-black" />
              <span>{loadingQual ? 'جاري الحفظ والاعتماد...' : 'إرسال الطلب للمراجعة والاعتماد'}</span>
            </button>
          </form>
        </div>

        {/* النافذة المنبثقة الشاملة (Modal) */}
        {modal?.open && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200 print:p-0 print:static print:bg-white print:text-black">
            <div className="bg-[#0f1420] border-t-2 border-t-[#D4AF37] border-x border-b border-white/10 rounded-2xl p-6 md:p-8 max-w-2xl w-full text-right relative shadow-2xl space-y-5 max-h-[88vh] overflow-y-auto print:max-h-none print:border-none print:shadow-none print:text-black">
              
              <button
                onClick={() => setModal(null)}
                className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors p-1 cursor-pointer print:hidden"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="border-b border-white/10 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-[#D4AF37] font-extrabold text-base">
                    <FileText className="w-5 h-5 text-[#D4AF37]" />
                    <span>{modal.title}</span>
                  </div>
                  {modal.type === 'report' && (
                    <button
                      onClick={handlePrintPDF}
                      className="bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer print:hidden"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>طباعة / حفظ PDF</span>
                    </button>
                  )}
                </div>
                {modal.subtitle && (
                  <p className="text-xs text-gray-400 mt-1">{modal.subtitle}</p>
                )}
              </div>

              {/* 1. التقرير الفني الكامل والكامل داخل النافذة */}
              {modal.type === 'report' && (
                <div className="space-y-5 text-xs text-gray-200 leading-relaxed print:text-black">
                  
                  {/* بيانات مقدم الطلب */}
                  <div className="bg-black/40 border border-white/10 rounded-xl p-4 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">اسم المستفيد:</span>
                      <span className="font-bold text-white">{modal.data?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">البريد الإلكتروني:</span>
                      <span className="font-bold text-[#D4AF37]">{modal.data?.email}</span>
                    </div>
                  </div>

                  {/* وثيقة التقرير الفني الكاملة */}
                  <div className="space-y-4 pt-2">
                    
                    <div className="border-b border-white/10 pb-2">
                      <h3 className="text-sm font-extrabold text-[#D4AF37]">1. النظرة العامة والمعمارية التقنية</h3>
                      <p className="text-gray-300 mt-1 leading-relaxed">
                        تعتبر منصة NEXUS ENGINE منظومة برمجية متكاملة لإدارة وتأهيل الأصول الرقمية المؤتمتة، حيث توفر بنية تحتية سحابية هجينة تعتمد على خوارزميات الذكاء الاصطناعي لمعالجة البيانات والتفاعلات دون الحاجة لإدارة تشغيلية بشرية يومية.
                      </p>
                    </div>

                    <div className="border-b border-white/10 pb-2">
                      <h3 className="text-sm font-extrabold text-[#D4AF37]">2. محرك الأتمتة والسيادة التشغيلية</h3>
                      <p className="text-gray-300 mt-1 leading-relaxed">
                        يتولى النظام الآلي معالجة طلبيات النطاق المخصص، ربط قواعد البيانات، وتنفيذ بروتوكولات الأمان والحماية الذاتية. يحصل المرخص له على صلاحية متابعة الأداء ومراقبة المؤشرات عبر لوحة تحكم تحليلية متطورة.
                      </p>
                    </div>

                    <div className="border-b border-white/10 pb-2">
                      <h3 className="text-sm font-extrabold text-[#D4AF37]">3. نموذج توزيع العوائد والاستحقاق المالي</h3>
                      <p className="text-gray-300 mt-1 leading-relaxed">
                        يعتمد النظام نموذج مشاركة صافي العوائد بنسبة <strong className="text-white">%80 للشريك الاستراتيجي</strong> مقابل <strong className="text-white">%20 للمنصة</strong> لتغطية الرسوم التشغيلية والتطوير البرمجي واستدامة الخوادم. يتم تسوية العوائد دورياً وفق الاتفاقية المعتمدة.
                      </p>
                    </div>

                    <div className="border-b border-white/10 pb-2">
                      <h3 className="text-sm font-extrabold text-[#D4AF37]">4. سياسة الحصرية الإقليمية والتخصيص</h3>
                      <p className="text-gray-300 mt-1 leading-relaxed">
                        تضمن المنصة حصرية النطاق الجغرافي المسجل لكل مرخص له لمنع التضارب التشغيلي، وتستمر الحصرية طوال فترة سريان ترخيص الامتياز المعتمد.
                      </p>
                    </div>

                  </div>

                  {/* أزرار الإجراءات داخل النافذة */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3 print:hidden">
                    <button
                      onClick={handlePrintPDF}
                      className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-black font-extrabold py-3 rounded-xl text-xs flex items-center justify-center gap-2 hover:brightness-110 transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-black" />
                      <span>تحميل / حفظ التقرير بصيغة PDF</span>
                    </button>
                    
                    <button
                      onClick={() => setModal(null)}
                      className="bg-white/10 hover:bg-white/15 text-white font-bold px-6 py-3 rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      إغلاق النافذة
                    </button>
                  </div>

                  <p className="text-[11px] text-gray-400 text-center pt-1 print:hidden">
                    تم إرسال النسخة الكاملة الموثقة من هذا التقرير إلى بريدك الإلكتروني.
                  </p>
                </div>
              )}

              {/* 2. نافذة طلب التأهيل والمسودة */}
              {modal.type === 'qualification' && modal.data && (
                <div className="bg-black/40 border border-white/10 rounded-xl p-4 text-xs space-y-3 text-gray-200">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">الطرف الثاني (الشريك):</span>
                    <span className="font-semibold text-white">{modal.data.partner}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">البريد الإلكتروني:</span>
                    <span className="font-semibold text-white">{modal.data.email}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">الهاتف الرسمي:</span>
                    <span className="font-semibold text-white">{modal.data.phone}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">النطاق الجغرافي:</span>
                    <span className="font-semibold text-white">{modal.data.region}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">القطاع المستهدف:</span>
                    <span className="font-semibold text-white">{modal.data.sector}</span>
                  </div>
                  <p className="text-center text-emerald-400 font-bold pt-2 text-[11px] flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>تم حفظ طلبك وسيتم مراجعته والتواصل معك رسمياً.</span>
                  </p>
                  
                  <button
                    onClick={() => setModal(null)}
                    className="w-full mt-2 bg-white/10 hover:bg-white/15 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    إغلاق
                  </button>
                </div>
              )}

              {/* 3. نافذة السياسات العامة */}
              {modal.type === 'policy' && (
                <div className="space-y-4">
                  <p className="text-xs text-gray-300 leading-relaxed font-normal py-2">
                    {modal.message}
                  </p>
                  <button
                    onClick={() => setModal(null)}
                    className="w-full bg-white/10 hover:bg-white/15 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    إغلاق
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

        {/* الفوتر الملكي التفاعلي */}
        <footer className="w-full mt-20 pt-8 pb-6 border-t border-white/10 text-center text-xs text-gray-400 space-y-4 print:hidden">
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
