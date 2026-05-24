<?php

namespace Database\Seeders;

use App\Models\Inventory;
use Illuminate\Database\Seeder;

class InventorySeeder extends Seeder
{
    public function run(): void
    {
        Inventory::create([
            'product_id' => 1,
            'warehouse_id' => 1,
            'stock' => 15
        ]);

        Inventory::create([
            'product_id' => 2,
            'warehouse_id' => 1,
            'stock' => 40
        ]);

        Inventory::create([
            'product_id' => 3,
            'warehouse_id' => 2,
            'stock' => 10
        ]);
    }
}
