import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import trackRoute from "./routes/tracksRoute.js";
import artistRoute from "./routes/artistRoute.js";
import postRoute from "./routes/postRoute.js";
import albumRoute from "./routes/albumRoute.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import commentRouter from "./routes/commentRoute.js";
import searchRoute from "./routes/searchRoute.js";

const app = express();
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/tracks", trackRoute);
app.use("/artists", artistRoute);
app.use("/posts", postRoute);
app.use("/albums", albumRoute);
app.use("/user", userRoute);
app.use("/comments", commentRouter);
app.use("/search", searchRoute);

app.get("/", (req, res) => {
  res.json({ message: "Server is running successfully!" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
