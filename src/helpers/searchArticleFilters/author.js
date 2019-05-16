import db from '../../models';
import authorCondition from './authorCondition';

export default (author) => {
  const where = {
    status: { [db.Op.ne]: 'deleted' },
    [db.Op.or]: authorCondition(author)
  };
  return where;
};
