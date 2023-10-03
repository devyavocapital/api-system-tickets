import cors from "cors";
import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import { categoryRouter } from "./routes/categories.js";
import { commentRouter } from "./routes/comments.js";
import { createUserRouter } from "./routes/createUser.js";
import { routerImages } from "./routes/images.js";
import { issuesRouter } from "./routes/issues.js";
import { loginRouter } from "./routes/login.js";
import { namesRouter } from "./routes/names.js";
import { notificationRouter } from "./routes/notifications.js";
import { statsRouter } from "./routes/stats.js";

const app = express();
const http = createServer(app);

const PORT = process.env.PORT || 4000;

const socketIO = new Server(http, {
	cors: {
		origin: "http://localhost:5173",
	},
});

app.use(cors());
app.use(express.json());

let users = [];

socketIO.on("connection", (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);
	socket.on("notification", (data) => {
		console.log({ dataNotification: data });
		socketIO.emit("notificationResponse", data);
	});

	socket.on("newUser", (data) => {
		users.push(data);
		socketIO.emit("newUserResponse", users);
	});

	socket.on("disconnect", () => {
		console.log("🔥: A user disconnected");
		users = users.filter((user) => user.socketID !== socket.id);
		socketIO.emit("newUserResponse", users);
		socket.disconnect();
	});
});

app.use("/api/v1/login", loginRouter);
app.use("/api/v1/create", createUserRouter);
app.use("/api/v1/issues", issuesRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/names", namesRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use("/images", routerImages);
app.use("/api/v1/stats", statsRouter);

http.listen(PORT, () => {
	console.log("El servidor esta usando el puerto: ", PORT);
});
