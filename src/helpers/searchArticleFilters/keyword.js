import db from '../../models';

export default async (keyword) => {
  const where = await {
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
