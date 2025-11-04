import Comment from "../models/Comment.js";

export const findCommentByTrack = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Comment.find({ track: id }).populate(
      "user",
      "displayName avatar"
    ).sort({createdAt: -1});

    return res.status(200).json(data);
  } catch (err) {
    console.log("Lỗi: " + err);
    return res.status(500).json({ message: "Lỗi khi find Comment" });
  }
};
export const findCommentByPost = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Comment.find({ post: id }).populate(
      "user",
      "displayName avatar"
    ).sort({createdAt: -1});

    return res.status(200).json(data);
  } catch (err) {
    console.log("Lỗi: " + err);
    return res.status(500).json({ message: "Lỗi khi find Comment" });
  }
};
export const postComment = async (req, res) => {
  const { content, track, post, responseFor } = req.body;
  const userId = req.user.id;
  try {
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    if (!track && !post) {
      return res
        .status(400)
        .json({ message: "Either track or post must be provided" });
    }

    const newComment = new Comment({
      content,
      track: track || undefined,
      post: post || undefined,
      responseFor: responseFor || undefined,
      user: userId,
    });

    await newComment.save();

    const populatedComment = await newComment.populate(
      "user",
      "displayName avatar"
    );

    return res.status(201).json(populatedComment);
  } catch (err) {
    console.error("Error posting comment:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
