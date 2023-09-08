const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");
const auth = require("../middleware/auth");

router.get("/", auth, commentsController.getComments);
router.post("/", auth, commentsController.createComment);

module.exports = router;
