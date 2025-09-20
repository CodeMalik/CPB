import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  heading: { type: String, required: true },
  slug: {type: String, required: true},
  categorySlug: {type: String, required: true},
   image: {
    url: String,
    alt: String,
    title: String,
    caption: String,
    public_id: String,
  },
  images: [
    {
      url: String,
      alt: String,
      title: String,
      caption: String,
      public_id: String,
    },
  ],
  tagline: String,
  shortDescription: mongoose.Schema.Types.Mixed,

  categoryIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],

  longDescription: String,
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
