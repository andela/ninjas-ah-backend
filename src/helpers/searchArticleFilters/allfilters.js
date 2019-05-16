import db from '../../models';
import authorCondition from './authorCondition';

export default (author, keyword, tag) => {
  const where = {
    status: { [db.Op.ne]: 'deleted' },
    [db.Op.and]: {
      title: {
        [db.Op.iLike]: `%${keyword}%`
      },
      tagList: {
        [db.Op.contains]: [`${tag}`]
      },
      [db.Op.or]: authorCondition(author)
    }
  };
  return where;
};
