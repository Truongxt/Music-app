import Playlist from "../models/Playlist.js";
import User from "../models/User.js";

export const findAll = async (req, res) => {
  const playlists = await Playlist.find();

  return res.status(200).json(playlists);
};

export const add = async (req, res) => {
  const userId = req.user.id;
  const { playlistName } = req.body;
  try {
    if (!playlistName || playlistName.trim() === "")
      return res.status(400).json({ message: "Playlist name is required" });

    const playlist = await Playlist.create({
      name: playlistName.trim(),
      user: userId,
      tracks: [],
    });

    const user = await User.findById(userId);
    user.playlists.push(playlist.id);
    await user.save(user);

    return res.status(201).json(playlist);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const findById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    if (!userId)
      return res.status(500).json({ message: "Không có quyền truy cập" });
    const playlists = await Playlist.findOne({ _id: id, user: userId }).populate({path: "tracks", populate: {path: "artist", select: "name"}});
    if (!playlists) {
      return res.status(200).json({ message: "Không tìm thấy" });
    }
    return res.status(200).json(playlists);
  } catch (err) {
    console.log(err);
  }
};

export const togglePlaylistTrack = async (req, res) => {
  const { playlistId, trackId } = req.query;
  const userId = req.user.id;

  try {
    const playlist = await Playlist.findOne({
      _id: playlistId,
      user: userId,
    }).populate("tracks");
    if (!playlist)
      return res.status(404).json({ message: "Playlist not found" });

    const exists = playlist.tracks.some((t) => t._id.toString() === trackId);

    if (exists) {
      playlist.tracks = playlist.tracks.filter(
        (t) => t._id.toString() !== trackId
      );
    } else {
      playlist.tracks.push(trackId);
    }

    await playlist.save();
    const updated = await Playlist.findById(playlistId).populate("tracks");
    return res.status(200).json(updated);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};
