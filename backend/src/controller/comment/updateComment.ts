import { Comment } from "./../../entity/Comment";
import { Request, Response } from "express";

export const updateComment = async (req: Request, res: Response) => {
  const { comment_id } = req.params;
  const { comment } = req.body as { comment: string };
  try {
    const updatedComment = await Comment.update(
      { id: comment_id },
      { comment }
    );

    if (updatedComment.affected === 0) {
      return res.status(404).json({ message: "No comment found" });
    }

    res.status(200).json({ message: "Comment updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
