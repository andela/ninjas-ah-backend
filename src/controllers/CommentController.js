/* eslint-disable import/named */
import status from '../config/status';
import create from '../queries/comments/createComment';
import getAll from '../queries/comments/getAllComments';
import deleteElement from '../queries/comments/deleteComment';
import db from '../models';
/**
 * comment controller class
 */
export default class CommentController {
  /**
   * Create a comment
   * @param { object } req the request.
   * @param { object } res The response.
   * @returns { object } the return object.
   */
  static async create(req, res) {
    const userId = req.userId || req.body.userId || req.params.userId || null;
    const createdComment = await create({
      articleSlug: req.params.articleSlug,
      userId,
      body: req.body.body
    });

    return res.status(status.CREATED).send({
      message: 'Comment successfully created',
      comment: createdComment
    });
  }

  /**
   * Get all comments.
   * @param { object } req the request.
   * @param { object } res The response.
   * @returns { object } the return object.
   */
  static async getAll(req, res) {
    const { articleSlug } = req.params;
    const response = await getAll({
      articleSlug
    });
    if (response && response.length === 0) {
      return res.status(status.NOT_FOUND).send({
        message: 'No comments for this article so far'
      });
    }
    return res.status(status.OK).send({
      message: 'Comments fetched successfully',
      comment: response
    });
  }

  /**
   * Edit one comment
   * @param { object } req the request.
   * @param { object } res The response.
   * @returns { object } the return object.
   */
  static async edit(req, res) {
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
   * Delete one comment.
   * @param { object } req the request.
   * @param { object } res The response.
   * @returns { object } the return object.
   */
  static async delete(req, res) {
    await deleteElement({ id: req.params.id });
    return res.status(status.OK).send({
      message: 'Comment successfully deleted'
    });
  }
}
