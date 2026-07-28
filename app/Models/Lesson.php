<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    protected $fillable = [
        'course_id', 'title', 'content', 'video_url',
        'duration_minutes', 'order', 'is_free_preview',
    ];

    protected function casts(): array
    {
        return ['is_free_preview' => 'boolean'];
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
