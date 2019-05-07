import createComment from '../queries/comments/createComment';
import allComments from '../queries/comments/allComments';
import updateComment from '../queries/comments/updateComment';
import deleteComment from '../queries/comments/deleteComments';
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
    try {
      const userid = 1;
      const comment = await createComment.create({
        articleId: req.params.articleId,
        userId: userid,
        body: req.body.body
      });

      return res.status(201).send({
        status: 201,
        message: 'Comment successfully created',
        data: comment
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        error,
        message: 'Ooops, something went wrong'
      });
    }
  }

  /**
   * Get all comments.
   * @param { object } req the request.
   * @param { object } res The response.
   * @returns { object } the return object.
   */
  static async getComments(req, res) {
    try {
      const comment = await allComments.getAll({
        articleId: req.params.articleId
      });
      if (comment.length === 0) {
        return res.status(400).send({
          status: 400,
          message: 'No comments for this article so far'
        });
      }
      return res.status(200).send({
        status: 200,
        message: 'Comments fetched successfully',
        data: comment
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
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
  static async editComment(req, res) {
    try {
      await updateComment.update(
        { body: req.body.body },
        {
          id: req.params.id
        }
      );
      return res.status(200).send({
        status: 200,
        message: 'Comment edited successfully'
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: 'Ooops, something went wrong'
      });
    }
  }

  /**
   * Delete one comment.
   * @param { object } req the request.
   * @param { object } res The response.
   * @returns { object } the return object.
   */
  static async deleteComment(req, res) {
    try {
      await deleteComment.delete({ id: req.params.id });
      return res.status(200).send({
        status: 200,
        message: 'Comment successfully deleted'
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: 'Ooops, something went wrong'
      });
    }
  }
}

export default Comment;
