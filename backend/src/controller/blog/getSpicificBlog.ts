import { Request, Response } from "express";
import { Blog } from "../../entity/Blog";

export const getSpicificBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findOne(id, {relations: ['comments']});
    if (!blog) {
      return res
        .status(404)
        .json({ message: "Blog with given Id does not exist" });
    }
    res.status(200).json({ blog: blog });
  } catch (error) {
    res.status(400).json({ message: error.message});
  }
};
