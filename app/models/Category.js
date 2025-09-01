import mongoose from "mongoose";


const CategorySchema = new mongoose.Schema({
     
    name: {type: String, required: true},
    heading: {type: String, required: true},
    slug: {type: String, required: true},
    homeImage: {
        url: String,
        public_id: String,
    },
    heroImage: {
        url: String,
        public_id: String,
    },
    tagline: String,
    shortDescription: mongoose.Schema.Types.Mixed,
    longDescription: mongoose.Schema.Types.Mixed
})


export default mongoose.models.Category || mongoose.model("Category", CategorySchema)