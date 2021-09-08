import { Request, Response } from "express";
import { Blog } from "../../entity/Blog";

export const createBlog = async (req: Request, res: Response) => {
  const { title, content, category } = req.body as {
    title: string;
    content: string;
    category: string;
  };
  // const imagePath1 = "http://localhost:3000/images/" + req.file.filename;
  const imagePath: string =
    req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;

  try {
    const blog = Blog.create({
      title,
      content,
      category,
      image: req.file.filename,
      imagePath,
      userId: req.user["id"],
    });
    await blog.save();
    res.status(200).json({ message: "blog created successfully", blog: blog });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
