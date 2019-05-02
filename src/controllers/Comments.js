import db from '../models';

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
      const user_id = 1;
      const article = await db.Article.findOne({
        where: {
          id: req.params.id
        }
      });
      if (!article) {
        return res.status(400).send({
          status: 400,
          message: 'The article does not exist'
        });
      }
      const comment = await db.Comment.create({
        articleId: req.params.id,
        userId: user_id,
        body: req.body.body
      });

      return res.status(200).send({
        status: 200,
        message: 'Comment successfully created',
        data: comment
      });
    } catch (error) {
      console.log(error);
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

  static async getAllComments(req, res) {
    try {
      const comment = await db.Comment.findAll({
        where: {
          articleId: req.params.id
        }
      });
      if (comment.length === 0) {
        return res.status(203).send({
          status: 203,
          message: 'No comments for this article so far'
        });
      }
      return res.status(203).send({
        status: 203,
        message: 'Message fetched successfully',
        data: comment
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: 500,
        message: 'Ooops, something went wrong'
      });
    }
  }

  static async editComment(req, res) {
    try {
      const comment = await db.Comment.findAll({
        where: {
          id: req.params.id
        }
      });

      if (comment.length === 0) {
        return res.status(203).send({
          status: 203,
          message: 'No comments for this article so far'
        });
      }
      const newComment = await db.Comment.update(
        {
          body: req.body.text
        },
        {
          where: {
            id: req.params.id
          }
        }
      );
      return res.status(200).send({
        status: 200,
        message: 'Comment edited successfully'
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: 500,
        message: 'Ooops, something went wrong'
      });
    }
  }
  static async deleteComment(req, res) {
    try {
      const comment = await db.Comment.findAll({
        where: {
          id: req.params.id
        }
      });

      if (comment.length === 0) {
        return res.status(203).send({
          status: 203,
          message: 'No comments for this article so far'
        });
      }
      await db.Comment.destroy({
        where: {
          id: req.params.id
        }
      });
      return res.status(200).send({
        status: 200,
        message: 'Comment successfully deleted'
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: 500,
        message: 'Ooops, something went wrong'
      });
    }
  }
}

export default Comment;
