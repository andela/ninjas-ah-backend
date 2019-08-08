import db from '../../models';

/**
 * @param {int} notificationId the id of the user
 * @param {int} userId the id of the user
 * @param {string} preference
 * @returns {int} return the number of affected rows
 */
export default async (notificationId, userId, preference = 'inApp') => {
  try {
    return await db.Notification.destroy({
      where: { id: notificationId, userId, preference },
      logging: false
    });
  } catch (error) {
    return {
      errors: error
    };
  }
};
