import { Request, Response } from "express";
import { Comment } from "../../entity/Comment";

export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const comment = await Comment.delete(id);

    if (comment.affected === 0) {
      return res
        .status(400)
        .json({ message: "Comment with given ID is not found" });
    }

    res.status(200).json({ message: "comment deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
