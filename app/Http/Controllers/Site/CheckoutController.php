<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Payment;
use Illuminate\Http\Request;
use Stripe\Checkout\Session as StripeSession;
use Stripe\Stripe;

class CheckoutController extends Controller
{
    /**
     * صفحة الدفع لكورس معيّن (checkout.html)
     */
    public function show(Course $course)
    {
        if (auth()->user()->enrolledCourses()->where('courses.id', $course->id)->exists()) {
    return redirect()->route('student.courses.index');
}
        return view('public.checkout', compact('course'));
    }

    /**
     * إنشاء جلسة دفع Stripe وتحويل المستخدم إليها.
     * يتطلب ضبط STRIPE_KEY / STRIPE_SECRET في .env
     */
    public function pay(Request $request, Course $course)
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        $payment = Payment::create([
            'user_id' => auth()->id(),
            'payable_type' => Course::class,
            'payable_id' => $course->id,
            'amount' => $course->price,
            'currency' => 'usd',
            'gateway' => 'stripe',
            'status' => 'pending',
        ]);

        $session = StripeSession::create([
            'payment_method_types' => ['card'],
            'mode' => 'payment',
            'line_items' => [[
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => ['name' => $course->title],
                    'unit_amount' => (int) round($course->price * 100),
                ],
                'quantity' => 1,
            ]],
            'metadata' => ['payment_id' => $payment->id, 'course_id' => $course->id],
            'success_url' => route('checkout.success', ['course' => $course->id]).'?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('checkout.show', ['course' => $course->id]),
        ]);

        $payment->update(['gateway_ref' => $session->id]);

        return redirect($session->url);
    }

    /**
     * صفحة نجاح الدفع: تفعّل الاشتراك (enrollment) فعليًا.
     */
    public function success(Request $request, Course $course)
    {
        $payment = Payment::where('payable_type', Course::class)
            ->where('payable_id', $course->id)
            ->where('user_id', auth()->id())
            ->latest()
            ->first();

        if ($payment) {
            // التحقق الفعلي من حالة الجلسة عبر Stripe API قبل التفعيل في بيئة الإنتاج:
            // Stripe::setApiKey(config('services.stripe.secret'));
            // $session = StripeSession::retrieve($request->query('session_id'));
            // abort_unless($session->payment_status === 'paid', 402);
            $payment->update(['status' => 'paid', 'paid_at' => now()]);
        } elseif ($course->price > 0) {
            abort(402, 'لم يتم العثور على عملية دفع صالحة لهذا الكورس.');
        }

        Enrollment::firstOrCreate(
            ['student_id' => auth()->id(), 'course_id' => $course->id],
            ['enrolled_at' => now()]
        );

        $course->increment('students_count');

        return view('public.checkout', ['course' => $course, 'paid' => true]);
    }
}
