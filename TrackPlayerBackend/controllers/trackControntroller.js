import Track from "../models/Track.js";

export const add = async (req, res) => {};

export const update = async (req, res) => {};

export const findById = async (req, res) => {
  const { id } = req.params;
  const data = await Track.findById(id).populate("artist", "name");
  return res.json(data);
};

export const findByArtist = async (req, res) => {
  const { id } = req.params;
  try {
    const tracks = await Track.find({ artist: id }).populate(
      "artist",
      "name img"
    );

    return res.status(200).json(tracks);
  } catch (err) {
    console.log("Lỗi khi get track by artist");
    return res.status(500).json({ message: err });
  }
};

export const findByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name || name.trim() === "") {
      return res
        .status(400)
        .json({ message: "Missing 'name' query parameter" });
    }

    // Tìm theo tên bài hát, không phân biệt hoa thường
    const tracks = await Track.find({
      title: { $regex: name, $options: "i" },
    })
      .populate("artist", "name") // Lấy thêm tên + ảnh nghệ sĩ
      .sort({ createdAt: -1 }); // Mới nhất lên đầu

    if (tracks.length === 0) {
      return res.status(404).json({ message: "No tracks found" });
    }

    res.status(200).json(tracks);
  } catch (error) {
    console.error("Error searching tracks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const del = async (req, res) => {};

export const findAll = async (req, res) => {
  const tracks = await Track.find().populate("artist", "name");

  return res.json(tracks);
};
