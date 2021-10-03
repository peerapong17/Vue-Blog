import { Request, Response } from "express";
import { Blog } from "../../entity/Blog";

export const getBlogByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;
  console.log(category)
  try {
    const blogs = await Blog.find({category});
    if (!blogs) {
      return res
        .status(404)
        .json({ message: "Blog with given category does not exist" });
    }
    res.status(200).json({ blogs: blogs });
  } catch (error) {
    res.status(400).json({ message: error.message});
  }
};
