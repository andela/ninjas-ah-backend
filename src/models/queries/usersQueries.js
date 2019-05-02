/* eslint-disable require-jsdoc */
import db from '../index';

class UsersQueries {
  // create aricle
  static async create(data) {
    const user = await db.User.create(data);
    return user;
  }

  // get all users
  // static async getAll(condition = {}) {
  //   let allUsers = [];

  //   if (Object.keys(condition).length > 0) {
  //     allUsers = await db.User.findAll({
  //       where: condition,
  //     });
  //     return allUsers;
  //   }
  // }

  // get one user
  static async getOne(condition = {}) {
    let oneUser = [];

    if (Object.keys(condition).length > 0) {
      oneUser = await db.User.findOne({
        where: condition,
      });
      return oneUser;
    }
    return oneUser;
  }
}

export default UsersQueries;
