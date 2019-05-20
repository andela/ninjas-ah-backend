import { Token } from '../queries';
/**
 * @param {int} userId
 * @return {object|boolean} true if every invalid token was destroyed or an error object
 */
export default async (userId) => {
  const destroyToken = typeof userId === 'number' ? await Token.destroy(userId) : {};
  return destroyToken.errors ? destroyToken.errors.message : {};
};
