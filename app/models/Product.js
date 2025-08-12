import mongoose from "mongoose";

const descriptionSchema = new mongoose.Schema({
  title: String,
  description: mongoose.Schema.Types.Mixed,
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  heading: { type: String, required: true },
  slug: {type: String, required: true},
  categorySlug: {type: mongoose.Schema.Types.Mixed, required: true},
  image: { type: String, required: true },
  images: { type: [String], required: false },
  tagline: String,
  shortDescription: mongoose.Schema.Types.Mixed,

  categoryIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],

  longDescription: [descriptionSchema],
  meta: {
    title: String,
    description: String,
    keywords: String,
    ogImage: String,
    ogTitle: String,
    ogDescription: String,
    twitterTitle: String,
    twitterDescription: String,
    twitterImage: String,
  },
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
