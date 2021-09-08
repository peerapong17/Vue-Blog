import { Request, Response } from "express";
import { Comment } from "../../entity/Comment";
import { Blog } from "../../entity/Blog";

export const addComment = async (req: Request, res: Response) => {
  const { blog_id } = req.params;
  try {
    const comment = new Comment();
    const blog = await Blog.findOne(blog_id, { relations: ["comments"] });

    if (!blog) {
      return res
        .status(400)
        .json({ message: "Blog with given ID is not found" });
    }

    comment.userId = req.user["id"];

    comment.comment = req.body.comment as string;

    blog.comments.unshift(comment);

    await comment.save();

    await blog.save();

    res.status(200).json({ message: "Comment added successfully", blog });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
