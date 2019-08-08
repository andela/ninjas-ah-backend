import db from '../../models';
import { dbFindAll } from '../../helpers/queryHelper';

const getAll = async condition => dbFindAll(db.Report, condition, null, null, [
  {
    model: db.User,
    as: 'reporter',
    attributes: ['firstName', 'lastName', 'username', 'email', 'image']
  }
]);
export default getAll;
