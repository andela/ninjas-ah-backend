import db from '../../models';

export default (author, keyword, tag) => {
  console.log('rw', author, keyword, tag);
  const where = {
    status: { [db.Op.ne]: 'deleted' },
    [db.Op.and]: {
      title: {
        [db.Op.iLike]: `%${keyword}%`
      },
      tagList: {
        [db.Op.contains]: [`${tag}`]
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