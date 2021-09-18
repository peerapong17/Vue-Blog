import express from "express";
import * as userController from "../controller/index";

const router = express.Router();

router.get("/logout", userController.logout);

router.get("/", userController.getUser);

router.get("/:id", userController.getSpicificUser);

router.post(
  "/create",
  // [
  //   check("Username", "Username is required").isEmpty(),
  //   check("email", "Please include a valid email").isEmail(),
  //   check(
  //     "password",
  //     "Plese enter a password with 6 or more characters"
  //   ).isLength({ min: 6 }),
  // ],
  userController.createUser
);

router.post("/forget-password", userController.forgetPassword);

router.post("/login", userController.loginUser);

export default router;
