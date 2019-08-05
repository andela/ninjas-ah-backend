import db from '../../models';
import { dbFindAll } from '../../helpers/queryHelper';

const getAll = async (data = {}) => dbFindAll(db.Comment, data, null, null, [
  {
    model: db.User,
    attributes: ['firstName', 'lastName', 'username', 'email', 'image'],
    as: 'commentAuthor'
  }
]);

export default getAll;
