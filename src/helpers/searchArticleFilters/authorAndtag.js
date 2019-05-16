import db from '../../models';
import authorCondition from './authorCondition';

export default (author, tag) => {
  const where = {
    status: { [db.Op.ne]: 'deleted' },
    [db.Op.and]: {
      tagList: {
        [db.Op.contains]: [`${tag}`]
      },
      [db.Op.or]: authorCondition(author)
    }
  };
  return where;
};
