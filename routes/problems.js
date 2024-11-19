const express = require("express");
const router = express.Router();
const Problem = require("../models/problems");

// @route   POST /problems
// @desc    Add a new problem
router.post("/", async (req, res) => {
  const { type, name, leetcode_link, youtube_link, difficulty, category } =
    req.body;

  try {
    const newProblem = new Problem({
      type,
      name,
      leetcode_link,
      youtube_link,
      difficulty,
      category,
    });

    const savedProblem = await newProblem.save();
    res.status(201).json(savedProblem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find();
    res.status(200).json(problems);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ msg: "Problem not found" });
    }
    res.status(200).json(problem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put("/:id", async (req, res) => {
  const {
    type,
    name,
    leetcode_link,
    github_link,
    youtube_link,
    difficulty,
    category,
  } = req.body;

  try {
    const updatedProblem = await Problem.findByIdAndUpdate(
      req.params.id,
      { type, name, leetcode_link, youtube_link, difficulty, category },
      { new: true } // Return the updated problem
    );

    if (!updatedProblem) {
      return res.status(404).json({ msg: "Problem not found" });
    }

    res.status(200).json(updatedProblem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
