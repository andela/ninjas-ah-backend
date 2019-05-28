/* eslint-disable import/named */
import status from '../config/status';
import * as comment from '../queries/comments';
import * as editcomment from '../queries/comments/edits';

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
    const response = await comment.getAllComments({ articleSlug: req.params.articleSlug });
    return res.status(status.OK).send({
      message: 'Comments fetched successfully',
      Comments: response
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

  /**
   * Edit one comment
   * @param { object } req the request.
   * @param { object } res The response.
   * @returns { object } the return object.
   */
  static async editComment(req, res) {
    const userId = req.user.id;
    const { articleSlug, commentId } = req.params;
    const findComment = await comment.getSingleComment({ articleSlug, id: commentId, userId });
    await editcomment.create({
      articleSlug: findComment.articleSlug,
      userId: findComment.userId,
      body: findComment.body,
      commentId: findComment.id
    });
    await comment.updateComment({ body: req.body.body }, { id: req.params.commentId });

    return res.status(status.OK).send({
      message: 'Comment edited successfully'
    });
  }

  /**
   * Get all edits
   * @param { object } req the request.
   * @param { object } res The response.
   * @returns { object } the return object.
   */
  static async getAllEdit(req, res) {
    const userId = req.user.id;
    const { articleSlug, commentId } = req.params;
    const newComment = { articleSlug, commentId, userId };
    const findComment = await comment.getSingleComment({ articleSlug, id: commentId, userId });
    const findAllEdit = await editcomment.getAll(newComment);
    if (findAllEdit.length === 0) {
      return res.status(status.OK).send({
        message: 'All previous',
        Comments: findComment
      });
    }
    return res.status(status.OK).send({
      message: 'All previous comments',
      Comments: findAllEdit
    });
  }

  /**
   * Delete one edit from comment history.
   * @param { object } req the request.
   * @param { object } res The response.
   * @returns { object } the return object.
   */
  static async remove(req, res) {
    const { id } = req.params;
    let message = 'Comment removed from history successfully';
    const findEdit = await editcomment.getSingle({ id });
    if (!findEdit) {
      message = 'Comment is not in history';
      return res.status(status.NOT_FOUND).json({ error: { message } });
    }
    await editcomment.remove({ id });
    return res.status(status.OK).send({
      message
    });
  }
}
