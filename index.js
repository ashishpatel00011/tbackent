const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const contectRoute = require("./routes/contect");
const ProblemRoute = require("./routes/problems");

const multer = require("multer");
const path = require("path");
const cors = require("cors");

const corsOptions = {
  origin: ["http://localhost:3000", "https://mitstpo.vercel.app"], // Add all allowed origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
  credentials: true, // Allow cookies or authentication headers
};

app.use(cors(corsOptions));
dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = req.body.name;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/contect", contectRoute);
app.use("/api/dsa", ProblemRoute);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
