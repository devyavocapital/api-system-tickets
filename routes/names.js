const express = require("express");
const router = express.Router();
const namesController = require("../controllers/namesController");
const auth = require("../middleware/auth");

router.get("/", auth, namesController.getNames);

module.exports = router;
