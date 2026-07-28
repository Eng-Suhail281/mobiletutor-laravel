  <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
    <div class="container">
      <a class="navbar-brand fw-bold text-primary" href="{{ route('home') }}">Mobile Tutor</a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="mainNav">
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link {{ request()->routeIs('home') ? 'active' : '' }}" href="{{ route('home') }}">الرئيسية</a>
          </li>
          <li class="nav-item">
            <a class="nav-link {{ request()->routeIs('courses.*') ? 'active' : '' }}" href="{{ route('courses.index') }}">الكورسات التدريبية</a>
          </li>
          <li class="nav-item">
            <a class="nav-link {{ request()->routeIs('teachers.*') ? 'active' : '' }}" href="{{ route('teachers.index') }}">المدرسين</a>
          </li>
          <li class="nav-item">
            <a class="nav-link {{ request()->routeIs('support.*') ? 'active' : '' }}" href="{{ route('support.index') }}">الدعم النفسي</a>
          </li>
          <li class="nav-item">
            <a class="nav-link {{ request()->routeIs('about') ? 'active' : '' }}" href="{{ route('about') }}">من نحن</a>
          </li>
        </ul>

        <div class="d-flex gap-2">
          @auth
            @php($u = auth()->user())
            <a href="{{ $u->role === 'teacher' ? route('teacher.dashboard') : route('student.dashboard') }}"
               class="btn btn-primary btn-sm px-3">لوحة التحكم</a>
          @else
            <a href="{{ route('login') }}" class="btn btn-outline-primary btn-sm px-3">تسجيل الدخول</a>
            <a href="{{ route('account-select') }}" class="btn btn-primary btn-sm px-3">إنشاء حساب</a>
          @endauth
        </div>
      </div>
    </div>
  </nav>
