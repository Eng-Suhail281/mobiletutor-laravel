<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Site as PublicC;
use App\Http\Controllers\Student as StudentC;
use App\Http\Controllers\Teacher as TeacherC;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| الصفحات العامة (others.txt)
|--------------------------------------------------------------------------
*/
Route::get('/', [PublicC\HomeController::class, 'index'])->name('home');
Route::get('/about', [PublicC\HomeController::class, 'about'])->name('about');
Route::get('/support', [PublicC\SupportController::class, 'index'])->name('support.index');

Route::get('/courses', [PublicC\CourseController::class, 'index'])->name('courses.index');
Route::get('/courses/{course:slug}', [PublicC\CourseController::class, 'show'])->name('courses.show');

Route::get('/teachers', [PublicC\TeacherController::class, 'index'])->name('teachers.index');
Route::get('/teachers/{teacher}', [PublicC\TeacherController::class, 'show'])->name('teachers.show');

Route::get('/specialists', [PublicC\SpecialistController::class, 'index'])->name('specialists.index');
Route::get('/specialists/{specialist}', [PublicC\SpecialistController::class, 'show'])->name('specialists.show');

Route::get('/account-select', [PublicC\PageController::class, 'accountSelect'])->name('account-select');

// Auth
Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'showForm'])->name('login');
    Route::post('/login', [LoginController::class, 'login']);

    Route::get('/register/student', [RegisterController::class, 'showStudentForm'])->name('register.student');
    Route::post('/register/student', [RegisterController::class, 'registerStudent']);

    Route::get('/register/teacher', [RegisterController::class, 'showTeacherForm'])->name('register.teacher');
    Route::post('/register/teacher', [RegisterController::class, 'registerTeacher']);

    Route::get('/forgot-password', function () {
        return view('auth.forgot-password');
    })->name('password.request');
});

Route::post('/logout', [LoginController::class, 'logout'])->name('logout')->middleware('auth');

// حجز جلسة (مع معلم/مختص) - يتطلب تسجيل دخول
Route::middleware('auth')->group(function () {
    Route::get('/book/{teacher}', [PublicC\SessionBookingController::class, 'show'])->name('session-booking.show');
    Route::post('/book/{teacher}', [PublicC\SessionBookingController::class, 'store'])->name('session-booking.store');

    // الدفع (اشتراك في كورس) - Stripe
    Route::get('/checkout/{course}', [PublicC\CheckoutController::class, 'show'])->name('checkout.show');
    Route::post('/checkout/{course}/pay', [PublicC\CheckoutController::class, 'pay'])->name('checkout.pay');
    Route::get('/checkout/{course}/success', [PublicC\CheckoutController::class, 'success'])->name('checkout.success');
    Route::post('/checkout/{course}/success', [PublicC\CheckoutController::class, 'success']);
});

