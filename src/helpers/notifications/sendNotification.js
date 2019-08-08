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
    resource, action, user, inAppMessage, emailMessage, url
  } = data;

  const userConfig = await getUserConfig(user.id);
  if (userConfig && !userConfig.errors) {
    const { inApp, email } = userConfig.config;
    if (inApp[resource].show && inApp[resource].on.includes(action)) {
      inAppNotification = await Notification.create(user.id, inAppMessage, 'inApp', url);
    }

    if (user.email && email[resource].show && email[resource].on.includes(action)) {
      emailNotification = (await Notification.create(user.id, inAppMessage, 'email', url))
        && (await sendMail(user.email, 'notification', { message: emailMessage }));
    }
  }

  return { inAppNotification, emailNotification };
};
