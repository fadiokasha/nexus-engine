"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ShieldCheck, Zap, Lock, CheckCircle2, X, Download, FileText } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Modal: عرض التقرير الفني بعد نجاح نموذج تحميل التقرير              */
/* ------------------------------------------------------------------ */

interface ReportModalProps {
  requestId: string;
  reportUrl: string;
  onClose: () => void;
}

function ReportModal({ requestId, reportUrl, onClose }: ReportModalProps) {
  // إغلاق بمفتاح Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-[#1B222C] border border-[#D4AF37]/30 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D4AF37]/20">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#D4AF37]" />
            <h2 id="report-modal-title" className="font-bold text-white">
              التقرير الفني
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="إغلاق"
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body: معاينة PDF */}
        {/*
          ملاحظات مهمة بخصوص "الصفحة البيضاء الإضافية":
          1. #toolbar=0&navpanes=0&view=FitH يوقف شريط أدوات وقائمة الصفحات
             الجانبية لمتصفح Chrome/Edge PDF viewer، اللي أحيانًا تُظهر
             مساحة بيضاء زايدة أو thumbnail لصفحة فاضية بجنب المحتوى.
          2. لو "الصفحة البيضاء" موجودة داخل ملف الـ PDF نفسه (صفحة أخيرة
             فاضية فعليًا)، هذا مو مشكلة عرض — لازم تفتح الملف الأصلي
             وتتأكد من عدد الصفحات الحقيقي وتصلّحه من مصدره (Word/InDesign/
             أداة التصدير)، لأن الـ iframe يعرض الملف كما هو بالضبط.
          3. Firefox يتجاهل بعض هذي الباراميترات (viewer مختلف) — لهذا
             حطينا key={reportUrl} تحت عشان يعيد تحميل iframe نظيف بدل ما
             يحتفظ بحالة viewer قديمة لو المستخدم فتح أكثر من تقرير بنفس الجلسة.
        */}
        <div className="flex-1 overflow-hidden bg-white">
          <iframe
            key={reportUrl}
            src={`${reportUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
            title="التقرير الفني"
            className="w-full h-full min-h-[65vh] border-0 block"
          />
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-[#D4AF37]/20">
          <span className="text-xs text-gray-500 font-mono">رقم الطلب: {requestId}</span>
          <a
            href={reportUrl}
            download
            className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            تحميل الملف
          </a>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  نموذج تحميل التقرير الفني (Lead Magnet)                            */
/* ------------------------------------------------------------------ */

function ReportRequestForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [modalData, setModalData] = useState<{ requestId: string; reportUrl: string } | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus("submitting");
      setErrorMsg("");

      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullName, email }),
        });

        const data = await res.json();

        if (!res.ok) {
          setStatus("error");
          setErrorMsg(data.error ?? "تعذر إرسال الطلب");
          return;
        }

        setStatus("idle");
        setModalData({ requestId: data.requestId, reportUrl: data.reportUrl ?? "/technical-report.pdf" });
      } catch {
        setStatus("error");
        setErrorMsg("تعذر الاتصال بالسيرفر، تأكد من اتصالك وحاول مرة ثانية");
      }
    },
    [fullName, email]
  );

  return (
    <>
      <div className="bg-[#1B222C] border border-[#D4AF37]/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-[#D4AF37]" />
          <h3 className="font-bold text-lg">حمّل التقرير الفني</h3>
        </div>
        <p className="text-gray-400 text-sm mb-6">
          نظرة تقنية عامة على منصة Nexus Engine. هذا تحميل معلوماتي فقط ولا يشكّل تسجيلاً أو طلب شراكة.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {status === "error" && (
            <div className="bg-red-500/10 border border-red-500/40 text-red-300 text-sm rounded-lg px-4 py-3">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">الاسم الكامل</label>
            <input
              type="text"
              required
              minLength={2}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-[#0B0C10] border border-[#D4AF37]/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0B0C10] border border-[#D4AF37]/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full flex items-center justify-center gap-2 bg-transparent border border-[#D4AF37] hover:bg-[#D4AF37]/10 disabled:opacity-50 text-[#D4AF37] font-bold py-3 rounded-lg transition-colors"
          >
            {status === "submitting" ? (
              "جاري التحضير..."
            ) : (
              <>
                <Download className="w-4 h-4" />
                عرض وتحميل التقرير
              </>
            )}
          </button>
        </form>
      </div>

      {modalData && (
        <ReportModal
          requestId={modalData.requestId}
          reportUrl={modalData.reportUrl}
          onClose={() => setModalData(null)}
        />
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  نموذج طلب الشراكة الأصلي (مسار منفصل عبر /api/vetting)             */
/* ------------------------------------------------------------------ */

function VettingForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    sector: "real-estate",
    region: "",
    capital: "50k-100k",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "submitted" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [units, setUnits] = useState<{ total: number; available: number } | null>(null);

  useEffect(() => {
    fetch("/api/units")
      .then((res) => res.json())
      .then(setUnits)
      .catch(() => setUnits(null));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/vetting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("submitted");
      } else {
        setStatus("error");
        setErrorMsg(data.error ?? "حصل خطأ غير متوقع");
      }
    } catch {
      setStatus("error");
      setErrorMsg("تعذر الاتصال بالسيرفر، تأكد من اتصالك وحاول مرة ثانية");
    }
  };

  return (
    <div className="bg-[#1B222C] border border-[#D4AF37]/30 p-8 rounded-2xl shadow-xl">
      {status !== "submitted" ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <h3 className="text-xl font-bold text-[#D4AF37] mb-4">تقديم طلب تقييم النطاق الجغرافي</h3>

          {status === "error" && (
            <div className="bg-red-500/10 border border-red-500/40 text-red-300 text-sm rounded-lg px-4 py-3">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">الاسم الكامل</label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full bg-[#0B0C10] border border-[#D4AF37]/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">البريد الإلكتروني الرسمي</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#0B0C10] border border-[#D4AF37]/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">القطاع المستهدف</label>
            <select
              value={formData.sector}
              onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
              className="w-full bg-[#0B0C10] border border-[#D4AF37]/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="real-estate">العقارات الرقمية</option>
              <option value="e-commerce">التجارة الإلكترونية</option>
              <option value="consulting">الخدمات الاستشارية</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">النطاق الجغرافي المطلوب</label>
            <input
              type="text"
              required
              placeholder="المدينة / الدولة"
              value={formData.region}
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              className="w-full bg-[#0B0C10] border border-[#D4AF37]/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <label className="flex items-start gap-2 text-xs text-gray-400 pt-2">
            <input type="checkbox" required className="mt-0.5" />
            أقر بأنني اطّلعت على{" "}
            <Link href="/terms" className="text-[#D4AF37] underline">
              وثيقة الترخيص
            </Link>{" "}
            و{" "}
            <Link href="/disclaimer" className="text-[#D4AF37] underline">
              إخلاء المسؤولية
            </Link>{" "}
            وأن تقديم هذا الطلب لا يعني قبولاً مضمونًا.
          </label>

          <button
            type="submit"
            disabled={status === "submitting" || (units !== null && units.available === 0)}
            className="w-full bg-[#D4AF37] hover:bg-[#E5C158] disabled:opacity-50 text-black font-bold py-3.5 rounded-lg transition-all mt-4"
          >
            {status === "submitting" ? "جاري إرسال الطلب..." : "إرسال الطلب للمراجعة"}
          </button>

          {units && (
            <p className="text-center text-xs text-gray-500">
              {units.available > 0 ? `${units.available} وحدة متاحة من أصل ${units.total}` : "لا توجد وحدات متاحة حاليًا"}
            </p>
          )}
        </form>
      ) : (
        <div className="text-center py-6 space-y-4">
          <CheckCircle2 className="w-12 h-12 text-[#D4AF37] mx-auto" />
          <h4 className="text-xl font-bold">تم استلام طلبك بنجاح</h4>
          <p className="text-gray-400 text-sm">
            سيقوم فريق المراجعة بالتواصل معك عبر البريد الإلكتروني (
            <span className="text-white">{formData.email}</span>) بعد دراسة النطاق الجغرافي المتاح. تقديم الطلب
            لا يشكّل موافقة أو قبولاً.
          </p>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  الصفحة الرئيسية                                                    */
/* ------------------------------------------------------------------ */

export default function NexusEngineLanding() {
  return (
    <div className="min-h-screen bg-[#0B0C10] text-white font-sans selection:bg-[#D4AF37] selection:text-black">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0B0C10]/80 border-b border-[#D4AF37]/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 border-2 border-[#D4AF37] rotate-45 flex items-center justify-center bg-[#1B222C]">
              <span className="text-[#D4AF37] -rotate-45 font-black text-xl">N</span>
            </div>
            <div>
              <span className="text-xl font-black tracking-wider text-white block">
                NEXUS <span className="text-[#D4AF37]">ENGINE</span>
              </span>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-light">
                برنامج ترخيص وشراكة تشغيل رقمي
              </span>
            </div>
          </div>
        </div>
      </header>

      <section className="pt-16 pb-12 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
          منظومة{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-yellow-100 to-[#D4AF37]">
            الترخيص الرقمي
          </span>{" "}
          المدعومة بالذكاء الاصطناعي
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto mb-6">
          ترخيص تشغيل لمنصتنا التقنية، بهيكل توزيع مالي مبني على نسبة 92% لصاحب الترخيص و8% رسوم تشغيل للمنصة —
          حسب التفاصيل الكاملة في اتفاقية الترخيص.
        </p>
        <p className="text-xs text-gray-500 max-w-xl mx-auto">
          هذا برنامج ترخيص تجاري وليس عرض أوراق مالية أو صندوق استثماري. النسب المذكورة تقديرية وتخضع للشروط
          الكاملة في{" "}
          <Link href="/terms" className="text-[#D4AF37] underline">
            وثيقة الترخيص
          </Link>{" "}
          و{" "}
          <Link href="/disclaimer" className="text-[#D4AF37] underline">
            إخلاء المسؤولية
          </Link>
          .
        </p>
      </section>

      <section className="py-12 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        <div className="bg-[#1B222C] border border-[#D4AF37]/20 p-6 rounded-2xl">
          <Zap className="w-6 h-6 text-[#D4AF37] mb-4" />
          <h3 className="font-bold mb-2">أتمتة تشغيلية</h3>
          <p className="text-gray-400 text-sm">أدوات مؤتمتة لإدارة العمليات اليومية للمرخّص له.</p>
        </div>
        <div className="bg-[#1B222C] border border-[#D4AF37]/20 p-6 rounded-2xl">
          <ShieldCheck className="w-6 h-6 text-[#D4AF37] mb-4" />
          <h3 className="font-bold mb-2">توزيع مالي موثّق</h3>
          <p className="text-gray-400 text-sm">تحويلات مسجّلة وفق دورة محددة في العقد، بعد الرسوم والضريبة.</p>
        </div>
        <div className="bg-[#1B222C] border border-[#D4AF37]/20 p-6 rounded-2xl">
          <Lock className="w-6 h-6 text-[#D4AF37] mb-4" />
          <h3 className="font-bold mb-2">حصرية نطاق عند التوفر</h3>
          <p className="text-gray-400 text-sm">حصرية جغرافية حسب توفر النطاق الفعلي، موثقة بالعقد.</p>
        </div>
      </section>

      {/* نموذج تحميل التقرير الفني - Lead Magnet مستقل */}
      <section className="py-12 px-6 max-w-2xl mx-auto">
        <ReportRequestForm />
      </section>

      {/* نموذج طلب الشراكة - مسار مستقل بنظامه الاعتمادي عبر /admin */}
      <section className="py-12 px-6 max-w-2xl mx-auto" id="vetting-section">
        <VettingForm />
      </section>

      <footer className="border-t border-[#D4AF37]/10 py-6 text-center text-xs text-gray-500 space-y-2 px-6">
        <p>© 2026 Nexus Engine. جميع الحقوق محفوظة.</p>
        <p className="flex justify-center gap-4 flex-wrap">
          <Link href="/privacy" className="underline hover:text-gray-300">
            سياسة الخصوصية
          </Link>
          <Link href="/terms" className="underline hover:text-gray-300">
            وثيقة الترخيص
          </Link>
          <Link href="/disclaimer" className="underline hover:text-gray-300">
            إخلاء المسؤولية
          </Link>
        </p>
      </footer>
    </div>
  );
}
