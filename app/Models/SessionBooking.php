<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SessionBooking extends Model
{
    protected $fillable = [
        'student_id', 'teacher_id', 'type', 'scheduled_at', 'duration_minutes',
        'price', 'status', 'notes', 'meeting_link',
    ];

    protected function casts(): array
    {
        return ['scheduled_at' => 'datetime', 'price' => 'decimal:2'];
    }

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    public function payment()
    {
        return $this->morphOne(Payment::class, 'payable');
    }
}
