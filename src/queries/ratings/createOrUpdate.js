import db from '../../models';
import findAll from './findAll';
import update from './update';

/**
 * @param {object} rating input user rating
 * @returns {object} Object representing the response returned
 */

export default async (data = {}) => {
  const { articleId, userId, rating } = data;
  try {
    const result = await findAll(articleId, userId);
    let message = {};
    if (result && result.length === 0) {
      await db.Rating.create({ rating, articleId, userId }, { logging: false });
      message = 'created';
    } else {
      await db.Rating.update(
        { rating },
        { where: { [db.Op.and]: { articleId, userId } }, logging: false }
      );
      message = 'updated';
    }
    await update(articleId);
    return message;
  } catch (err) {
    return {
      errors: err
    };
  }
};
