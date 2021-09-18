import { Token } from "../../entity/Token";
import { User } from "../../entity/User";
import bcrypt from "bcrypt";

export const enterNewPassword = async (req, res) => {
  const { token } = req.params as { token: string };
  const { userId } = req.params as { userId: string };
  const { password } = req.body as { password: string };
  console.log(token, userId, password)
  try {
    const user = await User.findOne(userId);
    if (!user)
      return res
        .status(400)
        .json({ message: "Invalid link or Token has expired" });

    console.log(user);

    const tokenResetPassword = await Token.findOne({
      userId: user.id,
      token: token,
    });
    if (!tokenResetPassword)
      return res
        .status(400)
        .json({ message: "Invalid link or Token has expired" });

    console.log(tokenResetPassword);

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();
    await Token.delete(tokenResetPassword.id);

    res.status(200).json({ message: "password reset sucessfully" });
  } catch (error) {
    res.status(400).json({ message: "password change failed" });
  }
};
