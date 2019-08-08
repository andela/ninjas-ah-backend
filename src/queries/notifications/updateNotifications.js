import db from '../../models';

/**
 * @param {integer} userId
 * @param {integer} notificationId
 * @param {object} value
 * @param {string} preference
 * @returns {object} return an object containing updated configuration
 */
export default async (userId, notificationId, value, preference = 'inApp') => {
  try {
    const condition = notificationId ? { id: notificationId, userId } : { userId };
    Object.keys(value).forEach(key => value[key] || delete value[key]);

    const notifications = await db.Notification.update(value, {
      where: value.preference ? condition : { ...condition, preference },
      returning: true,
      logging: false
    });

    return (
      (notifications[0]
        && notifications[1].map(
          notification => delete notification.get().preference && notification.get()
        ))
      || []
    );
  } catch (error) {
    return {
      errors: error
    };
  }
};
