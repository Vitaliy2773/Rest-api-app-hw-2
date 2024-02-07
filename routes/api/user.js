const express = require("express");
const multer = require("multer");
const router = express.Router();
const userController = require("../../controllers/userControllers");
const auth = require("../../middleware/auth");
const upload = multer({ dest: "tmp/" });

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", auth, userController.logout);
router.get("/current", auth, userController.getCurrentUser);
router.patch("/subscription", auth, userController.updateSubscription);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  userController.updateAvatar
);
router.post("/verify", userController.resendVerificationEmail);
router.get("/verify/:verificationToken", userController.verifyEmail);

module.exports = router;
