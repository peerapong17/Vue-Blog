import { Request, Response } from "express";
import { Comment } from "../../entity/Comment";

export const getSpicificComment = async (req: Request, res: Response) => {
  const { blog_id } = req.params as { blog_id: string };
  try {
    console.log(blog_id)
    const comment = await Comment.find({
      where: {
        blog_id: blog_id,
      },
      relations: ["blog"],
    });

    if (!comment) {
      return res
        .status(404)
        .json({ message: "comment with given Id does not exist" });
    }
    res.status(200).json({ comment: comment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
