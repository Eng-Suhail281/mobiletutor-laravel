<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Lesson;
use App\Models\StudentProfile;
use App\Models\TeacherProfile;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // تصنيفات
        $categories = collect(['برمجة', 'أمن سيبراني', 'إدارة أعمال', 'لغات'])
            ->map(fn ($name) => Category::create(['name' => $name, 'slug' => Str::slug($name)]));

        // معلم تجريبي
        $teacher = User::create([
            'name' => 'أ. أحمد ناصر',
            'email' => 'teacher@example.com',
            'password' => Hash::make('password'),
            'role' => 'teacher',
            'bio' => 'مدرب تطوير ويب بخبرة أكثر من 8 سنوات.',
        ]);
        TeacherProfile::create([
            'user_id' => $teacher->id,
            'specialty_type' => 'academic',
            'specialization' => 'تطوير الويب',
            'qualification' => 'ماجستير علوم حاسوب',
            'experience_years' => 8,
            'hourly_rate' => 20,
            'rating_avg' => 4.8,
            'is_verified' => true,
        ]);

        // مختص دعم نفسي تجريبي
        $specialist = User::create([
            'name' => 'أ. سارة أبو غزالة',
            'email' => 'specialist@example.com',
            'password' => Hash::make('password'),
            'role' => 'teacher',
            'bio' => 'أخصائية إرشاد نفسي للطلاب.',
        ]);
        TeacherProfile::create([
            'user_id' => $specialist->id,
            'specialty_type' => 'support',
            'specialization' => 'إرشاد نفسي',
            'experience_years' => 5,
            'hourly_rate' => 15,
            'rating_avg' => 4.9,
            'is_verified' => true,
        ]);

        // طالب تجريبي
        $student = User::create([
            'name' => 'طالب تجريبي',
            'email' => 'student@example.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);
        StudentProfile::create(['user_id' => $student->id, 'university' => 'الجامعة الإسلامية', 'major' => 'هندسة برمجيات']);

        // كورس تجريبي
        $course = Course::create([
            'teacher_id' => $teacher->id,
            'category_id' => $categories->first()->id,
            'title' => 'تطوير تطبيقات الويب باستخدام React',
            'slug' => 'react-web-development-'.Str::random(5),
            'description' => 'كورس شامل لتعلم بناء واجهات المستخدم الحديثة باستخدام React من الصفر حتى الاحتراف.',
            'price' => 50,
            'level' => 'beginner',
            'duration_hours' => 12,
            'status' => 'published',
            'rating_avg' => 4.7,
        ]);

        foreach (range(1, 5) as $i) {
            Lesson::create([
                'course_id' => $course->id,
                'title' => "الدرس رقم $i",
                'content' => 'محتوى تعليمي تجريبي لهذا الدرس.',
                'duration_minutes' => 30,
                'order' => $i,
                'is_free_preview' => $i === 1,
            ]);
        }

        Enrollment::create([
            'student_id' => $student->id,
            'course_id' => $course->id,
            'progress_percent' => 40,
        ]);

        $course->increment('students_count');
    }
}
