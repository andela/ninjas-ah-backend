import db from '../../models';

/**
 * @param {int} offset offset for query
 * @param {int} limit limit for query
 * @returns {object} Object representing the response returned
 */
export default async (offset = 0, limit = 20) => {
  try {
    const chats = await db.Chat.findAll({
      limit,
      offset,
      order: [['id', 'DESC']],
      logging: false,
      include: [
        {
          model: db.User,
          attributes: ['firstName', 'lastName', 'username', 'email', 'image']
        }
      ]
    });
    return chats;
  } catch (error) {
    return {
      errors: error
    };
  }
};
