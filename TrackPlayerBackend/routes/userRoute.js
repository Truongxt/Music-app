import express from 'express'
import { getLikedTracks, toggleLikeTrack } from '../controllers/userController.js'
import { verifyToken } from '../middleware/authMiddleware.js';

const userRoute = express.Router();

userRoute.put("/toggleLikeTrack", verifyToken, toggleLikeTrack);
userRoute.get("/getLikedTracks", verifyToken, getLikedTracks);
export default userRoute;