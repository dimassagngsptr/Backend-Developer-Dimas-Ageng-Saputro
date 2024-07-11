const express = require("express");
const { memberController } = require("../controllers");
const verifyMember = require("../middleware/jwt");
const router = express.Router();

router.get("/", memberController.getAllMembers);
router.post("/auth/register", memberController.registerMember);
router.post("/auth/login", memberController.loginMember);
router.get("/detail", verifyMember, memberController.getDetailMember);

module.exports = router;
