import { Router } from "express";
import { authUser, userAuthenticate } from "../controllers/loginController.js";
import { auth } from "../middleware/auth.js";
export const loginRouter = Router();

loginRouter.post("/", authUser);
loginRouter.get("/", auth, userAuthenticate);
