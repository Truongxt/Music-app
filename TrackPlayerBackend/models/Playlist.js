import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  name: { type: String, require: true},
  tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track"}],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
}, { timestamps: true });

export default mongoose.model("Playlist", playlistSchema);
