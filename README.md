# Nexus Engine

منصة SaaS مع نموذج ترخيص/شراكة توزيع، وفورم تقييم نطاق جغرافي مربوط بقاعدة
بيانات حقيقية، ولوحة إدارة لاعتماد/رفض الطلبات.

> ⚠️ **حالة المشروع: Private Beta / Staging.** النسخة المنشورة حاليًا لاختبار
> البنية التقنية فقط. لا يُفتح الاستقبال التجاري للجمهور قبل اكتمال المراجعة
> القانونية (هيئة السوق المالية، نظام الامتياز التجاري) وصياغة العقود
> النهائية. راجع `/terms`، `/privacy`، `/disclaimer` — كلها مسودات غير نهائية.

## التقنيات المستخدمة

- **Next.js 14+** (App Router) + TypeScript
- **Tailwind CSS**
- **Supabase** (Postgres + Row Level Security) كقاعدة بيانات
- **Vercel** للاستضافة

## هيكلية المشروع

```
nexus-engine/
├── src/
│   ├── app/
│   │   ├── page.tsx                  # الصفحة الرئيسية + فورم التقديم
│   │   ├── admin/page.tsx            # لوحة الإدارة (محمية بكلمة مرور)
│   │   ├── terms/page.tsx            # مسودة وثيقة الترخيص
│   │   ├── privacy/page.tsx          # مسودة سياسة الخصوصية
│   │   ├── disclaimer/page.tsx       # مسودة إخلاء المسؤولية
│   │   └── api/
│   │       ├── vetting/route.ts      # POST: استقبال طلب تقييم جديد
│   │       ├── units/route.ts        # GET: عدد الوحدات المتاحة الحقيقي
│   │       └── admin/
│   │           ├── login/route.ts    # POST: تسجيل دخول الإدارة
│   │           ├── requests/route.ts # GET: قائمة الطلبات (محمي)
│   │           └── decide/route.ts   # POST: اعتماد/رفض طلب (محمي)
│   └── lib/
│       ├── supabase.ts               # عميل Supabase (سيرفر فقط)
│       ├── db.ts                     # طبقة الوصول لقاعدة البيانات
│       └── adminAuth.ts              # حماية كوكي جلسة الإدارة
├── supabase-schema.sql               # مخطط الجداول الأساسي
├── supabase-rpc.sql                  # دالة الاعتماد الذرّية (منع التزاحم)
├── .env.local.example                # نموذج متغيرات البيئة
└── .gitignore
```

## الإعداد المحلي

### المتطلبات
- Node.js 18.17 أو أحدث
- حساب Supabase (مجاني للبداية)

### 1. تثبيت الحزم

```bash
npm install
npm install @supabase/supabase-js lucide-react clsx tailwind-merge
```

### 2. إعداد قاعدة البيانات

في Supabase Dashboard → SQL Editor، شغّل الملفين **بالترتيب**:

```bash
# انسخ محتوى الملفين وشغّلهما في SQL Editor
1) supabase-schema.sql
2) supabase-rpc.sql
```

### 3. متغيرات البيئة

```bash
cp .env.local.example .env.local
```

عبّي القيم الحقيقية في `.env.local`:

| المتغير | المصدر |
|---|---|
| `SUPABASE_URL` | Supabase Dashboard → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | نفس الصفحة (سري تمامًا — لا يُشارك أبدًا) |
| `ADMIN_PASSWORD` | اختر كلمة مرور قوية |
| `ADMIN_SESSION_SECRET` | ولّده بـ: `openssl rand -hex 32` |

### 4. التشغيل محليًا

```bash
npm run dev
```

افتح `http://localhost:3000` للصفحة الرئيسية، و `http://localhost:3000/admin` للوحة الإدارة.

## أوامر مفيدة

```bash
npm run dev          # تشغيل بيئة التطوير
npm run build         # بناء نسخة الإنتاج
npm run start         # تشغيل نسخة الإنتاج محليًا بعد البناء
npm run lint           # فحص الكود
```

## النشر (Vercel)

1. ادفع الكود لمستودع GitHub **خاص** (private) — المشروع فيه منطق أعمال حساس
2. اربط المستودع بـ Vercel (Add New Project)
3. أضف كل متغيرات البيئة في **Settings → Environment Variables** (لا يُقرأ `.env.local` تلقائيًا على Vercel)
4. Deploy، ثم اربط الدومين من **Settings → Domains**

تفاصيل كل خطوة موجودة في سجل المحادثة المرفق مع هذا المشروع.

## أمان — نقاط لا تتنازل عنها

- `SUPABASE_SERVICE_ROLE_KEY` يُستخدم **فقط** داخل `src/lib/supabase.ts` من السيرفر. لا يظهر أبدًا في أي كود فيه `"use client"` أو متغير باسم `NEXT_PUBLIC_*`
- كل عمليات القراءة/الكتابة الحساسة تمر عبر API routes بالسيرفر — Row Level Security على Supabase يمنع أي وصول مباشر من المتصفح
- منطق اعتماد الطلبات وخصم الوحدات ينفّذ بالكامل داخل دالة Postgres واحدة (`decide_vetting_request`) لمنع أي تزاحم عند اعتماد طلبات متزامنة
- حماية `/admin` الحالية (كلمة مرور واحدة + كوكي موقّع) مناسبة لمرحلة Beta فقط. قبل إضافة أكثر من شخص لإدارة الطلبات، انتقل إلى Supabase Auth مع جدول صلاحيات مخصص

## الحالة القانونية

المحتوى الحالي في `/terms`، `/privacy`، `/disclaimer` مسودات أولية فقط، وليست
وثائق نهائية. قبل فتح الاستقبال التجاري الفعلي للجمهور، هذه الوثائق تحتاج
مراجعة من محامٍ مختص بأنظمة الامتياز التجاري والاستثمار في بلد التشغيل،
للتأكد من الوضع التنظيمي (هل الهيكل المالي المقترح يتطلب ترخيصًا من هيئة
السوق المالية أو ما يعادلها).