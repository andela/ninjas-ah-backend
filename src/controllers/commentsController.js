import createComment from '../queries/comments/createComment';
import oneArticle from '../queries/articles/oneArticle';
import allComments from '../queries/comments/allComments';
import updateComment from '../queries/comments/updateComment';
import deleteComment from '../queries/comments/deleteComments';
/**
 * controller class
 */
class Comment {
  /**
   * Adds two numbers together.
   * @param { object } req the request.
   * @param { object } res The response.
   * @returns { object } the return object.
   */
  static async createComment(req, res) {
    try {
      const userid = 1;
      const article = await oneArticle.getOne({
        id: req.params.id
      });
      if (!article) {
        return res.status(400).send({
          status: 400,
          message: 'That article does not exist'
        });
      }
      const comment = await createComment.create({
        articleId: req.params.id,
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
        message: 'Ooops, something went wrong'
      });
    }
  }

  /**
   * Adds two numbers together.
   * @param { object } req the request.
   * @param { object } res The response.
   * @returns { object } the return object.
   */
  static async getComments(req, res) {
    try {
      const article = await oneArticle.getOne({
        id: req.params.id
      });
      if (!article) {
        return res.status(404).send({
          status: 404,
          message: 'The article does not exist'
        });
      }
      const comment = await allComments.getAll({
        articleId: req.params.id
      });
      if (comment.length === 0) {
        return res.status(400).send({
          status: 404,
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
   * Adds two numbers together.
   * @param { object } req the request.
   * @param { object } res The response.
   * @returns { object } the return object.
   */
  static async editComment(req, res) {
    try {
      const article = await oneArticle.getOne({
        id: req.params.articleId
      });
      if (!article) {
        return res.status(404).send({
          status: 404,
          message: 'The article does not exist'
        });
      }
      const comment = await allComments.getAll({
        id: req.params.commentId
      });

      if (comment.length === 0) {
        return res.status(404).send({
          status: 404,
          message: 'The comment'
        });
      }
      await updateComment.update(
        { body: req.body.text },
        {
          id: req.params.commentId
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
   * Adds two numbers together.
   * @param { object } req the request.
   * @param { object } res The response.
   * @returns { object } the return object.
   */
  static async deleteComment(req, res) {
    try {
      const article = await oneArticle.getOne({
        id: req.params.articleId
      });
      if (!article) {
        return res.status(404).send({
          status: 404,
          message: 'That article does not exist'
        });
      }

      const comment = await allComments.getAll({
        id: req.params.commentId
      });

      if (comment.length === 0) {
        return res.status(404).send({
          status: 404,
          message: 'That comment does not exist'
        });
      }
      await deleteComment.delete({ id: req.params.commentId });
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
