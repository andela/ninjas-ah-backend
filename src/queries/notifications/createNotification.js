import db from '../../models';

/**
 * @param {int} userId
 * @param {string} message
 * @param {string} preference
 * @param {string} url
 * @returns {object} returns the created notification
 */
export default async (userId, message, preference = 'inApp', url) => {
  try {
    return (await db.Notification.create(
      {
        userId,
        message,
        preference,
        url
      },
      { logging: false }
    )).dataValues;
  } catch (error) {
    return {
      errors: error
    };
  }
};
