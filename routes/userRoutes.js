const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/register", userController.register);
router.post("/register", userController.store);

router.get("/followers/:id", userController.showFollowers);
router.get("/following/:id", userController.showFollowing);

// router.get("/", userController.index);
// router.get("/crear", userController.create);
// router.get("/:id", userController.show);
// router.get("/editar/:id", userController.edit);
// router.patch("/:id", userController.update);
// router.delete("/:id", userController.destroy);

module.exports = router;
