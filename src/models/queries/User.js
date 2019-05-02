import db from '../index';

/**
 * a user class that handles all user queries to the db
 */
export default class User {
  /**
   * @param {object} condition
   * @returns {object} an object containing the information of the user or null
   */
  static async find(condition = {}) {
    try {
      const user = await db.User.findAll({
        limit: 1,
        where: condition,
        logging: false
      });

      return user;
    } catch (error) {
      return { errors: error };
    }
  }
}
