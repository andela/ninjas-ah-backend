import db from '../../models';

/**
 * @param {int} userId
 * @param {string} message
 * @param {int} chatGroupId
 * @returns {object} return the saved chat
 */
export default async (userId, message, chatGroupId = null) => {
  try {
    const newChat = await db.Chat.create({ userId, message, chatGroupId }, { logging: false });
    return newChat.get();
  } catch (error) {
    return {
      errors: error
    };
  }
};
