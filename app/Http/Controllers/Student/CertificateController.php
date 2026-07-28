<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;

class CertificateController extends Controller
{
    public function index()
    {
        $certificates = auth()->user()->certificates()->with('course')->orderByDesc('issued_at')->get();

        return view('student.certificates', compact('certificates'));
    }
}
