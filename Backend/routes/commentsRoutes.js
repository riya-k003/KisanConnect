const express = require('express');
const router = express.Router();

const {createComment , getComments} = require("../controllers/commentsController.js");

router.post("/:tip_id/comments" , createComment);
router.get("/:tip_id/comments" , getComments);
console.log("hit");

module.exports = router;