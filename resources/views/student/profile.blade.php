@extends('layouts.student')

@section('title', 'الملف الشخصي - Mobile Tutor')

@section('content')
  <div class="sd-section-head sd-section-head--courses">
    <h2>الملف الشخصي</h2>
  </div>

  @if(session('success'))
    <div class="alert alert-success">{{ session('success') }}</div>
  @endif

  <div class="sd-course-card">
    <div class="sd-course-body">
      <form method="POST" action="{{ route('student.profile.update') }}" enctype="multipart/form-data">
        @csrf
        <div class="mb-3">
          <label class="form-label">الاسم الكامل</label>
          <input type="text" name="name" class="form-control" value="{{ old('name', $user->name) }}">
        </div>
        <div class="mb-3">
          <label class="form-label">رقم الجوال</label>
          <input type="text" name="phone" class="form-control" value="{{ old('phone', $user->phone) }}">
        </div>
        <div class="mb-3">
          <label class="form-label">نبذة عني</label>
          <textarea name="bio" class="form-control" rows="3">{{ old('bio', $user->bio) }}</textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">الصورة الشخصية</label>
          <input type="file" name="avatar" class="form-control">
        </div>
        <div class="mb-3">
          <label class="form-label">الجامعة</label>
          <input type="text" name="university" class="form-control" value="{{ old('university', $user->studentProfile?->university) }}">
        </div>
        <div class="mb-3">
          <label class="form-label">التخصص</label>
          <input type="text" name="major" class="form-control" value="{{ old('major', $user->studentProfile?->major) }}">
        </div>
        <div class="mb-3">
          <label class="form-label">السنة الدراسية</label>
          <input type="text" name="academic_year" class="form-control" value="{{ old('academic_year', $user->studentProfile?->academic_year) }}">
        </div>
        <button type="submit" class="sd-btn-primary">حفظ التغييرات</button>
      </form>
    </div>
  </div>
@endsection
