import db from '../../models';

/**
 * @param {int} userId
 * @returns {array} an array containing the list of all configurations
 */
export default async (userId) => {
  try {
    const config = await db.NotificationConfig.findOne({
      where: { userId },
      logging: false
    });

    return config ? config.get() : {};
  } catch (error) {
    return {
      errors: error
    };
  }
};
