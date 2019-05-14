import * as comment from '.';
import * as likes from './likes';

export default async (req) => {
  const { commentId, articleSlug } = req.params;
  const findAllLikes = await likes.getAllLikes({ commentId, articleSlug });
  await comment.updateComment({ likes: findAllLikes.length }, { id: commentId });
};
