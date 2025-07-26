import { connectDB } from "@/lib/mongoose";
import Category from "@/app/models/Category";



export const GET = async () => {
    try {
        await connectDB()
        const categories = await Category.find()
        return Response.json(categories, {status: 200})
    } catch(err) {
        return Response.json({err: "Failed to Fetch Categories"}, {status: 500})
    }
}


export const POST = async (req) => {
        try {
            const data = await req.json()
            await connectDB()
            const newCategory = await Category.create(data)
            return Response.json(newCategory, {status: 201}) 
        } catch(err) {
            return Response.json({err: err.message || "Failed to create new category"}, {status: 500})
        }
}