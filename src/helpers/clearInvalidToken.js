import { Token } from '../queries';
/**
 * @param {int} userId
 * @return {integer} the number of destroyed tokens
 */
export default async (userId) => {
  const destroyedToken = typeof userId === 'number' ? await Token.destroy(userId) : 0;
  return !destroyedToken.errors ? destroyedToken : null;
};
