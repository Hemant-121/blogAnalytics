const express = require("express");
const router = express.Router();
const { getBlogData, searchData } = require("../controllers/blogControllers")

router.route("/blog-stats").get(getBlogData);

router.route("/blog-search").get(searchData);


module.exports = router;