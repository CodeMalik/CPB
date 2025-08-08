import { connectDB } from "@/lib/mongoose";
import Category from "@/app/models/Category";

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}


export const GET = async (req, { params }) => {
  try {
    const { id } = params;

    await connectDB();

    const category = await Category.findById(id);

    if (!category) {
      return Response.json({ err: "Category not found" }, { status: 404 });
    }

    return Response.json(category, { status: 200 });
  } catch (err) {
    return Response.json(
      { err: err.message || "Failed to fetch category" },
      { status: 500 }
    );
  }
};

export const PUT = async (req, { params }) => {
  try {
    await connectDB();
    const { id } = params;
    const updateData = await req.json();


    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedCategory) {
      return Response.json({ err: "Category not found" }, { status: 404 });
    }

    return Response.json(updatedCategory, { status: 200 });
  } catch (err) {
    return Response.json(
      { err: err.message || "Failed to update category" },
      { status: 500 }
    );
  }
};


export const DELETE = async (req, { params }) => {
  try {
    await connectDB();

    const { id } = params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return Response.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    return new Response(JSON.stringify({ message: "Deleted successfully" }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });

  } catch (err) {
    console.error("Delete error:", err);
    return Response.json(
      { error: "Failed to delete Category" },
      { status: 500 }
    );
  }
};

