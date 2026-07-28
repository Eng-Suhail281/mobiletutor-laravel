<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>@yield('title', 'لوحة تحكم المعلم — Mobile Tutor')</title>
  <link rel="icon" href="{{ asset('images/favicon.svg') }}" type="image/svg+xml">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&family=Calistoga&display=swap" rel="stylesheet">
  <link href="{{ asset('css/style.css') }}" rel="stylesheet">
  <link href="{{ asset('css/student-dashboard.css') }}" rel="stylesheet">
  <link href="{{ asset('css/teacher-dashboard.css') }}" rel="stylesheet">
  <link href="{{ asset('css/responsive.css') }}" rel="stylesheet">
  @stack('styles')
</head>
<body class="sd-page">

  @php
    $authUser = auth()->user();
    $unreadMessages = $authUser->conversations()
        ->with(['lastMessage'])
        ->get()
        ->filter(fn ($c) => $c->lastMessage && $c->lastMessage->sender_id !== $authUser->id && ! $c->lastMessage->is_read)
        ->count();
    $unreadNotifications = $authUser->unreadNotifications()->count();
    $initials = collect(explode(' ', $authUser->name))->map(fn ($p) => mb_substr($p, 0, 1))->take(2)->implode(' ');
  @endphp

  <header class="sd-topbar">
    <div class="sd-topbar-start">
      <button class="sd-menu-toggle" type="button" id="sdMenuToggle" aria-label="فتح القائمة">
        <i class="bi bi-list"></i>
      </button>
      <a href="{{ route('teacher.dashboard') }}" class="sd-brand">Mobile Tutor</a>
    </div>

    <div class="sd-topbar-end">
      <div class="sd-profile-wrap">
        <button type="button" class="sd-profile-toggle" id="sdProfileToggle" aria-expanded="false" aria-haspopup="true">
          <i class="bi bi-chevron-down sd-profile-chevron" aria-hidden="true"></i>
        </button>
        <div class="sd-profile-info">
          <strong>{{ $authUser->name }}</strong>
          <span>معلم @if($authUser->teacherProfile?->specialization) — {{ $authUser->teacherProfile->specialization }} @endif</span>
        </div>
        <span class="sd-avatar">{{ $initials }}</span>
        <div class="sd-profile-dropdown" id="sdProfileDropdown" role="menu" hidden>
          <a href="{{ route('teacher.settings') }}" class="sd-profile-dropdown-item" role="menuitem">
            <i class="bi bi-person" aria-hidden="true"></i> الملف الشخصي
          </a>
          <form method="POST" action="{{ route('logout') }}">
            @csrf
            <button type="submit" class="sd-profile-dropdown-item" role="menuitem">
              <i class="bi bi-box-arrow-right" aria-hidden="true"></i> تسجيل الخروج
            </button>
          </form>
        </div>
      </div>
      <div class="sd-topbar-icons">
        <div class="sd-msg-wrap">
          <a href="{{ route('teacher.messages.index') }}" class="sd-icon-btn sd-msg-toggle">
            <i class="bi bi-chat"></i>
            @if($unreadMessages > 0)<span class="sd-icon-badge">{{ $unreadMessages }}</span>@endif
          </a>
        </div>
        <div class="sd-notify-wrap">
          <a href="{{ route('teacher.notifications') }}" class="sd-icon-btn sd-notify-toggle">
            <i class="bi bi-bell"></i>
            @if($unreadNotifications > 0)<span class="sd-icon-badge">{{ $unreadNotifications }}</span>@endif
          </a>
        </div>
      </div>
    </div>
  </header>

  <div class="sd-body">
    <aside class="sd-sidebar" id="sdSidebar">
      <nav class="sd-sidebar-nav">
        <ul class="sd-nav">
          <li class="sd-nav-item {{ request()->routeIs('teacher.dashboard') ? 'is-active' : '' }}">
            <a href="{{ route('teacher.dashboard') }}"><i class="bi bi-grid"></i> لوحة التحكم</a>
          </li>
          <li class="sd-nav-item {{ request()->routeIs('teacher.courses.*') ? 'is-active' : '' }}">
            <a href="{{ route('teacher.courses.index') }}"><i class="bi bi-journals"></i> موادي التعليمية</a>
          </li>
          <li class="sd-nav-item {{ request()->routeIs('teacher.schedule') ? 'is-active' : '' }}">
            <a href="{{ route('teacher.schedule') }}"><i class="bi bi-calendar3"></i> جدولي الدراسي</a>
          </li>
          <li class="sd-nav-item {{ request()->routeIs('teacher.students') ? 'is-active' : '' }}">
            <a href="{{ route('teacher.students') }}"><i class="bi bi-people"></i> الطلاب</a>
          </li>
          <li class="sd-nav-item {{ request()->routeIs('teacher.assignments.*') ? 'is-active' : '' }}">
            <a href="{{ route('teacher.assignments.index') }}"><i class="bi bi-clipboard-check"></i> الواجبات</a>
          </li>
          <li class="sd-nav-item {{ request()->routeIs('teacher.exams.*') ? 'is-active' : '' }}">
            <a href="{{ route('teacher.exams.index') }}"><i class="bi bi-patch-question"></i> الاختبارات</a>
          </li>
          <li class="sd-nav-item {{ request()->routeIs('teacher.reviews') ? 'is-active' : '' }}">
            <a href="{{ route('teacher.reviews') }}"><i class="bi bi-star"></i> التقييمات</a>
          </li>
        </ul>
        <div class="sd-nav-divider"></div>
        <ul class="sd-nav sd-nav--bottom">
          <li class="sd-nav-item {{ request()->routeIs('teacher.preferences') ? 'is-active' : '' }}">
            <a href="{{ route('teacher.preferences') }}"><i class="bi bi-gear"></i> الإعدادات</a>
          </li>
        </ul>
      </nav>
    </aside>

    <div class="sd-main-wrap">
      <main class="sd-content">
        @yield('content')
      </main>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="{{ asset('js/student-dashboard.js') }}"></script>
  <script src="{{ asset('js/teacher-dashboard.js') }}"></script>
  @stack('scripts')
</body>
</html>
