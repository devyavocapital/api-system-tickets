const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { fnSequelize } = require("../db/config");

const multer = require("multer");
const path = require("path");

const dir = path.join(__dirname, "images");
router.use(express.static(dir));

router.get("/uploads/:img", function (req, res) {
	console.log(dir);
	const img = req.params.img;
	const pFinal = dir.replace("routes\\", "");
	res.sendFile(`${pFinal}/${img}`);
});

//routes uploadFile
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "images/");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

router.post("/uploads", auth, upload.single("file"), function (req, res) {
	res.json({ msg: "imagen ok" });
});

module.exports = router;
