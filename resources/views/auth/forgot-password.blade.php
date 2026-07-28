@extends('layouts.auth')

@section('title', 'استعادة كلمة المرور - Mobile Tutor')

@section('content')
  <h1 class="auth-form-title">استعادة كلمة المرور</h1>
  <p class="auth-form-subtitle">أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور</p>

  @if (session('status'))
    <div class="alert alert-success">{{ session('status') }}</div>
  @endif

  {{-- ملاحظة: فعّل Illuminate\Foundation\Auth\SendsPasswordResetEmails أو منطق مشابه هنا لإرسال رابط فعلي --}}
  <form method="POST" action="#">
    @csrf
    <div class="auth-field">
      <label for="email">البريد الالكتروني</label>
      <div class="auth-input-wrap">
        <i class="bi bi-envelope auth-input-icon"></i>
        <input type="email" id="email" name="email" placeholder="ادخل بريدك الالكتروني" required>
      </div>
    </div>
    <button type="submit" class="auth-submit-btn">إرسال رابط الاستعادة</button>
  </form>

  <p class="auth-form-footer">
    تذكرت كلمة المرور؟ <a href="{{ route('login') }}" class="auth-link-primary">تسجيل الدخول</a>
  </p>
@endsection
