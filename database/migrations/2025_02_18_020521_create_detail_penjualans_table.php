<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('detail_penjualans', function (Blueprint $table) {
            $table->id("DetailID");
            $table->unsignedBigInteger("PenjualanID");
            $table->unsignedBigInteger("ProdukID");
            $table->integer("JumlahProduk");
            $table->decimal("Subtotal", 10, 2);

            $table->foreign("PenjualanID")->references('PenjualanID')->on("penjualans")->onUpdate("restrict")->onDelete("cascade");
            $table->foreign("ProdukID")->references("ProdukID")->on("produks")->onDelete("cascade")->onUpdate("restrict");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_penjualans');
    }
};
