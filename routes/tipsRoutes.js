console.log("Tips Routes Loaded");
const express = require("express");
const router = express.Router()

const {createTip} = require("../controllers/tipsController");

const {verifyToken} = require("../middleware/authmiddleware");
const {isFarmer} = require("../middleware/rolemiddleware");

router.post("/create" , verifyToken , isFarmer , createTip);

module.exports = router;