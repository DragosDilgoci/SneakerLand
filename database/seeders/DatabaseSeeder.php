<?php

namespace Database\Seeders;

use App\Models\Story;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(AdminSeeder::class);

        $stories = Story::factory()->count(10)->create();

        $tags = Tag::factory()->count(20)->create();

        $stories->each(function ($story) use ($tags) {
            $story->tags()->attach(
                $tags->random(rand(1, 3))->pluck('id')->toArray()
            );
        });
    }
}
