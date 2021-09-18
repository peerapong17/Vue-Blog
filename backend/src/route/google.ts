import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/", passport.authenticate("google", { scope: ["profile"] }));


// router.get(
//   "/callBack",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   (req, res) => {
//     res.redirect("http://localhost:8000/home");
//   }
// );

export default router;
