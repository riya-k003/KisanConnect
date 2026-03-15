console.log("Tips Routes Loaded");
const express = require("express");
const router = express.Router()

const {createTip , viewTips} = require("../controllers/tipsController");

const {verifyToken} = require("../middleware/authmiddleware");
const {isFarmer} = require("../middleware/rolemiddleware");


router.post("/" , verifyToken , isFarmer , createTip);
router.get("/" , viewTips);

module.exports = router;