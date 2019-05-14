/* eslint-disable import/named */
import status from '../config/status';
import * as comment from '../queries/comments';

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
    const userId = req.user.id;
    const createdComment = await comment.createComment({
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
    const response = await comment.getAllComments({
      articleSlug
    });
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
    await comment.updateComment({ body: req.body.body }, { id: req.params.commentId });
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
    await comment.deleteComment({ id: req.params.commentId });
    return res.status(status.OK).send({
      message: 'Comment successfully deleted'
    });
  }
}
