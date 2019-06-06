import db from '../../models';

/**
 * @param {int} notificationId the id of the user
 * @param {int} userId the id of the user
 * @returns {int} return the number of affected rows
 */
export default async (notificationId = 0, userId) => {
  try {
    return !userId
      ? await db.Notification.destroy({ where: { id: notificationId }, logging: false })
      : await db.Notification.destroy({ where: { id: notificationId, userId }, logging: false });
  } catch (error) {
    return {
      errors: error
    };
  }
};
