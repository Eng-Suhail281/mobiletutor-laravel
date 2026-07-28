<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;

class SupportController extends Controller
{
    public function index()
    {
        return view('public.support');
    }
}
