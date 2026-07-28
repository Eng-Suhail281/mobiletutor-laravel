<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = auth()->user()->notifications()->paginate(15);
        auth()->user()->unreadNotifications->markAsRead();

        return view('teacher.notifications', compact('notifications'));
    }
}
