import db from '../../models';
import authorCondition from './authorCondition';

export default (keyword, author) => {
  const where = {
    status: { [db.Op.ne]: 'deleted' },
    [db.Op.and]: {
      title: {
        [db.Op.iLike]: `%${keyword}%`
      },
      [db.Op.or]: authorCondition(author)
    }
  };
  return where;
};
