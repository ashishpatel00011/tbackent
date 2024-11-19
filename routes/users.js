const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

// UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

// GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});
//

// Add problem solved to user
router.put("/:id/addproblemsolved", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { problemId } = req.body;
    if (!problemId) {
      return res.status(400).json({ message: "Problem ID is required" });
    }

    // Add the problemId if not already in the user's problemsSolved array
    if (!user.problemsSolved.includes(problemId)) {
      user.problemsSolved.push(problemId);
      await user.save();
      return res.status(200).json({ message: "Problem added successfully" });
    } else {
      return res
        .status(400)
        .json({ message: "Problem already solved by user" });
    }
  } catch (err) {
    console.error("Error adding problem:", err);
    return res.status(500).json({ error: err.message });
  }
});

// Delete problem solved from user
router.delete("/:id/deleteproblemsolved/:problemId", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { problemId } = req.params;
    const index = user.problemsSolved.indexOf(problemId);

    if (index > -1) {
      user.problemsSolved.splice(index, 1);
      await user.save();
      return res.status(200).json({ message: "Problem removed successfully" });
    } else {
      return res
        .status(400)
        .json({ message: "Problem not found in user's list" });
    }
  } catch (err) {
    console.error("Error removing problem:", err);
    return res.status(500).json({ error: err.message });
  }
});

// GET USER PROBLEMS SOLVED
router.get("/:id/problemsaved", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ problemsSolved: user.problemsSolved });
  } catch (err) {
    console.error("Error fetching problems solved:", err);
    return res.status(500).json({ error: err.message });
  }
});
module.exports = router;
