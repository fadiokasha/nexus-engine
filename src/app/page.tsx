"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  ShieldCheck,
  Zap,
  Lock,
  CheckCircle2,
  X,
  Download,
  FileText,
  Phone,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Modal عام قابل لإعادة الاستخدام (يُستخدم للمحتوى القانوني)          */
/* ------------------------------------------------------------------ */

interface BaseModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

function BaseModal({ title, onClose, children, icon }: BaseModalProps) {
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
      onClick={onClose}
    >
      <div
        dir="rtl"
        className="bg-[#1B222C] border border-[#D4AF37]/30 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D4AF37]/20 shrink-0">
          <div className="flex items-center gap-2">
            {icon}
            <h2 className="font-bold text-white">{title}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="إغلاق"
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5 text-sm text-gray-300 leading-relaxed space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  محتوى الروابط القانونية (مسودات — راجع ملاحظة أسفل كل صندوق)        */
/* ------------------------------------------------------------------ */

function DraftNotice({ text }: { text: string }) {
  return (
    <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-200 text-xs rounded-lg px-4 py-3">
      {text}
    </div>
  );
}

function PrivacyModalContent() {
  return (
    <>
      <DraftNotice text="⚠️ مسودة أولية غير نهائية وغير مراجعة من محامٍ. لا تُعتمد قبل مراجعة مستشار قانوني مختص بحماية البيانات." />
      <p>[ضع هنا: البيانات التي تُجمع فعليًا من الاستمارات — الاسم، البريد، الجوال، المنطقة]</p>
      <p>[ضع هنا: الغرض من جمع البيانات ومدة الاحتفاظ بها]</p>
      <p>[ضع هنا: حقوق المستخدم بالوصول لبياناته أو حذفها وكيفية التواصل]</p>
      <p>[ضع هنا: بيانات التواصل الرسمية للشركة المسجلة]</p>
    </>
  );
}

function TermsModalContent() {
  return (
    <>
      <DraftNotice text="⚠️ مسودة أولية فقط، وليست وثيقة قانونية نهائية. يجب مراجعتها من محامٍ مختص بأنظمة الامتياز التجاري والاستثمار قبل تفعيل أي طلب فعلي." />
      <p>[ضع هنا: تعريف دقيق لما يحصل عليه الشريك المرخّص له فعليًا]</p>
      <p>[ضع هنا: آلية احتساب وتوزيع نسبة العمولة بالتفصيل، ومتى وكيف يتم التحويل]</p>
      <p>[ضع هنا: مدة الترخيص، شروط التجديد أو الإنهاء من الطرفين]</p>
      <p className="font-semibold text-white">
        ملاحظة: النسب المذكورة بالموقع تقديرية وتخضع للاتفاقية الموقعة، وليست وعدًا بعائد استثماري مضمون.
      </p>
    </>
  );
}

function DisclaimerModalContent() {
  return (
    <>
      <DraftNotice text="⚠️ مسودة أولية — راجعها مع مستشار قانوني قبل الاعتماد النهائي." />
      <p>
        البرنامج الموضح في هذا الموقع هو ترخيص تشغيلي/تجاري وليس عرضًا لأوراق مالية أو صندوقًا استثماريًا أو ضمانًا
        لأي عائد مالي.
      </p>
      <p>
        النسب المالية المذكورة تقديرية، محسوبة بناءً على افتراضات تشغيلية حالية، وقابلة للتغيير. لا تمثل وعدًا أو
        ضمانًا بعائد مستقبلي.
      </p>
      <p>تقديم أي طلب عبر هذا الموقع لا يشكّل قبولاً أو موافقة، وجميع الطلبات تخضع لمراجعة فعلية من الإدارة.</p>
    </>
  );
}

type LegalKey = "privacy" | "terms" | "disclaimer" | null;

const LEGAL_META: Record<Exclude<LegalKey, null>, { title: string; content: React.ReactNode }> = {
  privacy: { title: "سياسة الخصوصية", content: <PrivacyModalContent /> },
  terms: { title: "وثيقة الترخيص", content: <TermsModalContent /> },
  disclaimer: { title: "إخلاء المسؤولية", content: <DisclaimerModalContent /> },
};

/* ------------------------------------------------------------------ */
/*  Modal عرض التقرير الفني (PDF) بعد نجاح نموذج تحميل التقرير          */
/* ------------------------------------------------------------------ */

interface ReportModalProps {
  requestId: string;
  reportUrl: string;
  onClose: () => void;
}

function ReportModal({ requestId, reportUrl, onClose }: ReportModalProps) {
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
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D4AF37]/20 shrink-0">
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

        {/* ملاحظة: لو ظهرت صفحة بيضاء إضافية داخل المعاينة رغم باراميترات
            العرض أدناه، الأغلب إنها موجودة فعليًا داخل ملف الـ PDF نفسه —
            راجع الملف الأصلي وعدد صفحاته الحقيقي. */}
        <div className="flex-1 overflow-hidden bg-white">
          <iframe
            key={reportUrl}
            src={`${reportUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
            title="التقرير الفني"
            className="w-full h-full min-h-[65vh] border-0 block"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-[#D4AF37]/20 shrink-0">
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
/*  أداة مساعدة: تحليل استجابة fetch بأمان (تشخيص أفضل لأخطاء السيرفر)  */
/* ------------------------------------------------------------------ */

async function safeParseResponse(res: Response): Promise<{ ok: boolean; data: any; rawErrorText?: string }> {
  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    // السيرفر رجّع شي مو JSON (صفحة خطأ HTML من Vercel مثلاً) — نلتقط النص
    // الخام عشان تظهر رسالة مفيدة بدل "تعذر الاتصال بالسيرفر" العامة
    const text = await res.text();
    return { ok: false, data: null, rawErrorText: text.slice(0, 200) };
  }
  const data = await res.json();
  return { ok: res.ok, data };
}

/* ------------------------------------------------------------------ */
/*  نموذج تحميل التقرير الفني (Lead Magnet)                            */
/* ------------------------------------------------------------------ */

function ReportRequestForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
          body: JSON.stringify({ fullName, email, phone }),
        });

        const { ok, data, rawErrorText } = await safeParseResponse(res);

        if (!ok) {
          setStatus("error");
          setErrorMsg(data?.error ?? rawErrorText ?? "تعذر إرسال الطلب");
          return;
        }

        setStatus("idle");
        setModalData({ requestId: data.requestId, reportUrl: data.reportUrl ?? "/technical-report.pdf" });
      } catch (err) {
        console.error("register submit error:", err);
        setStatus("error");
        setErrorMsg("تعذر الاتصال بالسيرفر، تأكد من اتصالك وحاول مرة ثانية");
      }
    },
    [fullName, email, phone]
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

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">رقم الجوال / الواتساب</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                placeholder="05xxxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#0B0C10] border border-[#D4AF37]/20 rounded-lg pr-10 pl-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
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
/*  نموذج طلب التأهيل للشراكة (مسار منفصل عبر /api/vetting)             */
/* ------------------------------------------------------------------ */

function VettingForm({ onOpenLegal }: { onOpenLegal: (key: Exclude<LegalKey, null>) => void }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    sector: "real-estate",
    region: "",
    capital: "50k-100k",
  });

  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [units, setUnits] = useState<{ total: number; available: number } | null>(null);

  useEffect(() => {
    fetch("/api/units")
      .then(async (res) => {
        const { ok, data } = await safeParseResponse(res);
        if (ok) setUnits(data);
      })
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

      const { ok, data, rawErrorText } = await safeParseResponse(res);

      if (ok) {
        setStatus("submitted");
      } else {
        setStatus("error");
        // نعرض رسالة السيرفر الحقيقية بدل رسالة عامة، تسهّل تشخيص أي عطل مستقبلي
        setErrorMsg(data?.error ?? rawErrorText ?? "حصل خطأ غير متوقع من السيرفر");
      }
    } catch (err) {
      console.error("vetting submit error:", err);
      setStatus("error");
      setErrorMsg("تعذر الاتصال بالسيرفر. تأكد إن متغيرات Supabase مضبوطة صح على Vercel، أو حاول مرة ثانية.");
    }
  };

  return (
    <div className="bg-[#1B222C] border border-[#D4AF37]/30 p-8 rounded-2xl shadow-xl">
      {status !== "submitted" ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="mb-2">
            <h3 className="text-xl md:text-2xl font-black text-[#D4AF37] mb-2">
              طلب التأهيل للامتياز الجغرافي
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              مراجعة تفصيلية لأهلية النطاق الجغرافي المطلوب، تجريها لجنة مختصة قبل أي اعتماد. تعبئة هذا النموذج
              خطوة تقييم أولى، وليست تسجيلاً نهائيًا أو التزامًا من أي طرف.
            </p>
          </div>

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

          {/* Checkbox: اتجاه RTL صحيح — النص والروابط بعنصر span واحد
              محاذي بجانب المربع، بدل ما يكونوا أبناء متفرقين لعنصر label
              يلفّون بشكل عشوائي */}
          <label className="flex items-start gap-2 text-xs text-gray-400 pt-2 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 shrink-0"
            />
            <span className="leading-relaxed">
              أقر بأنني اطّلعت على{" "}
              <button
                type="button"
                onClick={() => onOpenLegal("terms")}
                className="text-[#D4AF37] underline underline-offset-2"
              >
                وثيقة الترخيص
              </button>{" "}
              و{" "}
              <button
                type="button"
                onClick={() => onOpenLegal("disclaimer")}
                className="text-[#D4AF37] underline underline-offset-2"
              >
                إخلاء المسؤولية
              </button>
              ، وأن تقديم هذا الطلب لا يعني قبولاً مضمونًا.
            </span>
          </label>

          <button
            type="submit"
            disabled={status === "submitting" || !agreed || (units !== null && units.available === 0)}
            className="w-full bg-[#D4AF37] hover:bg-[#E5C158] disabled:opacity-50 text-black font-bold py-3.5 rounded-lg transition-all mt-4"
          >
            {status === "submitting" ? "جاري إرسال الطلب..." : "إرسال الطلب للمراجعة"}
          </button>

          {units && (
            <p className="text-center text-xs text-gray-500">
              {units.available > 0
                ? `${units.available} وحدة متاحة من أصل ${units.total}`
                : "لا توجد وحدات متاحة حاليًا"}
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
  const [openLegal, setOpenLegal] = useState<LegalKey>(null);

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0B0C10]/80 border-b border-[#D4AF37]/20 px-6 py-5">
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

      {/* Hero — فاصل رأسي أكبر بعد الهيدر + عنوان بدون انكسار كارثي */}
      <section className="pt-24 md:pt-28 pb-16 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black leading-[1.3] md:leading-[1.25] mb-8 [text-wrap:balance]">
          منظومة{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-yellow-100 to-[#D4AF37]">
            الترخيص الرقمي
          </span>{" "}
          المدعومة{"\u00A0"}بالذكاء{"\u00A0"}الاصطناعي
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto mb-6">
          ترخيص تشغيل لمنصتنا التقنية، بهيكل توزيع مالي مبني على نسبة 80% للشريك المرخّص له و20% لتشغيل المنصة
          والذكاء الاصطناعي — نسبة تقديرية حسب تفاصيل اتفاقية الترخيص الكاملة.
        </p>
        <p className="text-xs text-gray-500 max-w-xl mx-auto">
          هذا برنامج ترخيص تجاري وليس عرض أوراق مالية أو صندوق استثماري. النسب المذكورة تقديرية وتخضع للشروط
          الكاملة في{" "}
          <button onClick={() => setOpenLegal("terms")} className="text-[#D4AF37] underline underline-offset-2">
            وثيقة الترخيص
          </button>{" "}
          و{" "}
          <button
            onClick={() => setOpenLegal("disclaimer")}
            className="text-[#D4AF37] underline underline-offset-2"
          >
            إخلاء المسؤولية
          </button>
          .
        </p>
      </section>

      {/* Value Pillars */}
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

      {/* نموذج طلب التأهيل - مسار مستقل بنظامه الاعتمادي عبر /admin */}
      <section className="py-12 px-6 max-w-2xl mx-auto" id="vetting-section">
        <VettingForm onOpenLegal={setOpenLegal} />
      </section>

      {/* Footer — روابط تفتح Modals بدل صفحات منفصلة */}
      <footer className="border-t border-[#D4AF37]/10 py-6 text-center text-xs text-gray-500 space-y-2 px-6">
        <p>© 2026 Nexus Engine. جميع الحقوق محفوظة.</p>
        <p className="flex justify-center gap-4 flex-wrap">
          <button onClick={() => setOpenLegal("privacy")} className="underline hover:text-gray-300">
            سياسة الخصوصية
          </button>
          <button onClick={() => setOpenLegal("terms")} className="underline hover:text-gray-300">
            وثيقة الترخيص
          </button>
          <button onClick={() => setOpenLegal("disclaimer")} className="underline hover:text-gray-300">
            إخلاء المسؤولية
          </button>
        </p>
      </footer>

      {openLegal && (
        <BaseModal
          title={LEGAL_META[openLegal].title}
          icon={<FileText className="w-5 h-5 text-[#D4AF37]" />}
          onClose={() => setOpenLegal(null)}
        >
          {LEGAL_META[openLegal].content}
        </BaseModal>
      )}
    </div>
  );
}
