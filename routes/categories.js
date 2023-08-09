const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");
const auth = require("../middleware/auth");

router.get("/", auth, categoriesController.getCategories);
router.post("/", auth, categoriesController.createCategory);
router.put("/", auth, categoriesController.updateCategory);

module.exports = router;
