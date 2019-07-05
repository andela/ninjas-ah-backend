import { Notification } from '../queries';
import status from '../config/status';

/**
 * A class to handle all notifications
 */
export default class NotificationController {
  /**
   * @param  {object} req
   * @param  {object} res
   * @return {object} return an object containing the updated profile
   * @return {object} return an object containing set configuration
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
   * @return {object} return an object containing set configuration
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
   * @return {object} return an object containing the updated configuration
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
    const { url, query, user } = req;
    const [offset, limit] = [query.offset || 0, query.limit || 20];
    const notificationStatus = (url.search(/\/unseen/g) >= 0 && 'unseen') || (url.search(/\/seen/g) >= 0 && 'seen');

    const notifications = await Notification.getAll(user.id, notificationStatus, offset, limit);

    return !notifications.errors
      ? res.status(status.OK).json({ notifications })
      : res.status(status.SERVER_ERROR).json({ errors: notifications.errors.message });
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @return {object} return an object containing one notification
   */
  static async getOne(req, res) {
    const notification = await Notification.getOne(req.user.id, req.params.notificationId);
    const errors = notification.errors || null;

    return (
      (errors
        && errors.name === 'SequelizeDatabaseError'
        && res.status(status.BAD_REQUEST).json({
          errors: { notification: 'the provided notification ID should be an integer' }
        }))
      || (errors
        && res.status(status.SERVER_ERROR).json({
          errors: 'Oops, something went wrong, please try again'
        }))
      || res.status(status.OK).json({ notification })
    );
  }

  /**
   * @param  {object} req
   * @param  {object} res
   * @return {object} return an object containing the updated notification
   */
  static async update(req, res) {
    const [notificationStatus, notificationId, preference] = [
      (req.url.search(/\/unseen/g) >= 0 && 'unseen') || (req.url.search(/\/seen/g) >= 0 && 'seen'),
      req.params.notificationId,
      req.body.preference
    ];
    const notifications = await Notification.update(req.user.id, notificationId, {
      status: notificationStatus,
      preference
    });
    return (
      (notifications.errors
        && ((notifications.errors.name === 'SequelizeDatabaseError'
          && res.status(status.BAD_REQUEST).json({
            errors: { notification: 'the provided notification ID should be an integer' }
          }))
          || res.status(status.SERVER_ERROR).json({
            errors: 'Oops, something went wrong, please try again'
          })))
      || res.status(notifications.length ? status.OK : status.NOT_FOUND).json({ notifications })
    );
  }

  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async delete(req, res) {
    const deleted = await Notification.remove(req.params.notificationId, req.user.id);
    const errors = deleted.errors || null;

    return errors
      ? (errors.name === 'SequelizeDatabaseError'
          && res.status(status.BAD_REQUEST).json({
            errors: {
              notification: 'the provided notification ID is not valid, it should be an integer'
            }
          }))
          || res
            .status(status.SERVER_ERROR)
            .json({ errors: 'Oops, something went wrong, please try again' })
      : (!deleted
          && res.status(status.NOT_FOUND).json({
            errors: { notification: 'notification not deleted' }
          }))
          || res.status(status.OK).json({ message: 'notification successfully deleted' });
  }
}
