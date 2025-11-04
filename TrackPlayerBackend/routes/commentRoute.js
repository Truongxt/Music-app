import express from "express";
import {
  findCommentByPost,
  findCommentByTrack,
  postComment,
} from "../controllers/commentController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const commentRouter = express.Router();

commentRouter.get("/findByPost/:id", findCommentByPost);
commentRouter.get("/findByTrack/:id", findCommentByTrack);
commentRouter.post("/", verifyToken, postComment);

export default commentRouter;
