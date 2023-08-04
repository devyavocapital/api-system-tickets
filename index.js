const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/v1/login", require("./routes/login"));
app.use("/api/v1/create", require("./routes/createUser"));

app.listen(PORT, () => {
	console.log("El servidor esta usando el puerto: ", PORT);
});
