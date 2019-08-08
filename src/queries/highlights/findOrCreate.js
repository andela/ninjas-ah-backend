import db from '../../models';

/**
 * @param {object} data inputs data to be saved in db
 * @returns {object} Object representing the response returned
 */

export default async (highlight = {}) => {
  try {
    let findOrCreate = [];
    findOrCreate = await db.Highlight.findOrCreate({
      where: highlight,
      defaults: highlight,
      logging: false
    });
    return [findOrCreate[0].dataValues, findOrCreate[1]];
  } catch (error) {
    return {
      errors: error
    };
  }
};
