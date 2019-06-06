import { Notification } from '../../queries';

/**
 * @param {integer} userId
 * @returns {object} the config token
 */
export default async (userId) => {
  const userConfig = await Notification.config.getOne(userId);
  return !userConfig.errors && Object.keys(userConfig).length
    ? { config: JSON.parse(userConfig.config) }
    : null;
};
