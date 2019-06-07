import db from '../../models';

/**
 * @param {object} data inputs data to be saved in db
 * @returns {object} Object representing the response returned
 */
export default async (data) => {
  let stats = [];
  stats = await db.ReadingStat.create(data, { logging: false });
  return stats;
};
