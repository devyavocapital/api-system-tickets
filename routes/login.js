import { Router } from "express";
import { authUser, userAuthenticate } from "../controllers/LoginController.js";
import { auth } from "../middleware/auth.js";
export const loginRouter = Router();

loginRouter.post("/", authUser);
loginRouter.get("/", auth, userAuthenticate);
