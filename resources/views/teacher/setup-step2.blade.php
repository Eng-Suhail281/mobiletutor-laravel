@extends('layouts.auth')

@section('title', 'إعداد الحساب - الخطوة 2 - Mobile Tutor')

@section('content')
  <h1 class="auth-form-title">بيانات احترافية</h1>
  <p class="auth-form-subtitle">أدخل تفاصيل خبرتك ليتعرف عليك الطلاب</p>

  <form method="POST" action="{{ route('teacher.setup.store') }}">
    @csrf
    <input type="hidden" name="specialty_type" value="{{ request('type', 'academic') }}">

    <div class="auth-field">
      <label for="specialization">التخصص الرئيسي</label>
      <div class="auth-input-wrap">
        <input type="text" id="specialization" name="specialization" placeholder="مثال: رياضيات، أمن سيبراني، إرشاد نفسي">
      </div>
    </div>
    <div class="auth-field">
      <label for="qualification">المؤهل العلمي / المسمى الوظيفي</label>
      <div class="auth-input-wrap">
        <input type="text" id="qualification" name="qualification" placeholder="مثال: ماجستير علم نفس">
      </div>
    </div>
    <div class="auth-field">
      <label for="experience_years">سنوات الخبرة</label>
      <div class="auth-input-wrap">
        <input type="number" id="experience_years" name="experience_years" min="0" placeholder="عدد سنوات الخبرة">
      </div>
    </div>
    <div class="auth-field">
      <label for="hourly_rate">السعر بالساعة ($)</label>
      <div class="auth-input-wrap">
        <input type="number" step="0.01" id="hourly_rate" name="hourly_rate" min="0" placeholder="السعر بالدولار للساعة الواحدة">
      </div>
    </div>

    <button type="submit" class="auth-submit-btn">إنهاء الإعداد</button>
  </form>
@endsection