/*
|--------------------------------------------------------------------------
| منطقة الطالب (student.txt)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:student'])->prefix('student')->name('student.')->group(function () {
    Route::get('/dashboard', [StudentC\DashboardController::class, 'index'])->name('dashboard');

    Route::get('/courses', [StudentC\CourseController::class, 'index'])->name('courses.index');
    Route::get('/courses/{course}', [StudentC\CourseController::class, 'show'])->name('courses.show');
    Route::get('/courses/{course}/lessons/{lesson}', [StudentC\CourseController::class, 'lesson'])->name('courses.lesson');

    Route::get('/assignments', [StudentC\AssignmentController::class, 'index'])->name('assignments.index');
    Route::post('/assignments/{assignment}/submit', [StudentC\AssignmentController::class, 'submit'])->name('assignments.submit');

    Route::get('/exams', [StudentC\ExamController::class, 'index'])->name('exams.index');
    Route::get('/exams/{exam}/start', [StudentC\ExamController::class, 'start'])->name('exams.start');
    Route::post('/exams/{exam}/submit', [StudentC\ExamController::class, 'submit'])->name('exams.submit');

    Route::get('/certificates', [StudentC\CertificateController::class, 'index'])->name('certificates');

    Route::get('/schedule', [StudentC\ScheduleController::class, 'index'])->name('schedule');

    Route::get('/support', [StudentC\SupportController::class, 'index'])->name('support.index');
    Route::get('/support/session/{specialist}', [StudentC\SupportController::class, 'session'])->name('support.session');

    Route::get('/messages', [StudentC\MessageController::class, 'index'])->name('messages.index');
    Route::get('/messages/{conversation}', [StudentC\MessageController::class, 'show'])->name('messages.show');
    Route::post('/messages/{conversation}', [StudentC\MessageController::class, 'send'])->name('messages.send');

    Route::get('/notifications', [StudentC\NotificationController::class, 'index'])->name('notifications');

    Route::get('/profile', [StudentC\ProfileController::class, 'show'])->name('profile');
    Route::post('/profile', [StudentC\ProfileController::class, 'update'])->name('profile.update');

    Route::get('/settings', [StudentC\ProfileController::class, 'settings'])->name('settings');
    Route::post('/settings/password', [StudentC\ProfileController::class, 'updatePassword'])->name('settings.password');

    Route::get('/setup', [StudentC\SetupController::class, 'index'])->name('profile.setup');
    Route::get('/setup/university', [StudentC\SetupController::class, 'university'])->name('setup.university');
    Route::post('/setup', [StudentC\SetupController::class, 'store'])->name('setup.store');
});

/*
|--------------------------------------------------------------------------
| منطقة المعلم (teacher.txt)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:teacher'])->prefix('teacher')->name('teacher.')->group(function () {
    Route::get('/dashboard', [TeacherC\DashboardController::class, 'index'])->name('dashboard');

    Route::get('/courses', [TeacherC\CourseController::class, 'index'])->name('courses.index');
    Route::get('/courses/create', [TeacherC\CourseController::class, 'create'])->name('courses.create');
    Route::post('/courses', [TeacherC\CourseController::class, 'store'])->name('courses.store');
    Route::get('/courses/{course}', [TeacherC\CourseController::class, 'show'])->name('courses.show');
    Route::get('/courses/{course}/edit', [TeacherC\CourseController::class, 'edit'])->name('courses.edit');
    Route::put('/courses/{course}', [TeacherC\CourseController::class, 'update'])->name('courses.update');
    Route::delete('/courses/{course}', [TeacherC\CourseController::class, 'destroy'])->name('courses.destroy');

    Route::get('/assignments', [TeacherC\AssignmentController::class, 'index'])->name('assignments.index');
    Route::post('/courses/{course}/assignments', [TeacherC\AssignmentController::class, 'store'])->name('assignments.store');
    Route::post('/submissions/{submission}/grade', [TeacherC\AssignmentController::class, 'grade'])->name('assignments.grade');

    Route::get('/exams', [TeacherC\ExamController::class, 'index'])->name('exams.index');
    Route::post('/courses/{course}/exams', [TeacherC\ExamController::class, 'store'])->name('exams.store');

    Route::get('/students', [TeacherC\StudentController::class, 'index'])->name('students');

    Route::get('/reviews', [TeacherC\ReviewController::class, 'index'])->name('reviews');

    Route::get('/schedule', [TeacherC\ScheduleController::class, 'index'])->name('schedule');
    Route::post('/schedule/{booking}/status', [TeacherC\ScheduleController::class, 'updateStatus'])->name('schedule.status');

    Route::get('/messages', [TeacherC\MessageController::class, 'index'])->name('messages.index');
    Route::get('/messages/{conversation}', [TeacherC\MessageController::class, 'show'])->name('messages.show');
    Route::post('/messages/{conversation}', [TeacherC\MessageController::class, 'send'])->name('messages.send');

    Route::get('/notifications', [TeacherC\NotificationController::class, 'index'])->name('notifications');

    Route::get('/preferences', [TeacherC\SettingsController::class, 'preferences'])->name('preferences');
    Route::get('/settings', [TeacherC\SettingsController::class, 'settings'])->name('settings');
    Route::post('/settings', [TeacherC\SettingsController::class, 'update'])->name('settings.update');
    Route::post('/settings/password', [TeacherC\SettingsController::class, 'updatePassword'])->name('settings.password');

    Route::get('/setup', [TeacherC\SetupController::class, 'step1'])->name('setup.step1');
    Route::get('/setup/step2', [TeacherC\SetupController::class, 'step2'])->name('setup.step2');
    Route::get('/setup/step3', [TeacherC\SetupController::class, 'step3'])->name('setup.step3');
    Route::post('/setup', [TeacherC\SetupController::class, 'store'])->name('setup.store');
});
