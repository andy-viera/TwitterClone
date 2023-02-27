const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const ifIsProfileUser = require("../middlewares/ifIsProfileUser");

router.post("/create-tweet", ensureAuthenticated, tweetController.store);
router.delete(
  "/delete-tweet/:tweetid",
  ensureAuthenticated,
  ifIsProfileUser,
  tweetController.destroy,
);

router.get("/:tweetid/like", ensureAuthenticated, tweetController.like);

module.exports = router;
