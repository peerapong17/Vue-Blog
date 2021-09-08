import { Request, Response } from "express";
import { Blog } from "../../entity/Blog";

export const addLike = async (req: Request, res: Response) => {
  const { blog_id } = req.params;
  try {
    const blog = await Blog.findOne(blog_id, {relations: ['comments']});

    if (!blog) {
      return res.status(400).json({ message: "No blog was found" });
    }

    const isliked = blog.like.find((item) => item === req.user["id"]);


    if (isliked) {
      const index = blog.like.map((item) => item).indexOf(req.user["id"]);
      blog.like.splice(index, 1);
      // blog.like = blog.like.filter(item=> item !== req.user['id'])
      await blog.save();
      return res.status(200).json({ blog });
    }

    blog.like.push(req.user["id"]);

    await blog.save();


    res.status(200).json({ blog });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
