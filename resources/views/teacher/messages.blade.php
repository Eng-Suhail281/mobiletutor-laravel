@extends('layouts.teacher')

@section('title', 'الرسائل - Mobile Tutor')

@section('content')
  <div class="sd-section-head sd-section-head--courses">
    <h2>الرسائل</h2>
  </div>

  <div class="sd-courses-grid" style="grid-template-columns: 1fr;">
    @forelse($conversations as $conversation)
      @php($other = $conversation->participants->where('id', '!=', auth()->id())->first())
      <a href="{{ route('teacher.messages.show', $conversation) }}" class="text-decoration-none text-dark">
        <div class="sd-course-card">
          <div class="sd-course-body d-flex justify-content-between align-items-center">
            <div>
              <h3>{{ $other?->name ?? 'محادثة' }}</h3>
              <p class="text-muted mb-0">{{ Illuminate\Support\Str::limit($conversation->lastMessage?->body, 60) }}</p>
            </div>
            @if($conversation->lastMessage && !$conversation->lastMessage->is_read && $conversation->lastMessage->sender_id !== auth()->id())
              <span class="badge bg-primary">جديد</span>
            @endif
          </div>
        </div>
      </a>
    @empty
      <p class="text-muted">لا توجد محادثات بعد.</p>
    @endforelse
  </div>
@endsection
