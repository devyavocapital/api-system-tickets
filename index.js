const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

const socketIO = require("socket.io")(http, {
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

app.use("/api/v1/login", require("./routes/login"));
app.use("/api/v1/create", require("./routes/createUser"));
app.use("/api/v1/issues", require("./routes/issues"));
app.use("/api/v1/comments", require("./routes/comments"));
app.use("/api/v1/names", require("./routes/names"));
app.use("/api/v1/categories", require("./routes/categories"));
app.use("/api/v1/notifications", require("./routes/notifications"));

http.listen(PORT, () => {
	console.log("El servidor esta usando el puerto: ", PORT);
});
