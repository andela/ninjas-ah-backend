/* eslint-disable import/named */
import status from '../config/status';
import { create } from '../queries/comments/createComment';
import { getAll } from '../queries/comments/getAllComments';
import { updateElement } from '../queries/comments/updateComment';
import { deleteElement } from '../queries/comments/deleteComment';
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
    try {
      const userId = req.userId || req.body.userId || req.params.userId || null;
      const comment = await create({
        articleId: req.params.articleId,
        userId,
        body: req.body.body
      });

      return res.status(status.CREATED).send({
        status: status.CREATED,
        message: 'Comment successfully created',
        data: comment
      });
    } catch (error) {
      return res.status(status.SERVER_ERROR).send({
        status: status.SERVER_ERROR,
        message: 'Ooops, something went wrong',
        error
      });
    }
  }

  /**
   * Get all comments.
   * @param { object } req the request.
   * @param { object } res The response.
   * @returns { object } the return object.
   */
  static async getAll(req, res) {
    try {
      const comment = await getAll({
        articleId: req.params.articleId
      });
      if (comment.length === 0) {
        return res.status(status.NOT_FOUND).send({
          status: status.NOT_FOUND,
          message: 'No comments for this article so far'
        });
      }
      return res.status(status.OK).send({
        status: status.OK,
        message: 'Comments fetched successfully',
        data: comment
      });
    } catch (error) {
      return res.status(status.SERVER_ERROR).send({
        status: status.SERVER_ERROR,
        message: 'Ooops, something went wrong'
      });
    }
  }

  /**
   * Edit one comment
   * @param { object } req the request.
   * @param { object } res The response.
   * @returns { object } the return object.
   */
  static async edit(req, res) {
    await updateElement(
      { body: req.body.body },
      {
        id: req.params.id
      }
    );
    return res.status(status.OK).send({
      status: status.OK,
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
      status: status.OK,
      message: 'Comment successfully deleted'
    });
  }
}
