import db from '../../models';

/**
 * @param {int} userId
 * @param {object} message
 * @returns {object} returns the created notification
 */
export default async (userId, message) => {
  try {
    return (await db.Notification.create({ userId, message }, { logging: false })).dataValues;
  } catch (error) {
    return {
      errors: error
    };
  }
};
