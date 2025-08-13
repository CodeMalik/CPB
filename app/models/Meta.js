import mongoose, { Schema } from "mongoose";

const metaSchema = new Schema(
  {
    identifier: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      description:
        "Unique identifier for the page (e.g., product slug, category slug, or a static name like 'home', 'about-us').",
    },
    pageType: {
      type: String,
      required: true,
      enum: ["product", "category", "static"],
      description: "The type of page this metadata belongs to.",
    },
    metaTitle: {
      type: String,
      required: true,
      trim: true,
    },
    metaDescription: {
      type: String,
      required: true,
      trim: true,
    },
    keywords: {
      type: String,
      trim: true,
    },
    canonicalUrl: {
      type: String,
      trim: true,
    },
    ogImage: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Meta = mongoose.models.Meta || mongoose.model("Meta", metaSchema);

export default Meta;
