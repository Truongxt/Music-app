import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    displayName: String,
    avatar: String,
    playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }],
    likedTracks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }],
    followedArtists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artist" }],
    likedComment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
