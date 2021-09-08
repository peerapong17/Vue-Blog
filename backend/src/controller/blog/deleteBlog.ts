import { Request, Response } from "express";
import { Blog } from "../../entity/Blog";
import fs from "fs";

export const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const blogToDelete = await Blog.findOne(id);
    const blog = await Blog.delete(id);
    if (blog.affected === 0) {
      return res
        .status(400)
        .json({ message: "No user with this ID was found" });
    }

    const filePath: string = process.cwd() + "/images/" + blogToDelete.image;
    fs.unlinkSync(filePath);
    res.status(200).json({ message: "blog deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
