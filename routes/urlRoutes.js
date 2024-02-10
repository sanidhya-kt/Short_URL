const express = require("express");
const { generateShortUrl ,redirectToUrl,getAnalytics} = require("../controller/urlController");
const router = express.Router();

router.post("/url", generateShortUrl);
router.get("/:shortId", redirectToUrl);
router.get("/analytics/:shortId", getAnalytics)
module.exports = router;