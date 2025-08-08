import { connectDB } from "@/lib/mongoose";
import Category from "@/app/models/Category";

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
