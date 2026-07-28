<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('teacher_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            // 'academic' = معلم مادة، 'support' = مختص دعم نفسي
            $table->enum('specialty_type', ['academic', 'support'])->default('academic');
            $table->string('specialization')->nullable();
            $table->string('qualification')->nullable();
            $table->unsignedSmallInteger('experience_years')->nullable();
            $table->decimal('hourly_rate', 8, 2)->nullable();
            $table->decimal('rating_avg', 3, 2)->default(0);
            $table->unsignedInteger('reviews_count')->default(0);
            $table->unsignedInteger('students_count')->default(0);
            $table->boolean('is_verified')->default(false);
            $table->json('availability')->nullable(); // أيام/أوقات التوفر
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('teacher_profiles');
    }
};
