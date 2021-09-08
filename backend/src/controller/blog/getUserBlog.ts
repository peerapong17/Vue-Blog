import { Request, Response } from "express";
import { Blog } from "../../entity/Blog";

export const getUserBlogs = async (req: Request, res: Response) => {
  try {
    const id: string = req.user["id"];
    const blog = await Blog.find({ userId: id });

    if(!blog){
      return res.status(404).json({message: "No blog with giver Id was found"})
    }

    res.status(200).json({ blog: blog });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
