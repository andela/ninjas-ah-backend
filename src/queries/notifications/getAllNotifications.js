import db from '../../models';

/**
 * @param {int} userId
 * @param {string} status
 * @param {int} offset
 * @param {int} limit
 * @returns {array} an array containing the list of notifications
 */
export default async (userId, status, offset = 0, limit = 1) => {
  const condition = status ? { userId, status } : { userId };

  try {
    const notifications = await db.Notification.findAll({
      limit,
      offset,
      order: [['id', 'DESC']],
      where: condition,
      logging: false
    });

    return notifications || [];
  } catch (error) {
    return {
      errors: error
    };
  }
};
