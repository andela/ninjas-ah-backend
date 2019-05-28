import * as article from '../queries/articles/likes';
import statusCode from '../config/status';
import updateArticleLikes from '../queries/articles/updateArticleLikes';

const checkArticleLike = async (req, res, next) => {
  const userId = req.user.id;
  const { articleSlug } = req.params;
  const like = { userId, articleSlug };
  let message = 'You deleted your reaction';
  const findLike = await article.getSingleLike(like);

  if (!findLike) {
    next();
    return true;
  }
  if (req.params.status === 'like' && findLike.status === 'dislike') {
    await article.updateLike({ status: req.params.status }, like);

    await updateArticleLikes(req);
    return res.status(statusCode.OK).json({ message: { message: 'You liked the article' } });
  }
  if (req.params.status === 'dislike' && findLike.status === 'like') {
    await article.updateLike({ status: req.params.status }, like);
    await updateArticleLikes(req);
    message = 'You disliked the article';
    return res.status(statusCode.OK).json({ message: { message } });
  }
  await article.deleteLike(like);
  await updateArticleLikes(req);
  return res.status(statusCode.OK).json({
    errors: { message }
  });
};
export default checkArticleLike;
