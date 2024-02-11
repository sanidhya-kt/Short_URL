const express = require("express")
const path = require("path");
const URL = require("../models/urlModel");
const router = express.Router()

router.get('/', async(req, res)=>{
    const allURL = await URL.find({});
    res.render("home", {
        urls: allURL,
    });
})

module.exports = router;