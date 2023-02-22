const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.showHome);

router.get("*", function (req, res) {
  res.status(404).render("pages/404");
});

module.exports = router;
