import express from "express";
import {
  add,
  findAll,
  findById,
  togglePlaylistTrack,
} from "../controllers/playlistController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const playlistRoute = express.Router();

playlistRoute.get("/findById/:id", verifyToken, findById);
playlistRoute.get("/", findAll);
playlistRoute.post("/toggleInTrack", verifyToken, togglePlaylistTrack);
playlistRoute.post("/add", verifyToken, add);

export default playlistRoute;
