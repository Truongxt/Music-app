// models/Post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artist", required: true },
  track: { type: mongoose.Schema.Types.ObjectId, ref: "Track" },
  content: String,
  likes: {type: Number, default: 0},
  comments: {type: Number, default: 0},
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Post", postSchema);
