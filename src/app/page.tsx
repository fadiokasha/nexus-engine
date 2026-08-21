'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Building2, 
  ShoppingBag, 
  Cpu, 
  Lock, 
  FileText, 
  CheckCircle2, 
  Upload, 
  CreditCard, 
  ArrowLeft,
  Sparkles,
  Users,
  TrendingUp,
  X
} from 'lucide-react';

export default function HomePage() {
  const [isQualificationOpen, setIsQualificationOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [qualificationSubmitted, setQualificationSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form States
  const [reportForm, setReportForm] = useState({ name: '', email: '', phone: '' });
  const [qualForm, setQualForm] = useState({
    name: '',
    email: '',
    passportNo: '',
    region: 'مصر / الشرق الأوسط',
    sectors: [] as string[],
    receiptFile: '',
  });

  const toggleSector = (sector: string) => {
    setQualForm(prev => ({
      ...prev,
      sectors: prev.sectors.includes(sector)
        ? prev.sectors.filter(s => s !== sector)
        : [...prev.sectors, sector]
    }));
  };

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...reportForm, type: 'report' }),
      });
      setReportSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleQualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...qualForm, type: 'qualification', fee: '600$' }),
      });
      setQualificationSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070a11] text-white font-sans dir-rtl text-right selection:bg-[#D4AF37] selection:text-black">
      
      {/* Header & Seat Badge */}
      <header className="border-b border-slate-800/80 bg-[#070a11]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#AA771C] flex items-center justify-center font-bold text-black text-xl shadow-lg shadow-[#D4AF37]/20">
              N
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-wide text-white">NEXUS ENGINE</h1>
              <p className="text-xs text-slate-400">منظومة إدارة الأصول الرقمية المؤتمتة</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-[#0f172a] border border-[#D4AF37]/30 px-3 py-1.5 rounded-full shadow-inner">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
            <span className="text-xs font-semibold text-amber-200">المقاعد المتاحة: 15 مقعداً استراتيجياً</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 text-xs mb-8">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
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

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            امتلك امتياز تشغيل النطاق الإقليمي كـ &quot;مالك استراتيجي للأصل الرقمي&quot;. أتمتة برمجية كاملة تتولى التشغيل والذكاء الاصطناعي دون أعباء إدارية أو صيانة.
          </p>

          {/* Revenue Distribution Card */}
          <div className="max-w-xl mx-auto mb-10 bg-slate-900/90 border border-[#D4AF37]/30 rounded-2xl p-4 sm:p-6 backdrop-blur-md shadow-2xl">
            <p className="text-sm font-semibold text-amber-400 mb-2">هيكل توزيع العوائد التلقائي</p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              يستحق الشريك الاستراتيجي <span className="text-amber-300 font-bold">80% من صافي العوائد التشغيلية</span> مقابل <span className="text-slate-400">20% رسوم تشغيل المنصة والذكاء الاصطناعي</span>.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsQualificationOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-black font-bold text-base shadow-lg shadow-[#D4AF37]/25 hover:brightness-110 transition flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              حجز النطاق والترخيص الإقليمي ($600)
            </button>
            <button
              onClick={() => setIsReportOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-200 font-medium text-base hover:bg-slate-800 transition flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5 text-[#D4AF37]" />
              طلب التقرير الفني والملف التقديمي
            </button>
          </div>
        </div>
      </section>

      {/* Strategic Modules Section */}
      <section className="py-16 px-4 bg-slate-950/50 border-t border-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-3">القطاعات الاستراتيجية المتاحة للتفعيل</h3>
            <p className="text-slate-400 text-sm">أنظمة ومكونات برمجية مؤتمتة جاهزة للعمل داخل نطاقك الجغرافي</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-md hover:border-[#D4AF37]/50 transition">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-amber-400 bg-amber-400/10 px-2 py-1 rounded">Module 01</span>
              <h4 className="text-lg font-bold text-white mt-3 mb-2">العقارات الرقمية والوساطة</h4>
              <p className="text-xs text-slate-400 leading-relaxed">منظومة مؤتمتة لإدارة وعرض المشاريع العقارية والوساطة السحابية والربط بين المطورين والمستثمرين تلقائياً.</p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-md hover:border-[#D4AF37]/50 transition">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-amber-400 bg-amber-400/10 px-2 py-1 rounded">Module 02</span>
              <h4 className="text-lg font-bold text-white mt-3 mb-2">التجارة الإلكترونية والأنظمة اللوجستية</h4>
              <p className="text-xs text-slate-400 leading-relaxed">بنية تحتية لتشغيل شبكات التجارة السحابية، أتمتة الطلبات، وتتبع الشحنات والربط اللوجستي الذكي.</p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-md hover:border-[#D4AF37]/50 transition">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-amber-400 bg-amber-400/10 px-2 py-1 rounded">Module 03</span>
              <h4 className="text-lg font-bold text-white mt-3 mb-2">الخدمات التقنية والحلول الذكية</h4>
              <p className="text-xs text-slate-400 leading-relaxed">تزويد القطاعات والمؤسسات بحلول الأتمتة، خوارزميات خدمة العملاء الذكية، وأنظمة المبيعات التلقائية.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Vision & Digital Leverage (Glassmorphism Cards) */}
      <section className="py-16 px-4 relative">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-2 shrink-0 h-full bg-[#D4AF37]"></div>
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-[#D4AF37]" />
              <h3 className="text-lg font-bold text-white">الرافعة الرقمية (Digital Leverage)</h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              أنت لا تعمل كموظف تقني ولا تتولى مهام الكتابة أو البرمجة. المنظومة مُصممة لتمنحك أماناً وحرية زمنية كاملة؛ حيث تتولى الخوارزميات الذكية جميع العمليات والصيانة الفنية، بينما يتركز دورك في التوجيه الاستراتيجي وتحصيل العوائد.
            </p>
            <div className="flex items-center gap-4 pt-4 border-t border-white/10 text-xs text-amber-300 font-semibold">
              <span>✓ أتمتة تشغيلية 100%</span>
              <span>✓ حرية زمنية مطلقة</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-[#D4AF37]" />
              <h3 className="text-lg font-bold text-white">رؤية المالك والسيادة الإقليمية</h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              ابتكرنا NEXUS ENGINE لتكون حلولاً سيادية تلغي الأعباء التشغيلية وتتيح إدارة الأصول الرقمية بأعلى مستويات الاقتدار. حصر المنظومة في 15 مقعداً إقليمياً يضمن التركيز الاستثماري العالي والحفاظ على القيمة السيادية والتنظيمية لكل نطاق جغرافي.
            </p>
            <div className="flex items-center gap-4 pt-4 border-t border-white/10 text-xs text-amber-300 font-semibold">
              <span>15 مقعداً حصرياً فقط</span>
              <span>حصرية النطاق الجغرافي</span>
            </div>
          </div>

        </div>
      </section>

      {/* Modal 1: Qualification & $600 License */}
      {isQualificationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0f172a] border border-[#D4AF37]/40 rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl my-8">
            <button 
              onClick={() => setIsQualificationOpen(false)} 
              className="absolute top-5 left-5 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            {!qualificationSubmitted ? (
              <>
                <div className="mb-6">
                  <span className="text-xs font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/20">
                    رسوم الترخيص والتأسيس: $600
                  </span>
                  <h3 className="text-xl font-bold text-white mt-3">حجز النطاق وإصدار عقد المشاركة</h3>
                  <p className="text-xs text-slate-400 mt-1">أدخل بياناتك المعتمدة لتوليد عقد اتفاقية المشاركة الموثق</p>
                </div>

                <form onSubmit={handleQualSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">الاسم الكامل (مطابق للجواز)</label>
                    <input 
                      type="text" 
                      required 
                      value={qualForm.name}
                      onChange={e => setQualForm({...qualForm, name: e.target.value})}
                      placeholder="أدخل اسمك المعتمد" 
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none" 
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 mb-1 font-medium">البريد الإلكتروني</label>
                      <input 
                        type="email" 
                        required 
                        value={qualForm.email}
                        onChange={e => setQualForm({...qualForm, email: e.target.value})}
                        placeholder="name@domain.com" 
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1 font-medium">رقم جواز السفر</label>
                      <input 
                        type="text" 
                        required 
                        value={qualForm.passportNo}
                        onChange={e => setQualForm({...qualForm, passportNo: e.target.value})}
                        placeholder="رقم الجواز الرسمي" 
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">القطاعات المراد تفعيلها</label>
                    <div className="grid grid-cols-1 gap-2 pt-1">
                      {['العقارات الرقمية والوساطة', 'التجارة الإلكترونية والأنظمة اللوجستية', 'الخدمات التقنية والحلول الذكية'].map((sec) => (
                        <label key={sec} className="flex items-center gap-2 p-3 bg-slate-900 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700">
                          <input 
                            type="checkbox" 
                            checked={qualForm.sectors.includes(sec)}
                            onChange={() => toggleSector(sec)}
                            className="accent-[#D4AF37] w-4 h-4" 
                          />
                          <span className="text-xs text-slate-200">{sec}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Bank Details & Receipt Section */}
                  <div className="bg-slate-900/90 border border-amber-500/20 rounded-2xl p-4 mt-4 space-y-3">
                    <div className="flex items-center justify-between text-xs text-amber-400 font-semibold">
                      <span className="flex items-center gap-1.5"><CreditCard className="w-4 h-4" /> بيانات الحساب البنكي المباشر (IBAN)</span>
                      <span>رسوم الترخيص: $600</span>
                    </div>
                    <div className="text-xs text-slate-300 font-mono space-y-1 bg-black/40 p-3 rounded-xl border border-white/5 dir-ltr text-left">
                      <p><span className="text-slate-500">Bank Name:</span> Abu Dhabi Islamic Bank (ADIB)</p>
                      <p><span className="text-slate-500">Account Name:</span> NEXUS ENGINE LTD</p>
                      <p><span className="text-slate-500">IBAN:</span> EG79003600010000000012345678</p>
                    </div>

                    <div className="pt-2">
                      <label className="block text-xs text-slate-300 mb-1">رفع صورة إشعار التحويل البنكي أو صورة الجواز</label>
                      <div className="flex items-center justify-center border border-dashed border-slate-700 rounded-xl p-3 bg-slate-950/50 hover:border-[#D4AF37] transition cursor-pointer">
                        <Upload className="w-4 h-4 text-slate-400 ml-2" />
                        <span className="text-xs text-slate-400">اختر الملف أو الإشعار لتأكيد التحويل</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>تشفير بيانات معتمد وفق أعلى معايير الخصوصية والسيادة الرقمية.</span>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-black font-bold text-sm hover:brightness-110 transition mt-4"
                  >
                    {loading ? 'جاري إرسال الطلب...' : 'تأكيد الحجز وتوليد عقد المشاركة ($600)'}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-2xl font-bold text-white">تم استقبال طلب الحجز بنجاح</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  تم إرسال مسودة العقد وتأكيد استلام الطلب إلى بريدك الإلكتروني المعتمد. سيتم مراجعة إشعار التحويل والاعتماد خلال الساعات القادمة.
                </p>
                <button 
                  onClick={() => setIsQualificationOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700"
                >
                  إغلاق النافذة
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal 2: Technical Report */}
      {isReportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0f172a] border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
            <button 
              onClick={() => setIsReportOpen(false)} 
              className="absolute top-5 left-5 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            {!reportSubmitted ? (
              <>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white">طلب التقرير الفني والملف التقديمي</h3>
                  <p className="text-xs text-slate-400 mt-1">أدخل بياناتك لاستلام التقرير الفني الشامل مجاناً</p>
                </div>

                <form onSubmit={handleReportSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">الاسم الكريم</label>
                    <input 
                      type="text" 
                      required 
                      value={reportForm.name}
                      onChange={e => setReportForm({...reportForm, name: e.target.value})}
                      placeholder="أدخل اسمك" 
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none" 
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">البريد الإلكتروني</label>
                    <input 
                      type="email" 
                      required 
                      value={reportForm.email}
                      onChange={e => setReportForm({...reportForm, email: e.target.value})}
                      placeholder="name@domain.com" 
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none" 
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">رقم الجوال / الواتساب</label>
                    <input 
                      type="tel" 
                      required 
                      value={reportForm.phone}
                      onChange={e => setReportForm({...reportForm, phone: e.target.value})}
                      placeholder="+20 123 456 7890" 
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none" 
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-black font-bold text-sm hover:brightness-110 transition mt-2"
                  >
                    {loading ? 'جاري تجهيز التقرير...' : 'عرض وتحميل التقرير الفني PDF'}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">تم إرسال التقرير الفني</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  تم إرسال النسخة الكاملة من التقرير الفني والملف التقديمي إلى بريدك الإلكتروني بنجاح.
                </p>
                <button 
                  onClick={() => setIsReportOpen(false)}
                  className="px-6 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700"
                >
                  إغلاق النافذة
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <p>© 2026 NEXUS ENGINE. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}
