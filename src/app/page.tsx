"use client";

import React, { useState } from "react";
import { 
  FileText, 
  Download, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Building2, 
  Mail, 
  User, 
  Phone, 
  MapPin, 
  ArrowLeft,
  FileDown
} from "lucide-react";

export default function NexusEnginePage() {
  // الحالات (States)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // بيانات النموذج
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    sector: "",
    region: "",
    agreeTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // إرسال طلب التقرير والإيميل
  const handleOpenReportModal = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // إرسال الإيميل آلياً من خلال API
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: formData.fullName || "Fadi Azhari",
          userEmail: formData.email || "fadlazhari90@gmail.com",
          pdfDownloadUrl: "/technical-report.pdf", // رابط الـ PDF المباشر
        }),
      });
    } catch (err) {
      console.error("خطأ في إرسال البريد:", err);
    } finally {
      setIsLoading(false);
      setIsModalOpen(true);
    }
  };

  // إرسال طلب الامتياز
  const handleQualificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeTerms) return;
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 font-sans dir-rtl selection:bg-amber-500 selection:text-slate-950">
      
      {/* الهيدر العلوي */}
      <header className="border-b border-slate-800/80 bg-[#07090e]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-amber-500/20">
              N
            </div>
            <div>
              <h1 className="font-bold text-lg text-white tracking-wide">NEXUS ENGINE</h1>
              <p className="text-[11px] text-slate-400">برنامج ترخيص وإدارة تشغيل رقمي</p>
            </div>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-full text-xs text-amber-400 font-medium">
            المقاعد المتاحة: 15 مقعداً استراتيجياً
          </div>
        </div>
      </header>

      {/* القسم الرئيسي / Hero Section */}
      <main className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        
        <div className="text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
            تحالف الـ 15 الاستراتيجي — سيادة تشغيلية وحرية زمنية
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            منظومة إدارة الأصول الرقمية المؤتمتة
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            امتلك امتياز تشغيل النطاق الإقليمي كـ "مالك استراتيجي للأصل الرقمي". أمنة برمجية كاملة تتولى التشغيل والذكاء الاصطناعي دون أعباء إدارية أو صيانات.
          </p>
        </div>

        {/* توزيع العوائد المميز */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800/50 to-slate-900 p-6 rounded-2xl border border-slate-800 text-center max-w-3xl mx-auto shadow-xl">
          <h3 className="text-sm font-semibold text-slate-300 mb-2">هيكل توزيع العوائد:</h3>
          <p className="text-base md:text-lg font-bold text-white">
            يستحق الشريك الاستراتيجي <span className="text-amber-400 font-extrabold text-xl">80%</span> من صافي العوائد التشغيلية مقابل <span className="text-amber-400 font-extrabold text-xl">20%</span> رسوم تشغيل المنصة والذكاء الاصطناعي.
          </p>
        </div>

        {/* الميزات الرئيسية */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 flex items-start gap-4">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base mb-1">أتمتة تشغيلية بالذكاء الاصطناعي</h4>
              <p className="text-slate-400 text-xs leading-relaxed">أدوات مؤتمتة لإدارة العمليات اليومية للمرخص له، تضمن استمرار العمل على مدار الساعة.</p>
            </div>
          </div>

          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 flex items-start gap-4">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base mb-1">توزيع مالي موثق (80% / 20%)</h4>
              <p className="text-slate-400 text-xs leading-relaxed">تحويلات مسجلة وفق دورة محددة في العقد، لضمان أعلى عائد استثماري.</p>
            </div>
          </div>
        </div>

        {/* نموذج استعراض التقرير الفني */}
        <section className="bg-slate-900/80 p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 text-amber-400 font-bold text-lg">
                <FileText className="w-5 h-5" />
                <span>استعراض التقرير الفني والملف التقديمي</span>
              </div>
              <p className="text-xs text-slate-400">
                لتحميل واستعراض النظرة التقنية والهيكلية العامة للمنصة
              </p>
            </div>

            <form onSubmit={handleOpenReportModal} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">الاسم الكامل</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute right-3 top-3.5 text-slate-500" />
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="أدخل اسمك الكريم"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pr-10 pl-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute right-3 top-3.5 text-slate-500" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pr-10 pl-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 text-left dir-ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">رقم الجوال</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute right-3 top-3.5 text-slate-500" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+20 123 456 7890"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pr-10 pl-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 text-left dir-ltr"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold shadow-lg shadow-amber-500/10 transition-all text-sm flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span>جاري معالجة الطلب...</span>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>عرض وتحميل التقرير الفني</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </section>

        {/* نموذج طلب التأهيل للامتياز */}
        <section className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800/80">
          <div className="max-w-xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 text-amber-400 font-bold text-lg">
                <Building2 className="w-5 h-5" />
                <span>طلب التأهيل لامتياز الجغرافي والسيادة التشغيلية</span>
              </div>
              <p className="text-xs text-slate-400">
                قدم طلبك لنيل الامتياز الحصري كـ "مالك أصل رقمي مؤمتن" وحجز النطاق المستهدف.
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-emerald-950/40 border border-emerald-800 p-6 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">تم استلام طلب التقديم بنجاح</h4>
                <p className="text-xs text-slate-300">سيتم مراجعة الطلب التواصل معك عبر البريد الإلكتروني المعتمد.</p>
              </div>
            ) : (
              <form onSubmit={handleQualificationSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">القطاع المستهدف</label>
                  <input
                    type="text"
                    name="sector"
                    placeholder="مثال: التجارة الإلكترونية / الأتمتة اللوجستية"
                    value={formData.sector}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">النطاق الجغرافي المطلوب (المدينة / الدولة)</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute right-3 top-3.5 text-slate-500" />
                    <input
                      type="text"
                      name="region"
                      placeholder="مثال: الشرق الأوسط وشمال أفريقيا / مصر / الإمارات"
                      value={formData.region}
                      onChange={handleInputChange}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pr-10 pl-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    className="mt-1 rounded border-slate-800 bg-slate-950 text-amber-500 focus:ring-amber-500"
                  />
                  <label htmlFor="agreeTerms" className="text-xs text-slate-400 leading-relaxed cursor-pointer">
                    أقر بأني اطلعت ووافقت على <span className="text-amber-400 underline">وثيقة الترخيص وإخلاء المسؤولية</span> وأن تقديم هذا الطلب لا يعني قبولاً مضموناً إلا بعد المراجعة.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!formData.agreeTerms}
                  className="w-full py-3.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white font-bold transition-all text-sm flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>إرسال الطلب للمراجعة والاعتماد</span>
                </button>
              </form>
            )}
          </div>
        </section>

      </main>

      {/* النافذة المنبثقة للتقرير الفني (Technical Report Modal) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-right font-sans">
            
            {/* هيدر النافذة */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
              <div>
                <h3 className="text-xl font-bold text-amber-400">
                  التقرير الفني والملف التقديمي الرسمي
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  إدارة الأصول الرقمية المؤتمتة Nexus Engine منظومة
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* بيانات المستفيد */}
            <div className="bg-slate-950/30 px-6 py-3 border-b border-slate-800/60 flex flex-wrap gap-6 text-sm text-slate-300">
              <div>
                <span className="text-slate-500 ml-2">اسم المستفيد:</span>
                <span className="font-semibold text-white">{formData.fullName || "fadi azhari"}</span>
              </div>
              <div>
                <span className="text-slate-500 ml-2">البريد الإلكتروني:</span>
                <span className="font-semibold text-white">{formData.email || "fadlazhari90@gmail.com"}</span>
              </div>
            </div>

            {/* نص التقرير الفني الشامل كاملاً */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-200 leading-relaxed text-sm">
              
              <section className="bg-slate-800/40 p-5 rounded-xl border border-slate-800">
                <h4 className="text-amber-400 font-bold text-base mb-2">
                  1. النظرة العامة والمسارية التقنية
                </h4>
                <p className="text-slate-300 leading-7">
                  منظومة برمجية متكاملة لإدارة وتأهيل الأصول الرقمية المؤتمتة، حيث توفر بنية تحتية سحابية هجينة تعتمد على خوارزميات الذكاء الاصطناعي لمعالجة البيانات والتفاعلات دون الحاجة لإدارة تشغيلية بشرية يومية. تم تصميم هيكلية المنصة لضمان أقصى درجات المرونة والتوسع التلقائي لمواكبة متطلبات السوق الإقليمي والعالمي.
                </p>
              </section>

              <section className="bg-slate-800/40 p-5 rounded-xl border border-slate-800">
                <h4 className="text-amber-400 font-bold text-base mb-2">
                  2. محرك الأتمتة والسيادة التشغيلية
                </h4>
                <p className="text-slate-300 leading-7">
                  يتولى النظام الآلي معالجة طلبات النطاق المخصص، ربط قواعد البيانات، وتنفيذ بروتوكولات الأمان والحماية الذاتية. يحصل المرخص له على صلاحية متابعة الأداء ومراقبة المؤشرات التشغيلية والمالية عبر لوحة تحكم تحليلية متطورة توفر بيانات لحظية شاملة.
                </p>
              </section>

              <section className="bg-slate-800/40 p-5 rounded-xl border border-slate-800">
                <h4 className="text-amber-400 font-bold text-base mb-2">
                  3. نموذج توزيع العوائد والاستحقاق المالي
                </h4>
                <p className="text-slate-300 leading-7">
                  يعتمد النظام نموذج مشاركة صافي العوائد بنسبة 80% للشريك الاستراتيجي مقابل 20% للمنصة لتغطية الرسوم التشغيلية، والتطوير البرمجي المستمر، واستدامة الخوادم السحابية. يتم تسوية العوائد بشكل دوري وآلي وفق الاتفاقية المعتمدة والتراخيص الصادرة.
                </p>
              </section>

              <section className="bg-slate-800/40 p-5 rounded-xl border border-slate-800">
                <h4 className="text-amber-400 font-bold text-base mb-2">
                  4. سياسة الحصرية الإقليمية والتخصيص
                </h4>
                <p className="text-slate-300 leading-7">
                  تضمن المنصة حصرية النطاق الجغرافي المسجل لكل مرخص له لمنع التضارب التشغيلي، وتستمر الحصرية طوال فترة سريان ترخيص الامتياز المعتمد. ويحق للمستفيد التوسع المستقبلي في نطاقات جديدة حسب توفر الشواغر وحجم الاستثمار.
                </p>
              </section>

            </div>

            {/* الأزرار التحمّيل والمباشرة للـ PDF */}
            <div className="p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors text-sm"
              >
                إغلاق النافذة
              </button>

              <a
                href="/technical-report.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Nexus_Engine_Technical_Report.pdf"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold shadow-lg shadow-amber-500/10 transition-all text-sm"
              >
                <FileDown className="w-5 h-5" />
                <span>تحميل / حفظ التقرير بصيغة PDF</span>
              </a>
            </div>

            <div className="bg-slate-950 text-center py-2 text-[11px] text-slate-500 border-t border-slate-900">
              تم إرسال النسخة الكاملة الموثقة من هذا التقرير إلى بريدك الإلكتروني
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
