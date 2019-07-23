import db from '../../models';
import { dbFindAll } from '../../helpers/queryHelper';

const getAll = async (condition = {}) => dbFindAll(db.Comment, condition, null, null, [
  {
    model: db.User,
    as: 'commentAuthor',
    attributes: ['firstName', 'lastName', 'username', 'email', 'image']
  }
]);

export default getAll;
