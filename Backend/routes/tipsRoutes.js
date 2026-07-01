console.log("Tips Routes Loaded");
const express = require("express");
const router = express.Router()

const {createTip , viewTips, togglelike , deleteTip} = require("../controllers/tipsController");

const {verifyToken} = require("../middleware/authmiddleware");
const {isFarmer} = require("../middleware/rolemiddleware");
const upload = require("../config/multer");


router.post("/" , verifyToken , isFarmer , upload.single("image") , createTip);
router.get("/"  , verifyToken, viewTips );
router.delete("/:tip_id" , verifyToken , isFarmer , deleteTip);
router.post("/:tip_id/like" , verifyToken , togglelike);

module.exports = router;