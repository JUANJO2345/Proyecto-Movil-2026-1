<?php

namespace Database\Seeders;

use App\Models\Warehouse;
use Illuminate\Database\Seeder;

class WarehouseSeeder extends Seeder
{
    public function run(): void
    {
        Warehouse::create([
            'name' => 'Bodega Principal',
            'location' => 'Manizales'
        ]);

        Warehouse::create([
            'name' => 'Bodega Secundaria',
            'location' => 'Medellín'
        ]);
    }
}