<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::create([
            'name' => 'Laptop Lenovo',
            'description' => 'Laptop empresarial',
            'price' => 3500000,
            'category_id' => 1,
            'supplier_id' => 1
        ]);

        Product::create([
            'name' => 'Mouse Logitech',
            'description' => 'Mouse inalámbrico',
            'price' => 120000,
            'category_id' => 1,
            'supplier_id' => 1
        ]);

        Product::create([
            'name' => 'Silla Oficina',
            'description' => 'Silla ergonómica',
            'price' => 850000,
            'category_id' => 2,
            'supplier_id' => 2
        ]);
    }
}