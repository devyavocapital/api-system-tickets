const express = require("express");
const router = express.Router();
const notificationsController = require("../controllers/notificationsController");
const auth = require("../middleware/auth");

router.get("/", auth, notificationsController.getNotifications);
router.post("/", auth, notificationsController.createNotification);
router.put("/", auth, notificationsController.updateNotification);

module.exports = router;
