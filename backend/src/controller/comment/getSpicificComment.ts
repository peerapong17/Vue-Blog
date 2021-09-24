import { Request, Response } from "express";
import { Comment } from "../../entity/Comment";

export const getSpicificComment = async (req: Request, res: Response) => {
  const { comment_id } = req.params;
  try {
    const comment = await Comment.findOne(comment_id);
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
