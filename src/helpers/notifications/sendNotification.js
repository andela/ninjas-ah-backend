import { Notification } from '../../queries';
import getUserConfig from './getUserConfig';
import sendMail from '../mailer';

/**
 * @param {object} data
 * @returns {object} notification
 */
export default async (data) => {
  let inAppNotification = {};
  let emailNotification = {};
  const {
    resource, action, user, message
  } = data;

  const userConfig = await getUserConfig(user.id);
  if (userConfig && !userConfig.errors) {
    const { inApp, email } = userConfig.config;
    if (inApp[resource].show && inApp[resource].on.includes(action)) {
      inAppNotification = await Notification.create(user.id, message);
    }

    if (user.email && email[resource].show && email[resource].on.includes(action)) {
      emailNotification = await sendMail(user.email, 'notification', { message });
    }
  }

  return { inAppNotification, emailNotification };
};
