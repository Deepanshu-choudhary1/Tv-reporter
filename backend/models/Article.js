import mongoose from "mongoose"

const ArticleSchema = new mongoose.Schema(
  {
    title: String,

    slug: {
      type: String,
      unique: true
    },

    content: String,

    category: String,

    tags: [String],

    featuredImage: String,

    videoUrl: String,

    likes: {
      type: Number,
      default: 0
    },

    views: {
      type: Number,
      default: 0
    },

    seoTitle: String,

    seoDescription: String,

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft"
    }
  },
  { timestamps: true }
)

ArticleSchema.index({
  title: "text",
  content: "text",
  tags: "text"
})

export default mongoose.model("Article", ArticleSchema)