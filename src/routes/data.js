const express = require("express");
const router = express.Router();
const dataController = require("../controller/data.js")
router.put("/", dataController.uploadData)

module.exports = router