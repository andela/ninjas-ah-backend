import db from '../../models';

export default (keyword) => {
  const where = {
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
