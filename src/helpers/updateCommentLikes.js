import * as comment from '../queries/comments';

export default async (req) => {
  const { commentId, articleSlug } = req.params;
  const findAllLikes = await comment.getAllLikes({ commentId, articleSlug });
  await comment.updateComment({ likes: findAllLikes.length }, { id: commentId });
};
