import Artist from "../models/Artist.js";
import Album from "../models/Album.js";
import Music from "../models/Track.js";

export const searchAll = async (req, res) => {
  const { searchValue } = req.query;
  if (!searchValue)
    return res.status(400).json({ message: "Missing search query" });
  try {
    const regex = new RegExp(searchValue, "i");

    const [artists, albums, musics] = await Promise.all([
      Artist.find({ name: regex }),
      Album.find({ title: regex }).populate("artist", "name image"),
      Music.find({ title: regex })
        .populate("artist", "name image")
        .populate("album", "title cover"),
    ]);

    res.status(200).json({
      artists,
      albums,
      musics,
    });
  } catch (error) {
    console.error("Error in searchAll:", error);
    res.status(500).json({ message: "Search failed" });
  }
};
