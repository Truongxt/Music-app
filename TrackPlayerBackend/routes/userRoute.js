import express from "express";
import {
  getLikedTracks,
  toggleLikeTrack,
  getUserLibrary,
  followAritst,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const userRoute = express.Router();

userRoute.put("/toggleLikeTrack", verifyToken, toggleLikeTrack);
userRoute.get("/getLikedTracks", verifyToken, getLikedTracks);
userRoute.get("/myLibrary", verifyToken, getUserLibrary);
userRoute.put("/toggleFollowArtist", verifyToken, followAritst);

export default userRoute;
