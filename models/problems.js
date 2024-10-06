const mongoose = require("mongoose");

// Define the Problem Schema
const ProblemSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  leetcode_link: {
    type: String,
    required: true,
  },
  youtube_link: {
    type: String,
    default: null, // Optional YouTube link
  },
  difficulty: {
    type: String,
    required: true,
    enum: ["easy", "medium", "hard"], // Limit values to easy, medium, hard
  },
  category: {
    type: String,
    required: true, 
  },
  created_at: {
    type: Date,
    default: Date.now, 
  },
});
const Problem = mongoose.model("Problem", ProblemSchema);

module.exports = Problem;
