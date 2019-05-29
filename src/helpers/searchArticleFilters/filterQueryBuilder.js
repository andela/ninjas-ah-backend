import db from '../../models';

export default (condition = {}) => {
  let where = { status: { [db.Op.ne]: 'deleted' } };
  if (condition.author !== undefined) {
    where = {
      ...where,
      [db.Op.and]: {
        [db.Op.or]: [
          {
            '$author.username$': { [db.Op.iLike]: `${condition.author}` }
          },
          {
            '$author.firstName$': { [db.Op.iLike]: `${condition.author}` }
          },
          {
            '$author.lastName$': { [db.Op.iLike]: `${condition.author}` }
          }
        ]
      }
    };
  }
  if (condition.tag !== undefined) {
    where = {
      ...where,
      [db.Op.and]: {
        tagList: {
          [db.Op.contains]: [`${condition.tag}`]
        }
      }
    };
  }
  if (condition.keyword !== undefined) {
    where = {
      ...where,
      [db.Op.and]: [
        {
          title: {
            [db.Op.iLike]: `%${condition.keyword}%`
          }
        }
      ]
    };
  }
  return where;
};
