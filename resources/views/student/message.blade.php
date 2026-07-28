@extends('layouts.student')

@section('title', 'المحادثة - Mobile Tutor')

@section('content')
  <div class="sd-section-head sd-section-head--courses">
    <h2>المحادثة</h2>
    <a href="{{ route('student.messages.index') }}" class="sd-link sd-link--muted">العودة للرسائل</a>
  </div>

  <div class="sd-course-card mb-3" style="max-height: 420px; overflow-y: auto;">
    <div class="sd-course-body">
      @foreach($conversation->messages as $message)
        <div class="mb-2 {{ $message->sender_id === auth()->id() ? 'text-end' : 'text-start' }}">
          <span class="badge {{ $message->sender_id === auth()->id() ? 'bg-primary' : 'bg-secondary' }}">
            {{ $message->sender->name }}
          </span>
          <p class="mb-0">{{ $message->body }}</p>
        </div>
      @endforeach
    </div>
  </div>

  <form method="POST" action="{{ route('student.messages.send', $conversation) }}" class="d-flex gap-2">
    @csrf
    <input type="text" name="body" class="form-control" placeholder="اكتب رسالتك..." required>
    <button type="submit" class="sd-btn-primary">إرسال</button>
  </form>
@endsection
