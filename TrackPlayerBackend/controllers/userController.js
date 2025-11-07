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

export const getUserLibrary = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
      .populate({path: "playlists", populate: {path: "tracks"}})
      .populate("followedArtists", "name followers image")
      .populate({
        path: "likedTracks",
        populate: {
          path: "artist",
          select: "name", 
        },
      });

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({
      playlists: user.playlists,
      artists: user.followedArtists,
      tracks: user.likedTracks,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};


export const followAritst = async (req, res) => {
  const userId = req.user.id;
  const {artistId} = req.body;
  try{
    const user = await User.findById(userId);

    if (!user.followedArtists.includes(artistId)) {
      user.followedArtists.push(artistId);
    } else {
      user.followedArtists = user.followedArtists.filter(
        (id) => id.toString() !== artistId.toString()
      );
    }

    await user.save();
    res.status(200).json({
      followedArtists: user.followedArtists,
    });
  }catch(err){
    console.log("Lôi khi follow artist:", err);
  }
}
