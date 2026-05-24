<?php

namespace Database\Seeders;

use App\Models\Supplier;
use Illuminate\Database\Seeder;

class SupplierSeeder extends Seeder
{
    public function run(): void
    {
        Supplier::create([
            'name' => 'Tech Supplies',
            'email' => 'tech@supplies.com',
            'phone' => '3001112233',
            'address' => 'Manizales'
        ]);

        Supplier::create([
            'name' => 'Global Office',
            'email' => 'office@global.com',
            'phone' => '3004445566',
            'address' => 'Bogotá'
        ]);
    }
}