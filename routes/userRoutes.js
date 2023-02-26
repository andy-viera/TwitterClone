const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/register", userController.register);
router.post("/register", userController.store);

router.get("/:tweetid/like", userController.like);
router.get("/:userid/follow", userController.follow);

module.exports = router;
