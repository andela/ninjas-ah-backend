import db from '../../models';

/**
 * @param {int} userId
 * @param {object} config
 * @returns {object} returns the created configuration
 */
export default async (userId, config) => {
  try {
    const createdConfig = await db.NotificationConfig.create(
      { userId, config: JSON.stringify(config) },
      { logging: false }
    );

    return createdConfig.get();
  } catch (error) {
    return {
      errors: error
    };
  }
};
