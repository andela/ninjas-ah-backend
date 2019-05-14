import statusCode from '../config/status';
import * as comment from '../queries/comments/likes';
import updateCommentLikes from '../queries/comments/updateCommentLikes';

const checkArticleLike = async (req, res, next) => {
  const userId = req.user.id;
  const { commentId, articleSlug } = req.params;
  const like = { userId, commentId, articleSlug };
  const message = 'You deleted your reaction';
  const findLike = await comment.getSingleLike(like);

  if (!findLike) {
    next();
    return true;
  }
  await comment.deleteLike(like);
  updateCommentLikes(req);
  res.status(statusCode.OK).json({
    errors: { message }
  });
};
export default checkArticleLike;
