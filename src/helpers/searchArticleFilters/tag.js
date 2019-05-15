import db from '../../models';

export default (tag) => {
  const where = {
    status: { [db.Op.ne]: 'deleted' },
    [db.Op.and]: {
      tagList: {
        [db.Op.contains]: [`${tag}`]
      }
    }
  };
  return where;
};
