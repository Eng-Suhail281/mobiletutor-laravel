@extends('layouts.teacher')

@section('title', 'تعديل المادة - Mobile Tutor')

@section('content')
  <div class="sd-section-head sd-section-head--courses">
    <h2>تعديل: {{ $course->title }}</h2>
  </div>

  @if($errors->any())
    <div class="alert alert-danger"><ul class="mb-0">@foreach($errors->all() as $e)<li>{{ $e }}</li>@endforeach</ul></div>
  @endif

  <div class="sd-course-card">
    <div class="sd-course-body">
      <form method="POST" action="{{ route('teacher.courses.update', $course) }}" enctype="multipart/form-data">
        @csrf
        @method('PUT')
        <div class="mb-3">
          <label class="form-label">عنوان المادة</label>
          <input type="text" name="title" class="form-control" value="{{ old('title', $course->title) }}" required>
        </div>
        <div class="mb-3">
          <label class="form-label">التصنيف</label>
          <select name="category_id" class="form-select">
            <option value="">بدون تصنيف</option>
            @foreach($categories as $cat)
              <option value="{{ $cat->id }}" {{ $course->category_id == $cat->id ? 'selected' : '' }}>{{ $cat->name }}</option>
            @endforeach
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">الوصف</label>
          <textarea name="description" class="form-control" rows="4">{{ old('description', $course->description) }}</textarea>
        </div>
        <div class="row">
          <div class="col-md-4 mb-3">
            <label class="form-label">السعر ($)</label>
            <input type="number" step="0.01" name="price" class="form-control" value="{{ old('price', $course->price) }}" required>
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label">المستوى</label>
            <select name="level" class="form-select">
              @foreach(['beginner' => 'مبتدئ', 'intermediate' => 'متوسط', 'advanced' => 'متقدم'] as $val => $label)
                <option value="{{ $val }}" {{ $course->level === $val ? 'selected' : '' }}>{{ $label }}</option>
              @endforeach
            </select>
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label">المدة (ساعات)</label>
            <input type="number" name="duration_hours" class="form-control" value="{{ old('duration_hours', $course->duration_hours) }}">
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">صورة الغلاف</label>
          <input type="file" name="cover_image" class="form-control">
        </div>
        <div class="mb-3">
          <label class="form-label">الحالة</label>
          <select name="status" class="form-select">
            @foreach(['draft' => 'مسودة', 'published' => 'منشورة', 'archived' => 'مؤرشفة'] as $val => $label)
              <option value="{{ $val }}" {{ $course->status === $val ? 'selected' : '' }}>{{ $label }}</option>
            @endforeach
          </select>
        </div>
        <button type="submit" class="sd-btn-primary">حفظ التعديلات</button>
      </form>

      <form method="POST" action="{{ route('teacher.courses.destroy', $course) }}" class="mt-3" onsubmit="return confirm('هل أنت متأكد من حذف هذه المادة؟')">
        @csrf
        @method('DELETE')
        <button type="submit" class="btn btn-outline-danger btn-sm">حذف المادة</button>
      </form>
    </div>
  </div>
@endsection
