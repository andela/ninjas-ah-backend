import db from '../../models';

export default (keyword, author) => {
  const where = {
    status: { [db.Op.ne]: 'deleted' },
    [db.Op.and]: {
      title: {
        [db.Op.iLike]: `%${keyword}%`
      },
      [db.Op.or]: [
        { '$author.username$': { [db.Op.iLike]: `${author}` } },
        { '$author.firstName$': { [db.Op.iLike]: `${author}` } },
        { '$author.lastName$': { [db.Op.iLike]: `${author}` } }
      ]
    }
  };
  return where;
};
