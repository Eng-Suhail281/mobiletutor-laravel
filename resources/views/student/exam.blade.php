@extends('layouts.student')

@section('title', 'اختبار: '.$exam->title)

@section('content')
  <div class="sd-section-head sd-section-head--courses">
    <h2>{{ $exam->title }}</h2>
    <span class="text-muted">{{ $exam->duration_minutes }} دقيقة</span>
  </div>

  <form method="POST" action="{{ route('student.exams.submit', $exam) }}">
    @csrf
    @foreach($exam->questions as $i => $question)
      <div class="sd-course-card mb-3">
        <div class="sd-course-body">
          <h5>{{ $i + 1 }}. {{ $question->question }}</h5>

          @if($question->type === 'mcq')
            @foreach(($question->options ?? []) as $option)
              <label class="d-block">
                <input type="radio" name="answers[{{ $question->id }}]" value="{{ $option }}"> {{ $option }}
              </label>
            @endforeach
          @elseif($question->type === 'true_false')
            <label class="d-block"><input type="radio" name="answers[{{ $question->id }}]" value="true"> صح</label>
            <label class="d-block"><input type="radio" name="answers[{{ $question->id }}]" value="false"> خطأ</label>
          @else
            <textarea name="answers[{{ $question->id }}]" class="form-control" rows="3"></textarea>
          @endif
        </div>
      </div>
    @endforeach

    <button type="submit" class="sd-btn-primary">تسليم الاختبار</button>
  </form>
@endsection
