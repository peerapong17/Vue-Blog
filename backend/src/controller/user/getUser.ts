import { Request, Response } from "express";
import { User } from "../../entity/User";

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.find();
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
