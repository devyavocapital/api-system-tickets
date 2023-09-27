import { Router } from "express";
import {
	createComment,
	getComments,
} from "../controllers/commentsController.js";
import { auth } from "../middleware/auth.js";
export const commentRouter = Router();

commentRouter.get("/", auth, getComments);
commentRouter.post("/", auth, createComment);
