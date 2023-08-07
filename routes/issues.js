const express = require("express");
const router = express.Router();
const issuesController = require("../controllers/issuesController");
const auth = require("../middleware/auth");

router.get("/", auth, issuesController.getIssues);
router.post("/", auth, issuesController.createIssue);

module.exports = router;
