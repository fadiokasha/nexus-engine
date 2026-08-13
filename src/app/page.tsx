"use client";

import React, { useState } from "react";

export default function Home() {
  // حالات النوافذ المنبثقة
  const [isPath1Open, setIsPath1Open] = useState(false);
  const [isPath2Open, setIsPath2Open] = useState(false);
  const [legalModal, setLegalModal] = useState<string | null>(null);

  // حالات نموذج المسار الأول (توليد العقد والتفعيل)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    passportNumber: "",
    region: "الشرق الأوسط وشمال أفريقيا",
    selectedSectors: [] as string[],
    passportFile: null as File | null,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // حالات نموذج المسار الثاني
  const [path2Data, setPath2Data] = useState({ name: "", email: "", phone: "" });
  const [path2Submitted, setPath2Submitted] = useState(false);

  // التعامل مع اختيار القطاعات
  const handleSectorChange = (sector: string) => {
    if (formData.selectedSectors.includes(sector)) {
      setFormData({
        ...formData,
        selectedSectors: formData.selectedSectors.filter((s) => s !== sector),
      });
    } else {
      setFormData({
        ...formData,
        selectedSectors: [...formData.selectedSectors, sector],
      });
    }
  };

  // إرسال البيانات إلى الـ API وخزن الجواز
  const handlePath1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.selectedSectors.length === 0) {
      alert("يرجى اختيار قطاع تشغيلي واحد على الأقل.");
      return;
    }

    if (!formData.passportFile) {
      alert("يرجى رفع صورة جواز السفر.");
      return;
    }

    setIsSubmitting(true);

    try {
      const dataToSend = new FormData();
      dataToSend.append("fullName", formData.fullName);
      dataToSend.append("email", formData.email);
      dataToSend.append("passportNumber", formData.passportNumber);
      dataToSend.append("region", formData.region);
      dataToSend.append("selectedSectors", JSON.stringify(formData.selectedSectors));
      dataToSend.append("passportFile", formData.passportFile);

      const res = await fetch("/api/register", {
        method: "POST",
        body: dataToSend,
      });

      const result = await res.json();

      if (result.success) {
        setIsSubmitted(true);
      } else {
        alert(result.error || "حدث خطأ أثناء حفظ البيانات.");
      }
    } catch (err) {
      alert("تعذر الاتصال بالخادم، يرجى المحاولة لاحقاً.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePath2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setPath2Submitted(true);
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen antialiased selection:bg-amber-500 selection:text-slate-950" dir="rtl">
      
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black tracking-wider text-amber-400">
              NEXUS <span className="text-slate-100">ENGINE</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2 border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-amber-400 tracking-wide">
              المقاعد المتاحة: 15 مقعداً استراتيجياً
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden border-b border-slate-800/50">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/40 bg-slate-900/80 text-amber-400 text-sm font-bold mb-8 shadow-lg shadow-amber-400/5">
            تحالف الـ 15 الاستراتيجي — سيادة تشغيلية وحرية زمنية
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-100 leading-tight mb-6">
            NEXUS ENGINE — <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-500 via-amber-300 to-amber-500">منظومة إدارة الأصول الرقمية المؤتمتة</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed mb-10">
            امتلك امتياز تشغيل النطاق الإقليمي كـ "مالك استراتيجي للأصل الرقمي". أتمتة برمجية كاملة تتولى التشغيل والذكاء الاصطناعي دون أعباء إدارية أو صيانة.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setIsPath1Open(true)}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 text-slate-950 font-bold rounded-xl shadow-xl shadow-amber-400/10 hover:opacity-95 transition-all text-center cursor-pointer"
            >
              حجز النطاق وتوليد عقد المشاركة
            </button>
            <button 
              onClick={() => setIsPath2Open(true)}
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 border border-slate-700 hover:border-amber-400/50 text-slate-200 font-semibold rounded-xl transition-all text-center cursor-pointer"
            >
              طلب التقرير الفني والملف التقديمي
            </button>
          </div>
        </div>
      </section>

      {/* Sectors Showcase */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-b border-slate-800/60">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-100 mb-4">
            القطاعات الاستراتيجية المتاحة للتفعيل الإقليمي
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
            أنظمة ومكونات برمجية مؤتمتة جاهزة للعمل داخل نطاقك الجغرافي عبر خوارزميات الذكاء الاصطناعي.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-400/40 transition-all flex flex-col justify-between">
            <div>
              <div className="text-3xl mb-4">🏢</div>
              <h3 className="text-xl font-bold text-slate-100 mb-3">العقارات الرقمية والوساطة</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                منظومة مؤتمتة لإدارة وعرض المشاريع العقارية والوساطة السحابية والربط بين المطورين والمستثمرين تلقائياً.
              </p>
            </div>
            <span className="text-xs font-semibold text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded-lg w-fit">Module 01</span>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-400/40 transition-all flex flex-col justify-between">
            <div>
              <div className="text-3xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-slate-100 mb-3">التجارة الإلكترونية والأنظمة اللوجستية</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                بنية تحتية لتشغيل شبكات التجارة السحابية، أتمتة الطلبات، وتتبع الشحنات والربط اللوجستي الذكي.
              </p>
            </div>
            <span className="text-xs font-semibold text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded-lg w-fit">Module 02</span>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-400/40 transition-all flex flex-col justify-between">
            <div>
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-slate-100 mb-3">الخدمات التقنية والحلول الذكية للمؤسسات</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                تزويد القطاعات والمؤسسات بحلول الأتمتة، خوارزميات خدمة العملاء الذكية، وأنظمة المبيعات التلقائية.
              </p>
            </div>
            <span className="text-xs font-semibold text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded-lg w-fit">Module 03</span>
          </div>
        </div>
      </section>

      {/* Model & Profit Split */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-100 mb-4">
            شراكة عادلة وتوزيع عوائد تلقائي
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
            نموذج مشاركة أرباح متوافق مع أحكام المعاملات المالية الإسلامية (عقد مضاربة/مشاركة)، حيث ترتبط أرباحك بالنشاط التشغيلي الفعلي للنطاق.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-400/40 transition-all">
            <div className="text-4xl font-black text-amber-400 mb-2">80%</div>
            <h3 className="text-xl font-bold text-slate-100 mb-3">حصة الشريك التشغيلي (مالك الأصل)</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              أرباح تشغيلية مباشرة ومتغيرة تُحول أوتوماتيكياً إلى حساب الشريك بناءً على حجم الحركة المعتمدة في إقليمه.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-400/40 transition-all">
            <div className="text-4xl font-black text-amber-400 mb-2">20%</div>
            <h3 className="text-xl font-bold text-slate-100 mb-3">حصة المنصة (إدارة وتطوير المنظومة)</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              تغطي التحديثات البرمجية المستمرة، صيانة السيرفرات السحابية، وخوارزميات الذكاء الاصطناعي دون أي تكاليف خفية.
            </p>
          </div>
        </div>
      </section>

      {/* Regional Alliance & Partner Role (تم تصحيح النجمتين هنا) */}
      <section className="py-20 px-6 bg-slate-900/30 border-y border-slate-800/60">
        <div className="max-w-5xl mx-auto bg-gradient-to-b from-slate-900 to-slate-950 p-10 md:p-14 rounded-3xl border border-amber-400/20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-amber-400/5 rounded-full blur-3xl"></div>
          <h2 className="text-2xl md:text-3xl font-black text-amber-400 mb-6">
            دورك كـ "مالك استراتيجي" — أمان وحرية زمنية
          </h2>
          <p className="text-slate-200 text-base md:text-lg leading-relaxed font-normal">
            أنت لا تعمل كموظف تقني ولا تتولى مهام الكتابة أو البرمجة. المنظومة مُصممة لتمنحك{" "}
            <strong className="font-bold text-amber-400">الرافعة الرقمية (Digital Leverage)</strong>
            ؛ حيث تتولى الخوارزميات الذكية جميع العمليات اليومية والصيانة الفنية، بينما يتركز دورك في{" "}
            <strong className="font-bold text-amber-400">
              التوجيه الاستراتيجي، متابعة لوحة الأداء (Dashboard)، وتحصيل العوائد
            </strong>
            .
          </p>
        </div>
      </section>

      {/* Founder's Vision */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="border-r-4 border-amber-400 pr-8 py-2">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-6">رؤية المالك ومؤسس المنصة</h2>
          <blockquote className="text-slate-300 text-lg leading-relaxed space-y-4 font-normal">
            <p>
              «ابتكرنا NEXUS ENGINE لتكون حلولاً سيادية تلغي الأعباء التشغيلية وتتيح إدارة الأصول الرقمية بأعلى مستويات الاقتدار. حصر المنظومة في 15 مقعداً إقليمياً يضمن التركيز الاستثماري العالي، والحفاظ على القيمة السيادية والتنظيمية لكل نطاق جغرافي.»
            </p>
          </blockquote>
        </div>
      </section>

      {/* CTA Routes */}
      <section id="booking" className="py-20 px-6 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-100 mb-4">مسارات الانضمام والاعتماد</h2>
            <p className="text-slate-400">اختر المسار المناسب للبدء في إجراءات الاعتماد الإقليمي</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* المسار الأول */}
            <div className="p-8 rounded-2xl bg-slate-900 border-2 border-amber-400/60 flex flex-col justify-between shadow-xl shadow-amber-400/5">
              <div>
                <div className="inline-block px-3 py-1 bg-amber-400/20 text-amber-400 text-xs font-bold rounded-md mb-4">المسار الأول — التنفيذ المباشر</div>
                <h3 className="text-2xl font-bold text-slate-100 mb-4">حجز النطاق وإصدار عقد المشاركة</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  إدخال البيانات الرسمية، اختيار القطاعات المطلوب تفعيلها، وتوليد عقد المشاركة الرقمي الموثق فوراً.
                </p>
              </div>
              <button 
                onClick={() => setIsPath1Open(true)}
                className="w-full py-4 bg-amber-400 text-slate-950 font-bold rounded-xl hover:bg-amber-300 transition-all cursor-pointer"
              >
                تأكيد الحجز وتوليد العقد
              </button>
            </div>

            {/* المسار الثاني */}
            <div id="preview" className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="inline-block px-3 py-1 bg-slate-800 text-slate-400 text-xs font-bold rounded-md mb-4">المسار الثاني — الاستكشاف</div>
                <h3 className="text-2xl font-bold text-slate-100 mb-4">طلب التقرير الفني والملف التقديمي</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  تقديم طلب رسمي لاستلام التقرير الفني الشامل واضطلاع على معايير الأتمتة والجاهزية قبل الحجز.
                </p>
              </div>
              <button 
                onClick={() => setIsPath2Open(true)}
                className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl transition-all cursor-pointer"
              >
                طلب التقرير الفني
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer & Legal Links */}
      <footer className="py-12 border-t border-slate-800/80 bg-slate-950 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p>© NEXUS ENGINE. جميع الحقوق محفوظة — تحت الحوكمة والإشراف المباشر لمؤسس المنصة.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => setLegalModal("license")} className="hover:text-amber-400 transition-colors underline cursor-pointer">
              وثيقة الترخيص والمشاركة
            </button>
            <span className="text-slate-700">•</span>
            <button onClick={() => setLegalModal("disclaimer")} className="hover:text-amber-400 transition-colors underline cursor-pointer">
              إخلاء المسؤولية
            </button>
            <span className="text-slate-700">•</span>
            <button onClick={() => setLegalModal("privacy")} className="hover:text-amber-400 transition-colors underline cursor-pointer">
              سياسة الخصوصية
            </button>
          </div>
        </div>
      </footer>

      {/* ==================== Modal المسار الأول (حجز النطاق والعقد والإنهاء) ==================== */}
      {isPath1Open && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-amber-400/30 w-full max-w-2xl rounded-2xl p-6 md:p-8 relative shadow-2xl my-8">
            <button 
              onClick={() => { setIsPath1Open(false); setIsSubmitted(false); }}
              className="absolute top-4 left-4 text-slate-400 hover:text-slate-100 text-xl font-bold p-2"
            >
              ✕
            </button>

            {!isSubmitted ? (
              <>
                <h3 className="text-2xl font-bold text-amber-400 mb-2">حجز النطاق وإصدار عقد المشاركة</h3>
                <p className="text-slate-300 text-xs mb-6">
                  أدخل بياناتك الرسمية واختر القطاعات المراد تفعيلها لتوليد عقد اتفاقية المشاركة الموثق.
                </p>

                <form onSubmit={handlePath1Submit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">الاسم الكامل (مطابق لجواز السفر)</label>
                    <input type="text" required value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-400 text-sm"/>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">البريد الإلكتروني</label>
                      <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-400 text-sm"/>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">رقم جواز السفر</label>
                      <input type="text" required value={formData.passportNumber} onChange={(e) => setFormData({...formData, passportNumber: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-400 text-sm"/>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">صورة جواز السفر</label>
                    <input type="file" required onChange={(e) => setFormData({...formData, passportFile: e.target.files ? e.target.files[0] : null})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-300 text-sm"/>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-amber-400 mb-2">القطاعات المراد تفعيلها:</label>
                    <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                      {["العقارات الرقمية والوساطة", "التجارة الإلكترونية والأنظمة اللوجستية", "الخدمات التقنية والحلول الذكية للمؤسسات"].map((sector) => (
                        <label key={sector} className="flex items-center gap-3 cursor-pointer text-xs text-slate-200 hover:text-amber-400">
                          <input type="checkbox" checked={formData.selectedSectors.includes(sector)} onChange={() => handleSectorChange(sector)} className="w-4 h-4 accent-amber-400 rounded"/>
                          <span>{sector}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-amber-400 text-slate-950 font-bold rounded-xl hover:bg-amber-300 transition-all text-sm mt-4 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? "جاري التوليد وحفظ البيانات..." : "توليد عقد المشاركة الرقمي"}
                  </button>
                </form>
              </>
            ) : (
              /* شاشة المعاينة والدفع */
              <div className="space-y-6">
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-semibold text-center">
                  ✓ تم حفظ بياناتك وتوليد مسودة عقد المشاركة الرسمية بنجاح!
                </div>

                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-xs space-y-4 max-h-60 overflow-y-auto leading-relaxed">
                  <h4 className="font-bold text-amber-400 text-center">اتفاقية مشاركة رقمية وتفعيل إقليمي</h4>
                  <p>الطرف الثاني: {formData.fullName} | النطاق: {formData.region}</p>
                  <p>القطاعات المفعلة: {formData.selectedSectors.join(" ، ")}</p>
                  <p className="text-slate-400 border-t border-slate-800 pt-2">
                    يستحق الشريك 80% من صافي العوائد التشغيلية مقابل تفرغ المنصة للتشغيل والذكاء الاصطناعي.
                  </p>
                </div>

                {/* قسم الدفع بالكامل مع طرائق الدفع والتشفير */}
                <div className="bg-slate-950 p-6 rounded-xl border border-amber-400/20 space-y-4">
                  <h4 className="text-lg font-bold text-slate-100">تأمين الامتياز الإقليمي والتشغيل</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    أنت الآن على بعد خطوة من تملك نظامك الرقمي المؤتمت بالكامل. لتفعيل امتيازك الإقليمي (من أصل 15 مقعداً متاحاً فقط)، نقوم بتخصيص الموارد التقنية اللازمة وبدء تشغيل محرك الذكاء الاصطناعي الخاص بك.
                  </p>
                  <div className="flex items-center justify-between py-2 border-y border-slate-800">
                    <span className="text-sm text-slate-300">رسوم التأسيس والربط:</span>
                    <span className="text-2xl font-black text-amber-400">600$</span>
                  </div>
                  
                  <button 
                    onClick={() => alert("سيتم توجيهك الآن إلى بوابة الدفع الآمنة لإتمام رسوم التأسيس.")}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-300 text-slate-950 font-bold rounded-xl text-sm transition-all text-center cursor-pointer shadow-lg hover:shadow-amber-400/20"
                  >
                    امتلاك المقعد وتفعيل النظام
                  </button>

                  {/* طرائق الدفع ومعايير التشفير */}
                  <div className="mt-4 flex flex-col items-center gap-3">
                    <div className="flex flex-wrap justify-center items-center gap-3 opacity-70">
                      <span className="text-[10px] font-semibold text-slate-500 uppercase">يُقبل الدفع عبر:</span>
                      <div className="flex gap-2">
                        <span className="bg-slate-800 px-2 py-1 rounded text-[10px] text-white border border-slate-700">VISA</span>
                        <span className="bg-slate-800 px-2 py-1 rounded text-[10px] text-white border border-slate-700">MADA</span>
                        <span className="bg-slate-800 px-2 py-1 rounded text-[10px] text-white border border-slate-700">MASTERCARD</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-600 text-center">
                      جميع العمليات مشفرة بمعايير SSL العالمية لضمان أمان بياناتك.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== Modal المسار الثاني ==================== */}
      {isPath2Open && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-6 md:p-8 relative shadow-2xl">
            <button 
              onClick={() => { setIsPath2Open(false); setPath2Submitted(false); }}
              className="absolute top-4 left-4 text-slate-400 hover:text-slate-100 text-xl font-bold p-2"
            >
              ✕
            </button>

            {!path2Submitted ? (
              <>
                <h3 className="text-2xl font-bold text-slate-100 mb-2">طلب التقرير الفني والملف التقديمي</h3>
                <p className="text-slate-400 text-xs mb-6">
                  أدخل بياناتك لاستلام التقرير التقني وملف أتمتة الأصول الرقمية.
                </p>

                <form onSubmit={handlePath2Submit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">الاسم الكريم</label>
                    <input 
                      type="text" 
                      required 
                      value={path2Data.name}
                      onChange={(e) => setPath2Data({...path2Data, name: e.target.value})}
                      placeholder="أدخل اسمك" 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-400 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">البريد الإلكتروني</label>
                    <input 
                      type="email" 
                      required 
                      value={path2Data.email}
                      onChange={(e) => setPath2Data({...path2Data, email: e.target.value})}
                      placeholder="name@domain.com" 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-400 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">رقم الهاتف / الواتساب</label>
                    <input 
                      type="tel" 
                      required 
                      value={path2Data.phone}
                      onChange={(e) => setPath2Data({...path2Data, phone: e.target.value})}
                      placeholder="+966..." 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-400 text-sm"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold rounded-xl transition-all text-sm mt-2 cursor-pointer"
                  >
                    إرسال وطلب التقرير الفني
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="text-4xl">📄</div>
                <h4 className="text-xl font-bold text-amber-400">تم استلام طلب التقرير الفني بنجاح</h4>
                <p className="text-slate-300 text-xs max-w-sm mx-auto leading-relaxed">
                  تم إرسال رابط تحميل الملف التقديمي والتقرير الفني لـ NEXUS ENGINE إلى بريدك الإلكتروني ({path2Data.email}).
                </p>
                <button 
                  onClick={() => { setIsPath2Open(false); setPath2Submitted(false); }}
                  className="px-6 py-2.5 bg-slate-800 text-slate-200 rounded-xl text-xs font-bold hover:bg-slate-700 transition-all cursor-pointer"
                >
                  إغلاق
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== Modal الوثائق القانونية ==================== */}
      {legalModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl p-6 md:p-8 relative shadow-2xl max-h-[80vh] overflow-y-auto">
            <button 
              onClick={() => setLegalModal(null)}
              className="absolute top-4 left-4 text-slate-400 hover:text-slate-100 text-xl font-bold p-2"
            >
              ✕
            </button>

            {legalModal === "license" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-amber-400">وثيقة الترخيص والمشاركة الموحدة</h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  تحدد هذه الوثيقة الأطر التنظيمية لاستخدام وتفعيل منظومة NEXUS ENGINE. تمنح المنصة تراخيص تشغيل حصري لـ 15 مرخَّصاً إقليمياً فقط. تخضع الاتفاقية لنظام مشاركة الأرباح المتغيرة (80% للشريك التشغيلي و 20% للمنصة) مع التزام المنصة بالصيانة والتشغيل الذكي الكامل.
                </p>
              </div>
            )}

            {legalModal === "disclaimer" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-amber-400">إخلاء المسؤولية القانونية</h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  منظومة NEXUS ENGINE توفر أصولاً رقمية وبنية تحتية مؤتمتة بالذكاء الاصطناعي. الأرباح المحققة هي عوائد تشغيلية متغيرة تتبع حركة النشاط الفعلي في النطاق الجغرافي وليست فوائد ثابتة أو ضمانات مالية مطلقة.
                </p>
              </div>
            )}

            {legalModal === "privacy" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-amber-400">سياسة الخصوصية وحماية البيانات</h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  نحن نلتزم بأعلى معايير التشفير والسرية لبيانات الجوازات والبيانات الشخصية للمرخص لهم. تُستخدم هذه البيانات حصرياً لتوثيق عقد اتفاقية المشاركة الرقمية وتحديد أسبقية المقعد الإقليمي.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}