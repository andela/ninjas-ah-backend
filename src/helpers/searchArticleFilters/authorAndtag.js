import db from '../../models';

export default (keyword, tag) => {
  console.log('author and tag');
  let where = {};
  where = {
    status: { [db.Op.ne]: 'deleted' },
    [db.Op.or]: [
      {
        title: {
          [db.Op.iLike]: `%${keyword}%`
        }
      }
    ]
  };
  return where;
};
