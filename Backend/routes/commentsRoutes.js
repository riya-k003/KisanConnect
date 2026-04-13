const express = require('express');
const router = express.Router();

const {createComment , getComments} = require("../controllers/commentsController.js");
const {verifyToken} = require("../middleware/authmiddleware");

router.post("/:tip_id/comments" , verifyToken , createComment);
router.get("/:tip_id/comments" , getComments);
console.log("hit");

module.exports = router;