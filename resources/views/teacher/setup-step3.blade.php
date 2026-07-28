@extends('layouts.auth')

@section('title', 'تم إكمال الإعداد - Mobile Tutor')

@section('content')
  <h1 class="auth-form-title">تم إعداد حسابك بنجاح 🎉</h1>
  <p class="auth-form-subtitle">أصبح حسابك جاهزًا. يمكنك الآن إنشاء موادك التعليمية الأولى.</p>

  <a href="{{ route('teacher.dashboard') }}" class="auth-submit-btn text-decoration-none d-inline-block text-center">
    الذهاب إلى لوحة التحكم
  </a>
@endsection
