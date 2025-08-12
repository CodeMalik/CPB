import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Product from '@/app/models/Product';
import Category from '@/app/models/Category';
export const dynamic = "force-dynamic";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Preflight
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      name,
      heading,
      slug,
      image,
      images,
      tagline,
      shortDescription,
      longDescription,
      categorySlug,
      meta
    } = body;

    // 🟡 1. Find category by slug
    const category = await Category.find({ slug: { $in: categorySlug } });

    if (!category || category.length === 0) {
      return NextResponse.json(
        { error: 'Category not found for slug: ' + categorySlug },
        { status: 400, headers: corsHeaders }
      );
    }

    const categoryIds = category.map((cat) => cat._id);

    // 🟢 2. Create product with categoryId
    const newProduct = await Product.create({
      name,
      heading,
      slug,
      image,
      images,
      tagline,
      shortDescription,
      longDescription,
      categoryIds,
      categorySlug,
      meta
    });

     return new NextResponse(JSON.stringify(newProduct), {
      status: 201,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find();
     return new NextResponse(JSON.stringify(products), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500, headers: corsHeaders });
  }
}