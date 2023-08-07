const express = require("express");
const router = express.Router();
const loginController = require("../controllers/LoginController");
const auth = require("../middleware/auth");

router.post("/", loginController.authUser);
router.get("/", auth, loginController.userAuthenticate);

module.exports = router;
