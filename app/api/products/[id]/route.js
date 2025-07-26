import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Product from "@/app/models/Product";

// DELETE /api/products/[id]
export const DELETE = async (req, { params }) => {
  try {
    await connectDB();

    const { id } = params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product deleted successfully", product: deletedProduct },
      { status: 200 }
    );
  } catch (err) {
    console.error("Delete error:", err);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
};
