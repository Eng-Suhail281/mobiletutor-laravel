@extends('layouts.teacher')

@section('title', 'إنشاء مادة جديدة - Mobile Tutor')

@section('content')
  <div class="sd-section-head sd-section-head--courses">
    <h2>إنشاء مادة جديدة</h2>
  </div>

  @if($errors->any())
    <div class="alert alert-danger"><ul class="mb-0">@foreach($errors->all() as $e)<li>{{ $e }}</li>@endforeach</ul></div>
  @endif

  <div class="sd-course-card">
    <div class="sd-course-body">
      <form method="POST" action="{{ route('teacher.courses.store') }}" enctype="multipart/form-data">
        @csrf
        <div class="mb-3">
          <label class="form-label">عنوان المادة</label>
          <input type="text" name="title" class="form-control" value="{{ old('title') }}" required>
        </div>
        <div class="mb-3">
          <label class="form-label">التصنيف</label>
          <select name="category_id" class="form-select">
            <option value="">بدون تصنيف</option>
            @foreach($categories as $cat)
              <option value="{{ $cat->id }}">{{ $cat->name }}</option>
            @endforeach
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">الوصف</label>
          <textarea name="description" class="form-control" rows="4">{{ old('description') }}</textarea>
        </div>
        <div class="row">
          <div class="col-md-4 mb-3">
            <label class="form-label">السعر ($)</label>
            <input type="number" step="0.01" name="price" class="form-control" value="0" required>
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label">المستوى</label>
            <select name="level" class="form-select">
              <option value="beginner">مبتدئ</option>
              <option value="intermediate">متوسط</option>
              <option value="advanced">متقدم</option>
            </select>
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label">المدة (ساعات)</label>
            <input type="number" name="duration_hours" class="form-control">
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">صورة الغلاف</label>
          <input type="file" name="cover_image" class="form-control">
        </div>
        <div class="mb-3">
          <label class="form-label">الحالة</label>
          <select name="status" class="form-select">
            <option value="draft">مسودة</option>
            <option value="published">منشورة</option>
          </select>
        </div>
        <button type="submit" class="sd-btn-primary">إنشاء المادة</button>
      </form>
    </div>
  </div>
@endsection
