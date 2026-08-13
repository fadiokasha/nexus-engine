"use client";

import React, { useEffect, useState, useCallback } from "react";
import { CheckCircle2, XCircle, Loader2, ShieldAlert } from "lucide-react";

interface VettingRequest {
  id: string;
  fullName: string;
  email: string;
  sector: string;
  region: string;
  capital: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
}

const SECTOR_LABELS: Record<string, string> = {
  "real-estate": "العقارات الرقمية",
  "e-commerce": "التجارة الإلكترونية",
  consulting: "الخدمات الاستشارية",
};

const STATUS_META: Record<string, { label: string; color: string }> = {
  pending: { label: "قيد المراجعة", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30" },
  approved: { label: "معتمد", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30" },
  rejected: { label: "مرفوض", color: "text-red-400 bg-red-400/10 border-red-400/30" },
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [requests, setRequests] = useState<VettingRequest[] | null>(null);
  const [loadError, setLoadError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const loadRequests = useCallback(async () => {
    const res = await fetch("/api/admin/requests");
    if (res.status === 401) {
      setAuthed(false);
      return;
    }
    const data = await res.json();
    if (res.ok) {
      setRequests(data.requests);
    } else {
      setLoadError(data.error ?? "تعذر تحميل الطلبات");
    }
  }, []);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/requests");
      if (res.ok) {
        const data = await res.json();
        setRequests(data.requests);
        setAuthed(true);
      }
    })();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setAuthed(true);
        loadRequests();
      } else {
        const data = await res.json();
        setLoginError(data.error ?? "فشل تسجيل الدخول");
      }
    } catch {
      setLoginError("تعذر الاتصال بالسيرفر");
    } finally {
      setLoggingIn(false);
    }
  };

  const decide = async (id: string, decision: "approved" | "rejected") => {
    setBusyId(id);
    setLoadError("");
    try {
      const res = await fetch("/api/admin/decide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, decision }),
      });
      const data = await res.json();
      if (res.ok) {
        setRequests((prev) => prev!.map((r) => (r.id === id ? data.request : r)));
      } else {
        setLoadError(data.error ?? "تعذر تنفيذ الإجراء");
      }
    } catch {
      setLoadError("تعذر الاتصال بالسيرفر");
    } finally {
      setBusyId(null);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0B0C10] text-white flex items-center justify-center px-6">
        <form
          onSubmit={handleLogin}
          className="bg-[#1B222C] border border-[#D4AF37]/30 rounded-2xl p-8 w-full max-w-sm space-y-4"
        >
          <h1 className="text-xl font-bold text-center mb-2">دخول لوحة الإدارة</h1>
          {loginError && (
            <div className="bg-red-500/10 border border-red-500/40 text-red-300 text-sm rounded-lg px-4 py-2">
              {loginError}
            </div>
          )}
          <input
            type="password"
            required
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#0B0C10] border border-[#D4AF37]/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
          />
          <button
            type="submit"
            disabled={loggingIn}
            className="w-full bg-[#D4AF37] hover:bg-[#E5C158] disabled:opacity-50 text-black font-bold py-2.5 rounded-lg"
          >
            {loggingIn ? "جاري الدخول..." : "دخول"}
          </button>
        </form>
      </div>
    );
  }

  if (requests === null) {
    return (
      <div className="min-h-screen bg-[#0B0C10] flex items-center justify-center text-gray-400">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        جاري التحميل...
      </div>
    );
  }

  const pending = requests.filter((r) => r.status === "pending");
  const decided = requests.filter((r) => r.status !== "pending");

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white px-4 py-8 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-200 text-xs rounded-lg px-4 py-3 mb-6 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
          <span>هذه حماية بكلمة مرور واحدة — للاستخدام الجدي مع أكثر من موظف انتقل لـ Supabase Auth.</span>
        </div>

        <h1 className="text-2xl font-black mb-6">لوحة إدارة طلبات الترخيص</h1>

        {loadError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-lg px-4 py-3 mb-6">
            {loadError}
          </div>
        )}

        <section className="mb-10">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
            قيد المراجعة ({pending.length})
          </h2>
          {pending.length === 0 ? (
            <div className="bg-[#1B222C]/50 border border-[#D4AF37]/10 rounded-xl px-6 py-10 text-center text-gray-500 text-sm">
              لا توجد طلبات قيد المراجعة.
            </div>
          ) : (
            <div className="space-y-3">
              {pending.map((r) => (
                <div
                  key={r.id}
                  className="bg-[#1B222C] border border-[#D4AF37]/20 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="font-bold">{r.fullName}</div>
                    <div className="text-xs text-gray-400">{r.email}</div>
                    <div className="text-xs text-gray-500 flex flex-wrap gap-x-4 gap-y-1 mt-1">
                      <span>القطاع: {SECTOR_LABELS[r.sector] ?? r.sector}</span>
                      <span>النطاق: {r.region}</span>
                      <span>الميزانية: {r.capital}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => decide(r.id, "approved")}
                      disabled={busyId === r.id}
                      className="flex items-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 disabled:opacity-40 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-4 py-2 rounded-lg"
                    >
                      <CheckCircle2 className="w-4 h-4" /> اعتماد
                    </button>
                    <button
                      onClick={() => decide(r.id, "rejected")}
                      disabled={busyId === r.id}
                      className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 disabled:opacity-40 border border-red-500/30 text-red-400 text-xs font-bold px-4 py-2 rounded-lg"
                    >
                      <XCircle className="w-4 h-4" /> رفض
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
            تم البت فيها ({decided.length})
          </h2>
          <div className="space-y-2">
            {decided.map((r) => (
              <div
                key={r.id}
                className="bg-[#1B222C]/50 border border-[#D4AF37]/10 rounded-lg px-5 py-3 flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium">{r.fullName}</span>
                  <span className="text-gray-500 text-xs">{r.region}</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${STATUS_META[r.status].color}`}>
                  {STATUS_META[r.status].label}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}