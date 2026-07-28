@extends('layouts.teacher')

@section('title', 'التفضيلات - Mobile Tutor')

@section('content')
  <div class="sd-section-head sd-section-head--courses">
    <h2>التفضيلات</h2>
  </div>

  <div class="sd-course-card">
    <div class="sd-course-body">
      <p class="text-muted">
        لإدارة بياناتك الشخصية والمهنية وكلمة المرور، انتقل إلى
        <a href="{{ route('teacher.settings') }}">صفحة الإعدادات</a>.
      </p>
    </div>
  </div>
@endsection
