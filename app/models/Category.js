import mongoose from "mongoose";


const CategorySchema = new mongoose.Schema({
     
    name: {type: String, required: true},
    heading: {type: String, required: true},
    slug: {type: String, required: true, unique: true},
    homeImage: {
    url: String,
    alt: String,
    title: String,
    caption: String,
    description: String,
    public_id: String,
  },
    heroImage: {
    url: String,
    alt: String,
    title: String,
    caption: String,
    description: String,
    public_id: String,
  },
    tagline: String,
    shortDescription: mongoose.Schema.Types.Mixed,
    longDescription: mongoose.Schema.Types.Mixed
})


export default mongoose.models.Category || mongoose.model("Category", CategorySchema)