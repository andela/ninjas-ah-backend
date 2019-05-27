import db from '../../models';

/**
 * @param {int} chatId the id of the user
 * @param {int} userId the id of the user
 * @returns {int} return the number of affected rows
 */
export default async (chatId = 0, userId) => {
  try {
    const removedChat = userId
      ? await db.Chat.destroy({ where: { id: chatId, userId }, logging: false })
      : await db.Chat.destroy({ where: { id: chatId }, logging: false });

    return removedChat;
  } catch (error) {
    return {
      errors: error
    };
  }
};
