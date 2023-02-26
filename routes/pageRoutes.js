const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");
const userController = require("../controllers/userController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const makeUserAvailableInViews = require("../middlewares/makeUserAvailableInViews");

router.use(makeUserAvailableInViews);

router.get("/", ensureAuthenticated, pageController.showHome);
router.get("/profile/:username", ensureAuthenticated, pageController.showProfile);

router.get("/profile/:username/followers", ensureAuthenticated, userController.showFollowers);
router.get("/profile/:username/following", ensureAuthenticated, userController.showFollowing);

router.get("*", function (req, res) {
  res.status(404).render("pages/404");
});

module.exports = router;
