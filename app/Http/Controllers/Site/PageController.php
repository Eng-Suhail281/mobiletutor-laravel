<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;

class PageController extends Controller
{
    public function accountSelect()
    {
        return view('public.account-select');
    }
}
