import { Blog } from "../../entity/Blog";
import { Request, Response } from "express";

export const getBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.find()
    res.status(200).json({ blog: blog });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
