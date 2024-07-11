const express = require("express");
const bookRoutes = require("./bookRoutes");
const memberRoutes = require("./memberRoutes");
const borrowRoutes = require("./borrowRoutes");
const router = express.Router();

router.use("/books", bookRoutes);
router.use("/members", memberRoutes);
router.use("/borrows", borrowRoutes);

module.exports = router;
