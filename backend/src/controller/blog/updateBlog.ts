import fs from "fs";
import { Request, Response } from "express";
import { Blog } from "../../entity/Blog";

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    if (req.file) {
      const blogToUpdate = await Blog.findOne(id);
      if (!blogToUpdate) {
        return res.status(404).json({ message: "No blog was found" });
      }

      const filePath: string = process.cwd() + "/images/" + blogToUpdate.image;
      fs.unlinkSync(filePath);

      const image = req.file.filename;

      const imagePath: string =
        req.protocol + "://" + req.get("host") + "/images/" + image;

      const blog = await Blog.update({ id }, { ...req.body, imagePath, image });

      if (blog.affected === 0) {
        return res.status(404).json({ message: "No blog was found" });
      }
    }

    const blog = await Blog.update({ id }, { ...req.body });

    if (blog.affected === 0) {
      return res.status(404).json({ message: "No blog was found" });
    }

    res.status(200).json({ message: "blog updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
