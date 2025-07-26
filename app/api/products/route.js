import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Product from '@/app/models/Product';
import Category from '@/app/models/Category';
// POST /api/products
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

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found for slug: ' + categorySlug },
        { status: 400 }
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

    return NextResponse.json( newProduct ,{ status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}