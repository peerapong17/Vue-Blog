import { Request, Response } from "express";
import { User } from "../../entity/User";

export const getSpicificUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findOneOrFail(id);
    if (!user) {
      return res
        .status(400)
        .json({ message: "No user was found with this ID" });
    }
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
