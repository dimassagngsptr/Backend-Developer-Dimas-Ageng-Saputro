const express = require("express");
const { borrowController } = require("../controllers");
const verifyMember = require("../middleware/jwt");
const router = express.Router();

router.post("/", verifyMember, borrowController.borrowBook);
router.patch("/:bookCode", verifyMember, borrowController.returnBook);

module.exports = router;
