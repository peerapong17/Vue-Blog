import express from "express";
import multer from "multer";
import passport from "passport";
import path from "path";
import * as blogController from "../controller";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "/images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = file.mimetype.split("/")[1];
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
  },
});

const upload = multer({ storage: storage }).single("image")

router.get(
  "/user-blogs",
  passport.authenticate("jwt", { session: false }),
  blogController.getUserBlogs
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  blogController.getBlog
);

router.get(
  "/category/:category",
  passport.authenticate("jwt", { session: false }),
  blogController.getBlogByCategory
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  blogController.getSpicificBlog
);

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  upload,
  blogController.createBlog
);

router.put(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  upload,
  blogController.updateBlog
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  blogController.deleteBlog
);

export default router;
