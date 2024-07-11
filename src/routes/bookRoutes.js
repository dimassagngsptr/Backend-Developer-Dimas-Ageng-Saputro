const express = require("express");
const { bookController } = require("../controllers");
const router = express.Router();

router.get("/", bookController.getAllBooks);
router.post("/", bookController.addBooks);
router.get("/detail/:code", bookController.getDetailBook);

module.exports = router;
