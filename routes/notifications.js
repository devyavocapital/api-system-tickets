import { Router } from "express";
import {
	createNotification,
	getNotifications,
	updateDataNotification,
	updateNotification,
} from "../controllers/notificationsController.js";
import { auth } from "../middleware/auth.js";
export const notificationRouter = Router();

notificationRouter.get("/", auth, getNotifications);
notificationRouter.put("/data", auth, updateDataNotification);
notificationRouter.post("/", auth, createNotification);
notificationRouter.put("/", auth, updateNotification);
