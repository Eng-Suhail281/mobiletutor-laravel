@extends('layouts.auth')

@section('title', 'إنشاء حساب - Mobile Tutor')

@section('content')
  <h1 class="auth-form-title">مرحبًا بك في Mobile Tutor</h1>
  <p class="auth-form-subtitle">اختر نوع الحساب الذي تريد إنشاءه</p>

  <div class="d-grid gap-3">
    <a href="{{ route('register.teacher') }}" class="auth-submit-btn text-decoration-none d-inline-block text-center">المتابعة كمدرس</a>
    <a href="{{ route('register.student') }}" class="auth-submit-btn text-decoration-none d-inline-block text-center">المتابعة كطالب</a>
  </div>

  <p class="auth-form-footer mt-4">
    هل لديك حساب بالفعل؟ <a href="{{ route('login') }}" class="auth-link-primary">تسجيل الدخول</a>
  </p>
@endsection
