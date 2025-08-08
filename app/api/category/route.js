import { connectDB } from "@/lib/mongoose";
import Category from "@/app/models/Category";

export const dynamic = "force-dynamic";

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}


export const GET = async () => {
    try {
        await connectDB()
        const categories = await Category.find()
        return Response.json(categories, {status: 200})
    } catch(err) {
        return Response.json({err: "Failed to Fetch Categories"}, {status: 500})
    }
}


export async function POST(req) {
  try {
    const data = await req.json();
    await connectDB();
    const newCategory = await Category.create(data);

    return new Response(JSON.stringify(newCategory), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    console.error("API Error:", err);
    return new Response(
      JSON.stringify({ err: err.message || "Failed to create category" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}