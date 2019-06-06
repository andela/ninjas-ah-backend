import db from '../../models';

/**
 * @param {int} userId
 * @param {int} notificationId
 * @returns {array} an array containing the list of all configurations
 */
export default async (userId, notificationId) => {
  try {
    const notification = await db.Notification.findOne({
      where: { userId, id: notificationId },
      logging: false
    });

    return notification ? notification.dataValues : {};
  } catch (error) {
    return {
      errors: error
    };
  }
};
