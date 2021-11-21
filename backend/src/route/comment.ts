import express from "express";
import passport from "passport";
import * as commentController from "../controller";

const router = express.Router();

router.get(
  "/like/:blog_id",
  passport.authenticate("jwt", { session: false }),
  commentController.addLike
);

// router.get(
//   "/:comment_id",
//   passport.authenticate("jwt", { session: false }),
//   commentController.getSpicificComment
// );

router.get(
  "/:blog_id",
  passport.authenticate("jwt", { session: false }),
  commentController.getSpicificComment
);

router.post(
  "/:blog_id",
  passport.authenticate("jwt", { session: false }),
  commentController.addComment
);

router.put(
  "/update/:comment_id",
  passport.authenticate("jwt", { session: false }),
  commentController.updateComment
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  commentController.deleteComment
);

export default router;
