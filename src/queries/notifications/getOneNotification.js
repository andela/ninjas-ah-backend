import db from '../../models';

/**
 * @param {int} userId
 * @param {int} notificationId
 * @param {string} preference
 * @returns {array} an array containing the list of all configurations
 */
export default async (userId, notificationId, preference = 'inApp') => {
  try {
    const notification = await db.Notification.findOne({
      where: { userId, id: notificationId, preference },
      logging: false,
      attributes: {
        exclude: ['preference']
      }
    });

    return notification ? notification.dataValues : {};
  } catch (error) {
    return {
      errors: error
    };
  }
};
