import User from "../models/User.js";

export const toggleLikeTrack = async (req, res) => {
  try {
    const userId = req.user.id;
    const { trackId } = req.body;

    const user = await User.findById(userId);

    if (!user.likedTracks.includes(trackId)) {
      user.likedTracks.push(trackId);
    } else {
      user.likedTracks = user.likedTracks.filter(
        (id) => id.toString() !== trackId.toString()
      );
    }

    await user.save();
    res.status(200).json({
      likedTracks: user.likedTracks,
    });
  } catch (err) {
    console.error("Lỗi khi xử lý like track:", err);
    res.status(500).json({ message: "Lỗi khi xử lý like track" });
  }
};


export const getLikedTracks = async (req, res) => {
  const userId = req.user.id; 

  try {
    const user = await User.findById(userId)
      .populate({
        path: "likedTracks",            
        populate: {                     
          path: "artist",
          select: "name",        
        },
      })
      .select("likedTracks");

    return res.status(200).json(user.likedTracks);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách bài hát yêu thích:", err);
    return res.status(500).json({ message: "Lỗi server" });
  }
};