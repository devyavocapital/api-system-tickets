import { Router } from "express";
import { getNames } from "../controllers/namesController.js";
import { auth } from "../middleware/auth.js";
export const namesRouter = Router();

namesRouter.get("/", auth, getNames);
