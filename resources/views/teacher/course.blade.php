@extends('layouts.teacher')

@section('title', $course->title.' - Mobile Tutor')

@section('content')
  <div class="sd-section-head sd-section-head--courses">
    <h2>{{ $course->title }}</h2>
    <a href="{{ route('teacher.courses.edit', $course) }}" class="btn btn-outline-primary btn-sm">تعديل بيانات المادة</a>
  </div>

  @if(session('success'))
    <div class="alert alert-success">{{ session('success') }}</div>
  @endif

  <ul class="nav nav-tabs mb-3">
    <li class="nav-item"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-lessons">الدروس ({{ $course->lessons->count() }})</button></li>
    <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-assignments">الواجبات ({{ $course->assignments->count() }})</button></li>
    <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-exams">الاختبارات ({{ $course->exams->count() }})</button></li>
    <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-students">الطلاب ({{ $course->students->count() }})</button></li>
  </ul>

  <div class="tab-content">
    <div class="tab-pane fade show active" id="tab-lessons">
      @foreach($course->lessons as $lesson)
        <div class="sd-course-card mb-2"><div class="sd-course-body">{{ $lesson->title }} — {{ $lesson->duration_minutes }} د</div></div>
      @endforeach
    </div>

    <div class="tab-pane fade" id="tab-assignments">
      @foreach($course->assignments as $assignment)
        <div class="sd-course-card mb-2"><div class="sd-course-body">
          <strong>{{ $assignment->title }}</strong> — {{ $assignment->submissions()->count() }} تسليم
        </div></div>
      @endforeach

      <div class="sd-course-card mt-3">
        <div class="sd-course-body">
          <h5>إضافة واجب جديد</h5>
          <form method="POST" action="{{ route('teacher.assignments.store', $course) }}">
            @csrf
            <input type="text" name="title" class="form-control mb-2" placeholder="عنوان الواجب" required>
            <textarea name="description" class="form-control mb-2" placeholder="الوصف"></textarea>
            <input type="datetime-local" name="due_date" class="form-control mb-2">
            <input type="number" name="max_grade" class="form-control mb-2" value="100" required>
            <button type="submit" class="sd-btn-primary">إضافة الواجب</button>
          </form>
        </div>
      </div>
    </div>

    <div class="tab-pane fade" id="tab-exams">
      @foreach($course->exams as $exam)
        <div class="sd-course-card mb-2"><div class="sd-course-body">
          <strong>{{ $exam->title }}</strong> — {{ $exam->submissions()->count() }} تسليم
        </div></div>
      @endforeach

      <div class="sd-course-card mt-3">
        <div class="sd-course-body">
          <h5>إضافة اختبار جديد</h5>
          <form method="POST" action="{{ route('teacher.exams.store', $course) }}">
            @csrf
            <input type="text" name="title" class="form-control mb-2" placeholder="عنوان الاختبار" required>
            <input type="number" name="duration_minutes" class="form-control mb-2" value="30" required>
            <input type="number" name="total_marks" class="form-control mb-2" value="100" required>
            <input type="datetime-local" name="starts_at" class="form-control mb-2">
            <input type="datetime-local" name="ends_at" class="form-control mb-2">
            <button type="submit" class="sd-btn-primary">إضافة الاختبار</button>
          </form>
        </div>
      </div>
    </div>

    <div class="tab-pane fade" id="tab-students">
      @foreach($course->students as $student)
        <div class="sd-course-card mb-2"><div class="sd-course-body d-flex justify-content-between">
          <span>{{ $student->name }}</span>
          <span class="text-muted">{{ $student->pivot->progress_percent }}%</span>
        </div></div>
      @endforeach
    </div>
  </div>
@endsection
