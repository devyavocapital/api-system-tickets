import { Router } from "express";
import {
	createNotification,
	getNotifications,
	patchNotification,
	updateDataNotification,
} from "../controllers/notificationsController.js";
import { auth } from "../middleware/auth.js";
export const notificationRouter = Router();

notificationRouter.get("/", auth, getNotifications);
notificationRouter.put("/", auth, updateDataNotification);
notificationRouter.post("/", auth, createNotification);
notificationRouter.patch("/", auth, patchNotification);
