import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  track: { type: mongoose.Schema.Types.ObjectId, ref: "Track"},
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post"},
  responseFor: { type: mongoose.Schema.Types.ObjectId, ref: "Comment"}
}, { timestamps: true });

export default mongoose.model("Comment", commentSchema);