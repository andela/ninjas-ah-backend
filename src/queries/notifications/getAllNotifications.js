import db from '../../models';

/**
 * @param {int} userId
 * @param {string} status
 * @param {int} offset
 * @param {int} limit
 * @param {string} preference
 * @returns {array} an array containing the list of notifications
 */
export default async (userId, status, offset = 0, limit = 1, preference = 'inApp') => {
  try {
    const notifications = await db.Notification.findAll({
      limit,
      offset,
      order: [['id', 'DESC']],
      where: status ? { userId, status, preference } : { userId, preference },
      logging: false,
      attributes: {
        exclude: ['preference']
      }
    });

    return notifications || [];
  } catch (error) {
    return {
      errors: error
    };
  }
};
