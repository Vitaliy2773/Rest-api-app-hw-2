const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userControllers");
const auth = require("../../middleware/auth");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", auth, userController.logout);
router.get("/current", auth, userController.getCurrentUser);
router.patch("/subscription", auth, userController.updateSubscription);

module.exports = router;
