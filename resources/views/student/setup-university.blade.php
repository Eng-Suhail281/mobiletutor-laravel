@extends('layouts.auth')

@section('title', 'إكمال إعداد الحساب - Mobile Tutor')

@section('content')
  <h1 class="auth-form-title">مرحبًا بك، {{ auth()->user()->name }} 👋</h1>
  <p class="auth-form-subtitle">أكمل بيانات ملفك الدراسي لتخصيص تجربتك</p>

  <form method="POST" action="{{ route('student.setup.store') }}">
    @csrf
    <div class="auth-field">
      <label for="university">الجامعة / المدرسة</label>
      <div class="auth-input-wrap">
        <input type="text" id="university" name="university" placeholder="اسم الجامعة أو المدرسة">
      </div>
    </div>
    <div class="auth-field">
      <label for="major">التخصص</label>
      <div class="auth-input-wrap">
        <input type="text" id="major" name="major" placeholder="مثال: هندسة برمجيات">
      </div>
    </div>
    <div class="auth-field">
      <label for="academic_year">السنة الدراسية</label>
      <div class="auth-input-wrap">
        <input type="text" id="academic_year" name="academic_year" placeholder="مثال: السنة الثانية">
      </div>
    </div>
    <button type="submit" class="auth-submit-btn">إكمال الإعداد</button>
  </form>
@endsection
