'use client';

import React, { useState } from 'react';
import { Shield, Zap, Lock, X, FileText, Send, CheckCircle2, Download, Building2, Printer, ChevronLeft } from 'lucide-react';

export default function Home() {
  // حالات التحكم بالنوافذ المنبثقة والاستمارات
const [isQualificationOpen, setIsQualificationOpen] = useState(false);
const [isReportOpen, setIsReportOpen] = useState(false);
const [reportSubmitted, setReportSubmitted] = useState(false);
const [qualificationSubmitted, setQualificationSubmitted] = useState(false);
const [loading, setLoading] = useState(false);

const [reportForm, setReportForm] = useState({ name: '', email: '', phone: '' });
const [qualForm, setQualForm] = useState({
  name: '',
  email: '',
  passportNo: '',
  region: '', // النطاق الجغرافي المستهدف (مثل: الشرق الأوسط وشمال أفريقيا / مصر / الإمارات)
  sectors: [] as string[],
});

const toggleSector = (sector: string) => {
  setQualForm(prev => ({
    ...prev,
    sectors: prev.sectors.includes(sector)
      ? prev.sectors.filter(s => s !== sector)
      : [...prev.sectors, sector]
  }));
};

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

        <h2 className="text-2xl sm:text-3xl font-medium text-slate-200 mb-2">
  منظومة إدارة الأصول الرقمية المؤتمتة
</h2>

<div className="relative inline-block my-2">
  {/* خلفية التوهج الذهبي النخبوية */}
  <div className="absolute -inset-2 bg-gradient-to-r from-[#D4AF37]/30 via-amber-500/20 to-[#AA771C]/30 rounded-2xl blur-2xl opacity-80 pointer-events-none"></div>

  {/* العنوان الرئيسي بالتدرج والتأثير الذهبي */}
  <h1 className="relative text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-amber-200 via-[#D4AF37] to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(212,175,55,0.35)]">
    NEXUS ENGINE
  </h1>
</div>

        <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
          امتلك امتياز تشغيل النطاق الإقليمي كـ "مالك استراتيجي للأصل الرقمي". أتمتة برمجية كاملة تتولى التشغيل والذكاء الاصطناعي دون أعباء إدارية أو صيانة.
        </p>

        {/* بطاقة هيكل توزيع العوائد - زجاجية بتأثير البروز والارتفاع */}
<div className="max-w-2xl mx-auto mb-10 bg-[#121926]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-lg hover:shadow-[#D4AF37]/10 cursor-pointer">
  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-center">
    <span className="font-bold text-[#FFDF87] ml-1">هيكل توزيع العوائد:</span>
    يستحق الشريك الاستراتيجي <span className="text-[#FFDF87] font-bold">80%</span> من صافي العوائد التشغيلية مقابل <span className="text-[#FFDF87] font-bold">20%</span> رسوم تشغيل المنصة والذكاء الاصطناعي.
  </p>
</div>

{/* شبكة البطاقات الثلاث الزجاجية المحدثة بالألوان الجديدة */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-right max-w-4xl mx-auto">
  
  {/* بطاقة 1: حصرية نطاق عند التوفر */}
  <div className="bg-[#121926]/60 backdrop-blur-xl border border-white/10 hover:border-[#D4AF37] rounded-2xl p-6 transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-lg hover:shadow-[#D4AF37]/10 group cursor-pointer">
    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
    </div>
    <h3 className="font-bold text-lg text-white mb-2">
      حصرية نطاق <span className="text-[#FFDF87]">(عند التوفر)</span>
    </h3>
    <p className="text-xs text-gray-300 leading-relaxed">
      حصرية جغرافية حسب توفر النطاق الفعلي، موثقة بالعقد لضمان السيادة الكاملة على النطاق.
    </p>
  </div>

  {/* بطاقة 2: توزيع مالي موثق */}
  <div className="bg-[#121926]/60 backdrop-blur-xl border border-white/10 hover:border-[#D4AF37] rounded-2xl p-6 transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-lg hover:shadow-[#D4AF37]/10 group cursor-pointer">
    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
    </div>
    <h3 className="font-bold text-lg text-white mb-2">
      توزيع مالي موثق <span className="text-[#FFDF87]">(80% / 20%)</span>
    </h3>
    <p className="text-xs text-gray-300 leading-relaxed">
      تحويلات مسجلة وفق دورة محددة في العقد، بعد الرسوم والضرائب، لضمان أعلى عائد استثماري.
    </p>
  </div>

  {/* بطاقة 3: أتمتة تشغيلية */}
  <div className="bg-[#121926]/60 backdrop-blur-xl border border-white/10 hover:border-[#D4AF37] rounded-2xl p-6 transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-lg hover:shadow-[#D4AF37]/10 group cursor-pointer">
    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
    </div>
    <h3 className="font-bold text-lg text-white mb-2">
      أتمتة تشغيلية <span className="text-[#FFDF87]">(بالذكاء الاصطناعي)</span>
    </h3>
    <p className="text-xs text-gray-300 leading-relaxed">
      أدوات مؤتمتة لإدارة العمليات اليومية للمرخص له، تضمن استمرارية العمل على مدار الساعة.
    </p>
  </div>

</div>

        {/* 1. أزرار الدعوة لاتخاذ إجراء (CTAs) */}
<div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-12 px-4">
  <button
    onClick={() => setIsQualificationOpen(true)}
    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#FFDF87] to-[#AA771C] text-black font-extrabold text-sm sm:text-base shadow-lg shadow-[#D4AF37]/20 hover:brightness-110 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
    حجز النطاق والترخيص الإقليمي ($600)
  </button>
  
  <button
    onClick={() => setIsReportOpen(true)}
    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#121926]/80 border border-white/10 hover:border-[#D4AF37]/50 text-white font-bold text-sm sm:text-base hover:bg-slate-800/80 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
  >
    <svg className="w-5 h-5 text-[#FFDF87]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
    طلب التقرير الفني والملف التقديمي
  </button>
</div>

{/* 2. القطاعات الاستراتيجية المتاحة للتفعيل (Strategic Modules) */}
<section className="py-12 px-4 border-t border-white/5">
  <div className="max-w-5xl mx-auto">
    <div className="text-center mb-10">
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">القطاعات الاستراتيجية المتاحة للتفعيل</h3>
      <p className="text-xs sm:text-sm text-gray-400">أنظمة ومكونات برمجية مؤتمتة جاهزة للعمل داخل نطاقك الجغرافي</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Module 01 */}
      <div className="bg-[#121926]/60 backdrop-blur-xl border border-white/10 hover:border-[#D4AF37] rounded-2xl p-6 transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-lg hover:shadow-[#D4AF37]/10 text-right group">
        <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
        </div>
        <span className="text-[10px] font-mono text-[#FFDF87] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20">Module 01</span>
        <h4 className="text-base font-bold text-white mt-3 mb-2">العقارات الرقمية والوساطة</h4>
        <p className="text-xs text-gray-400 leading-relaxed">منظومة مؤتمتة لإدارة وعرض المشاريع العقارية والوساطة السحابية والربط بين المطورين والمستثمرين تلقائياً.</p>
      </div>

      {/* Module 02 */}
      <div className="bg-[#121926]/60 backdrop-blur-xl border border-white/10 hover:border-[#D4AF37] rounded-2xl p-6 transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-lg hover:shadow-[#D4AF37]/10 text-right group">
        <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
        </div>
        <span className="text-[10px] font-mono text-[#FFDF87] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20">Module 02</span>
        <h4 className="text-base font-bold text-white mt-3 mb-2">التجارة الإلكترونية والأنظمة اللوجستية</h4>
        <p className="text-xs text-gray-400 leading-relaxed">بنية تحتية لتشغيل شبكات التجارة السحابية، أتمتة الطلبات، وتتبع الشحنات والربط اللوجستي الذكي.</p>
      </div>

      {/* Module 03 */}
      <div className="bg-[#121926]/60 backdrop-blur-xl border border-white/10 hover:border-[#D4AF37] rounded-2xl p-6 transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-lg hover:shadow-[#D4AF37]/10 text-right group">
        <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>
        </div>
        <span className="text-[10px] font-mono text-[#FFDF87] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20">Module 03</span>
        <h4 className="text-base font-bold text-white mt-3 mb-2">الخدمات التقنية والحلول الذكية</h4>
        <p className="text-xs text-gray-400 leading-relaxed">تزويد القطاعات والمؤسسات بحلول الأتمتة، خوارزميات خدمة العملاء الذكية، وأنظمة المبيعات التلقائية.</p>
      </div>

    </div>
  </div>
</section>

{/* 3. أقسام التوجيه الاستراتيجي والرؤية (Strategic Vision) */}
<section className="py-12 px-4 my-6">
  <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
    
    {/* بطاقة الرافعة الرقمية */}
    <div className="bg-[#121926]/60 backdrop-blur-xl border border-white/10 border-r-4 border-r-[#D4AF37] rounded-2xl p-6 shadow-xl relative overflow-hidden">
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-5 h-5 text-[#FFDF87]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
        <h3 className="text-base font-bold text-white">الرافعة الرقمية (Digital Leverage)</h3>
      </div>
      <p className="text-xs text-gray-300 leading-relaxed mb-4">
        أنت لا تعمل كموظف تقني ولا تتولى مهام الكتابة أو البرمجة. المنظومة مُصممة لتمنحك أماناً وحرية زمنية كاملة؛ حيث تتولى الخوارزميات الذكية جميع العمليات والصيانة الفنية، بينما يتركز دورك في التوجيه الاستراتيجي وتحصيل العوائد.
      </p>
      <div className="flex items-center gap-4 pt-3 border-t border-white/10 text-[11px] text-[#FFDF87] font-semibold">
        <span>✓ أتمتة تشغيلية 100%</span>
        <span>✓ حرية زمنية مطلقة</span>
      </div>
    </div>

    {/* بطاقة رؤية المالك والسيادة الإقليمية */}
    <div className="bg-[#121926]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-5 h-5 text-[#FFDF87]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
        <h3 className="text-base font-bold text-white">رؤية المالك والسيادة الإقليمية</h3>
      </div>
      <p className="text-xs text-gray-300 leading-relaxed mb-4">
        ابتكرنا NEXUS ENGINE لتكون حلولاً سيادية تلغي الأعباء التشغيلية وتتيح إدارة الأصول الرقمية بأعلى مستويات الاقتدار. حصر المنظومة في 15 مقعداً إقليمياً يضمن التركيز الاستثماري العالي والحفاظ على القيمة السيادية والتنظيمية لكل نطاق جغرافي.
      </p>
      <div className="flex items-center gap-4 pt-3 border-t border-white/10 text-[11px] text-[#FFDF87] font-semibold">
        <span>مقعداً حصرياً فقط 15</span>
        <span>حصرية النطاق الجغرافي</span>
      </div>
    </div>

  </div>
</section>

{/* 4. النوافذ المنبثقة التفاعلية (Interactive Modals) */}

{/* نافذة حجز النطاق والترخيص ($600) */}
{isQualificationOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
    <div className="bg-[#0c1017] border border-[#D4AF37]/40 rounded-2xl max-w-lg w-full p-6 relative shadow-2xl my-8 text-right dir-rtl">
      <button 
        onClick={() => setIsQualificationOpen(false)} 
        className="absolute top-4 left-4 text-gray-400 hover:text-white"
      >
        ✕
      </button>

      {!qualificationSubmitted ? (
        <>
          <div className="mb-5">
            <span className="text-[10px] font-mono text-[#FFDF87] bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/20">
              رسوم الترخيص والتأسيس: $600
            </span>
            <h3 className="text-lg font-bold text-white mt-2">حجز النطاق وإصدار عقد المشاركة</h3>
            <p className="text-xs text-gray-400 mt-0.5">أدخل بياناتك المعتمدة لتوليد عقد اتفاقية المشاركة الموثق</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setQualificationSubmitted(true); }} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-gray-300 mb-1 font-medium">الاسم الكامل (مطابق للجواز)</label>
              <input 
                type="text" 
                required 
                value={qualForm.name}
                onChange={e => setQualForm({...qualForm, name: e.target.value})}
                placeholder="أدخل اسمك المعتمد" 
                className="w-full bg-[#121926] border border-gray-700 rounded-xl px-3.5 py-2.5 text-white focus:border-[#D4AF37] outline-none" 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-300 mb-1 font-medium">البريد الإلكتروني</label>
                <input 
                  type="email" 
                  required 
                  value={qualForm.email}
                  onChange={e => setQualForm({...qualForm, email: e.target.value})}
                  placeholder="name@domain.com" 
                  className="w-full bg-[#121926] border border-gray-700 rounded-xl px-3.5 py-2.5 text-white focus:border-[#D4AF37] outline-none" 
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1 font-medium">رقم جواز السفر</label>
                <input 
                  type="text" 
                  required 
                  value={qualForm.passportNo}
                  onChange={e => setQualForm({...qualForm, passportNo: e.target.value})}
                  placeholder="رقم الجواز الرسمي" 
                  className="w-full bg-[#121926] border border-gray-700 rounded-xl px-3.5 py-2.5 text-white focus:border-[#D4AF37] outline-none" 
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-1 font-medium">النطاق الجغرافي المستهدف أو المطلوب</label>
              <input 
                type="text" 
                required 
                value={qualForm.region}
                onChange={e => setQualForm({...qualForm, region: e.target.value})}
                placeholder="_: الشرق الأوسط وشمال أفريقيا / مصر / الإمارات" 
                className="w-full bg-[#121926] border border-gray-700 rounded-xl px-3.5 py-2.5 text-white focus:border-[#D4AF37] outline-none" 
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1 font-medium">القطاعات المراد تفعيلها</label>
              <div className="grid grid-cols-1 gap-1.5 pt-0.5">
                {['العقارات الرقمية والوساطة', 'التجارة الإلكترونية والأنظمة اللوجستية', 'الخدمات التقنية والحلول الذكية'].map((sec) => (
                  <label key={sec} className="flex items-center gap-2 p-2.5 bg-[#121926] border border-gray-800 rounded-xl cursor-pointer hover:border-gray-700">
                    <input 
                      type="checkbox" 
                      checked={qualForm.sectors.includes(sec)}
                      onChange={() => toggleSector(sec)}
                      className="accent-[#D4AF37] w-3.5 h-3.5" 
                    />
                    <span className="text-xs text-gray-200">{sec}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* تفاصيل الحساب البنكي وإشعار التحويل */}
            <div className="bg-[#070a11] border border-[#D4AF37]/30 rounded-xl p-3.5 space-y-2 mt-2">
              <div className="flex items-center justify-between text-xs text-[#FFDF87] font-semibold">
                <span>💳 بيانات الحساب البنكي المباشر (IBAN)</span>
                <span>رسوم الترخيص: $600</span>
              </div>
              <div className="text-[11px] text-gray-300 font-mono space-y-0.5 bg-black/50 p-2.5 rounded-lg border border-white/5 dir-ltr text-left">
                <p><span className="text-gray-500">Bank Name:</span> Abu Dhabi Islamic Bank (ADIB)</p>
                <p><span className="text-gray-500">Account Name:</span> NEXUS ENGINE LTD</p>
                <p><span className="text-gray-500">IBAN:</span> EG79003600010000000012345678</p>
              </div>

              <div className="pt-1">
                <label className="block text-[11px] text-gray-300 mb-1">رفع صورة إشعار التحويل البنكي أو صورة الجواز</label>
                <div className="flex items-center justify-center border border-dashed border-gray-700 rounded-xl p-2.5 bg-[#121926] hover:border-[#D4AF37] transition cursor-pointer">
                  <span className="text-xs text-gray-400">📤 اختر الملف أو الإشعار لتأكيد التحويل</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-gray-400 pt-1">
              <span className="text-emerald-400">🛡️</span>
              <span>تشفير بيانات معتمد وفق أعلى معايير الخصوصية والسيادة الرقمية.</span>
            </div>

            <button 
              type="submit" 
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-black font-bold text-xs hover:brightness-110 transition mt-3"
            >
              تأكيد الحجز وتوليد عقد المشاركة ($600)
            </button>
          </form>
        </>
      ) : (
        <div className="text-center py-6 space-y-3">
          <div className="text-4xl">✅</div>
          <h3 className="text-lg font-bold text-white">تم استقبال طلب الحجز بنجاح</h3>
          <p className="text-xs text-gray-300 leading-relaxed max-w-sm mx-auto">
            تم تسجيل طلبك وإرسال الإشعار للإدارة. سيتم التواصل معك لمراجعة التحويل واعتماد عقد المشاركة.
          </p>
          <button 
            onClick={() => setIsQualificationOpen(false)}
            className="px-5 py-2 rounded-xl bg-gray-800 text-gray-200 text-xs hover:bg-gray-700"
          >
            إغلاق النافذة
          </button>
        </div>
      )}
    </div>
  </div>
)}

{/* نافذة التقرير الفني (مجاني) */}
{isReportOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
    <div className="bg-[#0c1017] border border-gray-700 rounded-2xl max-w-md w-full p-6 relative shadow-2xl text-right dir-rtl">
      <button 
        onClick={() => setIsReportOpen(false)} 
        className="absolute top-4 left-4 text-gray-400 hover:text-white"
      >
        ✕
      </button>

      {!reportSubmitted ? (
        <>
          <div className="mb-5">
            <h3 className="text-lg font-bold text-white">طلب التقرير الفني والملف التقديمي</h3>
            <p className="text-xs text-gray-400 mt-0.5">أدخل بياناتك لاستلام التقرير الفني الشامل مجاناً</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setReportSubmitted(true); }} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-gray-300 mb-1 font-medium">الاسم الكريم</label>
              <input 
                type="text" 
                required 
                value={reportForm.name}
                onChange={e => setReportForm({...reportForm, name: e.target.value})}
                placeholder="أدخل اسمك الكريم" 
                className="w-full bg-[#121926] border border-gray-700 rounded-xl px-3.5 py-2.5 text-white focus:border-[#D4AF37] outline-none" 
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1 font-medium">البريد الإلكتروني</label>
              <input 
                type="email" 
                required 
                value={reportForm.email}
                onChange={e => setReportForm({...reportForm, email: e.target.value})}
                placeholder="name@domain.com" 
                className="w-full bg-[#121926] border border-gray-700 rounded-xl px-3.5 py-2.5 text-white focus:border-[#D4AF37] outline-none" 
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1 font-medium">رقم الجوال / الواتساب</label>
              <input 
                type="tel" 
                required 
                value={reportForm.phone}
                onChange={e => setReportForm({...reportForm, phone: e.target.value})}
                placeholder="+20 123 456 7890" 
                className="w-full bg-[#121926] border border-gray-700 rounded-xl px-3.5 py-2.5 text-white focus:border-[#D4AF37] outline-none" 
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-black font-bold text-xs hover:brightness-110 transition mt-2"
            >
              عرض وتحميل التقرير الفني PDF
            </button>
          </form>
        </>
      ) : (
        <div className="text-center py-6 space-y-3">
          <div className="text-4xl">📄</div>
          <h3 className="text-lg font-bold text-white">تم إرسال التقرير الفني</h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            تم تجهيز الملف التقديمي وإرسال رابط التحميل إلى بريدك الإلكتروني بنجاح.
          </p>
          <button 
            onClick={() => setIsReportOpen(false)}
            className="px-5 py-2 rounded-xl bg-gray-800 text-gray-200 text-xs hover:bg-gray-700"
          >
            إغلاق النافذة
          </button>
        </div>
      )}
    </div>
  </div>
)}

        {/* الفوتر الملكي الفاخر بلمسات ذهبية وهيكلة احترافية */}
        <footer className="w-full max-w-4xl mx-auto pt-16 pb-8 mt-20 relative print:hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

          <div className="bg-[#0c1019]/90 backdrop-blur-2xl border border-[#D4AF37]/25 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-12 -left-12 w-28 h-28 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* شعار الماركة الفاخر */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#AA771C] flex items-center justify-center font-black text-black text-lg shadow-md shadow-[#D4AF37]/20">
                  N
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-sm tracking-widest text-white block leading-tight">NEXUS ENGINE</span>
                  <span className="text-[10px] text-[#D4AF37] font-medium">Enterprise Sovereign Systems</span>
                </div>
              </div>

              {/* أزرار السياسات بتنسيق زجاجي فاخر */}
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-xs">
                <button 
                  type="button" 
                  onClick={() => openPolicyModal('license')} 
                  className="px-4 py-2 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] text-gray-300 transition-all duration-300 font-semibold cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <span>وثيقة الترخيص</span>
                  <ChevronLeft className="w-3 h-3 text-[#D4AF37]" />
                </button>

                <button 
                  type="button" 
                  onClick={() => openPolicyModal('disclaimer')} 
                  className="px-4 py-2 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] text-gray-300 transition-all duration-300 font-semibold cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <span>إخلاء المسؤولية</span>
                  <ChevronLeft className="w-3 h-3 text-[#D4AF37]" />
                </button>

                <button 
                  type="button" 
                  onClick={() => openPolicyModal('privacy')} 
                  className="px-4 py-2 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] text-gray-300 transition-all duration-300 font-semibold cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <span>سياسة الخصوصية</span>
                  <ChevronLeft className="w-3 h-3 text-[#D4AF37]" />
                </button>
              </div>

            </div>

            {/* شريط حقوق الملكية السفلي */}
            <div className="mt-6 pt-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-400">
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>جميع الأنظمة محمية وتعمل بأتمتة كاملة</span>
              </div>
              <div>
                <span>جميع الحقوق محفوظة © {new Date().getFullYear()} </span>
                <span className="text-[#D4AF37] font-bold">NEXUS ENGINE</span>
              </div>
            </div>

          </div>
        </footer>

        {/* النافذة المنبثقة الشاملة (Modal) */}
        {modal?.open && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200 print:p-0 print:static print:bg-white print:text-black">
            <div className="bg-[#0f1420] border-t-2 border-t-[#D4AF37] border-x border-b border-white/10 rounded-2xl p-6 md:p-8 max-w-2xl w-full text-right relative shadow-2xl space-y-5 max-h-[88vh] overflow-y-auto print:max-h-none print:border-none print:shadow-none print:text-black">
              
              <button
                onClick={() => setModal(null)}
                className="absolute top-4 left-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors print:hidden"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <h3 className="text-xl font-bold text-[#D4AF37]">{modal.title}</h3>
                {modal.subtitle && (
                  <p className="text-xs text-gray-400 mt-1">{modal.subtitle}</p>
                )}
              </div>

              {modal.type === 'policy' && (
                <div className="text-sm text-gray-300 leading-relaxed py-2">
                  <p>{modal.message}</p>
                </div>
              )}

              {modal.type === 'report' && (
                <div className="space-y-4">
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3 text-xs text-gray-300 flex flex-wrap gap-4">
                    <div><span className="text-gray-500">اسم المستفيد:</span> <strong className="text-white">{modal.data?.name}</strong></div>
                    <div><span className="text-gray-500">البريد:</span> <strong className="text-white">{modal.data?.email}</strong></div>
                    <div><span className="text-gray-500">الجوال:</span> <strong className="text-white">{modal.data?.phone}</strong></div>
                  </div>

                  <div className="space-y-3 text-xs md:text-sm text-gray-300 leading-relaxed max-h-[40vh] overflow-y-auto pr-1">
                    <div className="bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
                      <h4 className="text-[#D4AF37] font-bold mb-1">1. النظرة العامة والمسارية التقنية</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">منظومة برمجية متكاملة لإدارة وتأهيل الأصول الرقمية المؤتمتة، توفر بنية تحتية سحابية تعتمد على الذكاء الاصطناعي لمعالجة العمليات دون أعباء تشغيلية بشرية.</p>
                    </div>

                    <div className="bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
                      <h4 className="text-[#D4AF37] font-bold mb-1">2. محرك الأتمتة والسيادة التشغيلية</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">يتولى النظام الآلي ربط قواعد البيانات ومعالجة طلبات النطاق وتأمين الحماية، مع إمكانية متابعة المؤشرات التشغيلية والمالية عبر لوحة تحكم دقيقة.</p>
                    </div>

                    <div className="bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
                      <h4 className="text-[#D4AF37] font-bold mb-1">3. نموذج توزيع العوائد (%80 / %20)</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">يستحق الشريك الاستراتيجي 80% من صافي العوائد التشغيلية مقابل 20% لتغطية رسوم تشغيل المنصة وأتمتة الذكاء الاصطناعي والدعم الفني.</p>
                    </div>

                    <div className="bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
                      <h4 className="text-[#D4AF37] font-bold mb-1">4. الحصرية الإقليمية</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">تضمن المنصة حصرية النطاق الجغرافي المسجل للشريك لمنع التضارب التشغيلي طوال فترة سريان العقد.</p>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-3 print:hidden">
                    <a
                      href="/technical-report.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      download="Nexus_Engine_Technical_Report.pdf"
                      className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-black font-extrabold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 hover:opacity-95 transition-all text-center"
                    >
                      <Download className="w-4 h-4" />
                      <span>تحميل التقرير PDF</span>
                    </a>
                    <button
                      onClick={handlePrintPDF}
                      className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
                    >
                      <Printer className="w-4 h-4 text-[#D4AF37]" />
                      <span>طباعة</span>
                    </button>
                  </div>
                </div>
              )}

              {modal.type === 'qualification' && (
                <div className="space-y-4">
                  <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                    <div className="text-xs">
                      <p className="font-bold text-emerald-300">تم تسجيل طلب التأهيل بنجاح</p>
                      <p className="text-gray-400 mt-0.5">تم إرسال نسخة المراجعة ومسودة الاتفاقية إلى بريدك الإلكتروني.</p>
                    </div>
                  </div>

                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-2 text-xs">
                    <div className="flex justify-between"><span className="text-gray-400">الشريك المتقدم:</span><span className="font-bold text-[#D4AF37]">{modal.data?.partner}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">البريد الإلكتروني:</span><span className="font-bold text-[#D4AF37]">{modal.data?.email}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">النطاق المطلوب:</span><span className="font-bold text-[#D4AF37]">{modal.data?.region}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">القطاع:</span><span className="font-bold text-[#D4AF37]">{modal.data?.sector}</span></div>
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-white/5 flex justify-end print:hidden">
                <button
                  onClick={() => setModal(null)}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  إغلاق
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </main>
  );
}
