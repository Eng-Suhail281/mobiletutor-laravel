<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;

class ReviewController extends Controller
{
    public function index()
    {
        $reviews = auth()->user()->reviewsReceived()->with('student', 'course')->orderByDesc('created_at')->paginate(10);

        return view('teacher.reviews', compact('reviews'));
    }
}
