import status from '../config/status';
import { User, Chat } from '../queries';

/**
 * A class to handle chat activities
 */
export default class ChatController {
  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} an object containing chat details
   */
  static async save(req, res) {
    if (typeof req.body.message !== 'string' || !req.body.message) {
      return res
        .status(status.BAD_REQUEST)
        .json({ errors: { message: 'the message should be a string and should not be empty' } });
    }

    const savedChat = await Chat.save(req.user.id, req.body.message);

    if (savedChat.errors) {
      if (savedChat.errors.name === 'SequelizeForeignKeyConstraintError') {
        return res
          .status(status.UNAUTHORIZED)
          .json({ errors: { account: 'your account is not valid' } });
      }
      return res.status(status.SERVER_ERROR).json({ errors: 'Oops, something went wrong' });
    }

    const findUser = await User.findOne({ id: req.user.id });
    delete findUser.password;

    req.io.emit('message', { ...savedChat, user: findUser });
    return res
      .status(status.OK)
      .json({ message: 'message successfully sent', chat: { ...savedChat, user: findUser } });
  }

  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async getAll(req, res) {
    let chats = [];
    const { offset, limit } = req.query;
    const savedChats = limit ? await Chat.getAll(offset, limit) : await Chat.getAll(offset);

    if (!savedChats.errors) {
      savedChats.forEach((chat) => {
        const user = chat.get().User.get();
        delete chat.dataValues.User;
        chats = [...chats, { ...chat.get(), user }];
      });
    }

    return savedChats.errors
      ? res
        .status(status.SERVER_ERROR)
        .json({ errors: 'Oops, something went wrong, please try again' })
      : res.status(status.OK).json({ chats });
  }

  /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async delete(req, res) {
    const removedChat = req.user.role === 'normal'
      ? await Chat.remove(req.params.chatId, req.user.id)
      : await Chat.remove(req.params.chatId);

    if (removedChat.errors) {
      return removedChat.errors.name === 'SequelizeDatabaseError'
        ? res.status(status.BAD_REQUEST).json({
          errors: { chat: 'the provided chat ID is not valid, it should be an integer' }
        })
        : res.status(status.SERVER_ERROR).json({
          errors: 'Oops, something went wrong, please try again'
        });
    }

    return removedChat
      ? res.status(status.OK).json({ message: 'chat successfully deleted' })
      : res.status(status.NOT_FOUND).json({ errors: { chat: 'chat not deleted' } });
  }
}
