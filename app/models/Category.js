import mongoose from "mongoose";

const descriptionSchema = new mongoose.Schema({
    title: String,
    description: String
})


const CategorySchema = new mongoose.Schema({
     
    name: {type: String, required: true},
    heading: {type: String, required: true},
    slug: {type: String, required: true},
    homeImage: String,
    heroImage: String,
    tagline: String,
    shortDescription: String,
    longDescription: [descriptionSchema]
})


export default mongoose.models.Category || mongoose.model("Category", CategorySchema)