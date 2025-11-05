import Playlist from "../models/Playlist.js";

export const findAll = async (req, res) => {
    const playlists = await Playlist.find();

    return res.status(200).json(playlists);
}