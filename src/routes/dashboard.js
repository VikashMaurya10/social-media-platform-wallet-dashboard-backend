const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");

// API route is:  /dashboard/
router.post("/:id", userControllers.getAllData);
router.put("/update/:id", userControllers.updateWallet);

module.exports = router;
