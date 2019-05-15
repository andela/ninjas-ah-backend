import db from '../../models';

export default (keyword, tag) => {
  console.log('rw', keyword, tag);
  const where = {
    status: { [db.Op.ne]: 'deleted' },
    [db.Op.and]: {
      tagList: {
        [db.Op.contains]: [`${tag}`]
      },
      title: {
        [db.Op.iLike]: `%${keyword}%`
      }
    }
  };
  return where;
};
