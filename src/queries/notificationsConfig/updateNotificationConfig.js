import db from '../../models';

/**
 * @param {integer} userId where to update
 * @param {object} config what to update
 * @returns {object} return an object containing updated configuration
 */
export default async (userId, config) => {
  try {
    const updatedConfig = await db.NotificationConfig.update(
      { config: JSON.stringify(config) },
      {
        where: { userId },
        returning: true,
        logging: false
      }
    );
    return updatedConfig[0] ? updatedConfig[1][0].get() : {};
  } catch (error) {
    return {
      errors: error
    };
  }
};
