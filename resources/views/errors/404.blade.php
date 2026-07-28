<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>الصفحة غير موجودة — Mobile Tutor</title>
  <link rel="icon" href="{{ asset('images/favicon.svg') }}" type="image/svg+xml">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
  <link href="{{ asset('css/style.css') }}" rel="stylesheet">
  <link href="{{ asset('css/responsive.css') }}" rel="stylesheet">
  <style>
    body { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--bg-light); padding: 24px; }
    .nf-card { max-width: 440px; width: 100%; background: #fff; border-radius: 20px; padding: 40px 32px; text-align: center; box-shadow: var(--shadow); }
    .nf-code { font-size: 4rem; font-weight: 800; color: var(--primary); line-height: 1; margin-bottom: 8px; }
    .nf-card h1 { font-size: 1.35rem; margin-bottom: 10px; }
    .nf-card p { color: var(--text-muted); font-size: 0.92rem; line-height: 1.7; margin-bottom: 24px; }
    .nf-actions { display: flex; flex-direction: column; gap: 10px; }
    .nf-actions a { text-decoration: none; }
  </style>
</head>
<body>
  <div class="nf-card">
    <div class="nf-code">404</div>
    <h1>الصفحة غير موجودة</h1>
    <p>يبدو أن الرابط الذي طلبته غير صحيح أو أن الصفحة نُقلت. يمكنك العودة للرئيسية أو تصفح الكورسات.</p>
    <div class="nf-actions">
      <a href="{{ route('home') }}" class="sd-btn-primary">العودة للرئيسية</a>
      <a href="{{ route('courses.index') }}" class="sd-btn-outline">تصفح الكورسات</a>
    </div>
  </div>
</body>
</html>
