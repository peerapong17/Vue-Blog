import { Session } from "express-session";
import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const userId: Session = req.session.passport.user;

    const token: string = jwt.sign({ id: userId }, "A little secrets", {
      expiresIn: 60 * 60,
    });

    res.redirect(`http://localhost:8080/home/${token}/${userId}`);
  }
);

export default router;
