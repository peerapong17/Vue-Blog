import { Request, Response } from "express";
import { User } from "../../entity/User";

export const forgetPassword = async (req: Request, res: Response) => {
  const { email } = req.body as {
    email: string;
  };
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email given is not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
