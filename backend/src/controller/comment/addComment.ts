import { User } from "./../../entity/User";
import { Request, Response } from "express";
import { Comment } from "../../entity/Comment";
import { Blog } from "../../entity/Blog";

export const addComment = async (req: Request, res: Response) => {
  const { blog_id } = req.params;
  try {
    console.log(blog_id);
    console.log(req.user["id"]);
    const comment = new Comment();
    const blog = await Blog.findOne(blog_id, { relations: ["comments"] });
    const user = await User.findOne(req.user["id"]);

    if (!blog) {
      return res
        .status(400)
        .json({ message: "Blog with given ID is not found" });
    }

    comment.user_id = user.id;
    comment.username = user.username;
    comment.comment = req.body.comment as string;

    await comment.save();

    blog.comments.unshift(comment);

    await blog.save();

    res.status(200).json({ message: "Comment added successfully", blog });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
