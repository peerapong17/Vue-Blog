import * as crypto from "crypto";
import { User } from "../../entity/User";
import { Token } from "../../entity/Token";
import { Request, Response } from "express";
import { sendEmail } from "../../utils/sendEmail";

export const enterEmail = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(400)
        .json({ message: "User with given email doesn't exist" });

    let token = await Token.findOne({ userId: user.id });
    if (!token) {
      token = await Token.create({
        userId: user.id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }

    const link = `http://localhost:8080/reset-password/enter-new-password/${user.id}/${token.token}`;

    await sendEmail(
      req.body.email,
      "Reset Password",
      link
    );

    res.status(200).json({
      message: "Password reset link is sent to your email account",
    });
  } catch (error) {
    res.status(400).json({
      message: "An error occured",
    });
  }
};
