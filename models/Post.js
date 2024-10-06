const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    questions: {
      type: String,
      required: true,
    },
    tips: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
