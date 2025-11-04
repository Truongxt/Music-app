import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  descriptionImg: String,
  image: String,
  albums: [{ type: mongoose.Schema.Types.ObjectId, ref: "Album" }],
  followers: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Artist", artistSchema);
