import status from '../config/status';
import db from '../models';
import getSingleComment from '../queries/comments/getSingleComment';

/**
 * A class to control the comments' edit
 */
export default class CommentEditController {
  // eslint-disable-next-line valid-jsdoc
  /**
   *
   * @param {object} req
   * @param {object} res
   */
  static async edit(req, res) {
    const userId = req.userId || req.body.userId || req.params.userId || null;
    const condition = {
      id: req.params.id,
      articleSlug: req.params.articleSlug
    };
    const comment = await getSingleComment(condition);

    await db.CommentEdit.create({
      userId,
      articleSlug: req.params.articleSlug,
      body: comment.body,
      commentId: comment.id
    });
    await db.Comment.update(
      { body: req.body.body },
      {
        where: { id: req.params.id }
      }
    );
    return res.status(status.OK).send({
      message: 'Comment edited successfully'
    });
  }

  /**
   * Create a comment
   * @param { object } req the request.
   * @param { object } res The response.
   * @returns { object } the return object.
   */
  static async getAll(req, res) {
    const userId = req.userId || req.body.userId || req.params.userId || null;
    const response = await db.CommentEdit.findAll({
      where: {
        articleSlug: req.params.articleSlug,
        commentId: req.params.id,
        userId
      }
    });
    const response2 = await db.Comment.findOne({
      where: {
        articleSlug: req.params.articleSlug,
        id: req.params.id,
        userId
      }
    });
    if (response.length === 0) {
      return res.status(status.OK).send({
        Comment: response2
      });
    }
    return res.status(status.OK).send({
      message: 'Comments fetched successfully',
      comment: response
    });
  }
}
