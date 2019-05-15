import db from '../models';

/**
 * Author: Gilles Kagarama
 * Search filter
 * SearchFilter class
 */
export default class SearchFilter {
  /**
   * Joi error logger
   * @param {object} keyword response
   * @param {object} author response
   * @param {object} tag response
   * @param {object} result Results passed
   * @returns {object} Object representing the response returned
   */
  static filters(keyword, author, tag) {
    let where = {};
    if (author || keyword || tag) {
      where = {
        status: { [db.Op.ne]: 'deleted' },
        [db.Op.or]: [
          {
            title: {
              [db.Op.iLike]: `%${keyword}%`
            }
          },
          {
            tagList: {
              [db.Op.contains]: [`${tag}`]
            }
          },
          (author = { '$author.username$': { [db.Op.iLike]: author } })
        ]
      };
    } else if (author === undefined) {
      where = {
        status: { [db.Op.ne]: 'deleted' },
        [db.Op.or]: [
          {
            title: {
              [db.Op.iLike]: `%${keyword}%`
            }
          },
          {
            tagList: {
              [db.Op.contains]: [`${tag}`]
            }
          }
        ]
      };
    } else {
      where = { status: { [db.Op.ne]: 'deleted' } };
    }
    return where;
  }

  /**
   * Joi error logger
   * @param {object} author response
   * @returns {object} Object representing the response returned
   */
  static author(author) {
    const include = author && !!author
      ? [
        {
          model: db.User,
          as: 'author',
          attributes: ['username', 'bio', 'image']
        }
      ]
      : [
        {
          model: db.User,
          as: 'author',
          attributes: ['username', 'bio', 'image']
        }
      ];
    return include;
  }
}
