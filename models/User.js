const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Unique username
    },
    email: {
      type: String,
      required: true,
      unique: true, // Unique email
    },
    password: {
      type: String,
      required: true,
    },
    problemsSolved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem", // Reference to Problem model
        default: [], // Default to an empty array
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
