/* eslint-disable import/named */
import { create } from '../queries/comments/createComment';
import { getAll } from '../queries/comments/getAllComments';
import { updateElement } from '../queries/comments/updateComment';
import { deleteElement } from '../queries/comments/deleteComments';
/**
 * comment controller class
 */
class Comment {
  /**
   * Create a comment
   * @param { object } req the request.
   * @param { object } res The response.
   * @returns { object } the return object.
   */
  static async createComment(req, res) {
    const userid = 1;
    const comment = await create({
      articleId: req.params.articleId,
      userId: userid,
      body: req.body.body
    });

    return res.status(201).send({
      status: 201,
      message: 'Comment successfully created',
      data: comment
    });
  }

  /**
   * Get all comments.
   * @param { object } req the request.
   * @param { object } res The response.
   * @returns { object } the return object.
   */
  static async getComments(req, res) {
    const comment = await getAll({
      articleId: req.params.articleId
    });
    if (comment.length === 0) {
      return res.status(404).send({
        status: 404,
        message: 'No comments for this article so far'
      });
    }
    return res.status(200).send({
      status: 200,
      message: 'Comments fetched successfully',
      data: comment
    });
  }

  /**
   * Edit one comment
   * @param { object } req the request.
   * @param { object } res The response.
   * @returns { object } the return object.
   */
  static async editComment(req, res) {
    await updateElement(
      { body: req.body.body },
      {
        id: req.params.id
      }
    );
    return res.status(200).send({
      status: 200,
      message: 'Comment edited successfully'
    });
  }

  /**
   * Delete one comment.
   * @param { object } req the request.
   * @param { object } res The response.
   * @returns { object } the return object.
   */
  static async deleteComment(req, res) {
    await deleteElement({ id: req.params.id });
    return res.status(200).send({
      status: 200,
      message: 'Comment successfully deleted'
    });
  }
}

export default Comment;
