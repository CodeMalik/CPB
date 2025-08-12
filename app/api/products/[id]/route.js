import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Product from "@/app/models/Product";

export const dynamic = "force-dynamic";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};


// Preflight
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}


export const GET = async (req, { params }) => {
  try {
    const { id } = params;

    await connectDB();

    const category = await Product.findById(id);

    if (!Product) {
      return NextResponse.json({ err: "product not found" }, { status: 404 });
    }

    return NextResponse.json(category, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { err: err.message || "Failed to fetch product" },
      { status: 500 }
    );
  }
};

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

   return new NextResponse(JSON.stringify({ message: "Product deleted successfully" }), {
      status: 200,
      headers: corsHeaders
    });
  } catch (err) {
    console.error("Delete error:", err);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500, headers: corsHeaders }
    );
  }
};


export const PUT = async (req, { params }) => {
  try {
    await connectDB();
    const { id } = params;
    const updateData = await req.json();


    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedProduct) {
      return Response.json({ err: "product not found" }, { status: 404 });
    }

    return new NextResponse(JSON.stringify(updatedProduct), {
      status: 200,
      headers: corsHeaders
    });
  } catch (err) {
    return NextResponse.json(
      { err: err.message || "Failed to update Product" },
      { status: 500, headers: corsHeaders }
    );
  }
};