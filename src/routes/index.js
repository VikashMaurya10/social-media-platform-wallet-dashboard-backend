const express = require("express");
const router = express.Router();
const VerifyToken = require("../middlewares/");

router.use("/v1/auth", require("./auth"));

// verified route
router.use(VerifyToken);
router.use("/dashboard", require("./dashboard"));

module.exports = router;

