import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User";
import jwt from "jsonwebtoken";

export const authGuard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token:string = req.headers["x-access-token"].toString();
    if (!token) {
      return res
        .status(400)
        .json({ message: "You have no token or Your token could expire" });
    }

    jwt.verify(
      token,
      "A little secrets",
      async (err, decoded): Promise<void> => {
        if (!decoded) {
          res.status(400).json({ message: "You are not authenticated" });
        }

        //req.user = decoded
        
        const user = await User.findOneOrFail(decoded.id);
        res.status(200).json({ authentication: true, user: user });
      }
    );
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
