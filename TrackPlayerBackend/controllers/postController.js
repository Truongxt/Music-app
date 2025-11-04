import Post from "../models/Post.js";

export const add = async (req, res) => {};

export const update = async (req, res) => {};

export const findById = async (req, res) => {};

export const findByName = async (req, res) => {};

export const del = async (req, res) => {};

export const findAll = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("artist", "name image")
      .populate({
        path: "track",
        populate: {
          path: "artist", 
          select: "name", 
        }})
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};
