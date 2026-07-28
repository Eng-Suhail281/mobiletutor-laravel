@extends('layouts.teacher')

@section('title', 'الإعدادات - Mobile Tutor')

@section('content')
  <div class="sd-section-head sd-section-head--courses">
    <h2>الإعدادات</h2>
  </div>

  @if(session('success'))
    <div class="alert alert-success">{{ session('success') }}</div>
  @endif

  @php($u = auth()->user())

  <div class="sd-course-card mb-3">
    <div class="sd-course-body">
      <h5>الملف الشخصي</h5>
      <form method="POST" action="{{ route('teacher.settings.update') }}" enctype="multipart/form-data">
        @csrf
        <div class="mb-3">
          <label class="form-label">الاسم الكامل</label>
          <input type="text" name="name" class="form-control" value="{{ old('name', $u->name) }}">
        </div>
        <div class="mb-3">
          <label class="form-label">رقم الجوال</label>
          <input type="text" name="phone" class="form-control" value="{{ old('phone', $u->phone) }}">
        </div>
        <div class="mb-3">
          <label class="form-label">نبذة عني</label>
          <textarea name="bio" class="form-control" rows="3">{{ old('bio', $u->bio) }}</textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">الصورة الشخصية</label>
          <input type="file" name="avatar" class="form-control">
        </div>
        <div class="mb-3">
          <label class="form-label">التخصص</label>
          <input type="text" name="specialization" class="form-control" value="{{ old('specialization', $u->teacherProfile?->specialization) }}">
        </div>
        <div class="mb-3">
          <label class="form-label">المؤهل العلمي</label>
          <input type="text" name="qualification" class="form-control" value="{{ old('qualification', $u->teacherProfile?->qualification) }}">
        </div>
        <div class="mb-3">
          <label class="form-label">سنوات الخبرة</label>
          <input type="number" name="experience_years" class="form-control" value="{{ old('experience_years', $u->teacherProfile?->experience_years) }}">
        </div>
        <div class="mb-3">
          <label class="form-label">السعر بالساعة ($)</label>
          <input type="number" step="0.01" name="hourly_rate" class="form-control" value="{{ old('hourly_rate', $u->teacherProfile?->hourly_rate) }}">
        </div>
        <button type="submit" class="sd-btn-primary">حفظ التغييرات</button>
      </form>
    </div>
  </div>

  <div class="sd-course-card">
    <div class="sd-course-body">
      <h5>تغيير كلمة المرور</h5>
      <form method="POST" action="{{ route('teacher.settings.password') }}">
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
