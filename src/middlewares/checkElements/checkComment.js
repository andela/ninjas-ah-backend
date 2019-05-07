import oneComment from '../../queries/comments/oneComment';
// eslint-disable-next-line valid-jsdoc
/**
 * middleware funnction used in create comment controller to make checknif the article exists
 * @param { object } req the request.
 * @param { object } res The response.
 * @param { function } next  return object
 */
export default async function checkComment(req, res, next) {
  try {
    const comment = await oneComment.getOne({
      id: req.params.id,
      articleId: req.params.articleId
    });
    if (!comment) {
      return res.status(400).send({
        status: 400,
        message: 'The comment does not exist'
      });
    }
    next();
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: 'Ooops, something went wrong'
    });
  }
}
