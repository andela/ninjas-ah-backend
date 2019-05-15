import db from '../../models';

export default (author) => {
  const where = {
    status: { [db.Op.ne]: 'deleted' },
    [db.Op.or]: [
      { '$author.username$': { [db.Op.iLike]: `${author}` } },
      { '$author.firstName$': { [db.Op.iLike]: `${author}` } },
      { '$author.lastName$': { [db.Op.iLike]: `${author}` } }
    ]
  };
  return where;
};
