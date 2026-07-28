@extends('layouts.auth')

@section('title', 'إعداد الحساب - الخطوة 1 - Mobile Tutor')

@section('content')
  <h1 class="auth-form-title">مرحبًا بك، {{ auth()->user()->name }} 👋</h1>
  <p class="auth-form-subtitle">اختر نوع التدريس الذي تود تقديمه على المنصة</p>

  <div class="d-grid gap-3">
    <a href="{{ route('teacher.setup.step2', ['type' => 'academic']) }}" class="auth-submit-btn text-decoration-none d-inline-block text-center">
      مدرّس أكاديمي (مواد دراسية)
    </a>
    <a href="{{ route('teacher.setup.step2', ['type' => 'support']) }}" class="auth-submit-btn text-decoration-none d-inline-block text-center">
      أخصائي دعم نفسي
    </a>
  </div>
@endsection
