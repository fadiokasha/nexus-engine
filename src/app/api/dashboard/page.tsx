"use client";

import React, { useState } from "react";

export default function PartnerDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "financials" | "sectors" | "contract">("overview");
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawSubmitted, setWithdrawSubmitted] = useState(false);

  // بيانات الشريك الافتراضية للعرض
  const partnerInfo = {
    id: "NEXUS-832500",
    name: "الشريك الاستراتيجي",
    region: "الشرق الأوسط وشمال أفريقيا",
    status: "نشط — مؤتمت بالكامل",
    sharePercentage: "80%",
    totalRevenue: "$14,250",
    partnerNetEarnings: "$11,400",
    availableBalance: "$3,800",
    activeSectorsCount: 2,
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawSubmitted(true);
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen antialiased selection:bg-amber-500 selection:text-slate-950 font-sans" dir="rtl">
      
      {/* Top Header Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-black tracking-wider text-amber-400">
              NEXUS <span className="text-slate-100">PANEL</span>
            </span>
            <span className="hidden sm:inline-block bg-slate-800 text-slate-400 text-xs px-3 py-1 rounded-full border border-slate-700">
              معرّف الحساب: {partnerInfo.id}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>النظام التشغيلي: نشط (99.9%)</span>
            </div>
            <button 
              onClick={() => window.location.href = "/"}
              className="text-xs text-slate-400 hover:text-slate-100 transition-colors bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 cursor-pointer"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      </header>

      {/* Sub Header / Partner Status Banner */}
      <section className="bg-slate-900/40 border-b border-slate-800/60 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">أهلاً بك، {partnerInfo.name}</h1>
            <p className="text-slate-400 text-xs mt-1">
              النطاق الإقليمي: <span className="text-amber-400 font-semibold">{partnerInfo.region}</span> | نوع الامتياز: <span className="text-slate-200">مالك أصل استراتيجي</span>
            </p>
          </div>
          <button 
            onClick={() => setIsWithdrawOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-300 text-slate-950 font-bold rounded-xl text-xs hover:opacity-95 transition-all shadow-lg shadow-amber-400/10 cursor-pointer"
          >
            طلب تحويل الأرباح المتاحة ({partnerInfo.availableBalance})
          </button>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* Quick KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-slate-400 text-xs font-medium">صافي أرباحك المقررة (80%)</span>
            <div className="text-3xl font-black text-amber-400">{partnerInfo.partnerNetEarnings}</div>
            <span className="text-[10px] text-emerald-400 font-semibold">من إجمالي نشاط قدره {partnerInfo.totalRevenue}</span>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-slate-400 text-xs font-medium">الرصيد المتاح للسحب</span>
            <div className="text-3xl font-black text-slate-100">{partnerInfo.availableBalance}</div>
            <span className="text-[10px] text-slate-500">جاهز للتحويل البنكي الفوري</span>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-slate-400 text-xs font-medium">نسبة توزيع الحصة</span>
            <div className="text-3xl font-black text-emerald-400">{partnerInfo.sharePercentage}</div>
            <span className="text-[10px] text-slate-400">حصة الشريك مقابل 20% للمنصة</span>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-slate-400 text-xs font-medium">القطاعات المفعلة</span>
            <div className="text-3xl font-black text-slate-100">{partnerInfo.activeSectorsCount} / 3</div>
            <span className="text-[10px] text-amber-400 font-semibold">محرك الذكاء الاصطناعي يشتغل آلياً</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
          <button 
            onClick={() => setActiveTab("overview")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${activeTab === "overview" ? "bg-amber-400 text-slate-950" : "bg-slate-900 text-slate-400 hover:text-slate-200"}`}
          >
            📊 ملخص الأداء التشغيلي
          </button>
          <button 
            onClick={() => setActiveTab("financials")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${activeTab === "financials" ? "bg-amber-400 text-slate-950" : "bg-slate-900 text-slate-400 hover:text-slate-200"}`}
          >
            💰 سجل المعاملات والأرباح
          </button>
          <button 
            onClick={() => setActiveTab("sectors")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${activeTab === "sectors" ? "bg-amber-400 text-slate-950" : "bg-slate-900 text-slate-400 hover:text-slate-200"}`}
          >
            🧩 القطاعات والمجالات المفعلة
          </button>
          <button 
            onClick={() => setActiveTab("contract")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${activeTab === "contract" ? "bg-amber-400 text-slate-950" : "bg-slate-900 text-slate-400 hover:text-slate-200"}`}
          >
            📜 العقد الرقمي الموثق
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-amber-400">حالة محرك الأتمتة (NEXUS AI Engine)</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                يعمل المحرك البرمجي حالياً على أتمتة العمليات اليومية وإدارة الصفقات والوساطة في نطاقك الجغرافي دون أي تدخل بشري. يتم تحديث السجلات تلقائياً.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase block mb-1">العمليات المؤتمتة هذا الشهر</span>
                  <span className="text-xl font-bold text-slate-100">1,240 عملية</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase block mb-1">معدل كفاءة الذكاء الاصطناعي</span>
                  <span className="text-xl font-bold text-emerald-400">98.4%</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase block mb-1">تاريخ التحويل القادم</span>
                  <span className="text-xl font-bold text-amber-400">1 من الشهر القادم</span>
                </div>
              </div>
            </div>

            {/* Latest Activity Feed */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <h3 className="text-base font-bold text-slate-100 mb-4">أحدث النشاطات التشغيلية والتلقائية</h3>
              <div className="space-y-3">
                {[
                  { title: "إغلاق صفقة وساطة رقمية مؤتمتة", amount: "+ $450", share: "حُسبت حصتك (80%): $360", time: "قبل ساعتين" },
                  { title: "تجديد خدمة صيانة خوارزمية سحابية", amount: "مغطاة بالكامل", share: "تكلفة 0$ على الشريك", time: "قبل 6 ساعات" },
                  { title: "تحويل أرباح دورية إلى الحساب البنكي", amount: "- $2,500", share: "تم التحويل بنجاح", time: "قبل يومين" },
                ].map((act, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs">
                    <div>
                      <div className="font-semibold text-slate-200">{act.title}</div>
                      <div className="text-[10px] text-amber-400/80 mt-0.5">{act.share}</div>
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-slate-100">{act.amount}</div>
                      <div className="text-[10px] text-slate-500">{act.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Financials */}
        {activeTab === "financials" && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-amber-400">جدول توزيع الأرباح وحركات الحساب</h3>
              <span className="text-xs text-slate-400">التوزيع التشغيلي: 80% للشريك / 20% للمنصة</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">رقم العملية</th>
                    <th className="p-3">نوع النشاط</th>
                    <th className="p-3">العائد الإجمالي</th>
                    <th className="p-3">حصتك (80%)</th>
                    <th className="p-3">حصة المنصة (20%)</th>
                    <th className="p-3">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr>
                    <td className="p-3 font-mono">TX-99012</td>
                    <td className="p-3">عقارات رقمية — عمولة حجز مؤتمت</td>
                    <td className="p-3">$1,000</td>
                    <td className="p-3 font-bold text-amber-400">$800</td>
                    <td className="p-3 text-slate-500">$200</td>
                    <td className="p-3"><span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-[10px]">مكتملة</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">TX-99011</td>
                    <td className="p-3">تجارة لوجستية — معالجة شحنات سحابية</td>
                    <td className="p-3">$2,500</td>
                    <td className="p-3 font-bold text-amber-400">$2,000</td>
                    <td className="p-3 text-slate-500">$500</td>
                    <td className="p-3"><span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-[10px]">مكتملة</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Sectors */}
        {activeTab === "sectors" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-amber-400/30 p-6 rounded-2xl space-y-3">
              <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-md border border-emerald-500/20">مفعل ويعمل</span>
              <h4 className="text-lg font-bold text-slate-100">العقارات الرقمية والوساطة</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                ربط سحابي مؤتمت مع خوارزميات الذكاء الاصطناعي لعرض المشاريع وإدارة العقود.
              </p>
            </div>

            <div className="bg-slate-900 border border-amber-400/30 p-6 rounded-2xl space-y-3">
              <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-md border border-emerald-500/20">مفعل ويعمل</span>
              <h4 className="text-lg font-bold text-slate-100">التجارة الإلكترونية والأنظمة اللوجستية</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                معالجة الطلبات البرمجية والشحن التلقائي ضمن النطاق الإقليمي المعتمد.
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Contract */}
        {activeTab === "contract" && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-bold text-amber-400">وثيقة العقد الرقمي الموثق</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              عقد اتفاقية المشاركة الرقمية المبرم لامتياز تشغيل النطاق الإقليمي بموجب حصة 80% للشريك التشغيلي و 20% للمنصة.
            </p>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 font-mono space-y-2">
              <div>رقم العقد: CTR-NEXUS-2026-832500</div>
              <div>حالة التوثيق: موثق رقمياً بختم المنصة</div>
              <div>نطاق الامتياز: الشرق الأوسط وشمال أفريقيا</div>
            </div>
            <button 
              onClick={() => alert("جاري تحميل نسخة PDF الموثقة من العقد...")}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold rounded-xl text-xs transition-all cursor-pointer"
            >
              📥 تحميل العقد الموثق (PDF)
            </button>
          </div>
        )}

      </main>

      {/* Modal طلب تحويل الأرباح */}
      {isWithdrawOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-400/30 w-full max-w-md rounded-2xl p-6 relative shadow-2xl">
            <button 
              onClick={() => { setIsWithdrawOpen(false); setWithdrawSubmitted(false); }}
              className="absolute top-4 left-4 text-slate-400 hover:text-slate-100 text-lg font-bold p-1 cursor-pointer"
            >
              ✕
            </button>

            {!withdrawSubmitted ? (
              <form onSubmit={handleWithdrawSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-amber-400">طلب تحويل الأرباح</h3>
                <p className="text-slate-300 text-xs">
                  الرصيد المتاح للسحب حالياً: <span className="text-amber-400 font-bold">{partnerInfo.availableBalance}</span>
                </p>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">المبلغ المراد سحبه ($)</label>
                  <input 
                    type="number" 
                    required 
                    max="3800"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="مثال: 1000" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">رقم الحساب البنكي / IBAN</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="SA..." 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-400 text-sm"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3.5 bg-amber-400 text-slate-950 font-bold rounded-xl text-xs hover:bg-amber-300 transition-all cursor-pointer"
                >
                  تأكيد إرسال طلب التحويل
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="text-3xl">✅</div>
                <h4 className="text-lg font-bold text-emerald-400">تم إرسال طلب السحب بنجاح</h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  سيتم معالجة تحويل المبلغ إلى حسابك البنكي المعتمد خلال 24 ساعة عمل.
                </p>
                <button 
                  onClick={() => { setIsWithdrawOpen(false); setWithdrawSubmitted(false); }}
                  className="px-6 py-2 bg-slate-800 text-slate-200 text-xs rounded-xl hover:bg-slate-700 transition-all cursor-pointer"
                >
                  إغلاق
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}