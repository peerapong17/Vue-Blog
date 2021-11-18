import { Request, Response } from "express";
import { Blog } from "../../entity/Blog";
import { User } from "../../entity/User";

export const createBlog = async (req: Request, res: Response) => {
  const { title, content, category } = req.body as {
    title: string;
    content: string;
    category: string;
  };
  // const imagePath1 = "http://localhost:3000/images/" + req.file.filename;
  const imagePath: string =
    req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;

  const user = await User.findOne(req.user["id"], { relations: ["blogs"] });

  try {
    const blog = Blog.create({
      title,
      content,
      category,
      image: req.file.filename,
      like: [],
      imagePath,
    });
    await blog.save();

    user.blogs.push(blog);

    await user.save();

    res.status(200).json({ message: "blog created successfully", blog: blog });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
