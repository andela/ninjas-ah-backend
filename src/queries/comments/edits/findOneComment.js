import * as comment from '../index';

// eslint-disable-next-line max-len
const findOneComment = async (articleSlug, commentId, userId) => comment.getSingleComment({ articleSlug, commentId, userId });
export default findOneComment;
