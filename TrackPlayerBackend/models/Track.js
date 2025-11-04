import mongoose from "mongoose";

const tracksSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artist", required: true }],
  album: { type: mongoose.Schema.Types.ObjectId, ref: "Album" },
  file: { type: String, required: true },
  img: { type: String, required: true },
  duration: { type: Number, required: true }, 
  likes: { type: Number, default: 0},
  views: { type: Number, default: 0 },
  comments: {type: Number, default: 0}
}, { timestamps: true });

export default mongoose.model("Track", tracksSchema);