<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExamQuestion extends Model
{
    protected $fillable = ['exam_id', 'question', 'type', 'options', 'correct_answer', 'marks', 'order'];

    protected function casts(): array
    {
        return ['options' => 'array'];
    }

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }
}
