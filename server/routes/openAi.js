const express = require("express");
const {
    summaryController,
    paragraphController,
    chatbotController,
    jsconverterController,
    scifiImageController,
} = require("../controllers/openAi");
const { authenticateToken } = require('../middleware/auth')

const router = express.Router();

//route
router.post("/summary", authenticateToken, summaryController);
router.post("/paragraph", paragraphController);
router.post("/chatbot", chatbotController);
router.post("/js-converter", jsconverterController);
router.post("/scifi-image", scifiImageController);

module.exports = router;
