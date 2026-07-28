# Mobile Tutor — Laravel Backend

مشروع Laravel كامل (Backend + Blade Views) مبني على واجهات الـHTML التي تم رفعها (منصة تعليمية: طالب / معلم / زوار).

**المتطلبات:** PHP 8.2+ و Laravel 11.

## خطوات التشغيل

```bash
composer install
cp .env.example .env
php artisan key:generate
```

اضبط قاعدة البيانات في `.env` (افتراضيًا SQLite):
```bash
touch database/database.sqlite
php artisan migrate --seed
php artisan storage:link
```

لو بدك تجرب بوابة الدفع (Stripe)، حط مفاتيحك التجريبية في `.env`:
```
STRIPE_KEY=pk_test_...
STRIPE_SECRET=sk_test_...
```

شغّل السيرفر:
```bash
php artisan serve
```

## حسابات تجريبية (من الـSeeder)

| الدور | البريد | كلمة المرور |
|---|---|---|
| معلم (أكاديمي) | teacher@example.com | password |
| مختص دعم نفسي | specialist@example.com | password |
| طالب | student@example.com | password |

## ⚠️ ملاحظة مهمة: أصول التصميم (CSS/JS/Images)

الملفات التي تم رفعها كانت نصوص HTML فقط، بدون مجلدات css/, js/, images/ الأصلية.
لازم تحط هاي المجلدات يدويًا داخل public/:

```
public/css/style.css
public/css/responsive.css
public/css/auth.css
public/css/student-dashboard.css
public/css/teacher-dashboard.css
public/js/main.js
public/js/student-dashboard.js
public/js/teacher-dashboard.js
public/images/...
```

بدونها، الموقع شغّال بالكامل من ناحية الوظائف لكن بدون التنسيق البصري الأصلي.

## ما هو مكتمل

- 19 migration (users, courses, lessons, enrollments, assignments, exams, certificates, session_bookings, reviews, conversations/messages, payments, notifications...)
- كل الـModels والعلاقات بينها
- تسجيل دخول/حساب حقيقي (طالب / معلم) + Middleware صلاحيات (role:student, role:teacher)
- كل الصفحات الـ54 محوّلة لـBlade views مربوطة بقاعدة البيانات فعليًا
- بوابة دفع Stripe حقيقية (Checkout Session) للاشتراك بالكورسات
- Seeder ببيانات تجريبية (معلم، مختص، طالب، كورس، دروس، اشتراك)

## ما يحتاج تطوير إضافي (اختياري)

- لوحة تحكم Admin (الدور موجود بقاعدة البيانات لكن بدون واجهة)
- تفعيل تحقق فعلي من حالة جلسة Stripe عبر webhook (حاليًا التفعيل يتم عند العودة لصفحة success مباشرة — للإنتاج الحقيقي يُفضّل استخدام Stripe Webhooks)
- شهادات PDF تلقائية عند إكمال الكورس (الجدول جاهز لكن التوليد غير مُفعّل)
- صفحة حجز الجلسة (session-booking) مبسّطة (فورم مباشر) بدل الـwizard التفاعلي متعدد الخطوات الأصلي، لأن ملف الجافاسكربت الخاص فيه ما كان مرفوع
