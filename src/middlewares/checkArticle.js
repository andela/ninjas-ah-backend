/* eslint-disable import/named */

import status from '../config/status';
import db from '../models';
import { dbFindSingle } from '../helpers/queryHelper';

// eslint-disable-next-line valid-jsdoc
/**
 * middleware funnction used in create comment controller to make checknif the article exists
 * @param { object } req the request.
 * @param { object } res The response.
 * @param { function } next  return object
 */
export default async function checkArticle(req, res, next) {
  try {
    const { articleId } = req.params;
    return (await dbFindSingle(db.Article, {
      id: articleId
    }))
      ? next()
      : res.status(status.NOT_FOUND).send({
        status: status.NOT_FOUND,
        message: 'That article does not exist'
      });
  } catch (error) {
    return res.status(status.SERVER_ERROR).send({
      status: status.SERVER_ERROR,
      message: 'Ooops, something went wrong'
    });
  }
}

