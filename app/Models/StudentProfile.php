<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentProfile extends Model
{
    protected $fillable = ['user_id', 'university', 'major', 'academic_year'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
