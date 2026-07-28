@extends('layouts.student')

@section('title', 'الإعدادات - Mobile Tutor')

@section('content')
  <div class="sd-section-head sd-section-head--courses">
    <h2>الإعدادات</h2>
  </div>

  @if(session('success'))
    <div class="alert alert-success">{{ session('success') }}</div>
  @endif
  @if($errors->any())
    <div class="alert alert-danger"><ul class="mb-0">@foreach($errors->all() as $e)<li>{{ $e }}</li>@endforeach</ul></div>
  @endif

  <div class="sd-course-card">
    <div class="sd-course-body">
      <h5>تغيير كلمة المرور</h5>
      <form method="POST" action="{{ route('student.settings.password') }}">
        @csrf
        <div class="mb-3">
          <label class="form-label">كلمة المرور الحالية</label>
          <input type="password" name="current_password" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label">كلمة المرور الجديدة</label>
          <input type="password" name="password" class="form-control" required>
        </div>
        <div class="mb-3">
          <label class="form-label">تأكيد كلمة المرور</label>
          <input type="password" name="password_confirmation" class="form-control" required>
        </div>
        <button type="submit" class="sd-btn-primary">تحديث كلمة المرور</button>
      </form>
    </div>
  </div>
@endsection
