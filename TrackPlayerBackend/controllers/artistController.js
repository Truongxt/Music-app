import Artist from "../models/Artist.js";

export const add = async (req, res) => {};

export const update = async (req, res) => {};

export const findById = async (req, res) => {
  const { id } = req.params;
  try {
    const artist = await Artist.findById(id).populate("albums", "title cover");

    return res.status(200).json(artist);
  } catch (err) {
    console.log("Lỗi khi get artist by id: " + err);
    res.status(500).json({ message: "Lỗi khi get artist by id: " + err });
  }
};

export const findByName = async (req, res) => {};

export const del = async (req, res) => {};

export const findAll = async (req, res) => {
  const artists = await Artist.find();

  return res.json(artists);
};


export const findPopularArtists = async (req, res) => {
  try {
    const artist = await Artist.find().sort({ followers: -1 }).limit(5);

    return res.status(200).json(artist);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error while get popular artist" });
  }
};
