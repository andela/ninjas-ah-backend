import dotenv from 'dotenv';
import { Notification } from '../queries';
import status from '../config/status';

dotenv.config();

/**
 * A class to handle all notifications
 */
export default class NotificationController {
  /**
   * @param  {object} req
   * @param  {object} res
   * @return {object} return an object containing the updated profile
   */
  static async setConfig(req, res) {
    const config = await Notification.config.create(req.user.id, req.body.config);

    if (config.errors && config.errors.name === 'SequelizeUniqueConstraintError') {
      return res
        .status(status.EXIST)
        .json({ errors: { config: 'you already have set configurations' } });
    }

    return config.errors
      ? res.status(status.SERVER_ERROR).json({
        errors: 'Oops, something went wrong, please try again'
      })
      : res.status(status.CREATED).json({
        configuration: Object.keys(config).length ? JSON.parse(config.config) : null
      });
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @return {object} return an object containing the updated profile
   */
  static async getConfig(req, res) {
    const config = await Notification.config.getOne(req.user.id);

    if (!config.errors) {
      config.config = Object.keys(config).length ? JSON.parse(config.config) : null;
      return res.status(status.OK).json(config);
    }
    return res
      .status(status.SERVER_ERROR)
      .json({ errors: 'Oops, something went wrong, please try again' });
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @return {object} return an object containing the updated profile
   */
  static async updateConfig(req, res) {
    const config = await Notification.config.update(req.user.id, req.body.config);

    if (config.errors) {
      return res
        .status(status.SERVER_ERROR)
        .json({ errors: 'Oops, something went wrong, please try again' });
    }

    return config.config
      ? res.status(status.OK).json({ configuration: JSON.parse(config.config) })
      : res.status(status.BAD_REQUEST).json({
        errors: { notification: "you don't have set configuration" }
      });
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @return {array} return an array containing notifications
   */
  static async getAll(req, res) {
    const [offset, limit] = [req.query.offset || 0, req.query.limit || 20];
    let notificationStatus = null;

    if (req.url.search(/\/unseen/g) >= 0) {
      notificationStatus = 'unseen';
    } else if (req.url.search(/\/seen/g) >= 0) {
      notificationStatus = 'seen';
    }

    const notifications = await Notification.getAll(req.user.id, notificationStatus, offset, limit);

    return !notifications.errors
      ? res.status(status.OK).json({ notifications })
      : res
        .status(status.SERVER_ERROR)
        .json({ errors: 'Oops, something went wrong, please try again' });
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @return {object} return an object containing one notification
   */
  static async getOne(req, res) {
    const notification = await Notification.getOne(req.user.id, req.params.notificationId);

    return (
      (notification.errors
        && notification.errors.name === 'SequelizeDatabaseError'
        && res.status(status.BAD_REQUEST).json({
          errors: {
            notification: 'the provided notification ID is not valid, it should be an integer'
          }
        }))
      || (notification.errors
        && res
          .status(status.SERVER_ERROR)
          .json({ errors: 'Oops, something went wrong, please try again' }))
      || res.status(status.OK).json(notification)
    );
  }

  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async delete(req, res) {
    const deleted = req.user.role === 'admin'
      ? await Notification.remove(req.params.notificationId)
      : await Notification.remove(req.params.notificationId, req.user.id);

    if (deleted.errors) {
      return (
        (deleted.errors.name === 'SequelizeDatabaseError'
          && res.status(status.BAD_REQUEST).json({
            errors: {
              notification: 'the provided notification ID is not valid, it should be an integer'
            }
          }))
        || res
          .status(status.SERVER_ERROR)
          .json({ errors: 'Oops, something went wrong, please try again' })
      );
    }
    return !deleted
      ? res.status(status.NOT_FOUND).json({
        errors: { notification: 'notification not deleted' }
      })
      : res.status(status.OK).json({ message: 'notification successfully deleted' });
  }
}
