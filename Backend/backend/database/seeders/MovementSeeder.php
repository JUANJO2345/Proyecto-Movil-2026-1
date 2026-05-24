<?php

namespace Database\Seeders;

use App\Models\Movement;
use Illuminate\Database\Seeder;

class MovementSeeder extends Seeder
{
    public function run(): void
    {
        Movement::create([
            'user_id' => 1,
            'product_id' => 1,
            'inventory_id' => 1,
            'type' => 'entrada',
            'quantity' => 15
        ]);

        Movement::create([
            'user_id' => 2,
            'product_id' => 2,
            'inventory_id' => 1,
            'type' => 'salida',
            'quantity' => 3
        ]);
    }
}