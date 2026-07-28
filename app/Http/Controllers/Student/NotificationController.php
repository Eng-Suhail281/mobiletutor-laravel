<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = auth()->user()->notifications()->paginate(15);
        auth()->user()->unreadNotifications->markAsRead();

        return view('student.notifications', compact('notifications'));
    }
}
