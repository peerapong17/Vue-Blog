import { Request, Response } from "express";
import { User } from "../../entity/User";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  // const errors = validationResult(req);
  // console.log(errors)
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  const { username, email, password } = req.body as {
    username: string;
    email: string;
    password: string;
  };
  try {
    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "This Email already exist", available: false });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Create user failed", available: false });
      }
      const user = User.create({
        username,
        email,
        password: hash,
      });
      await user.save();
      res
        .status(200)
        .json({ message: "User created successfully", user: user });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
