<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeacherProfile extends Model
{
    protected $fillable = [
        'user_id', 'specialty_type', 'specialization', 'qualification',
        'experience_years', 'hourly_rate', 'rating_avg', 'reviews_count',
        'students_count', 'is_verified', 'availability',
    ];

    protected function casts(): array
    {
        return [
            'availability' => 'array',
            'is_verified' => 'boolean',
            'hourly_rate' => 'decimal:2',
            'rating_avg' => 'decimal:2',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
