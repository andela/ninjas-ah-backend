import commentQueries from '../models/queries/commentQueries';
import ArticleQueries from '../models/queries/articleQueries';

// eslint-disable-next-line require-jsdoc
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
      const article = await ArticleQueries.oneArticle({
        id: req.params.id
      });
      if (!article) {
        return res.status(404).send({
          status: 404,
          message: 'That article does not exist'
        });
      }
      const comment = await commentQueries.createComment({
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
      const article = await ArticleQueries.oneArticle({
        id: req.params.id
      });
      if (!article) {
        return res.status(404).send({
          status: 404,
          message: 'The article does not exist'
        });
      }
      const comment = await commentQueries.allComments({
        articleId: req.params.id
      });
      if (comment.length === 0) {
        return res.status(404).send({
          status: 404,
          message: 'No comments for this article so far'
        });
      }
      return res.status(200).send({
        status: 200,
        message: 'Message fetched successfully',
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
      const article = await ArticleQueries.oneArticle({
        id: req.params.articleId
      });
      if (!article) {
        return res.status(404).send({
          status: 404,
          message: 'The article does not exist'
        });
      }
      const comment = await commentQueries.allComments({
        id: req.params.commentId
      });

      if (comment.length === 0) {
        return res.status(404).send({
          status: 404,
          message: 'No comments for this article so far'
        });
      }
      await commentQueries.updateComment(
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
      const article = await ArticleQueries.oneArticle({
        id: req.params.articleId
      });
      if (!article) {
        return res.status(404).send({
          status: 404,
          message: 'That article does not exist'
        });
      }

      const comment = await commentQueries.allComments({
        id: req.params.commentId
      });

      if (comment.length === 0) {
        return res.status(404).send({
          status: 404,
          message: 'That comment does not exist'
        });
      }
      await commentQueries.deleteComment({ id: req.params.commentId });
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
