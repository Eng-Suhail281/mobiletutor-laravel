@extends('layouts.auth')

@section('title', 'إنشاء حساب طالب - Mobile Tutor')

@section('content')
  <h1 class="auth-form-title">إنشاء حساب طالب</h1>
  <p class="auth-form-subtitle">أهلاً بك! أدخل بياناتك لإنشاء حساب جديد</p>

  @if ($errors->any())
    <div class="alert alert-danger">
      <ul class="mb-0">
        @foreach ($errors->all() as $error)<li>{{ $error }}</li>@endforeach
      </ul>
    </div>
  @endif

  <form method="POST" action="{{ route('register.student') }}">
    @csrf
    <div class="auth-field">
      <label for="fullname">الاسم كامل</label>
      <div class="auth-input-wrap">
        <i class="bi bi-person auth-input-icon"></i>
        <input type="text" id="fullname" name="name" value="{{ old('name') }}" placeholder="ادخل اسمك كامل" required>
      </div>
    </div>
    <div class="auth-field">
      <label for="email">البريد الالكتروني</label>
      <div class="auth-input-wrap">
        <i class="bi bi-envelope auth-input-icon"></i>
        <input type="email" id="email" name="email" value="{{ old('email') }}" placeholder="ادخل بريدك الالكتروني" required>
      </div>
    </div>
    <div class="auth-field">
      <label for="phone">رقم الجوال (اختياري)</label>
      <div class="auth-input-wrap">
        <i class="bi bi-telephone auth-input-icon"></i>
        <input type="text" id="phone" name="phone" value="{{ old('phone') }}" placeholder="ادخل رقم جوالك">
      </div>
    </div>
    <div class="auth-field">
      <label for="password">كلمة المرور</label>
      <div class="auth-input-wrap">
        <i class="bi bi-lock auth-input-icon"></i>
        <button type="button" class="auth-input-toggle" aria-label="إظهار كلمة المرور"><i class="bi bi-eye-slash"></i></button>
        <input type="password" id="password" name="password" placeholder="ادخل كلمة المرور" required>
      </div>
    </div>
    <div class="auth-field">
      <label for="confirm">تأكيد كلمة المرور</label>
      <div class="auth-input-wrap">
        <i class="bi bi-lock auth-input-icon"></i>
        <button type="button" class="auth-input-toggle" aria-label="إظهار كلمة المرور"><i class="bi bi-eye-slash"></i></button>
        <input type="password" id="confirm" name="password_confirmation" placeholder="ادخل كلمة المرور" required>
      </div>
    </div>
    <label class="auth-checkbox auth-checkbox-block">
      <input type="checkbox" required> أوافق على الشروط والأحكام وسياسة الخصوصية
    </label>
    <button type="submit" class="auth-submit-btn">إنشاء الحساب</button>
  </form>

  <p class="auth-form-footer">
    لديك حساب بالفعل؟ <a href="{{ route('login') }}" class="auth-link-primary">تسجيل الدخول</a>
  </p>
@endsection
