import { getSupabaseServerClient } from "./supabase";

export interface VettingRequest {
  id: string;
  fullName: string;
  email: string;
  sector: string;
  region: string;
  capital: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
}

function mapRow(row: any): VettingRequest {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    sector: row.sector,
    region: row.region,
    capital: row.capital,
    status: row.status,
    submittedAt: row.submitted_at,
  };
}

export async function getAvailableUnits(): Promise<{ total: number; available: number }> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("units")
    .select("total, taken")
    .eq("id", "main")
    .single();

  if (error || !data) throw new Error("حدث خطأ في جلب البيانات");

const d = data as any;
return { total: d.total, available: Math.max(0, d.total - (d.used || 0)) };
}

export async function createVettingRequest(
  input: Omit<VettingRequest, "id" | "status" | "submittedAt">
): Promise<VettingRequest> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("vetting_requests")
    .insert({
  full_name: input.fullName,
  email: input.email,
  sector: input.sector,
  region: input.region,
} as any)
    .select()
    .single();

  if (error || !data) throw new Error("تعذر حفظ الطلب: " + error?.message);
  return mapRow(data);
}

export async function listVettingRequests(status?: VettingRequest["status"]): Promise<VettingRequest[]> {
  const supabase = getSupabaseServerClient();
  let query = supabase.from("vetting_requests").select("*").order("submitted_at", { ascending: false });
  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) throw new Error("تعذر جلب الطلبات: " + error.message);
  return (data ?? []).map(mapRow);
}

/**
 * اعتماد أو رفض طلب. عند الاعتماد يُخصم من عدد الوحدات المتاحة.
 * المنطق الحرج ينفّذ بالكامل داخل دالة Postgres واحدة
 * (decide_vetting_request، عرّفها supabase-rpc.sql) ضمن transaction
 * ذرّية، فيستحيل حدوث تزاحم حتى لو وصل طلبا اعتماد لنفس اللحظة بالضبط.
 */
export async function decideVettingRequest(
  id: string,
  decision: "approved" | "rejected"
): Promise<VettingRequest> {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase.rpc("decide_vetting_request", {
    p_request_id: id,
    p_decision: decision,
  });

  if (error || !data) throw new Error(error?.message ?? "تعذر تنفيذ القرار");
  return mapRow(data);
}