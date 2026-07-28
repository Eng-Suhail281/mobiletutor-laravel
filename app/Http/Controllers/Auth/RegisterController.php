<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\StudentProfile;
use App\Models\TeacherProfile;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class RegisterController extends Controller
{
    public function showStudentForm()
    {
        return view('auth.register-student');
    }

    public function showTeacherForm()
    {
        return view('auth.register-teacher');
    }

    public function registerStudent(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'phone' => ['nullable', 'string', 'max:20', 'unique:users,phone'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'password' => Hash::make($data['password']),
            'role' => 'student',
        ]);

        StudentProfile::create(['user_id' => $user->id]);

        Auth::login($user);

        return redirect()->route('student.profile.setup');
    }

    public function registerTeacher(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'phone' => ['nullable', 'string', 'max:20', 'unique:users,phone'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'password' => Hash::make($data['password']),
            'role' => 'teacher',
        ]);

        // النوع الدقيق (أكاديمي/دعم نفسي) يُحدد لاحقًا في معالج الإعداد (teacher-setup)
        TeacherProfile::create([
            'user_id' => $user->id,
            'specialty_type' => 'academic',
        ]);

        Auth::login($user);

        return redirect()->route('teacher.setup.step1');
    }
}
