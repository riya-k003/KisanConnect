const express = require("express");
const router = express.Router();
const {askKisanAI} = require("../controllers/kisanAi.controller");

router.post("/ask" , askKisanAI);

module.exports = router;