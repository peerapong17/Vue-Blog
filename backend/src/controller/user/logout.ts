import { Request, Response } from "express";

export const logout = (req: Request, res: Response) => {
  try {
    req.logOut();
    res.status(200).json({ message: "logout success", authenticated: false });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
