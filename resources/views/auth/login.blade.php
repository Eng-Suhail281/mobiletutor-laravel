@extends('layouts.auth')

@section('title', 'تسجيل الدخول - Mobile Tutor')

@section('content')
  <h1 class="auth-form-title">تسجيل الدخول</h1>
  <p class="auth-form-subtitle">أهلاً بك! يرجى ادخال البيانات للوصول الى حسابك</p>

  @if ($errors->any())
    <div class="alert alert-danger">
      <ul class="mb-0">
        @foreach ($errors->all() as $error)
          <li>{{ $error }}</li>
        @endforeach
      </ul>
    </div>
  @endif

  <form method="POST" action="{{ route('login') }}">
    @csrf
    <div class="auth-field">
      <label for="email">البريد الالكتروني</label>
      <div class="auth-input-wrap">
        <span class="auth-input-icon" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="currentColor"><path d="M14 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm0 1L8 8.5 2 4h12zM2 12V5.3l5.4 3.9a.5.5 0 0 0 .6 0L14 5.3V12H2z"/></svg>
        </span>
        <input type="email" id="email" name="email" value="{{ old('email') }}" placeholder="ادخل بريدك الالكتروني" required>
      </div>
    </div>
    <div class="auth-field">
      <label for="password">كلمة المرور</label>
      <div class="auth-input-wrap">
        <span class="auth-input-icon" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a3 3 0 0 0-3 3v2H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1V4a3 3 0 0 0-3-3zm4 8H4V7h8v2zM7 4a1 1 0 1 1 2 0v2H7V4z"/></svg>
        </span>
        <button type="button" class="auth-input-toggle" aria-label="إظهار كلمة المرور"><i class="bi bi-eye-slash"></i></button>
        <input type="password" id="password" name="password" placeholder="ادخل كلمة المرور" required>
      </div>
    </div>
    <div class="auth-form-row">
      <label class="auth-checkbox">
        <input type="checkbox" name="remember" checked> تذكرني
      </label>
      <a href="{{ route('password.request') }}" class="auth-link">هل نسيت كلمة المرور؟</a>
    </div>
    <button type="submit" class="auth-submit-btn">تسجيل الدخول</button>
  </form>

  <p class="auth-form-footer">
    ليس لدي حساب ؟ <a href="{{ route('account-select') }}" class="auth-link-primary">إنشاء حساب</a>
  </p>
@endsection
