import { User } from "./../../entity/User";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("local", function (err, user: User, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      const token: string = jwt.sign({ id: user.id }, "A little secrets", {
        expiresIn: 60 * 60,
      });
      res.status(200).json({
        authenticated: true,
        accessToken: token,
        user: { id: user.id, username: user.username },
      });
    });
  })(req, res, next);
};
