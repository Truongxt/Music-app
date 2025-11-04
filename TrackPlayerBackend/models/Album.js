import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artist", required: true },
  cover: String,
  tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Music" }],
}, { timestamps: true });

export default mongoose.model("Album", albumSchema);
